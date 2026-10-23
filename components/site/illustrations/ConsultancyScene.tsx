import {
  IsoBox,
  IsoFace,
  IsoGround,
  IsoScene,
  IsoShadow,
} from "@/components/site/iso/Iso";
import { pathD, riseDelay, type Vec3 } from "@/lib/iso";

/** Top of the ground plate: everything stands on this z. */
const G = 0;
const PLATE = 16;
/** Stagger step between scene parts, in ms */
const STEP = 80;

const lineCls = "fill-none stroke-violet";
const line = {
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Inbox: a lavender tray holding a small stack of documents. */
const TRAY = { at: [0.8, 6.5, G] as Vec3, size: [3.6, 3.6, 0.9] as Vec3 };
const TRAY_TOP = G + TRAY.size[2];
const docs: Vec3[] = [
  [1.2, 6.9, TRAY_TOP],
  [1.05, 6.75, TRAY_TOP + 0.4],
  [1.3, 7, TRAY_TOP + 0.8],
];
const DOC = 2.8;

/** The model: a violet cube on a paper plinth, a ring of dots on top. */
const PLINTH = { at: [6.5, 4.5, G] as Vec3, size: [4.6, 4.6, 0.6] as Vec3 };
const CUBE = { at: [7, 5, G + 0.6] as Vec3, size: [3.6, 3.6, 4.4] as Vec3 };
const CUBE_TOP = CUBE.at[2] + CUBE.size[2];
const ring = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  return [1.8 + Math.cos(a) * 1.15, 1.8 + Math.sin(a) * 1.15] as const;
});

/** Output task cards, back to front; the middle one is the blush highlight. */
const TASK_X = 12.8;
const TASK = 2.4;
const tasks = [1.4, 4.8, 8.2];

/** Connectors on the ground: inbox → model, model → each task. */
const connectors: Vec3[][] = [
  [
    [4.4, 8.4, G],
    [6.5, 8.4, G],
  ],
  [
    [11.1, 6.8, G],
    [11.8, 6.8, G],
  ],
  [
    [11.8, tasks[0] + TASK / 2, G],
    [11.8, tasks[2] + TASK / 2, G],
  ],
  ...tasks.map(
    (y): Vec3[] => [
      [11.8, y + TASK / 2, G],
      [TASK_X, y + TASK / 2, G],
    ]
  ),
];
const connectorDots: Vec3[] = [
  [4.4, 8.4, G],
  [6.5, 8.4, G],
  [11.1, 6.8, G],
  ...tasks.map((y): Vec3 => [TASK_X, y + TASK / 2, G]),
];

/** Roadmap: a dotted path across the front with three milestone posts. */
const roadmap: Vec3[] = [
  [1, 14.2, G],
  [5, 14.2, G],
  [5, 12.4, G],
  [9.6, 12.4, G],
  [9.6, 14.6, G],
  [14.6, 14.6, G],
];
const POST = 0.5;
const milestones = [
  { at: [5, 14.2] as const, h: 1.6 },
  { at: [9.6, 12.4] as const, h: 2.2 },
  { at: [14.6, 14.6] as const, h: 2.8 },
];

/**
 * Consultancy hero scene: documents flow from an inbox through a model block
 * into finished task cards, with a dotted roadmap and milestones across the
 * front, on the shared dotted ground plate. Decorative.
 */
export function ConsultancyScene() {
  return (
    <IsoScene
      viewBox={[480, 340]}
      origin={[240, 32]}
      className="mx-auto max-w-md lg:max-w-none"
    >
      {/* Ground plate */}
      <IsoGround size={[PLATE, PLATE]} dots={1.6} className="rise-in" style={riseDelay(0)} />

      {/* Connectors and roadmap on the ground */}
      <g className="rise-in" style={riseDelay(STEP * 3)}>
        {connectors.map((c) => (
          <path key={c.flat().join()} d={pathD(...c)} className={lineCls} {...line} />
        ))}
        {connectorDots.map((p) => (
          <IsoFace key={p.join()} face="top" at={p}>
            <circle r={0.22} className="fill-violet" />
          </IsoFace>
        ))}
      </g>
      <g className="rise-in" style={riseDelay(STEP * 2)}>
        <path
          d={pathD(...roadmap)}
          className={lineCls}
          strokeWidth={3}
          strokeDasharray="0 9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Inbox tray and documents */}
      <IsoShadow at={TRAY.at} size={[TRAY.size[0], TRAY.size[1]]} />
      <g className="rise-in" style={riseDelay(STEP)}>
        <IsoBox at={TRAY.at} size={TRAY.size} tone="lavender" />
      </g>
      {docs.map((at, i) => (
        <g key={at.join()} className="rise-in" style={riseDelay(STEP * (2 + i * 0.5))}>
          <IsoBox at={at} size={[DOC, DOC, 0.25]} tone="paper">
            {i === docs.length - 1 &&
              [1.6, 1.1, 1.4].map((w, j) => (
                <rect
                  key={j}
                  x={0.45}
                  y={0.5 + j * 0.55}
                  width={w}
                  height={0.25}
                  rx={0.12}
                  className={j === 0 ? "fill-violet" : "fill-ink/12"}
                />
              ))}
          </IsoBox>
        </g>
      ))}

      {/* Model block */}
      <IsoShadow at={PLINTH.at} size={[PLINTH.size[0], PLINTH.size[1]]} />
      <g className="rise-in" style={riseDelay(STEP * 2)}>
        <IsoBox at={PLINTH.at} size={PLINTH.size} tone="paper" />
      </g>
      <g className="rise-in" style={riseDelay(STEP * 3)}>
        <IsoBox at={CUBE.at} size={CUBE.size} tone="violet">
          <circle cx={1.8} cy={1.8} r={1.55} className="fill-white/60" />
          {ring.map(([u, v], i) => (
            <circle
              key={i}
              cx={u}
              cy={v}
              r={0.17}
              className={i % 3 === 0 ? "fill-violet" : "fill-violet/60"}
            />
          ))}
          <circle cx={1.8} cy={1.8} r={0.35} className="fill-violet" />
        </IsoBox>
        <IsoFace face="left" at={[CUBE.at[0], CUBE.at[1] + CUBE.size[1], CUBE_TOP]}>
          {[1.2, 2.2, 3.2].map((v) => (
            <rect key={v} x={0.6} y={v} width={2.4} height={0.28} rx={0.14} className="fill-white/25" />
          ))}
        </IsoFace>
      </g>

      {/* Output task cards (back right) */}
      {tasks.map((y, i) => (
        <g key={y} className="rise-in" style={riseDelay(STEP * (4 + i))}>
          <IsoShadow at={[TASK_X, y, G]} size={[TASK, TASK]} />
          <IsoBox
            at={[TASK_X, y, G]}
            size={[TASK, TASK, 0.4]}
            tone={i === 1 ? "blush" : "paper"}
          >
            <path
              d="M0.55 1 L1 1.45 L1.85 0.55"
              className={lineCls}
              strokeWidth={0.16}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x={0.5} y={1.75} width={1.4} height={0.22} rx={0.11} className="fill-ink/15" />
          </IsoBox>
        </g>
      ))}

      {/* Milestone posts, each with a small flag */}
      {milestones.map(({ at: [px, py], h }, i) => {
        const x = px - POST / 2;
        const y = py - POST / 2;
        return (
          <g key={px} className="rise-in" style={riseDelay(STEP * (3 + i))}>
            <IsoShadow at={[x, y, G]} size={[POST, POST]} />
            <IsoBox at={[x, y, G]} size={[POST, POST, h]} tone="violet" />
            <IsoBox
              at={[x + POST, y + POST / 2 - 0.06, G + h - 0.8]}
              size={[1.2, 0.12, 0.7]}
              tone={i === milestones.length - 1 ? "blush" : "paper"}
            />
          </g>
        );
      })}
    </IsoScene>
  );
}
