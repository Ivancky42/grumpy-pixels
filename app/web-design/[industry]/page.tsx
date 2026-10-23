import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBanner } from "@/components/site/CtaBanner";
import { JsonLd } from "@/components/site/JsonLd";
import { ServiceFaq } from "@/components/site/ServiceFaq";
import { getIndustry, industries } from "@/lib/industries";
import { site } from "@/lib/site";

type Props = { params: Promise<{ industry: string }> };

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ industry: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustry((await params).industry);
  if (!industry) return {};
  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: `/web-design/${industry.slug}` },
  };
}

export default async function IndustryPage({ params }: Props) {
  const industry = getIndustry((await params).industry);
  if (!industry) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: industry.metaTitle,
          serviceType: `Website design for ${industry.label.toLowerCase()}`,
          areaServed: { "@type": "Country", name: "Malaysia" },
          provider: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
          },
          description: industry.metaDescription,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: industry.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <section className="pb-20 pt-8 sm:pb-28 sm:pt-10">
        <Container>
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              {
                href: "/services/software-development",
                label: "Software development",
              },
              { label: industry.label },
            ]}
          />
          <div className="mt-12 max-w-3xl sm:mt-16">
            <Eyebrow className="mb-3">
              Web design for {industry.label.toLowerCase()}
            </Eyebrow>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              {industry.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-soft">
              {industry.intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading eyebrow="The problem" title="Sound familiar?" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {industry.painPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-ink/8 bg-white p-5 shadow-soft"
              >
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blush text-xs font-bold text-ink"
                  aria-hidden
                >
                  !
                </span>
                <span className="text-sm text-ink">{point}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="The fix"
            title="What we build"
            lede={`Websites designed around how ${industry.label.toLowerCase()} in Malaysia actually win customers.`}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {industry.deliverables.map((item) => (
              <Card key={item.title} className="p-6 sm:p-6">
                <h3 className="font-display text-xl font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <ServiceFaq items={industry.faq} eyebrow="FAQ" title="Common questions" />

      <section className="py-12 sm:py-16">
        <Container>
          <p className="text-sm text-ink-soft">
            Also looking for something else? See all{" "}
            <Link
              href="/services/software-development#industries"
              className="font-semibold text-violet underline-offset-4 hover:underline"
            >
              industries we work with
            </Link>{" "}
            or browse{" "}
            <Link
              href="/work"
              className="font-semibold text-violet underline-offset-4 hover:underline"
            >
              our recent work
            </Link>
            .
          </p>
        </Container>
      </section>

      <CtaBanner
        title={`Need a website for your ${industry.ctaNoun}?`}
        copy="Tell us about your business and we'll suggest the right approach — no jargon, no pressure."
        emailSubject={`Website for my ${industry.label.toLowerCase()} business`}
        whatsappMessage={`Hi Grumpy Pixels! I'm interested in a website for my ${industry.label.toLowerCase()} business.`}
      />
    </>
  );
}
