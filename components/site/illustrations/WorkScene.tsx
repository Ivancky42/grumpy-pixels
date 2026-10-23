import { IsoBox, IsoGround, IsoScene, IsoShadow } from "@/components/site/iso/Iso";
import { iso, pathD, riseDelay, type Vec3 } from "@/lib/iso";

/** Ground plate size in iso units */
const PLATE: [number, number] = [18, 11];
/** Browser window slab: [width along x, depth along y, thickness] */
const WIN: Vec3 = [9, 6.5, 0.4];

/** Three windows fanned out, back to front and rising (ascending x + y, then z). */
const windows: Vec3[] = [0, 1, 2].map((i) => [0.6 + i * 4, 3.8 - i * 1.6, 1.2 + i * 1.9]);

/** Text lines on a window's screen: [u, v, length] in top-face units */
const lines: [number, number, number][] = [
  [5.4, 1.8, 2.6],
  [5.4, 2.6, 2],
  [5.4, 3.4, 2.4],
];

/** Button (top-face units) on each window; the launch route leaves from it. */
const BUTTON = { u: 5.4, v: 4.5, w: 2, h: 0.7 };

/** A flat browser window: violet title bar with dots, image block, text lines, button. */
function Screen() {
  const [w, d] = WIN;
  return (
    <>
      <rect x={0} y={0} width={w} height={1} className="fill-violet" />
      {[0.6, 1.1, 1.6].map((u) => (
        <circle key={u} cx={u} cy={0.5} r={0.18} className="fill-white" />
      ))}
      <rect x={0.6} y={1.6} width={4.2} height={d - 2.2} rx={0.25} className="fill-lavender" />
      <circle cx={3.6} cy={2.7} r={0.55} className="fill-blush" />
      <polygon points={`0.9,${d - 0.9} 2.3,3.3 3.4,4.4 3.9,3.9 4.5,${d - 0.9}`} className="fill-violet" />
      {lines.map(([u, v, len]) => (
        <rect key={v} x={u} y={v} width={len} height={0.35} rx={0.17} className="fill-lavender" />
      ))}
      <rect x={BUTTON.u} y={BUTTON.v} width={BUTTON.w} height={BUTTON.h} rx={0.35} className="fill-violet" />
    </>
  );
}

/**
 * Work page hero: a fanned stack of three browser windows with a violet
 * "launch" route leaving the front one. Decorative.
 */
export function WorkScene({ className = "" }: { className?: string }) {
  const [fx, fy, fz] = windows[windows.length - 1];
  const top = fz + WIN[2];
  const start: Vec3 = [fx + BUTTON.u + BUTTON.w, fy + BUTTON.v + BUTTON.h / 2, top];
  // Out past the window's right edge, back along -y, then up
  const rx = fx + WIN[0] + 2.4;
  const launch: Vec3[] = [start, [rx, start[1], top], [rx, fy + 2, top], [rx, fy + 2, top + 3.5]];
  const [ex, ey] = iso(launch[launch.length - 1]);

  return (
    <IsoScene viewBox={[460, 330]} origin={[190, 60]} className={className}>
      <g className="rise-in" style={riseDelay(0)}>
        <IsoGround size={PLATE} dots={2} />
        {windows.map(([x, y]) => (
          <IsoShadow key={x} at={[x, y, 0]} size={[WIN[0], WIN[1]]} />
        ))}
      </g>

      {windows.map((at, i) => (
        <IsoBox key={at[0]} at={at} size={WIN} tone="paper" className="rise-in" style={riseDelay(160 + i * 160)}>
          <Screen />
        </IsoBox>
      ))}

      <g className="rise-in" style={riseDelay(720)}>
        <path
          d={pathD(...launch)}
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-violet"
        />
        <circle cx={ex} cy={ey} r={6} className="fill-violet" />
      </g>
    </IsoScene>
  );
}
