/**
 * One-off: renders app/opengraph-image.png (1200x630) from the horizontal
 * logo lockup on the brand cream background.
 *
 * Usage: node scripts/make-og.mjs
 */
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const WIDTH = 1200;
const HEIGHT = 630;
const LOCKUP_WIDTH = 760;

const svg = await readFile(
  path.join(ROOT, "public", "brand", "gp-horizontal-color.svg")
);
const lockup = await sharp(svg, { density: 300 })
  .resize({ width: LOCKUP_WIDTH })
  .png()
  .toBuffer();
const { height: lockupHeight = 0 } = await sharp(lockup).metadata();

await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: { r: 255, g: 247, b: 241, alpha: 1 },
  },
})
  .composite([
    {
      input: lockup,
      left: Math.round((WIDTH - LOCKUP_WIDTH) / 2),
      top: Math.round((HEIGHT - lockupHeight) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, "app", "opengraph-image.png"));

console.log("opengraph-image.png written.");
