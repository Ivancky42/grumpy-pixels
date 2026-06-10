export type PricingTier = {
  slug: string;
  name: string;
  priceRange: string;
  priceFrom: number;
  priceTo: number | null;
  summary: string;
  perfectFor: string[];
  includes: string[];
  timeline: string;
  tint: "lavender" | "blush" | "mint";
};

export const tiers: PricingTier[] = [
  {
    slug: "launch",
    name: "Launch",
    priceRange: "RM5,000 – RM10,000",
    priceFrom: 5000,
    priceTo: 10000,
    summary:
      "A custom-designed, fast, SEO-ready website that makes your business look as good as it actually is.",
    perfectFor: [
      "New businesses and startups",
      "Professional services",
      "Small corporate websites",
    ],
    includes: [
      "Custom design (no templates)",
      "Mobile-first, responsive build",
      "Technical SEO foundations",
      "Contact and WhatsApp enquiry flows",
      "Performance optimization",
      "Fast hosting setup",
      "Analytics integration",
    ],
    timeline: "2–4 weeks",
    tint: "lavender",
  },
  {
    slug: "grow",
    name: "Grow",
    priceRange: "RM10,000 – RM25,000",
    priceFrom: 10000,
    priceTo: 25000,
    summary:
      "For businesses treating their website as a growth channel — more pages, more content, more conversions.",
    perfectFor: [
      "Growing businesses investing in SEO",
      "Companies with more content and services",
      "Service businesses that live on enquiries",
    ],
    includes: [
      "Everything in Launch",
      "Advanced UI/UX design",
      "SEO-focused site architecture",
      "Blog and CMS integration",
      "Conversion optimization",
      "Advanced analytics",
      "Content strategy guidance",
    ],
    timeline: "4–8 weeks",
    tint: "blush",
  },
  {
    slug: "scale",
    name: "Scale",
    priceRange: "RM25,000+",
    priceFrom: 25000,
    priceTo: null,
    summary:
      "Custom platforms and systems — when your website needs to do work, not just look good.",
    perfectFor: [
      "Customer portals and membership platforms",
      "E-commerce platforms",
      "Internal systems and dashboards",
    ],
    includes: [
      "Everything in Grow",
      "Custom functionality",
      "Dashboards and user accounts",
      "API and CRM integrations",
      "Workflow automation",
      "Cloud infrastructure planning",
    ],
    timeline: "Depends on scope",
    tint: "mint",
  },
];

export const costFactors = [
  {
    title: "Design",
    description:
      "Fully custom design takes more time than adapting a template — and it's the difference between looking like your brand and looking like everyone else.",
  },
  {
    title: "Content and pages",
    description:
      "Every page needs to be designed, written around, and built. A 5-page site and a 25-page site are genuinely different projects.",
  },
  {
    title: "SEO",
    description:
      "Technical SEO, content architecture and structured data add scope — but they're also what makes the website findable at all.",
  },
  {
    title: "Integrations",
    description:
      "Booking systems, CRMs, payment gateways and third-party tools each add moving parts that need to be wired up and tested.",
  },
  {
    title: "Custom functionality",
    description:
      "Member portals, dashboards and internal tools are software projects — they're scoped and priced like one.",
  },
];

export const marketRanges = [
  {
    range: "RM1,000 – RM3,000",
    label: "Template websites",
    description:
      "Usually a pre-made theme with your logo and text dropped in. Quick and cheap, but typically slow, generic, and hard to rank. Fine for a placeholder; frustrating as a growth tool. We don't operate in this segment.",
  },
  {
    range: "RM5,000 – RM10,000",
    label: "Custom small business websites",
    description:
      "A properly designed and built website: custom design, fast loading, mobile-first, with technical SEO foundations. This is where most serious small businesses in Malaysia should start — and where our Launch tier sits.",
  },
  {
    range: "RM10,000 – RM25,000",
    label: "Growth-focused websites",
    description:
      "Websites built as marketing engines: SEO-driven architecture, CMS for publishing content, conversion optimization, and analytics. Our Grow tier — for businesses that expect the website to pay for itself.",
  },
  {
    range: "RM25,000+",
    label: "Custom platforms and systems",
    description:
      "Customer portals, e-commerce platforms, booking systems and internal tools. Pricing depends entirely on scope — our Scale tier, quoted per project after a discovery conversation.",
  },
];

export const pricingFaq = [
  {
    question: "How much does a website cost in Malaysia?",
    answer:
      "A custom small business website in Malaysia typically costs RM5,000–RM10,000. Growth-focused websites with SEO architecture and a CMS run RM10,000–RM25,000, and custom platforms like portals or e-commerce start from RM25,000. Template-based websites cost less (RM1,000–RM3,000) but are usually slower, generic, and harder to rank on Google.",
  },
  {
    question: "Why don't you publish fixed prices?",
    answer:
      "Because every project genuinely is different — a 5-page brochure site and a 20-page SEO build are different amounts of work. What we can do is publish honest ranges (which we do, above) and give you a fixed quote after a short conversation about your scope.",
  },
  {
    question: "Do you work with WordPress?",
    answer:
      "Yes, when it's the right solution. We choose the right tools for the right problem. For businesses that prioritize speed, SEO and long-term scalability, we often recommend modern frameworks such as Next.js.",
  },
  {
    question: "Do you build with Next.js?",
    answer:
      "Yes — it's our preferred stack. Next.js websites load fast, rank well, and don't depend on a pile of plugins to function. Our own website is built with it.",
  },
  {
    question: "Do you offer hosting and maintenance?",
    answer:
      "Yes. We set up fast, reliable hosting as part of every build, and we offer ongoing maintenance arrangements so your website stays fast and secure after launch.",
  },
  {
    question: "Can you improve or redesign an existing website?",
    answer:
      "Absolutely — redesigns and performance rescues are a big part of what we do. We can audit your current site's speed, SEO and design, and either improve it or rebuild it properly.",
  },
  {
    question: "Is SEO included in the price?",
    answer:
      "Technical SEO foundations — clean architecture, metadata, structured data, fast loading, mobile-first design — are included in every build. Ongoing content-driven SEO campaigns are scoped separately.",
  },
];
