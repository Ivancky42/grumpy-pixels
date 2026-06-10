"use client";

import { useState } from "react";
import Link from "next/link";

type PageBand = "1-5" | "6-10" | "11-20" | "20+";

const pageBands: { value: PageBand; label: string; cost: number }[] = [
  { value: "1-5", label: "1–5 pages", cost: 0 },
  { value: "6-10", label: "6–10 pages", cost: 3000 },
  { value: "11-20", label: "11–20 pages", cost: 8000 },
  { value: "20+", label: "20+ pages", cost: 14000 },
];

const addons = [
  { key: "cms", label: "CMS (update content yourself)", cost: 4000 },
  { key: "blog", label: "Blog / articles", cost: 2000 },
  { key: "seo", label: "SEO-focused architecture", cost: 3000 },
  { key: "integrations", label: "Integrations (booking, CRM, payments)", cost: 5000 },
  { key: "ecommerce", label: "E-commerce / online store", cost: 10000 },
] as const;

type AddonKey = (typeof addons)[number]["key"];

const BASE = 5000;

const fmt = (n: number) => `RM${n.toLocaleString("en-MY")}`;
const roundTo = (n: number, step: number) => Math.round(n / step) * step;

export function BudgetCalculator() {
  const [pages, setPages] = useState<PageBand>("1-5");
  const [selected, setSelected] = useState<Set<AddonKey>>(new Set());

  const toggle = (key: AddonKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const pageCost = pageBands.find((b) => b.value === pages)?.cost ?? 0;
  const addonCost = addons.reduce(
    (sum, a) => (selected.has(a.key) ? sum + a.cost : sum),
    0
  );
  const mid = BASE + pageCost + addonCost;
  const low = roundTo(mid * 0.85, 500);
  const high = roundTo(mid * 1.25, 500);

  const tier =
    mid >= 25000 ? "Scale" : mid > 10000 ? "Grow" : "Launch";

  return (
    <div className="grid gap-6 rounded-3xl border border-navy/8 bg-white p-6 shadow-soft sm:p-8 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <fieldset>
          <legend className="text-sm font-semibold uppercase tracking-widest text-purple">
            How many pages?
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {pageBands.map((band) => (
              <button
                key={band.value}
                type="button"
                onClick={() => setPages(band.value)}
                aria-pressed={pages === band.value}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors min-h-11 ${
                  pages === band.value
                    ? "bg-purple text-white"
                    : "bg-lavender-soft text-navy hover:bg-lavender"
                }`}
              >
                {band.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold uppercase tracking-widest text-purple">
            What does it need?
          </legend>
          <div className="mt-3 space-y-2">
            {addons.map((addon) => (
              <label
                key={addon.key}
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-2xl border border-navy/8 px-4 py-2.5 transition-colors has-checked:border-purple has-checked:bg-lavender-soft"
              >
                <input
                  type="checkbox"
                  checked={selected.has(addon.key)}
                  onChange={() => toggle(addon.key)}
                  className="h-4 w-4 accent-purple"
                />
                <span className="text-sm font-medium text-navy">
                  {addon.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-navy p-6 text-center sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-lavender">
          Estimated budget
        </p>
        <p className="mt-3 font-display text-3xl font-semibold text-cream sm:text-4xl">
          {fmt(low)} – {fmt(high)}
        </p>
        <p className="mt-2 text-sm text-lavender">
          Closest fit: <span className="font-semibold text-cream">{tier}</span>
        </p>
        <p className="mt-4 text-xs text-lavender/80">
          Guidance only — final pricing depends on your exact requirements.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-deep"
        >
          Get an exact quote
        </Link>
      </div>
    </div>
  );
}
