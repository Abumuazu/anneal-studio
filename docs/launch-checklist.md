# Launch checklist

Status checked 22 October 2026: `anneal.raum.africa` is live on Vercel with valid DNS and HTTPS. The Privacy page was approved by the studio and its draft label and registered-address placeholder were removed. A production test brief was received and its notification email was delivered. Live Cal.com availability was visible; a production booking was not created during the check.

Everything in **Built and checked** is covered by CI (lint, typecheck, Vitest, Playwright, axe, visual snapshots, Lighthouse). Everything in **Before launch** needs a decision, an account or a person, and is not in the code's hands.

## Built and checked

| Area | What | Checked by |
| --- | --- | --- |
| Pages | Home, Work, three cases, Services, Products, Studio, Start, Privacy, 404 | Playwright smoke on every page, no console errors |
| Copy | Every string word for word from the deck or appendix; no em or en dashes | Vitest copy guards, `scripts/check-dashes.mjs` |
| Prices | Fixed per currency in `prices.ts`; switching follows everywhere, including inside sentences | Vitest, Playwright |
| Accessibility | WCAG 2.2 AA: axe clean on every page with and without reduced motion; keyboard paths for the FAQ, the Wisp flow, the brief form and booking | axe in Chromium and WebKit, Playwright keyboard tests |
| Motion | Reduced-motion path for every effect; off-screen animation paused | Playwright, Vitest |
| Performance | LCP under 2.5s, CLS under 0.05, TBT under 200ms on every page (mobile, throttled) | Lighthouse CI |
| Layout | No horizontal overflow at any width; snapshots at 1440, 1024, 768 and 390 | Playwright |
| Booking | Cal.com v2 slots and bookings through route handlers; times in the visitor's zone | Vitest (request shape), Playwright end to end (memory mode) |
| Brief | Four steps with no price prompts on the Start page and an optional client budget; Zod-validated Server Action attempts Notion storage and Resend email; UTM tags and referrer kept | Vitest, Playwright end to end |
| Waitlist | Stored in Notion; the form only confirms a stored address | Vitest, Playwright |
| Analytics | Plausible, no cookies; all eight handoff events | Playwright (events captured) |
| Search | Titles, descriptions and canonicals per page; sitemap; robots; JSON-LD Organization | Playwright |
| Sharing | Open Graph and Twitter cards; a card per case | Playwright (every page's card answers) |
| Icons | Favicon (SVG) and Apple touch icon | Playwright |
| Security | Secrets server-side only; security headers; bot honeypot on the brief | Playwright (headers), code review |

## Before launch

| Item | Owner | Where it lands |
| --- | --- | --- |
| Domain `anneal.raum.africa` — complete; add a separate brand domain only after ownership is secured | Studio | Vercel domains and env |
| Studio email (`hello@raum.africa` until then); LinkedIn and X now link to Muazu's profiles | Studio | `content/site.config.ts` |
| Cal.com: API key and the 30-minute event type id | Studio | Vercel env |
| Resend: API key, verified sending domain, `MAIL_FROM` | Studio | Vercel env |
| Notion: integration token and the two databases (properties in `.env.example`) | Studio | Vercel env |
| Plausible: add the site, set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Studio | Vercel env |
| Approve the Care, Growth, sprint, add-on and Discovery prices | Studio | `content/prices.ts` |
| Payment methods for NGN, USD and EUR | Studio | Copy deck, then the site |
| Wisp client sign-off | Studio | |
| Privacy page — studio confirmed approved; case-study rights and any other legal review still require studio confirmation | Studio, counsel | Appendix, then the site |
| Confirm the public identity and privacy contact details | Studio | `docs/copy-deck-appendix.md` |
| Jewellery case year | Studio | `content/cases/jewellery-marketplace.mdx` |
| Add further team profiles only after names and roles are approved | Studio | Deck `studio.team.*`, Studio page |
| Centiiv and Clekey wordmarks, and a one-line Centiiv description | Studio | Deck, Products and Studio |
| Copy for: 404, form and booking failures, the Wisp flow pause control | Copy | Deck or appendix |
| Jewellery product photography, licensed coin icons for the exchange | Design | `components/mockups` |
| Test the pinned sections on a real iPhone (engineering plan, risk 1) | QA | |
