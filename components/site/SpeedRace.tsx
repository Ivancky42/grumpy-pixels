"use client";

import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { prefersReducedMotion } from "@/lib/motion";
import { useInView } from "@/lib/use-in-view";

const FINISH_SECONDS = 3.2;

const racers = [
  {
    label: "Average business website",
    time: 3.2,
    bar: "bg-ink/35",
    doneNote: "visitors already gone",
  },
  {
    label: "A Grumpy Pixels website",
    time: 0.8,
    bar: "bg-violet",
    doneNote: "loaded",
  },
];

export function SpeedRace() {
  const [started, setStarted] = useState(false);
  const [runId, setRunId] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [ref] = useInView<HTMLDivElement>({
    threshold: 0.4,
    onEnter: () => {
      // Reduced motion: show the finished race instead of animating it.
      if (prefersReducedMotion()) setElapsed(FINISH_SECONDS);
      else setStarted(true);
    },
  });

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = (now - startTime) / 1000;
      setElapsed(Math.min(t, FINISH_SECONDS));
      if (t < FINISH_SECONDS) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, runId]);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-ink/8 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <Eyebrow>The 3-second test</Eyebrow>
        <button
          type="button"
          onClick={() => {
            if (prefersReducedMotion()) {
              setElapsed(FINISH_SECONDS);
              return;
            }
            setElapsed(0);
            setStarted(true);
            setRunId((id) => id + 1);
          }}
          className="rounded-full border border-ink/10 px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-violet hover:text-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet motion-reduce:transition-none"
        >
          Replay
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {racers.map((racer) => {
          const progress = Math.min(elapsed / racer.time, 1);
          const done = progress >= 1;
          return (
            <div key={racer.label}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-ink">{racer.label}</p>
                <p className="text-sm tabular-nums text-ink-soft">
                  {Math.min(elapsed, racer.time).toFixed(1)}s
                  {done && (
                    <span
                      className={
                        racer.time <= 1
                          ? "ml-2 font-semibold text-violet"
                          : "ml-2"
                      }
                    >
                      — {racer.doneNote}
                    </span>
                  )}
                </p>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink/8">
                <div
                  className={`h-full rounded-full ${racer.bar}`}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-ink-soft">
        Visitors start leaving at 3 seconds. We&apos;re done before they blink
        twice.
      </p>
    </div>
  );
}
