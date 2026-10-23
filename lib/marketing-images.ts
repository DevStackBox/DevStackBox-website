import { homepage } from "@/content/homepage";
import { getScreenshot } from "@/lib/screenshots";
export type MarketingScreenshot = {src: string; title: string; description: string; alt: string; caption: string; width: number; height: number};
// Publish only reviewed captures; never discover GIFs automatically.
export function resolveMarketingImage(filename: string): string { return "/screenshots/" + filename; }
export function listGalleryImages(): MarketingScreenshot[] {
  return homepage.featureShowcase.map(item => {
    const src = resolveMarketingImage(item.image);
    const metadata = getScreenshot(src);
    if (!metadata) throw new Error(`Unregistered gallery image: ${src}`);
    return {...item, src, alt: metadata.alt, caption: metadata.caption, width: metadata.width, height: metadata.height};
  });
}
