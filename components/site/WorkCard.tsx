import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/work";

export function WorkCard({ project }: { project: Project }) {
	return (
		<article className="group overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-soft transition-shadow hover:shadow-lift">
			<a href={project.url} target="_blank" rel="noopener noreferrer">
				<div className="relative aspect-16/10 overflow-hidden bg-lavender-soft">
					<Image
						src={project.image}
						alt={project.imageAlt}
						fill
						sizes="(min-width: 1024px) 540px, 100vw"
						className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
					/>
				</div>
			</a>
			<div className="p-6 sm:p-8">
				<div className="flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<Badge key={tag}>{tag}</Badge>
					))}
				</div>
				<h3 className="mt-4 font-display text-2xl font-semibold">
					{project.title}
				</h3>
				<p className="mt-1 text-sm text-navy-soft">
					{project.subtitle}
				</p>
				<p className="mt-4 text-sm text-navy-soft">{project.outcome}</p>
				<a
					href={project.url}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-4 inline-block text-sm font-semibold text-purple-deep underline-offset-4 hover:underline"
				>
					{project.displayUrl} ↗
				</a>
			</div>
		</article>
	);
}
