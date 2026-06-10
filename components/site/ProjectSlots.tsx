"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [bookingMonth] = useState(nextMonthLabel);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reveal = `transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
    inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-navy/8 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple">
          This month&apos;s slots
        </p>
        <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy-soft">
          {takenSlots.length} of {totalSlots} taken
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {takenSlots.map((slot, i) => (
          <div
            key={slot.name}
            style={{ transitionDelay: `${i * 160}ms` }}
            className={`rounded-2xl border border-navy/8 bg-lavender-soft p-4 ${reveal}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-semibold text-navy">{slot.name}</p>
              <p className="text-xs font-medium text-navy-soft">{slot.stage}</p>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-navy/8">
              <div
                className="h-full rounded-full bg-purple transition-[width] duration-1000 ease-out motion-reduce:transition-none"
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
          className={`group block rounded-2xl border-2 border-dashed border-purple/50 bg-white p-4 hover:-translate-y-0.5 hover:border-purple hover:shadow-lift ${reveal}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple" />
              </span>
              <span className="text-sm font-semibold text-navy">
                Open slot — could be yours
              </span>
            </div>
            <span
              aria-hidden
              className="text-sm font-semibold text-purple-deep transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </Link>
      </div>

      <p className="mt-5 text-sm text-navy-soft">
        Currently booking projects for{" "}
        <span suppressHydrationWarning className="font-semibold text-navy">
          {bookingMonth}
        </span>
        .
      </p>
    </div>
  );
}
