import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { CtaBanner } from "@/components/site/CtaBanner";
import { JsonLd } from "@/components/site/JsonLd";
import { projects } from "@/lib/work";
import { site } from "@/lib/site";

export const metadata: Metadata = {
	title: "Our Work — Website Design & Development Projects",
	description:
		"Recent web design and development projects by Grumpy Pixels, a Malaysian web studio: association websites, agency sites and more. Fast, SEO-friendly, built to convert.",
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
				<Container>
					<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple">
						Our work
					</p>
					<h1 className="max-w-2xl font-display text-4xl font-semibold sm:text-5xl">
						Work we&apos;re (almost) happy with
					</h1>
					<p className="mt-5 max-w-2xl text-lg text-navy-soft">
						A selection of recent projects. We focus on outcomes:
						faster sites, better rankings, more enquiries.
					</p>
				</Container>
			</section>

			<section className="pb-8">
				<Container className="space-y-16">
					{projects.map((project, i) => (
						<article
							key={project.slug}
							className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
						>
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`group block ${i % 2 === 1 ? "lg:order-2" : ""}`}
							>
								<div className="relative aspect-16/10 overflow-hidden rounded-3xl border border-navy/8 bg-lavender-soft shadow-soft transition-shadow group-hover:shadow-lift">
									<Image
										src={project.image}
										alt={project.imageAlt}
										fill
										sizes="(min-width: 1024px) 560px, 100vw"
										className="object-cover object-top"
										priority={i === 0}
									/>
								</div>
							</a>
							<div>
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<Badge key={tag}>{tag}</Badge>
									))}
								</div>
								<h2 className="mt-4 font-display text-3xl font-semibold">
									{project.title}
								</h2>
								<p className="mt-1 text-sm text-navy-soft">
									{project.subtitle}
								</p>
								<h3 className="mt-6 text-sm font-semibold uppercase tracking-widest text-purple">
									The brief
								</h3>
								<p className="mt-2 text-navy-soft">
									{project.problem}
								</p>
								<h3 className="mt-5 text-sm font-semibold uppercase tracking-widest text-purple">
									What we delivered
								</h3>
								<p className="mt-2 text-navy-soft">
									{project.outcome}
								</p>
								<a
									href={project.url}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-5 inline-block font-semibold text-purple-deep underline-offset-4 hover:underline"
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
				quip="Not bad, right?"
			/>
		</>
	);
}
