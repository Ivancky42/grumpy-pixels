const steps = [
  {
    title: "Discover",
    description:
      "We learn your business, your customers, and what your website needs to achieve.",
  },
  {
    title: "Design",
    description:
      "We design every screen — mobile first — until it looks right and reads right.",
  },
  {
    title: "Build",
    description:
      "We build it fast and fussy: clean code, quick loads, SEO baked in.",
  },
  {
    title: "Launch",
    description:
      "We launch, measure, and keep complaining about the details until they're perfect.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple font-display text-lg font-semibold text-white">
            {i + 1}
          </span>
          <h3 className="mt-4 font-display text-xl font-semibold">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-navy-soft">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
