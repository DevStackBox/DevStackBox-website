import { homepage } from "@/content/homepage";
export type MarketingScreenshot = {src: string; title: string; description: string; alt: string};
// Publish only reviewed captures; never discover GIFs automatically.
export function resolveMarketingImage(filename: string): string { return "/screenshots/" + filename; }
export function listGalleryImages(): MarketingScreenshot[] {
  return homepage.featureShowcase.map(item => ({...item, src: resolveMarketingImage(item.image), alt: item.description}));
}
