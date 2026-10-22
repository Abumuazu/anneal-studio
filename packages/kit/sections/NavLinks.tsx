'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HandoffLink } from '../transitions/Handoff';

export interface NavItem {
  href: string;
  label: string;
  /** Play the hand-off transition (links to the start page). */
  handoff?: boolean;
}

/** Header links, marking the current page with aria-current. */
export function NavLinks({ items }: { items: readonly NavItem[] }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const props = {
          href: item.href,
          className: 'hlink',
          'aria-current': current ? ('page' as const) : undefined,
        };
        return item.handoff ? (
          <HandoffLink key={item.href} {...props}>
            {item.label}
          </HandoffLink>
        ) : (
          <Link key={item.href} {...props}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
