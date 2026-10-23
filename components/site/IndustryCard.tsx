import Link from "next/link";
import { IndustryScene } from "@/components/site/illustrations/IndustryScene";
import type { Industry } from "@/lib/industries";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/web-design/${industry.slug}`}
      className="group rounded-3xl border border-ink/8 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="mb-5 rounded-2xl bg-lavender-soft/60 px-4 pb-3 pt-5">
        <IndustryScene scene={industry.scene} size="spot" />
      </div>
      <h3 className="font-display text-xl font-bold text-ink group-hover:text-violet">
        {industry.label}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
        {industry.metaDescription.split(". ")[1] ?? industry.metaDescription}
      </p>
      <span className="mt-4 inline-block text-sm font-semibold text-violet">
        Web design for {industry.label.toLowerCase()} →
      </span>
    </Link>
  );
}
