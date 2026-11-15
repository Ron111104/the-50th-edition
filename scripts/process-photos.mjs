// Turns everything in /photos into web-ready images + a manifest.
// Run with: npm run photos
// Output: public/photos/<name>-<width>.webp and src/data/photos.json
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "photos";
const OUT = "public/photos";
const MANIFEST = "src/data/photos.json";
const WIDTHS = [480, 960, 1600];

const meta = JSON.parse(await fs.readFile(path.join(SRC, "meta.json"), "utf8"));
await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

const files = (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f));
const manifest = {};

for (const file of files) {
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const input = sharp(path.join(SRC, file)).rotate(); // respect EXIF orientation
  const { width, height } = await input.metadata().then(async (m) => {
    // metadata() is pre-rotation; normalise by rendering once
    const buf = await sharp(path.join(SRC, file)).rotate().toBuffer({ resolveWithObject: true });
    return buf.info;
  });

  // Never upscale: keep only widths smaller than the original, plus the original width.
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), width])];
  for (const w of widths) {
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width: w })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${name}-${w}.webp`));
  }

  const blur = await sharp(path.join(SRC, file)).rotate().resize({ width: 16 }).webp({ quality: 40 }).toBuffer();

  manifest[name] = {
    width,
    height,
    widths,
    blur: `data:image/webp;base64,${blur.toString("base64")}`,
    focus: meta[name]?.focus ?? "50% 50%",
    alt: meta[name]?.alt ?? "",
  };
  if (!meta[name]) console.warn(`! ${name}: no entry in photos/meta.json (using defaults)`);
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`Processed ${files.length} photos -> ${OUT}, manifest -> ${MANIFEST}`);
