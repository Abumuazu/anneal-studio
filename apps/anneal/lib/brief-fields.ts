import { copy } from '@/content/copy';

// Kept apart from the Zod schema in ./brief so the form can use them without shipping Zod.

/** Offers on the brief's first step, as the deck lists them. */
export const OFFERS = copy['start.offers'].split(', ');

/** Campaign tags kept from the landing link (first touch in the session). */
export const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'referrer',
  'landing',
] as const;
