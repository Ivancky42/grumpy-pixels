import type { ComponentType } from "react";
import type { ServiceSlug } from "@/lib/services";
import { SoftwareHero } from "./software";
import { SeoHero, SeoShowcase } from "./seo";
import { ConsultancyHero, ConsultancyShowcase } from "./consultancy";

export type ServiceVisuals = {
  /** Right-hand column of the service hero (stacks below the copy under lg) */
  Hero: ComponentType;
  /** Optional full-width section rendered after the proof points */
  Showcase?: ComponentType;
};

/** Which illustrations each /services/[service] page renders. */
export const serviceVisuals: Record<ServiceSlug, ServiceVisuals> = {
  "software-development": { Hero: SoftwareHero },
  seo: { Hero: SeoHero, Showcase: SeoShowcase },
  consultancy: { Hero: ConsultancyHero, Showcase: ConsultancyShowcase },
};
