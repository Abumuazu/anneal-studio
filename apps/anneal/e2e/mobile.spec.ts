import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { CASE_PATHS, collectErrors, scrollThrough } from './helpers';

const PHONE = { width: 390, height: 844 };

test.describe('phone', () => {
  test.use({ viewport: PHONE, hasTouch: true });

  test('the header has a menu button, not the links', async ({ page }) => {
    await page.goto('/');
    const header = page.getByRole('banner');
    await expect(header.getByRole('button', { name: 'Open menu' })).toBeVisible();
    await expect(header.getByRole('navigation', { name: 'Main navigation' })).toBeHidden();
    await expect(header.getByRole('link', { name: 'Book a call' })).toBeHidden();
  });

  test('the menu opens as a dialog, holds the page and closes with Escape', async ({
    page,
    browserName,
  }) => {
    await page.goto('/');
    const open = page.getByRole('button', { name: 'Open menu' });
    await open.click();
    const menu = page.getByRole('dialog', { name: 'Menu' });
    await expect(menu).toBeVisible();
    await expect(open).toHaveAttribute('aria-expanded', 'true');
    for (const name of ['Work', 'Services', 'Studio']) {
      await expect(menu.getByRole('link', { name, exact: true })).toBeVisible();
    }
    await expect(menu.getByRole('link', { name: 'Book a call' })).toBeVisible();
    await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
    // Focus starts on Close and stays inside the dialog.
    await expect(menu.getByRole('button', { name: 'Close menu' })).toBeFocused();
    // WebKit does not Tab to links by default, so the focus loop is checked in Chromium.
    for (let i = 0; i < (browserName === 'chromium' ? 9 : 0); i++) {
      await page.keyboard.press('Tab');
      expect(await menu.evaluate((m) => m.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(open).toBeFocused();
    await expect(open).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  });

  test('a menu link goes to its page and the menu closes', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page
      .getByRole('dialog', { name: 'Menu' })
      .getByRole('link', { name: 'Services' })
      .click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden();
    await expect(page.locator('html')).not.toHaveCSS('overflow', 'hidden');
  });

  test('the menu button works on every page', async ({ page }) => {
    for (const path of ['/work', '/services', '/products', '/studio', '/start', '/privacy']) {
      await page.goto(path);
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible();
      await page.getByRole('button', { name: 'Close menu' }).click();
      await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden();
    }
  });

  test('the Home hero fits the screen: headline, typing card, lead and both buttons', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1, name: 'What do you need built?' }),
    ).toBeAttached();
    const hero = page.locator('.hero');
    await expect(hero).toBeVisible();
    await expect(hero.getByText('Product studio', { exact: true })).toHaveCount(0);
    await expect(hero.getByText('What are you working on?')).toBeVisible();
    await expect(hero.getByText(/^Anneal designs and builds websites/)).toBeVisible();
    const work = hero.getByRole('link', { name: 'Book a call' });
    const prices = hero.getByRole('link', { name: 'Explore our work' });
    await work.scrollIntoViewIfNeeded();
    await expect(work).toBeInViewport();
    await expect(prices).toBeVisible();
    const box = await hero.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(PHONE.height - 1);
    expect(errors).toEqual([]);
  });

  test('the typing card cycles through the three examples', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('.hero-ask');
    await expect(card).toContainText('a website that explains our business', { timeout: 6000 });
    await expect(card).toContainText('an AI workflow connected to our systems', {
      timeout: 12_000,
    });
  });

  test('the process cards follow the swipe', async ({ page }) => {
    await page.goto('/');
    const process = page.locator('#process');
    await process.scrollIntoViewIfNeeded();
    await expect(process.getByText('01', { exact: true }).first()).toBeVisible();
    await expect(process).toContainText('01/05');
    const track = process.locator('.htrack-vp');
    await track.evaluate((el) => el.scrollTo({ left: 298 * 2 }));
    await expect(process).toContainText('03/05');
    await expect(process.locator('[data-active="true"]')).toContainText('Design');
    await track.evaluate((el) => el.scrollTo({ left: el.scrollWidth }));
    await expect(process).toContainText('05/05');
    await expect(process.locator('[data-active="true"]')).toContainText('Improve');
    await expect(page.getByText('Swipe for the next stage')).toBeVisible();
  });

  test('the footer keeps six still tiles and has no playground', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.phys')).toBeHidden();
    const tiles = page.locator('[data-rest-tiles] > span');
    await expect(tiles).toHaveCount(6);
    await tiles.first().scrollIntoViewIfNeeded();
    // The tiles must not move or spin on their own.
    const read = () => tiles.evaluateAll((els) => els.map((e) => getComputedStyle(e).transform));
    const before = await read();
    await page.waitForTimeout(2000);
    expect(await read()).toEqual(before);
  });

  test('the footer links carry an arrow at the right, with no hover needed', async ({ page }) => {
    await page.goto('/');
    const link = page
      .getByRole('navigation', { name: 'Footer navigation' })
      .getByRole('link', { name: /^Work/ });
    await link.scrollIntoViewIfNeeded();
    await expect(link.locator('.arrow')).toHaveCSS('opacity', '1');
  });

  test('the floating bar shows the section message and a light button', async ({ page }) => {
    await page.goto('/');
    await page.mouse.wheel(0, 1600);
    const bar = page.getByRole('navigation', { name: 'On this page' });
    await expect(bar).toHaveAttribute('data-visible', '');
    await expect(bar.locator('.fnav-msg')).toBeVisible();
    await expect(bar.locator('.fnav-msg')).not.toBeEmpty();
    await expect(bar.getByRole('link', { name: 'Book a call' })).toBeVisible();
    const box = await bar.boundingBox();
    expect(box?.width).toBeGreaterThan(PHONE.width - 40);
  });

  test('the closing has a button and call link, with nothing following the pointer', async ({
    page,
  }) => {
    await page.goto('/');
    const closing = page.locator('#contact');
    await closing.scrollIntoViewIfNeeded();
    const cta = closing.getByRole('link', { name: 'Book a call' }).last();
    await expect(cta).toBeVisible();
    await expect(closing.getByRole('link', { name: /Send a brief/ })).toBeVisible();
    // The pill that follows a mouse pointer is for wide screens only.
    await expect(closing.locator('.follow-target a')).toBeHidden();
  });

  test('axe finds nothing on Home with the menu open', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible();
    // Let the menu finish fading in: axe would measure colours mid-fade.
    await page.waitForTimeout(700);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      results.violations.map(
        (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
      ),
    ).toEqual([]);
  });

  for (const path of [
    '/',
    '/work',
    ...CASE_PATHS,
    '/services',
    '/products',
    '/studio',
    '/start',
    '/privacy',
  ]) {
    test(`axe at 390px: ${path}`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({
        baseURL,
        viewport: PHONE,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      await page.goto(path);
      await scrollThrough(page);
      await page.waitForTimeout(800);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .exclude('.phone')
        .exclude('.browser-frame')
        .analyze();
      expect(
        results.violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
        ),
      ).toEqual([]);
      await context.close();
    });
  }
});

test.describe('no horizontal overflow', () => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    test(`at ${String(width)}px on every page`, async ({ page }) => {
      test.setTimeout(120_000);
      await page.setViewportSize({ width, height: 800 });
      for (const path of [
        '/',
        '/work',
        ...CASE_PATHS,
        '/services',
        '/products',
        '/studio',
        '/start',
        '/privacy',
      ]) {
        await page.goto(path, { waitUntil: 'domcontentloaded' });
        await scrollThrough(page);
        const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scroll, `${path} at ${String(width)}px`).toBeLessThanOrEqual(width);
      }
    });
  }
});

test.describe('wide screens', () => {
  test.use({ viewport: { width: 1000, height: 800 } });

  test('the exchange card leads the Home case cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#work .case-link');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0).getByRole('heading', { level: 3 })).toHaveText(
      'Naira to crypto exchange',
    );
    await expect(cards.nth(0)).toContainText('01/03');
    await expect(cards.nth(1).getByRole('heading', { level: 3 })).toHaveText('Wisp');
    await expect(cards.nth(2).getByRole('heading', { level: 3 })).toHaveText(
      'Jewellery marketplace',
    );
  });

  test('the footer tiles settle and stay still, even after a throw', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'timing sensitive');
    test.setTimeout(60_000);
    await page.goto('/');
    const play = page.getByRole('button', { name: 'Go on, throw these around.' });
    await play.scrollIntoViewIfNeeded();
    await expect(play).toHaveAttribute('data-ready', '');
    const read = () =>
      page
        .locator('.phys-tile')
        .evaluateAll((els) => els.map((e) => (e as HTMLElement).style.transform));
    // Dropped, they come to rest and stop.
    await page.waitForTimeout(7000);
    const rest = await read();
    await page.waitForTimeout(1500);
    expect(await read()).toEqual(rest);
    // Thrown, they settle again.
    await play.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(9000);
    const again = await read();
    await page.waitForTimeout(1500);
    expect(await read()).toEqual(again);
  });
});

test.describe('the desktop icon', () => {
  test('stands for Website, and the footer has one beside the phone icon', async ({ page }) => {
    await page.goto('/');
    const uses = await page
      .locator('use')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    expect(uses.filter((h) => h === '#g-web').length).toBeGreaterThan(2);
    await expect(page.locator('[data-rest-tiles] use[href="#g-web"]')).toHaveCount(1);
    await expect(page.locator('[data-rest-tiles] use[href="#g-app"]')).toHaveCount(1);
  });
});
