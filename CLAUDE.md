# anneal-studio

You are the principal engineer on this repo. Ship production-quality work, not demos.

## What this is

- `apps/anneal`: the Anneal Studio website (site #1).
- `packages/kit`: the reusable studio-site kit (sections, motion, transitions, UI, theme), so it can be sold as a template for other sites.

The repo starts with only `docs/` and `design/`. Milestone M0 creates the rest. See `docs/engineering-plan.md`.

## Source of truth

- **Visual and motion spec:** `design/v6/*.dc.html`. These are design-canvas boards, not production code. Read them for layout, type scale, colours, spacing, easing and timing.
  - Easing curves: `cubic-bezier(.2,.8,.2,1)` and `cubic-bezier(.7,0,.2,1)`.
  - The logic inside each board's `<script type="text/x-dc">` is the reference for how each effect behaves.
  - Never import or ship the board files.
- **Copy:** `docs/copy-deck-v3.md`, plus `docs/copy-deck-appendix.md` for the exchange and jewellery cases, Privacy and Start. Use them word for word. Never invent copy. Never use em dashes or en dashes anywhere, including code comments that end up in the UI.
- **Prices:** `apps/anneal/content/prices.ts` only. They are fixed per currency (USD, EUR, NGN) and never converted live.
- **Product decisions and open items:** `docs/build-handoff.md`.
- **Assets:** `design/assets/` (see `design/README.md` for which board asset each file replaces).

## Architecture rules

- `packages/kit` holds no Anneal copy, prices, colours or names. Sections take typed props. Themes come from CSS-variable tokens.
- Use Server Components by default. Make a client component only where motion or state needs it, and keep it as small as possible.
- All scroll and motion goes through `packages/kit/motion` (Lenis plus GSAP ScrollTrigger, and Motion for component state). No ad hoc scroll listeners.
- Every animation has a `prefers-reduced-motion` path. Anything off screen is paused (IntersectionObserver).
- No layout shift: reserve space for fonts, images and pinned sections.
- Client case studies are MDX plus kit components. Case data is typed.
- Secrets (Cal.com, Resend, Notion or Supabase) stay server-side, in route handlers or Server Actions.

## Quality bar

- TypeScript `strict`. No `any`, no `@ts-ignore`, no non-null assertions without a comment saying why.
- Every PR passes: lint, typecheck, Vitest, Playwright smoke plus visual snapshots at 1440, 1024, 768 and 390, axe, and the Lighthouse budget (LCP under 2.5s, CLS under 0.05, TBT under 200ms).
- Accessibility: real buttons and links, visible focus, alt text, WCAG AA contrast, and keyboard access for every interactive demo.
- Work one milestone at a time, in small PRs. Each PR description says what changed, how it was tested and what was deferred.
- When the spec is ambiguous, write the question in the PR and pick the option closest to the board.

## Conventions

- pnpm, Turborepo, Node 22.
- Next.js 15 App Router, React 19, Tailwind CSS v4 on tokens.
- Commit messages are imperative and short: "Add pricing section".
- No new dependency without a one-line reason in the PR.
