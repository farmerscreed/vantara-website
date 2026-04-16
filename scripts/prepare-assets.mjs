// Asset preparation script for Vantara International website.
//
// - Removes solid backgrounds from the logos (navy for dark, white for light).
// - Converts renders + hero still to optimized WebP.
// - Generates favicon (32x32 + 512x512) and OG image (1200x630).
//
// Run with:  node scripts/prepare-assets.mjs
// Idempotent: safe to re-run.

import sharp from "sharp";
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const SRC = {
  logoDark: path.join(ROOT, "Logo_Dark.png"),
  logoLight: path.join(ROOT, "Logo_Light.png"),
  heroStill: path.join(ROOT, "Hero_Still.png"),
  render01: path.join(ROOT, "Render_01.png"),
  render02: path.join(ROOT, "Render_02.jpg"),
  render03: path.join(ROOT, "Render_03.png"),
  render04: path.join(ROOT, "Render_04.jpg"),
};
const OUT_IMG = path.join(ROOT, "public", "images");
const OUT_PUB = path.join(ROOT, "public");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// Remove a solid background color by converting near-matches to transparent.
// Uses squared Euclidean distance in RGB space.
async function removeBackground(inputPath, outputPath, targetRgb, tolerance = 48) {
  const img = sharp(inputPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  if (channels !== 4) throw new Error(`Expected 4 channels, got ${channels}`);

  const [tr, tg, tb] = targetRgb;
  const tolSq = tolerance * tolerance;
  const buf = Buffer.from(data);

  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i];
    const g = buf[i + 1];
    const b = buf[i + 2];
    const dr = r - tr;
    const dg = g - tg;
    const db = b - tb;
    const distSq = dr * dr + dg * dg + db * db;

    if (distSq <= tolSq) {
      // Fade out alpha based on how close the pixel is to the target color.
      const t = Math.sqrt(distSq) / tolerance; // 0..1
      buf[i + 3] = Math.round(buf[i + 3] * t);
    }
  }

  await sharp(buf, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
  console.log(`  ✓ ${path.relative(ROOT, outputPath)}`);
}

async function toWebp(inputPath, outputPath, { width, quality = 82 } = {}) {
  let pipeline = sharp(inputPath);
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  await pipeline.webp({ quality }).toFile(outputPath);
  console.log(`  ✓ ${path.relative(ROOT, outputPath)}`);
}

async function toJpeg(inputPath, outputPath, { width, quality = 82 } = {}) {
  let pipeline = sharp(inputPath);
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outputPath);
  console.log(`  ✓ ${path.relative(ROOT, outputPath)}`);
}

async function main() {
  await mkdir(OUT_IMG, { recursive: true });

  console.log("\n1. Removing logo backgrounds...");
  if (await exists(SRC.logoDark)) {
    // Logo_Dark has a solid navy (#0A1628) background. Remove it.
    await removeBackground(SRC.logoDark, path.join(OUT_IMG, "logo-dark.png"), [10, 22, 40], 40);
  }
  if (await exists(SRC.logoLight)) {
    // Logo_Light has a solid white (#FFFFFF) background. Remove it.
    await removeBackground(SRC.logoLight, path.join(OUT_IMG, "logo-light.png"), [255, 255, 255], 30);
  }

  console.log("\n2. Converting renders to WebP + JPEG fallback...");
  const renderMap = [
    ["render01", SRC.render01, "render-01"],
    ["render02", SRC.render02, "render-02"],
    ["render03", SRC.render03, "render-03"],
    ["render04", SRC.render04, "render-04"],
  ];
  for (const [, src, name] of renderMap) {
    if (!(await exists(src))) continue;
    await toWebp(src, path.join(OUT_IMG, `${name}.webp`), { width: 1920, quality: 80 });
    await toJpeg(src, path.join(OUT_IMG, `${name}.jpg`), { width: 1920, quality: 80 });
  }

  console.log("\n3. Processing hero still...");
  if (await exists(SRC.heroStill)) {
    await toWebp(SRC.heroStill, path.join(OUT_IMG, "hero-still.webp"), { width: 1920, quality: 82 });
    await toJpeg(SRC.heroStill, path.join(OUT_IMG, "hero-still.jpg"), { width: 1920, quality: 82 });
  }

  console.log("\n4. Generating favicon + apple-touch-icon from logo...");
  const logoForIcon = SRC.logoLight; // logo on transparent bg works for either
  if (await exists(logoForIcon)) {
    // Use the transparent version we just produced if it exists, otherwise fall back.
    const transparentLogo = path.join(OUT_IMG, "logo-light.png");
    const source = (await exists(transparentLogo)) ? transparentLogo : logoForIcon;

    // Build a square 512 icon with navy background + logo trimmed + centered.
    const trimmed = await sharp(source).trim().toBuffer();
    const padded = await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 10, g: 22, b: 40, alpha: 1 },
      },
    })
      .composite([{ input: await sharp(trimmed).resize({ width: 420, fit: "inside" }).toBuffer(), gravity: "center" }])
      .png()
      .toBuffer();

    await writeFile(path.join(OUT_PUB, "apple-touch-icon.png"), padded);
    console.log(`  ✓ public/apple-touch-icon.png`);

    // 32x32 favicon (PNG — Next.js picks it up as icon automatically)
    await sharp(padded).resize(32, 32).png().toFile(path.join(OUT_PUB, "icon.png"));
    console.log(`  ✓ public/icon.png`);

    // 512 square for manifest / social
    await sharp(padded).toFile(path.join(OUT_PUB, "icon-512.png"));
    console.log(`  ✓ public/icon-512.png`);
  }

  console.log("\n5. Generating OG image (1200x630) from render-01...");
  const bestRender = await exists(path.join(OUT_IMG, "render-01.jpg"))
    ? path.join(OUT_IMG, "render-01.jpg")
    : SRC.render01;
  if (await exists(bestRender)) {
    await sharp(bestRender)
      .resize({ width: 1200, height: 630, fit: "cover", position: "center" })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(path.join(OUT_PUB, "og-image.jpg"));
    console.log(`  ✓ public/og-image.jpg`);
  }

  console.log("\nDone.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
