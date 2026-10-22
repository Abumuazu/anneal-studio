/**
 * Prices are fixed per currency and never converted live. Source:
 * docs/build-handoff.md, section 3. This file is the only place prices live.
 */
export const CURRENCIES = ['USD', 'EUR', 'NGN'] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Amounts = Readonly<Record<Currency, number>>;

export const prices = {
  website: { USD: 400, EUR: 360, NGN: 560_000 },
  aiFeature: { USD: 2_500, EUR: 2_250, NGN: 3_500_000 },
  webMvp: { USD: 4_500, EUR: 4_000, NGN: 6_300_000 },
  mobileMvp: { USD: 8_000, EUR: 7_200, NGN: 11_200_000 },
  care: { USD: 400, EUR: 360, NGN: 560_000 },
  growth: { USD: 3_000, EUR: 2_700, NGN: 4_200_000 },
  featureSprint: { USD: 2_000, EUR: 1_800, NGN: 2_800_000 },
  addonAdmin: { USD: 1_500, EUR: 1_350, NGN: 2_100_000 },
  addonAiLayer: { USD: 1_500, EUR: 1_350, NGN: 2_100_000 },
  addonMobileApp: { USD: 3_500, EUR: 3_150, NGN: 4_900_000 },
  addonExtraPage: { USD: 150, EUR: 135, NGN: 210_000 },
  discoveryWeek: { USD: 900, EUR: 810, NGN: 1_260_000 },
} as const satisfies Record<string, Amounts>;

export type Offer = keyof typeof prices;

const SYMBOL: Record<Currency, string> = { USD: '$', EUR: '€', NGN: '₦' };

/** "$4,500", "€4,000", "₦6,300,000". Grouping follows the boards (en-US). */
export function formatAmount(currency: Currency, amount: number): string {
  return SYMBOL[currency] + amount.toLocaleString('en-US');
}

/** Every currency's formatted amount, for <Price values={...} />. */
export function priceValues(offer: Offer): Record<Currency, string> {
  const a = prices[offer];
  return {
    USD: formatAmount('USD', a.USD),
    EUR: formatAmount('EUR', a.EUR),
    NGN: formatAmount('NGN', a.NGN),
  };
}
