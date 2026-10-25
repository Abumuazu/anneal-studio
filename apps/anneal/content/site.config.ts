import { type NavItem } from '@studio/kit/sections';

import { boardCopy } from './copy';

/** Site-wide settings for Anneal. Everything brand-specific the kit needs comes from here. */
export const site = {
  name: 'Anneal Studio',
  email: 'hello@raum.africa',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/muazu' },
    { label: 'X', href: 'https://x.com/muazudev' },
  ],
  startHref: '/start',
  storage: {
    motion: 'anneal-motion',
    handoff: 'anneal-wwu',
  },
  handoffMaxAgeMs: 6000,
} as const;

export const primaryNav: readonly NavItem[] = [
  { href: '/work', label: boardCopy.nav.work },
  { href: '/services', label: boardCopy.nav.services },
  { href: '/studio', label: boardCopy.nav.studio },
];

export const footerNav: readonly NavItem[] = [
  ...primaryNav.slice(0, 2),
  { href: '/products', label: boardCopy.nav.products },
  { href: '/studio', label: boardCopy.nav.studio },
  { href: site.startHref, label: boardCopy.nav.start, handoff: true },
  { href: '/privacy', label: boardCopy.privacy },
];
