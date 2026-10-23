import type { CSSProperties } from "react";

/**
 * Isometric illustration kit: one projection and one shading map for every
 * scene on the site. See docs/design-system.md §1 "Isometric illustrations".
 *
 * Axes: +x runs down-right, +y runs down-left, +z runs up. The viewer looks
 * from +x/+y/+z, so a box shows its top, its "left" face (the y = y + depth
 * side, lower left) and its "right" face (the x = x + width side, lower right).
 */

/** viewBox pixels per iso unit */
export const ISO_UNIT = 16;

/** Thickness of an `IsoTile`; objects standing on a tile at z start at z + ISO_TILE_H */
export const ISO_TILE_H = 0.25;

const C = Math.cos(Math.PI / 6);

export type Vec3 = [x: number, y: number, z: number];

/** Project an iso point to 2D viewBox coordinates (relative to the scene origin). */
export function iso([x, y, z]: Vec3): [number, number] {
  return [(x - y) * C * ISO_UNIT, (x + y) * 0.5 * ISO_UNIT - z * ISO_UNIT];
}

const round = (n: number) => Math.round(n * 100) / 100;

/** SVG `points` attribute for a polygon through iso points. */
export function points(...v: Vec3[]): string {
  return v
    .map((p) => {
      const [x, y] = iso(p);
      return `${round(x)},${round(y)}`;
    })
    .join(" ");
}

/** SVG path `d` for an open polyline through iso points (connectors, routes). */
export function pathD(...v: Vec3[]): string {
  return v
    .map((p, i) => {
      const [x, y] = iso(p);
      return `${i === 0 ? "M" : "L"}${round(x)} ${round(y)}`;
    })
    .join(" ");
}

export type IsoFaceName = "top" | "left" | "right";

/**
 * SVG `matrix(…)` mapping flat 2D (u, v) — in iso units — onto a box face.
 * - top: `at` is the back corner (x, y, z + h); u runs along +x, v along +y.
 * - left: `at` is the top-left corner (x, y + d, z + h); u runs along +x, v down.
 * - right: `at` is the top-front corner (x + w, y + d, z + h); u runs back along −y, v down.
 */
export function faceMatrix(face: IsoFaceName, at: Vec3): string {
  const [e, f] = iso(at);
  const U = ISO_UNIT;
  const m =
    face === "top"
      ? [C * U, 0.5 * U, -C * U, 0.5 * U]
      : face === "left"
        ? [C * U, 0.5 * U, 0, U]
        : [C * U, -0.5 * U, 0, U];
  return `matrix(${[...m, e, f].map(round).join(" ")})`;
}

export type IsoTone = "violet" | "lavender" | "paper" | "blush" | "ink";

/**
 * Face fills per tone, token classes only. Side faces are drawn in `side`, then
 * shaded with an ink overlay: `shade[0]` on the left face, `shade[1]` on the right.
 */
export const ISO_TONES: Record<
  IsoTone,
  { top: string; side: string; shade: [string, string] }
> = {
  violet: {
    top: "fill-lavender",
    side: "fill-violet",
    shade: ["fill-ink/5", "fill-ink/15"],
  },
  lavender: {
    top: "fill-lavender-soft",
    side: "fill-lavender",
    shade: ["fill-ink/5", "fill-ink/12"],
  },
  paper: {
    top: "fill-white",
    side: "fill-lavender-soft",
    shade: ["fill-ink/3", "fill-ink/8"],
  },
  blush: {
    top: "fill-blush",
    side: "fill-blush",
    shade: ["fill-ink/6", "fill-ink/12"],
  },
  ink: {
    top: "fill-ink-soft",
    side: "fill-ink-soft",
    shade: ["fill-ink/50", "fill-ink/80"],
  },
};

/** Inline style for a staggered `.rise-in` entrance. */
export const riseDelay = (ms: number) =>
  ({ "--delay": `${ms}ms` }) as CSSProperties;
