import type { MetadataRoute } from 'next';

import { siteUrl } from '@/lib/seo';

/** Everything is public except the kit's review page and the API. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/kitchen-sink', '/api/'] },
    sitemap: new URL('/sitemap.xml', siteUrl()).toString(),
  };
}
