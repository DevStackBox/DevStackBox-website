import { ScreenshotGallery } from "@/components/screenshot-gallery";
import Link from "next/link";
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
  return <><HeroSection release={release} /><StackVersionsSection /><section className="mx-auto max-w-6xl px-5 py-12 sm:px-6"><div className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-10"><p className="text-sm font-semibold text-primary">New in v0.1.12</p><h2 className="mt-3 text-3xl font-bold tracking-tight">Each project, with its own PHP and HTTPS.</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Connect an existing folder, give it a .test hostname, and manage its document root, installed PHP runtime, and trusted local certificate from one details page.</p><div className="mt-7 grid gap-6 md:grid-cols-3"><div><h3 className="font-semibold">Keep existing projects</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Use folders outside www. Connecting a site keeps your files in place.</p></div><div><h3 className="font-semibold">Choose installed PHP</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Download in PHP Versions, then pin a version per website or inherit the default.</p></div><div><h3 className="font-semibold">Check HTTPS and site health</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Local certificates use mkcert. Windows trust approval is required; website errors are checked separately.</p></div></div><Link href="/docs/getting-started/projects" className="mt-7 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Explore the project workflow</Link></div></section><FeatureShowcase /><ScreenshotGallery /><DocsPreview /><ComparisonTable /><CommunityCta stats={stats} /><BottomDownloadCta /></>;
}
