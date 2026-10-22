import { expect, test } from '@playwright/test';

import { collectErrors } from './helpers';

test.describe('home', () => {
  test('renders every section in order', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    for (const name of [
      'Four things we build.',
      'Products where the details mattered.',
      'We build our own, too.',
      'Five stages, a preview every week.',
      'Pick your build.',
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

  test('pricing cards follow the currency switch', async ({ page }) => {
    await page.goto('/');
    const ways = page.locator('#ways');
    await ways.scrollIntoViewIfNeeded();
    await expect(ways.locator('[data-price="USD"]').first()).toHaveText('$400');
    await ways.getByRole('button', { name: 'NGN ₦' }).click();
    await expect(ways.locator('[data-price="NGN"]').first()).toHaveText('₦560,000');
    await expect(ways.locator('[data-price="USD"]').first()).toBeHidden();
  });

  test('a venture widens when focused from the keyboard', async ({ page, isMobile }) => {
    test.skip(isMobile, 'tiles stack on small screens');
    await page.goto('/');
    await page.getByRole('link', { name: 'See Products' }).focus();
    const tiles = page.locator('#ventures [data-active]');
    await expect(tiles.nth(3)).toHaveAttribute('data-active', 'true');
    await expect(tiles.nth(0)).toHaveAttribute('data-active', 'false');
  });
});
