import fs from "node:fs";
import path from "node:path";
import { homepage } from "@/content/homepage";

export type MarketingScreenshot = {
  src: string;
  title: string;
  description: string;
  alt: string;
};

export function resolveMarketingImage(filename: string): string {
  const screenshot = `/screenshots/${filename}`;
  if (fs.existsSync(path.join(process.cwd(), "public", screenshot))) {
    return screenshot;
  }
  const base = path.join(process.cwd(), "public", "docs-images", filename);
  if (fs.existsSync(base)) {
    return `/docs-images/${filename}`;
  }
  const alt = filename.replace(/\.webp$/i, ".png");
  const altPath = path.join(process.cwd(), "public", "docs-images", alt);
  if (alt !== filename && fs.existsSync(altPath)) {
    return `/docs-images/${alt}`;
  }
  throw new Error(`Marketing screenshot not found: ${filename}`);
}

export function listGalleryImages(): MarketingScreenshot[] {
  const appScreenshots = homepage.featureShowcase.map((screenshot) => ({
    ...screenshot,
    src: resolveMarketingImage(screenshot.image),
    alt: `DevStackBox ${screenshot.title.toLowerCase()} screen in the Windows desktop application`,
  }));
  const docsDir = path.join(process.cwd(), "public", "docs-images");
  if (!fs.existsSync(docsDir)) return appScreenshots;
  const extraScreenshots = fs.readdirSync(docsDir)
    .filter((filename) => /^(screenshot-|.*\.gif$)/i.test(filename) && /\.(png|jpe?g|webp|gif)$/i.test(filename))
    .filter((filename) => !homepage.featureShowcase.some((screenshot) => screenshot.image === filename))
    .sort()
    .map((filename) => {
      const title = filename.replace(/\.[^.]+$/, "").replace(/^screenshot-/, "").replace(/[-_]/g, " ");
      return {
        src: `/docs-images/${filename}`,
        title,
        description: `DevStackBox ${title.toLowerCase()} screen.`,
        alt: `DevStackBox ${title.toLowerCase()} screenshot`,
      };
    });
  return [...appScreenshots, ...extraScreenshots];
}
