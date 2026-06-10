import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mascot } from "@/components/site/Mascot";
import { SpeechBubble } from "@/components/site/SpeechBubble";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="flex flex-col items-center text-center">
        <SpeechBubble>A 404. Great.</SpeechBubble>
        <Mascot size={220} className="mt-3" />
        <h1 className="mt-8 font-display text-4xl font-semibold">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-navy-soft">
          This page doesn&apos;t exist — which, frankly, annoys us more than it
          annoys you.
        </p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
