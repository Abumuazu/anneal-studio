/**
 * Copy from docs/copy-deck-appendix.md, word for word. A test
 * (content/appendix.test.ts) checks every string against the appendix.
 */

export const privacyCopy = {
  title: 'Privacy',
  lead: "The short version: we collect what you send us, use it to reply and do the work, and don't sell it to anyone. The details are below.",
  date: 'Last updated 22 October 2026',
  tocLabel: 'On this page',
  msg: {
    hero: 'The short version is first.',
    closing: "That's the whole policy.",
  },
  sections: [
    {
      title: 'Who we are',
      body: [
        'Anneal Studio, led by Muazu Abu, runs this site. We decide how the personal data described here is used, which makes us its controller.',
      ],
    },
    {
      title: 'What we collect',
      body: ['Only what you give us and a little about how the site is used.'],
      list: [
        'From the brief form: your name, email, company, project details, timing and, if you give one, a budget.',
        'How you found us, if you tell us, and any campaign tags in the link you arrived from (for example a LinkedIn post). We keep these with your brief so we know which channel it came from.',
        'From call bookings: your name, email and the time you pick.',
        'From the waitlist for Anneal tools and ventures: your email address.',
        'Basic, privacy-friendly analytics through Plausible, which does not use cookies or follow you across other sites. We count things like which service link was opened and whether a brief was sent, not who you are.',
      ],
    },
    {
      title: 'Why we use it',
      body: [
        "To reply to you, run calls, write proposals, tell you when something on the waitlist is ready, and learn which channels bring in the right projects and improve the site. We don't sell your data and we don't use it for advertising.",
      ],
    },
    {
      title: 'Who we share it with',
      body: [
        'Only the services we need to run the studio: Private Email for the studio inbox, Cal.com for call bookings, Resend to deliver brief and waitlist emails, Notion to keep a record of briefs, Vercel to host the site and Plausible for analytics. Each one processes data on our behalf.',
      ],
    },
    {
      title: 'How long we keep it',
      body: [
        'We keep briefs and emails for 24 months after our last contact, and waitlist emails until you ask to be removed or the list is closed. If we start working together, our contract sets the terms from then on.',
      ],
    },
    {
      title: 'Your rights',
      body: [
        "Depending on where you live, including under Nigeria's Data Protection Act 2023 and the EU GDPR, you can ask to see, correct or delete your data, or object to how we use it. Write to us, including to leave the waitlist, and we'll respond within the time the law allows.",
      ],
    },
    {
      title: 'Contact',
      body: ['Questions about this policy: hello@raum.africa.'],
    },
  ],
} as const;

/** Labels shared by the case pages: the meta row and the stack heading. */
export const caseLabels = {
  meta: {
    client: 'Client',
    sector: 'Sector',
    platform: 'Platform',
    did: 'What we did',
    year: 'Year',
  },
  builtWith: 'Built with',
} as const;

/** The jewellery money flow phone ("Phone labels" in the appendix). */
export const moneyFlowLabels = {
  item: 'Gold ring',
  offer: 'Your offer',
  card: "Buyer's card",
} as const;

/** Closing messages from the floating nav lists of the exchange and jewellery cases. */
export const caseCloseMsg = 'Got a product with awkward rules? Good.';

/**
 * Start page (booking card, brief form, what happens next). The headline,
 * lead, step 1 helper, offers and thanks come from the deck's start.* keys.
 */
export const startCopy = {
  msg: {
    hero: 'Book a call or send a brief.',
    booking: 'Pick a time.',
    brief: 'A few details to begin.',
    close: 'What happens next.',
  },
  booking: {
    title: 'Book a 30-minute call',
    /** Followed by the visitor's own zone, e.g. "Times shown in CET". */
    zone: 'Times shown in',
    day: '1. Pick a day',
    time: '2. Pick a time',
    email: '3. Your email',
    placeholder: 'you@company.com',
    /** Followed by the chosen day and time. */
    confirm: 'Confirm',
    booked: 'Your call is booked.',
    invite:
      'Look out for the calendar invitation. If it does not arrive, contact hello@raum.africa.',
    again: 'Choose another time',
  },
  brief: {
    title: 'Send a brief',
    /** "[n]" is replaced with the step number. */
    progress: 'Step [n] of 4',
    back: 'Back',
    next: 'Continue',
    send: 'Send brief',
    need: 'What would you like help with?',
    where: 'Where is it today?',
    stages: [
      'An idea',
      'Designs or a prototype',
      'A working product',
      'An existing product that needs improvement',
    ],
    timing: 'Timing and budget',
    when: 'When would you like to start?',
    timings: ['As soon as possible', 'In the next few months', 'Exploring the options'],
    budget: 'What budget are you considering? (optional)',
    about: 'A little about you',
    name: 'Name',
    email: 'Email',
    company: 'Company or project (optional)',
    message: 'What would you like us to know? (optional)',
    heard: 'How did you hear about Anneal? (optional)',
    sources: ['LinkedIn', 'X', 'A referral', 'A designer or agency', 'Search', 'Somewhere else'],
    tags: 'We also record campaign information in the link you used, so we can understand how people find Anneal.',
    sketch: 'Your brief so far',
    sketchEmpty: 'Your answers will appear here as you go.',
    received: 'Brief received',
  },
  next: {
    title: 'From introduction to a clear plan.',
    steps: [
      {
        title: 'We understand the work',
        body: 'We review your brief or discuss your priorities on the call.',
      },
      {
        title: 'We recommend an approach',
        body: 'We consider the starting point, dependencies and whether a defined project or ongoing work fits.',
      },
      {
        title: 'You review the proposal',
        body: 'The scope or priorities, fee, responsibilities and delivery arrangements are written down before work starts.',
      },
    ],
  },
} as const;
