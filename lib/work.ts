export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  url: string;
  displayUrl: string;
  tags: string[];
  problem: string;
  outcome: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "mapacs",
    title: "MAPACS ASC 2026",
    subtitle:
      "Annual Scientific Congress of the Malaysian Association of Plastic, Aesthetic and Craniomaxillofacial Surgeons",
    url: "https://event.mapacs.co/events/asm-2026",
    displayUrl: "event.mapacs.co",
    tags: ["Event website", "Next.js", "Shopify", "E-commerce"],
    problem:
      "Malaysia's national association of plastic surgeons needed a dedicated home for its 29th Annual Scientific Congress in Penang — registration tiers, a three-day programme, international speakers, sponsorship packages and hotel bookings, all in one place.",
    outcome:
      "A polished congress website built with Next.js, with Shopify e-commerce checkout for delegate registration tickets and official merchandise, plus a detailed daily programme, speaker and committee showcases, and sponsorship and accommodation info — everything attendees need before they land in Penang.",
    image: "/work/mapacs.png",
    imageAlt:
      "Screenshot of the MAPACS 29th Annual Scientific Congress 2026 event website",
  },
  {
    slug: "personedge",
    title: "PersonEdge",
    subtitle: "A social-first creative agency in Kuala Lumpur",
    url: "https://personedge.vercel.app",
    displayUrl: "personedge.vercel.app",
    tags: ["Agency website", "Next.js", "Neon", "Payload CMS"],
    problem:
      "An award-winning creative agency needed a site as scroll-stopping as its campaigns — bold, fast, and able to showcase work for brands like Samsung, AIA, TNB and Lazada.",
    outcome:
      "A high-energy, animation-rich marketing site built with Next.js, Payload CMS and a Neon Postgres database — easy for the team to update, and fast despite the visual punch. Proof that personality and performance can coexist.",
    image: "/work/personedge.png",
    imageAlt: "Screenshot of the PersonEdge website homepage",
  },
];
