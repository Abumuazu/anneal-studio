import { expect, test } from '@playwright/test';

import { collectErrors, scrollThrough } from './helpers';

const CASES = [
  {
    path: '/work/wisp',
    h1: 'Press record. Lock the phone. Approve the minutes.',
    next: {
      name: /Next project · 02 · Fintech\s*Naira to crypto exchange/,
      path: '/work/naira-crypto-exchange',
    },
  },
  {
    path: '/work/naira-crypto-exchange',
    h1: 'A crypto exchange built around who holds the licence.',
    next: {
      name: /Next project · 03 · Marketplace\s*Jewellery marketplace/,
      path: '/work/jewellery-marketplace',
    },
  },
  {
    path: '/work/jewellery-marketplace',
    h1: 'Make an offer. Pay only if the seller says yes.',
    next: { name: /Next project · 01 · Enterprise\s*Wisp/, path: '/work/wisp' },
  },
];

test.describe('work', () => {
  test('renders the covers and the full list without errors', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/work');
    await expect(page.getByRole('heading', { level: 1, name: 'Selected work.' })).toBeAttached();
    for (const name of ['Wisp', 'Naira to crypto exchange', 'Jewellery marketplace']) {
      await expect(page.locator('a.cover', { hasText: name })).toBeVisible();
    }
    await expect(page.locator('a.irow')).toHaveCount(6);
    await scrollThrough(page);
    expect(errors).toEqual([]);
  });

  test('the chips filter the list', async ({ page }) => {
    await page.goto('/work');
    const chips = page.getByRole('group', { name: 'Everything, in one list.' });
    const rows = page.locator('a.irow');
    await chips.getByRole('button', { name: /^Ventures/ }).click();
    await expect(chips.getByRole('button', { name: /^Ventures/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(rows.filter({ visible: true })).toHaveCount(3);
    await expect(page.locator('a.irow', { hasText: 'Raum' })).toBeVisible();
    await expect(page.locator('a.irow', { hasText: 'Wisp' })).toBeHidden();
    await chips.getByRole('button', { name: /^Projects/ }).click();
    await expect(page.locator('a.irow', { hasText: 'Wisp' })).toBeVisible();
    await expect(page.locator('a.irow', { hasText: 'Raum' })).toBeHidden();
    await chips.getByRole('button', { name: /^All/ }).click();
    await expect(rows.filter({ visible: true })).toHaveCount(6);
  });

  test('a hovered row shows its preview card', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'fine-pointer hover');
    await page.goto('/work');
    const row = page.locator('a.irow', { hasText: 'Centiiv' });
    await row.scrollIntoViewIfNeeded();
    await row.hover();
    const card = page.locator('.hover-preview');
    await expect(card).toHaveAttribute('data-on', '');
    await expect(card).toContainText('Co-founded · Exited');
    await page.mouse.move(5, 5);
    await expect(card).not.toHaveAttribute('data-on', '');
  });

  test('a cover grows into its case, which opens at the top', async ({ page }) => {
    await page.goto('/work');
    await page.mouse.wheel(0, 600);
    await page.locator('a.cover', { hasText: 'Naira to crypto exchange' }).click();
    await expect(page).toHaveURL(/\/work\/naira-crypto-exchange$/);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'A crypto exchange built around who holds the licence.',
      }),
    ).toBeAttached();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    // The overlay fallback (no View Transitions) removes itself.
    await expect(page.locator('.cover-overlay')).toHaveCount(0);
    await expect(page.locator('[data-cover-target]')).toHaveCount(1);
  });

  test('without View Transitions, an overlay flies to the stage and clears', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(Document.prototype, 'startViewTransition', { value: undefined });
    });
    await page.goto('/work');
    await page.locator('a.cover', { hasText: 'Jewellery marketplace' }).click();
    await expect(page.locator('.cover-overlay')).toHaveCount(1);
    await expect(page).toHaveURL(/\/work\/jewellery-marketplace$/);
    await expect(page.locator('.cover-overlay')).toHaveCount(0, { timeout: 4000 });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });

  test('a cover navigates plainly with reduced motion', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/work');
    await page.locator('a.cover', { hasText: 'Wisp' }).click();
    await expect(page).toHaveURL(/\/work\/wisp$/);
    await expect(page.locator('.cover-overlay')).toHaveCount(0);
    await context.close();
  });
});

for (const c of CASES) {
  test(`${c.path} renders and links to the next case`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(c.path);
    await expect(page.getByRole('heading', { level: 1, name: c.h1 })).toBeAttached();
    await expect(page.getByRole('link', { name: 'Work', exact: true }).first()).toHaveAttribute(
      'href',
      '/work',
    );
    await scrollThrough(page);
    const next = page.getByRole('link', { name: c.next.name });
    await next.scrollIntoViewIfNeeded();
    await next.click();
    await expect(page).toHaveURL(new RegExp(`${c.next.path}$`));
    expect(errors).toEqual([]);
  });
}

test.describe('wisp capture flow', () => {
  test('plays on its own and jumps to a step from the keyboard', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow');
    await page.goto('/work/wisp');
    const flow = page.locator('[data-autoplay]');
    const first = page.getByRole('button', { name: /Start a capture/ });
    await first.scrollIntoViewIfNeeded();
    await expect(first).toHaveAttribute('aria-pressed', 'true');
    // Capture holds for 5.2s, then the flow moves on to the lock screen.
    await expect(page.getByRole('button', { name: /Lock the phone/ })).toHaveAttribute(
      'aria-pressed',
      'true',
      { timeout: 9000 },
    );

    const press = page.getByRole('button', { name: /Long press for controls/ });
    await press.focus();
    await page.keyboard.press('Enter');
    await expect(press).toHaveAttribute('aria-pressed', 'true');
    await expect(press).toContainText('Press and hold to open the full controls');
    await expect(flow).toHaveAttribute('data-autoplay', 'stopped');
    await page.waitForTimeout(4500);
    await expect(press).toHaveAttribute('aria-pressed', 'true');
  });

  test('stays still with reduced motion', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/work/wisp');
    await expect(page.locator('[data-autoplay]')).toHaveAttribute('data-autoplay', 'stopped');
    await page.getByRole('button', { name: /Stop, saved, minutes/ }).click();
    await expect(page.getByRole('button', { name: /Stop, saved, minutes/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await context.close();
  });
});

test.describe('jewellery money flow', () => {
  test('advances one step at a time with the scroll', async ({ page, isMobile }) => {
    test.skip(isMobile, 'pins on wide screens only');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/work/jewellery-marketplace');
    const flow = page.locator('.psteps');
    const { top, height } = await flow.evaluate((el: HTMLElement) => ({
      top: el.getBoundingClientRect().top + window.scrollY,
      height: el.offsetHeight,
    }));
    const active = page.locator('.mflow-step[data-scrubbing="true"][data-active="true"] h3');
    const at = async (f: number) => {
      await page.evaluate((y) => window.scrollTo(0, y), top + (height - 900) * f);
    };
    await at(0.05);
    await expect(active).toHaveText('Buyer makes an offer');
    await expect(page.getByText('Offer ready to send')).toBeVisible();
    await at(0.6);
    await expect(active).toHaveText('Seller decides');
    await expect(page.getByText('With the seller now')).toBeVisible();
    await at(0.95);
    await expect(active).toHaveText('Charge or release');
    await expect(page.getByText('₦420,000 charged')).toBeVisible();
  });

  test('shows every step and the final state with reduced motion', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/work/jewellery-marketplace');
    await expect(page.locator('.mflow-step[data-active="true"]')).toHaveCount(4);
    await expect(page.getByText('Accepted. Charged ₦420,000')).toBeAttached();
    await context.close();
  });
});
