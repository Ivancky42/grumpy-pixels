export type ProcessStep = { title: string; description: string };

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lavender-soft font-display text-lg font-bold text-violet">
            {i + 1}
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-ink">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-ink-soft">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
