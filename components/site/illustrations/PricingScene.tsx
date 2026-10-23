import { IsoBox, IsoFace, IsoGround, IsoScene, IsoShadow } from "@/components/site/iso/Iso";
import { iso, pathD, points, riseDelay, type IsoTone, type Vec3 } from "@/lib/iso";
import { tiers } from "@/lib/pricing";

/** Ground plate size in iso units */
const PLATE: [number, number] = [10.5, 13.5];
/** Step width along x, tread depth along y and riser height */
const STEP_W = 4.5;
const TREAD = 3.8;
const RISE = 1.6;
const X0 = 2.5;
/** Front edge of the bottom step (largest y) */
const FRONT = 12.4;
const TONES: IsoTone[] = ["paper", "lavender", "violet"];

/**
 * One step per website tier, climbing away from the viewer (up-right on
 * screen). Each step is a slab stacked on the one below and running to the
 * shared back edge, so every riser sits flush above the tread in front of it.
 */
const steps = tiers.map((tier, i) => ({
  key: tier.slug,
  /** Front edge of this step's tread */
  front: FRONT - i * TREAD,
  z: i * RISE,
  tone: TONES[Math.min(i, TONES.length - 1)],
}));
const BACK = FRONT - steps.length * TREAD;

/** Coin stacks beside each step's tread, one more coin per tier. */
const COIN_R = 0.75;
const COIN_H = 0.35;
const COIN_GAP = 0.08;
const stacks = steps.map((s, i) => ({
  key: s.key,
  cx: X0 + STEP_W + 1.3,
  cy: s.front - TREAD / 2,
  count: i + 2,
}));

/**
 * A short cylinder: bottom ellipse and side band in violet, lavender top. Built
 * from the kit (top-face circles + a side polygon between the ellipse's
 * horizontal extremes), since the kit has no cylinder primitive.
 */
function Coin({ c: [cx, cy, z], highlight }: { c: Vec3; highlight?: boolean }) {
  const k = COIN_R / Math.SQRT2;
  return (
    <>
      <IsoFace face="top" at={[cx, cy, z]}>
        <circle r={COIN_R} className="fill-violet" />
      </IsoFace>
      <polygon
        points={points([cx - k, cy + k, z], [cx + k, cy - k, z], [cx + k, cy - k, z + COIN_H], [cx - k, cy + k, z + COIN_H])}
        className="fill-violet"
      />
      <IsoFace face="top" at={[cx, cy, z + COIN_H]}>
        <circle r={COIN_R} className={highlight ? "fill-blush" : "fill-lavender"} />
      </IsoFace>
    </>
  );
}

/**
 * A violet route up the middle of the stairs: along the ground, then up each
 * riser and back across each tread. Returns one segment per face it crosses,
 * with the tone of that face, so the violet riser can get a lavender halo.
 */
function climb(): { d: string; on: IsoTone }[] {
  const x = X0 + STEP_W / 2;
  const segs: { d: string; on: IsoTone }[] = [
    { d: pathD([x, FRONT + 0.9, 0], [x, FRONT, 0]), on: "paper" },
  ];
  steps.forEach((s, i) => {
    const top = s.z + RISE;
    const back = i === steps.length - 1 ? s.front - 1.4 : s.front - TREAD;
    segs.push(
      { d: pathD([x, s.front, s.z], [x, s.front, top]), on: s.tone },
      { d: pathD([x, s.front, top], [x, back, top]), on: "paper" }
    );
  });
  return segs;
}

/** Where the route ends, on the top tread */
const routeEnd = iso([X0 + STEP_W / 2, steps[steps.length - 1].front - 1.4, steps.length * RISE]);

/**
 * Pricing hero: a three-step staircase for the three website tiers (paper →
 * lavender → violet) built from stacked slabs, coin stacks beside the steps
 * and a violet route climbing them. Decorative; `tiers` is used only to count the steps.
 */
export function PricingScene({ className = "" }: { className?: string }) {
  const route = climb();
  const [ex, ey] = routeEnd;

  return (
    <IsoScene viewBox={[400, 300]} origin={[222, 76]} className={className}>
      <g className="rise-in" style={riseDelay(0)}>
        <IsoGround size={PLATE} dots={2} />
        <IsoShadow at={[X0, BACK, 0]} size={[STEP_W, FRONT - BACK]} />
      </g>

      {steps.map((s, i) => (
        <IsoBox
          key={s.key}
          at={[X0, BACK, s.z]}
          size={[STEP_W, s.front - BACK, RISE]}
          tone={s.tone}
          className="rise-in"
          style={riseDelay(140 + i * 140)}
        />
      ))}

      {[...stacks].reverse().map((st, j) => (
        <g key={st.key} className="rise-in" style={riseDelay(560 + j * 100)}>
          {Array.from({ length: st.count }, (_, n) => (
            <Coin
              key={n}
              c={[st.cx, st.cy, n * (COIN_H + COIN_GAP)]}
              highlight={j === 0 && n === st.count - 1}
            />
          ))}
        </g>
      ))}

      <g className="rise-in" style={riseDelay(800)}>
        {route.map(({ d, on }) => (
          <g key={d}>
            {/* Violet on the violet riser needs a thin halo in that tone's top colour */}
            {on === "violet" && (
              <path d={d} fill="none" strokeWidth={6} strokeLinecap="round" className="stroke-lavender" />
            )}
            <path
              d={d}
              fill="none"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-violet"
            />
          </g>
        ))}
        <circle cx={ex} cy={ey} r={5} className="fill-violet" />
      </g>
    </IsoScene>
  );
}
