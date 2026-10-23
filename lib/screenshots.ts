import metadata from "@/content/screenshots.json";

export type ScreenshotMetadata = {
  id: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  version: string;
  sha256: string;
};

export function getScreenshot(src: string): ScreenshotMetadata | undefined {
  return (metadata as Record<string, ScreenshotMetadata>)[src];
}
