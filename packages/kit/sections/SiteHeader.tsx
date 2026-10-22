import Link from 'next/link';
import { type ReactNode } from 'react';

import { cx } from '../lib/cx';
import { MobileMenu, type MobileMenuProps } from './MobileMenu';
import { NavLinks, type NavItem } from './NavLinks';

interface SiteHeaderProps {
  /** Home link content: a decorative mark plus visible text, which names the link. */
  brand: ReactNode;
  links: readonly NavItem[];
  /** Accessible name for the primary nav. */
  navLabel: string;
  /** Right-aligned text (city clocks). Hidden on small screens. */
  meta?: ReactNode;
  /** Call to action at the far right. Hidden on phones, where the menu carries it. */
  cta?: ReactNode;
  /**
   * The phone menu. Without it, phones keep the call to action in the header
   * and no links.
   */
  menu?: Omit<MobileMenuProps, 'links' | 'brand'>;
  className?: string;
}

/**
 * Top bar that sits over the first section and scrolls away with it. Below
 * 900px the links and meta move into a full-screen menu behind a round button.
 */
export function SiteHeader({
  brand,
  links,
  navLabel,
  meta,
  cta,
  menu,
  className,
}: SiteHeaderProps) {
  return (
    <header
      className={cx(
        'absolute inset-x-0 top-0 z-40 flex h-[72px] items-center gap-8 px-[var(--spacing-gutter-sm)] desk:h-[88px] desk:px-[var(--spacing-gutter)]',
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
      {cta ? (
        <span
          className={cx(meta ? 'ml-auto desk:ml-0' : 'ml-auto', menu && 'hidden desk:inline-flex')}
        >
          {cta}
        </span>
      ) : null}
      {menu ? (
        <span className="ml-auto desk:hidden">
          <MobileMenu links={links} brand={brand} footer={meta} {...menu} />
        </span>
      ) : null}
    </header>
  );
}
