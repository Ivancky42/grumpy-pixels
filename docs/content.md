# Grumpy Pixels — Site Copy

Approved copy for every page. Voice rules in `../brand.md` §4. If copy changes,
update it here first, then in code (`lib/` data files and page components).

Placeholders to confirm before launch: WhatsApp number, email, final domain —
all configured in `lib/site.ts`.

---

## Global

- Site name: Grumpy Pixels
- Meta default title: `Grumpy Pixels — Software, SEO & Consultancy in Malaysia`
- Meta default description: `Malaysian technology studio: fast software and websites, SEO on our own campaign platform, and AI and technology consultancy that gets more done with less.`
- Contact: WhatsApp deep link + `hello@grumpypixels.my` (placeholder)
- Logo descriptor: `Fast websites. Happy users.` (footer only)
- Footer line: `Made in Malaysia. Grumpy about slow websites since day one.`

## Home

### Hero

- Eyebrow: `Technology studio · Malaysia`
- H1: `We build it, rank it, and fix what slows you down.`
- Supporting: `Grumpy Pixels is a technology studio in Malaysia. We build fast software, run SEO on our own campaign platform, and advise leaders on using AI and modern tooling to get more done with less.`
- Aside: `Still grumpy about slow websites. Now also about wasted hours.`
- Primary CTA: `Talk to us` (→ #contact)
- Secondary CTA: `See our services` (→ /services)

### Three pillars

Eyebrow: `What we do` · H2: `Three ways we make companies faster` · Lede: `Build the software, get found for it, and run the whole operation with less manual effort. Take one or all three.` Cards come from `lib/services.ts` (`label`, `navDescription`, first three `offerings`).

### Why fast matters

Eyebrow: `Why speed` · H2: `Slow software loses customers` · Lede: `Speed isn't a nice-to-have. It decides whether people stay, buy, and find you at all.`

- `53%` — of mobile visitors leave a site that takes over 3 seconds to load
- `2x` — slow pages can double bounce rates and halve conversions
- `#1` — Google uses page experience and Core Web Vitals in ranking
- `<1s` — what we aim for. Every page, every device.

(The design stats and `DesignFlip` now live on /services/software-development.)

### Featured work

Eyebrow: `Our work` · H2: `Recent projects` · Link: `See all work →`
(Case study copy below in "Work".)

(The industries grid now lives on /services/software-development#industries; the footer links all six industry pages.)

### How we work

Eyebrow: `How we work` · H2: `We overthink so you don't have to`

1. **Diagnose** — `We start with your numbers: where time, money and customers are being lost, and what fixing it is worth.`
2. **Decide** — `You get a written plan in plain language — what we'll build or change, in what order, and why.`
3. **Deliver** — `Software, SEO or advice: we ship in small, visible steps so you see progress every week.`
4. **Measure** — `Every change is tracked back to the result it produced. If it didn't move the number, we say so.`

### Small by design

Eyebrow: `Boutique on purpose` · Title: `Small by design` · Lede: `We intentionally work with a limited number of clients at any time. Good software and honest advice need focus, attention to detail and direct access — not a production line.`

Supporting: `By keeping our pipeline small, we stay hands-on through every stage — from strategy and design to development and launch.`

- Direct access to the people doing the work
- Faster feedback and communication
- Greater attention to detail
- Higher quality outcomes
- No outsourcing — everything in-house

Closing quote: `We'd rather do a few things exceptionally than dozens of things adequately.`

### Final CTA (#contact)

- H2: `Have a project in mind?`
- Copy: `Tell us what you're building. We'll reply within one working day — usually with opinions.`
- Buttons: `WhatsApp us` + `hello@grumpypixels.my`

## Services (/services, /services/[service])

Hub and three service pages are rendered from `lib/services.ts`. Edit copy there, not in components. Each record: label, navDescription, eyebrow, h1, metaTitle (≤ 60 chars), metaDescription (≤ 160 chars), intro, proof ×3, offerings, howItWorks, faq, cta, external (SEO: Client sign in → seo.grumpypixels.my).

| Page | H1 | Meta title |
| --- | --- | --- |
| `/services/software-development` | Software that pulls its weight. | Software & Web Development Malaysia \| Grumpy Pixels |
| `/services/seo` | SEO you can audit, not just believe. | SEO Services & Campaign Platform Malaysia \| Grumpy Pixels |
| `/services/consultancy` | Get more done with the tools you already pay for. | AI & Technology Consultancy Malaysia \| Grumpy Pixels |

## Work (/work)

- H1: `Work we're (almost) happy with`
- Lede: `A selection of recent projects. We focus on outcomes: faster sites, better rankings, more enquiries.`
- Meta description now says "a Malaysian technology studio".

### MAPACS ASC 2026 — event.mapacs.co/events/asm-2026

- Title: `MAPACS ASC 2026`
- Subtitle: `Annual Scientific Congress of the Malaysian Association of Plastic, Aesthetic and Craniomaxillofacial Surgeons`
- Tags: `Event website` · `Shopify` · `E-commerce`
- Problem: `Malaysia's national association of plastic surgeons needed a dedicated home for its 29th Annual Scientific Congress in Penang — registration tiers, a three-day programme, international speakers, sponsorship packages and hotel bookings, all in one place.`
- Outcome: `A polished congress website built on Shopify, with e-commerce checkout for delegate registration tickets and official merchandise, plus a detailed daily programme, speaker and committee showcases, and sponsorship and accommodation info — everything attendees need before they land in Penang.`

### PersonEdge — personedge.vercel.app

- Title: `PersonEdge`
- Subtitle: `A social-first creative agency in Kuala Lumpur`
- Tags: `Agency website` · `Next.js` · `Neon` · `Payload CMS`
- Problem: `An award-winning creative agency needed a site as scroll-stopping as its campaigns — bold, fast, and able to showcase work for brands like Samsung, AIA, TNB and Lazada.`
- Outcome: `A high-energy, animation-rich marketing site built with Next.js, Payload CMS and a Neon Postgres database — easy for the team to update, and fast despite the visual punch. Proof that personality and performance can coexist.`

### Work CTA

`Want results like these? Let's talk. → #contact (home)`

## Industry pages (/web-design/[industry])

Template per industry (full data in `lib/industries.ts`):

- H1: `{Industry} Website Design in Malaysia`
- Intro: 2–3 sentences naming the niche's reality in Malaysia.
- "Sound familiar?" — 3–4 pain points.
- "What we build" — 4–6 deliverables as cards/bullets.
- FAQ — 3 questions (also emitted as FAQPage JSON-LD).
- CTA banner.
- CTA email subject: `Website for my {industry} business`.

Industries and angles:

| Industry | Angle |
| --- | --- |
| Clinics | Trust + bookings. Patients Google before they book; an outdated site loses them. Listings, doctor profiles, WhatsApp booking. |
| Restaurants & cafes | Menus + maps + speed on mobile data. Most diners find you on their phone. |
| Law firms | Credibility. A firm's website is its first impression; practice areas + lawyer profiles. |
| Property agencies | Listings and lead capture. Fast galleries, WhatsApp-first enquiries. |
| Gyms & fitness | Schedules, trials, sign-ups. Mobile-first for people browsing between sets. |
| Tuition centres | Parent trust. Programmes, results, enrolment enquiries. |

## Pricing page (/pricing)

Written as an educational budget guide, not a package menu ("educate first,
sell second"). Full copy and tier data live in `lib/pricing.ts`.

- H1: `How much does a website cost in Malaysia?` (cost-intent SEO + AI-quotable)
- Tiers (snapshots, not packages): `Launch` RM5k–10k (2–4 wks) ·
  `Grow` RM10k–25k (4–8 wks) · `Scale` RM25k+ (scope-dependent)
- Interactive budget calculator (`components/site/BudgetCalculator.tsx`) —
  pages + add-ons → estimated range + closest tier. Guidance only.
- "What actually affects website cost?" — design, content, SEO, integrations,
  custom functionality.
- Specialists line: `And because we build the thing we quote, you're paying for specialists — not a reseller's margin.`
- Market guide: RM1k–3k templates (we don't operate here) → RM5k–10k custom →
  RM10k–25k growth → RM25k+ platforms.
- FAQ (7 questions, emitted as FAQPage JSON-LD) — leads with the direct
  "How much does a website cost in Malaysia?" answer with real figures.
- Final CTA: `Not sure where your project fits?`

## Tone reminders

- Headlines: confident, plain, a little wry. Never "synergy", never "solutions".
- Body: short sentences, specifics over superlatives.
- No mascot, no quips. Dry asides live in body copy, one per page at most.
