import {
  demoClicks,
  demoFindings,
  demoKpis,
  demoPriorityPages,
  demoSource,
  demoTop10,
  demoWorkspace,
  type DemoFinding,
} from "@/lib/seo-demo";
import { Chip, DeltaPill, MockCard, MockSource, MockTitle } from "./MockFrame";

const clicksKpi = demoKpis[0];
const top10Kpi = demoKpis[3];

/** Screen-reader summary of the Overview mockup, built from the demo data */
export const overviewSummary = `Example dashboard overview for a fictional clinic, ${demoWorkspace.name}, ${demoWorkspace.period}: ${demoKpis
  .map((k) => `${k.label.toLowerCase()} ${k.value} (${k.delta})`)
  .join(", ")}. Top priority page: ${demoPriorityPages[0].title}, ${demoPriorityPages[0].clicks.toLocaleString("en-US")} clicks. ${demoTop10.inTop10} of ${demoTop10.active} tracked keywords in the top 10. Next fix: ${demoFindings[0].title}.`;

/**
 * The Overview screen of Grumpy Pixels SEO with example data: KPI row, daily
 * clicks chart, priority pages, top-10 ring and "What to fix next".
 * `compact` (the hero, where height is tight and the ring floats beside the
 * window) shows three priority pages and drops the ring and the findings.
 */
export function OverviewMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2 @md:grid-cols-4">
        {demoKpis.map((k) => (
          <MockCard key={k.label} className="p-2.5">
            <p className="truncate text-[10px] text-ink-soft">{k.label}</p>
            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-1">
              <span className="font-display text-lg font-bold leading-none tracking-[-0.02em]">
                {k.value}
              </span>
              <DeltaPill delta={k.delta} good={k.good} />
            </div>
          </MockCard>
        ))}
      </div>

      <ClicksChart />

      {compact ? (
        <PriorityPages limit={3} />
      ) : (
        <div className="grid gap-2.5 @lg:grid-cols-[minmax(0,1fr)_9.5rem]">
          <PriorityPages />
          <MockCard className="flex flex-col items-center justify-center text-center">
            <MockTitle>{top10Kpi.label}</MockTitle>
            <Top10Ring className="mt-2 size-24" />
            <p className="mt-2 text-[10px] text-ink-soft">{demoTop10.note}</p>
          </MockCard>
        </div>
      )}

      {!compact && <Findings />}
    </div>
  );
}

function ClicksChart() {
  const W = 300;
  const H = 72;
  const max = Math.max(...demoClicks);
  const min = Math.min(...demoClicks) * 0.8;
  const step = W / (demoClicks.length - 1);
  const pts = demoClicks.map(
    (c, i) =>
      `${Math.round(i * step * 10) / 10},${Math.round((H - ((c - min) / (max - min)) * (H - 6)) * 10) / 10}`
  );
  const line = pts.join(" ");
  const area = `0,${H} ${line} ${W},${H}`;
  return (
    <MockCard>
      <div className="flex items-baseline justify-between gap-2">
        <MockTitle>{clicksKpi.label}</MockTitle>
        <span className="text-[10px] text-ink-soft">{demoWorkspace.period}</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="mt-2 block h-16 w-full @lg:h-20"
      >
        {[0.33, 0.66].map((f) => (
          <line
            key={f}
            x1="0"
            x2={W}
            y1={H * f}
            y2={H * f}
            className="stroke-ink/8"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <polygon points={area} className="fill-lavender-soft" />
        <polyline
          points={line}
          fill="none"
          className="stroke-violet"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <MockSource>{demoSource}</MockSource>
    </MockCard>
  );
}

function PriorityPages({ limit }: { limit?: number }) {
  const max = Math.max(...demoPriorityPages.map((p) => p.clicks));
  const pages = demoPriorityPages.slice(0, limit);
  return (
    <MockCard>
      <MockTitle>Priority pages</MockTitle>
      <ul className="mt-2 space-y-2">
        {pages.map((p) => (
          <li
            key={p.path}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1 @sm:grid-cols-[6.5rem_minmax(0,1fr)_auto]"
          >
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold">{p.title}</p>
              <p className="truncate font-mono text-[9px] text-ink-soft/80">
                {p.path}
              </p>
            </div>
            <div className="col-span-2 row-start-2 h-1.5 rounded-full bg-lavender-soft @sm:col-span-1 @sm:row-start-auto">
              <div
                className="h-full rounded-full bg-violet"
                style={{ width: `${Math.round((p.clicks / max) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span className="w-8 text-right text-[10px] font-semibold tabular-nums">
                {p.clicks.toLocaleString("en-US")}
              </span>
              <DeltaPill delta={p.delta} good={p.good} />
              <span className="w-7 text-right text-[10px] tabular-nums text-ink-soft">
                {p.position}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}

/** Progress ring: tracked keywords in the top 10, violet arc on a lavender track */
export function Top10Ring({
  small = false,
  className = "",
}: {
  /** Drop the "of N" line and shrink the number, for small rings */
  small?: boolean;
  className?: string;
}) {
  const pct = Math.round((demoTop10.inTop10 / demoTop10.active) * 100);
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="block size-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          className="stroke-lavender-soft"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          className="stroke-violet"
          strokeWidth="10"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${pct} 100`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-none">
          <span
            className={`font-display font-bold tracking-[-0.02em] ${small ? "text-base" : "text-2xl"}`}
          >
            {demoTop10.inTop10}
          </span>
          {!small && (
            <span className="block text-[9px] text-ink-soft">
              of {demoTop10.active}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const severityTone: Record<DemoFinding["severity"], "blush" | "lavender" | "white"> = {
  High: "blush",
  Medium: "lavender",
  Low: "white",
};

function Findings() {
  return (
    <MockCard>
      <MockTitle>What to fix next</MockTitle>
      <ul className="mt-2 divide-y divide-ink/8">
        {demoFindings.map((f) => (
          <li key={f.title} className="flex items-start gap-2 py-2 first:pt-0 last:pb-0">
            <span className="w-14 shrink-0">
              <Chip tone={severityTone[f.severity]}>{f.severity}</Chip>
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold">{f.title}</p>
              <p className="text-[10px] text-ink-soft">{f.action}</p>
            </div>
          </li>
        ))}
      </ul>
    </MockCard>
  );
}
