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

### Isometric illustrations

Every page carries an isometric scene, all drawn from one kit so they read as one family (style direction set 23 Oct 2026, replacing the earlier flat diagrams as the headline visual).

- **Projection**: 30° dimetric (2:1), `lib/iso.ts`. `ISO_UNIT = 16` viewBox px per unit; +x runs down-right, +y down-left, +z up. Helpers: `iso`, `points`, `pathD`, `faceMatrix`, `riseDelay`, `ISO_TILE_H`.
- **Primitives** (`components/site/iso/Iso.tsx`, server-safe): `IsoScene` (SVG frame, `aria-hidden` unless given a `label`), `IsoGround` (the shared paper ground plate with a dot grid; its top is z = 0), `IsoBox` (shaded box; children draw on its top face), `IsoFace` (flat content on a top/left/right face), `IsoTile` (thin plate), `IsoShadow` (ground shadow).
- **Tones** (`ISO_TONES`): `violet`, `lavender`, `paper`, `blush`, `ink`. Each tone has a top fill and a side fill; the left face gets an `ink/5`-ish overlay and the right face a darker one, so shading is identical across scenes. Token classes only, no hex.
- **Rules**: no `<text>` in scenes (use rounded-rect text lines), no people or mascot, never draw or skew the logo mark, violet is the single accent and blush a sparing highlight, line art is `stroke-violet` 2–3 px with round caps, draw back to front (ascending x + y, then z), at most ~150 shapes per scene, server components only.
- **Layout**: hero scenes sit in the right column of a `lg:grid-cols-2` hero and stack below the copy under `lg`, capped with `mx-auto max-w-md lg:max-w-none`. Detail that is illegible at 375 px goes in `max-sm:hidden`.
- **Motion**: `.rise-in` (globals.css) on an `IsoBox` or a transform-free `<g>`, staggered with `riseDelay(ms)`, settled within ~1.2 s. Hero scenes animate on load; scenes below the fold sit inside `Reveal` (`components/site/Reveal.tsx`), which holds them until they scroll into view (only when scripting is enabled). Static under reduced motion.
- **Product mockups**: the SEO page shows coded HTML mockups of Grumpy Pixels SEO (`components/site/seo-mockups/`) filled with fictional example data from `lib/seo-demo.ts`. They are `aria-hidden` with an `sr-only` summary, contain nothing focusable, and always show the caption "Example data — a fictional clinic, not a client." Never use real client screenshots or data.

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
| `WorkCard` | Home "Recent projects" card: `ProjectScene` header (no screenshots) + outcome-focused copy + badges. |
| `IndustryCard` | Link card to an industry landing page. |
| `ProcessSteps` | Numbered steps; takes a `steps` prop (service pages pass `howItWorks`). |
| `StatsRow` | Metric tiles with count-up and reveal; `stats` prop. |
| `CtaBanner` | Ink rounded panel with email (and optional WhatsApp) CTA; `emailSubject` prop. |
| `Logo` | Inline-SVG logo lockups from the kit; `variant`, `tone`, `className`, `title`. |
| `PillarCards` | Three service cards from `lib/services.ts`; used on home. |
| `Breadcrumbs` | Visual breadcrumb + `BreadcrumbList` JSON-LD. |
| `ServiceFaq` | `<details>` FAQ accordion from an items list. |
| `illustrations/BrowMark` | The mark assembling with a staggered reveal; used on the 404 page. |
| `illustrations/HeroScene` | Home hero: three pillar platforms (screens, rising bars, flow board) joined by routes. |
| `illustrations/PillarSpot` | Spot illustration per service slug in the pillar cards. |
| `illustrations/SoftwareScene`, `ConsultancyScene` | Service page hero scenes (via `service-visuals/`). |
| `illustrations/IndustryScene` | One building per industry (`scene` key in `lib/industries.ts`); `size: "hero" \| "spot"`. |
| `illustrations/ProjectScene` | One scene per project (`scene` key in `lib/work.ts`); `size: "card" \| "feature"`; replaces screenshots on home and /work. |
| `illustrations/HubScene`, `WorkScene`, `PricingScene`, `LostTile` | Hero scenes for /services, /work, /pricing and the 404 page. |
| `service-visuals/` | `serviceVisuals[slug]` → `{ Hero, Showcase? }` for each /services/[service] page. |
| `seo-mockups/` | `MockFrame`, `OverviewMock`, `RecommendationMock`, `ReportMock`, `SeoTour`: coded product mockups with example data. |
| `iso/Iso` | Isometric kit primitives (see §1 Isometric illustrations). |
| `Reveal` | Client wrapper that holds `.rise-in` parts until scrolled into view. |
| `illustrations/SeoTrace` | Finding → recommendation → change → result diagram, reveals on scroll. |
| `illustrations/EfficiencyLoop` | Before/after weekly-hours bars, animates on scroll. |
| `JsonLd` | Renders a `<script type="application/ld+json">` for structured data. |

### Conventions

- Server components by default; client components only where state/effects are needed: `Header`, `StatsRow`, `SpeedRace`, `DesignFlip`, `ProjectSlots`, `BudgetCalculator`, `SeoTrace`, `EfficiencyLoop`, `Reveal`. All isometric scenes and SEO mockups are server components.
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

Reveal-once on scroll via IntersectionObserver, ≤ 700 ms, staggered; CSS transitions on hover/focus; every animation has a `motion-reduce:` fallback. The logo is never animated beyond `BrowMark`'s fade-in. No scroll-jacking, no animation libraries. Isometric scenes use the `.rise-in` entrance and the `Reveal` wrapper described in §1; nothing loops.
