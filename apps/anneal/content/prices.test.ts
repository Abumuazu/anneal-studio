import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { CURRENCIES, formatAmount, priceValues, prices } from './prices';

const handoffPath = fileURLToPath(new URL('../../../docs/build-handoff.md', import.meta.url));

const ROWS: Record<string, keyof typeof prices> = {
  Website: 'website',
  'AI feature': 'aiFeature',
  'Web MVP': 'webMvp',
  'Mobile MVP': 'mobileMvp',
  'Care (monthly)': 'care',
  'Growth (monthly, 3-month minimum)': 'growth',
  'Feature sprint': 'featureSprint',
  'Add-on: admin dashboard': 'addonAdmin',
  'Add-on: AI layer on an MVP': 'addonAiLayer',
  'Add-on: mobile app alongside a Web MVP': 'addonMobileApp',
  'Add-on: extra website page': 'addonExtraPage',
  'Discovery week (credited to the build)': 'discoveryWeek',
};

describe('prices', () => {
  const md = readFileSync(handoffPath, 'utf8');
  const table = md.slice(md.indexOf('## 3. Offers and prices'), md.indexOf('## 4.'));

  it.each(Object.entries(ROWS))('%s matches build-handoff.md', (label, key) => {
    const row = table.split('\n').find((l) => l.startsWith(`| ${label} |`));
    expect(row).toBeDefined();
    const cells = (row ?? '').split('|').map((c) => c.trim());
    const [usd, eur, ngn] = cells.slice(3, 6).map((c) => Number(c.replace(/,/g, '')));
    expect(prices[key]).toEqual({ USD: usd, EUR: eur, NGN: ngn });
  });

  it('covers every row in the table', () => {
    const rows = table.split('\n').filter((l) => /^\| [A-Z]/.test(l) && !l.startsWith('| Offer'));
    expect(rows).toHaveLength(Object.keys(ROWS).length);
  });

  it('formats with the board grouping and symbols', () => {
    expect(formatAmount('NGN', 11_200_000)).toBe('₦11,200,000');
    expect(formatAmount('EUR', 360)).toBe('€360');
    expect(priceValues('webMvp')).toEqual({ USD: '$4,500', EUR: '€4,000', NGN: '₦6,300,000' });
  });

  it('has an amount for every currency', () => {
    for (const a of Object.values(prices))
      for (const c of CURRENCIES) expect(a[c]).toBeGreaterThan(0);
  });
});
