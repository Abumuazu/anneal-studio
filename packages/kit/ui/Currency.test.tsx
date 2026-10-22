import { act, render, screen } from '@testing-library/react';
import * as userEventLike from '@testing-library/dom';

import { CurrencySwitch } from './Currency';
import { CURRENCY_EVENT, currencyCss } from './currency-store';

const options = [
  { code: 'USD', label: 'USD $' },
  { code: 'EUR', label: 'EUR €' },
  { code: 'GBP', label: 'GBP £' },
];

describe('CurrencySwitch', () => {
  beforeEach(() => {
    document.documentElement.setAttribute('data-currency', 'USD');
  });

  it('marks the current currency as pressed and switches on click', async () => {
    const heard: string[] = [];
    window.addEventListener(CURRENCY_EVENT, (e) => heard.push((e as CustomEvent<string>).detail));
    render(<CurrencySwitch options={options} cookie="currency" label="Currency" />);

    expect(screen.getByRole('group', { name: 'Currency' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'USD $' })).toHaveAttribute('aria-pressed', 'true');

    await act(async () => {
      userEventLike.fireEvent.click(screen.getByRole('button', { name: 'GBP £' }));
      // Let the MutationObserver deliver.
      await Promise.resolve();
    });

    expect(document.documentElement.dataset.currency).toBe('GBP');
    expect(document.cookie).toContain('currency=GBP');
    expect(heard).toEqual(['GBP']);
    expect(screen.getByRole('button', { name: 'GBP £' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'USD $' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('keeps several switches in sync', async () => {
    render(
      <>
        <CurrencySwitch options={options} cookie="currency" label="Currency" />
        <CurrencySwitch options={options} cookie="currency" label="Currency footer" tone="dark" />
      </>,
    );
    const [first] = screen.getAllByRole('button', { name: 'EUR €' });
    if (!first) throw new Error('missing EUR button');
    await act(async () => {
      userEventLike.fireEvent.click(first);
      await Promise.resolve();
    });
    for (const b of screen.getAllByRole('button', { name: 'EUR €' })) {
      expect(b).toHaveAttribute('aria-pressed', 'true');
    }
  });
});

describe('currencyCss', () => {
  it('hides every other currency for each code, and falls back without the attribute', () => {
    const css = currencyCss(['USD', 'EUR'], 'USD');
    expect(css).toContain(
      ':root[data-currency="EUR"] [data-price]:not([data-price="EUR"]){display:none}',
    );
    expect(css).toContain(
      ':root:not([data-currency]) [data-price]:not([data-price="USD"]){display:none}',
    );
  });
});
