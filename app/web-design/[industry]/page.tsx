import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/site/CtaBanner";
import { JsonLd } from "@/components/site/JsonLd";
import { Mascot } from "@/components/site/Mascot";
import { SpeechBubble } from "@/components/site/SpeechBubble";
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

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple">
                Web design for {industry.label.toLowerCase()}
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                {industry.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-navy-soft">
                {industry.intro}
              </p>
            </div>
            <div className="mx-auto flex flex-col items-center gap-3 lg:mx-0 lg:items-end">
              <SpeechBubble>{industry.quip}</SpeechBubble>
              <Mascot size={200} priority />
            </div>
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
                className="flex items-start gap-3 rounded-2xl border border-navy/8 bg-white p-5 shadow-soft"
              >
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blush text-xs font-bold text-navy"
                  aria-hidden
                >
                  !
                </span>
                <span className="text-sm text-navy">{point}</span>
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
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-navy-soft">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <div className="mt-8 max-w-3xl space-y-4">
            {industry.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-navy/8 bg-white p-5 shadow-soft"
              >
                <summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {item.question}
                    <span
                      className="text-purple-deep transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm text-navy-soft">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <p className="text-sm text-navy-soft">
            Also looking for something else? See all{" "}
            <Link
              href="/#industries"
              className="font-semibold text-purple-deep underline-offset-4 hover:underline"
            >
              industries we work with
            </Link>{" "}
            or browse{" "}
            <Link
              href="/work"
              className="font-semibold text-purple-deep underline-offset-4 hover:underline"
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
        quip="Let's fix it."
        whatsappMessage={`Hi Grumpy Pixels! I'm interested in a website for my ${industry.label.toLowerCase()} business.`}
      />
    </>
  );
}
