"use client";

import { useState } from "react";

/**
 * A mock browser window that flips between a messy "before" layout and a
 * polished "after" one. Pure CSS transitions — no images, no libraries.
 */
export function DesignFlip() {
  const [good, setGood] = useState(false);
  const t = "transition-all duration-500 ease-out";

  return (
    <div className="rounded-3xl border border-navy/8 bg-white p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple">
          Spot the difference
        </p>
        <div
          role="group"
          aria-label="Toggle design example"
          className="flex rounded-full border border-navy/10 bg-navy/5 p-0.5 text-xs font-semibold"
        >
          {(["Before", "After"] as const).map((label) => {
            const active = (label === "After") === good;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => setGood(label === "After")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  active
                    ? "bg-white text-navy shadow-soft"
                    : "text-navy-soft hover:text-navy"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-navy/10">
        <div className="flex items-center gap-1.5 border-b border-navy/10 bg-navy/5 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blush" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint" />
          <span className="h-2.5 w-2.5 rounded-full bg-lavender" />
        </div>

        <div className={`${t} p-5 sm:p-6 ${good ? "bg-cream" : "bg-[#f1ead9]"}`}>
          {/* Nav */}
          <div className="flex items-center justify-between">
            <div
              className={`${t} h-4 w-4 ${
                good
                  ? "rotate-0 rounded-md bg-purple"
                  : "rotate-12 rounded-none bg-[#d94f4f]"
              }`}
            />
            <div className={`${t} flex ${good ? "gap-3" : "gap-1"}`}>
              <span
                className={`${t} h-1.5 w-8 rounded-full ${
                  good ? "bg-navy/30" : "bg-[#d94f4f]/60"
                }`}
              />
              <span
                className={`${t} h-1.5 rounded-full ${
                  good ? "w-8 bg-navy/30" : "w-12 bg-[#3a7d44]/60"
                }`}
              />
              <span
                className={`${t} h-1.5 w-8 rounded-full ${
                  good ? "bg-navy/30" : "bg-[#e8a13c]/70"
                }`}
              />
            </div>
          </div>

          {/* Hero heading */}
          <div className={`${t} ${good ? "mt-7" : "mt-3"}`}>
            <div
              className={`${t} h-3.5 rounded-full ${
                good
                  ? "w-3/5 rotate-0 bg-navy"
                  : "w-11/12 -rotate-1 bg-[#d94f4f]"
              }`}
            />
            <div
              className={`${t} mt-2 h-3.5 rounded-full ${
                good
                  ? "w-2/5 rotate-0 bg-navy"
                  : "w-1/3 rotate-1 bg-[#3a7d44]"
              }`}
            />
          </div>

          {/* Body copy */}
          <div className={`${t} ${good ? "mt-5 space-y-2" : "mt-2 space-y-1"}`}>
            <div
              className={`${t} h-1.5 rounded-full ${
                good ? "w-4/5 bg-navy/25" : "w-full bg-navy/50"
              }`}
            />
            <div
              className={`${t} h-1.5 rounded-full ${
                good ? "w-3/5 bg-navy/25" : "w-full bg-navy/50"
              }`}
            />
            <div
              className={`${t} h-1.5 rounded-full ${
                good ? "w-2/3 bg-navy/25" : "w-5/6 bg-navy/50"
              }`}
            />
          </div>

          {/* CTA */}
          <div
            className={`${t} h-6 ${
              good
                ? "mt-6 w-28 rotate-0 rounded-full bg-purple-deep"
                : "mt-3 w-40 -rotate-1 rounded-none bg-[#e8a13c]"
            }`}
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-navy-soft" aria-live="polite">
        {good
          ? "Same content. Now it earns trust."
          : "Feels off, right? Your visitors feel it too."}
      </p>
    </div>
  );
}
