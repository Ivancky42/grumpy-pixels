# Grumpy Pixels

Marketing website for **Grumpy Pixels**, a Malaysia-based web design and development studio. Built with Next.js (App Router), TypeScript and Tailwind CSS 4. Fully static, mobile-first, SEO-optimized.

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
| `brand.md` | Brand guide — voice, mascot rules, palette, typography |
| `docs/design-system.md` | Tokens, components, responsive rules |
| `docs/seo.md` | Keyword map, URL structure, structured data |
| `docs/content.md` | Approved copy for every page |
| `app/` | Routes: home, `/work`, `/web-design/[industry]`, sitemap, robots |
| `components/ui/` | Primitives (Button, Card, Container, ...) |
| `components/site/` | Composed sections (Header, Footer, Hero, Mascot, ...) |
| `lib/site.ts` | Site config: domain, WhatsApp, email (update before launch) |
| `lib/industries.ts` | Data for the six industry SEO landing pages |
| `lib/work.ts` | Case study data (MAPACS, PersonEdge) |
| `public/brand/` | Mascot sprites and logo lockups |
| `scripts/process-assets.mjs` | One-off pipeline that produced the brand assets |

## Before launch

1. Set the real domain, WhatsApp number and email in `lib/site.ts`.
2. Verify OG preview and favicons.
3. Run Lighthouse (target: 95+ mobile).
