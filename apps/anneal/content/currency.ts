import { CURRENCIES, type Currency } from './prices';

export const CURRENCY_COOKIE = 'currency';
export const DEFAULT_CURRENCY: Currency = 'USD';

/**
 * Euro area members as of 1 January 2026 (Bulgaria joined on that date).
 * Countries that use the euro without being members (Andorra, Kosovo, Monaco,
 * Montenegro, San Marino, Vatican City) are not included: see the M1 spec
 * questions.
 */
export const EURO_AREA = new Set([
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PT',
  'SK',
  'SI',
  'ES',
]);

/** Default currency from an ISO country code (Vercel's x-vercel-ip-country). */
export function currencyForCountry(country: string | null | undefined): Currency {
  const c = (country ?? '').toUpperCase();
  if (c === 'NG') return 'NGN';
  if (EURO_AREA.has(c)) return 'EUR';
  return 'USD';
}

export function isCurrency(value: string | null | undefined): value is Currency {
  return (CURRENCIES as readonly string[]).includes(value ?? '');
}

export const currencyOptions = [
  { code: 'USD', label: 'USD $' },
  { code: 'EUR', label: 'EUR €' },
  { code: 'NGN', label: 'NGN ₦' },
] as const satisfies readonly { code: Currency; label: string }[];
