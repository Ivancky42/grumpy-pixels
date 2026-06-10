export type Industry = {
  slug: string;
  /** Short label for cards and footer links */
  label: string;
  /** H1: "{h1} in Malaysia" pattern is composed on the page */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  painPoints: string[];
  deliverables: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  quip: string;
  /** Singular noun for CTA copy, e.g. "Need a website for your {ctaNoun}?" */
  ctaNoun: string;
};

export const industries: Industry[] = [
  {
    slug: "clinics",
    label: "Clinics",
    h1: "Clinic Website Design in Malaysia",
    metaTitle: "Clinic Website Design Malaysia",
    metaDescription:
      "Professional clinic website design in Malaysia. Fast, trustworthy websites for medical, dental and aesthetic clinics — with doctor profiles, services and WhatsApp booking.",
    intro:
      "Patients in Malaysia Google a clinic before they ever call it. If your website is outdated, slow, or missing from search results, they book with the clinic next door. We build clinic websites that look as professional as your practice — and load before patients lose patience.",
    painPoints: [
      "Patients can't find your clinic on Google, but they find your competitors.",
      "Your current site looks dated and doesn't reflect the quality of your care.",
      "No easy way for patients to see services, doctors, or book a slot.",
      "The site is unbearable on mobile — where most patients are.",
    ],
    deliverables: [
      {
        title: "Doctor and service profiles",
        description:
          "Clear pages for every doctor and treatment, written to build trust and rank on Google.",
      },
      {
        title: "WhatsApp booking",
        description:
          "One-tap WhatsApp enquiry buttons — the way Malaysian patients actually book.",
      },
      {
        title: "Local SEO foundations",
        description:
          "Structured data, Google Maps integration, and pages that target the searches patients make.",
      },
      {
        title: "Fast, mobile-first design",
        description:
          "Loads in under a second on mobile data. No spinning logos while patients wait.",
      },
    ],
    faq: [
      {
        question: "Do you work with dental and aesthetic clinics too?",
        answer:
          "Yes — we design websites for medical clinics, dental practices, aesthetic clinics and specialist centres across Malaysia.",
      },
      {
        question: "Can patients book appointments through the website?",
        answer:
          "Yes. We typically integrate WhatsApp booking buttons, contact forms, or your existing booking system — whichever fits your front-desk workflow.",
      },
      {
        question: "How long does a clinic website take to build?",
        answer:
          "A typical clinic website takes 3–5 weeks from kickoff to launch, depending on the number of services and doctors to feature.",
      },
    ],
    quip: "Your patients shouldn't need patience.",
    ctaNoun: "clinic",
  },
  {
    slug: "restaurants",
    label: "Restaurants & Cafes",
    h1: "Restaurant Website Design in Malaysia",
    metaTitle: "Restaurant Website Design Malaysia",
    metaDescription:
      "Restaurant and cafe website design in Malaysia. Beautiful, fast websites with menus, locations and reservations that turn hungry Googlers into walk-ins.",
    intro:
      "Most diners find restaurants on their phones — often hungry, on mobile data, standing outside a mall. Your website has seconds to show the menu, the location, and why they should choose you. We build restaurant websites that make people hungry and make finding you effortless.",
    painPoints: [
      "Your menu is a blurry PDF that takes forever to load.",
      "Diners can't find opening hours or your location quickly.",
      "Instagram is your only web presence — and you don't own it.",
      "Online searches send customers to aggregator apps that take commissions.",
    ],
    deliverables: [
      {
        title: "Mouth-watering menu pages",
        description:
          "Real HTML menus — fast, searchable, easy to update, and indexable by Google. No PDFs.",
      },
      {
        title: "Location and hours, instantly",
        description:
          "Maps, directions, and opening hours visible within one scroll on mobile.",
      },
      {
        title: "Reservations and delivery links",
        description:
          "WhatsApp reservations and clean links to your delivery partners — without losing your brand.",
      },
      {
        title: "Food photography that loads fast",
        description:
          "Optimized images that look delicious without slowing the page to a crawl.",
      },
    ],
    faq: [
      {
        question: "Can I update the menu myself?",
        answer:
          "Yes. We structure menus so price and item changes are quick — either through a simple CMS or a maintenance arrangement with us.",
      },
      {
        question: "Do you build websites for cafes and food chains too?",
        answer:
          "Yes — cafes, restaurants, bakeries, cloud kitchens and multi-outlet F&B brands across Malaysia.",
      },
      {
        question: "Will the website work with delivery platforms?",
        answer:
          "We link your delivery channels (GrabFood, foodpanda, ShopeeFood) prominently while keeping your own brand front and centre.",
      },
    ],
    quip: "PDF menus. Don't get us started.",
    ctaNoun: "restaurant or cafe",
  },
  {
    slug: "law-firms",
    label: "Law Firms",
    h1: "Law Firm Website Design in Malaysia",
    metaTitle: "Law Firm Website Design Malaysia",
    metaDescription:
      "Law firm website design in Malaysia. Credible, professional websites for legal practices — practice areas, lawyer profiles and content that wins client trust.",
    intro:
      "Clients research a law firm long before they call one. Your website is your first consultation — it needs to communicate competence, credibility, and approachability in seconds. We build law firm websites that look as sharp as your arguments.",
    painPoints: [
      "Your website looks like it was built in 2010 — and clients notice.",
      "Potential clients can't tell what areas of law you actually practise.",
      "Competing firms outrank you for the searches that matter.",
      "No clear way for a potential client to reach the right person.",
    ],
    deliverables: [
      {
        title: "Practice area pages",
        description:
          "A dedicated, well-written page for each practice area — the pages that rank and convert.",
      },
      {
        title: "Lawyer profiles",
        description:
          "Professional profiles that highlight credentials and make your team approachable.",
      },
      {
        title: "Authority-building structure",
        description:
          "Clean architecture for articles and insights, so your expertise compounds into rankings.",
      },
      {
        title: "Discreet, fast enquiries",
        description:
          "Clear contact paths with the professionalism legal clients expect.",
      },
    ],
    faq: [
      {
        question: "Can the website include legal articles or insights?",
        answer:
          "Yes — we structure the site so your firm can publish articles that build authority and attract search traffic over time.",
      },
      {
        question: "Do you understand Bar Council advertising considerations?",
        answer:
          "We design conservatively and work with your firm to ensure the website's content stays within professional guidelines you specify.",
      },
      {
        question: "How long does a law firm website take?",
        answer:
          "Typically 4–6 weeks, depending on the number of practice areas and lawyer profiles.",
      },
    ],
    quip: "We object to slow websites.",
    ctaNoun: "law firm",
  },
  {
    slug: "property-agencies",
    label: "Property Agencies",
    h1: "Property Agency Website Design in Malaysia",
    metaTitle: "Property Agency Website Design Malaysia",
    metaDescription:
      "Property agency and real estate website design in Malaysia. Fast listing galleries, lead capture and WhatsApp-first enquiries for agents and agencies.",
    intro:
      "Property buyers scroll fast and judge faster. Heavy photo galleries that take ten seconds to load lose leads to the next listing. We build property websites with fast galleries, clean listings, and WhatsApp-first enquiry flows that turn browsers into viewings.",
    painPoints: [
      "Listing photos load slowly and buyers bounce before they see the unit.",
      "You depend entirely on property portals and pay for every lead.",
      "Your personal brand as an agent has no online home.",
      "Enquiries get lost because there's no clear next step.",
    ],
    deliverables: [
      {
        title: "Fast listing galleries",
        description:
          "Optimized image galleries that stay sharp and load instantly, even with 30 photos per unit.",
      },
      {
        title: "WhatsApp-first lead capture",
        description:
          "Every listing has a one-tap WhatsApp button with the unit details pre-filled.",
      },
      {
        title: "Agent and agency branding",
        description:
          "A professional home for your brand that you own — independent of the portals.",
      },
      {
        title: "Project and area pages",
        description:
          "Pages for townships, projects and areas you specialise in — built to rank for local searches.",
      },
    ],
    faq: [
      {
        question: "Can listings be updated easily?",
        answer:
          "Yes — we set up a simple structure (or lightweight CMS) so new listings go up in minutes, not days.",
      },
      {
        question: "Do you build for individual agents or only agencies?",
        answer:
          "Both. We build personal-brand sites for top agents as well as full agency websites with team pages.",
      },
      {
        question: "Can the site integrate with property portals?",
        answer:
          "We can link to or embed your portal listings while keeping your own site as the lead-capture hub.",
      },
    ],
    quip: "Location, location, loading speed.",
    ctaNoun: "property agency",
  },
  {
    slug: "gyms",
    label: "Gyms & Fitness",
    h1: "Gym & Fitness Website Design in Malaysia",
    metaTitle: "Gym Website Design Malaysia",
    metaDescription:
      "Gym and fitness studio website design in Malaysia. High-energy, mobile-first websites with class schedules, trial sign-ups and membership enquiries.",
    intro:
      "People look for a gym on their phone — between sets, on the commute, or in a burst of new-year motivation. Your website needs to show the vibe, the schedule, and the price of getting started before that motivation fades. We build fitness websites that convert intent into trial sessions.",
    painPoints: [
      "Your class schedule lives in an Instagram story that expires.",
      "Potential members can't figure out pricing or how to start.",
      "The website doesn't capture the energy of your gym.",
      "Trial sign-ups depend on someone answering DMs.",
    ],
    deliverables: [
      {
        title: "Class schedules that stay current",
        description:
          "Clean, mobile-friendly timetables that are easy to update weekly.",
      },
      {
        title: "Trial and membership funnels",
        description:
          "Clear 'first class free' or trial offers with WhatsApp sign-up — no friction.",
      },
      {
        title: "Trainer and program pages",
        description:
          "Show off your coaches and programs with pages that build confidence.",
      },
      {
        title: "High-energy, fast design",
        description:
          "Bold visuals and videos that still load instantly on mobile data.",
      },
    ],
    faq: [
      {
        question: "Can members book classes through the site?",
        answer:
          "Yes — we integrate your booking system (or WhatsApp-based booking) directly into the schedule pages.",
      },
      {
        question: "Do you work with yoga, pilates and martial arts studios?",
        answer:
          "Yes — gyms, CrossFit boxes, yoga and pilates studios, martial arts academies and personal trainers.",
      },
      {
        question: "Can we show member transformations and reviews?",
        answer:
          "Absolutely — social proof sections are usually the highest-converting part of a fitness website.",
      },
    ],
    quip: "Slow websites skip leg day.",
    ctaNoun: "gym or studio",
  },
  {
    slug: "tuition-centres",
    label: "Tuition Centres",
    h1: "Tuition Centre Website Design in Malaysia",
    metaTitle: "Tuition Centre Website Design Malaysia",
    metaDescription:
      "Tuition and education centre website design in Malaysia. Trustworthy websites with programmes, results and enrolment enquiries that win parents over.",
    intro:
      "Parents choosing a tuition centre are making a careful, emotional decision. They compare, they read, and they judge professionalism from your website. We build education websites that present your programmes and results clearly — and make enrolment enquiries effortless.",
    painPoints: [
      "Parents hear about you through word of mouth but can't verify you online.",
      "Programme details, schedules and fees are scattered across WhatsApp messages.",
      "Your centre's results and track record aren't showcased anywhere.",
      "Competitor centres look more established online — even when they aren't.",
    ],
    deliverables: [
      {
        title: "Programme and level pages",
        description:
          "Clear pages per subject and level (UPSR-era to SPM, IGCSE, pre-U) that parents can compare at a glance.",
      },
      {
        title: "Results and testimonials",
        description:
          "Showcase student outcomes and parent testimonials — your strongest selling point.",
      },
      {
        title: "Enrolment enquiry flow",
        description:
          "Simple WhatsApp and form-based enquiries with the programme pre-selected.",
      },
      {
        title: "Teacher profiles",
        description:
          "Introduce your educators with credentials that build parent confidence.",
      },
    ],
    faq: [
      {
        question: "Can we list class schedules and fees?",
        answer:
          "Yes — we structure schedules and fees so they're easy for parents to scan and easy for you to update each intake.",
      },
      {
        question: "Do you work with enrichment and language centres?",
        answer:
          "Yes — tuition centres, enrichment programmes, language schools, music academies and kindergartens.",
      },
      {
        question: "Can the website be in multiple languages?",
        answer:
          "We can structure the site for English plus Bahasa Malaysia or Chinese content where it helps you reach more parents.",
      },
    ],
    quip: "We grade websites. Most get an F.",
    ctaNoun: "tuition centre",
  },
];

export const getIndustry = (slug: string) =>
  industries.find((i) => i.slug === slug);
