import { site } from "@/lib/site";

/**
 * The three service pillars. This is the content contract for the Services
 * menu, the /services hub, the three /services/[service] pages, the home page
 * pillar cards and the structured data. Copy lives here, not in components.
 */
export type ServiceSlug = "software-development" | "seo" | "consultancy";

export type Service = {
  slug: ServiceSlug;
  /** Short name for menus, cards and breadcrumbs */
  label: string;
  /** One-line description for the menu and pillar cards */
  navDescription: string;
  /** Eyebrow above the h1 */
  eyebrow: string;
  h1: string;
  /** ≤ 60 characters, includes "Malaysia" */
  metaTitle: string;
  /** ≤ 160 characters, primary keyword + Malaysia */
  metaDescription: string;
  /** 2–3 sentences, written for a decision maker */
  intro: string;
  /** Exactly three proof points */
  proof: { value: string; label: string }[];
  offerings: { title: string; description: string }[];
  howItWorks: { title: string; description: string }[];
  /** Answer-shaped: 1–3 self-contained sentences each */
  faq: { question: string; answer: string }[];
  cta: { title: string; copy: string; emailSubject: string };
  /** Secondary link, e.g. the SEO platform sign-in */
  external?: { label: string; href: string };
  /** schema.org Service.serviceType */
  serviceType: string;
  keywords: string[];
  /** Which diagram the page renders */
  illustration: "software" | "seo-trace" | "efficiency-loop";
};

export const services: Service[] = [
  {
    slug: "software-development",
    label: "Software development",
    navDescription:
      "Websites, web apps and platforms, built to load fast and last.",
    eyebrow: "Software development · Malaysia",
    h1: "Software that pulls its weight.",
    metaTitle: "Software & Web Development Malaysia | Grumpy Pixels",
    metaDescription:
      "Custom software and web development in Malaysia: Next.js websites, web apps, portals and Shopify stores built to load in under a second and rank on Google.",
    intro:
      "Most business software is slow, over-built and expensive to keep alive. We build the opposite: websites, web applications and platforms that load fast, rank well and stay easy to change — on modern frameworks chosen for the problem, not for the invoice.",
    proof: [
      { value: "<1s", label: "target load time on mobile, on every page" },
      { value: "95+", label: "Lighthouse mobile score we ship to" },
      {
        value: "2",
        label: "projects in build at any time — never a production line",
      },
    ],
    offerings: [
      {
        title: "Websites and marketing sites",
        description:
          "Custom-designed, mobile-first and SEO-ready from day one. No templates, no plugin roulette.",
      },
      {
        title: "Web applications and portals",
        description:
          "Customer portals, internal tools and dashboards built with Next.js, React and a proper database — the parts of your business a website can't do.",
      },
      {
        title: "E-commerce",
        description:
          "Shopify storefronts when they fit, custom checkouts when they don't. Either way, a store that loads before the customer loses interest.",
      },
      {
        title: "Revamps and migrations",
        description:
          "We move outdated sites to a faster stack without losing rankings: redirects mapped, content restructured, speed measured before and after.",
      },
      {
        title: "Performance and Core Web Vitals",
        description:
          "Speed audits and fixes for existing sites, measured against Google's Core Web Vitals rather than a vague 'feels faster'.",
      },
      {
        title: "Ongoing care",
        description:
          "Monthly updates, monitoring and small improvements, so the software keeps earning its keep after launch.",
      },
    ],
    howItWorks: [
      {
        title: "Discover",
        description:
          "We learn your business, your customers and what the software has to achieve — in numbers where possible.",
      },
      {
        title: "Design",
        description:
          "Every screen is designed mobile-first until it looks right and reads right. You see it before we build it.",
      },
      {
        title: "Build",
        description:
          "Clean code, quick loads, SEO baked in. We build fast and fussy, with a working preview you can click through every week.",
      },
      {
        title: "Launch",
        description:
          "We launch, measure, and keep fixing the details until the numbers say it's done.",
      },
    ],
    faq: [
      {
        question: "What do you build with?",
        answer:
          "Usually Next.js and React on Vercel, with Shopify or Payload CMS where a store or editorial workflow needs them. We pick tools for speed, SEO and long-term maintainability, and we'll tell you when something simpler will do.",
      },
      {
        question: "How long does a project take?",
        answer:
          "A marketing website takes two to four weeks. A growth site with CMS and SEO architecture takes four to eight. Web applications and platforms are scoped individually, usually in phases of four to six weeks.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Custom websites start around RM5,000, growth websites run RM10,000–RM25,000, and platforms are scoped from RM25,000. Our pricing guide explains what moves the number.",
      },
      {
        question: "Who owns the code and the accounts?",
        answer:
          "You do. Hosting, domain, analytics and the repository are set up in your name from the start, so you are never locked in to us.",
      },
    ],
    cta: {
      title: "Have something to build?",
      copy: "Tell us what it needs to do and who it's for. We'll reply within one working day with a straight opinion on scope, stack and budget.",
      emailSubject: "Software project enquiry",
    },
    serviceType: "Software development",
    keywords: [
      "software development malaysia",
      "web development malaysia",
      "nextjs development malaysia",
      "web application development malaysia",
      "website redesign malaysia",
      "shopify developer malaysia",
    ],
    illustration: "software",
  },
  {
    slug: "seo",
    label: "SEO platform & services",
    navDescription:
      "Managed SEO on our own campaign platform — every change traced to its result.",
    eyebrow: "SEO · Malaysia",
    h1: "SEO you can audit, not just believe.",
    metaTitle: "SEO Services & Campaign Platform Malaysia | Grumpy Pixels",
    metaDescription:
      "Managed SEO services in Malaysia, run on Grumpy Pixels SEO: a campaign platform where every finding, approved change and result is traced in one place.",
    intro:
      "Most SEO reports ask you to take the agency's word for it. We run every campaign on Grumpy Pixels SEO, our own platform, where each change is traced from the data that prompted it to the result it produced. You approve the recommendations, we do the work, and you can see exactly what moved.",
    proof: [
      {
        value: "1",
        label: "shared source of truth for you, us and your partners",
      },
      { value: "100%", label: "of changes traced from finding to result" },
      {
        value: "Monthly",
        label: "reporting a board can read in five minutes",
      },
    ],
    offerings: [
      {
        title: "Technical SEO and Core Web Vitals",
        description:
          "Crawlability, indexing, site speed and structured data — the foundations Google checks before it reads a word of your content.",
      },
      {
        title: "Content and on-page programme",
        description:
          "Pages written and restructured around the searches your customers actually make, with titles, headings and internal links that earn the click.",
      },
      {
        title: "Local SEO for Malaysia",
        description:
          "Google Business Profile, location pages and reviews, tuned for how Malaysian customers search — in English and Bahasa Malaysia where it matters.",
      },
      {
        title: "Campaign platform access",
        description:
          "Findings, recommendations awaiting your approval, changes made and results — all in one workspace you, your team and your partners can open.",
      },
      {
        title: "Reporting leaders can read",
        description:
          "A monthly summary of what changed, what it cost and what it returned, written for the person who signs the invoice.",
      },
      {
        title: "AI search readiness",
        description:
          "Structured data, answer-shaped content and llms.txt so your business is cited by ChatGPT, Perplexity and Google AI Overviews, not just ranked.",
      },
    ],
    howItWorks: [
      {
        title: "Audit",
        description:
          "We crawl the site, read the search data and write up findings as plain observations: what is losing you traffic and why.",
      },
      {
        title: "Plan",
        description:
          "Each finding becomes a recommendation with an expected effect. You approve what goes ahead; nothing changes without a reason on record.",
      },
      {
        title: "Execute",
        description:
          "We make the changes — technical fixes, content, links — and log each one against the finding that prompted it.",
      },
      {
        title: "Measure",
        description:
          "Rankings, clicks and conversions are tracked back to the change that caused them, so next month's plan is built on evidence.",
      },
    ],
    faq: [
      {
        question: "How is this different from a normal SEO agency report?",
        answer:
          "A typical report lists rankings and hours. Ours lists changes: the finding that prompted each one, who approved it, when it shipped and what it did to traffic. You can open the platform any day and check.",
      },
      {
        question: "Do I need to use the platform myself?",
        answer:
          "No. We run the campaign; the platform is where you approve recommendations and see results. Most clients log in a few times a month, usually to approve work or read the summary.",
      },
      {
        question: "How long until SEO shows results?",
        answer:
          "Technical fixes often show within four to eight weeks. Content and authority work compounds over three to six months. We set expectations per finding, not as one blanket promise.",
      },
      {
        question: "Who actually does the work?",
        answer:
          "Our own team, in-house. Where a change touches your website's code we make it ourselves — we build websites too — so nothing waits on a third-party developer.",
      },
    ],
    cta: {
      title: "Want SEO you can actually check?",
      copy: "Send us your domain and your goals. We'll come back with a short read on where you stand and what a campaign would cover.",
      emailSubject: "SEO enquiry",
    },
    external: {
      label: site.seoPlatform.signInLabel,
      href: site.seoPlatform.url,
    },
    serviceType: "Search engine optimisation",
    keywords: [
      "seo services malaysia",
      "seo agency malaysia",
      "technical seo malaysia",
      "local seo malaysia",
      "seo campaign platform",
      "seo management software",
    ],
    illustration: "seo-trace",
  },
  {
    slug: "consultancy",
    label: "Consultancy",
    navDescription:
      "AI, SEO and ads-tech advice that makes your team faster, not busier.",
    eyebrow: "Consultancy · AI, SEO and marketing technology",
    h1: "Get more done with the tools you already pay for.",
    metaTitle: "AI & Technology Consultancy Malaysia | Grumpy Pixels",
    metaDescription:
      "Technology consultancy in Malaysia for decision makers: AI adoption, SEO strategy and the technical side of ads and marketing, focused on measurable efficiency.",
    intro:
      "Every vendor is selling you AI. Few will tell you where it actually saves time in your business, what it costs to run, and what to leave alone. We advise owners and leadership teams on AI, SEO and marketing technology with one measure of success: your team gets more done with less effort.",
    proof: [
      {
        value: "1",
        label: "written roadmap per engagement, in plain language",
      },
      { value: "30", label: "days or fewer to the first change shipped" },
      {
        value: "0",
        label: "jargon. If we can't explain it simply, we don't recommend it.",
      },
    ],
    offerings: [
      {
        title: "AI readiness and workflow audit",
        description:
          "We map where your team's hours go, then show which steps AI can take over safely, which it can't, and what each is worth in time.",
      },
      {
        title: "AI implementation",
        description:
          "Assistants, automations and internal tools built on your data and your rules — with guardrails, costs and ownership spelled out.",
      },
      {
        title: "SEO strategy and team enablement",
        description:
          "A search strategy your marketing team can run, plus the training and tooling to keep it running without us.",
      },
      {
        title: "Ads and marketing technology",
        description:
          "Tracking, attribution, server-side tagging and CRM plumbing, so the money you spend on ads reports back honestly.",
      },
      {
        title: "Technology due diligence",
        description:
          "An independent read on a vendor, a platform or a quote before you sign, from people who build this for a living.",
      },
      {
        title: "Fractional technical lead",
        description:
          "A senior technologist in your leadership meetings a few days a month, without a full-time hire.",
      },
    ],
    howItWorks: [
      {
        title: "Diagnose",
        description:
          "Interviews, a look at your tools and data, and a short written diagnosis of where effort is being wasted.",
      },
      {
        title: "Decide",
        description:
          "A prioritised roadmap: what to change, in what order, what it costs and what it returns. You decide what goes ahead.",
      },
      {
        title: "Deliver",
        description:
          "We implement the first changes ourselves or alongside your team, with the first one live within thirty days.",
      },
      {
        title: "Hand over",
        description:
          "Documentation, training and a clear owner for every change, so the improvement outlasts the engagement.",
      },
    ],
    faq: [
      {
        question: "Who is this for?",
        answer:
          "Owners, directors and heads of marketing or operations at Malaysian companies with ten to a few hundred staff — people who have to decide on technology without a CTO in the room.",
      },
      {
        question: "What does an engagement look like?",
        answer:
          "Most start with a two-to-three-week diagnosis and roadmap. From there you can stop, have us implement, or keep us on a monthly basis as a fractional technical lead.",
      },
      {
        question: "Do you implement, or only advise?",
        answer:
          "Both. We are a software and SEO studio first, so we can build what we recommend — and we will say so when you don't need us to.",
      },
      {
        question: "How is consultancy priced?",
        answer:
          "Scoped per engagement: a fixed fee for a diagnosis and roadmap, day rates or a monthly retainer for implementation and fractional work. You get the number before any work starts.",
      },
    ],
    cta: {
      title: "Not sure where to start?",
      copy: "Email us for a 45-minute conversation about where your time and budget go today. No deck, no pitch — just questions and a first opinion.",
      emailSubject: "Consultancy enquiry",
    },
    serviceType: "Technology consulting",
    keywords: [
      "ai consultant malaysia",
      "ai consulting malaysia",
      "technology consultancy malaysia",
      "seo consultant malaysia",
      "marketing technology consultant malaysia",
      "digital transformation consultant malaysia",
    ],
    illustration: "efficiency-loop",
  },
];

export const getService = (slug: string) =>
  services.find((service) => service.slug === slug);

/** Home page positioning — the only hero copy, so voice stays consistent. */
export const homeCopy = {
  eyebrow: "Technology studio · Malaysia",
  h1: "We build it, rank it, and fix what slows you down.",
  lede: "Grumpy Pixels is a technology studio in Malaysia. We build fast software, run SEO on our own campaign platform, and advise leaders on using AI and modern tooling to get more done with less.",
  aside: "Still grumpy about slow websites. Now also about wasted hours.",
  primaryCta: { label: "Talk to us", href: "/#contact" },
  secondaryCta: { label: "See our services", href: "/services" },
  pillarsEyebrow: "What we do",
  pillarsTitle: "Three ways we make companies faster",
  pillarsLede:
    "Build the software, get found for it, and run the whole operation with less manual effort. Take one or all three.",
} as const;
