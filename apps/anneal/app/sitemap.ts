import type { MetadataRoute } from 'next';

import { caseHref, cases } from '@/content/cases';
import { siteUrl } from '@/lib/seo';

const PAGES = ['/', '/work', '/services', '/products', '/studio', '/start', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [...PAGES, ...cases.map((c) => caseHref(c.slug))].map((path) => ({
    url: new URL(path, base).toString(),
  }));
}
