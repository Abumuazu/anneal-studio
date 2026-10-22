import { type CSSProperties, type HTMLAttributes, type ReactNode, createElement } from 'react';

import { cx } from '../lib/cx';

type Tag = 'div' | 'p' | 'span' | 'h2' | 'h3' | 'li' | 'section';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: Tag;
  /** Stagger step. Each step adds 80ms, like the boards' d1 to d5. */
  step?: 0 | 1 | 2 | 3 | 4 | 5;
  children?: ReactNode;
}

/**
 * Fades and rises into place when its nearest `InView` ancestor enters.
 * Server-safe markup: the trigger lives in `InView`.
 */
export function Reveal({ as = 'div', step = 0, className, style, children, ...rest }: RevealProps) {
  return createElement(
    as,
    {
      ...rest,
      className: cx('rv', className),
      style: { ...style, '--rv-delay': `${step * 0.08}s` } as CSSProperties,
    },
    children,
  );
}

interface LineMaskProps {
  /** Line index within the headline. Each line adds 100ms. */
  line?: number;
  className?: string;
  children: ReactNode;
}

/**
 * One headline line that slides up from behind a mask when its `InView`
 * ancestor enters. Stack several for a multi-line headline.
 */
export function LineMask({ line = 0, className, children }: LineMaskProps) {
  return (
    <span
      className={cx('ml', className)}
      style={{ '--ml-delay': `${line * 0.1}s` } as CSSProperties}
    >
      <span>{children}</span>
    </span>
  );
}
