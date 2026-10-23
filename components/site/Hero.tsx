import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { BrowMark } from "@/components/site/illustrations/BrowMark";
import { homeCopy } from "@/lib/services";

export function Hero() {
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Eyebrow className="mb-5">{homeCopy.eyebrow}</Eyebrow>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              {homeCopy.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-soft">
              {homeCopy.lede}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={homeCopy.primaryCta.href}>
                {homeCopy.primaryCta.label}
              </Button>
              <Button href={homeCopy.secondaryCta.href} variant="secondary">
                {homeCopy.secondaryCta.label}
              </Button>
            </div>
            <p className="mt-6 text-sm text-ink-soft">{homeCopy.aside}</p>
          </div>
          <div className="flex items-center justify-center py-4 lg:py-12">
            <BrowMark className="w-48 sm:w-64 lg:w-80" />
          </div>
        </div>
      </Container>
    </section>
  );
}
