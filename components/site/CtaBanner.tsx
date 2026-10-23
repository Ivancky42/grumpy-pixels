import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IsoBox, IsoFace, IsoScene, IsoShadow, IsoTile } from "@/components/site/iso/Iso";
import { Reveal } from "@/components/site/Reveal";
import { ISO_TILE_H, pathD, riseDelay } from "@/lib/iso";
import { mailtoWithSubject, site, whatsappLink } from "@/lib/site";

type Props = {
  title?: string;
  copy?: string;
  /** Subject line pre-filled in the email CTA */
  emailSubject?: string;
  whatsappMessage?: string;
};

/** Envelope slabs stacked on the plate, bottom to top. */
const ENVELOPES = [0, 1, 2];

/**
 * Decorative cluster for the ink panel: a stack of envelopes with a route to a
 * mailbox and one letter on its way. Sits in the panel's free right-hand space;
 * bottom-right beside the buttons at md, vertically centred from lg.
 */
function MailCluster() {
  return (
    <IsoScene viewBox={[240, 140]} origin={[106, 20]}>
      <IsoTile at={[0, 0, 0]} size={[8, 6]} tone="ink" />
      {/* route from the stack to the mailbox */}
      <g className="rise-in" style={riseDelay(80)}>
        <path
          d={pathD([3.6, 3.4, ISO_TILE_H], [6.6, 3.4, ISO_TILE_H], [6.6, 2.6, ISO_TILE_H])}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1 7"
          className="stroke-lavender"
        />
      </g>
      {/* mailbox */}
      <g className="rise-in" style={riseDelay(200)}>
        <IsoShadow at={[5.6, 0.8, ISO_TILE_H]} size={[1.8, 1.8]} />
        <IsoBox at={[5.6, 0.8, ISO_TILE_H]} size={[1.8, 1.8, 2.6]} tone="violet" />
        <IsoFace face="left" at={[5.6, 2.6, ISO_TILE_H + 2.6]}>
          <rect x={0.4} y={0.6} width={1} height={0.22} rx={0.11} className="fill-ink/70" />
        </IsoFace>
      </g>
      {/* envelope stack */}
      {ENVELOPES.map((i) => (
        <g key={i} className="rise-in" style={riseDelay(320 + i * 110)}>
          {i === 0 && <IsoShadow at={[1, 2.6, ISO_TILE_H]} size={[2.6, 1.8]} />}
          <IsoBox
            at={[1, 2.6, ISO_TILE_H + i * 0.4]}
            size={[2.6, 1.8, 0.3]}
            tone={i === ENVELOPES.length - 1 ? "violet" : "lavender"}
          >
            {i === ENVELOPES.length - 1 && (
              <path
                d="M0.2 0.2 L1.3 0.95 L2.4 0.2"
                fill="none"
                strokeWidth={0.14}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-violet"
              />
            )}
          </IsoBox>
        </g>
      ))}
      {/* a letter on its way */}
      <g className="rise-in" style={riseDelay(700)}>
        <IsoBox at={[3.4, 0.4, 2.6]} size={[1.8, 1.2, 0.2]} tone="lavender" />
      </g>
    </IsoScene>
  );
}

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
          <Reveal className="pointer-events-none absolute right-6 bottom-3 hidden w-44 md:block lg:top-1/2 lg:right-6 lg:bottom-auto lg:w-52 lg:-translate-y-1/2 xl:right-12 xl:w-72">
            <MailCluster />
          </Reveal>
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
