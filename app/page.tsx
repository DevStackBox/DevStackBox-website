import { ScreenshotGallery } from "@/components/screenshot-gallery";
import Link from "next/link";
import { BottomDownloadCta } from "@/components/home/bottom-download-cta";
import { CommunityCta } from "@/components/home/community-cta";
import { DocsPreview } from "@/components/home/docs-preview";
import { FeatureShowcase } from "@/components/home/feature-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { ComparisonTable } from "@/components/home/comparison-table";
import { LatestReleaseBand } from "@/components/home/latest-release-band";
import { StackVersionsSection } from "@/components/home/stack-versions-section";
import { getLatestRelease, getRepoStats } from "@/lib/github";
export const revalidate = 300;
export default async function HomePage() {
  const [release, stats] = await Promise.all([getLatestRelease(), getRepoStats()]);
  return <><HeroSection release={release} stats={stats} /><StackVersionsSection /><LatestReleaseBand release={release} /><FeatureShowcase /><ScreenshotGallery /><DocsPreview /><ComparisonTable /><CommunityCta stats={stats} /><BottomDownloadCta /></>;
}
