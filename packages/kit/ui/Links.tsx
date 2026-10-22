import Link from 'next/link';
import { type CSSProperties, type ReactNode } from 'react';

import { cx } from '../lib/cx';
import { HandoffLink } from '../transitions/Handoff';

interface BaseLinkProps {
  href: string;
  children: ReactNode;
  /** Play the page hand-off transition on click. */
  handoff?: boolean;
  /** Trailing glyph, e.g. "↗", "→" or "↓". Pass null for none. */
  arrow?: string | null;
  className?: string;
  style?: CSSProperties;
}

function AnyLink({ href, handoff, className, style, children }: Omit<BaseLinkProps, 'arrow'>) {
  const isHash = href.startsWith('#');
  if (handoff) {
    return (
      <HandoffLink href={href} className={className} style={style}>
        {children}
      </HandoffLink>
    );
  }
  if (isHash) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

function Arrow({ glyph }: { glyph: string | null | undefined }) {
  if (!glyph) return null;
  return (
    <span className="arrow" aria-hidden="true">
      {glyph}
    </span>
  );
}

const SIZES = {
  xxl: { h: 70, px: 32, fs: 19 },
  xl: { h: 64, px: 34, fs: 18 },
  lg: { h: 56, px: 28, fs: 16 },
  md: { h: 50, px: 24, fs: 15 },
  sm: { h: 46, px: 20, fs: 14 },
} as const;

interface ButtonLinkProps extends BaseLinkProps {
  size?: keyof typeof SIZES;
  /** Resting background and text colours. */
  bg?: string;
  fg?: string;
  /** Colour that rises in on hover, and the text colour over it. */
  fill?: string;
  fillFg?: string;
}

/** Primary call to action. A fill rises from the bottom on hover. */
export function ButtonLink({
  size = 'lg',
  bg,
  fg,
  fill,
  fillFg,
  arrow = '↗',
  className,
  style,
  children,
  ...rest
}: ButtonLinkProps) {
  const s = SIZES[size];
  const vars = {
    '--btn-h': `${s.h}px`,
    '--btn-px': `${s.px}px`,
    '--btn-fs': `${s.fs}px`,
    '--btn-bg': bg,
    '--btn-fg': fg,
    '--btn-fill': fill,
    '--btn-fill-fg': fillFg,
    ...style,
  } as CSSProperties;
  return (
    <AnyLink className={cx('btn', className)} style={vars} {...rest}>
      {children}
      <Arrow glyph={arrow} />
    </AnyLink>
  );
}

/** Quiet text link with a trailing arrow. */
export function ArrowLink({ arrow = '→', className, children, ...rest }: BaseLinkProps) {
  return (
    <AnyLink className={cx('alink', className)} {...rest}>
      {children}
      <Arrow glyph={arrow} />
    </AnyLink>
  );
}

/** Compact frosted pill link (header call to action). */
export function PillLink({ arrow = '↗', className, children, ...rest }: BaseLinkProps) {
  return (
    <AnyLink className={cx('pill glass-light', className)} {...rest}>
      {children}
      <Arrow glyph={arrow} />
    </AnyLink>
  );
}

/** Large footer navigation link. */
export function FooterLink({ arrow = '↗', className, children, ...rest }: BaseLinkProps) {
  return (
    <AnyLink className={cx('flink', className)} {...rest}>
      {children}
      <Arrow glyph={arrow} />
    </AnyLink>
  );
}

interface TagProps {
  children: ReactNode;
  bg?: string;
  color?: string;
  className?: string;
}

export function Tag({ children, bg, color, className }: TagProps) {
  return (
    <span className={cx('tag', className)} style={{ '--tag-bg': bg, color } as CSSProperties}>
      {children}
    </span>
  );
}
