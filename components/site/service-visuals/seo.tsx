import { SeoTrace } from "@/components/site/illustrations/SeoTrace";
import { Container } from "@/components/ui/Container";
import { Chip, DeltaPill, MockFrame } from "@/components/site/seo-mockups/MockFrame";
import {
  OverviewMock,
  overviewSummary,
  Top10Ring,
} from "@/components/site/seo-mockups/OverviewMock";
import { SeoTour } from "@/components/site/seo-mockups/SeoTour";
import { riseDelay } from "@/lib/iso";
import {
  demoDisclaimer,
  demoKpis,
  demoRecommendation as rec,
  demoTop10,
} from "@/lib/seo-demo";

const approved = rec.steps[1];

/**
 * SEO page hero visual: the Overview screen of Grumpy Pixels SEO with example
 * data, tilted in perspective from lg, with two floating cards (a recommendation
 * approved by the client, the top-10 ring). Animates on load (above the fold).
 */
export function SeoHero() {
  return (
    <figure className="mx-auto w-full max-w-xl lg:max-w-none">
      <p className="sr-only">
        {overviewSummary} Recommendation “{rec.title}”: {approved.label.toLowerCase()} on{" "}
        {approved.date}.
      </p>
      <div aria-hidden="true" className="relative pb-12 pt-10 sm:px-8">
        <div className="rise-in" style={riseDelay(0)}>
          <div className="lg:[transform:perspective(1800px)_rotateY(-12deg)_rotateX(4deg)]">
            <MockFrame>
              <OverviewMock compact />
            </MockFrame>
          </div>
        </div>

        {/* Floating card, lower left: a recommendation the client approved */}
        <div
          className="rise-in absolute bottom-0 left-0 w-52 rounded-2xl border border-ink/8 bg-white p-3 text-ink shadow-lift"
          style={riseDelay(450)}
        >
          <p className="text-[10px] text-ink-soft">{rec.category}</p>
          <p className="mt-1 text-[11px] font-semibold leading-snug">{rec.title}</p>
          <div className="mt-2">
            <Chip>
              <span>✓</span>
              {approved.label}
            </Chip>
          </div>
        </div>

        {/* Floating card, upper right: top-10 keywords ring */}
        <div
          className="rise-in absolute right-0 top-0 flex items-center gap-2.5 rounded-2xl border border-ink/8 bg-white p-3 text-ink shadow-lift"
          style={riseDelay(600)}
        >
          <Top10Ring small className="size-14" />
          <div>
            <p className="text-[11px] font-semibold">{demoKpis[3].label}</p>
            <div className="mt-1">
              <DeltaPill delta={demoTop10.change} good />
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-ink-soft">{demoDisclaimer}</figcaption>
    </figure>
  );
}

/** SEO page showcase: the product tour, then the traced-change diagram. */
export function SeoShowcase() {
  return (
    <>
      <SeoTour />
      <section className="py-16 sm:py-24">
        <Container>
          {/* SeoTrace reveals itself on scroll (useInView), so no <Reveal> */}
          <SeoTrace />
        </Container>
      </section>
    </>
  );
}
