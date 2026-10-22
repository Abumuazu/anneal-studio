import type { MDXContent } from 'mdx/types';

import { caseCloseMsg } from '../appendix';
import { copy } from '../copy';
import { caseCopy } from '../pages';

/**
 * The case studies. Each one's page is an MDX file next to this one; this
 * registry holds what other pages need without loading it (the Work page, the
 * next-case links, metadata) and the colours its sections read.
 */
export interface CaseEntry {
  slug: string;
  n: 1 | 2 | 3;
  title: string;
  kicker: string;
  line: string;
  /** Where the case sits, after "Work /" in its breadcrumb. */
  crumb: string;
  /** Floating nav message over the closing section. */
  closingMsg: string;
  /** Hero stage colour, and the dark question card with its body text. */
  theme: { stage: string; dark?: string; darkMuted?: string };
  load: () => Promise<{ default: MDXContent }>;
}

export const cases: readonly CaseEntry[] = [
  {
    slug: 'wisp',
    n: 1,
    title: copy['work.rows.1.title'],
    kicker: copy['work.rows.1.kicker'],
    line: copy['work.rows.1.line'],
    crumb: '01 · Enterprise',
    closingMsg: caseCopy.wispClose,
    theme: { stage: '#00ff5a', dark: '#0c1a12', darkMuted: '#9fb8a8' },
    load: () => import('./wisp.mdx'),
  },
  {
    slug: 'naira-crypto-exchange',
    n: 2,
    title: copy['work.rows.2.title'],
    kicker: copy['work.rows.2.kicker'],
    line: copy['work.rows.2.line'],
    crumb: '02 · Fintech',
    closingMsg: caseCloseMsg,
    theme: { stage: '#16181d' },
    load: () => import('./naira-crypto-exchange.mdx'),
  },
  {
    slug: 'jewellery-marketplace',
    n: 3,
    title: copy['work.rows.3.title'],
    kicker: copy['work.rows.3.kicker'],
    line: copy['work.rows.3.line'],
    crumb: '03 · Marketplace',
    closingMsg: caseCloseMsg,
    theme: { stage: '#e9dfd1' },
    load: () => import('./jewellery-marketplace.mdx'),
  },
];

export const caseHref = (slug: string) => `/work/${slug}`;

export function caseBySlug(slug: string): CaseEntry | undefined {
  return cases.find((c) => c.slug === slug);
}

/** Looks a case up by slug, failing the build on a typo in an MDX file. */
export function requireCase(slug: string): CaseEntry {
  const entry = caseBySlug(slug);
  if (!entry)
    throw new Error(`Unknown case "${slug}". Known: ${cases.map((c) => c.slug).join(', ')}`);
  return entry;
}
