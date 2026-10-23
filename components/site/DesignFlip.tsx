"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * A mock browser window that flips between a messy "before" layout and a
 * polished "after" one. Pure CSS transitions — no images, no libraries.
 */
export function DesignFlip() {
  const [good, setGood] = useState(false);
  const t = "transition-all duration-500 ease-out motion-reduce:transition-none";

  return (
    <div className="rounded-3xl border border-ink/8 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <Eyebrow>Spot the difference</Eyebrow>
        <div
          role="group"
          aria-label="Toggle design example"
          className="flex rounded-full border border-ink/10 bg-ink/5 p-0.5 text-xs font-semibold"
        >
          {(["Before", "After"] as const).map((label) => {
            const active = (label === "After") === good;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => setGood(label === "After")}
                className={`rounded-full px-3 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet motion-reduce:transition-none ${
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

      <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10">
        <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink/5 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </div>

        <div className={`${t} p-5 sm:p-6 ${good ? "bg-cream" : "bg-ink/5"}`}>
          {/* Nav */}
          <div className="flex items-center justify-between">
            <div
              className={`${t} h-4 w-4 ${
                good
                  ? "rotate-0 rounded-md bg-violet"
                  : "rotate-12 rounded-none bg-ink/60"
              }`}
            />
            <div className={`${t} flex ${good ? "gap-3" : "gap-1"}`}>
              <span
                className={`${t} h-1.5 w-8 rounded-full ${
                  good ? "bg-ink/30" : "bg-ink/50"
                }`}
              />
              <span
                className={`${t} h-1.5 rounded-full ${
                  good ? "w-8 bg-ink/30" : "w-12 bg-ink/20"
                }`}
              />
              <span
                className={`${t} h-1.5 w-8 rounded-full ${
                  good ? "bg-ink/30" : "bg-ink/40"
                }`}
              />
            </div>
          </div>

          {/* Hero heading */}
          <div className={`${t} ${good ? "mt-7" : "mt-3"}`}>
            <div
              className={`${t} h-3.5 rounded-full ${
                good
                  ? "w-3/5 rotate-0 bg-ink"
                  : "w-11/12 -rotate-1 bg-ink/70"
              }`}
            />
            <div
              className={`${t} mt-2 h-3.5 rounded-full ${
                good
                  ? "w-2/5 rotate-0 bg-ink"
                  : "w-1/3 rotate-1 bg-ink/45"
              }`}
            />
          </div>

          {/* Body copy */}
          <div className={`${t} ${good ? "mt-5 space-y-2" : "mt-2 space-y-1"}`}>
            <div
              className={`${t} h-1.5 rounded-full ${
                good ? "w-4/5 bg-ink/25" : "w-full bg-ink/50"
              }`}
            />
            <div
              className={`${t} h-1.5 rounded-full ${
                good ? "w-3/5 bg-ink/25" : "w-full bg-ink/50"
              }`}
            />
            <div
              className={`${t} h-1.5 rounded-full ${
                good ? "w-2/3 bg-ink/25" : "w-5/6 bg-ink/50"
              }`}
            />
          </div>

          {/* CTA */}
          <div
            className={`${t} h-6 ${
              good
                ? "mt-6 w-28 rotate-0 rounded-full bg-violet"
                : "mt-3 w-40 -rotate-1 rounded-none bg-ink/35"
            }`}
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-soft" aria-live="polite">
        {good
          ? "Same content. Now it earns trust."
          : "Feels off, right? Your visitors feel it too."}
      </p>
    </div>
  );
}
