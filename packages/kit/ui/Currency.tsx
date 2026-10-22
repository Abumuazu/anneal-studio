'use client';

import { type ReactNode, useSyncExternalStore } from 'react';

import { cx } from '../lib/cx';
import { readCurrency, setCurrency, subscribeCurrency } from './currency-store';

export interface CurrencyOption {
  code: string;
  /** Button text, e.g. "USD $". */
  label: string;
}

interface CurrencySwitchProps {
  options: readonly CurrencyOption[];
  /** Cookie that remembers the choice. Match the boot script. */
  cookie: string;
  /** Accessible name for the group, e.g. "Currency". */
  label: string;
  /** Visible text before the buttons, e.g. "Prices in". */
  prefix?: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Segmented currency buttons. Every instance on the page stays in sync, and
 * every <Price> switches with it.
 */
export function CurrencySwitch({
  options,
  cookie,
  label,
  prefix,
  tone = 'light',
  className,
}: CurrencySwitchProps) {
  const current = useSyncExternalStore(subscribeCurrency, readCurrency, () => null);
  return (
    <div
      role="group"
      aria-label={label}
      className={cx('flex flex-wrap items-center gap-1.5', className)}
    >
      {prefix}
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          className={cx('choice', tone === 'dark' ? 'choice-dark' : 'choice-light')}
          aria-pressed={current === o.code}
          onClick={() => setCurrency(o.code, cookie)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
