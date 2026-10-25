// Interface states from docs/copy-deck-approved.md.
export const startStates = {
  Title: 'Discuss a Project or Partnership | Anneal Studio',
  'Meta description':
    'Book a 30-minute call or send Anneal a brief. Tell us about your product, priorities and optional budget for a project or ongoing technical partnership.',
  H1: 'What do you want to build or improve?',
  Lead: 'Tell us where you are, what you need and what is getting in the way. Book a call or send a short brief. You do not need a technical specification.',
  'Booking heading': 'Book a 30-minute call',
  'Booking introduction':
    'We will discuss your priorities, the work involved and whether a project or ongoing partnership is the right fit.',
  'Time-zone label': 'Times shown in',
  'Booking fields': '1. Pick a day / 2. Pick a time / 3. Your email',
  'Email example': 'you@company.com',
  'Booking buttons': 'Confirm a time / Confirm booking / Confirming booking',
  'Booking loading': 'Loading available times.',
  'Booking no availability':
    'No times are available in this calendar window. Email hello@raum.africa and we can arrange a conversation.',
  'Booking calendar error':
    'We could not load available times. Try again, or email hello@raum.africa.',
  'Booking retry': 'Reload times',
  'Selected slot no longer available':
    'That time is no longer available. Please choose another slot.',
  'Booking confirmation uncertain':
    'We could not confirm the booking on this page. Check your email for an invitation before trying again. If you are unsure, contact hello@raum.africa.',
  'Booking success heading': 'Your call is booked.',
  'Booking success body':
    'Look out for the calendar invitation. If it does not arrive, contact hello@raum.africa.',
  'Another booking action': 'Choose another time',
  'Brief heading': 'Send a brief',
  'Brief introduction': 'A few details are enough to start the conversation.',
  'Progress labels': 'Step 1 of 4 / Step 2 of 4 / Step 3 of 4 / Step 4 of 4 / Complete',
  'Step 1 heading': 'What would you like help with?',
  'Step 1 helper':
    'Choose the closest option. MVP means the first useful version of an app. You can explain more later.',
  'Step 1 choices':
    'Website / AI feature / Web MVP / Mobile MVP / Design or product improvement / Ongoing technical partnership / Something else',
  'Step 2 heading': 'Where is it today?',
  'Step 2 choices':
    'An idea / Designs or a prototype / A working product / An existing product that needs improvement',
  'Step 3 heading': 'Timing and budget',
  'Timing question': 'When would you like to start?',
  'Timing choices': 'As soon as possible / In the next few months / Exploring the options',
  'Budget question': 'What budget are you considering? (optional)',
  'Budget helper':
    'Share an amount, a range or any context that helps. Include a currency if you have one in mind.',
  'Step 4 heading': 'A little about you',
  Fields:
    'Name / Email / Company or project (optional) / What would you like us to know? (optional) / How did you hear about Anneal? (optional)',
  'Referral choices': 'LinkedIn / X / A referral / A designer or agency / Search / Somewhere else',
  'Campaign-tag note':
    'We also record campaign information in the link you used, so we can understand how people find Anneal.',
  'Brief preview heading': 'Your brief so far',
  'Empty preview': 'Your answers will appear here as you go.',
  'Brief actions': 'Back / Continue / Send brief / Sending brief',
  'Brief validation': 'Please check your name, email and any highlighted answers.',
  'Brief receipt uncertain':
    'We could not confirm receipt of your brief. Try again, or email hello@raum.africa with your details.',
  'Brief success label': 'Brief received',
  'Brief success heading': 'Thank you. We have your brief.',
  'Brief success body':
    'We will review what you have shared and reply to your email with questions or a suggested next step.',
  'What happens next heading': 'From introduction to a clear plan.',
  'We understand the work': 'We review your brief or discuss your priorities on the call.',
  'We recommend an approach':
    'We consider the starting point, dependencies and whether a defined project or ongoing work fits.',
  'You review the proposal':
    'The scope or priorities, fee, responsibilities and delivery arrangements are written down before work starts.',
  'Review note':
    'Error and loading messages require corresponding interface states before publication. A timeout can leave booking receipt uncertain, so the copy does not assert that no event was created. Brief confirmation does not promise that every internal notification system succeeded.',
} as const;
export const waitlistStates = {
  'Email label': 'Email address',
  'Email example': 'you@company.com',
  Submit: 'Keep me updated',
  Pending: 'Adding your email',
  Validation: 'Please enter a valid email address.',
  'Success heading': 'You are on the list.',
  'Success body':
    'We will write when there is an update on Anneal tools or future venture opportunities.',
  Failure: 'We could not add your email. Please try again, or contact hello@raum.africa.',
  'Success button': 'Added',
} as const;
