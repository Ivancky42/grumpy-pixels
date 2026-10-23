# Grumpy Pixels

Marketing website for **Grumpy Pixels**, a Malaysia-based technology studio (software development, SEO platform & services, consultancy). Built with Next.js (App Router), TypeScript and Tailwind CSS 4. Fully static, mobile-first, SEO-optimized.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
```

## Project map

| Path | What it is |
| --- | --- |
| `brand.md` | Brand guide — voice, logo rules, palette, typography |
| `docs/design-system.md` | Tokens, components, responsive rules |
| `docs/seo.md` | Keyword map, URL structure, structured data |
| `docs/content.md` | Approved copy for every page |
| `app/` | Routes: home, `/services`, `/services/[service]`, `/work`, `/pricing`, `/web-design/[industry]`, manifest, sitemap, robots |
| `components/ui/` | Primitives (Button, Card, Container, ...) |
| `components/site/` | Composed sections (Header, Footer, Hero, Logo, PillarCards, ...) |
| `lib/site.ts` | Site config: domain, WhatsApp, email (update before launch) |
| `lib/services.ts` | Three service pillars: copy, metadata, FAQ, CTA — drives /services pages, menu and home cards |
| `lib/navigation.ts` | Header/footer menu structure |
| `components/site/Logo.tsx` | Inline-SVG logo lockups from the logo kit |
| `components/site/illustrations/` | BrowMark, SeoTrace, EfficiencyLoop diagrams |
| `app/manifest.ts` | Web app manifest |
| `scripts/make-og.mjs` | Regenerates `app/opengraph-image.png` from the logo lockup |
| `.claude/launch.json` | Dev-server config for the Claude browser preview |
| `lib/industries.ts` | Data for the six industry SEO landing pages |
| `lib/work.ts` | Case study data (MAPACS, PersonEdge) |
| `public/brand/` | Logo kit SVG/PNG lockups |

## Before launch

1. Set the real domain, WhatsApp number and email in `lib/site.ts`.
2. Verify OG preview, favicons and manifest (`/manifest.webmanifest`).
3. Run Lighthouse (target: 95+ mobile).
