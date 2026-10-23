import Link from "next/link";
import { eyebrowClass } from "@/components/ui/SectionHeading";
import { PillarSpot } from "@/components/site/illustrations/PillarSpot";
import { Reveal } from "@/components/site/Reveal";
import type { Service } from "@/lib/services";

type Props = {
  service: Service;
  /** Zero-based position; rendered as "01", "02", … */
  index: number;
  /** h3 under a section heading (home), h2 directly under the page h1 (hub) */
  headingLevel?: "h2" | "h3";
};

/** One service pillar as a whole-card link to its service page. */
export function PillarCard({ service, index, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex w-full flex-col rounded-3xl border border-ink/8 bg-white p-6 shadow-soft transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8"
    >
      <div className="mb-6 rounded-2xl bg-lavender-soft/60 px-4 py-3">
        <Reveal className="mx-auto max-w-xs">
          <PillarSpot slug={service.slug} />
        </Reveal>
      </div>
      <span className={`${eyebrowClass} text-violet`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <Heading className="mt-4 font-display text-xl font-bold text-ink">
        {service.label}
      </Heading>
      <p className="mt-2 text-ink-soft">{service.navDescription}</p>
      <ul className="mt-6 divide-y divide-ink/8 border-y border-ink/8">
        {service.offerings.slice(0, 3).map((offering) => (
          <li key={offering.title} className="py-3 text-sm text-ink">
            {offering.title}
          </li>
        ))}
      </ul>
      <span className="mt-auto pt-6 text-sm font-semibold text-violet">
        Explore{" "}
        <span
          aria-hidden
          className="inline-block transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
        >
          →
        </span>
      </span>
    </Link>
  );
}
