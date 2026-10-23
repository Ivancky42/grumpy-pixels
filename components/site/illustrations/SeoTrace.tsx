"use client";

import { Eyebrow } from "@/components/ui/SectionHeading";
import { useInView } from "@/lib/use-in-view";
import { demoDisclaimer, demoTrace } from "@/lib/seo-demo";

const { nodes, summary } = demoTrace;

const STEP_MS = 220;

/**
 * A traced SEO change: finding → recommendation → change → result.
 * Nodes and connectors reveal once, in sequence, when the card scrolls into
 * view. The card lays out left→right only when it is wide enough (container
 * query), otherwise it stacks vertically.
 */
export function SeoTrace() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  const nodeCls = `transition-[opacity,translate] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
    inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
  }`;
  const connectorBase =
    "transition-transform duration-400 ease-out motion-reduce:transition-none";

  return (
    <figure>
      <div
        ref={ref}
        className="@container rounded-3xl border border-ink/8 bg-white p-6 shadow-soft sm:p-8"
      >
        <p className="sr-only">{summary}</p>
        <div aria-hidden className="flex flex-col @3xl:flex-row">
          {nodes.map((node, i) => {
            const last = i === nodes.length - 1;
            return (
              <div key={node.label} className="contents">
                <div
                  style={{ transitionDelay: `${i * 2 * STEP_MS}ms` }}
                  className={`rounded-2xl border border-ink/8 p-4 @3xl:min-w-0 @3xl:flex-1 ${
                    last ? "bg-lavender-soft" : "bg-white"
                  } ${nodeCls}`}
                >
                  <Eyebrow>{node.label}</Eyebrow>
                  <p className="mt-2 text-sm text-ink">{node.body}</p>
                  {"approval" in node && (
                    <p className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
                      <span>Awaiting approval</span>
                      <span className="text-ink/30">→</span>
                      <span className="rounded-full bg-lavender-soft px-2 py-0.5 font-semibold text-violet">
                        Approved
                      </span>
                      <span>by client</span>
                    </p>
                  )}
                </div>
                {!last && (
                  <>
                    {/* Vertical connector (narrow card) */}
                    <div className="ml-6 flex h-9 flex-col items-start @3xl:hidden">
                      <div
                        style={{ transitionDelay: `${(i * 2 + 1) * STEP_MS}ms` }}
                        className={`flex h-full origin-top flex-col items-center ${connectorBase} motion-reduce:scale-y-100 ${
                          inView ? "scale-y-100" : "scale-y-0"
                        }`}
                      >
                        <span className="w-[3px] flex-1 rounded-full bg-violet" />
                        <span className="size-2 rounded-full bg-violet" />
                      </div>
                    </div>
                    {/* Horizontal connector (wide card) */}
                    <div className="hidden w-8 shrink-0 items-center px-1 @3xl:flex">
                      <div
                        style={{ transitionDelay: `${(i * 2 + 1) * STEP_MS}ms` }}
                        className={`flex w-full origin-left items-center ${connectorBase} motion-reduce:scale-x-100 ${
                          inView ? "scale-x-100" : "scale-x-0"
                        }`}
                      >
                        <span className="h-[3px] flex-1 rounded-full bg-violet" />
                        <span className="size-2 shrink-0 rounded-full bg-violet" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-4 max-w-2xl text-sm text-ink-soft">
        {demoDisclaimer} Every change on Grumpy Pixels SEO is traced from the
        finding that prompted it to the result it produced.
      </figcaption>
    </figure>
  );
}
