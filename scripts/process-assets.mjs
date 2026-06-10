/**
 * One-off asset pipeline: takes the AI-generated source images and produces
 * the final, optimized brand assets used by the site.
 *
 * Usage: node scripts/process-assets.mjs
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "/Users/ivan/.cursor/projects/Users-ivan-Documents-grumpy-pixels/assets";
const ROOT = path.resolve(import.meta.dirname, "..");
const BRAND = path.join(ROOT, "public", "brand");
const APP = path.join(ROOT, "app");

await mkdir(BRAND, { recursive: true });

async function trimTransparent(input, threshold) {
  return sharp(input).trim({ threshold }).toBuffer();
}

/**
 * The image generator bakes a literal white/grey "transparency" checkerboard
 * into the background. Remove it by flood-filling from the borders: any
 * border-connected pixel that is bright and unsaturated becomes transparent.
 * Interior light pixels (eye highlights, cream text) are preserved.
 */
async function removeCheckerboard(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const isBackground = (i) => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max >= 200 && max - min <= 12;
  };

  const visited = new Uint8Array(width * height);
  const queue = [];
  const push = (x, y) => {
    const p = y * width + x;
    if (!visited[p] && isBackground(p * 4)) {
      visited[p] = 1;
      queue.push(p);
    }
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  while (queue.length) {
    const p = queue.pop();
    const x = p % width;
    const y = (p / width) | 0;
    data[p * 4 + 3] = 0;
    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }

  return sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

// --- Mascots: trim transparent margins, cap height at 640px ---
for (const [src, out] of [
  ["mascot.png", "mascot.png"],
  ["mascot-approving.png", "mascot-approving.png"],
]) {
  const cleaned = await removeCheckerboard(path.join(SRC, src));
  const trimmed = await trimTransparent(cleaned, 60);
  await sharp(trimmed)
    .resize({ height: 640, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(BRAND, out));
}

// --- Light logo lockup: remove fake transparency, trim, cap width ---
{
  const cleaned = await removeCheckerboard(path.join(SRC, "logo-light.png"));
  const trimmed = await trimTransparent(cleaned, 10);
  await sharp(trimmed)
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(path.join(BRAND, "logo-light.png"));
}

// --- Dark logo lockup: flat navy background by design (used on dark surfaces) ---
await sharp(path.join(SRC, "logo-dark-navy.png"))
  .resize({ width: 1200, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(BRAND, "logo-dark.png"));

// --- App icon: crop the 1536x1024 source to a 1024 square that keeps
// both the character and the speech bubble in frame ---
const iconSquare = await sharp(path.join(SRC, "app-icon-square.png"))
  .extract({ left: 280, top: 0, width: 1024, height: 1024 })
  .toBuffer();

await sharp(iconSquare).resize(512, 512).png().toFile(path.join(APP, "icon.png"));
await sharp(iconSquare).resize(180, 180).png().toFile(path.join(APP, "apple-icon.png"));
await sharp(iconSquare).resize(512, 512).png().toFile(path.join(BRAND, "icon.png"));

// --- favicon.ico: ICO container with PNG-encoded 16/32/48 entries ---
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(
  icoSizes.map((s) =>
    sharp(iconSquare)
      .resize(s, s)
      .ensureAlpha()
      .png({ palette: false, compressionLevel: 9 })
      .toBuffer()
  )
);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = [];
pngs.forEach((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 0); // width
  e.writeUInt8(icoSizes[i] === 256 ? 0 : icoSizes[i], 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bpp
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  entries.push(e);
});
await writeFile(
  path.join(APP, "favicon.ico"),
  Buffer.concat([header, ...entries, ...pngs])
);

// --- OG image: center-crop 1536x1024 to 1.91:1, resize to 1200x630 ---
await sharp(path.join(SRC, "og-image.png"))
  .extract({ left: 0, top: 109, width: 1536, height: 806 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(path.join(APP, "opengraph-image.png"));

console.log("Assets processed.");
