import { demoReport as report, demoWorkspace as ws } from "@/lib/seo-demo";
import { Chip, Initials } from "./MockFrame";

/** Screen-reader summary of the report mockup */
export const reportSummary = `Example monthly SEO report for a fictional clinic, ${ws.name}: ${report.title}. ${report.subtitle} Status: ${report.status}. ${report.headline}. ${report.summary}`;

/**
 * The monthly report deck in Grumpy Pixels SEO with example data: the cover
 * slide, with the summary slide stacked beneath it.
 */
export function ReportMock() {
  return (
    <div className="space-y-2.5">
      {/* Cover slide */}
      <div className="overflow-hidden rounded-xl border border-ink/8 bg-white">
        <div className="flex aspect-[16/8] flex-col justify-between bg-linear-to-br from-lavender-soft via-lavender-soft to-lavender/45 p-4 @md:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-violet">
              {report.eyebrow}
            </p>
            <div className="flex items-center gap-1.5">
              <Initials className="size-5 text-[8px]" />
              <span className="text-[10px] font-semibold">{ws.name}</span>
            </div>
          </div>
          <div>
            <p className="font-display text-lg font-bold leading-tight tracking-[-0.02em] @md:text-2xl">
              {report.title}
            </p>
            <p className="mt-1 text-[11px] text-ink-soft">{report.subtitle}</p>
            <div className="mt-2.5">
              <Chip tone="white">
                <span>↑</span>
                {report.status}
              </Chip>
            </div>
          </div>
        </div>
        <SlideFooter page={`1 / ${report.slideCount}`} />
      </div>

      {/* Summary slide, next in the deck */}
      <div className="ml-4 overflow-hidden rounded-xl border border-ink/8 bg-white @md:ml-8">
        <div className="p-4">
          <p className="font-display text-sm font-bold leading-snug tracking-[-0.01em]">
            {report.headline}
          </p>
          <p className="mt-1.5 text-[10px] text-ink-soft">{report.summary}</p>
        </div>
        <SlideFooter page={`2 / ${report.slideCount}`} />
      </div>
    </div>
  );
}

function SlideFooter({ page }: { page: string }) {
  return (
    <div className="flex items-center justify-between border-t border-ink/8 px-4 py-1.5 font-mono text-[9px] uppercase tracking-wide text-ink-soft/80">
      <span>
        {report.preparedBy} · {ws.period}
      </span>
      <span>{page}</span>
    </div>
  );
}
