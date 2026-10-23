/**
 * Site navigation — the only place menu structure is defined.
 * Header (desktop dropdown + mobile menu) and Footer both read from here.
 */
export type NavChild = { href: string; label: string; description: string };
export type NavItem = { href: string; label: string; children?: NavChild[] };

export const mainNav: NavItem[] = [
  {
    href: "/services",
    label: "Services",
    children: [
      {
        href: "/services/software-development",
        label: "Software development",
        description:
          "Websites, web apps and platforms, built to load fast and last.",
      },
      {
        href: "/services/seo",
        label: "SEO platform & services",
        description:
          "Managed SEO on our own campaign platform — every change traced to its result.",
      },
      {
        href: "/services/consultancy",
        label: "Consultancy",
        description:
          "AI, SEO and ads-tech advice that makes your team faster, not busier.",
      },
    ],
  },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
];

export const ctaNav = { href: "/#contact", label: "Let's talk" } as const;

/** Footer "Studio" column: every top-level route plus contact. */
export const footerStudioNav: { href: string; label: string }[] = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Routes that are full pages (not hash links). The header scrolls to top on
 * repeat clicks of these; hash links let the browser scroll to the section.
 */
export const standalonePaths = new Set([
  "/",
  "/work",
  "/pricing",
  "/services",
  "/services/software-development",
  "/services/seo",
  "/services/consultancy",
]);
