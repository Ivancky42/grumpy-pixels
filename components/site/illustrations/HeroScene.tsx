import { IsoBox, IsoFace, IsoGround, IsoScene } from "@/components/site/iso/Iso";
import { iso, pathD, riseDelay, type IsoTone, type Vec3 } from "@/lib/iso";

/*
 * Home hero: a dotted ground plate carrying one platform per service pillar.
 * Software (front left): desktop, tablet and phone screens plus a server.
 * SEO (back): rising bar chart and a ranking slab with one highlighted row.
 * Consultancy (front right): a flow board of wired nodes, one blush.
 * Violet routes run from each platform to a shared hub tile up front.
 *
 * Iso units throughout; the ground top sits at z = 0 and every platform
 * top at z = 0.6. Parts are drawn back to front (ascending x + y, then z).
 */

const GROUND = 0;
/** Platform top: platforms are 0.6 thick */
const DECK = GROUND + 0.6;

/* ---------- Software ---------- */

type Screen = {
  at: Vec3;
  /** [width along x, height along z] */
  size: [number, number];
  /** Lengths of the two text lines, in iso units */
  lines: [number, number];
  delay: number;
};

const SCREEN_DEPTH = 0.35;

const screens: Screen[] = [
  { at: [1.5, 11.8, DECK], size: [5.2, 5], lines: [3.4, 2.6], delay: 260 },
  { at: [1.7, 14.4, DECK], size: [3.4, 3.6], lines: [2.2, 1.5], delay: 340 },
  { at: [5.6, 15.8, DECK], size: [1.8, 3], lines: [0.9, 0.6], delay: 420 },
];

const windowDots = [0.55, 0.9, 1.25];

function AppScreen({ at: [x, y, z], size: [w, h], lines, delay }: Screen) {
  const pad = 0.22;
  return (
    <g className="rise-in" style={riseDelay(delay)}>
      <IsoBox at={[x, y, z]} size={[w, SCREEN_DEPTH, h]} tone="paper" />
      <IsoFace face="left" at={[x, y + SCREEN_DEPTH, z + h]}>
        <rect
          x={pad}
          y={pad}
          width={w - pad * 2}
          height={h - pad * 2}
          rx={0.2}
          className="fill-white"
        />
        {windowDots
          .filter((u) => u < w - 0.4)
          .map((u) => (
            <circle key={u} cx={u} cy={0.55} r={0.12} className="fill-ink/15" />
          ))}
        <rect x={0.5} y={1.05} width={lines[0]} height={0.3} rx={0.15} className="fill-lavender" />
        <rect x={0.5} y={1.6} width={lines[1]} height={0.3} rx={0.15} className="fill-ink/10" />
        {h > 2.6 && (
          <rect x={0.5} y={h - 1} width={1.2} height={0.42} rx={0.21} className="fill-violet" />
        )}
      </IsoFace>
    </g>
  );
}

const SERVER: { at: Vec3; size: Vec3 } = { at: [6.8, 11.5, DECK], size: [1.2, 1.4, 3] };
const serverLights = [0.5, 1.1, 1.7, 2.3];

function Server() {
  const [x, y, z] = SERVER.at;
  const [w, d, h] = SERVER.size;
  return (
    <g className="rise-in" style={riseDelay(480)}>
      <IsoBox at={SERVER.at} size={SERVER.size} tone="ink" />
      <IsoFace face="right" at={[x + w, y + d, z + h]}>
        {serverLights.map((v) => (
          <rect key={v} x={0.2} y={v} width={0.6} height={0.2} rx={0.1} className="fill-lavender" />
        ))}
        <circle cx={1.05} cy={0.55} r={0.1} className="fill-violet" />
      </IsoFace>
    </g>
  );
}

/* ---------- SEO ---------- */

const bars: { x: number; h: number; tone: IsoTone }[] = [
  { x: 1.6, h: 2, tone: "lavender" },
  { x: 3.0, h: 3.4, tone: "lavender" },
  { x: 4.4, h: 4.8, tone: "violet" },
  { x: 5.8, h: 6.4, tone: "violet" },
  { x: 7.2, h: 8, tone: "violet" },
];

/** Ranking rows on the slab: bar length per row; row 0 is the highlighted one */
const rankRows = [4.3, 3.6, 4.0, 2.8];

function SeoPlatform() {
  return (
    <>
      <IsoBox at={[1, 1, GROUND]} size={[8, 8, 0.6]} tone="lavender" className="rise-in" style={riseDelay(80)} />
      {bars.map((bar, i) => (
        <IsoBox
          key={bar.x}
          at={[bar.x, 1.6, DECK]}
          size={[1.1, 1.1, bar.h]}
          tone={bar.tone}
          className="rise-in"
          style={riseDelay(180 + i * 70)}
        />
      ))}
      <IsoBox at={[1.7, 4, DECK]} size={[6.6, 4.2, 0.4]} tone="paper" className="rise-in" style={riseDelay(300)}>
        {rankRows.map((len, i) => {
          const v = 0.45 + i * 0.9;
          const hot = i === 0;
          return (
            <g key={i}>
              <rect x={0.45} y={v} width={0.55} height={0.55} rx={0.12} className={hot ? "fill-violet" : "fill-ink/12"} />
              <rect x={1.3} y={v + 0.1} width={len} height={0.35} rx={0.17} className={hot ? "fill-violet" : "fill-lavender-soft"} />
            </g>
          );
        })}
      </IsoBox>
    </>
  );
}

/* ---------- Consultancy ---------- */

const BOARD_TOP = DECK + 0.3;

const nodes: { at: [number, number]; h: number; tone: IsoTone }[] = [
  { at: [12.1, 2.1], h: 1.2, tone: "violet" },
  { at: [15.4, 2.1], h: 1.4, tone: "lavender" },
  { at: [12.1, 5.4], h: 1.4, tone: "lavender" },
  { at: [15.4, 5.4], h: 2.2, tone: "blush" },
];

const NODE = 1.4;
const centre = (i: number): Vec3 => [
  nodes[i].at[0] + NODE / 2,
  nodes[i].at[1] + NODE / 2,
  BOARD_TOP,
];
const wires: number[][] = [
  [0, 1, 3],
  [0, 2, 3],
];

function ConsultancyPlatform() {
  return (
    <>
      <IsoBox at={[11, 1, GROUND]} size={[7, 7, 0.6]} tone="lavender" className="rise-in" style={riseDelay(160)} />
      <IsoBox at={[11.6, 1.6, DECK]} size={[5.8, 5.8, 0.3]} tone="paper" className="rise-in" style={riseDelay(240)} />
      <g className="rise-in" style={riseDelay(320)}>
        {wires.map((wire) => (
          <path
            key={wire.join("-")}
            d={pathD(...wire.map(centre))}
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-violet"
          />
        ))}
      </g>
      {nodes.map((node, i) => (
        <IsoBox
          key={node.at.join("-")}
          at={[node.at[0], node.at[1], BOARD_TOP]}
          size={[NODE, NODE, node.h]}
          tone={node.tone}
          className="rise-in"
          style={riseDelay(360 + i * 60)}
        />
      ))}
    </>
  );
}

/* ---------- Routes and hub ---------- */

const HUB: Vec3 = [12.8, 12.8, GROUND];
const HUB_SIZE = 3.4;

/** Each route starts at its platform (where its dot sits) and runs to the hub */
const routes: Vec3[][] = [
  [[9.3, 9.3, GROUND], [12.8, 12.8, GROUND]],
  [[8.4, 14.5, GROUND], [12.8, 14.5, GROUND]],
  [[14.5, 8.4, GROUND], [14.5, 12.8, GROUND]],
];

function Routes() {
  return (
    <g className="rise-in" style={riseDelay(500)}>
      {routes.map((route) => (
        <path
          key={route[0].join("-")}
          d={pathD(...route)}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-violet"
        />
      ))}
      {routes.map((route) => {
        const [cx, cy] = iso(route[0]);
        return <circle key={route[0].join("-")} cx={cx} cy={cy} r={3.5} className="fill-violet" />;
      })}
    </g>
  );
}

function Hub() {
  return (
    <IsoBox at={HUB} size={[HUB_SIZE, HUB_SIZE, 0.5]} tone="lavender" className="rise-in" style={riseDelay(540)}>
      <circle cx={HUB_SIZE / 2} cy={HUB_SIZE / 2} r={0.55} className="fill-violet" />
    </IsoBox>
  );
}

/** Signature home hero illustration: the three service pillars on one plate. Decorative. */
export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <IsoScene viewBox={[560, 420]} origin={[280, 88]} className={className}>
      <IsoGround size={[19, 19]} dots={1} className="rise-in" style={riseDelay(0)} />

      <Routes />

      <SeoPlatform />

      <ConsultancyPlatform />

      <g className="rise-in" style={riseDelay(120)}>
        <IsoBox at={[1, 11, GROUND]} size={[7, 7, 0.6]} tone="lavender" />
      </g>
      {screens.slice(0, 2).map((s) => (
        <AppScreen key={s.delay} {...s} />
      ))}
      <Server />
      <AppScreen {...screens[2]} />

      <Hub />
    </IsoScene>
  );
}
