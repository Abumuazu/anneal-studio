# anneal-studio

The Anneal Studio website, built on a reusable studio-site kit.

- `apps/anneal/`: the Anneal site (Next.js 15 App Router).
- `packages/kit/`: the reusable kit: theme tokens, motion engine and primitives, page transitions, UI atoms and sections. It holds no Anneal copy, prices, colours or names.
- `packages/config/`: shared TypeScript, ESLint and Prettier settings.
- `packages/create-studio-site/`: generates a new site in `apps/<name>` from the kit's template.
- `apps/demo/`: a second site generated from the template with its own theme, to prove the kit stands alone.
- `design/v6/`: the approved design (Iteration 6) as design-canvas boards. Reference only.
- `design/assets/`: images used by the design.
- `docs/copy-deck-v3.md`: every line of copy, slot by slot.
- `docs/build-handoff.md`: product decisions, offers and prices, case studies, tracking, and open items.
- `docs/engineering-plan.md`: stack, repo shape, milestones, first prompt.
- `CLAUDE.md`: the rules every contributor (human or Claude Code) follows.

## Getting started

Node 22 and pnpm 11 (`corepack enable` picks up the pinned version).

```sh
pnpm install
pnpm dev              # http://localhost:3000, kit primitives at /kitchen-sink
```

## Checks

| Command          | What it runs                                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm lint`      | Em and en dash check, then ESLint in every package                                                                                                 |
| `pnpm typecheck` | `tsc --noEmit` in every package                                                                                                                    |
| `pnpm test`      | Vitest: kit logic and components, and content guards (copy matches the deck word for word, prices match the handoff, token contrast meets WCAG AA) |
| `pnpm test:e2e`  | Builds, then Playwright: smoke flows and axe in Chromium, WebKit and mobile WebKit, plus visual snapshots at 1440, 1024, 768 and 390               |
| `pnpm lhci`      | Lighthouse budget on `/`, `/start` and `/kitchen-sink` (needs a build first)                                                                       |
| `pnpm format`    | Prettier                                                                                                                                           |

CI (`.github/workflows/ci.yml`) runs all of these on every pull request.

### Visual baselines

Snapshots are stored per platform under `apps/anneal/e2e/__snapshots__/<platform>/`. CI compares against `linux`. After an intended visual change, run the **Update visual baselines** workflow on your branch: it regenerates the linux set and commits it. For local baselines, run `pnpm --filter @anneal/site test:e2e:update`.

## A new site from the kit

```sh
pnpm create-site north-light --title "North Light" --accent "#e4572e" --ink "#1b1a17" --ground "#f1ede4" --panel "#fffdf8"
pnpm install
pnpm --filter @sites/north-light dev
```

The generated site has the header, floating nav, hero, case stack, process steps, closing, glass footer, one MDX case and a contact page, all from `packages/kit`. Its copy lives in `content/site.ts` and starts as placeholder text. The command refuses names that cannot be a folder and a package, colours that are not hex, and ink that fails WCAG AA on the ground; it never overwrites an existing app.

`apps/demo` is exactly that command's output (the options are in `packages/create-studio-site/lib/demo.test.mjs`, which fails if the two drift). After changing the template, delete `apps/demo` and run the command again with those options.

## Integrations

The Start page books calls through Cal.com, emails briefs through Resend and keeps briefs and waitlist addresses in Notion. Plausible counts page views and the handoff's events. All of it runs on the server through plain `fetch` calls in `apps/anneal/lib/integrations/`, and every variable is listed in [`apps/anneal/.env.example`](apps/anneal/.env.example).

- A service without its variables is off, and its form says it could not send; it never claims success.
- `INTEGRATIONS=memory` swaps every service for an in-memory fake. Playwright runs that way, so it can book a slot and send a brief end to end, and reads what was sent from `/api/outbox` (which only answers in that mode).
- Plausible loads only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set.

## Deploying

Vercel, one project per site:

1. Import the repository and set **Root Directory** to `apps/anneal`. Vercel detects Next.js and Turborepo.
2. Add the variables from `apps/anneal/.env.example` for Production (`NEXT_PUBLIC_SITE_URL=https://anneal.raum.africa`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=anneal.raum.africa`). For Preview, point Notion at test databases or set `INTEGRATIONS=memory`, so testing a preview never creates real bookings or records.
3. Domains: `anneal.raum.africa` is the site; add `anneal.io` to the same project as a permanent redirect to it, so search engines index one address.
4. Every pull request then gets a preview deployment.

Before launch, work through [`docs/launch-checklist.md`](docs/launch-checklist.md).

The currency default reads Vercel's `x-vercel-ip-country` header in `apps/anneal/middleware.ts`.
