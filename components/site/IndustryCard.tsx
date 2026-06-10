import Link from "next/link";
import type { Industry } from "@/lib/industries";

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link
      href={`/web-design/${industry.slug}`}
      className="group rounded-3xl border border-navy/8 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
    >
      <h3 className="font-display text-lg font-semibold text-navy group-hover:text-purple-deep">
        {industry.label}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm text-navy-soft">
        {industry.metaDescription.split(". ")[1] ?? industry.metaDescription}
      </p>
      <span className="mt-4 inline-block text-sm font-semibold text-purple-deep">
        Web design for {industry.label.toLowerCase()} →
      </span>
    </Link>
  );
}
