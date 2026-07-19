import {
  BottomDownloadCta,
} from "@/components/home/bottom-download-cta";
import { BuiltFor } from "@/components/home/built-for";
import { CommunityCta } from "@/components/home/community-cta";
import { DocsPreview } from "@/components/home/docs-preview";
import { FeatureGrid } from "@/components/home/feature-grid";
import { FeatureShowcase } from "@/components/home/feature-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { LatestReleaseSection } from "@/components/home/latest-release-section";
import { OpenSourceStrip } from "@/components/home/open-source-strip";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { getLatestRelease, getRepoStats } from "@/lib/github";

export default async function HomePage() {
  const [release, stats] = await Promise.all([
    getLatestRelease(),
    getRepoStats(),
  ]);

  return (
    <>
      <HeroSection release={release} />
      <OpenSourceStrip />
      <FeatureGrid />
      <BuiltFor />
      <FeatureShowcase />
      <ScreenshotGallery />
      <LatestReleaseSection release={release} />
      <DocsPreview />
      <CommunityCta stats={stats} />
      <BottomDownloadCta />
    </>
  );
}
