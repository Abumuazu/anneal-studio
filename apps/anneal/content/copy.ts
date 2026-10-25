import { deck } from './copy.deck';

/**
 * Copy, word for word from docs/copy-deck-v3.md, generated into copy.deck.ts
 * by scripts/gen-copy.mjs. A test (content/copy.test.ts) fails if the
 * generated file drifts from the deck.
 */
export const copy = deck;

export type CopyKey = keyof typeof copy;

/** Splits a deck list such as "Design · Copy edit · Contact form" into items. */
export function list(key: CopyKey): string[] {
  return copy[key].split(' · ');
}

/**
 * Splits a deck line into display lines before the given word positions,
 * e.g. lines("What opens next.", [2]) gives ["What opens", "next."]. Keeps
 * headlines word for word while the boards break them over several lines.
 */
export function lines(text: string, breaks: readonly number[]): string[] {
  const words = text.split(' ');
  const cuts = [0, ...breaks, words.length];
  return cuts.slice(0, -1).map((start, i) => words.slice(start, cuts[i + 1]).join(' '));
}

/**
 * Strings that appear on the Iteration 6 boards but not in the copy deck,
 * taken verbatim from the boards. Listed as a spec question: move these into
 * the deck, or confirm the boards are the source.
 */
export const boardCopy = {
  nav: {
    work: 'Work',
    services: 'Services',
    products: 'Products',
    studio: 'Studio',
    start: 'Start',
  },
  workWithUs: 'Book a call',
  brand: 'Anneal',
  studioName: 'Anneal Studio',
  heroRows: ['What', 'do you need', 'built?'],
  heroH1: 'What do you need built?',
  heroAskPrefix: 'I need',
  /** From build-handoff.md, section 1 (the hero lead is a product decision there). */
  heroLead:
    'Anneal designs and builds websites, apps and AI features for startups and growing businesses. Start with a defined project, or work with us monthly on a product that needs ongoing design and development.',
  heroLabels: ['Product design', 'Websites and apps', 'AI workflows', 'Ongoing development'],
  heroFoot: 'Anneal Studio · Product studio',
  /** Phones: the label row above the headline, and the label on the typing card (HomeMobileV6). */
  askLabel: 'What are you working on?',
  /** Under the process cards on phones. */
  swipe: 'Swipe for the next stage',
  scroll: 'Scroll',
  seePrices: 'Explore our work',
  preloaderLine: 'Websites, apps and ongoing product development.',
  currencyGroup: 'Currency',
  pricesIn: 'Prices in',
  sayHello: 'Say hello',
  copyright: '© 2026 Anneal Studio',
  privacy: 'Privacy',
  backToTop: 'Back to top ↑',
  viewCase: 'View project',
  allWork: 'All work',
  from: 'From',
  perMonth: '/ month',
  perTwoWeeks: '/ two weeks',
  everythingInEachBuild: 'Everything in each build',
  aboutTheStudio: 'About Anneal',
  seeProducts: 'Explore our products',
  primaryNav: 'Main navigation',
  menu: { label: 'Menu', open: 'Open menu', close: 'Close menu' },
  footerNav: 'Footer navigation',
  quickNav: 'On this page',
  cases: [
    {
      tags: ['iOS', 'Live Activities', 'Offline'],
      facts: [
        'Records with the phone locked',
        'Dynamic Island controls on long press',
        'Minutes approved before they become the record',
      ],
    },
    {
      tags: ['iOS', 'Android', 'Mobile app'],
      facts: [
        'Verification before the first trade',
        'Live price chart and swap',
        'Payouts to a verified bank account',
      ],
    },
    {
      tags: ['iOS', 'Android', 'Web'],
      facts: [
        'Offers on iOS, Android and the web',
        'Card held on offer, charged on yes',
        'Holds released when an offer expires',
      ],
    },
  ],
  ventures: {
    intro: 'Raum, Centiiv and Clekey came first. Our own tools are next.',
    raum: { name: 'Raum', tag: 'Co-founded', logoAlt: 'Raum', screenAlt: 'Raum app screen' },
    centiiv: {
      name: 'Centiiv',
      kicker: 'Venture · 02',
      tag: 'Co-founded · Exited',
      shortTag: 'Exited',
    },
    clekey: {
      name: 'Clekey',
      kicker: 'Venture · 03',
      tag: '2026 · In stealth',
      shortTag: 'In stealth',
    },
    tools: { name: ['Anneal', 'tools'], kicker: 'Next · Our own', tag: 'Coming soon' },
  },
} as const;
