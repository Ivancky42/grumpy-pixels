import type { ComponentType } from "react";
import { IsoBox, IsoFace, IsoGround, IsoScene, IsoShadow } from "@/components/site/iso/Iso";
import { iso, pathD, riseDelay, type Vec3 } from "@/lib/iso";
import type { ServiceSlug } from "@/lib/services";

/** Ground plate shared by every spot: a 7 × 7 paper plate with a sparse dot grid. */
const PLATE = 7;
const G = 0; // top of the plate

const line = "fill-none stroke-violet";

/** Code-window text lines: [indent, length] in face units. */
const CODE_LINES: [number, number][] = [
  [0.3, 1.4],
  [0.6, 1.5],
  [0.6, 1.0],
  [0.3, 0.8],
];

function SoftwareSpot() {
  return (
    <>
      {/* laptop base with a keyboard pad on top */}
      <g className="rise-in" style={riseDelay(100)}>
        <IsoShadow at={[1, 2.5, G]} size={[4, 3]} />
        <IsoBox at={[1, 2.5, G]} size={[4, 3, 0.35]} tone="lavender">
          <rect x={0.4} y={0.7} width={3.2} height={1.5} rx={0.2} className="fill-white/70" />
        </IsoBox>
      </g>
      {/* laptop screen, standing at the back edge */}
      <g className="rise-in" style={riseDelay(200)}>
        <IsoBox at={[1, 2.2, G + 0.35]} size={[4, 0.3, 2.6]} tone="violet" />
        <IsoFace face="left" at={[1, 2.5, G + 2.95]}>
          <rect x={0.3} y={0.3} width={3.4} height={2} rx={0.15} className="fill-ink-soft" />
          {[0.7, 1.2, 1.7].map((v, i) => (
            <rect key={v} x={0.6} y={v} width={[2.2, 1.6, 2.6][i]} height={0.22} rx={0.11} className="fill-lavender/80" />
          ))}
        </IsoFace>
      </g>
      {/* floating code window */}
      <g className="rise-in" style={riseDelay(320)}>
        <IsoBox at={[4.4, 0.6, 2.3]} size={[2.4, 0.25, 1.8]} tone="paper" />
        <IsoFace face="left" at={[4.4, 0.85, 4.1]}>
          {[0.25, 0.5, 0.75].map((u) => (
            <circle key={u} cx={u} cy={0.25} r={0.08} className="fill-violet/40" />
          ))}
          {CODE_LINES.map(([x, w], i) => (
            <rect key={i} x={x} y={0.6 + i * 0.28} width={w} height={0.16} rx={0.08} className="fill-violet" />
          ))}
        </IsoFace>
      </g>
      {/* phone, standing */}
      <g className="rise-in" style={riseDelay(440)}>
        <IsoShadow at={[5.6, 4.6, G]} size={[1.2, 0.3]} />
        <IsoBox at={[5.6, 4.6, G]} size={[1.2, 0.3, 2]} tone="ink" />
        <IsoFace face="left" at={[5.6, 4.9, G + 2]}>
          <rect x={0.15} y={0.2} width={0.9} height={1.5} rx={0.12} className="fill-lavender-soft" />
          <rect x={0.3} y={0.45} width={0.6} height={0.18} rx={0.09} className="fill-violet" />
          <rect x={0.3} y={0.8} width={0.4} height={0.18} rx={0.09} className="fill-violet/40" />
        </IsoFace>
      </g>
    </>
  );
}

/** Rising columns, left to right on screen (equal x + y, so none overlaps). */
const COLUMNS: { x: number; y: number; h: number }[] = [
  { x: 0.8, y: 3.4, h: 1.2 },
  { x: 2.4, y: 1.8, h: 2.2 },
  { x: 4, y: 0.2, h: 3.4 },
];
const COL = 1.3;

function SeoSpot() {
  const tops: Vec3[] = COLUMNS.map(({ x, y, h }) => [x + COL / 2, y + COL / 2, G + h]);
  return (
    <>
      {COLUMNS.map(({ x, y, h }, i) => (
        <g key={x} className="rise-in" style={riseDelay(100 + i * 120)}>
          <IsoShadow at={[x, y, G]} size={[COL, COL]} />
          <IsoBox at={[x, y, G]} size={[COL, COL, h]} tone="violet" />
        </g>
      ))}
      {/* trend line across the column tops */}
      <g className="rise-in" style={riseDelay(480)}>
        <path d={pathD(...tops)} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={line} />
        {tops.map((p) => {
          const [cx, cy] = iso(p);
          return <circle key={cx} cx={cx} cy={cy} r={3.5} className="fill-violet" />;
        })}
      </g>
      {/* magnifier lying flat on the plate */}
      <g className="rise-in" style={riseDelay(600)}>
        <IsoFace face="top" at={[2.6, 3.4, G]}>
          <circle cx={1.3} cy={1.3} r={1.05} className="fill-violet/10" />
          <circle cx={1.3} cy={1.3} r={1.05} strokeWidth={0.22} className={line} />
          <path d="M2.5 1.3 L3.2 1.3" strokeWidth={0.4} strokeLinecap="round" className={line} />
        </IsoFace>
      </g>
    </>
  );
}

/** Consultancy nodes, back to front. */
const NODES: { at: Vec3; h: number; tone: "violet" | "blush" }[] = [
  { at: [3.8, 0.8, G], h: 1.8, tone: "violet" },
  { at: [0.9, 3.6, G], h: 1.2, tone: "violet" },
  { at: [4.3, 4.3, G], h: 1, tone: "blush" },
];
const NODE = 1.6;

function ConsultancySpot() {
  const centres: Vec3[] = NODES.map(({ at: [x, y] }) => [x + NODE / 2, y + NODE / 2, G]);
  return (
    <>
      {/* connectors along the plate, under the nodes */}
      <g className="rise-in" style={riseDelay(100)}>
        <path
          d={pathD(centres[0], centres[1], centres[2], centres[0])}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={line}
        />
      </g>
      {NODES.map(({ at, h, tone }, i) => (
        <g key={i} className="rise-in" style={riseDelay(200 + i * 120)}>
          <IsoShadow at={at} size={[NODE, NODE]} />
          <IsoBox at={at} size={[NODE, NODE, h]} tone={tone}>
            <circle cx={NODE / 2} cy={NODE / 2} r={0.3} className="fill-white/80" />
          </IsoBox>
        </g>
      ))}
    </>
  );
}

const SPOTS: Record<ServiceSlug, ComponentType> = {
  "software-development": SoftwareSpot,
  seo: SeoSpot,
  consultancy: ConsultancySpot,
};

/** Small decorative isometric spot for a service pillar card. */
export function PillarSpot({ slug }: { slug: ServiceSlug }) {
  const Spot = SPOTS[slug];
  return (
    <IsoScene viewBox={[232, 156]} origin={[116, 30]}>
      <IsoGround size={[PLATE, PLATE]} dots={2} className="rise-in" style={riseDelay(0)} />
      <Spot />
    </IsoScene>
  );
}
