import type { ReactNode } from "react";
import {
  IsoBox,
  IsoFace,
  IsoGround,
  IsoScene,
  IsoShadow,
  IsoTile,
} from "@/components/site/iso/Iso";
import { ISO_TILE_H, pathD, riseDelay, type Vec3 } from "@/lib/iso";

/** Top of the ground plate: everything stands on this z. */
const G = 0;
const PLATE = 16;
/** Stagger step between scene parts, in ms */
const STEP = 90;

/** Line art shared by every route */
const lineCls = "fill-none stroke-violet";
const line = {
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Server rack: three stacked ink units, each with a drive slot and two LEDs. */
const RACK = { x: 1.5, y: 10.5, w: 3.2, unit: 1.5, gap: 0.2 };
const rackUnits = [0, 1, 2].map((i) => G + i * (RACK.unit + RACK.gap));

/** Routes on the ground: server → windows, then a branch → phone. */
const routes: Vec3[][] = [
  [
    [4.9, 12, G],
    [7.5, 12, G],
    [7.5, 7.1, G],
  ],
  [
    [7.5, 9.6, G],
    [13.9, 9.6, G],
    [13.9, 6.1, G],
  ],
];
const routeDots: Vec3[] = [
  [4.9, 12, G],
  [7.5, 7.1, G],
  [7.5, 9.6, G],
  [13.9, 6.1, G],
];

type WindowProps = {
  at: Vec3;
  /** [width along x, height along z] */
  size: [number, number];
  delay: number;
  /** Screen content in left-face coordinates (u along x, v down), iso units */
  children: ReactNode;
};

const WIN_DEPTH = 0.4;
const WIN_LIFT = 0.8;

/** A floating app window: a thin upright slab whose front (left) face is the screen. */
function AppWindow({ at: [x, y, z], size: [w, h], delay, children }: WindowProps) {
  return (
    <>
      <IsoShadow at={[x, y, G]} size={[w, WIN_DEPTH]} />
      <g className="rise-in" style={riseDelay(delay)}>
        <IsoBox at={[x, y, z]} size={[w, WIN_DEPTH, h]} tone="paper" />
        <IsoFace face="left" at={[x, y + WIN_DEPTH, z + h]}>
          <rect
            x={0.25}
            y={0.25}
            width={w - 0.5}
            height={h - 0.5}
            rx={0.3}
            className="fill-white"
          />
          {/* title bar with window dots */}
          <rect x={0.25} y={0.25} width={w - 0.5} height={0.75} rx={0.3} className="fill-lavender-soft" />
          {[0.7, 1.15, 1.6].map((u, i) => (
            <circle
              key={u}
              cx={u}
              cy={0.62}
              r={0.15}
              className={i === 0 ? "fill-violet" : "fill-ink/15"}
            />
          ))}
          {children}
        </IsoFace>
      </g>
    </>
  );
}

/** Text-line placeholder on a face */
function Lines({ u, v, widths, gap = 0.55, cls = "fill-ink/12" }: {
  u: number;
  v: number;
  widths: number[];
  gap?: number;
  cls?: string;
}) {
  return widths.map((w, i) => (
    <rect key={i} x={u} y={v + i * gap} width={w} height={0.28} rx={0.14} className={cls} />
  ));
}

const bars = [1.2, 2, 1.5, 2.6];

/** Analytics block at the back right: three bar columns on a lavender pad */
const columns = [1, 1.7, 2.4];

/**
 * Software hero scene: a server rack feeding a cascade of app windows and a
 * phone over violet routes, on the shared dotted ground plate. Decorative.
 */
export function SoftwareScene() {
  return (
    <IsoScene
      viewBox={[480, 400]}
      origin={[240, 118]}
      className="mx-auto max-w-md lg:max-w-none"
    >
      {/* Ground plate */}
      <IsoGround size={[PLATE, PLATE]} dots={1.6} className="rise-in" style={riseDelay(0)} />

      {/* Routes on the ground */}
      <g className="rise-in" style={riseDelay(STEP * 6)}>
        {routes.map((r, i) => (
          <path key={i} d={pathD(...r)} className={lineCls} {...line} />
        ))}
        {routeDots.map((p) => (
          <IsoFace key={p.join()} face="top" at={p}>
            <circle r={0.22} className="fill-violet" />
          </IsoFace>
        ))}
      </g>

      {/* Back window: dashboard header and a wide block */}
      <AppWindow at={[2, 1.5, G + WIN_LIFT]} size={[7, 7.5]} delay={STEP}>
        <rect x={2.3} y={0.5} width={4} height={0.25} rx={0.12} className="fill-ink/10" />
        <rect x={0.7} y={1.5} width={5.6} height={1.6} rx={0.25} className="fill-lavender-soft" />
      </AppWindow>

      {/* Middle window: a list and a trend line */}
      <AppWindow at={[2.6, 3.8, G + WIN_LIFT]} size={[7, 6.8]} delay={STEP * 2}>
        <Lines u={0.7} v={1.5} widths={[2.6, 2, 2.3, 1.6]} />
        <path
          d="M4.2 2.3 L4.9 1.7 L5.6 2 L6.3 1.4"
          className={lineCls}
          strokeWidth={0.14}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </AppWindow>

      {/* Front window: nav, heading, copy, button and a bar chart */}
      <AppWindow at={[3.2, 6.1, G + WIN_LIFT]} size={[7, 6]} delay={STEP * 3}>
        {[2.4, 3.4, 4.4].map((u) => (
          <rect key={u} x={u} y={0.5} width={0.7} height={0.25} rx={0.12} className="fill-ink/15" />
        ))}
        <rect x={0.7} y={1.5} width={2.9} height={0.45} rx={0.22} className="fill-ink/70" />
        <Lines u={0.7} v={2.35} widths={[2.9, 2.4, 2.7]} />
        <rect x={0.7} y={4.2} width={1.9} height={0.6} rx={0.3} className="fill-violet" />
        {bars.map((b, i) => (
          <rect
            key={i}
            x={4.3 + i * 0.6}
            y={5 - b}
            width={0.4}
            height={b}
            rx={0.1}
            className={i === bars.length - 1 ? "fill-violet" : "fill-lavender"}
          />
        ))}
      </AppWindow>

      {/* Server rack */}
      <IsoShadow at={[RACK.x, RACK.y, G]} size={[RACK.w, RACK.w]} />
      {rackUnits.map((z, i) => (
        <g key={z} className="rise-in" style={riseDelay(STEP * (i + 1))}>
          <IsoBox at={[RACK.x, RACK.y, z]} size={[RACK.w, RACK.w, RACK.unit]} tone="ink" />
          <IsoFace face="left" at={[RACK.x, RACK.y + RACK.w, z + RACK.unit]}>
            <rect x={0.35} y={0.6} width={1.6} height={0.3} rx={0.15} className="fill-white/15" />
            <circle cx={2.4} cy={0.75} r={0.17} className="fill-violet" />
            <circle cx={2.85} cy={0.75} r={0.17} className={i === 2 ? "fill-lavender" : "fill-violet"} />
          </IsoFace>
          <IsoFace face="right" at={[RACK.x + RACK.w, RACK.y + RACK.w, z + RACK.unit]}>
            <Lines u={0.4} v={0.45} widths={[2.4, 2.4]} gap={0.4} cls="fill-white/10" />
          </IsoFace>
        </g>
      ))}

      {/* Analytics columns */}
      <g className="rise-in" style={riseDelay(STEP * 3)}>
        <IsoTile at={[12.6, 0.4, G]} size={[3, 2.2]} tone="lavender" />
        {columns.map((h, i) => (
          <IsoBox
            key={h}
            at={[13 + i * 0.85, 1, G + ISO_TILE_H]}
            size={[0.6, 0.6, h]}
            tone={i === columns.length - 1 ? "violet" : "lavender"}
          />
        ))}
      </g>

      {/* Phone */}
      <IsoShadow at={[12.8, 5, G]} size={[2.4, 0.5]} />
      <g className="rise-in" style={riseDelay(STEP * 4)}>
        <IsoBox at={[12.8, 5, G]} size={[2.4, 0.5, 4.6]} tone="ink" />
        <IsoFace face="left" at={[12.8, 5.5, G + 4.6]}>
          <rect x={0.2} y={0.3} width={2} height={4} rx={0.3} className="fill-white" />
          <rect x={0.85} y={0.5} width={0.7} height={0.15} rx={0.075} className="fill-ink/20" />
          <rect x={0.45} y={1} width={1.5} height={1.1} rx={0.2} className="fill-lavender-soft" />
          <Lines u={0.45} v={2.4} widths={[1.5, 1.1]} gap={0.45} />
          <rect x={0.45} y={3.45} width={1.5} height={0.5} rx={0.25} className="fill-violet" />
        </IsoFace>
      </g>

      {/* Blush accent: a building block on its pad */}
      <g className="rise-in" style={riseDelay(STEP * 5)}>
        <IsoTile at={[10.6, 11.6, G]} size={[2.6, 2.6]} tone="blush" />
        <IsoBox at={[11.3, 12.3, G + ISO_TILE_H]} size={[1.2, 1.2, 1.2]} tone="violet" />
      </g>
    </IsoScene>
  );
}
