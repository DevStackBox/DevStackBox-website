import Link from "next/link";
import { ArrowRight, Download, Star } from "lucide-react";
import { homepage, siteConfig } from "@/content/homepage";
import { ProductImage } from "@/components/product-image";
import { resolveMarketingImage } from "@/lib/marketing-images";
import { formatReleaseDate, type GitHubRelease, type RepoStats } from "@/lib/github";
export function HeroSection({release, stats}: {release: GitHubRelease | null; stats: RepoStats | null}) {
  return <section className="hero-surface overflow-hidden border-b border-border/60"><div className="mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-14 sm:px-6 sm:pt-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10 lg:py-24">
    <div><p className="eyebrow">Free & open source · Windows</p><h1 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] font-semibold tracking-[-0.04em]">{homepage.hero.title}</h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">{homepage.hero.subtitle}</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/download" className="btn-primary"><Download className="size-4" />{homepage.hero.primaryCta}</Link><Link href="/docs/getting-started/installation" className="btn-secondary">Get started <ArrowRight className="size-4" /></Link><a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary"><Star className="size-4" />Star on GitHub{stats ? ` · ${stats.stargazers_count.toLocaleString()}` : ""}</a></div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Windows 10/11 · x64 · MIT licensed · No account required</p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Using an AI coding tool? Give it the <a href="/DEVSTACKBOX.md" className="font-medium text-primary underline underline-offset-4">DevStackBox guide</a>.</p>
      {release && <p className="mt-3 text-xs text-muted-foreground"><Link href="/whats-new" className="font-medium text-primary">Latest release {release.tag_name}</Link> · {formatReleaseDate(release.published_at)}</p>}
    </div>
    <div className="min-w-0 lg:-mr-12"><ProductImage src={resolveMarketingImage(homepage.hero.heroImage)} alt="DevStackBox v0.1.19 Services showing Apache, MySQL and PHP controls" width={1920} height={1032} priority /><p className="mt-3 text-xs text-muted-foreground">v0.1.19 production build, captured at native 1920 × 1032 with demonstration data. Enlarge to inspect the interface or open the original image.</p></div>
  </div></section>;
}
