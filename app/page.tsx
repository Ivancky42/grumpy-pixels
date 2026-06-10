import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Hero } from "@/components/site/Hero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { StatsRow, speedStats, designStats } from "@/components/site/StatsRow";
import { SpeedRace } from "@/components/site/SpeedRace";
import { DesignFlip } from "@/components/site/DesignFlip";
import { WorkCard } from "@/components/site/WorkCard";
import { IndustryCard } from "@/components/site/IndustryCard";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Mascot } from "@/components/site/Mascot";
import { SpeechBubble } from "@/components/site/SpeechBubble";
import { industries } from "@/lib/industries";
import { projects } from "@/lib/work";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const services = [
  {
    title: "Web Design",
    description:
      "Clean, modern designs that feel like your brand and guide visitors to act.",
    bullets: ["UI/UX design", "Mobile-first layouts", "Design systems"],
    icon: (
      <svg {...iconProps} aria-hidden>
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: "Web Development",
    description:
      "Hand-built with Next.js and React. No bloated themes, no plugin roulette.",
    bullets: ["Next.js & React", "Custom builds", "Shopify storefronts"],
    icon: (
      <svg {...iconProps} aria-hidden>
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    title: "Website Revamp",
    description:
      "Outdated site? We rebuild it to be faster, prettier and easier to find on Google.",
    bullets: ["Redesigns", "Migrations", "Content restructuring"],
    icon: (
      <svg {...iconProps} aria-hidden>
        <path d="M21 12a9 9 0 11-2.64-6.36" />
        <path d="M21 3v6h-6" />
      </svg>
    ),
  },
  {
    title: "Performance & SEO",
    description:
      "We make existing websites load fast and rank better — measurably.",
    bullets: ["Core Web Vitals", "Technical SEO", "Speed audits"],
    icon: (
      <svg {...iconProps} aria-hidden>
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section id="services" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="What we do"
            lede="Websites only. That's the point — we go deep instead of wide."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Why speed"
              title="Slow websites lose customers"
              lede="Speed isn't a nice-to-have. It decides whether people stay, buy, and find you at all."
            />
            <div className="hidden shrink-0 flex-col items-center gap-2 lg:flex">
              <SpeechBubble>Could be faster.</SpeechBubble>
              <Mascot size={120} />
            </div>
          </div>
          <div className="mt-10">
            <StatsRow stats={speedStats} />
          </div>
          <div className="mt-6 sm:mt-8">
            <SpeedRace />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why design"
            title="Good design earns trust"
            lede="People decide whether to trust your business in a blink — and they decide it by how your website looks and feels. Good design isn't decoration; it's why visitors stay, believe you, and come back."
          />
          <div className="mt-10">
            <StatsRow stats={designStats} />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-center">
            <p className="max-w-2xl text-navy-soft">
              That&apos;s why we design every page to feel considered: clear
              hierarchy, honest copy, consistent spacing, and details that
              quietly say <em>these people care</em>. Trust converts — and
              design is where trust starts.
            </p>
            <DesignFlip />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Our work" title="Recent projects" />
            <Link
              href="/work"
              className="text-sm font-semibold text-purple-deep underline-offset-4 hover:underline"
            >
              See all work →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section id="industries" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Who we help"
            title="Built for your industry"
            lede="Every business is different. We've designed websites around the way Malaysian businesses actually win customers."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {industries.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </Container>
      </section>

      <section id="process" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="We overthink so you don't have to"
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
