/**
 * Single source of truth for site-wide configuration.
 * Update placeholders (domain, WhatsApp, email) before launch.
 */
export const site = {
  name: "Grumpy Pixels",
  url: "https://grumpypixels.my",
  title: "Grumpy Pixels — Web Design & Development Studio in Malaysia",
  description:
    "Grumpy Pixels is a Malaysian web studio building fast, beautiful, SEO-friendly websites with Next.js. Web design, development, revamps and performance optimization.",
  locale: "en_MY",
  region: "Malaysia",
  email: "hello@grumpypixels.my",
  // International format without "+" for the wa.me deep link
  whatsappNumber: "60123456789",
  whatsappDisplay: "+60 12-345 6789",
} as const;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${site.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export const mailtoLink = `mailto:${site.email}`;
