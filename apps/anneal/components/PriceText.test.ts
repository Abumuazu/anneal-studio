import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { copy } from '@/content/copy';

import { knownAmount } from './PriceText';

describe('PriceText', () => {
  it('maps every dollar amount used on Services to a price in prices.ts', () => {
    const services = Object.entries(copy).filter(([k]) => k.startsWith('services.'));
    const amounts = services.flatMap(([, v]) =>
      [...v.matchAll(/\$([\d,]+)/g)].map((m) => Number(m[1]?.replace(/,/g, ''))),
    );
    expect(amounts.length).toBeGreaterThan(5);
    for (const a of amounts) expect(knownAmount(a)).toBe(true);
  });

  it('is only used with amounts from build-handoff.md', () => {
    const handoff = readFileSync(
      fileURLToPath(new URL('../../../docs/build-handoff.md', import.meta.url)),
      'utf8',
    );
    for (const a of [400, 900, 1500, 2000, 3000, 3500, 150]) {
      expect(handoff).toContain(a.toLocaleString('en-US'));
    }
  });
});
