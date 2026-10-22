import { type NavItem } from '@studio/kit/sections';

import { boardCopy } from './copy';

/** Site-wide settings for Anneal. Everything brand-specific the kit needs comes from here. */
export const site = {
  name: 'Anneal Studio',
  email: 'hello@raum.africa',
  startHref: '/start',
  cities: [
    { name: 'Lagos', timeZone: 'Africa/Lagos', zone: 'WAT' },
    { name: 'Barcelona', timeZone: 'Europe/Madrid', zone: 'CET' },
  ],
  storage: {
    motion: 'anneal-motion',
    handoff: 'anneal-wwu',
  },
  handoffMaxAgeMs: 6000,
} as const;

export const primaryNav: readonly NavItem[] = [
  { href: '/work', label: boardCopy.nav.work },
  { href: '/services', label: boardCopy.nav.services },
  { href: '/products', label: boardCopy.nav.products },
  { href: '/studio', label: boardCopy.nav.studio },
  { href: site.startHref, label: boardCopy.nav.start, handoff: true },
];
