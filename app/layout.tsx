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
  },
  twitter: {
    card: "summary_large_image",
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
            logo: `${site.url}/brand/icon.png`,
            image: `${site.url}/opengraph-image.png`,
            description: site.description,
            email: site.email,
            priceRange: "RM5,000 - RM25,000+",
            areaServed: { "@type": "Country", name: "Malaysia" },
            sameAs: [whatsappLink()],
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
