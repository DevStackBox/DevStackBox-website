import fs from "node:fs";
import path from "node:path";

const PLACEHOLDER = "/marketing/placeholder-app.svg";

/** Filenames used only in hero / showcase - excluded from the gallery grid. */
export const MARKETING_ONLY_IMAGES = new Set([
  "hero-dashboard.webp",
  "hero-dashboard.png",
  "showcase-services.webp",
  "showcase-services.png",
  "showcase-config.webp",
  "showcase-config.png",
  "showcase-dashboard.webp",
  "showcase-dashboard.png",
]);

export function resolveMarketingImage(filename: string): string {
  const base = path.join(process.cwd(), "public", "docs-images", filename);
  if (fs.existsSync(base)) {
    return `/docs-images/${filename}`;
  }
  const alt = filename.replace(/\.webp$/i, ".png");
  const altPath = path.join(process.cwd(), "public", "docs-images", alt);
  if (alt !== filename && fs.existsSync(altPath)) {
    return `/docs-images/${alt}`;
  }
  return PLACEHOLDER;
}

export function listGalleryImages(): string[] {
  const dir = path.join(process.cwd(), "public", "docs-images");
  if (!fs.existsSync(dir)) return [];
  const ext = /\.(png|jpe?g|webp|gif)$/i;
  return fs
    .readdirSync(dir)
    .filter((f) => ext.test(f) && !MARKETING_ONLY_IMAGES.has(f))
    .sort();
}
