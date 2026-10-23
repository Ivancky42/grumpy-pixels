import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ConsultancyScene } from "@/components/site/illustrations/ConsultancyScene";
import { EfficiencyLoop } from "@/components/site/illustrations/EfficiencyLoop";
import { IsoBox, IsoFace, IsoGround, IsoScene, IsoShadow } from "@/components/site/iso/Iso";
import { Reveal } from "@/components/site/Reveal";
import { iso, pathD, riseDelay, type IsoTone, type Vec3 } from "@/lib/iso";
import { getService } from "@/lib/services";

/** Consultancy hero visual. */
export function ConsultancyHero() {
  return <ConsultancyScene />;
}

/** Clock block at the back right: [x, y, z] and [w, d, h] in iso units. */
const CLOCK: { at: Vec3; size: Vec3 } = { at: [5, 1, 0], size: [3, 3, 3.2] };
/** Clock hands on the front face: [x, y, width, height] around the face centre. */
const HANDS: [number, number, number, number][] = [
  [1.42, 0.85, 0.16, 0.8],
  [1.42, 1.49, 0.75, 0.16],
];

/** "Hours" slabs along the front, shrinking from tall to short; the last is blush. */
const SLAB = 1.3;
const SLAB_Y = 5.5;
const slabs: { x: number; h: number; tone: IsoTone }[] = [
  { x: 0.8, h: 3.4, tone: "violet" },
  { x: 2.6, h: 2.4, tone: "lavender" },
  { x: 4.4, h: 1.5, tone: "lavender" },
  { x: 6.2, h: 0.7, tone: "blush" },
];
const slabTops: Vec3[] = slabs.map(({ x, h }) => [x + SLAB / 2, SLAB_Y + SLAB / 2, h]);

/**
 * Decorative accent beside the before/after card: a clock block and a row of
 * hour slabs stepping down from tall to short. aria-hidden.
 */
function HoursAccent() {
  const [cx, cy, cz] = CLOCK.at;
  const [cw, cd, ch] = CLOCK.size;
  return (
    <IsoScene viewBox={[270, 175]} origin={[135, 12]}>
      <IsoGround size={[9, 9]} dots={2} className="rise-in" style={riseDelay(0)} />

      <g className="rise-in" style={riseDelay(120)}>
        <IsoShadow at={CLOCK.at} size={[cw, cd]} />
        <IsoBox at={CLOCK.at} size={CLOCK.size} tone="violet" />
        <IsoFace face="left" at={[cx, cy + cd, cz + ch]}>
          <circle cx={1.5} cy={1.6} r={1.1} className="fill-white" />
          {HANDS.map(([x, y, w, h]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={0.08} className="fill-violet" />
          ))}
        </IsoFace>
      </g>

      {slabs.map(({ x, h, tone }, i) => (
        <g key={x} className="rise-in" style={riseDelay(240 + i * 100)}>
          <IsoShadow at={[x, SLAB_Y, 0]} size={[SLAB, SLAB]} />
          <IsoBox at={[x, SLAB_Y, 0]} size={[SLAB, SLAB, h]} tone={tone} />
        </g>
      ))}

      <g className="rise-in" style={riseDelay(700)}>
        <path
          d={pathD(...slabTops)}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-violet"
        />
        {slabTops.map((p) => {
          const [x, y] = iso(p);
          return <circle key={p.join()} cx={x} cy={y} r={3.5} className="fill-violet" />;
        })}
      </g>
    </IsoScene>
  );
}

/** Consultancy showcase: the before/after hours card beside a decorative accent. */
export function ConsultancyShowcase() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works in practice"
          title={getService("consultancy")!.navDescription}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
          <div className="max-w-3xl lg:max-w-none">
            <EfficiencyLoop />
          </div>
          <Reveal className="hidden lg:block">
            <HoursAccent />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
