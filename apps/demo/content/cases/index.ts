import type { MDXContent } from 'mdx/types';

/** The site's case studies. Add an MDX file next to this one and list it here. */
export interface CaseEntry {
  slug: string;
  title: string;
  kicker: string;
  line: string;
  /** The cover and hero stage colour. */
  colour: string;
  load: () => Promise<{ default: MDXContent }>;
}

export const cases: readonly CaseEntry[] = [
  {
    slug: 'example',
    title: 'Example case',
    kicker: 'Product · Web',
    line: 'Template placeholder: one line on what was built and why it mattered.',
    colour: 'var(--color-accent)',
    load: () => import('./example.mdx'),
  },
];

export const caseHref = (slug: string) => `/work/${slug}`;
export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
