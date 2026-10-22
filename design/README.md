# Design reference (Iteration 6)

These boards are the approved design for every page. Each `.dc.html` file is a self-contained design-canvas page: markup inside `<x-dc>`, styles in `<helmet>`, and behaviour in a `class Component extends DCLogic` script. Read them as a spec. Do not ship them.

| Board | Route |
| --- | --- |
| HomeV6 | `/` |
| WorkV6 | `/work` |
| CaseWispV6 | `/work/wisp` |
| CaseExchangeV6 | `/work/naira-crypto-exchange` |
| CaseJewelleryV6 | `/work/jewellery-marketplace` |
| ServicesV6 | `/services` |
| ProductsV6 | `/products` |
| StudioV6 | `/studio` |
| StartV6 | `/start` |
| PrivacyV6 | `/privacy` |

## Asset map

The boards reference uploaded assets by `/_blob/<id>`. These are the local files:

| Board reference | File |
| --- | --- |
| `/_blob/27035bc4656065bff9ac8b975be77f11` | `assets/raum-logo.svg` |
| `/_blob/61886d68d3b7064a3de0490b61d47f35` | `assets/raum-screen-1.png` |
| `/_blob/ac7de152b2afd8ea5e69a664fd1b644d` | `assets/raum-screen-2.png` |
| `/_blob/276b71d9a7bb3f92ad63b6a8e7e21921` | `assets/team-muazu-abu.jpg` |

## Brand tokens (from the boards)

| Token | Value |
| --- | --- |
| Ground | `#D9D9D9` |
| Ink | `#0B0B0C` |
| Accent (ultraviolet) | `#7A5CFF` |
| White panel | `#FFFFFF` |
| Mid greys | `#E6E6E6`, `#BDBDBD`, `#8A8A8A`, `#5C5C5C`, `#3D3D3D` |
| Display | Special Gothic Condensed One (`.kx`), Special Gothic Expanded One (`.xw`) |
| Text | Special Gothic |
| Labels | Geist Mono, 11.5px, uppercase, 0.07em tracking |
| Ease | `cubic-bezier(.2,.8,.2,1)` for reveals, `cubic-bezier(.7,0,.2,1)` for morphs |

Case accents: Wisp uses neon `#00FF5A` on ink `#0C1A12`. The exchange uses amber `#FFA826` on `#0B0A09`. The jewellery marketplace uses cream `#FFFDF9` with gold gradients.

## Motion inventory

These are the behaviours to rebuild in `packages/kit/motion`:

- **Preloader:** the four-cell logo splits and flies into the hero tiles.
- **Hero:** rows reveal, parallax on scroll, a typing line, and morphing tiles.
- **Content:** reveal on enter (`.rv`), headline line masks (`.mlw`), scroll-lit words (`[data-words]`), parallax (`[data-par]`), clip-in sections (`[data-clip]`) and zoom (`[data-zoom]`).
- **Pinned and stacked sections:** case card stack, the horizontal process track, stacked question cards, and the pinned principles list.
- **Ventures:** flex tiles that expand on hover.
- **Pricing:** cards rise in a staircase.
- **Closing:** sticky marquee whose speed follows scroll velocity, with a cursor-following pill on Home.
- **Footer:** a glass sheet that slides over the closing section, physics icon tiles you can throw, and a wordmark that stretches near the cursor.
- **"Work with us":** the button morphs into a violet card, fills the screen, then lifts away on the Start page.
- **Floating nav:** microcopy that changes per section.
- **Wisp capture flow:** five steps that auto-play and can be clicked, with the Dynamic Island morphing (idle 126×37, compact 236×37, expanded 370×112).
- **Exchange:** the historic chart is static and only the live tip and price tick, with a rate-hold countdown.
