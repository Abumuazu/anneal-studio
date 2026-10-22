import { Price } from '@studio/kit/ui';
import { Fragment } from 'react';

import { type Offer, priceValues, prices } from '@/content/prices';

/** USD amounts the deck writes into sentences, and the offer each one quotes. */
const BY_USD = new Map<number, Offer>([
  [prices.website.USD, 'website'],
  [prices.aiFeature.USD, 'aiFeature'],
  [prices.webMvp.USD, 'webMvp'],
  [prices.mobileMvp.USD, 'mobileMvp'],
  [prices.growth.USD, 'growth'],
  [prices.featureSprint.USD, 'featureSprint'],
  [prices.addonAdmin.USD, 'addonAdmin'],
  [prices.addonMobileApp.USD, 'addonMobileApp'],
  [prices.addonExtraPage.USD, 'addonExtraPage'],
  [prices.discoveryWeek.USD, 'discoveryWeek'],
]);

/**
 * Deck copy is written in dollars ("Book a Discovery week for $900"). Each
 * "$N" becomes a <Price> so the sentence follows the visitor's currency.
 * Amounts that are the same in every currency (Website and Care, the two
 * add-ons at $1,500) map to one offer, which renders identically.
 */
export function PriceText({ text }: { text: string }) {
  const parts = text.split(/(\$[\d,]+)/);
  return (
    <>
      {parts.map((part, i) => {
        if (!part.startsWith('$')) return <Fragment key={i}>{part}</Fragment>;
        const offer = BY_USD.get(Number(part.slice(1).replace(/,/g, '')));
        return offer ? (
          <Price key={i} values={priceValues(offer)} />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}

/** For tests: every deck amount must map to an offer. */
export function knownAmount(usd: number): boolean {
  return BY_USD.has(usd);
}
