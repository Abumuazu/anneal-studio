# Build handoff (Iteration 6)

Copy for every slot is in `copy-deck-v3.md`. The visual spec is in `../design/v6/`.

## 1. Product decisions

| Decision | Where |
| --- | --- |
| Hero headline on three rows: "What" / "do you need" / "built?", with the lead "Anneal is a product studio for founders and teams. We design, build and launch websites, mobile apps and AI-powered products, with clear pricing, defined scope and timelines agreed upfront." | Home |
| A quiet typing line sits above the lead: "I need [a booking site for my clinic]", followed by the matching offer and time in mono. It cycles through three examples | Home |
| No bracketed section labels. Headlines carry each section | All pages |
| Prices appear only on the pricing cards and the Services page | All pages |
| Pricing: large headline, currency switcher, four cards with four inclusions each, a Product Growth & Engineering panel, and three terms | Home |
| Offer names: Website, AI feature, Web MVP, Mobile MVP, Product Growth & Engineering | All pages |
| Product Growth & Engineering is open to any launched product, ours or built elsewhere | Home, Services, Start |
| The glass footer slides over a sticky closing section on every page, with physics icons, the wordmark and the currency switcher | All pages |
| Icons: a desktop or browser glyph for Website, a phone glyph for Mobile MVP | All pages |
| "Work with us" morph: the destination reads a timestamped hand-off flag, so the reveal works on every navigation, not only the first | All pages |
| Team: Muazu Abu (Founder, photo in `design/assets`) is the only confirmed public profile. Add collaborators only after their names and roles are approved. | Studio |
| Currency default comes from `x-vercel-ip-country`: NG shows NGN, euro-area countries show EUR, everywhere else USD. The choice is remembered in a cookie | All price views |

## 2. Case studies

**01 Wisp (anonymised client app).** A meeting capture and minutes app for organisations with sensitive meetings. No client, sector or country details. Accent neon `#00FF5A` on ink `#0C1A12`, record red `#FF453A`.
- Hero stage: three phones, including the typing onboarding.
- Playable capture flow in five steps: capture, recording, lock screen Live Activity, the app closes to the Dynamic Island compact view, a long press expands it, then saved and minutes.
- Island states, feature cards and stack.

Get the client's sign-off before launch.

**02 Naira to crypto exchange.** Dark trading UI with an amber accent.
- Portfolio: the balance ticks live, the historic chart is static, and only the live tip moves. LIVE indicator, range chips, Transfer, Buy & Sell, and an assets list.
- Swap from USDT on Tron to BTC on Bitcoin: amounts, exchange fee, rate, a rate-hold countdown, Swap now, and a keypad.

In code, drive the tip from a price stream or a seeded mock, and use real coin icons from a licensed icon set.

**03 Jewellery marketplace.** A web product page for a placeholder brand, "Atelier", plus two phones: "Make an offer" (card hold and reply countdown) and the seller's offers inbox (Accept, Counter, Decline). The jewellery is drawn as SVG for now. Swap in product photography when available.

## 3. Offers and prices (`prices.ts`)

| Offer | Time | USD | EUR | NGN |
| --- | --- | --- | --- | --- |
| Website | 3 to 5 working days | 400 | 360 | 560,000 |
| AI feature | 1 to 2 weeks | 2,500 | 2,250 | 3,500,000 |
| Web MVP | 3 to 4 weeks | 4,500 | 4,000 | 6,300,000 |
| Mobile MVP | 6 to 10 weeks | 8,000 | 7,200 | 11,200,000 |
| Care (monthly) | ongoing | 400 | 360 | 560,000 |
| Growth (monthly, 3-month minimum) | ongoing | 3,000 | 2,700 | 4,200,000 |
| Feature sprint | 2 weeks | 2,000 | 1,800 | 2,800,000 |
| Add-on: admin dashboard | | 1,500 | 1,350 | 2,100,000 |
| Add-on: AI layer on an MVP | | 1,500 | 1,350 | 2,100,000 |
| Add-on: mobile app alongside a Web MVP | | 3,500 | 3,150 | 4,900,000 |
| Add-on: extra website page | | 150 | 135 | 210,000 |
| Discovery week (credited to the build) | 1 week | 900 | 810 | 1,260,000 |

Payment: half to start and half on delivery. Mobile MVP is paid in three parts. The payment terms carry one line: "These are launch prices for our first projects."

## 4. Integrations and tracking

- **Booking:** Cal.com API v2. `GET /v2/slots` and `POST /v2/bookings` through a route handler. Our own slot picker; no embed.
- **Brief form:** offer, stage, timing, optional budget, how they heard about us, and UTM fields. Email it through Resend and store it in Notion or Supabase.
- **Waitlist:** Products and Studio forms. Store the email and fire `waitlist_joined`.
- **Plausible events:** `price_card_click`, `offer_chosen`, `brief_started`, `brief_sent`, `call_booked`, `currency_changed`, `case_opened`, `waitlist_joined`.

## 5. Contract points shown on the site

- Code and accounts are in the client's name from day one. Full rights pass on final payment.
- 30 days of fixes cover defects in the agreed scope.
- We prepare and submit to the app stores. Apple and Google decide approval and its timing.
- Growth is monthly, with a three-month minimum and 30 days' notice after that.

## 6. Open before launch

- Approve the Care, Growth, sprint, add-on and Discovery prices.
- Wisp client sign-off.
- Replace the three placeholder team members.
- Jewellery case year.
- Registered address (Privacy page).
- Domain, emails and social links (hello@raum.africa until then).
- Centiiv and Clekey wordmarks, and a one-line Centiiv description.
- Payment methods for NGN, USD and EUR.
- Lawyer review of the case studies and the Privacy page.
