import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mascot } from "@/components/site/Mascot";
import { SpeechBubble } from "@/components/site/SpeechBubble";

export function Hero() {
  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-purple">
              Web studio · Malaysia
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              We build websites.{" "}
              <span className="text-purple-deep">
                Then we complain about them until they&apos;re great.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-soft">
              Grumpy Pixels is a web design and development studio in Malaysia.
              We create fast, beautiful, SEO-friendly websites for growing
              businesses — and we sweat the details so you don&apos;t have to.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/#contact">Let&apos;s work together</Button>
              <Button href="/work" variant="secondary">
                View our work
              </Button>
            </div>
          </div>
          <div className="mx-auto flex flex-col items-center gap-3 lg:mx-0 lg:items-end">
            <SpeechBubble className="lg:-mr-2">
              That spacing isn&apos;t 24px...
            </SpeechBubble>
            <Mascot size={360} priority className="drop-shadow-sm" />
          </div>
        </div>
      </Container>
    </section>
  );
}
