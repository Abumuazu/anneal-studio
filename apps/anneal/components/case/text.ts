import { Children, type ReactElement, type ReactNode, isValidElement } from 'react';

/** Strings inside `node`, through any wrapping elements (MDX wraps prose in a paragraph). */
function strings(node: ReactNode, where: string): string[] {
  return Children.toArray(node).flatMap((c) => {
    if (typeof c === 'string' || typeof c === 'number') return [String(c)];
    if (isValidElement<{ children?: ReactNode }>(c)) return strings(c.props.children, where);
    throw new Error(`${where}: expected plain text inside the tag.`);
  });
}

/**
 * The plain text of an MDX child. Copy can sit on the tag's own line or be
 * wrapped over several lines (MDX then makes it a paragraph); either way it
 * comes back as one string with single spaces.
 */
export function plainText(children: ReactNode, where: string): string {
  const text = strings(children, where).join(' ').replace(/\s+/g, ' ').trim();
  if (!text) throw new Error(`${where}: the text is empty.`);
  return text;
}

/** The elements of one component type among MDX children, ignoring whitespace. */
export function childrenOf<P>(
  children: ReactNode,
  type: (props: P) => unknown,
  where: string,
): ReactElement<P>[] {
  return Children.toArray(children).flatMap((c) => {
    if (typeof c === 'string' && c.trim() === '') return [];
    if (isValidElement<P>(c) && c.type === type) return [c];
    throw new Error(`${where}: only <${type.name}> is allowed inside.`);
  });
}
