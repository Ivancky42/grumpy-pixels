import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow, eyebrowClass } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CtaBanner } from "@/components/site/CtaBanner";
import { JsonLd } from "@/components/site/JsonLd";
import { WorkScene } from "@/components/site/illustrations/WorkScene";
import { ProjectScene } from "@/components/site/illustrations/ProjectScene";
import { Reveal } from "@/components/site/Reveal";
import { projects } from "@/lib/work";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Work — Website Design & Development Projects",
  description:
    "Recent web design and development projects by Grumpy Pixels, a Malaysian technology studio. Fast, SEO-friendly websites built to convert.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Grumpy Pixels portfolio",
          itemListElement: projects.map((project, i) => ({
            "@type": "CreativeWork",
            position: i + 1,
            name: project.title,
            url: project.url,
            description: project.outcome,
            creator: { "@type": "Organization", name: site.name },
          })),
        }}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow className="mb-3">
              Our work
            </Eyebrow>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              Work we&apos;re (almost) happy with
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-soft">
              A selection of recent projects. We focus on outcomes:
              faster sites, better rankings, more enquiries.
            </p>
          </div>
          <WorkScene className="mx-auto max-w-md lg:max-w-none" />
        </Container>
      </section>

      <section className="pb-8">
        <Container className="space-y-16">
          {projects.map((project, i) => (
            <article
              key={project.slug}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div
                className={`rounded-3xl px-4 py-6 sm:px-8 sm:py-8 ${i % 2 === 1 ? "bg-blush/35 lg:order-2" : "bg-lavender-soft/60"}`}
              >
                <Reveal>
                  <ProjectScene scene={project.scene} size="feature" />
                </Reveal>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em]">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  {project.subtitle}
                </p>
                <h3 className={`mt-6 ${eyebrowClass} text-violet`}>
                  The brief
                </h3>
                <p className="mt-2 text-ink-soft">
                  {project.problem}
                </p>
                <h3 className={`mt-5 ${eyebrowClass} text-violet`}>
                  What we delivered
                </h3>
                <p className="mt-2 text-ink-soft">
                  {project.outcome}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center rounded-sm font-semibold text-violet underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
                >
                  Visit {project.displayUrl} ↗
                </a>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <CtaBanner
        title="Want results like these?"
        copy="Tell us about your project and we'll show you what's possible."
      />
    </>
  );
}
