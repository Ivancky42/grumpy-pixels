import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { JsonLd } from "@/components/site/JsonLd";
import { LogoDefs } from "@/components/site/LogoDefs";
import { services } from "@/lib/services";
import { mailtoLink, site, whatsappLink } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
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

const symbolImage = {
  url: site.assets.symbol,
  width: 512,
  height: 512,
  alt: `${site.name} symbol`,
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: site.title,
    description: site.description,
    images: [openGraphImage, symbolImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [openGraphImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#6F61C8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LogoDefs />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": ["Organization", "ProfessionalService"],
            "@id": `${site.url}/#organization`,
            name: site.name,
            url: site.url,
            logo: `${site.url}${site.assets.logo}`,
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
              "Software development",
              "Web design",
              "Next.js development",
              "Search engine optimisation",
              "Technical SEO",
              "AI consulting",
              "Marketing technology",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Services",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.label,
                  serviceType: service.serviceType,
                  url: `${site.url}/services/${service.slug}`,
                },
              })),
            },
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
