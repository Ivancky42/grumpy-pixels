import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BudgetCalculator } from "@/components/site/BudgetCalculator";
import { CtaBanner } from "@/components/site/CtaBanner";
import { JsonLd } from "@/components/site/JsonLd";
import { Mascot } from "@/components/site/Mascot";
import { SpeechBubble } from "@/components/site/SpeechBubble";
import { costFactors, marketRanges, pricingFaq, tiers } from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Cost in Malaysia — Honest Pricing Guide",
  description:
    "How much does a website cost in Malaysia? Honest price ranges from a local web studio: custom websites from RM5,000, growth websites RM10,000–RM25,000, platforms from RM25,000. No hidden packages.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website design and development",
          provider: { "@type": "Organization", name: site.name, url: site.url },
          areaServed: { "@type": "Country", name: "Malaysia" },
          offers: tiers.map((tier) => ({
            "@type": "Offer",
            name: `${tier.name} — ${tier.summary}`,
            priceCurrency: "MYR",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "MYR",
              minPrice: tier.priceFrom,
              ...(tier.priceTo ? { maxPrice: tier.priceTo } : {}),
            },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pricingFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple">
                Pricing, minus the mystery
              </p>
              <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
                How much does a website cost in Malaysia?
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-navy-soft">
                Most agencies hide their pricing. We won&apos;t pretend every
                project costs the same — but we can give you realistic budget
                ranges based on the websites and systems we actually build.
                Fast websites. Clear expectations. No surprises.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-deep"
                >
                  Get a quote
                </Link>
                <a
                  href="#estimate"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-navy/15 bg-white px-6 py-3 font-semibold text-navy transition-colors hover:border-purple hover:text-purple-deep"
                >
                  Estimate my budget
                </a>
              </div>
            </div>
            <div className="mx-auto flex flex-col items-center gap-3 lg:mx-0 lg:items-end">
              <SpeechBubble>
                The answer nobody likes: it depends.
              </SpeechBubble>
              <Mascot size={220} priority />
            </div>
          </div>
        </Container>
      </section>

      {/* What moves the price */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="The honest version"
            title="What you're actually paying for"
            lede="Website pricing varies with the number of pages, design complexity, content, SEO requirements, integrations and custom functionality. The ranges below reflect typical projects we take on — not inflated rack rates."
          />
        </Container>
      </section>

      {/* Tiers */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card key={tier.slug} tint={tier.tint} className="flex flex-col">
                <h2 className="font-display text-2xl font-semibold">
                  {tier.name}
                </h2>
                <p className="mt-1 font-display text-xl font-semibold text-purple-deep">
                  {tier.priceRange}
                </p>
                <p className="mt-3 text-sm text-navy-soft">{tier.summary}</p>

                <h3 className="mt-5 text-xs font-semibold uppercase tracking-widest text-purple">
                  Perfect for
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-navy">
                  {tier.perfectFor.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-5 text-xs font-semibold uppercase tracking-widest text-purple">
                  Includes
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-navy">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5">
                  <Badge className="bg-white/70">
                    Timeline: {tier.timeline}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-navy-soft">
            These aren&apos;t packages — they&apos;re honest snapshots of how
            projects usually shape up. Your quote is always based on your
            actual scope.
          </p>
        </Container>
      </section>

      {/* Budget calculator */}
      <section id="estimate" className="scroll-mt-20 py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Quick estimate"
            title="Ballpark your budget in 20 seconds"
            lede="Pick what your project needs and we'll show you a realistic range — before you've spoken to a single salesperson (we don't have any)."
          />
          <div className="mt-10">
            <BudgetCalculator />
          </div>
        </Container>
      </section>

      {/* Cost factors */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Behind the numbers"
            title="What actually affects website cost?"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {costFactors.map((factor) => (
              <Card key={factor.title} className="p-6 sm:p-6">
                <h3 className="font-display text-lg font-semibold">
                  {factor.title}
                </h3>
                <p className="mt-2 text-sm text-navy-soft">
                  {factor.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Why good value */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <SectionHeading
                eyebrow="Value, not just price"
                title="Why a Grumpy Pixels website is worth it"
                lede="A cheap website that nobody finds is the most expensive thing you can buy."
              />
              <div className="mt-6 space-y-4 text-navy-soft">
                <p>
                  Every website we build ships fast-loading, mobile-first, and
                  with technical SEO baked in — not bolted on later as an
                  upsell. That means it starts working for you on day one:
                  ranking on Google, loading before visitors lose patience, and
                  turning traffic into enquiries.
                </p>
                <p>
                  We build with modern tools (usually Next.js) chosen for
                  speed, SEO and long-term maintainability — so you&apos;re not
                  paying us again every month to babysit plugins. We choose the
                  right tools for the right problem, and we tell you honestly
                  when something isn&apos;t worth your money.
                </p>
                <p>
                  And because websites are the only thing we do, you&apos;re
                  paying for specialists — not a marketing agency&apos;s side
                  quest.
                </p>
              </div>
            </div>
            <div className="mx-auto flex flex-col items-center gap-3 lg:mx-0 lg:items-end lg:pt-10">
              <SpeechBubble>
                Cheap twice is expensive once.
              </SpeechBubble>
              <Mascot size={180} />
            </div>
          </div>
        </Container>
      </section>

      {/* Market guide — long-form SEO content */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="The market, mapped"
            title="A straight answer to website prices in Malaysia"
            lede="Here's what different budgets actually buy in the Malaysian market — including the segments we don't play in."
          />
          <div className="mt-8 space-y-4">
            {marketRanges.map((band) => (
              <div
                key={band.range}
                className="rounded-2xl border border-navy/8 bg-white p-5 shadow-soft sm:p-6"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-purple-deep">
                    {band.range}
                  </h3>
                  <p className="font-semibold text-navy">{band.label}</p>
                </div>
                <p className="mt-2 text-sm text-navy-soft">
                  {band.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-navy-soft">
            In short: a serious custom website in Malaysia starts around
            RM5,000, a growth-focused website with SEO architecture runs
            RM10,000–RM25,000, and custom platforms are scoped from RM25,000
            up. If a quote sounds too good to be true, check what it loads
            like on a phone.
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Pricing questions, answered" />
          <div className="mt-8 max-w-3xl space-y-4">
            {pricingFaq.map((item) => (
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

      <CtaBanner
        title="Not sure where your project fits?"
        copy="Let's have a quick conversation and point you in the right direction. No pressure. No sales tactics. Just honest advice."
        quip="We'll probably trim a few plugins too."
        whatsappMessage="Hi Grumpy Pixels! I'd like a quote for a website project."
      />
    </>
  );
}
