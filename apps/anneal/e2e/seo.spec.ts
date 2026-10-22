import { expect, test } from '@playwright/test';

import { CASE_PATHS, collectErrors } from './helpers';

const PAGES = [
  '/',
  '/work',
  ...CASE_PATHS,
  '/services',
  '/products',
  '/studio',
  '/start',
  '/privacy',
];

test.describe('search and sharing', () => {
  test('robots allows the site and points at the sitemap', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text();
    expect(body).toContain('Allow: /');
    expect(body).toContain('Disallow: /kitchen-sink');
    expect(body).toMatch(/Sitemap: .*\/sitemap\.xml/);
  });

  test('the sitemap lists every public page', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text();
    for (const path of PAGES)
      expect(xml).toMatch(new RegExp(`<loc>[^<]*${path === '/' ? '/' : path}</loc>`));
    expect(xml).not.toContain('kitchen-sink');
  });

  test('every page has its own title, description, canonical and social card', async ({
    request,
  }) => {
    // The head is server-rendered, so plain requests are enough (and fast).
    const attr = (html: string, pattern: RegExp) => pattern.exec(html)?.[1] ?? '';
    const titles = new Set<string>();
    for (const path of PAGES) {
      const html = await (await request.get(path)).text();
      const title = attr(html, /<title>([^<]*)<\/title>/);
      expect(title, path).toMatch(/Anneal Studio$/);
      titles.add(title);
      expect(attr(html, /<meta name="description" content="([^"]*)"/), path).toMatch(/.{40,}/);
      const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
      expect(new URL(canonical).pathname.replace(/\/$/, '') || '/', path).toBe(path);
      const image = attr(html, /<meta property="og:image" content="([^"]*)"/);
      const res = await request.get(new URL(image).pathname);
      expect(res.status(), path).toBe(200);
      expect(res.headers()['content-type'], path).toBe('image/png');
    }
    expect(titles.size).toBe(PAGES.length);
  });

  test('home describes the studio for search engines', async ({ page }) => {
    await page.goto('/');
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(json ?? '{}')).toMatchObject({
      '@type': 'Organization',
      name: 'Anneal Studio',
    });
  });

  test('sends the security headers', async ({ request }) => {
    const headers = (await request.get('/')).headers();
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });
});

test.describe('not found', () => {
  test('answers 404 with the site navigation', async ({ page }) => {
    const errors = collectErrors(page);
    const res = await page.goto('/no-such-page');
    expect(res?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible();
    await page.locator('main').getByRole('link', { name: /Work/ }).click();
    await expect(page).toHaveURL(/\/work$/);
    expect(errors.filter((e) => !e.includes('404'))).toEqual([]);
  });

  test('an unknown case is a 404 too', async ({ request }) => {
    expect((await request.get('/work/not-a-case')).status()).toBe(404);
  });
});
