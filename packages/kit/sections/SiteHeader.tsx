import Link from 'next/link';
import { type ReactNode } from 'react';

import { cx } from '../lib/cx';
import { NavLinks, type NavItem } from './NavLinks';

interface SiteHeaderProps {
  /** Home link content: a decorative mark plus visible text, which names the link. */
  brand: ReactNode;
  links: readonly NavItem[];
  /** Accessible name for the primary nav. */
  navLabel: string;
  /** Right-aligned text (city clocks). Hidden on small screens. */
  meta?: ReactNode;
  /** Call to action at the far right. */
  cta?: ReactNode;
  className?: string;
}

/**
 * Top bar that sits over the first section and scrolls away with it. Links and
 * meta hide below 900px; the floating nav covers small screens.
 */
export function SiteHeader({ brand, links, navLabel, meta, cta, className }: SiteHeaderProps) {
  return (
    <header
      className={cx(
        'absolute inset-x-0 top-0 z-40 flex h-[88px] items-center gap-8 px-[var(--spacing-gutter-sm)] desk:px-[var(--spacing-gutter)]',
        className,
      )}
    >
      <Link href="/" className="inline-flex items-center gap-3">
        {brand}
      </Link>
      <nav aria-label={navLabel} className="ml-12 hidden gap-8 desk:flex">
        <NavLinks items={links} />
      </nav>
      {meta ? (
        <span className="type-label ml-auto hidden text-grey-600 desk:inline">{meta}</span>
      ) : null}
      {cta ? <span className={meta ? 'ml-auto desk:ml-0' : 'ml-auto'}>{cta}</span> : null}
    </header>
  );
}
