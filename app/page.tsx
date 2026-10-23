import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Hero } from "@/components/site/Hero";
import { PillarCards } from "@/components/site/PillarCards";
import { StatsRow, speedStats } from "@/components/site/StatsRow";
import { SpeedRace } from "@/components/site/SpeedRace";
import { ProjectSlots } from "@/components/site/ProjectSlots";
import { WorkCard } from "@/components/site/WorkCard";
import { ProcessSteps, type ProcessStep } from "@/components/site/ProcessSteps";
import { CtaBanner } from "@/components/site/CtaBanner";
import { projects } from "@/lib/work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const homeSteps: ProcessStep[] = [
  {
    title: "Diagnose",
    description:
      "We start with your numbers: where time, money and customers are being lost, and what fixing it is worth.",
  },
  {
    title: "Decide",
    description:
      "You get a written plan in plain language — what we'll build or change, in what order, and why.",
  },
  {
    title: "Deliver",
    description:
      "Software, SEO or advice: we ship in small, visible steps so you see progress every week.",
  },
  {
    title: "Measure",
    description:
      "Every change is tracked back to the result it produced. If it didn't move the number, we say so.",
  },
];

const benefits = [
  "Direct access to the people doing the work",
  "Faster feedback and communication",
  "Greater attention to detail",
  "Higher quality outcomes",
  "No outsourcing — everything in-house",
];

export default function Home() {
  return (
    <>
      <Hero />

      <PillarCards />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why speed"
            title="Slow software loses customers"
            lede="Speed isn't a nice-to-have. It decides whether people stay, buy, and find you at all."
          />
          <div className="mt-12">
            <StatsRow stats={speedStats} />
          </div>
          <div className="mt-6 sm:mt-8">
            <SpeedRace />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Our work" title="Recent projects" />
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-violet underline-offset-4 hover:underline"
            >
              See all work →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section id="process" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="We overthink so you don't have to"
          />
          <div className="mt-12">
            <ProcessSteps steps={homeSteps} />
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Boutique on purpose"
                title="Small by design"
                lede="We intentionally work with a limited number of clients at any time. Good software and honest advice need focus, attention to detail and direct access — not a production line."
              />
              <p className="mt-4 max-w-2xl text-ink-soft">
                By keeping our pipeline small, we stay hands-on through every
                stage — from strategy and design to development and launch.
              </p>
              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lavender-soft text-violet">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-ink-soft">{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-2xl border-l-2 border-ink/15 pl-4 font-display text-lg text-ink">
                We&apos;d rather do a few things exceptionally than dozens of
                things adequately.
              </p>
            </div>
            <ProjectSlots />
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
