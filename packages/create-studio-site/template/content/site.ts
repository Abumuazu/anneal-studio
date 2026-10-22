import { type TileDef } from '@studio/kit/motion';
import { type NavItem } from '@studio/kit/sections';

/*
 * Everything this site says, in one place. The text below is template
 * placeholder: replace it with the client's own copy before launch.
 */
export const site = {
  name: '__TITLE__',
  email: 'hello@example.com',
  storage: { motion: '__NAME__-motion', handoff: '__NAME__-handoff' },
  contactHref: '/contact',
} as const;

export const nav: readonly NavItem[] = [
  { href: '/#work', label: 'Work' },
  { href: '/#process', label: 'Process' },
  { href: site.contactHref, label: 'Contact', handoff: true },
];

export const copy = {
  labels: { primaryNav: 'Primary', footerNav: 'Footer', quickNav: 'Quick', viewCase: 'View case' },
  cta: 'Start a project',
  hero: {
    lines: ['We design', 'and build', 'products.'] as const,
    lead: 'A small studio for founders who want a clear scope, a fixed price and a working product.',
    msg: 'Hello there.',
  },
  work: { heading: 'Selected work.', msg: 'A few things we made.' },
  process: {
    heading: 'How it goes.',
    msg: 'Four steps, no surprises.',
    steps: [
      { title: 'Scope', body: 'We agree what gets built, by when, and for how much.' },
      { title: 'Design', body: 'You see the product before any code is written.' },
      { title: 'Build', body: 'A working preview every week.' },
      { title: 'Launch', body: 'Live on your accounts, with everything handed over.' },
    ],
  },
  closing: {
    rows: [
      { text: 'Got an idea?' },
      { text: 'Let us build it', muted: true },
      { text: 'together.' },
    ],
    msg: 'Say hello.',
  },
  footer: { msg: 'Thanks for scrolling.', hint: 'Throw these around.', legal: '© Studio' },
  contact: {
    lines: ['Tell us', 'what you need.'] as const,
    lead: 'Write to us and we will reply within a working day.',
    msg: 'We read everything.',
  },
} as const;

/** The footer's throwable tiles, in the theme's colours. */
export const tiles: readonly TileDef[] = [
  {
    size: 92,
    radius: '0',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-spark',
  },
  {
    size: 74,
    radius: '50%',
    background: 'var(--color-accent)',
    color: 'var(--color-on-accent)',
    glyph: 'g-arrow',
  },
  {
    size: 100,
    radius: '26%',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-code',
  },
  {
    size: 80,
    radius: '50%',
    background: 'var(--color-accent)',
    color: 'var(--color-on-accent)',
    glyph: 'g-dots',
  },
  {
    size: 84,
    radius: '0',
    background: 'var(--color-panel)',
    color: 'var(--color-ink)',
    glyph: 'g-app',
  },
];
