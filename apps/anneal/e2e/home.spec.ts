import { expect, test } from '@playwright/test';

import { collectErrors } from './helpers';

test.describe('home', () => {
  for (const width of [1440, 390]) {
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      test(`floating navigation appears early and stays visible at ${width}px (${reducedMotion})`, async ({
        browser,
        baseURL,
      }) => {
        const context = await browser.newContext({
          baseURL,
          viewport: { width, height: 900 },
          reducedMotion,
        });
        const page = await context.newPage();
        await page.goto('/');
        await expect(page.locator('html')).not.toHaveAttribute('data-preload', { timeout: 8000 });
        const nav = page.locator('.fnav');
        await expect(nav).not.toHaveAttribute('data-visible');
        for (const y of [240, 1400]) {
          await page.evaluate((top) => window.scrollTo(0, top), y);
          await expect(nav).toHaveAttribute('data-visible', '');
          await expect(nav.getByRole('link', { name: 'Book a call' })).toBeVisible();
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await expect(nav).not.toHaveAttribute('data-visible');
        await context.close();
      });
    }
  }

  test('renders every section in order', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    for (const name of [
      'What do you need built?',
      'The work behind the interface.',
      'We build our own, too.',
      'A preview link from week one.',
      'Start with a defined project.',
    ]) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeAttached();
    }
    await expect(page.locator('#studio')).toBeAttached();
    expect(errors).toEqual([]);
  });

  test('plays the preloader once per session, then lands the tiles', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-preload', /count|split|fly|landed/);
    await expect(html).not.toHaveAttribute('data-preload', { timeout: 8000 });
    await expect(page.locator('[data-hero-tile="1"] .morph-tile')).toBeVisible();
    await page.reload();
    await expect(html).not.toHaveAttribute('data-preload');
  });

  test('skips the preloader with reduced motion', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).not.toHaveAttribute('data-preload');
    await expect(page.locator('.pre')).toBeHidden();
    await context.close();
  });

  test('build blocks open one at a time from the keyboard', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow');
    await page.goto('/');
    const site = page.getByRole('button', { name: /Website/ });
    const ai = page.getByRole('button', { name: /AI feature/ });
    await expect(site).toHaveAttribute('aria-expanded', 'true');
    await ai.focus();
    await page.keyboard.press('Enter');
    await expect(ai).toHaveAttribute('aria-expanded', 'true');
    await expect(site).toHaveAttribute('aria-expanded', 'false');
    await page.keyboard.press('Enter');
    await expect(ai).toHaveAttribute('aria-expanded', 'false');
  });

  test('case cards are links whose names include their titles', async ({ page }) => {
    await page.goto('/');
    const cases = page.locator('#work');
    await expect(cases.locator('a[href="/work/wisp"]')).toHaveAccessibleName(/Wisp/);
    await expect(cases.locator('a[href="/work/naira-crypto-exchange"]')).toHaveAccessibleName(
      /Naira to crypto exchange/,
    );
    await expect(cases.locator('a[href="/work/jewellery-marketplace"]')).toHaveAccessibleName(
      /Jewellery marketplace/,
    );
  });

  test('offers have enquiry actions and no public price controls', async ({ page }) => {
    await page.goto('/');
    const ways = page.locator('#ways');
    await expect(ways.locator('article.way')).toHaveCount(4);
    await expect(ways.locator('[data-price]')).toHaveCount(0);
    await expect(page.getByRole('group', { name: 'Currency' })).toHaveCount(0);
    await expect(ways.getByRole('link', { name: 'Discuss ongoing work' })).toHaveAttribute(
      'href',
      '/start',
    );
    await expect(
      ways.getByText('You can also start here with an existing product', { exact: false }),
    ).toBeAttached();
  });

  test('a venture widens when focused from the keyboard', async ({ page, isMobile }) => {
    test.skip(isMobile, 'tiles stack on small screens');
    await page.goto('/');
    await page.getByRole('link', { name: 'Explore our products' }).focus();
    const tiles = page.locator('#ventures [data-active]');
    await expect(tiles.nth(3)).toHaveAttribute('data-active', 'true');
    await expect(tiles.nth(0)).toHaveAttribute('data-active', 'false');
  });
});
