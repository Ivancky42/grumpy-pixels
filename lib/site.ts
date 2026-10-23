/**
 * Single source of truth for site-wide configuration.
 * Update placeholders (domain, WhatsApp, email) before launch.
 */
export const site = {
  name: "Grumpy Pixels",
  url: "https://grumpypixels.my",
  title: "Grumpy Pixels — Software, SEO & Consultancy in Malaysia",
  description:
    "Malaysian technology studio: fast software and websites, SEO on our own campaign platform, and AI and technology consultancy that gets more done with less.",
  /** Logo descriptor — used in the footer, never as a headline. */
  tagline: "Fast websites. Happy users.",
  locale: "en_MY",
  region: "Malaysia",
  email: "hello@grumpypixels.my",
  // Set to true to show WhatsApp in the CTA, footer, and structured data
  whatsappEnabled: false,
  // International format without "+" for the wa.me deep link
  whatsappNumber: "60123456789",
  whatsappDisplay: "+60 12-345 6789",
  /** The SEO campaign platform (invite-only sign-in). */
  seoPlatform: {
    name: "Grumpy Pixels SEO",
    url: "https://seo.grumpypixels.my",
    signInLabel: "Client sign in",
  },
  assets: {
    /** Horizontal lockup, 1200 px PNG — schema.org logo and third-party use */
    logo: "/brand/gp-horizontal-color.png",
    /** Symbol on violet tile, 512 px — avatars and secondary OG image */
    symbol: "/brand/gp-symbol-app-icon-512.png",
    openGraph: "/opengraph-image.png",
  },
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const mailtoLink = `mailto:${site.email}`;

export const mailtoWithSubject = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
