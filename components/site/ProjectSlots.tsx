"use client";

import Link from "next/link";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { useInView } from "@/lib/use-in-view";

const takenSlots = [
  { name: "Client project 01", stage: "in build", progress: 72 },
  { name: "Client project 02", stage: "in design", progress: 38 },
];

const totalSlots = takenSlots.length + 1;

function nextMonthLabel() {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleString("en-GB", { month: "long", year: "numeric" });
}

/**
 * The studio "slot board": a visual of this month's limited project slots,
 * with one open slot linking to the contact CTA.
 */
export function ProjectSlots() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [bookingMonth] = useState(nextMonthLabel);

  const reveal = `transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
    inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-ink/8 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <Eyebrow>This month&apos;s slots</Eyebrow>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink-soft">
          {takenSlots.length} of {totalSlots} taken
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {takenSlots.map((slot, i) => (
          <div
            key={slot.name}
            style={{ transitionDelay: `${i * 160}ms` }}
            className={`rounded-2xl border border-ink/8 bg-lavender-soft p-4 ${reveal}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-semibold text-ink">{slot.name}</p>
              <p className="text-xs font-medium text-ink-soft">{slot.stage}</p>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-ink/8">
              <div
                className="h-full rounded-full bg-violet transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                style={{
                  width: inView ? `${slot.progress}%` : "0%",
                  transitionDelay: `${300 + i * 160}ms`,
                }}
              />
            </div>
          </div>
        ))}

        <Link
          href="#contact"
          style={{ transitionDelay: `${takenSlots.length * 160}ms` }}
          className={`group block rounded-2xl border-2 border-dashed border-violet/50 bg-white p-4 hover:-translate-y-0.5 hover:border-violet hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet motion-reduce:hover:translate-y-0 ${reveal}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet" />
              </span>
              <span className="text-sm font-semibold text-ink">
                Open slot — could be yours
              </span>
            </div>
            <span
              aria-hidden
              className="text-sm font-semibold text-violet transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </div>
        </Link>
      </div>

      <p className="mt-5 text-sm text-ink-soft">
        Currently booking projects for{" "}
        <span suppressHydrationWarning className="font-semibold text-ink">
          {bookingMonth}
        </span>
        .
      </p>
    </div>
  );
}
