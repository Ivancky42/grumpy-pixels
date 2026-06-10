"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type Stat = {
  value: string;
  label: string;
  tint: "white" | "lavender" | "blush" | "mint";
};

export const speedStats: Stat[] = [
  {
    value: "53%",
    label: "of mobile visitors leave a site that takes over 3 seconds to load",
    tint: "lavender",
  },
  {
    value: "2x",
    label: "slow pages can double bounce rates and halve conversions",
    tint: "blush",
  },
  {
    value: "#1",
    label: "Google uses page experience and Core Web Vitals in ranking",
    tint: "mint",
  },
  {
    value: "<1s",
    label: "what we aim for. Every page, every device.",
    tint: "white",
  },
];

export const designStats: Stat[] = [
  {
    value: "0.05s",
    label: "is all it takes for visitors to form a first impression of your website",
    tint: "blush",
  },
  {
    value: "75%",
    label: "of people judge a business's credibility by its website design",
    tint: "lavender",
  },
  {
    value: "94%",
    label: "of first impressions are design-related — before anyone reads a word",
    tint: "white",
  },
  {
    value: "88%",
    label: "of users won't return after a bad experience on a website",
    tint: "mint",
  },
];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

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

export function StatsRow({ stats }: { stats: Stat[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
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
            <p className="font-display text-4xl font-semibold text-navy">
              <CountUpValue value={stat.value} play={inView} />
            </p>
            <p className="mt-2 text-sm text-navy-soft">{stat.label}</p>
          </TiltCard>
        </div>
      ))}
    </div>
  );
}
