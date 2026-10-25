import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { createProcessor } from '@mdx-js/mdx';

import { caseCloseMsg } from './appendix';
import { cases } from './cases';
import { copy } from './copy';
import { caseCopy } from './pages';

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8');

const appendix = read('../../../docs/copy-deck-appendix.md');
const approved = read('../../../docs/copy-deck-approved.md').replace(/\s+/g, ' ');
const deckValues = Object.values(copy);
const inSource = (s: string) =>
  appendix.includes(s) || approved.includes(s) || deckValues.some((v) => v.includes(s));

/**
 * Headlines as whole sentences: the appendix marks line breaks with " / " and
 * the deck splits them over numbered keys (gov.h1.1, gov.h1.2, ...).
 */
const groups = new Map<string, string[]>();
for (const [key, value] of Object.entries(copy)) {
  const m = /^(.*)\.\d+$/.exec(key);
  if (m?.[1]) groups.set(m[1], [...(groups.get(m[1]) ?? []), value]);
}
const sentences = [
  appendix.replaceAll(' / ', ' '),
  approved,
  ...[...groups.values()].map((v) => v.join(' ')),
];
const isSentence = (s: string) => inSource(s) || sentences.some((v) => v.includes(s));

/** Attributes that carry settings, not copy. */
const NOT_COPY = new Set(['slug', 'width', 'flush', 'dim']);

interface Node {
  type: string;
  value?: unknown;
  name?: string | null;
  children?: Node[];
  attributes?: Node[];
  data?: { estree?: unknown };
}

/** Every string literal in an estree program (attribute values written as JS). */
function literals(node: unknown, out: string[] = []): string[] {
  if (Array.isArray(node)) node.forEach((n) => literals(n, out));
  else if (node && typeof node === 'object') {
    const n = node as Record<string, unknown>;
    if (n.type === 'Literal' && typeof n.value === 'string') out.push(n.value);
    for (const [k, v] of Object.entries(n)) if (k !== 'loc' && k !== 'range') literals(v, out);
  }
  return out;
}

interface Found {
  /** Each piece of copy, and joined headline lines that must read as one sentence. */
  copy: string[];
  sentences: string[];
  msgs: string[];
  /** Markdown text outside any component (should be none). */
  loose: string[];
}

function collect(tree: Node, found: Found, insideJsx = false): Found {
  const jsx = tree.type === 'mdxJsxFlowElement' || tree.type === 'mdxJsxTextElement';
  if (tree.type === 'text' && typeof tree.value === 'string' && tree.value.trim()) {
    // Prose may wrap over several lines; the page joins it with single spaces.
    (insideJsx ? found.copy : found.loose).push(tree.value.replace(/\s+/g, ' ').trim());
  }
  for (const attr of tree.attributes ?? []) {
    if (attr.type !== 'mdxJsxAttribute' || !attr.name || NOT_COPY.has(attr.name)) continue;
    if (typeof attr.value === 'string') {
      found.copy.push(attr.value);
      if (attr.name === 'msg') found.msgs.push(attr.value);
    } else if (attr.value && typeof attr.value === 'object') {
      const strings = literals((attr.value as Node).data?.estree);
      found.copy.push(...strings);
      if (attr.name === 'lines') found.sentences.push(strings.join(' '));
    }
  }
  for (const child of tree.children ?? []) collect(child, found, insideJsx || jsx);
  return found;
}

const processor = createProcessor();

function parseCase(slug: string): Found {
  const tree = processor.parse(read(`./cases/${slug}.mdx`)) as unknown as Node;
  return collect(tree, { copy: [], sentences: [], msgs: [], loose: [] });
}

/** Floating nav messages in page order: consecutive repeats collapse, the closing comes last. */
const navOrder = (msgs: string[], closing: string) =>
  [...msgs, closing].filter((m, i, all) => m !== all[i - 1]);

describe.each(cases.map((c) => [c.slug, c] as const))('case %s', (slug, entry) => {
  const found = parseCase(slug);

  it('has copy', () => {
    expect(found.copy.length).toBeGreaterThan(20);
    expect(found.loose).toEqual([]);
  });

  it.each(found.copy)('"%s" is word for word from the deck or appendix', (s) => {
    expect(inSource(s)).toBe(true);
  });

  it.each(found.sentences)('headline lines read as "%s"', (s) => {
    expect(isSentence(s)).toBe(true);
  });

  it('places itself with a crumb from the copy', () => {
    expect(inSource(`Work / ${entry.crumb}`)).toBe(true);
  });

  it('has no em or en dashes', () => {
    const dash = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);
    for (const s of found.copy) expect(s).not.toMatch(dash);
  });

  it('sets the floating nav messages in the order the copy lists them', () => {
    const order = navOrder(found.msgs, entry.closingMsg);
    if (slug === 'wisp') {
      const deck = [1, 2, 3, 4, 5, 6].map((n) => copy[`gov.msg.${n}` as keyof typeof copy]);
      expect(order).toEqual([...deck, caseCopy.wispClose]);
    } else {
      const title = `## Case: ${entry.title}`;
      const section = appendix.slice(
        appendix.indexOf(title),
        appendix.indexOf('\n---', appendix.indexOf(title)),
      );
      const listed = /\*\*Floating nav, in order:\*\* (.*)/.exec(section)?.[1]?.split(' · ');
      expect(listed).toBeDefined();
      expect(order).toEqual(listed);
      expect(order.at(-1)).toBe(caseCloseMsg);
    }
  });
});
