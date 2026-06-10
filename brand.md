# Grumpy Pixels — Brand Guide

> The single source of truth for who Grumpy Pixels is, how it sounds, and how it looks.
> Implementation details live in `docs/design-system.md`, `docs/seo.md` and `docs/content.md`.

---

## 1. Who we are

Grumpy Pixels is a web design and development studio based in Malaysia.
We build **fast, beautiful, SEO-friendly websites** for growing businesses.

The brand in one sentence:

> A team of friendly perfectionists who are slightly annoyed by bad websites.

We are grumpy **about websites** — never at clients. The grumpiness is always aimed at slow load times, bad spacing, and bloated plugins. To people, we are warm, helpful, and direct.

## 2. Positioning

Most business websites are slow, bloated, hard to maintain, and invisible to search engines. Grumpy Pixels exists because that bothers us — personally.

**Value proposition:** we build websites that load fast, rank better, convert better, and don't become maintenance nightmares.

We are NOT:

- A marketing or social media agency
- A template shop
- A generic "digital solutions" software house

We ARE:

- Website specialists and frontend experts
- Performance-obsessed developers
- Technical SEO practitioners

## 3. Taglines

Primary:

> We build websites. Then we complain about them until they're great.

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
- The grumpiness shows up in small asides and mascot quips, not in headlines.

## 5. The mascot — "Pixel"

A small pixel-art girl: navy hair in a messy bun with a pink scrunchie, oversized lavender hoodie, arms crossed, permanently unimpressed.

Assets (see `public/brand/`):

- `mascot.png` — default grumpy pose (transparent background)
- `mascot-approving.png` — rare "approving" variant with a tiny smile
- `icon.png` — square head-and-shoulders icon (also used as favicon/app icon)

Usage rules:

- Pixel is **seasoning, not the meal**. One appearance per screen, max.
- She comments on the site itself, like a quality inspector. Examples:
  - "That spacing isn't 24px..."
  - "Could be faster."
  - "Not bad."
  - "Finally."
- The approving variant is reserved for positive moments (final CTA, success states). Scarcity makes her approval mean something.
- Always pair her with a speech bubble component, never raw floating text.
- Never stretch, recolor, or rotate the sprite. Render with `image-rendering: pixelated` when scaling up.

## 6. Logo

Horizontal lockup: mascot left, two-line serif wordmark right ("Grumpy" / "Pixels").

- `public/brand/logo-light.png` — navy + purple wordmark for light backgrounds
- `public/brand/logo-dark.png` — cream + lavender wordmark for dark backgrounds
- In the site header, prefer mascot icon + live HTML text (crisper, accessible, themeable). The PNG lockups are for social, OG images, decks, and third-party use.

## 7. Color palette

| Token | Hex | Role |
| --- | --- | --- |
| Cream | `#FFF7F1` | Page background |
| Navy | `#1F2937` | Ink / headings / dark surfaces (footer) |
| Purple | `#8B7FD7` | Brand accent, links, "Pixels" in wordmark |
| Lavender | `#C7C7FF` | Soft accent, tints, icon background |
| Blush | `#FFD6E0` | Highlights, mascot scrunchie, decorative |
| Mint | `#CDEBD9` | Success, secondary highlights |
| White | `#FFFFFF` | Cards on cream |

Light theme sitewide; the footer (and optional hero accents) use Navy as a dark anchor that echoes the logo mockup.

## 8. Typography

- **Headings:** Fraunces (serif, optical sizing on) — matches the wordmark's feel.
- **Body / UI:** Plus Jakarta Sans — friendly geometric sans.
- Both loaded via `next/font` with `latin` subset.

## 9. Design keywords

Friendly · Playful · Soft · Premium · Clean · Fast · Trustworthy · Delightful

Soft rounded corners, generous whitespace, gentle shadows. Not corporate, not startup-bro, not retro gaming. The pixel art is an accent on a soft modern canvas.

## 10. Performance bar (non-negotiable)

The site is the portfolio. Targets:

- Lighthouse 95+ on mobile
- Core Web Vitals pass
- Optimized images (`next/image`), self-hosted fonts, no third-party bloat
- Fully responsive from 360px up
- WCAG AA color contrast

A visitor's first impression must be: "this team clearly knows how to build fast websites."

## 11. Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Vercel.
Positioning note: never attack WordPress directly. Say "we choose the right tools for the problem" and recommend modern frameworks for speed, SEO, and scalability.
