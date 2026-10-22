# Engineering plan

Build the Iteration 6 design as a production Next.js site, structured so the kit can be packaged as a resellable template.

## 1. Repo shape (Turborepo)

```
anneal-studio/
  apps/
    anneal/                 site #1
      app/                  /, /work, /work/[slug], /services, /products, /studio, /start, /privacy
      content/              site.config.ts, prices.ts, copy.ts (typed from docs/copy-deck-v3.md), cases/*.mdx
      public/
  packages/
    kit/
      sections/             Hero, BuildBlocks, CaseStack, Ventures, ProcessTrack, Pricing, StudioPrinciples, Closing, Footer, FAQ, Waitlist, ...
      motion/               scroll engine (Lenis + GSAP ScrollTrigger), reveal, line mask, word light, parallax, pin, marquee, physics tiles, typing line
      transitions/          WorkWithUs morph, cover-to-case (View Transitions API with an overlay fallback)
      ui/                   Button, Pill, Tag, Glass, CurrencySwitch, PhoneFrame, BrowserFrame, Accordion, Glyph
      theme/                tokens.css, Tailwind v4 preset, fonts
    config/                 eslint, tsconfig, prettier
  design/                   reference only
  docs/
```

The template rule: `packages/kit` never contains Anneal copy, prices, colours or names. A new client site is a new `apps/<name>` with its own config, tokens and content.

## 2. Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS v4 on CSS-variable tokens |
| Motion | GSAP ScrollTrigger for pinned and scrubbed sections, Lenis for smooth scroll, Motion for component transitions. Every effect has a reduced-motion path |
| Transitions | View Transitions API, with an overlay fallback |
| Fonts | `next/font`: Special Gothic (plus Condensed One and Expanded One), Geist Mono |
| Content | Typed TS plus MDX (Velite or content-collections), with a CMS adapter interface for Sanity later |
| Forms | Server Actions and Zod. Resend, plus Notion or Supabase for storage |
| Booking | Cal.com API v2 via a route handler |
| Analytics | Plausible |
| Testing | Vitest, Playwright (flows plus visual snapshots), axe, Lighthouse CI |
| Hosting | Vercel, with a preview deploy per PR |

## 3. Milestones

| # | Milestone | Done when |
| --- | --- | --- |
| M0 | Monorepo, tokens, fonts, CI, Vercel previews | An empty page deploys and the Lighthouse budget passes |
| M1 | Motion engine and shared UI: header, floating nav, footer with physics tiles, Work with us transition | A `/kitchen-sink` page shows every primitive with a reduced-motion toggle |
| M2 | Home, every section | Matches HomeV6 at 1440, 1024, 768 and 390 |
| M3 | Services, Products, Studio, Privacy | Matches the boards, with the FAQ and currency switching |
| M4 | Work and case template: Wisp flow, exchange live chart and swap, jewellery offer flow | Cases are MDX, and cover-to-case transitions work |
| M5 | Start: Cal.com, brief, UTM, waitlist, Resend, Plausible | A Playwright test books a slot and sends a brief end to end |
| M6 | Hardening: SEO, OG images, sitemap, 404, performance, accessibility, content review | Launch checklist is green |
| M7 | Template: a `create-studio-site` starter that generates `apps/<client>` | A second demo site builds from the kit with a different theme |

## 4. Definition of done for every PR

Lint, typecheck, unit tests, Playwright smoke plus snapshots, axe, and the Lighthouse budget all pass. The PR description covers what changed, how it was tested and what was deferred.

## 5. Risks to manage early

- Pinned sections plus smooth scroll on iOS Safari. Test on a real device in M1.
- The View Transitions API in Safari. The fallback must be as good.
- Physics tiles cost. Run only when the footer is visible.
- Font loading. Subset the fonts and preload the display face to avoid layout shift in the hero.

## 6. First prompt for Claude Code

```
Read CLAUDE.md, docs/engineering-plan.md, docs/build-handoff.md and design/v6/HomeV6.dc.html.
Do M0 and M1 only: set up the Turborepo with apps/anneal and packages/kit, tokens from design/README.md,
next/font, CI with lint, typecheck, Vitest, Playwright and the Lighthouse budget, and the motion
primitives with a /kitchen-sink page. Stop after M1 and summarise what you built, what you deferred,
and any spec questions.
```
