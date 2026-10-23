import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PillarCard } from "@/components/site/PillarCard";
import { homeCopy, services } from "@/lib/services";

/** The three service pillars as whole-card links to their service pages. */
export function PillarCards() {
  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={homeCopy.pillarsEyebrow}
          title={homeCopy.pillarsTitle}
          lede={homeCopy.pillarsLede}
        />
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.slug} className="flex">
              <PillarCard service={service} index={i} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
