import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  items: { question: string; answer: string }[];
  title?: string;
  eyebrow?: string;
};

/** FAQ accordion section. Structured data is emitted by the page, not here. */
export function ServiceFaq({
  items,
  title = "Common questions",
  eyebrow = "FAQ",
}: Props) {
  if (items.length === 0) return null;
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-8 max-w-3xl space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-ink/8 bg-white p-5 shadow-soft"
            >
              <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    className="text-violet transition-transform group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-ink-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
