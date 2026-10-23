"use client";

import { useRef, useState } from "react";
import { useInView } from "@/lib/use-in-view";

/** Illustrative hours per week, before and after. */
const rows = [
  { label: "Reporting", before: 6, after: 1 },
  { label: "Lead follow-up", before: 5, after: 2 },
  { label: "Content drafts", before: 8, after: 3 },
  { label: "Ad tracking fixes", before: 4, after: 0.5 },
  { label: "Vendor chasing", before: 3, after: 1 },
];

const maxHours = Math.max(...rows.map((r) => r.before));
const totalBefore = rows.reduce((sum, r) => sum + r.before, 0);
const totalAfter = rows.reduce((sum, r) => sum + r.after, 0);
const hours = (h: number) => `${h}h`;
const pct = (h: number) => `${(h / maxHours) * 100}%`;

/**
 * A typical week of team hours, before and after. Bars shrink from the
 * "before" width to the "after" width once, on first scroll into view; the
 * Before | After toggle replays it.
 */
export function EfficiencyLoop() {
  const interacted = useRef(false);
  const [showAfter, setShowAfter] = useState(false);
  const [ref] = useInView<HTMLDivElement>({
    threshold: 0.3,
    onEnter: () => {
      if (!interacted.current) setShowAfter(true);
    },
  });

  return (
    <figure>
      <div
        ref={ref}
        className="rounded-3xl border border-ink/8 bg-white p-6 shadow-soft sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-lg font-bold text-ink">
            A typical week, before and after
          </p>
          <div
            role="group"
            aria-label="Show hours before or after"
            className="flex rounded-full border border-ink/10 bg-ink/5 p-0.5 text-xs font-semibold"
          >
            {(["Before", "After"] as const).map((label) => {
              const active = (label === "After") === showAfter;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    interacted.current = true;
                    setShowAfter(label === "After");
                  }}
                  className={`min-h-11 rounded-full px-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet ${
                    active
                      ? "bg-white text-ink shadow-soft"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only">
          Illustrative team hours per week, before and after:{" "}
          {rows
            .map((r) => `${r.label}, ${hours(r.before)} to ${hours(r.after)}`)
            .join("; ")}
          . In total, {hours(totalBefore)} to {hours(totalAfter)} a week.
        </p>

        <div aria-hidden>
          <p className="mt-5 font-display text-3xl font-bold tracking-[-0.02em] text-ink sm:text-4xl">
            {hours(totalBefore)} <span className="text-ink/30">→</span>{" "}
            <span className="text-violet">{hours(totalAfter)}</span>{" "}
            <span className="font-sans text-base font-medium tracking-normal text-ink-soft">
              a week
            </span>
          </p>

          <div className="mt-6 space-y-4">
            {rows.map((row, i) => (
              <div key={row.label}>
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="font-medium text-ink">{row.label}</span>
                  <span className="tabular-nums text-ink-soft">
                    {hours(row.before)} →{" "}
                    <span className="font-semibold text-violet">
                      {hours(row.after)}
                    </span>
                  </span>
                </div>
                <div className="relative mt-2 h-3 rounded-full bg-ink/5">
                  {/* Ghost of the "before" bar, shown once hours are cut */}
                  <div
                    style={{ width: pct(row.before) }}
                    className={`absolute inset-y-0 left-0 rounded-full bg-ink/20 transition-opacity duration-500 motion-reduce:transition-none ${
                      showAfter ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <div
                    style={{
                      width: pct(showAfter ? row.after : row.before),
                      transitionDelay: `${i * 120}ms`,
                    }}
                    className={`absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-900 ease-out motion-reduce:transition-none ${
                      showAfter ? "bg-violet" : "bg-ink/20"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 max-w-2xl text-sm text-ink-soft">
        Illustrative. We measure your actual hours in the diagnosis and report
        the real numbers.
      </figcaption>
    </figure>
  );
}
