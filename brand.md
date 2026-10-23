# Grumpy Pixels — Brand Guide

> The single source of truth for who Grumpy Pixels is, how it sounds, and how it looks.
> Implementation details live in `docs/design-system.md`, `docs/seo.md` and `docs/content.md`.

---

## 1. Who we are

Grumpy Pixels is a technology studio based in Malaysia.
We build **fast software and websites**, run **SEO on our own campaign platform**, and **advise leaders** on using AI and modern tooling to get more done with less.

The brand in one sentence:

> A team of friendly perfectionists who are slightly annoyed by bad websites.

We are grumpy **about slow websites and wasted hours** — never at clients. The grumpiness is always aimed at slow load times, bad spacing, and bloated plugins. To people, we are warm, helpful, and direct.

## 2. Positioning

Most business software is slow and over-built, most SEO is reported on faith, and most 'AI' advice is a sales pitch. Grumpy Pixels exists because that bothers us — personally.

**Value proposition:** we build it, rank it, and fix what slows you down — software that loads fast, SEO you can audit, and advice measured in hours saved.

Three pillars (one page each under `/services`):

| Pillar | What it is | Page |
| --- | --- | --- |
| Software development | Websites, web apps, portals, e-commerce, revamps, performance | `/services/software-development` |
| SEO platform & services | Managed SEO run on **Grumpy Pixels SEO** (seo.grumpypixels.my), where every change is traced from finding to result | `/services/seo` |
| Consultancy | AI readiness and implementation, SEO strategy, ads/marketing technology, due diligence, fractional technical lead | `/services/consultancy` |

We are NOT:

- A social media or creative agency
- A template shop or a reseller of other people's software
- A consultancy that only writes decks

We ARE:

- Builders first: we implement what we recommend
- Performance-obsessed, measurement-obsessed
- Plain-spoken with decision makers

## 3. Taglines

Primary:

> We build websites. Then we complain about them until they're great.

(Website-specific. On the home page the positioning line is `We build it, rank it, and fix what slows you down.` — see `lib/services.ts` `homeCopy`.)

Secondary (used as the logo descriptor and meta copy):

> Fast websites. Happy users.

Alternates for campaigns / page sections:

- We build websites that don't annoy people.
- Beautiful websites. Ridiculously fast.
- We overthink so you don't have to. (process section)

## 4. Voice and tone

Simple. Human. Direct. Slightly cheeky, never sarcastic at the client's expense.

| Avoid | Use instead |
| --- | --- |
| "We leverage cutting-edge technologies." | "We build websites that load fast and stay fast." |
| "End-to-end digital transformation." | "We design, build and optimize websites that help businesses grow." |
| "Synergistic solutions", "innovative ecosystems" | Plain words a business owner would actually say. |

Rules of thumb:

- Short sentences. One idea per sentence.
- Numbers and specifics beat adjectives ("loads in under a second" > "blazing fast").
- The grumpiness shows up in small dry asides in body copy, not in headlines.

## 5. The mascot (retired)

The pixel-art mascot "Pixel" and her speech bubbles were retired with the October 2026 identity. Do not reintroduce the sprite, quips or `SpeechBubble` component. The brand's personality now lives in the Raised Brow mark (§6), the voice (§4) and the diagrams that explain how we work.

## 6. Logo — the Raised Brow

One brow flat, one brow raised, two eyes: the look you get when the spacing isn't quite 24px. Four plain shapes (two bars, two circles), no pixels. The flat brow is the standard; the raised brow is the reaction to anything that falls short of it.

Source of truth: the logo kit (v1, October 2026). In code, `components/site/Logo.tsx` renders the lockups as inline SVG with the kit's paths:

- `variant="horizontal"` (primary; min 120 px wide) — header, footer, OG image
- `variant="stacked"` (min 72 px) — where width is tight
- `variant="symbol"` (min 24 px) — once the brand is established on the page; the favicon uses the small-size cut on a violet tile
- `variant="wordmark"` — only with the symbol nearby
- `tone="color" | "reversed" | "ink" | "cream"` — reversed = lavender symbol + cream wordmark on ink

Files: `public/brand/gp-*.svg|png` (third-party use, schema.org `logo`), `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/maskable-512.png`, `app/manifest.ts`, `app/opengraph-image.png` (regenerate with `node scripts/make-og.mjs`).

Rules: clear space on every side = one eye diameter; never rotate, stretch, mirror, outline, shadow, gradient or recolour outside the palette; never change the expression (the raised brow is always on the right). `components/site/illustrations/BrowMark.tsx` may assemble the four shapes with a fade — nothing more.

## 7. Color palette

| Token | Hex | Role |
| --- | --- | --- |
| Cream | `#FFF7F1` | Page background |
| Ink | `#1F2937` | Wordmark, text, dark surfaces (footer, CTA panel) |
| Violet | `#6F61C8` | The mark, buttons, links, eyebrows — the single accent |
| Lavender | `#8B7FD7` | Symbol on ink; large text on ink only (4.3:1) |
| Blush | `#FFD6E0` | Small callouts only |
| White | `#FFFFFF` | Cards on cream |

UI-only derivatives (never used in the mark): Violet deep `#5A4DB5` (hover/pressed on violet), Lavender soft `#EEEBFA` (tints, icon chips).

Contrast pairs from the kit: ink on cream 13.9:1; violet on cream 4.7:1; cream on violet 4.7:1; lavender on ink 4.3:1 (large text only); violet on blush 3.8:1 (graphics only). Never place violet on lavender. Light theme sitewide; ink surfaces anchor the footer and CTA panel.

## 8. Typography

- **Display (headlines, big numbers):** Bricolage Grotesque Bold, tracking −2%. Matches the outlined wordmark. Loaded via `next/font` as `--font-bricolage` (variable font, `opsz` axis).
- **Body / UI:** Plus Jakarta Sans Regular and Medium via `next/font` as `--font-jakarta`.
- Both are SIL OFL. Fraunces is retired.

## 9. Design keywords

Calm · Confident · Editorial · Bespoke · Precise · Fast · Trustworthy

Cream canvas, large tight headlines, generous whitespace, hairline borders, soft shadows. Illustrations are geometric diagrams that explain a mechanism (a traced SEO change, an efficiency loop, a page loading), built from the mark's vocabulary of rounded bars and circles. Animation reveals once, on scroll, and respects reduced motion. Not startup-loud, not corporate-grey, not retro.

## 10. Performance bar (non-negotiable)

The site is the portfolio. Targets:

- Lighthouse 95+ on mobile
- Core Web Vitals pass
- Optimized images (`next/image`), self-hosted fonts, no third-party bloat
- Fully responsive from 360px up
- WCAG AA color contrast

A visitor's first impression must be: "this team clearly knows how to build fast websites."

## 11. Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Vercel · Grumpy Pixels SEO (our own SEO campaign platform at seo.grumpypixels.my).
Positioning note: never attack WordPress directly. Say "we choose the right tools for the problem" and recommend modern frameworks for speed, SEO, and scalability.
