import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBanner } from "@/components/site/CtaBanner";
import { JsonLd } from "@/components/site/JsonLd";
import { PillarCard } from "@/components/site/PillarCard";
import { homeCopy, services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Software, SEO & Consultancy",
  description:
    "Software development, managed SEO on our own campaign platform, and technology consultancy for Malaysian businesses that want to get more done with less.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/services/${service.slug}`,
            name: service.label,
          })),
        }}
      />

      <section className="pb-16 pt-8 sm:pb-24 sm:pt-10">
        <Container>
          <Breadcrumbs
            items={[{ href: "/", label: "Home" }, { label: "Services" }]}
          />
          <div className="mt-12 max-w-3xl sm:mt-16">
            <Eyebrow>{homeCopy.pillarsEyebrow}</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              {homeCopy.pillarsTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-soft">
              {homeCopy.pillarsLede}
            </p>
          </div>

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {services.map((service, i) => (
              <li key={service.slug} className="flex">
                <PillarCard service={service} index={i} headingLevel="h2" />
              </li>
            ))}
          </ul>

          <p className="mt-12 max-w-2xl text-ink-soft">
            Not sure which you need?{" "}
            <Link
              href="#contact"
              className="font-semibold text-violet underline-offset-4 hover:underline"
            >
              Tell us what&apos;s slowing you down
            </Link>{" "}
            and we&apos;ll point you to the right place.
          </p>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
