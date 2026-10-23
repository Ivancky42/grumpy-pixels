import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBanner } from "@/components/site/CtaBanner";
import { DesignFlip } from "@/components/site/DesignFlip";
import { IndustryCard } from "@/components/site/IndustryCard";
import { JsonLd } from "@/components/site/JsonLd";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { ServiceFaq } from "@/components/site/ServiceFaq";
import { SpeedRace } from "@/components/site/SpeedRace";
import { StatsRow, type Stat } from "@/components/site/StatsRow";
import { serviceVisuals } from "@/components/site/service-visuals";
import { industries } from "@/lib/industries";
import { getService, services } from "@/lib/services";
import { mailtoWithSubject, site } from "@/lib/site";

type Props = { params: Promise<{ service: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).service);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    // metaTitle already carries the brand where it fits; skip the layout template
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: path,
      images: [
        {
          url: site.assets.openGraph,
          width: 1200,
          height: 630,
          alt: service.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [site.assets.openGraph],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).service);
  if (!service) notFound();

  const url = `${site.url}/services/${service.slug}`;
  const isSoftware = service.slug === "software-development";
  const { Hero: HeroVisual, Showcase } = serviceVisuals[service.slug];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.label,
          serviceType: service.serviceType,
          description: service.metaDescription,
          url,
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: { "@type": "Country", name: "Malaysia" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      {/* Hero */}
      <section className="pb-20 pt-8 sm:pb-28 sm:pt-10">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { label: service.label },
            ]}
          />
          <div className="mt-12 grid items-center gap-12 sm:mt-16 lg:grid-cols-2">
            <div>
              <Eyebrow>{service.eyebrow}</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
                {service.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ink-soft">
                {service.intro}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={mailtoWithSubject(service.cta.emailSubject)}>
                  Email us
                </Button>
                {service.external ? (
                  <Button
                    href={service.external.href}
                    variant="secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {service.external.label}
                  </Button>
                ) : (
                  <Button href="/work" variant="secondary">
                    See our work
                  </Button>
                )}
              </div>
            </div>
            <HeroVisual />
          </div>
        </Container>
      </section>

      {/* Proof — three proof points fill three columns */}
      <section className="py-16 sm:py-24">
        <Container>
          <StatsRow
            columns={3}
            stats={service.proof.map(
              (p, i): Stat => ({
                ...p,
                tint: i === 1 ? "lavender" : "white",
              })
            )}
          />
        </Container>
      </section>

      {Showcase && <Showcase />}

      {/* Software: both diagram cards get their own section */}
      {isSoftware && (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="How it works in practice"
              title={service.navDescription}
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <SpeedRace />
              <DesignFlip />
            </div>
          </Container>
        </section>
      )}

      {/* Offerings */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What we do" title="What's included" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {service.offerings.map((offering) => (
              <Card key={offering.title}>
                <h3 className="font-display text-xl font-bold text-ink">
                  {offering.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {offering.description}
                </p>
              </Card>
            ))}
          </div>
          {isSoftware && (
            <p className="mt-8 text-sm text-ink-soft">
              Wondering what it costs?{" "}
              <Link
                href="/pricing"
                className="font-semibold text-violet underline-offset-4 hover:underline"
              >
                Read the pricing guide →
              </Link>
            </p>
          )}
        </Container>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="From first call to measurable result"
          />
          <div className="mt-10">
            <ProcessSteps steps={service.howItWorks} />
          </div>
        </Container>
      </section>

      {/* Industries (software only) */}
      {isSoftware && (
        <section id="industries" className="scroll-mt-20 py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="Who we help"
              title="Built for your industry"
              lede="We've designed websites around the way Malaysian businesses actually win customers."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {industries.map((industry) => (
                <IndustryCard key={industry.slug} industry={industry} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ServiceFaq items={service.faq} />

      <CtaBanner
        title={service.cta.title}
        copy={service.cta.copy}
        emailSubject={service.cta.emailSubject}
      />
    </>
  );
}
