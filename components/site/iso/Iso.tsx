import type { CSSProperties, ReactNode } from "react";
import {
  faceMatrix,
  ISO_TILE_H,
  ISO_TONES,
  points,
  type IsoFaceName,
  type IsoTone,
  type Vec3,
} from "@/lib/iso";

type SceneProps = {
  /** viewBox width and height */
  viewBox: [number, number];
  /** Where iso (0, 0, 0) sits in the viewBox */
  origin: [number, number];
  /** Accessible name; omit for decorative scenes (rendered aria-hidden) */
  label?: string;
  className?: string;
  children: ReactNode;
};

/** The SVG frame every isometric scene renders in. Scales with its width. */
export function IsoScene({
  viewBox: [w, h],
  origin: [ox, oy],
  label,
  className = "",
  children,
}: SceneProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      className={`block h-auto w-full overflow-visible ${className}`}
      {...(label ? { role: "img" } : { "aria-hidden": true })}
    >
      {label && <title>{label}</title>}
      <g transform={`translate(${ox} ${oy})`}>{children}</g>
    </svg>
  );
}

type FaceProps = {
  face: IsoFaceName;
  /** Face origin corner — see `faceMatrix` in lib/iso.ts */
  at: Vec3;
  children: ReactNode;
};

/** Draw flat 2D content (in iso units) onto a box face. */
export function IsoFace({ face, at, children }: FaceProps) {
  return <g transform={faceMatrix(face, at)}>{children}</g>;
}

type BoxProps = {
  at: Vec3;
  /** [width along x, depth along y, height along z] */
  size: Vec3;
  tone?: IsoTone;
  /** Applied to the box's group, e.g. `rise-in` */
  className?: string;
  style?: CSSProperties;
  /** Drawn on the top face, in top-face coordinates (u along x, v along y) */
  children?: ReactNode;
};

/** A shaded isometric box. Draw boxes back to front: ascending x + y, then z. */
export function IsoBox({
  at: [x, y, z],
  size: [w, d, h],
  tone = "paper",
  className,
  style,
  children,
}: BoxProps) {
  const t = ISO_TONES[tone];
  const top = points([x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]);
  const left = points([x, y + d, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x, y + d, z]);
  const right = points([x + w, y, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x + w, y, z]);
  return (
    <g className={className} style={style}>
      <polygon points={left} className={t.side} />
      <polygon points={left} className={t.shade[0]} />
      <polygon points={right} className={t.side} />
      <polygon points={right} className={t.shade[1]} />
      <polygon points={top} className={t.top} />
      {children && (
        <IsoFace face="top" at={[x, y, z + h]}>
          {children}
        </IsoFace>
      )}
    </g>
  );
}

type TileProps = {
  at: Vec3;
  /** [width along x, depth along y] */
  size: [number, number];
  tone?: IsoTone;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** A thin plate: floors, screens lying flat, small pads. */
export function IsoTile({ at, size: [w, d], ...rest }: TileProps) {
  return <IsoBox at={at} size={[w, d, ISO_TILE_H]} {...rest} />;
}

type GroundProps = {
  /** [width along x, depth along y]; the plate spans (0, 0) → (w, d) */
  size: [number, number];
  /** Dot grid spacing in iso units; `false` for a plain plate */
  dots?: number | false;
  /** Plate thickness below the ground surface */
  depth?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * The shared ground plate every scene stands on: a paper slab whose top
 * surface is z = 0 (stand objects at z = 0), with a faint violet dot grid.
 * The dots are one path of near-zero-length round-capped segments (not
 * exactly zero: some renderers skip caps on those), so a large
 * plate costs two elements, not hundreds.
 */
export function IsoGround({
  size: [w, d],
  dots = 2,
  depth = 0.6,
  className,
  style,
}: GroundProps) {
  let grid = "";
  if (dots) {
    for (let r = 0; (r + 0.5) * dots < d; r++) {
      for (let c = 0; (c + 0.5) * dots < w; c++) {
        grid += `M${(c + 0.5) * dots} ${(r + 0.5) * dots}h0.001`;
      }
    }
  }
  return (
    <g className={className} style={style}>
      <IsoBox at={[0, 0, -depth]} size={[w, d, depth]} tone="paper" />
      {grid && (
        <IsoFace face="top" at={[0, 0, 0]}>
          <path
            d={grid}
            fill="none"
            strokeWidth={0.24}
            strokeLinecap="round"
            className="stroke-violet/15"
          />
        </IsoFace>
      )}
    </g>
  );
}

/** A soft ground shadow under an object footprint. Draw it before the object. */
export function IsoShadow({
  at: [x, y, z],
  size: [w, d],
}: {
  at: Vec3;
  size: [number, number];
}) {
  const o = 0.4;
  return (
    <polygon
      points={points(
        [x + o, y + o, z],
        [x + w + o, y + o, z],
        [x + w + o, y + d + o, z],
        [x + o, y + d + o, z]
      )}
      className="fill-ink/8"
    />
  );
}
