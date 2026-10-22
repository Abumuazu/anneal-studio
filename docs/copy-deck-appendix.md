# Copy deck appendix: pages not in the slot deck

These pages kept their approved Iteration 5 and 6 wording, so their copy was only in the boards. It is written out here word for word from `design/v6/`, so the deck now covers every page. It carries the same authority as `copy-deck-v3.md`.

- If this file and a board ever disagree, this file wins.
- Mockup content (names, amounts, meeting titles inside the phone and browser frames) stays as drawn in the boards. It is placeholder data, not copy.
- Rules as everywhere: no em or en dashes, and no invented copy.

---

## Case: Naira to crypto exchange (`/work/naira-crypto-exchange`)

**Breadcrumb:** Work / 02 · Fintech

**Headline (3 lines):** A crypto exchange / built around who / holds the licence.

**Meta:**

| Label | Value |
| --- | --- |
| Client | Confidential fintech, Nigeria |
| Sector | Digital assets, payments |
| Platform | iOS and Android |
| What we did | Product strategy, design and the full mobile build |
| Year | 2026 |

**Brief (scroll-lit paragraph):** The founders wanted people in Nigeria to buy and sell crypto against naira on their phone. Nigeria's Investments and Securities Act 2025 brings digital assets under securities regulation, so this is regulated activity. Apple adds its own requirements for exchange apps: licensing, a legal entity and supporting documents, which depend on how the business is set up and where the app is distributed. Miss either one and the app doesn't launch, however good it looks. This is how we approached the project, not legal advice, and each client confirms the requirements with its own advisers.

**Questions**

- **Heading:** Three questions we answered before drawing a screen.
- **01 Who holds the licence?** We mapped which parts of the flow sit with the licensed partner and which sit with the client, so the client could see where its own responsibilities start.
- **02 Which entity goes on the App Store listing?** Apple reviews exchange apps against the licences and legal entity behind the listing. We planned the publishing set-up around that from the start and flagged it for the client to confirm with its advisers.
- **03 What does the partner's API cover?** Plugging into a licensed provider's API doesn't automatically hand you their licence. We drew a clear line between what the API handles and what the business still has to own.

**Principle (4 lines):** A partner's API gives / you their rails. It / doesn't always come / with their licence.

**What we built**

- **Heading:** Sign-up to first trade in a few short steps.
- **A Verification first:** BVN and ID checks happen before the first trade, with clear progress at each step.
- **B Live price and rate lock:** The rate holds for a short window, so the price on screen is the price you get.
- **C Naira payouts:** Sales are paid straight to a verified bank account.
- **D Receipts and history:** Every trade has a receipt and sits in a history you can search.
- **E Licensed routing:** Every trade runs through the licensed partner.
- **F Publishing set-up:** Planned around the licensed entity's own developer account, subject to Apple's review.

**Built with:** React Native · TypeScript · Node.js · Licensed partner API

**Next:** Next project · 03 · Marketplace / Jewellery marketplace

**Floating nav, in order:** This one moves naira and crypto. · Two sets of requirements before any design. · Who holds the licence decides a lot. · Worth saying twice. · The flow, one step at a time. · Built with. · One more case to go. · Got a product with awkward rules? Good.

**App UI labels (the two phones):**
- Portfolio, in past 24 hours, LIVE, 1D 1W 1M 3M 1Y, Transfer, Buy & Sell, Assets, Bitcoin BTC, Ethereum ETH, Tether USDT.
- Swap, FROM, TO, Tron, Bitcoin, Max, Balance, Exchange fee, Rate, Rate held for, Swap now.

---

## Case: Jewellery marketplace (`/work/jewellery-marketplace`)

**Breadcrumb:** Work / 03 · Marketplace

**Headline (2 lines):** Make an offer. / Pay only if the seller says yes.

**Meta:**

| Label | Value |
| --- | --- |
| Client | Confidential jewellery marketplace |
| Sector | Marketplace, payments |
| Platform | iOS, Android and web |
| What we did | Payments design, product design and the full build |
| Year | Omit until confirmed |

**Brief (scroll-lit paragraph):** Buyers wanted to offer a price instead of paying the sticker one. Sellers wanted to accept, decline or counter, and know an accepted offer would actually pay. The usual answer is a custom escrow that holds the buyer's money until the deal closes. Here, building one would have meant taking on the compliance that comes with holding other people's money.

**Questions**

- **Heading:** Three questions we answered before drawing a screen.
- **01 Who holds the money while the seller decides?** The buyer's own bank, same as any card payment. The card is authorised when the offer is made, and the funds stay there until the seller accepts.
- **02 Do we need to hold anyone's money at all?** A custom escrow would have put the client in the business of holding funds. We recommended a card hold through Stripe Checkout instead, so the money stays on the buyer's card until the seller accepts and we never hold it. How a marketplace is regulated depends on where it operates, so the client's advisers confirm that side.
- **03 What happens if the seller says nothing?** Every offer has an expiry. Card holds usually last about seven days, so offers run out inside that window. When one does, the hold is released and the buyer is free to try again.

**How the money moves (pinned section)**

- **Heading:** Hold on offer. Charge on yes.
- **01 Buyer makes an offer:** They pick a price and confirm their card.
- **02 Card is authorised:** The amount is held on the card and nothing is charged yet.
- **03 Seller decides:** Accept, decline or counter, before the offer expires.
- **04 Charge or release:** Accept captures the payment. A decline or an expired offer releases the hold.

The phone states follow the step. Each state has a title, a line and a button label:

| Step | Title | Line | Button |
| --- | --- | --- | --- |
| 1 | Offer ready to send | Expires 24 hours after sending | Send offer |
| 2 | Card authorised, not charged | The seller has 23 hours to answer | Offer sent |
| 3 | With the seller now | They can accept, decline or counter | Withdraw offer |
| 4 | Accepted. Charged ₦420,000 | The seller is preparing your ring | Track order |

The card chip has its own states (amount, then status):

| Step | Amount | Status |
| --- | --- | --- |
| 1 | ₦0 held | Nothing happens until you send |
| 2 | ₦420,000 held | Authorised. Still in the buyer's bank |
| 3 | ₦420,000 held | Waiting on the seller |
| 4 | ₦420,000 charged | Captured when the seller said yes |

Phone labels: Gold ring · Your offer · Buyer's card.

**Principle:** Before you build a payments feature, check whether the card network already does it.

**What we built**

- **Heading:** An offer flow that looks after the money.
- **A Offers:** Buyers name their price on any listing.
- **B Counters:** Sellers accept, decline or come back with a number of their own.
- **C Card holds:** Authorise and capture through Stripe Checkout, with no escrow for the client to build or run.
- **D Expiry:** Every offer shows when it runs out, and the hold drops when it does.
- **E Seller view:** Incoming offers in one place, ready to answer.
- **F Mobile and web:** The same marketplace on iOS, Android and the web.

**Built with:** React Native · Next.js · Stripe Checkout

**Next:** Next project · 01 · Enterprise / Wisp

**Floating nav, in order:** Offers on mobile and web. · The usual answer meant holding other people's money. · Who holds the money? The bank does. · Scroll to watch the money move. · Worth saying twice. · Looked after the money, then the UI. · Built with. · Back to the first one? · Got a product with awkward rules? Good.

**Mockup UI labels (the "Atelier" placeholder brand):**
- **Nav:** Rings, Necklaces, Earrings, Bracelets, Sellers, Search pieces.
- **Product page:** Make an offer, Buy now, "Your card is held when you offer. It is only charged if the seller accepts.", Metal, Stone, Certificate.
- **Offer phone:** Make an offer, Your offer, Held now, charged only on yes, Hold, Seller replies within, Send offer.
- **Seller phone:** Offers, 3 waiting · cards already held, Accept, Counter, Decline.

---

## Privacy (`/privacy`)

- **Title:** Privacy
- **Lead:** The short version: we collect what you send us, use it to reply and do the work, and don't sell it to anyone. The details are below.
- **Date:** Last updated 22 October 2026
- **Side navigation label:** On this page

**01 Who we are:** Anneal Studio, led by Muazu Abu and based in Lagos and Barcelona, runs this site. We decide how the personal data described here is used, which makes us its controller.

**02 What we collect:** Only what you give us and a little about how the site is used.
- From the brief form: your name, email, company, project details, timing and, if you give one, a budget.
- How you found us, if you tell us, and any campaign tags in the link you arrived from (for example a LinkedIn post). We keep these with your brief so we know which channel it came from.
- From call bookings: your name, email and the time you pick.
- From the waitlist for Anneal tools and ventures: your email address.
- Basic, privacy-friendly analytics through Plausible, which does not use cookies or follow you across other sites. We count things like which price card was opened and whether a brief was sent, not who you are.

**03 Why we use it:** To reply to you, run calls, write proposals, tell you when something on the waitlist is ready, and learn which channels bring in the right projects and improve the site. We don't sell your data and we don't use it for advertising.

**04 Who we share it with:** Only the services we need to run the studio: Private Email for the studio inbox, Cal.com for call bookings, Resend to deliver brief and waitlist emails, Notion to keep a record of briefs, Vercel to host the site and Plausible for analytics. Each one processes data on our behalf.

**05 How long we keep it:** We keep briefs and emails for 24 months after our last contact, and waitlist emails until you ask to be removed or the list is closed. If we start working together, our contract sets the terms from then on.

**06 Your rights:** Depending on where you live, including under Nigeria's Data Protection Act 2023 and the EU GDPR, you can ask to see, correct or delete your data, or object to how we use it. Write to us, including to leave the waitlist, and we'll respond within the time the law allows.

**07 Contact:** Questions about this policy: hello@raum.africa.

**Floating nav:** The short version is first. · That's the whole policy.

---

## Start (`/start`)

- **Headline (2 lines):** Tell us what / you're building.
- **Lead:** Book a call if you'd rather talk, or send a brief if you'd rather write it down. Either way, you'll hear back within one working day.

### Booking card

- **Title:** Book a 30-minute call
- **Note:** Times shown in WAT (show the visitor's own time zone in production)
- **Steps:** 1. Pick a day · 2. Pick a time · 3. Your email
- **Email placeholder:** you@company.com
- **Button:** Confirm [chosen day and time]
- **Booked state:** label "Booked", then "[day, time]. A calendar invite is on its way." and a "Pick another time" link

### Brief form

- **Title:** Send a brief
- **Progress:** Step [n] of 4
- **Buttons:** Back · Continue · Send brief

| Step | Content |
| --- | --- |
| 1 · What do you need? | Helper: Pick the closest one. You can change it on the call. Options, each with its "from" price in the visitor's currency: Website · AI feature · Web MVP · Mobile MVP · Product Growth & Engineering · Something else (shows "Quoted after your brief"). Currency row: Prices in |
| 2 · Where is it today? | Just an idea · Designs or a prototype · Live product · Live, but struggling |
| 3 · Timing | Label: When do you want to start? Options: As soon as possible · In 1 to 3 months · Just exploring. Field: Anything specific about budget? (optional) |
| 4 · About you | Name · Email · Company or project (optional) · Anything else we should know (optional) · How did you hear about us? (optional), with chips LinkedIn · X · A referral · A designer or agency · Search · Somewhere else. Note: We also note the campaign tags in the link you arrived from, so we know which channel to thank. |

**Brief sketch card**
- Title: Your brief so far
- Empty state: Your brief will appear here as you fill it in.
- Filled: the chosen answers joined with " · ", for example "Mobile MVP · from $8,000 · live product · as soon as possible"

**Sent state**
- Label: Brief received
- Title: Thanks. It's with us.
- Body: We'll read it properly and reply within one working day. For a website, expect a short scope and a payment link. For anything bigger, expect a few questions or a time to talk.

**What happens next**
1. **We read your brief.** Then reply with questions or a time to talk.
2. **A 30-minute call.** Goals, limits and whether we're the right team.
3. **A written quote.** The scope, the price and the date, for you to approve before paying.

**Floating nav:** Call or write. Both reach the team. · Pick a slot. We'll send the invite. · Four short steps. No essays. · Still here? The form is just up there.
