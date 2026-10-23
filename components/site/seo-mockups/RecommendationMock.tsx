import { demoRecommendation as rec } from "@/lib/seo-demo";
import { Chip, MockCard, MockTitle } from "./MockFrame";

const current = rec.steps[rec.steps.length - 1];

/** Screen-reader summary of the recommendation mockup */
export const recommendationSummary = `Example recommendation for a fictional clinic: ${rec.title}. Evidence: ${rec.evidence.join("; ")}. Expected effect: ${rec.expected}. Effort: ${rec.effort}. Status trail: ${rec.steps
  .map((s) => `${s.label} ${s.date}`)
  .join(", ")}; currently ${current.label.toLowerCase()}.`;

/**
 * One recommendation in Grumpy Pixels SEO with example data: evidence, the
 * expected effect, effort, and its status trail from suggestion to result.
 */
export function RecommendationMock() {
  return (
    <MockCard className="p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <Chip>{rec.category}</Chip>
        {/* Approve control in its approved state — a static look-alike */}
        <span className="inline-flex items-center gap-1 rounded-full bg-violet px-2.5 py-1 text-[10px] font-semibold text-white">
          <span>✓</span>
          {rec.steps[1].label}
        </span>
      </div>
      <p className="mt-2.5 font-display text-sm font-bold leading-snug tracking-[-0.01em]">
        {rec.title}
      </p>

      <div className="mt-3">
        <MockTitle>Evidence</MockTitle>
        <ul className="mt-1 space-y-1">
          {rec.evidence.map((e) => (
            <li key={e} className="flex gap-1.5 text-[10px] text-ink-soft">
              <span className="mt-[5px] size-1 shrink-0 rounded-full bg-violet" />
              {e}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-lavender-soft p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
            Expected effect
          </p>
          <p className="mt-0.5 text-[10px] font-semibold">{rec.expected}</p>
        </div>
        <div className="rounded-lg bg-cream p-2">
          <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
            Effort
          </p>
          <p className="mt-0.5 text-[10px] font-semibold">{rec.effort}</p>
        </div>
      </div>

      {/* Status trail; the last step is the current state */}
      <ol className="mt-4 flex">
        {rec.steps.map((s, i) => {
          const last = i === rec.steps.length - 1;
          return (
            <li key={s.label} className="relative flex-1 text-center">
              {i > 0 && (
                <span className="absolute right-1/2 top-[7px] h-0.5 w-full rounded-full bg-violet" />
              )}
              <span
                className={`relative mx-auto grid size-4 place-items-center rounded-full ${
                  last
                    ? "bg-white ring-[3px] ring-inset ring-violet"
                    : "bg-violet"
                }`}
              >
                {last && <span className="size-1.5 rounded-full bg-violet" />}
              </span>
              <p
                className={`mt-1 px-0.5 text-[9px] leading-tight ${
                  last ? "font-semibold text-violet" : "text-ink-soft"
                }`}
              >
                {s.label}
              </p>
              <p className="text-[9px] text-ink-soft/80">{s.date}</p>
            </li>
          );
        })}
      </ol>
    </MockCard>
  );
}
