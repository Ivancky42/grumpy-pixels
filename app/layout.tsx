import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { mailtoLink, site, whatsappLink } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const openGraphImage = {
  url: site.assets.openGraph,
  width: 1200,
  height: 630,
  alt: site.title,
} as const;

const brandIconImage = {
  url: site.assets.brandIcon,
  width: 512,
  height: 512,
  alt: `${site.name} icon`,
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: {
    icon: [
      { url: site.assets.favicon, sizes: "48x48" },
      { url: site.assets.icon, type: "image/png", sizes: "512x512" },
    ],
    apple: {
      url: site.assets.appleIcon,
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: site.assets.favicon,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: site.title,
    description: site.description,
    images: [openGraphImage, brandIconImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [openGraphImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: site.name,
            url: site.url,
            logo: `${site.url}${site.assets.brandIcon}`,
            image: `${site.url}${site.assets.openGraph}`,
            description: site.description,
            email: site.email,
            priceRange: "RM5,000 - RM25,000+",
            areaServed: { "@type": "Country", name: "Malaysia" },
            ...(site.whatsappEnabled ? { sameAs: [whatsappLink()] } : {}),
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: site.email,
              url: mailtoLink,
            },
            knowsAbout: [
              "Web design",
              "Next.js development",
              "Website redesign",
              "Website performance optimization",
              "Technical SEO",
              "Shopify development",
            ],
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
