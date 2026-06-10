"use client";

import { useEffect, useRef, useState } from "react";

const FINISH_SECONDS = 3.2;

const racers = [
  {
    label: "Average business website",
    time: 3.2,
    bar: "bg-navy/35",
    doneNote: "visitors already gone",
  },
  {
    label: "A Grumpy Pixels website",
    time: 0.8,
    bar: "bg-purple",
    doneNote: "loaded",
  },
];

export function SpeedRace() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [runId, setRunId] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setElapsed(FINISH_SECONDS);
      return;
    }
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
      className="rounded-3xl border border-navy/8 bg-white p-6 shadow-soft sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-purple">
          The 3-second test
        </p>
        <button
          type="button"
          onClick={() => {
            setElapsed(0);
            setRunId((id) => id + 1);
          }}
          className="rounded-full border border-navy/10 px-3 py-1 text-xs font-semibold text-navy-soft transition-colors hover:border-purple hover:text-purple-deep"
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
                <p className="text-sm font-medium text-navy">{racer.label}</p>
                <p className="text-sm tabular-nums text-navy-soft">
                  {Math.min(elapsed, racer.time).toFixed(1)}s
                  {done && (
                    <span
                      className={
                        racer.time <= 1
                          ? "ml-2 font-semibold text-purple-deep"
                          : "ml-2"
                      }
                    >
                      — {racer.doneNote}
                    </span>
                  )}
                </p>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-navy/8">
                <div
                  className={`h-full rounded-full ${racer.bar}`}
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-navy-soft">
        Visitors start leaving at 3 seconds. We&apos;re done before they blink
        twice.
      </p>
    </div>
  );
}
