import { IsoBox, IsoScene, IsoShadow } from "@/components/site/iso/Iso";
import { iso, points, riseDelay, type Vec3 } from "@/lib/iso";

/** Grid pitch, tile size and tile thickness in iso units */
const PITCH = 2;
const TILE = 1.8;
const T = 0.5;
const N = 4;
/** The slot whose tile has gone missing */
const HOLE = { i: 2, j: 1 };

/** Floor tiles back to front (ascending x + y), checkered paper / lavender. */
const tiles = Array.from({ length: N * N }, (_, k) => ({ i: k % N, j: Math.floor(k / N) }))
  .filter(({ i, j }) => !(i === HOLE.i && j === HOLE.j))
  .sort((a, b) => a.i + a.j - (b.i + b.j));

/** The fallen tile: lying flat beside the grid, turned off the grid lines. */
const FALLEN = { c: [10.6, 4.4] as [number, number], angle: (28 * Math.PI) / 180 };

/**
 * A thin box rotated in the ground plane. The kit's IsoBox is axis-aligned, so
 * this builds the faces from `points`: side faces whose outward normal points
 * towards the viewer (+x/+y) are drawn, then the top.
 */
function RotatedTile() {
  const h = TILE / 2;
  const [cx, cy] = FALLEN.c;
  const cos = Math.cos(FALLEN.angle);
  const sin = Math.sin(FALLEN.angle);
  const corners: [number, number][] = [
    [-h, -h],
    [h, -h],
    [h, h],
    [-h, h],
  ].map(([u, v]) => [cx + u * cos - v * sin, cy + u * sin + v * cos]);
  const sides = corners
    .map((a, k) => [a, corners[(k + 1) % 4]] as const)
    // Edge a→b has outward normal (dy, −dx); it faces the viewer when nx + ny > 0
    .filter(([a, b]) => b[1] - a[1] - (b[0] - a[0]) > 0);
  return (
    <>
      {sides.map(([a, b]) => {
        const face = points([a[0], a[1], T], [b[0], b[1], T], [b[0], b[1], 0], [a[0], a[1], 0]);
        return (
          <g key={a.join()}>
            <polygon points={face} className="fill-blush" />
            <polygon points={face} className="fill-ink/12" />
          </g>
        );
      })}
      <polygon points={points(...corners.map(([x, y]): Vec3 => [x, y, T]))} className="fill-blush" />
    </>
  );
}

/**
 * 404 illustration: a 4×4 floor of tiles with one missing, the lost tile lying
 * beside the grid and a dotted violet arc tracing where it went. Decorative.
 */
export function LostTile({ className = "" }: { className?: string }) {
  const g = (PITCH - TILE) / 2;
  const from = iso([HOLE.i * PITCH + 1, HOLE.j * PITCH + 1, T]);
  const to = iso([FALLEN.c[0], FALLEN.c[1], T + 0.3]);
  const ctrl = iso([(HOLE.i * PITCH + 1 + FALLEN.c[0]) / 2, (HOLE.j * PITCH + 1 + FALLEN.c[1]) / 2, 4]);

  return (
    <IsoScene viewBox={[300, 190]} origin={[146, 44]} className={className}>
      <g className="rise-in" style={riseDelay(0)}>
        <IsoShadow at={[0, 0, 0]} size={[N * PITCH, N * PITCH]} />
      </g>

      {tiles.map(({ i, j }) => (
        <IsoBox
          key={`${i}-${j}`}
          at={[i * PITCH + g, j * PITCH + g, 0]}
          size={[TILE, TILE, T]}
          tone={(i + j) % 2 === 0 ? "paper" : "lavender"}
          className="rise-in"
          style={riseDelay(100 + (i + j) * 60)}
        />
      ))}

      <g className="rise-in" style={riseDelay(600)}>
        <path
          d={`M${from[0]} ${from[1]} Q${ctrl[0]} ${ctrl[1]} ${to[0]} ${to[1]}`}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="1 6"
          className="stroke-violet"
        />
      </g>
      <g className="rise-in" style={riseDelay(760)}>
        <RotatedTile />
      </g>
    </IsoScene>
  );
}
