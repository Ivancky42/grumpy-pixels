"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { prefersReducedMotion } from "@/lib/motion";
import { useInView } from "@/lib/use-in-view";

export type Stat = {
  value: string;
  label: string;
  tint: "white" | "lavender" | "blush";
};

export const speedStats: Stat[] = [
  {
    value: "53%",
    label: "of mobile visitors leave a site that takes over 3 seconds to load",
    tint: "white",
  },
  {
    value: "2x",
    label: "slow pages can double bounce rates and halve conversions",
    tint: "white",
  },
  {
    value: "#1",
    label: "Google uses page experience and Core Web Vitals in ranking",
    tint: "lavender",
  },
  {
    value: "<1s",
    label: "what we aim for. Every page, every device.",
    tint: "white",
  },
];

/** Counts the numeric part of a stat (e.g. "53%", "<1s", "0.05s") up from zero. */
function CountUpValue({ value, play }: { value: string; play: boolean }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!play || prefersReducedMotion()) return;
    const match = value.match(/^([^0-9]*)(\d[\d.]*)(.*)$/);
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const duration = 1200;
    const startTime = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setText(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value]);

  return <>{text}</>;
}

/** Tracks the pointer to gently tilt the card in 3D. Mouse only, GPU transform only. */
function TiltCard({
  tint,
  children,
}: {
  tint: Stat["tint"];
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(700px) rotateX(${(-py * 7).toFixed(
          2
        )}deg) rotateY(${(px * 7).toFixed(2)}deg) translateY(-4px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      className="h-full transition-transform duration-200 ease-out will-change-transform"
    >
      <Card tint={tint} className="h-full transition-shadow duration-200 hover:shadow-lift">
        {children}
      </Card>
    </div>
  );
}

const lgColumns = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" } as const;

export function StatsRow({
  stats,
  columns = 4,
}: {
  stats: Stat[];
  /** Columns at the lg breakpoint */
  columns?: 3 | 4;
}) {
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={gridRef}
      className={`grid gap-4 sm:grid-cols-2 sm:gap-6 ${lgColumns[columns]}`}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.value}
          style={{ transitionDelay: `${i * 110}ms` }}
          className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <TiltCard tint={stat.tint}>
            <p className="font-display text-4xl font-bold tracking-[-0.02em] text-ink">
              <CountUpValue value={stat.value} play={inView} />
            </p>
            <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
          </TiltCard>
        </div>
      ))}
    </div>
  );
}
