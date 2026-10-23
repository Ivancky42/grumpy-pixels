import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/site/Logo";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col items-center text-center">
        <Logo variant="symbol" className="h-16 w-16" title="" />
        <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-md text-lg text-ink-soft">
          This page doesn&apos;t exist — which, frankly, annoys us more than it
          annoys you.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/services" variant="secondary">
            See our services
          </Button>
        </div>
      </Container>
    </section>
  );
}
