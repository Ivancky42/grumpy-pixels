# build-feature / orchestrate config for grumpy-pixels

Read by the `build-feature` and `orchestrate` skills. Every entry is a fact (a path, a
command, a helper name) that gets pasted into plans and agent packets verbatim. Written
from the October 2026 rebrand run; update it when the facts change.

## Shape
- package manager: `pnpm`; monorepo: no
- apps: `/` (repo root) — Next.js 16.2.9 App Router, React 19, TypeScript, Tailwind CSS 4; fully static marketing site deployed on Vercel
- packages: none
- architecture map: `README.md` (project map table) + `docs/design-system.md` §2 (component inventory)
- docs index: `README.md`

## Rules docs (read in Phase 0 / Phase A, by surface)
- all work: `AGENTS.md` — this Next.js version differs from training data; read `node_modules/next/dist/docs/` for any Next API before using it (metadata: `01-app/03-api-reference/04-functions/generate-metadata.md`; icons/manifest/sitemap: `01-app/03-api-reference/03-file-conventions/01-metadata/`; fonts: `01-app/03-api-reference/02-components/font.md`; image: `.../02-components/image.md` — `priority` is deprecated, use `preload`)
- brand and voice: `brand.md` (logo rules §6, palette §7, type §8; mascot is retired §5 — never reintroduce it)
- frontend / design system: `docs/design-system.md` (tokens, type scale, component inventory, responsive and motion rules)
- copy: `docs/content.md` (approved copy; service copy lives in `lib/services.ts`, home hero copy in `homeCopy` there)
- SEO: `docs/seo.md` (keyword map, URL tree, metadata and JSON-LD patterns; titles ≤ 60 chars, descriptions ≤ 160 chars)
- logo kit (outside the repo): `/Users/ivan/Library/Mobile Documents/com~apple~CloudDocs/Logos/grumpy-pixels-logo-kit/brand-guide.html`

## Contract-owned files (orchestrator or lead only — implementers never touch)
- `app/globals.css` — Tailwind `@theme` tokens and global keyframes
- `app/layout.tsx` — fonts, root metadata, sitewide JSON-LD, `<LogoDefs />`
- `lib/site.ts` — site config (name, URL, email, SEO platform, asset paths)
- `lib/navigation.ts` — menu structure and `standalonePaths`
- `lib/services.ts` — the three service pillars (copy, metadata, FAQ, CTA) and `homeCopy`
- `lib/pricing.ts`, `lib/industries.ts`, `lib/work.ts` — page data
- `components/site/Logo.tsx`, `components/site/LogoDefs.tsx`, `components/site/illustrations/BrowMark.tsx` — the mark (paths pasted from the kit; never edited by agents)
- `app/manifest.ts`, `app/icon.svg`, `app/favicon.ico`, `app/apple-icon.png`, `app/opengraph-image.png`, `public/brand/*`, `public/icon-*.png`, `public/maskable-512.png`
- Component APIs that several units consume: `CtaBanner` props, `ProcessSteps` `steps` prop, `ServiceFaq` props, `Breadcrumbs` props, `StatsRow` `stats`/`columns` props

## Contract steps (what "apply the contract" means here)
1. No database, no migrations, no generated clients.
2. If the logo lockup changes: `node scripts/make-og.mjs` regenerates `app/opengraph-image.png`.
3. If tokens are renamed: run the class sweep with `grep -rlE '<old>' app components lib | xargs sed -i '' -e 's/<old>/<new>/g'` (pipe through xargs; a `for f in $FILES` loop does not word-split in this zsh), then `pnpm exec tsc --noEmit`.

## Gates (run from the repo root)
- `/`: lint `pnpm lint` · typecheck `pnpm exec tsc --noEmit` · build `pnpm build` (fonts download at build time; needs network) · test: none configured
- baseline noise: none — lint and typecheck are clean at HEAD after this run; any error is a finding
- parallel agents must NOT run `pnpm build` or `pnpm dev` (shared `.next` dir); only the orchestrator builds

## Helper conventions (paste into packets' Conventions and the high-tier effort block)
- money math: none (prices are display strings in `lib/pricing.ts`; `priceFrom`/`priceTo` numbers only feed JSON-LD)
- ownership / tenancy: n/a (static site, no auth, no backend)
- auth guards: n/a
- errors: n/a; response envelope: n/a
- validation: n/a; enums are TypeScript unions in `lib/*.ts` (`ServiceSlug`, `Card` `Tint`, `StatsRow` `Stat["tint"]`)
- audit: n/a
- API client: none — no `fetch` to a backend; all data is static `lib/*.ts`
- contact links: `mailtoLink` / `mailtoWithSubject(subject)` / `whatsappLink(message)` from `lib/site.ts`; WhatsApp rendered only when `site.whatsappEnabled`
- colours: Tailwind token classes only — `cream`, `ink`, `ink-soft`, `violet` (single accent), `violet-deep` (hover bg), `lavender` (logo symbol on ink / large text on ink only), `lavender-soft` (tints), `blush` (small callouts). Never `bg-[#…]`, never violet on lavender, never `text-lavender` at small sizes; on ink surfaces use `text-cream`, `text-cream/80`, `text-cream/70`
- type: `font-display` (Bricolage Grotesque) with `font-bold tracking-[-0.02em]` for headings and big numbers; body `font-sans` (Plus Jakarta Sans)
- eyebrows: `Eyebrow` component or `eyebrowClass` from `components/ui/SectionHeading.tsx` — never retype the string
- UI primitives to reuse: `components/ui/` (`Container`, `Button`, `Card`, `Badge`, `SectionHeading`/`Eyebrow`); site sections in `components/site/` (`Breadcrumbs`, `ServiceFaq`, `CtaBanner`, `ProcessSteps`, `StatsRow`, `PillarCard`, `Logo`)
- motion: `useInView` from `lib/use-in-view.ts` for reveal-once; `prefersReducedMotion()` from `lib/motion.ts`; every animation has a `motion-reduce:` fallback; never `setState` synchronously inside a `useEffect` body (lint rule `react-hooks/set-state-in-effect`) — set state in the observer/event callback
- logo: render with `<Logo variant tone className title />`; size with a height class (base is `block w-auto`); never rotate, outline, shadow, mirror or recolour outside the palette
- metadata per page: `title` (≤ 60 chars; use `title.absolute` when the string already carries the brand), `description` (≤ 160), `alternates.canonical`; a page that sets its own `openGraph` must also set `images` (page-level `openGraph` replaces the layout's and drops `og:image`); JSON-LD via `components/site/JsonLd`; breadcrumbs via `components/site/Breadcrumbs` (emits `BreadcrumbList`)
- server components by default; `"use client"` only for state/effects (`Header`, `StatsRow`, `SpeedRace`, `DesignFlip`, `ProjectSlots`, `BudgetCalculator`, `SeoTrace`, `EfficiencyLoop`)

## Dev servers (`.claude/launch.json` names, or commands)
- `web` → `pnpm dev`, port 3000
- desktop-width screenshots: the browser pane is ~550 px wide, so use the cached Playwright Chromium for full-page desktop shots: `~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell --headless --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --window-size=1280,5600 --screenshot=<out.png> http://localhost:3000/<path>` (reveal-on-scroll content looks faded there; check it in the pane)
- SEO smoke check after changes: fetch each route and assert one `<h1>`, `<link rel="canonical">`, parseable JSON-LD, description ≤ 160; fetch `/sitemap.xml`, `/manifest.webmanifest`, `/opengraph-image.png`, `/llms.txt`

## Trailing units (appended to every run that touches the surface)
- any new route: `SEO + docs` — files `app/sitemap.ts`, `public/llms.txt`, `docs/seo.md` §1–§4, `docs/content.md`, `README.md` project map — proven by `pnpm build` + the SEO smoke check above + `grep` for the new route in sitemap and llms.txt — Sonnet-eligible: yes (when the exact text is in the packet)
- any copy change: `docs/content.md` updated in the same run — proven by grep of the new string — Sonnet-eligible: yes
- any token/component change: `docs/design-system.md` §1–§2 — proven by grep — Sonnet-eligible: yes

## Typical Sonnet units in this repo (passed the eligibility rules before)
| Unit shape | Why it qualifies |
|---|---|
| Sitemap entries mirroring existing rows + llms.txt rewrite from pasted text | `pnpm build` + grep verify; no judgement |
| Docs updates (`brand.md`, `docs/*.md`, `README.md`) from per-section verbatim instructions | grep verifies each line |
| Meta title/description trims to exact strings given | character-count check |
| Fixers whose findings are all convention/style with the exact replacement text | re-review verifies |

Never Sonnet here: any `components/**` or `app/**/page.tsx` change (all UI), copy writing, diagram/illustration work.

## Review checklist additions (appended to the generic checklist §1–§5)
### §1 greps (each hit must be fixed or justified)
```bash
git diff | grep -nE '^\+.*(navy|purple|mint|Fraunces|pixelated)'            # retired tokens/fonts
git diff | grep -nE '^\+.*bg-\[#|text-\[#|border-\[#'                        # raw hex instead of tokens
git diff | grep -nE '^\+.*text-lavender'                                      # lavender on ink at small sizes
git diff | grep -nE '^\+.*(Mascot|SpeechBubble|mascot)'                       # retired mascot
git diff | grep -nE '^\+.*tracking-\[0\.18em\]' | grep -v SectionHeading      # eyebrow string retyped
git diff | grep -nE '^\+.*priority='                                           # next/image: use preload
git diff | grep -nE '^\+.*(Websites only|only thing we do|web design and development studio)'  # old positioning
grep -rn "transition" app components | grep -v "motion-reduce" | grep -E "animate-|transition-(all|transform|opacity|\[)" # missing reduced-motion fallback (manual read)
```
### §2 backend
- [ ] n/a (no backend). Anything that adds `fetch` to an external service is a finding unless it is a build-time script.
### §3 frontend
- [ ] Every new route has `title` (≤ 60), `description` (≤ 160), `alternates.canonical`, and an entry in `app/sitemap.ts` and `public/llms.txt`
- [ ] A page that sets `openGraph` also sets `openGraph.images` (and `twitter`) or `og:image` disappears
- [ ] Exactly one `<h1>` per page; breadcrumbs on every page below the top level
- [ ] Copy comes from `lib/*.ts` or `docs/content.md`; no new marketing claims invented in components
- [ ] Logo only via `<Logo>`; mark never animated beyond `BrowMark`
- [ ] New client component uses `useInView` / `prefersReducedMotion`, not a hand-rolled observer
- [ ] Tap targets ≥ 44 px; whole-card links carry `focus-visible:outline-violet`; both the 375 px and 1280 px layouts were looked at
### §4 cross-cutting
- [ ] `docs/content.md`, `docs/design-system.md`, `docs/seo.md`, `README.md` reflect the change
- [ ] No duplicated card/FAQ/eyebrow markup when a shared component exists (`PillarCard`, `ServiceFaq`, `Eyebrow`)
### §5 performance
- [ ] No new raster images without `next/image` + explicit sizes; hero has no images (LCP is text)
- [ ] No inline SVG path data duplicated per instance; large paths go through `LogoDefs`-style `<defs>` + `<use>`
- [ ] No animation libraries; no scroll-jacking

## Git policy
- Never `add` / `commit` / `push`; the user commits. The `/open-pr` skill is the only exception and is user-invoked.
