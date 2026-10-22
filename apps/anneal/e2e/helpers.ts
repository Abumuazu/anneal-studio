import { type ConsoleMessage, type Page } from '@playwright/test';

/** Console errors worth failing on. Ignores the missing favicon (M6). */
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() !== 'error') return;
    const where = msg.location().url;
    if (msg.text().includes('404') && where.includes('favicon.ico')) return;
    errors.push(`${msg.text()} @ ${where}`);
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

/** Waits for web fonts so measurements and screenshots are stable. */
export async function fontsReady(page: Page): Promise<void> {
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
}

/** Scrolls through the whole page so every scroll-revealed state has run. */
export async function scrollThrough(page: Page): Promise<void> {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
  });
}

export const CASE_PATHS = [
  '/work/wisp',
  '/work/naira-crypto-exchange',
  '/work/jewellery-marketplace',
] as const;
