import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Mascot } from "@/components/site/Mascot";
import { SpeechBubble } from "@/components/site/SpeechBubble";
import { mailtoLink, site, whatsappLink } from "@/lib/site";

type Props = {
  title?: string;
  copy?: string;
  quip?: string;
  whatsappMessage?: string;
};

export function CtaBanner({
  title = "Have a project in mind?",
  copy = "Tell us what you're building. We'll reply within one working day — usually with opinions.",
  quip = "Finally.",
  whatsappMessage = "Hi Grumpy Pixels! I'd like to talk about a website project.",
}: Props) {
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 sm:px-12 sm:py-16">
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-between">
            <div className="max-w-xl text-center sm:text-left">
              <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">
                {title}
              </h2>
              <p className="mt-4 text-lg text-lavender">{copy}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={whatsappLink(whatsappMessage)}>
                  WhatsApp us
                </Button>
                <Button
                  href={mailtoLink}
                  variant="secondary"
                  className="border-transparent"
                >
                  {site.email}
                </Button>
              </div>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-3">
              <SpeechBubble>{quip}</SpeechBubble>
              <Mascot variant="approving" size={180} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
