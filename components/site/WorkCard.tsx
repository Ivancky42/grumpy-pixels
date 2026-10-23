import { Badge } from "@/components/ui/Badge";
import { ProjectScene } from "@/components/site/illustrations/ProjectScene";
import { Reveal } from "@/components/site/Reveal";
import type { Project } from "@/lib/work";

export function WorkCard({ project }: { project: Project }) {
  return (
    <article className="rounded-3xl border border-ink/8 bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-6 rounded-2xl bg-lavender-soft/60 px-4 py-4 sm:px-6">
        <Reveal>
          <ProjectScene scene={project.scene} />
        </Reveal>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.02em]">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-ink-soft">
        {project.subtitle}
      </p>
      <p className="mt-4 text-sm text-ink-soft">{project.outcome}</p>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-violet underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
      >
        {project.displayUrl} ↗
      </a>
    </article>
  );
}
