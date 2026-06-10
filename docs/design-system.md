# Grumpy Pixels — Design System

How the brand (see `../brand.md`) translates into code. Tailwind 4 tokens live in
`app/globals.css` under `@theme`; components live in `components/`.

---

## 1. Tokens

### Colors (Tailwind 4 `@theme` in `app/globals.css`)

| Tailwind class | CSS variable | Hex | Usage |
| --- | --- | --- | --- |
| `*-cream` | `--color-cream` | `#FFF7F1` | Page background |
| `*-navy` | `--color-navy` | `#1F2937` | Headings, body text, footer bg |
| `*-navy-soft` | `--color-navy-soft` | `#4B5563` | Secondary text |
| `*-purple` | `--color-purple` | `#8B7FD7` | Primary accent, links, buttons |
| `*-purple-deep` | `--color-purple-deep` | `#6F61C8` | Button hover, emphasis |
| `*-lavender` | `--color-lavender` | `#C7C7FF` | Tints, icon chips, borders |
| `*-lavender-soft` | `--color-lavender-soft` | `#E9E9FF` | Card tint backgrounds |
| `*-blush` | `--color-blush` | `#FFD6E0` | Decorative highlights, badges |
| `*-mint` | `--color-mint` | `#CDEBD9` | Success accents, alt badges |

Contrast rules: body text is `navy` on `cream`/`white` (AA+). Never set long text in
`purple` smaller than 18px bold. On `navy` surfaces use `cream` text with `lavender` accents.

### Typography

- Headings: `font-display` → Fraunces, loaded in `app/layout.tsx` via `next/font` as `--font-fraunces`.
- Body: `font-sans` → Plus Jakarta Sans via `--font-jakarta`.

Scale (mobile → desktop):

| Element | Classes |
| --- | --- |
| Hero h1 | `text-4xl sm:text-5xl lg:text-6xl font-display font-semibold` |
| Section h2 | `text-3xl sm:text-4xl font-display font-semibold` |
| Card h3 | `text-xl font-display font-semibold` |
| Body | `text-base` (`text-navy-soft` for secondary) |
| Eyebrow | `text-sm font-semibold uppercase tracking-widest text-purple` |

### Shape and depth

- Radii: cards `rounded-3xl`, buttons/pills `rounded-full`, images `rounded-2xl`.
- Shadows: soft only — `shadow-soft` token (`0 8px 30px rgb(31 41 55 / 0.08)`). No hard shadows.
- Borders: `border-navy/8` hairlines on white cards.

### Spacing rhythm

- Section padding: `py-16 sm:py-24`.
- Content container: `Container` component → `mx-auto max-w-6xl px-4 sm:px-6`.
- Grid gaps: `gap-4 sm:gap-6` for card grids.

### Pixel-art rendering

Mascot images must keep crisp pixels when scaled: use the `pixelated` utility
(`image-rendering: pixelated`) defined in `globals.css`.

## 2. Components

### `components/ui/` — primitives

| Component | Notes |
| --- | --- |
| `Container` | Max-width wrapper, the only place page gutters are defined. |
| `Button` | `variant: "primary" \| "secondary" \| "ghost"`, renders `<Link>` when `href` given. Primary = purple bg, white text; secondary = white bg, navy border. |
| `SectionHeading` | Eyebrow + h2 + optional lede paragraph; `align: "left" \| "center"`. |
| `Card` | White rounded-3xl card with soft shadow; `tint` prop for lavender/blush/mint variants. |
| `Badge` | Small rounded-full pill for labels (tech stack, industries). |

### `components/site/` — composed sections

| Component | Notes |
| --- | --- |
| `Header` | Sticky, cream/blur background, mascot icon + wordmark text, desktop nav + mobile disclosure menu (client component). |
| `Footer` | Navy background, dark logo treatment, nav links, industry links (SEO internal linking), WhatsApp + email. |
| `Mascot` | Renders the sprite. `variant: "grumpy" \| "approving"`, `size` prop, pixelated rendering. |
| `SpeechBubble` | Blush-pink pixel-style bubble with a quip; positions relative to mascot. Use with `Mascot` for the brand moments. |
| `Hero` | Home hero: headline, supporting copy, dual CTAs, mascot + bubble. |
| `ServiceCard` | Icon chip + title + copy + bullet list. |
| `WorkCard` | Screenshot (next/image) + outcome-focused copy + badges. |
| `IndustryCard` | Link card to an industry landing page. |
| `ProcessSteps` | 4 numbered steps, horizontal on desktop, stacked on mobile. |
| `StatsRow` | "Why fast matters" metric tiles. |
| `CtaBanner` | Navy rounded panel with approving mascot + WhatsApp/email buttons. |
| `WhatsAppButton` | Green-free brand-styled WhatsApp deep-link button (uses `lib/site.ts`). |
| `JsonLd` | Renders a `<script type="application/ld+json">` for structured data. |

### Conventions

- Server components by default; only `Header` (mobile menu state) is a client component.
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

Subtle and cheap only: CSS transitions on hover/focus (`transition-colors`,
`transition-transform`, small `-translate-y` lifts). No scroll-jacking, no heavy
animation libraries — performance is the brand.
