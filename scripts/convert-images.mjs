import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const QUALITY = 80;

async function convert(dir) {
  const entries = await readdir(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    const s = await stat(full);
    if (s.isDirectory()) {
      await convert(full);
      continue;
    }
    const ext = extname(entry).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    const outPath = full.replace(ext, '.webp');
    try {
      await sharp(full).webp({ quality: QUALITY }).toFile(outPath);
      console.log(`  ✓ ${entry} → ${entry.replace(ext, '.webp')}`);
    } catch (err) {
      console.error(`  ✗ ${entry}: ${err.message}`);
    }
  }
}

console.log('Converting images to WebP...');
await convert(PUBLIC_DIR);
console.log('Done!');
