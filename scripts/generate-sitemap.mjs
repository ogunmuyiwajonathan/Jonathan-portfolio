import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_PATH = join(ROOT, "public", "sitemap.xml");

const BASE_URL = "https://jonworld.vercel.app";
const LASTMOD = "2026-07-27";

const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/works", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

const WORK_IMAGES = [
  { src: "/images/solibu-full.webp", title: "Solibu Stories" },
  { src: "/images/lifeos-full.webp", title: "LifeOS" },
  { src: "/images/belleville-full.webp", title: "Belleville Dental Care" },
  { src: "/images/crust-full.webp", title: "Tasty Crust" },
  { src: "/images/graphic-full.webp", title: "Stalworld Tech" },
  { src: "/images/port-full.webp", title: "Portfolio Website" },
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlXml(route) {
  const loc = BASE_URL + route.path;

  if (route.path === "/works") {
    const imagesXml = WORK_IMAGES
      .map(
        (img) => `      <image:image>
        <image:loc>${BASE_URL}${escapeXml(img.src)}</image:loc>
        <image:title>${escapeXml(img.title)}</image:title>
      </image:image>`,
      )
      .join("\n");

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${imagesXml}
  </url>`;
  }

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
}

function generateSitemap() {
  const urlsXml = ROUTES.map(buildUrlXml).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlsXml}
</urlset>
`;
}

async function main() {
  const xml = generateSitemap();
  await mkdir(join(ROOT, "public"), { recursive: true });
  await writeFile(OUT_PATH, xml, "utf-8");

  const urlCount = ROUTES.length;
  const imageCount = WORK_IMAGES.length;

  console.log(`Generated sitemap → ${OUT_PATH}`);
  console.log(`  URLs:   ${urlCount}`);
  console.log(`  Images: ${imageCount}`);
}

main().catch(console.error);
