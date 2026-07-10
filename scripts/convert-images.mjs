import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, parse } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const IMAGES_DIR = join(__dirname, "..", "public", "images");
const QUALITY = 80;

const IMAGE_CONFIG = {
  "image":       { w: 190, h: 190, retina: true, srcset: false, eager: true },
  "profile":     { w: 400, h: 500, retina: true, srcset: false, eager: true },
  "earth-bg":    { w: 800, h: 800, retina: false, srcset: false, eager: true },
  "moon":        { w: 80, h: 80, retina: false, srcset: false, eager: false },
  "lifeos":      { w: 510, h: 260, retina: true, srcset: true, eager: false },
  "belleville":  { w: 510, h: 260, retina: true, srcset: true, eager: false },
  "crust":       { w: 510, h: 260, retina: true, srcset: true, eager: false },
  "graphic":     { w: 510, h: 260, retina: true, srcset: true, eager: false },
  "port":        { w: 510, h: 260, retina: true, srcset: true, eager: false },
  "solibu":      { w: 510, h: 260, retina: true, srcset: true, eager: false },
};

function getMaxDimensions(name) {
  const cfg = IMAGE_CONFIG[name];
  if (!cfg) return null;
  const maxW = cfg.retina ? cfg.w * 2 : cfg.w;
  const maxH = cfg.retina ? cfg.h * 2 : cfg.h;
  return { maxW, maxH, srcset: cfg.srcset, eager: cfg.eager };
}

async function convertImage(srcPath) {
  const ext = extname(srcPath).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return;
  const baseName = parse(srcPath).name;
  const imageName = baseName.replace(".original", "");
  const meta = await sharp(srcPath).metadata();
  const origW = meta.width;
  const origH = meta.height;
  console.log("  " + imageName + ": " + origW + "x" + origH + " original");

  const dims = getMaxDimensions(imageName);
  if (!dims) {
    const outPath = join(IMAGES_DIR, imageName + ".webp");
    await sharp(srcPath).webp({ quality: QUALITY }).toFile(outPath);
    const m = await sharp(outPath).metadata();
    console.log("  -> " + imageName + ".webp (" + m.width + "x" + m.height + ", " + (m.size / 1024).toFixed(1) + " KB)");
    return;
  }

  const { maxW, maxH, srcset } = dims;
  let resizeW = origW;
  let resizeH = origH;

  if (origW > maxW || origH > maxH) {
    const ratio = Math.min(maxW / origW, maxH / origH);
    resizeW = Math.round(origW * ratio);
    resizeH = Math.round(origH * ratio);
    console.log("  Resizing to " + resizeW + "x" + resizeH + " (max " + maxW + "x" + maxH + ")");
  }

  if (srcset) {
    for (const { width, suffix } of [
      { width: 300, suffix: "300w" },
      { width: 600, suffix: "600w" },
      { width: resizeW, suffix: "full" },
    ]) {
      const outPath = join(IMAGES_DIR, imageName + "-" + suffix + ".webp");
      await sharp(srcPath).resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(outPath);
      const m = await sharp(outPath).metadata();
      console.log("  -> " + imageName + "-" + suffix + ".webp (" + m.width + "x" + m.height + ", " + (m.size / 1024).toFixed(1) + " KB)");
    }
  } else {
    const outPath = join(IMAGES_DIR, imageName + ".webp");
    await sharp(srcPath).resize({ width: resizeW, height: resizeH, fit: "inside", withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(outPath);
    const m = await sharp(outPath).metadata();
    console.log("  -> " + imageName + ".webp (" + m.width + "x" + m.height + ", " + (m.size / 1024).toFixed(1) + " KB)");
  }
}

async function main() {
  console.log("Processing images in public/images/...");
  const entries = await readdir(IMAGES_DIR);
  for (const entry of entries.sort()) {
    const full = join(IMAGES_DIR, entry);
    const s = await stat(full);
    if (s.isDirectory()) continue;
    const ext = extname(entry).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    if (!entry.includes(".original.")) continue;
    await convertImage(full);
    console.log("");
  }
  console.log("Done!");
}

main().catch(console.error);