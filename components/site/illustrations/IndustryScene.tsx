import type { ReactNode } from "react";
import { IsoBox, IsoFace, IsoGround, IsoScene } from "@/components/site/iso/Iso";
import { Reveal } from "@/components/site/Reveal";
import type { IndustrySceneName } from "@/lib/industries";
import { pathD, riseDelay, type IsoTone, type Vec3 } from "@/lib/iso";

/*
 * One isometric building per industry, on the shared dotted paper plate.
 * Every variant is built from the same pieces: `Building` (box + door and
 * windows on its faces), `Boxes` (a staggered cluster of props) and `Walk`
 * (the ground path to the door). Decorative: always aria-hidden.
 */

/** Ground plate size (iso units) and the height of its top face. */
const PLATE = 15;
const G = 0;

/** [u, v, width, height] on a face, in iso units */
type Rect = readonly [number, number, number, number];
type BoxSpec = { at: Vec3; size: Vec3; tone: IsoTone };

/** A `cols × rows` grid of equal window rects starting at (u, v). */
function grid(u: number, v: number, cols: number, rows: number, w: number, h: number, gu: number, gv: number): Rect[] {
  return Array.from({ length: cols * rows }, (_, i) => [
    u + (i % cols) * (w + gu),
    v + Math.floor(i / cols) * (h + gv),
    w,
    h,
  ]);
}

function Rects({ rects, className }: { rects: readonly Rect[]; className: string }) {
  return rects.map(([u, v, w, h]) => (
    <rect key={`${u}-${v}`} x={u} y={v} width={w} height={h} rx={0.12} className={className} />
  ));
}

/** A flat lavender path on the ground, from x0 to x1, y0 to the plate's front edge. */
function Walk({ x0, x1, y0 }: { x0: number; x1: number; y0: number }) {
  return (
    <IsoFace face="top" at={[0, 0, G]}>
      <rect x={x0} y={y0} width={x1 - x0} height={PLATE - y0} className="fill-lavender/60" />
    </IsoFace>
  );
}

type BuildingProps = {
  at: Vec3;
  size: Vec3;
  tone: IsoTone;
  /** Rects on the left (front, +y) face */
  left?: readonly Rect[];
  /** Rects on the right (+x) face */
  right?: readonly Rect[];
  windowClass: string;
  /** Door on the left face: [u, width, height], standing on the ground */
  door?: readonly [number, number, number];
  doorClass?: string;
  delay?: number;
  children?: ReactNode;
};

/** The shared base: a shaded box with windows and a door drawn on its faces. */
function Building({
  at: [x, y, z],
  size: [w, d, h],
  tone,
  left = [],
  right = [],
  windowClass,
  door,
  doorClass = "fill-violet",
  delay = 120,
  children,
}: BuildingProps) {
  return (
    <g className="rise-in" style={riseDelay(delay)}>
      <IsoBox at={[x, y, z]} size={[w, d, h]} tone={tone} />
      <IsoFace face="left" at={[x, y + d, z + h]}>
        <Rects rects={left} className={windowClass} />
        {door && (
          <rect x={door[0]} y={h - door[2]} width={door[1]} height={door[2]} rx={0.12} className={doorClass} />
        )}
      </IsoFace>
      <IsoFace face="right" at={[x + w, y + d, z + h]}>
        <Rects rects={right} className={windowClass} />
      </IsoFace>
      {children}
    </g>
  );
}

/** A cluster of props that rises in together. Pass boxes in painter's order. */
function Boxes({ items, delay, children }: { items: readonly BoxSpec[]; delay: number; children?: ReactNode }) {
  return (
    <g className="rise-in" style={riseDelay(delay)}>
      {items.map((b) => (
        <IsoBox key={b.at.join()} {...b} />
      ))}
      {children}
    </g>
  );
}

/* ---------------------------------------------------------------- clinic */

const clinicCross: BoxSpec[] = [
  { at: [7.15, 9, G + 3.5], size: [0.7, 0.5, 0.75], tone: "violet" },
  { at: [6.5, 9, G + 4.25], size: [2, 0.5, 0.7], tone: "violet" },
  { at: [7.15, 9, G + 4.95], size: [0.7, 0.5, 0.75], tone: "violet" },
];
const clinicBench: BoxSpec[] = [
  { at: [2.3, 10.7, G], size: [0.4, 0.8, 0.6], tone: "ink" },
  { at: [4.3, 10.7, G], size: [0.4, 0.8, 0.6], tone: "ink" },
  { at: [2, 10.6, G + 0.6], size: [3, 1, 0.3], tone: "lavender" },
];

function Clinic() {
  return (
    <>
      <Walk x0={6.7} x1={8.3} y0={9} />
      <Building
        at={[3.5, 3, G]}
        size={[8, 6, 6]}
        tone="paper"
        windowClass="fill-lavender"
        left={[...grid(0.7, 1, 1, 2, 1.6, 1.3, 0, 1.3), ...grid(5.7, 1, 1, 2, 1.6, 1.3, 0, 1.3)]}
        right={grid(0.8, 1, 2, 2, 1.6, 1.3, 1, 1.3)}
        door={[3.2, 1.6, 2.6]}
      >
        <IsoBox at={[3.5, 3, G + 6]} size={[8, 6, 0.4]} tone="lavender" />
        <IsoBox at={[5, 4.5, G + 6.4]} size={[2, 2, 0.9]} tone="paper" />
      </Building>
      <Boxes items={clinicCross} delay={300} />
      <Boxes items={clinicBench} delay={420} />
    </>
  );
}

/* ------------------------------------------------------------ restaurant */

/** Painter's order: ascending x (stool, table leg, table top, stool …). */
const restaurantTables: BoxSpec[] = [1.2, 9].flatMap((x): BoxSpec[] => [
  { at: [x - 0.1, 11.8, G], size: [0.6, 0.6, 0.6], tone: "violet" },
  { at: [x + 1.45, 11.95, G], size: [0.3, 0.3, 1], tone: "ink" },
  { at: [x + 1, 11.5, G + 1], size: [1.2, 1.2, 0.2], tone: "paper" },
  { at: [x + 2.7, 11.8, G], size: [0.6, 0.6, 0.6], tone: "violet" },
]);
const AWNING_STRIPES = [0, 2, 4, 6];

function Restaurant() {
  return (
    <>
      <Walk x0={6.9} x1={8.3} y0={9} />
      <Building
        at={[3.5, 3, G]}
        size={[8, 6, 5.5]}
        tone="lavender"
        windowClass="fill-white/80"
        left={[...grid(0.8, 0.6, 3, 1, 1.4, 1, 1.1, 0), [0.6, 2.7, 2.6, 2.1], [4.8, 2.7, 2.6, 2.1]]}
        right={grid(0.8, 0.8, 2, 2, 1.6, 1.2, 1, 1.2)}
        door={[3.4, 1.4, 2.8]}
        doorClass="fill-ink-soft"
      >
        <IsoBox at={[3.3, 2.8, G + 5.5]} size={[8.4, 6.4, 0.4]} tone="violet" />
      </Building>
      <g className="rise-in" style={riseDelay(300)}>
        <IsoBox at={[3.5, 9, G + 3]} size={[8, 1.4, 0.35]} tone="blush">
          {AWNING_STRIPES.map((u) => (
            <rect key={u} x={u} y={0} width={1} height={1.4} className="fill-violet" />
          ))}
        </IsoBox>
        <IsoFace face="left" at={[3.5, 10.4, G + 3.35]}>
          {AWNING_STRIPES.map((u) => (
            <rect key={u} x={u} y={0} width={1} height={0.35} className="fill-violet-deep" />
          ))}
        </IsoFace>
      </g>
      <Boxes items={[{ at: [12.6, 9.6, G], size: [0.3, 1.4, 2], tone: "ink" }]} delay={420}>
        <IsoFace face="right" at={[12.9, 11, G + 2]}>
          <Rects rects={[[0.25, 0.4, 0.9, 0.15], [0.25, 0.8, 0.6, 0.15], [0.25, 1.2, 0.9, 0.15]]} className="fill-lavender" />
        </IsoFace>
      </Boxes>
      <Boxes items={restaurantTables} delay={500} />
    </>
  );
}

/* ------------------------------------------------------------------- law */

const COLUMN_H = 5.5;
const lawSteps: BoxSpec[] = [
  { at: [3, 8, G], size: [9, 3.2, 0.4], tone: "paper" },
  { at: [3.4, 8, G + 0.4], size: [8.2, 2.4, 0.4], tone: "paper" },
];
const lawColumns: BoxSpec[] = [4.2, 6.3, 8.4, 10.5].map((x) => ({
  at: [x, 8.9, G + 0.8],
  size: [0.8, 0.8, COLUMN_H],
  tone: "paper",
}));
const LAW_TOP = G + 0.8 + COLUMN_H;
const lawPediment: BoxSpec[] = [
  { at: [3.2, 2.3, LAW_TOP], size: [8.6, 8, 0.6], tone: "paper" },
  { at: [3.8, 2.9, LAW_TOP + 0.6], size: [7.4, 6.8, 0.5], tone: "lavender" },
  { at: [4.6, 3.7, LAW_TOP + 1.1], size: [5.8, 5.2, 0.45], tone: "violet" },
];

function Law() {
  const h = LAW_TOP - G;
  return (
    <>
      <Walk x0={7} x1={8.5} y0={11.2} />
      <Building
        at={[3.5, 2.5, G]}
        size={[8, 5.5, h]}
        tone="lavender"
        windowClass="fill-white/80"
        left={[[1.7, 1.4, 0.9, 2.6], [5.9, 1.4, 0.9, 2.6]]}
        right={grid(0.8, 1.2, 2, 1, 1.2, 2.8, 1.4, 0)}
        door={[3.6, 1.3, 3.4]}
      />
      <Boxes items={lawSteps} delay={240} />
      <Boxes items={lawColumns} delay={340} />
      <Boxes items={lawPediment} delay={460} />
    </>
  );
}

/* -------------------------------------------------------------- property */

type Tower = { at: Vec3; size: Vec3; tone: IsoTone; windowClass: string; rows: number };

/** Back to front: tall lavender, short paper (front left), mid violet (right). */
const towers: Tower[] = [
  { at: [3, 3, G], size: [4, 4, 11], tone: "lavender", windowClass: "fill-white/80", rows: 6 },
  { at: [3, 8.5, G], size: [3.5, 3.5, 6], tone: "paper", windowClass: "fill-violet/25", rows: 3 },
  { at: [8, 4, G], size: [3.5, 3.5, 8], tone: "violet", windowClass: "fill-lavender-soft/80", rows: 4 },
];

function Property() {
  return (
    <>
      {towers.map(({ at, size, tone, windowClass, rows }, i) => {
        const cols = grid(0.7, 0.9, 2, rows, (size[0] - 2.1) / 2, 0.9, 0.7, 0.75);
        return (
          <Building
            key={tone}
            at={at}
            size={size}
            tone={tone}
            windowClass={windowClass}
            left={cols}
            right={cols}
            delay={120 + i * 120}
          />
        );
      })}
      <Boxes
        items={[
          { at: [9.6, 11.6, G], size: [0.3, 0.3, 2.6], tone: "ink" },
          { at: [9.1, 11.9, G + 1.3], size: [1.6, 0.2, 1.1], tone: "blush" },
        ]}
        delay={520}
      />
    </>
  );
}

/* ------------------------------------------------------------------- gym */

const gymKit: BoxSpec[] = [
  { at: [3.8, 10.8, G], size: [0.7, 1.1, 1.1], tone: "ink" },
  { at: [4.5, 11.2, G + 0.4], size: [1.8, 0.3, 0.3], tone: "ink" },
  { at: [6.3, 10.8, G], size: [0.7, 1.1, 1.1], tone: "ink" },
  { at: [8.4, 11, G], size: [1.3, 1.3, 1.1], tone: "ink" },
];

function Gym() {
  return (
    <>
      <IsoFace face="top" at={[0, 0, G]}>
        <rect x={3} y={10.2} width={7.4} height={2.6} rx={0.2} className="fill-lavender/70" />
      </IsoFace>
      <Walk x0={10.5} x1={11.8} y0={8.5} />
      <Building
        at={[2.5, 3, G]}
        size={[10, 5.5, 5]}
        tone="violet"
        windowClass="fill-lavender-soft/90"
        left={[[1, 0.9, 6.2, 3], [3.03, 0.9, 0.12, 3], [5.1, 0.9, 0.12, 3]]}
        right={[[0.8, 0.9, 3.9, 1.6]]}
        door={[8, 1.4, 3.3]}
        doorClass="fill-ink/60"
      >
        <IsoBox at={[4, 4, G + 5]} size={[5, 0.5, 1.4]} tone="blush" />
        <IsoBox at={[10, 5, G + 5]} size={[1.5, 1.5, 0.9]} tone="paper" />
      </Building>
      <Boxes items={gymKit} delay={360}>
        <path
          d={pathD([8.6, 11.65, G + 1.1], [8.6, 11.65, G + 2], [9.5, 11.65, G + 2], [9.5, 11.65, G + 1.1])}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-violet"
        />
      </Boxes>
    </>
  );
}

/* --------------------------------------------------------------- tuition */

const tuitionBooks: BoxSpec[] = [
  { at: [4.5, 10.5, G], size: [2.2, 1.6, 0.4], tone: "violet" },
  { at: [4.7, 10.6, G + 0.4], size: [1.9, 1.4, 0.35], tone: "blush" },
  { at: [4.4, 10.7, G + 0.75], size: [2.1, 1.3, 0.35], tone: "lavender" },
  { at: [4.8, 10.6, G + 1.1], size: [1.7, 1.4, 0.3], tone: "paper" },
];
const tuitionFlag: BoxSpec[] = [
  { at: [10, 4.5, G + 7], size: [0.2, 0.2, 3.2], tone: "ink" },
  { at: [10.2, 4.5, G + 9.1], size: [1.7, 0.15, 1.05], tone: "blush" },
];

function Tuition() {
  return (
    <>
      <Walk x0={8.5} x1={10.1} y0={9} />
      <Building
        at={[3.5, 3, G]}
        size={[8, 6, 6.5]}
        tone="paper"
        windowClass="fill-lavender"
        left={[[5, 1, 1.6, 1.4], ...grid(0.8, 4.2, 2, 1, 1.4, 1.3, 0.4, 0)]}
        right={grid(0.8, 1, 2, 2, 1.6, 1.4, 1, 1.6)}
        door={[5, 1.6, 2.9]}
      >
        <IsoFace face="left" at={[3.5, 9, G + 6.5]}>
          <rect x={0.6} y={0.9} width={3.6} height={2.4} rx={0.15} className="fill-ink" />
          <Rects rects={[[1, 1.4, 2.6, 0.2], [1, 1.95, 1.9, 0.2], [1, 2.5, 2.3, 0.2]]} className="fill-lavender" />
        </IsoFace>
        <IsoBox at={[3.3, 2.8, G + 6.5]} size={[8.4, 6.4, 0.5]} tone="violet" />
      </Building>
      <Boxes items={tuitionFlag} delay={300} />
      <Boxes items={tuitionBooks} delay={420} />
    </>
  );
}

/* ---------------------------------------------------------------- export */

const SCENES: Record<IndustrySceneName, { draw: () => ReactNode; top: number }> = {
  clinic: { draw: Clinic, top: 100 },
  restaurant: { draw: Restaurant, top: 90 },
  law: { draw: Law, top: 90 },
  property: { draw: Property, top: 150 },
  gym: { draw: Gym, top: 70 },
  tuition: { draw: Tuition, top: 100 },
};

/**
 * Isometric building for an industry landing page. `hero` animates on load
 * and is framed to its own height; `spot` is framed to a fixed size so a grid
 * of cards lines up, and waits for `Reveal` because it sits below the fold.
 */
export function IndustryScene({
  scene,
  size = "hero",
}: {
  scene: IndustrySceneName;
  size?: "hero" | "spot";
}) {
  const { draw: Draw, top } = SCENES[scene];
  const content = (
    <>
      <IsoGround size={[PLATE, PLATE]} dots={2} className="rise-in" style={riseDelay(0)} />
      <Draw />
    </>
  );

  if (size === "spot") {
    return (
      <Reveal>
        <IsoScene viewBox={[440, 410]} origin={[220, 154]}>
          {content}
        </IsoScene>
      </Reveal>
    );
  }

  return (
    <IsoScene viewBox={[520, top + 270]} origin={[260, top + 8]}>
      {content}
    </IsoScene>
  );
}
