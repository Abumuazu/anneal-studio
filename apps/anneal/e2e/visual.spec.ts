import { expect, test } from '@playwright/test';

import { fontsReady } from './helpers';

/**
 * Full-page snapshots at the four spec widths, with reduced motion so every
 * element is in its final state. Live clocks, the physics playground and the
 * case mockups (live tickers) are masked because they depend on time.
 */
const WIDTHS = [1440, 1024, 768, 390];
const PAGES = [
  { name: 'home', path: '/' },
  { name: 'work', path: '/work' },
  { name: 'case-wisp', path: '/work/wisp' },
  { name: 'case-exchange', path: '/work/naira-crypto-exchange' },
  { name: 'case-jewellery', path: '/work/jewellery-marketplace' },
  { name: 'start', path: '/start' },
  { name: 'services', path: '/services' },
  { name: 'products', path: '/products' },
  { name: 'studio', path: '/studio' },
  { name: 'privacy', path: '/privacy' },
  { name: 'kitchen-sink', path: '/kitchen-sink' },
  { name: 'not-found', path: '/no-such-page' },
];

test.use({ reducedMotion: 'reduce', timezoneId: 'Africa/Lagos' });

/** Fixed call slots, so the Start page does not change with the date. */
const SLOTS = {
  ok: true,
  days: [
    '2026-10-22',
    '2026-10-23',
    '2026-10-26',
    '2026-10-27',
    '2026-10-28',
    '2026-10-29',
    '2026-10-30',
    '2026-11-02',
    '2026-11-03',
    '2026-11-04',
  ].map((date) => ({
    date,
    slots: ['09:00', '10:30', '13:00', '15:30'].map((t) => `${date}T${t}:00.000Z`),
  })),
};

for (const width of WIDTHS) {
  for (const p of PAGES) {
    test(`${p.name} @ ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.route('**/api/slots', (route) => route.fulfill({ json: SLOTS }));
      await page.goto(p.path);
      await fontsReady(page);
      // Lazy images (team photo, venture shots) would otherwise race the capture.
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].map((img) => {
            img.loading = 'eager';
            return img.complete
              ? Promise.resolve()
              : new Promise((resolve) => {
                  img.addEventListener('load', resolve, { once: true });
                  img.addEventListener('error', resolve, { once: true });
                });
          }),
        );
      });
      await expect(page).toHaveScreenshot(`${p.name}-${width}.png`, {
        fullPage: true,
        mask: [
          page.locator('[data-clock]'),
          page.locator('.phys'),
          page.locator('.phone, .browser-frame'),
        ],
      });
    });
  }
}
