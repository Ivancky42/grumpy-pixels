import type { ReactNode } from "react";
import {
  IsoBox,
  IsoFace,
  IsoGround,
  IsoScene,
  IsoShadow,
  IsoTile,
} from "@/components/site/iso/Iso";
import { pathD, riseDelay, type Vec3 } from "@/lib/iso";
import type { ProjectSceneName } from "@/lib/work";

/*
 * Isometric stand-ins for the project screenshots: one abstract scene per
 * project type on the shared dotted ground plate. No text, logos or client
 * branding. Decorative: always aria-hidden.
 *
 * Both sizes draw the same scene on a 14 × 10 area; `feature` widens the
 * plate along x and adds extra props there (hidden under `sm`).
 */

type Size = "card" | "feature";

const FRAME: Record<Size, { viewBox: [number, number]; origin: [number, number]; plate: [number, number] }> = {
  card: { viewBox: [410, 256], origin: [177, 51], plate: [14, 10] },
  feature: { viewBox: [480, 300], origin: [192, 52], plate: [18, 11] },
};

/** Stagger step between scene parts, in ms */
const STEP = 110;

/** [u, v, width, height] on a face, in iso units */
type Rect = readonly [number, number, number, number];

function Rects({ rects, className, r = 0.15 }: { rects: readonly Rect[]; className: string; r?: number }) {
  return rects.map(([u, v, w, h]) => (
    <rect key={`${u}-${v}`} x={u} y={v} width={w} height={h} rx={r} className={className} />
  ));
}

/** Violet ground routes with a dot at each end. */
function Routes({ routes, delay }: { routes: Vec3[][]; delay: number }) {
  return (
    <g className="rise-in" style={riseDelay(delay)}>
      {routes.map((r) => (
        <path
          key={r.join()}
          d={pathD(...r)}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-violet"
        />
      ))}
      {routes.flatMap((r) => [r[0], r[r.length - 1]]).map((p) => (
        <IsoFace key={p.join()} face="top" at={p}>
          <circle r={0.24} className="fill-violet" />
        </IsoFace>
      ))}
    </g>
  );
}

/** Extra props only drawn in the wide `feature` frame, hidden on phones. */
function Extra({ size, children }: { size: Size; children: ReactNode }) {
  return size === "feature" ? <g className="max-sm:hidden">{children}</g> : null;
}

/* ------------------------------------------------------------------ */
/* Event: congress website with ticket checkout                        */
/* ------------------------------------------------------------------ */

const STAGE = { at: [0.8, 0.8, 0] as Vec3, size: [5.6, 3.6, 0.7] as Vec3 };
const BANNER = { at: [1.3, 1.1, 0.7] as Vec3, size: [4.6, 0.4, 3.4] as Vec3 };
const LECTERN = { at: [3.9, 2.9, 0.7] as Vec3, size: [1.2, 0.9, 1.5] as Vec3 };
const CAL = { at: [7.6, 0.4, 0] as Vec3, size: [5.4, 4.2, 0.4] as Vec3 };
const SEATS = [1.6, 2.8, 4.0, 5.2];
const TICKET = { at: [1.4, 5.8, 0] as Vec3, size: [5, 2.4] as [number, number] };
const BAG = { at: [11, 7.4, 0] as Vec3, size: [2.4, 1.8, 2.4] as Vec3 };

/** Calendar: three day columns, the middle one highlighted, each with sessions */
const DAY_U = [0.45, 2.1, 3.75];
const DAY_W = 1.35;
const SESSIONS = [1.6, 2.3, 3.0];

/** Ticket perforation between the body and the stub */
const PERF = [0.35, 0.75, 1.15, 1.55, 1.95];

function EventScene({ size }: { size: Size }) {
  const [bx, by, bz] = BAG.at;
  const [bw, bd, bh] = BAG.size;
  const top = bz + bh;
  const handle: Vec3[] = [
    [bx + 0.6, by + bd / 2, top],
    [bx + 0.6, by + bd / 2, top + 1],
    [bx + bw - 0.6, by + bd / 2, top + 1],
    [bx + bw - 0.6, by + bd / 2, top],
  ];

  return (
    <>
      <IsoGround size={FRAME[size].plate} className="rise-in" style={riseDelay(0)} />

      <Routes
        delay={STEP * 7}
        routes={[
          [
            [6.6, 7, 0],
            [8.6, 7, 0],
            [8.6, 8.4, 0],
            [11, 8.4, 0],
          ],
        ]}
      />

      {/* Stage with a standing banner and a lectern */}
      <g className="rise-in" style={riseDelay(STEP)}>
        <IsoShadow at={STAGE.at} size={[STAGE.size[0], STAGE.size[1]]} />
        <IsoBox at={STAGE.at} size={STAGE.size} tone="lavender" />
      </g>
      <g className="rise-in" style={riseDelay(STEP * 2)}>
        <IsoBox at={BANNER.at} size={BANNER.size} tone="violet" />
        <IsoFace
          face="left"
          at={[BANNER.at[0], BANNER.at[1] + BANNER.size[1], BANNER.at[2] + BANNER.size[2]]}
        >
          <circle cx={1.2} cy={1.2} r={0.6} className="fill-white" />
          <Rects rects={[[2.2, 0.75, 1.9, 0.45]]} className="fill-white" r={0.22} />
          <Rects rects={[[2.2, 1.45, 1.4, 0.3]]} className="fill-white/60" />
          <Rects rects={[[0.5, 2.4, 3.6, 0.5]]} className="fill-lavender/70" r={0.25} />
        </IsoFace>
      </g>
      <g className="rise-in" style={riseDelay(STEP * 3)}>
        <IsoBox at={LECTERN.at} size={LECTERN.size} tone="paper" />
        <IsoFace
          face="left"
          at={[LECTERN.at[0], LECTERN.at[1] + LECTERN.size[1], LECTERN.at[2] + LECTERN.size[2]]}
        >
          <Rects rects={[[0.25, 0.3, 0.7, 0.3]]} className="fill-violet" />
        </IsoFace>
      </g>

      {/* Calendar lying flat: three day columns */}
      <g className="rise-in" style={riseDelay(STEP * 2)}>
        <IsoShadow at={CAL.at} size={[CAL.size[0], CAL.size[1]]} />
        <IsoBox at={CAL.at} size={CAL.size} tone="paper">
          <Rects rects={[[0.45, 0.35, 4.65, 0.6]]} className="fill-lavender" r={0.3} />
          {DAY_U.map((u, i) => (
            <g key={u}>
              <rect
                x={u}
                y={1.3}
                width={DAY_W}
                height={2.6}
                rx={0.2}
                className={i === 1 ? "fill-violet" : "fill-lavender-soft"}
              />
              <Rects
                rects={SESSIONS.map((v) => [u + 0.2, v, DAY_W - 0.4, 0.4] as const)}
                className={i === 1 ? "fill-white/85" : "fill-lavender"}
              />
            </g>
          ))}
        </IsoBox>
      </g>

      {/* Audience seats in front of the stage */}
      {SEATS.map((x, i) => (
        <IsoBox
          key={x}
          at={[x, 4.8, 0]}
          size={[0.7, 0.6, 0.6]}
          tone="lavender"
          className="rise-in"
          style={riseDelay(STEP * 3 + i * 60)}
        />
      ))}

      {/* Ticket stub */}
      <g className="rise-in" style={riseDelay(STEP * 4)}>
        <IsoShadow at={TICKET.at} size={TICKET.size} />
        <IsoTile at={TICKET.at} size={TICKET.size} tone="blush">
          <Rects rects={[[0.45, 0.6, 2.4, 0.4], [0.45, 1.3, 1.6, 0.3]]} className="fill-ink/15" />
          {PERF.map((v) => (
            <circle key={v} cx={3.6} cy={v} r={0.11} className="fill-white" />
          ))}
          <circle cx={4.3} cy={1.2} r={0.4} className="fill-violet" />
        </IsoTile>
      </g>

      {/* Shopping bag for checkout */}
      <g className="rise-in" style={riseDelay(STEP * 5)}>
        <IsoShadow at={BAG.at} size={[bw, bd]} />
        <IsoBox at={BAG.at} size={BAG.size} tone="violet" />
        <IsoFace face="left" at={[bx, by + bd, top]}>
          <Rects rects={[[0, 0.5, bw, 0.3]]} className="fill-white/25" r={0} />
          <circle cx={bw / 2} cy={1.55} r={0.4} className="fill-white" />
        </IsoFace>
        <path
          d={pathD(...handle)}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-violet"
        />
      </g>

      <Extra size={size}>
        {/* Accommodation: a hotel block */}
        <g className="rise-in" style={riseDelay(STEP * 6)}>
          <IsoShadow at={[14.8, 1.4, 0]} size={[2.4, 2.4]} />
          <IsoBox at={[14.8, 1.4, 0]} size={[2.4, 2.4, 3.6]} tone="paper" />
          <IsoFace face="left" at={[14.8, 3.8, 3.6]}>
            <Rects rects={grid(0.4, 0.5, 2, 3, 0.6, 0.6, 0.4, 0.4)} className="fill-lavender" r={0.1} />
          </IsoFace>
          <IsoFace face="right" at={[17.2, 3.8, 3.6]}>
            <Rects rects={grid(0.4, 0.5, 2, 3, 0.6, 0.6, 0.4, 0.4)} className="fill-lavender/70" r={0.1} />
          </IsoFace>
        </g>
        {/* Merchandise boxes */}
        <g className="rise-in" style={riseDelay(STEP * 6 + 80)}>
          <IsoShadow at={[14.8, 6.8, 0]} size={[1.9, 1.9]} />
          <IsoBox at={[14.8, 6.8, 0]} size={[1.9, 1.9, 1.2]} tone="lavender" />
          <IsoBox at={[15.2, 7.2, 1.2]} size={[1.1, 1.1, 0.9]} tone="blush" />
        </g>
      </Extra>
    </>
  );
}

/** A `cols × rows` grid of equal rects starting at (u, v). */
function grid(u: number, v: number, cols: number, rows: number, w: number, h: number, gu: number, gv: number): Rect[] {
  return Array.from({ length: cols * rows }, (_, i) => [
    u + (i % cols) * (w + gu),
    v + Math.floor(i / cols) * (h + gv),
    w,
    h,
  ]);
}

/* ------------------------------------------------------------------ */
/* Agency: bold, animation-rich site on a CMS and a Postgres database  */
/* ------------------------------------------------------------------ */

/** Poster panels: thin upright slabs, back to front */
const POSTER_D = 0.5;
const POSTERS = {
  paper: { at: [6.4, 0.6, 0] as Vec3, w: 4, h: 5 },
  ink: { at: [7.8, 2.2, 0] as Vec3, w: 4, h: 4.4 },
  violet: { at: [9.8, 3.6, 0] as Vec3, w: 4, h: 3.4 },
};

const DB = { x: 1.2, y: 1.2, w: 2.6, unit: 0.9, gap: 0.2 };
const DB_UNITS = [0, 1, 2].map((i) => i * (DB.unit + DB.gap));

const CMS = { x: 1.5, y: 5.6, w: 3.8, d: 2.8, h: 0.35 };
const CMS_CARDS = [
  { z: 0, tone: "paper" as const },
  { z: CMS.h, tone: "lavender" as const },
  { z: CMS.h * 2, tone: "paper" as const },
];

function Poster({
  at: [x, y, z],
  w,
  h,
  tone,
  delay,
  children,
}: {
  at: Vec3;
  w: number;
  h: number;
  tone: "paper" | "ink" | "violet";
  delay: number;
  children: ReactNode;
}) {
  return (
    <g className="rise-in" style={riseDelay(delay)}>
      <IsoShadow at={[x, y, z]} size={[w, POSTER_D]} />
      <IsoBox at={[x, y, z]} size={[w, POSTER_D, h]} tone={tone} />
      <IsoFace face="left" at={[x, y + POSTER_D, z + h]}>
        {children}
      </IsoFace>
    </g>
  );
}

function AgencyScene({ size }: { size: Size }) {
  const { paper, ink, violet } = POSTERS;
  return (
    <>
      <IsoGround size={FRAME[size].plate} className="rise-in" style={riseDelay(0)} />

      <Routes
        delay={STEP * 7}
        routes={[
          [
            [4.05, 2.5, 0],
            [6, 2.5, 0],
            [6, 3.3, 0],
            [8.3, 3.3, 0],
          ],
          [
            [5.55, 7, 0],
            [10.6, 7, 0],
            [10.6, 4.3, 0],
          ],
        ]}
      />

      {/* Database: stacked ink discs with violet status dots */}
      <IsoShadow at={[DB.x, DB.y, 0]} size={[DB.w, DB.w]} />
      {DB_UNITS.map((z, i) => (
        <g key={z} className="rise-in" style={riseDelay(STEP * (i + 1))}>
          <IsoBox at={[DB.x, DB.y, z]} size={[DB.w, DB.w, DB.unit]} tone="ink" />
          <IsoFace face="left" at={[DB.x, DB.y + DB.w, z + DB.unit]}>
            <Rects rects={[[0.35, 0.33, 1.1, 0.24]]} className="fill-white/15" r={0.12} />
            <circle cx={1.85} cy={0.45} r={0.15} className="fill-violet" />
            <circle cx={2.25} cy={0.45} r={0.15} className={i === 2 ? "fill-lavender" : "fill-violet"} />
          </IsoFace>
        </g>
      ))}

      {/* CMS: a stack of three content cards */}
      <g className="rise-in" style={riseDelay(STEP * 2)}>
        <IsoShadow at={[CMS.x, CMS.y, 0]} size={[CMS.w, CMS.d]} />
        {CMS_CARDS.map(({ z, tone }, i) => (
          <IsoBox key={z} at={[CMS.x - i * 0.15, CMS.y - i * 0.15, z]} size={[CMS.w, CMS.d, CMS.h]} tone={tone} />
        ))}
        <IsoFace face="top" at={[CMS.x - 0.3, CMS.y - 0.3, CMS.h * 3]}>
          <rect x={0.35} y={0.35} width={1.4} height={2.1} rx={0.2} className="fill-lavender" />
          <circle cx={1.05} cy={1.05} r={0.3} className="fill-blush" />
          <Rects rects={[[2.05, 0.5, 1.4, 0.3], [2.05, 1.1, 1.0, 0.3], [2.05, 1.7, 1.25, 0.3]]} className="fill-ink/15" />
        </IsoFace>
      </g>

      {/* Poster stack */}
      <Poster at={paper.at} w={paper.w} h={paper.h} tone="paper" delay={STEP * 3}>
        <rect x={0.4} y={0.4} width={paper.w - 0.8} height={2.6} rx={0.3} className="fill-lavender" />
        <circle cx={1.4} cy={1.4} r={0.55} className="fill-blush" />
        <Rects rects={[[0.4, 3.4, 2.6, 0.35]]} className="fill-ink/15" />
      </Poster>
      <Poster at={ink.at} w={ink.w} h={ink.h} tone="ink" delay={STEP * 4}>
        <Rects
          rects={[
            [0.4, 0.45, 3.1, 0.55],
            [0.4, 1.25, 2.3, 0.55],
            [0.4, 2.05, 2.7, 0.55],
          ]}
          className="fill-lavender"
          r={0.32}
        />
        <Rects rects={[[0.4, 2.85, 1.6, 0.3]]} className="fill-lavender/40" />
      </Poster>
      <Poster at={violet.at} w={violet.w} h={violet.h} tone="violet" delay={STEP * 5}>
        <circle cx={violet.w / 2} cy={1.5} r={1} className="fill-white/20" />
        <polygon points="1.65,0.95 1.65,2.05 2.6,1.5" className="fill-white" />
        <Rects rects={[[0.5, 2.8, 3, 0.25]]} className="fill-white/30" r={0.12} />
        <Rects rects={[[0.5, 2.8, 1.3, 0.25]]} className="fill-white" r={0.12} />
      </Poster>

      {/* Motion accents: floating blush and lavender cubes */}
      <g className="rise-in" style={riseDelay(STEP * 6)}>
        <IsoShadow at={[11.8, 6.4, 0]} size={[1.2, 1.2]} />
        <IsoBox at={[11.8, 6.4, 1]} size={[1.2, 1.2, 1.2]} tone="blush" />
        <IsoBox at={[13, 5.4, 2.4]} size={[0.6, 0.6, 0.6]} tone="lavender" />
      </g>

      <Extra size={size}>
        {/* Phone showing the same bold poster */}
        <g className="rise-in" style={riseDelay(STEP * 6)}>
          <IsoShadow at={[15, 2.2, 0]} size={[2.2, 0.45]} />
          <IsoBox at={[15, 2.2, 0]} size={[2.2, 0.45, 4]} tone="ink" />
          <IsoFace face="left" at={[15, 2.65, 4]}>
            <rect x={0.2} y={0.3} width={1.8} height={3.4} rx={0.25} className="fill-violet" />
            <polygon points="0.85,1.4 0.85,2.2 1.55,1.8" className="fill-white" />
            <Rects rects={[[0.45, 2.85, 1.3, 0.25]]} className="fill-white/40" r={0.12} />
          </IsoFace>
        </g>
        {/* Reel tiles */}
        <g className="rise-in" style={riseDelay(STEP * 6 + 80)}>
          <IsoTile at={[14.6, 6.6, 0]} size={[2.8, 2.2]} tone="lavender">
            {[0.35, 1.25, 2.15].map((u, i) => (
              <rect key={u} x={u} y={0.45} width={0.7} height={1.3} rx={0.15} className={i === 1 ? "fill-violet" : "fill-white"} />
            ))}
          </IsoTile>
        </g>
      </Extra>
    </>
  );
}

/**
 * Isometric project illustration used in place of a screenshot on the home
 * page cards (`card`) and the /work rows (`feature`). Decorative.
 */
export function ProjectScene({ scene, size = "card" }: { scene: ProjectSceneName; size?: Size }) {
  const { viewBox, origin } = FRAME[size];
  return (
    <IsoScene viewBox={viewBox} origin={origin}>
      {scene === "event" ? <EventScene size={size} /> : <AgencyScene size={size} />}
    </IsoScene>
  );
}
