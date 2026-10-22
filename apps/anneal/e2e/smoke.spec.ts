import { expect, test } from '@playwright/test';

import { CASE_PATHS, collectErrors, fontsReady, scrollThrough } from './helpers';

test.describe('smoke', () => {
  test('home renders the headline, header, closing and footer', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/');
    await expect(
      page.getByRole('heading', { level: 1, name: 'What do you need built?' }),
    ).toBeAttached();
    await expect(
      page.getByRole('banner').getByRole('link', { name: 'Anneal', exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeAttached();
    // Wide screens have the throwable playground; phones have still tiles instead.
    const wide = (page.viewportSize()?.width ?? 0) > 900;
    await expect(page.getByRole('button', { name: 'Go on, throw these around.' })).toHaveCount(
      wide ? 1 : 0,
    );
    await expect(page.locator(wide ? '.phys' : '[data-rest-tiles]')).toBeAttached();
    await expect(page.getByRole('img', { name: 'Anneal' })).toBeAttached();
    await fontsReady(page);
    expect(errors).toEqual([]);
  });

  test('boot script sets motion and currency before hydration', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-motion', /^(full|reduce)$/);
    await expect(html).toHaveAttribute('data-currency', 'USD');
  });

  test('kitchen sink lists every primitive', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/kitchen-sink');
    for (const name of [
      'Tokens',
      'UI',
      'InView + Reveal + LineMask',
      'TypingLine',
      'WordLight',
      'Parallax',
      'Zoom',
      'StackCards',
      'ScrollSteps',
      'Marquee',
      'CursorLabel',
      'ExpandGroup',
      'FlexTiles',
      'PhoneFrame + BrowserFrame',
      'HandoffLink',
    ]) {
      await expect(page.getByRole('heading', { level: 2, name, exact: true })).toBeAttached();
    }
    expect(errors).toEqual([]);
  });
});

test.describe('layout', () => {
  for (const path of [
    '/',
    '/work',
    ...CASE_PATHS,
    '/services',
    '/products',
    '/studio',
    '/privacy',
    '/kitchen-sink',
    '/start',
  ]) {
    test(`no horizontal overflow on ${path}`, async ({ page }) => {
      await page.goto(path);
      await scrollThrough(page);
      const { scroll, viewport } = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }));
      expect(scroll).toBeLessThanOrEqual(viewport);
    });
  }
});

test.describe('currency', () => {
  test('defaults from the visitor country and remembers a switch', async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      baseURL,
      extraHTTPHeaders: { 'x-vercel-ip-country': 'NG' },
    });
    const page = await context.newPage();
    await page.goto('/kitchen-sink');
    await expect(page.locator('html')).toHaveAttribute('data-currency', 'NGN');
    const ui = page.locator('#ui');
    await expect(ui.locator('[data-price="NGN"]')).toBeVisible();
    await expect(ui.locator('[data-price="USD"]')).toBeHidden();

    await ui.getByRole('button', { name: 'EUR €' }).click();
    await expect(ui.locator('[data-price="EUR"]')).toHaveText('€360');
    // Every switch on the page follows.
    await expect(
      page.getByRole('contentinfo').getByRole('button', { name: 'EUR €' }),
    ).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-currency', 'EUR');
    await context.close();
  });

  test('maps a euro area country to EUR', async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      baseURL,
      extraHTTPHeaders: { 'x-vercel-ip-country': 'ES' },
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-currency', 'EUR');
    await context.close();
  });
});

test.describe('motion', () => {
  test('the toggle swaps every primitive to its reduced path and back', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'pinned layouts only exist on desktop widths');
    await page.goto('/kitchen-sink');
    const html = page.locator('html');
    const toggle = page.getByRole('switch', { name: 'Reduced motion' });
    await expect(html).toHaveAttribute('data-motion', 'full');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
    await expect(html).toHaveAttribute('data-motion', 'reduce');
    await expect(html).not.toHaveClass(/lenis/);
    await expect(page.locator('.htrack-sticky')).toHaveCSS('position', 'static');
    await expect(page.locator('.morph-tile').first()).toHaveCSS('animation-name', 'none');
    await expect(page.locator('.rv').first()).toHaveCSS('opacity', '1');

    await page.reload();
    await expect(html).toHaveAttribute('data-motion', 'reduce');

    await page.getByRole('switch', { name: 'Reduced motion' }).click();
    await expect(html).toHaveAttribute('data-motion', 'full');
    await expect(html).toHaveClass(/lenis/);
  });

  test('the OS setting is honoured with no override', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/kitchen-sink');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduce');
    await expect(page.getByRole('switch', { name: 'Reduced motion' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await context.close();
  });

  test('the floating nav appears after scrolling and follows the section', async ({ page }) => {
    await page.goto('/kitchen-sink');
    const nav = page.getByRole('navigation', { name: 'Quick' });
    await expect(nav).not.toHaveAttribute('data-visible');
    await page.locator('#words').scrollIntoViewIfNeeded();
    await expect(nav).toHaveAttribute('data-visible', '');
    await expect(nav.locator('.fnav-msg')).toHaveText('WordLight');
  });
});

test.describe('work with us', () => {
  test('morphs, navigates to start and lifts away', async ({ page }) => {
    await page.goto('/kitchen-sink');
    await page.locator('#handoff').scrollIntoViewIfNeeded();
    const overlay = page.locator('.handoff');
    await page.locator('#handoff').getByRole('link', { name: 'Work with us' }).first().click();
    await expect(overlay).toHaveAttribute('data-content', '', { timeout: 1500 });
    await expect(page).toHaveURL(/\/start$/, { timeout: 4000 });
    await expect(
      page.getByRole('heading', { level: 1, name: 'Tell us what you are building.' }),
    ).toBeVisible();
    await expect(overlay).toHaveCSS('opacity', '0', { timeout: 4000 });
    expect(await page.evaluate(() => sessionStorage.getItem('anneal-wwu'))).toBeNull();
  });

  test('plays the arrival on a full reload with a fresh flag', async ({ page }) => {
    await page.goto('/start');
    // The cover lasts about 1.5s, which a busy test runner can miss between
    // polls. Sample the overlay every frame from the start of the document.
    await page.addInitScript(() => {
      const w = window as Window & { __coveredFrames?: number };
      w.__coveredFrames = 0;
      const sample = () => {
        const o = document.querySelector('.handoff');
        if (
          o &&
          getComputedStyle(o).opacity === '1' &&
          o.getBoundingClientRect().width >= innerWidth
        ) {
          w.__coveredFrames = (w.__coveredFrames ?? 0) + 1;
        }
      };
      // Animation frames, and a timer too: a busy runner can starve either one.
      const frame = () => {
        sample();
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
      setInterval(sample, 16);
    });
    await page.evaluate(() => sessionStorage.setItem('anneal-wwu', String(Date.now())));
    await page.reload();
    const overlay = page.locator('.handoff');
    await expect(overlay).toHaveCSS('opacity', '0', { timeout: 4000 });
    const covered = await page.evaluate(
      () => (window as Window & { __coveredFrames?: number }).__coveredFrames ?? 0,
    );
    expect(covered).toBeGreaterThan(0);
  });

  test('ignores a stale flag', async ({ page }) => {
    await page.goto('/start');
    await page.evaluate(() => sessionStorage.setItem('anneal-wwu', String(Date.now() - 60_000)));
    await page.reload();
    await expect(page.locator('html')).not.toHaveAttribute('data-handoff');
    await expect(page.locator('.handoff')).toHaveCSS('opacity', '0');
  });

  test('navigates plainly with reduced motion', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, reducedMotion: 'reduce' });
    const page = await context.newPage();
    await page.goto('/kitchen-sink');
    await page.locator('#handoff').getByRole('link', { name: 'Work with us' }).first().click();
    await expect(page).toHaveURL(/\/start$/);
    await expect(page.locator('.handoff')).toHaveCSS('opacity', '0');
    await context.close();
  });
});

test.describe('keyboard', () => {
  test('the physics playground throws on Enter', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard flow');
    await page.goto('/');
    const play = page.getByRole('button', { name: 'Go on, throw these around.' });
    await play.scrollIntoViewIfNeeded();
    await expect(play).toHaveAttribute('data-ready', '');
    await play.focus();
    await expect(play).toBeFocused();
    const before = await page.locator('.phys-tile').first().getAttribute('style');
    await page.keyboard.press('Enter');
    await expect
      .poll(() => page.locator('.phys-tile').first().getAttribute('style'))
      .not.toBe(before);
  });

  test('the floating nav is out of the tab order while hidden', async ({ page }) => {
    await page.goto('/');
    expect(
      await page
        .getByRole('navigation', { name: 'Quick' })
        .evaluate((n) => (n as HTMLElement).inert),
    ).toBe(true);
  });
});
