import { IsoBox, IsoFace, IsoGround, IsoScene, IsoShadow } from "@/components/site/iso/Iso";
import { iso, pathD, riseDelay, type Vec3 } from "@/lib/iso";

/** Ground plate size in iso units */
const PLATE: [number, number] = [13, 13];
/** Floating island footprint and thickness */
const ISLAND: Vec3 = [4, 4, 1.2];

type Pillar = "software" | "seo" | "consultancy";

/** Back to front (ascending x + y). The SEO island floats a little higher. */
const islands: { kind: Pillar; x: number; y: number; z: number }[] = [
  { kind: "seo", x: 7.5, y: 0.5, z: 4.4 },
  { kind: "software", x: 0.5, y: 7.5, z: 3 },
  { kind: "consultancy", x: 8.5, y: 8.5, z: 3 },
];

const bars = [1, 1.8, 2.7];

/** Node centres (u, v) on the consultancy island's top face */
const nodes: [number, number][] = [
  [0.9, 0.9],
  [3.1, 1.5],
  [1.5, 3.1],
];

/** An app window: a violet-framed upright panel with a white screen. */
function AppWindow({ x, y, top }: { x: number; y: number; top: number }) {
  const at: Vec3 = [x + 0.5, y + 1.7, top];
  const [w, d, h]: Vec3 = [3, 0.4, 2.3];
  return (
    <>
      <IsoBox at={at} size={[w, d, h]} tone="violet" />
      <IsoFace face="left" at={[at[0], at[1] + d, at[2] + h]}>
        <rect x={0.15} y={0.4} width={w - 0.3} height={h - 0.55} rx={0.08} className="fill-white" />
        {[0.3, 0.55, 0.8].map((u) => (
          <circle key={u} cx={u} cy={0.2} r={0.07} className="fill-white" />
        ))}
        <rect x={0.35} y={0.65} width={1} height={0.18} rx={0.09} className="fill-violet/40" />
        <rect x={0.35} y={0.98} width={1.6} height={0.14} rx={0.07} className="fill-lavender" />
        <rect x={0.35} y={1.25} width={1.2} height={0.14} rx={0.07} className="fill-lavender" />
        <rect x={0.35} y={1.52} width={1.9} height={0.14} rx={0.07} className="fill-lavender" />
        <rect x={2.1} y={0.65} width={0.5} height={0.5} rx={0.08} className="fill-blush" />
      </IsoFace>
    </>
  );
}

function Symbol({ kind, x, y, top }: { kind: Pillar; x: number; y: number; top: number }) {
  if (kind === "software") return <AppWindow x={x} y={y} top={top} />;
  if (kind === "seo") {
    return (
      <>
        {bars.map((h, i) => (
          <IsoBox
            key={h}
            at={[x + 0.4 + i * 1.15, y + 1.5, top]}
            size={[0.95, 0.95, h]}
            tone={i === bars.length - 1 ? "violet" : "lavender"}
          />
        ))}
      </>
    );
  }
  return (
    <>
      <path
        d={pathD(...[...nodes, nodes[0]].map(([u, v]): Vec3 => [x + u, y + v, top]))}
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-violet"
      />
      {[...nodes]
        .sort((a, b) => a[0] + a[1] - (b[0] + b[1]))
        .map(([u, v], i) => (
          <IsoBox
            key={`${u}-${v}`}
            at={[x + u - 0.5, y + v - 0.5, top]}
            size={[1, 1, 0.7]}
            tone={i === 0 ? "blush" : "violet"}
          />
        ))}
    </>
  );
}

/** Routes between islands, drawn over everything: [from, to] in iso units. */
const routes: [Vec3, Vec3][] = [
  [
    [4.5, 7.5, 4.2],
    [7.5, 4.5, 5.6],
  ],
  [
    [10, 4.5, 5.6],
    [10, 8.5, 4.2],
  ],
];

/**
 * Services hub hero: three floating islands, one per pillar (an app window,
 * a bar-chart trio, connected nodes), joined by a bridge and violet routes.
 * Decorative.
 */
export function HubScene({ className = "" }: { className?: string }) {
  return (
    <IsoScene viewBox={[420, 300]} origin={[210, 52]} className={className}>
      <g className="rise-in" style={riseDelay(0)}>
        <IsoGround size={PLATE} dots={2} />
        {islands.map(({ kind, x, y }) => (
          <IsoShadow key={kind} at={[x, y, 0]} size={[ISLAND[0], ISLAND[1]]} />
        ))}
      </g>

      {islands.map(({ kind, x, y, z }, i) => (
        <g key={kind} className="rise-in" style={riseDelay(140 + i * 140)}>
          {kind === "consultancy" && (
            // Bridge from the software island, drawn before the island in front of it
            <IsoBox at={[4.5, 9.5, z + ISLAND[2] - 0.3]} size={[4, 1, 0.3]} tone="lavender" />
          )}
          <IsoBox at={[x, y, z]} size={ISLAND} tone="paper" />
          <Symbol kind={kind} x={x} y={y} top={z + ISLAND[2]} />
        </g>
      ))}

      <g className="rise-in" style={riseDelay(600)}>
        {routes.map(([from, to]) => (
          <g key={from.join()}>
            <path
              d={pathD(from, to)}
              fill="none"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="1 7"
              className="stroke-violet"
            />
            {[from, to].map((p) => {
              const [cx, cy] = iso(p);
              return <circle key={p.join()} cx={cx} cy={cy} r={3.5} className="fill-violet" />;
            })}
          </g>
        ))}
      </g>
    </IsoScene>
  );
}
