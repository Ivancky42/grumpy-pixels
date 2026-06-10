# Grumpy Pixels — Site Copy

Approved copy for every page. Voice rules in `../brand.md` §4. If copy changes,
update it here first, then in code (`lib/` data files and page components).

Placeholders to confirm before launch: WhatsApp number, email, final domain —
all configured in `lib/site.ts`.

---

## Global

- Site name: Grumpy Pixels
- Meta default title: `Grumpy Pixels — Web Design & Development Studio in Malaysia`
- Meta default description: `Grumpy Pixels is a Malaysian web studio building fast, beautiful, SEO-friendly websites with Next.js. Web design, development, revamps and performance optimization.`
- Contact: WhatsApp deep link + `hello@grumpypixels.my` (placeholder)
- Footer line: `Made in Malaysia. Grumpy about slow websites since day one.`

## Home

### Hero

- Eyebrow: `Web studio · Malaysia`
- H1: `We build websites. Then we complain about them until they're great.`
- Supporting: `Grumpy Pixels is a web design and development studio in Malaysia. We create fast, beautiful, SEO-friendly websites for growing businesses — and we sweat the details so you don't have to.`
- Primary CTA: `Let's work together` (→ #contact)
- Secondary CTA: `View our work` (→ /work)
- Mascot quip: `That spacing isn't 24px...`

### Services ("What we do")

Eyebrow: `Services` · H2: `What we do` · Lede: `Websites only. That's the point — we go deep instead of wide.`

1. **Web Design** — `Clean, modern designs that feel like your brand and guide visitors to act.` Bullets: UI/UX design · Mobile-first layouts · Design systems
2. **Web Development** — `Hand-built with Next.js and React. No bloated themes, no plugin roulette.` Bullets: Next.js & React · Custom builds · Shopify storefronts
3. **Website Revamp** — `Outdated site? We rebuild it to be faster, prettier and easier to find on Google.` Bullets: Redesigns · Migrations · Content restructuring
4. **Performance & SEO** — `We make existing websites load fast and rank better — measurably.` Bullets: Core Web Vitals · Technical SEO · Speed audits

### Why fast matters

Eyebrow: `Why speed` · H2: `Slow websites lose customers` · Lede: `Speed isn't a nice-to-have. It decides whether people stay, buy, and find you at all.`

- `53%` — of mobile visitors leave a site that takes over 3 seconds to load
- `2x` — slow pages can double bounce rates and halve conversions
- `#1` — Google uses page experience and Core Web Vitals in ranking
- `<1s` — what we aim for. Every page, every device.

Mascot quip: `Could be faster.`

### Why design matters

Eyebrow: `Why design` · H2: `Good design earns trust` · Lede: `People decide whether to trust your business in a blink — and they decide it by how your website looks and feels. Good design isn't decoration; it's why visitors stay, believe you, and come back.`

- `0.05s` — is all it takes for visitors to form a first impression of your website
- `75%` — of people judge a business's credibility by its website design
- `94%` — of first impressions are design-related — before anyone reads a word
- `88%` — of users won't return after a bad experience on a website

Closing line: `That's why we design every page to feel considered: clear hierarchy, honest copy, consistent spacing, and details that quietly say these people care. Trust converts — and design is where trust starts.`

### Featured work

Eyebrow: `Our work` · H2: `Recent projects` · Link: `See all work →`
(Case study copy below in "Work".)

### Industries

Eyebrow: `Who we help` · H2: `Built for your industry` · Lede: `Every business is different. We've designed websites around the way Malaysian businesses actually win customers.`
Cards link to the six `/web-design/*` pages.

### Process

Eyebrow: `Process` · H2: `We overthink so you don't have to`

1. **Discover** — `We learn your business, your customers, and what your website needs to achieve.`
2. **Design** — `We design every screen — mobile first — until it looks right and reads right.`
3. **Build** — `We build it fast and fussy: clean code, quick loads, SEO baked in.`
4. **Launch** — `We launch, measure, and keep complaining about the details until they're perfect.`

### Final CTA (#contact)

- H2: `Have a project in mind?`
- Copy: `Tell us what you're building. We'll reply within one working day — usually with opinions.`
- Buttons: `WhatsApp us` + `hello@grumpypixels.my`
- Mascot: approving variant, quip: `Finally.`

## Work (/work)

- H1: `Work we're (almost) happy with`
- Lede: `A selection of recent projects. We focus on outcomes: faster sites, better rankings, more enquiries.`

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
- Hero quip: `The answer nobody likes: it depends.`
- Tiers (snapshots, not packages): `Launch` RM5k–10k (2–4 wks) ·
  `Grow` RM10k–25k (4–8 wks) · `Scale` RM25k+ (scope-dependent)
- Interactive budget calculator (`components/site/BudgetCalculator.tsx`) —
  pages + add-ons → estimated range + closest tier. Guidance only.
- "What actually affects website cost?" — design, content, SEO, integrations,
  custom functionality.
- Value section quip: `Cheap twice is expensive once.`
- Market guide: RM1k–3k templates (we don't operate here) → RM5k–10k custom →
  RM10k–25k growth → RM25k+ platforms.
- FAQ (7 questions, emitted as FAQPage JSON-LD) — leads with the direct
  "How much does a website cost in Malaysia?" answer with real figures.
- Final CTA: `Not sure where your project fits?` / quip: `We'll probably trim
  a few plugins too.`

## Tone reminders

- Headlines: confident, plain, a little wry. Never "synergy", never "solutions".
- Body: short sentences, specifics over superlatives.
- Mascot quips: max one per screen, lowercase grumble energy.
