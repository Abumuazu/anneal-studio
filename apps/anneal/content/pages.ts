/**
 * Page strings that appear on the Iteration 6 boards but in neither the copy
 * deck nor the appendix: floating nav messages, small section labels, form
 * labels. Verbatim from the boards (ServicesV6, ProductsV6, StudioV6).
 */
export const chromeCopy = {
  footerMsg: 'You made it to the bottom. Thanks.',
  closingMsgBuild: 'Come and build something with us.',
  closingMsgServices: "That's everything. Say hello.",
} as const;

export const servicesCopy = {
  msg: {
    hero: 'Four things we build.',
    addons: 'Add to any build.',
    custom: 'Something different?',
    money: 'How you pay.',
    every: 'What comes with every project.',
    process: "You'll see it working every week.",
    faq: 'Straight answers, before you ask.',
    close: 'Thirty minutes. No pitch deck needed.',
  },
  jump: {
    growth: 'Growth',
    questions: 'Questions',
  },
  labels: {
    get: 'What you get',
    need: 'What we need from you',
    notIncluded: 'Not included',
    bestFor: 'Best for',
    care: 'Care',
    growth: 'Growth',
    sprint: 'Feature sprint',
    howItRuns: 'How it runs',
    careFrom: 'Care · from',
    growthFrom: 'Growth · from',
  },
  faqHeading: 'Before you ask.',
  bookCall: 'Book a 30-minute call',
  orSendBrief: 'Or send a brief',
} as const;

export const productsCopy = {
  msg: {
    hero: 'Our own, not for hire.',
    built: 'Three ventures, one exit.',
    fit: 'Builders who ship their own.',
    next: 'What is coming next.',
    wait: 'Want in early? Leave an email.',
    close: 'Need one built for you?',
  },
  nextTools: 'Anneal tools',
  nextVentures: 'Ventures with founders',
  notOpenYet: 'Not open yet',
  seeWhatWeBuild: 'See what we build',
} as const;

export const studioCopy = {
  msg: {
    hero: 'Small studio, two cities.',
    short: 'The short version.',
    what: 'What we do.',
    how: 'The people you meet are the builders.',
    team: 'You will meet the people on this list.',
    ventures: 'Three ventures so far.',
    wait: 'Want in early? Leave an email.',
    where: 'Probably awake in one of them.',
  },
  now: 'Now',
  next: 'Next',
  engines: { studio: 'Studio', products: 'Products', ventures: 'Ventures with founders' },
  founder: { name: 'Muazu Abu', role: 'Founder' },
  lagosZone: 'Lagos · WAT · UTC+1',
} as const;

export const waitlistCopy = {
  emailLabel: 'Email address',
  placeholder: 'you@company.com',
  submit: 'Join the waitlist',
  onTheList: 'On the list',
} as const;

/** WorkV6 strings outside the deck. */
export const workCopy = {
  msg: {
    hero: 'Selected work, and a few ventures of our own.',
    covers: 'Three products we can show.',
    list: 'Everything, in one list.',
    end: 'Yours could be next on this page.',
    close: 'You read the whole list. Fancy being next?',
  },
  listHeading: 'Everything, in one list.',
  filters: { all: 'All', projects: 'Projects', ventures: 'Ventures' },
  /** The list's year column, row by row. The jewellery year is an open item (build-handoff). */
  years: ['2026', '2026', '', '2023', 'Exited', '2026 · In stealth'],
  /** Captions on the hover previews, row by row. */
  previewCaptions: [
    'Mobile app',
    'Mobile app',
    'Mobile and web',
    'Co-founded',
    'Co-founded · Exited',
    'Partner venture',
  ],
  /** The figure on the exchange preview card (mockup data). */
  exchangePreview: '₦403,000',
} as const;

/** Case board strings outside the deck and the appendix (CaseWispV6 and siblings). */
export const caseCopy = {
  nextProject: 'Next project',
  nextCursor: 'Next case',
  island: { compact: 'Compact', minimal: 'Minimal', expanded: 'Expanded' },
  /** Wisp's closing message; the other cases have theirs in the appendix. */
  wispClose: 'Got a product in mind? Good.',
} as const;

/** StartV6 strings outside the deck and the appendix. */
export const startBoardCopy = {
  /** The confirm button before a day and time are picked: "Confirm a time". */
  aTime: 'a time',
  /** The brief progress label once it is sent. */
  done: 'Done',
} as const;
