import { BottomDownloadCta } from "@/components/home/bottom-download-cta";
import { CommunityCta } from "@/components/home/community-cta";
import { DocsPreview } from "@/components/home/docs-preview";
import { FeatureShowcase } from "@/components/home/feature-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { ComparisonTable } from "@/components/home/comparison-table";
import { StackVersionsSection } from "@/components/home/stack-versions-section";
import { getLatestRelease, getRepoStats } from "@/lib/github";
export const revalidate = 300;
export default async function HomePage() {
  const [release, stats] = await Promise.all([getLatestRelease(), getRepoStats()]);
  return <><HeroSection release={release} /><StackVersionsSection /><FeatureShowcase /><DocsPreview /><ComparisonTable /><CommunityCta stats={stats} /><BottomDownloadCta /></>;
}
