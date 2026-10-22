import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { CASE_PATHS, fontsReady } from './helpers';

const PAGES = [
  '/',
  '/work',
  ...CASE_PATHS,
  '/services',
  '/products',
  '/studio',
  '/privacy',
  '/kitchen-sink',
  '/start',
  '/no-such-page',
];

for (const path of PAGES) {
  for (const motion of ['no-preference', 'reduce'] as const) {
    test(`axe: ${path} (${motion})`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({ baseURL, reducedMotion: motion });
      const page = await context.newPage();
      await page.goto(path);
      await fontsReady(page);
      // Scroll through so every revealed state is the one being checked.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1500);
      let axe = new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        // Phone and browser mockups are pictures of product UI: WCAG 1.4.3
        // exempts text in images that carry other significant visual content.
        .exclude('.phone')
        .exclude('.browser-frame');
      // Scroll effects leave sections mid-fade or mid-scale wherever the page
      // happens to stop. Contrast is checked in the reduced-motion run, where
      // every element renders in its final colours.
      if (motion === 'no-preference') axe = axe.disableRules(['color-contrast']);
      const results = await axe.analyze();
      expect(
        results.violations.map(
          (v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
        ),
      ).toEqual([]);
      await context.close();
    });
  }
}
