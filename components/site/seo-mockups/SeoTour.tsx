import type { ComponentType } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { IsoBox, IsoGround, IsoScene } from "@/components/site/iso/Iso";
import { riseDelay, type IsoTone } from "@/lib/iso";
import { demoDisclaimer, seoTour, type SeoTourItem } from "@/lib/seo-demo";
import { site } from "@/lib/site";
import { MockFrame } from "./MockFrame";
import { OverviewMock, overviewSummary } from "./OverviewMock";
import { RecommendationMock, recommendationSummary } from "./RecommendationMock";
import { ReportMock, reportSummary } from "./ReportMock";

const mocks: Record<
  SeoTourItem["mock"],
  {
    Mock: ComponentType;
    summary: string;
    active: "Overview" | "Recommendations" | "Reports";
    slab: IsoTone;
  }
> = {
  overview: { Mock: OverviewMock, summary: overviewSummary, active: "Overview", slab: "lavender" },
  recommendation: {
    Mock: RecommendationMock,
    summary: recommendationSummary,
    active: "Recommendations",
    slab: "paper",
  },
  report: { Mock: ReportMock, summary: reportSummary, active: "Reports", slab: "lavender" },
};

/**
 * Three-screen product tour of Grumpy Pixels SEO: copy on one side, a coded
 * mockup (example data from lib/seo-demo.ts) on an isometric plinth on the other.
 */
export function SeoTour() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="The platform" title={site.seoPlatform.name} />
        <p className="mt-4 text-sm text-ink-soft">{demoDisclaimer}</p>

        <div className="mt-12 space-y-20 sm:mt-16 sm:space-y-28">
          {seoTour.map((item, i) => {
            const { Mock, summary, active, slab } = mocks[item.mock];
            return (
              <div
                key={item.mock}
                className={`grid items-center gap-10 lg:gap-16 ${
                  i % 2 === 1
                    ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
                    : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                }`}
              >
                <div className={i % 2 === 1 ? "lg:order-last" : ""}>
                  <Eyebrow>{item.eyebrow}</Eyebrow>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-ink-soft">{item.body}</p>
                </div>
                <div>
                  <p className="sr-only">{summary}</p>
                  <Reveal className="relative mx-auto max-w-xl pb-[22%] lg:max-w-none">
                    <Plinth tone={slab} />
                    <div aria-hidden="true" className="rise-in relative sm:mx-auto sm:w-[88%]" style={riseDelay(240)}>
                      <MockFrame active={active}>
                        <Mock />
                      </MockFrame>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** Decorative isometric plinth the mockup window stands on */
function Plinth({ tone }: { tone: IsoTone }) {
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
      <IsoScene viewBox={[460, 290]} origin={[230, 16]}>
        <IsoGround size={[16, 16]} dots={2} className="rise-in" style={riseDelay(0)} />
        <IsoBox at={[2, 2, 0]} size={[12, 12, 1.25]} tone={tone} className="rise-in" style={riseDelay(80)} />
        {/* Small blocks at the plate's corners, visible beside the window */}
        <IsoBox at={[14.1, 0.6, 0]} size={[1.6, 1.6, 2.5]} tone="violet" className="rise-in" style={riseDelay(160)} />
        <IsoBox at={[0.6, 14.1, 0]} size={[1.6, 1.6, 1.5]} tone="lavender" className="rise-in" style={riseDelay(200)} />
        <IsoBox at={[14.4, 14.4, 0]} size={[1.2, 1.2, 0.8]} tone="blush" className="rise-in" style={riseDelay(240)} />
      </IsoScene>
    </div>
  );
}
