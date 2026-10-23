import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mailtoWithSubject, site, whatsappLink } from "@/lib/site";

type Props = {
  title?: string;
  copy?: string;
  /** Subject line pre-filled in the email CTA */
  emailSubject?: string;
  whatsappMessage?: string;
};

/** Violet focus rings fall below 3:1 on ink, so buttons here ring in cream. */
const onInkFocus = "focus-visible:outline-cream!";

export function CtaBanner({
  title = "Have a project in mind?",
  copy = "Tell us what you're building. We'll reply within one working day — usually with opinions.",
  emailSubject = "Project enquiry",
  whatsappMessage = "Hi Grumpy Pixels! I'd like to talk about a project.",
}: Props) {
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 sm:px-12 sm:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-cream sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-cream/80">{copy}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {site.whatsappEnabled && (
                <Button href={whatsappLink(whatsappMessage)} className={onInkFocus}>
                  WhatsApp us
                </Button>
              )}
              <Button
                href={mailtoWithSubject(emailSubject)}
                variant={site.whatsappEnabled ? "secondary" : "primary"}
                className={`${onInkFocus} ${
                  site.whatsappEnabled ? "border-transparent" : ""
                }`}
              >
                {site.email}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
