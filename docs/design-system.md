# Grumpy Pixels — Design System

How the brand (see `../brand.md`) translates into code. Tailwind 4 tokens live in
`app/globals.css` under `@theme`; components live in `components/`.

---

## 1. Tokens

### Colors (Tailwind 4 `@theme` in `app/globals.css`)

| Tailwind class | CSS variable | Hex | Usage |
| --- | --- | --- | --- |
| `*-cream` | `--color-cream` | `#FFF7F1` | Page background |
| `*-ink` | `--color-ink` | `#1F2937` | Headings, body text, footer and CTA panel bg |
| `*-ink-soft` | `--color-ink-soft` | `#4B5563` | Secondary text |
| `*-violet` | `--color-violet` | `#6F61C8` | Primary accent: links, buttons, eyebrows, diagram strokes |
| `*-violet-deep` | `--color-violet-deep` | `#5A4DB5` | Button hover/pressed |
| `*-lavender` | `--color-lavender` | `#8B7FD7` | Logo symbol on ink; large text on ink only |
| `*-lavender-soft` | `--color-lavender-soft` | `#EEEBFA` | Tints, icon chips, soft panels |
| `*-blush` | `--color-blush` | `#FFD6E0` | Small callouts |

Contrast rules: Body text is `ink` on `cream`/`white`. On `ink` surfaces use `cream` (primary), `cream/80` (secondary), `cream/70` (eyebrows, legal); never `lavender` at small sizes. Never set long text in `violet` smaller than 18px bold. Never place violet on lavender.

### Typography

- Headings: `font-display` → Bricolage Grotesque (variable, `opsz` axis), loaded in `app/layout.tsx` via `next/font` as `--font-bricolage`.
- Body: `font-sans` → Plus Jakarta Sans via `--font-jakarta`.

Scale (mobile → desktop):

| Element | Classes |
| --- | --- |
| Hero h1 | `font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05]` |
| Section h2 | `font-display text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-tight` |
| Card h3 | `font-display text-xl font-bold` |
| Body | `text-base` (`text-ink-soft` for secondary) |
| Eyebrow | `text-xs font-semibold uppercase tracking-[0.18em] text-violet` |
| Big number | `font-display text-4xl font-bold tracking-[-0.02em]` |

### Shape and depth

- Radii: cards `rounded-3xl`, buttons/pills `rounded-full`, images `rounded-2xl`.
- Shadows: soft only — `shadow-soft` token (`0 8px 30px rgb(31 41 55 / 0.08)`). No hard shadows.
- Borders: `border-ink/8` hairlines on white cards.

### Spacing rhythm

- Section padding: `py-16 sm:py-24` (hero sections `py-20 sm:py-28`).
- Content container: `Container` component → `mx-auto max-w-6xl px-4 sm:px-6`.
- Grid gaps: `gap-4 sm:gap-6` for card grids.

## 2. Components

### `components/ui/` — primitives

| Component | Notes |
| --- | --- |
| `Container` | Max-width wrapper, the only place page gutters are defined. |
| `Button` | `variant: "primary" \| "secondary" \| "ghost"`, renders `<Link>` when `href` is internal. Primary = violet bg, white text; secondary = white bg, ink border; all variants carry the violet focus ring. |
| `SectionHeading` | Eyebrow + h2 + optional lede paragraph; `align: "left" \| "center"`. |
| `Card` | White rounded-3xl card with soft shadow; `tint: "white" \| "lavender" \| "blush"`. |
| `Badge` | Small rounded-full pill for labels (tech stack, industries). |

### `components/site/` — composed sections

| Component | Notes |
| --- | --- |
| `Header` | Sticky, cream/blur, inline logo, desktop nav with accessible Services dropdown + mobile full-screen menu (client component). Reads `lib/navigation.ts`. |
| `Footer` | Ink background, reversed logo, tagline, Services / Studio / Web design for / Say hello columns incl. SEO platform sign-in. |
| `Hero` | Home hero: positioning copy from `lib/services.ts` `homeCopy` + `BrowMark`. |
| `WorkCard` | Screenshot (next/image) + outcome-focused copy + badges. |
| `IndustryCard` | Link card to an industry landing page. |
| `ProcessSteps` | Numbered steps; takes a `steps` prop (service pages pass `howItWorks`). |
| `StatsRow` | Metric tiles with count-up and reveal; `stats` prop. |
| `CtaBanner` | Ink rounded panel with email (and optional WhatsApp) CTA; `emailSubject` prop. |
| `Logo` | Inline-SVG logo lockups from the kit; `variant`, `tone`, `className`, `title`. |
| `PillarCards` | Three service cards from `lib/services.ts`; used on home. |
| `Breadcrumbs` | Visual breadcrumb + `BreadcrumbList` JSON-LD. |
| `ServiceFaq` | `<details>` FAQ accordion from an items list. |
| `illustrations/BrowMark` | Hero mark assembling with a staggered reveal. |
| `illustrations/SeoTrace` | Finding → recommendation → change → result diagram, reveals on scroll. |
| `illustrations/EfficiencyLoop` | Before/after weekly-hours bars, animates on scroll. |
| `JsonLd` | Renders a `<script type="application/ld+json">` for structured data. |

### Conventions

- Server components by default; client components only where state/effects are needed: `Header`, `StatsRow`, `SpeedRace`, `DesignFlip`, `ProjectSlots`, `BudgetCalculator`, `SeoTrace`, `EfficiencyLoop`.
- Navigation structure lives in `lib/navigation.ts`; service copy in `lib/services.ts`.
- All site config (name, URL, contact, socials) comes from `lib/site.ts` — never hardcode.
- Industry page data comes from `lib/industries.ts`; case studies from `lib/work.ts`.
- Every image goes through `next/image` with explicit `width`/`height` or `fill`, and meaningful `alt`.

## 3. Responsive rules

- Design mobile-first at 360–390px; enhance at `sm` (640), `md` (768), `lg` (1024).
- Tap targets ≥ 44px. Mobile menu items are full-width rows.
- Hero CTAs stack vertically on mobile, side-by-side from `sm`.
- Card grids: 1 column mobile → 2 at `sm` → 3–4 at `lg`.
- Never rely on hover-only affordances; all interactions work with tap/focus.

## 4. Motion

Reveal-once on scroll via IntersectionObserver, ≤ 700 ms, staggered; CSS transitions on hover/focus; every animation has a `motion-reduce:` fallback. The logo is never animated beyond `BrowMark`'s fade-in. No scroll-jacking, no animation libraries.
