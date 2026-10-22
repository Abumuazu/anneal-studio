import { currencyForCountry, isCurrency } from './currency';

describe('currencyForCountry', () => {
  it('maps Nigeria to NGN', () => {
    expect(currencyForCountry('NG')).toBe('NGN');
    expect(currencyForCountry('ng')).toBe('NGN');
  });

  it('maps euro area members to EUR, including Bulgaria from 2026', () => {
    for (const c of ['ES', 'DE', 'FR', 'IE', 'HR', 'BG']) expect(currencyForCountry(c)).toBe('EUR');
  });

  it('maps everywhere else, and unknown, to USD', () => {
    for (const c of ['US', 'GB', 'GH', 'CH', 'SE', '', null, undefined])
      expect(currencyForCountry(c)).toBe('USD');
  });
});

describe('isCurrency', () => {
  it('accepts only supported codes', () => {
    expect(isCurrency('EUR')).toBe(true);
    expect(isCurrency('GBP')).toBe(false);
    expect(isCurrency(undefined)).toBe(false);
  });
});
