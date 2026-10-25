import type { Metadata } from 'next';

import { site } from '@/content/site.config';

/**
 * The canonical origin. Set NEXT_PUBLIC_SITE_URL once the domain is chosen
 * (an open item); Vercel's production URL stands in until then.
 */
export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (explicit) return new URL(explicit);
  if (vercel) return new URL(`https://${vercel}`);
  return new URL(`http://localhost:${process.env.PORT ?? '3000'}`);
}

/** Title, description, canonical URL and social cards for one page. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page name; the site name is appended. Omit on Home. */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const full = title ? (title.includes(' | ') ? title : `${title} | ${site.name}`) : site.name;
  // A page's openGraph replaces its parent's, so name the site card here; a
  // route with its own opengraph-image file (the cases) still overrides it.
  const images = [{ url: '/opengraph-image', width: 1200, height: 630, alt: site.name }];
  return {
    title: full,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      siteName: site.name,
      type: 'website',
      images,
    },
    twitter: { card: 'summary_large_image', title: full, description, images },
  };
}
