import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { homepage } from "@/content/homepage";
import { ProductImage } from "@/components/product-image";
import { resolveMarketingImage } from "@/lib/marketing-images";
import { formatReleaseDate, type GitHubRelease } from "@/lib/github";
export function HeroSection({release}: {release: GitHubRelease | null}) {
  return <section className="hero-surface overflow-hidden border-b border-border/60"><div className="mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-14 sm:px-6 sm:pt-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-10 lg:py-24">
    <div><p className="eyebrow">Free & open source · Windows</p><h1 className="mt-5 text-[clamp(2.6rem,5vw,4.1rem)] leading-[1.08] font-semibold tracking-[-0.045em]">Your PHP stack.<br /><span className="text-primary">At home on Windows.</span></h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground">Apache, PHP, MySQL, and phpMyAdmin in one desktop app. A free XAMPP alternative with the tools to make local development feel simple.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/download" className="btn-primary"><Download className="size-4" />{homepage.hero.primaryCta}</Link><Link href="/docs/getting-started/installation" className="btn-secondary">Get started <ArrowRight className="size-4" /></Link></div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Windows 10/11 · x64 · MIT licensed · No account required</p>
      {release && <p className="mt-3 text-xs text-muted-foreground"><Link href="/whats-new" className="font-medium text-primary">Latest release {release.tag_name}</Link> · {formatReleaseDate(release.published_at)}</p>}
    </div>
    <div className="min-w-0 lg:-mr-12"><ProductImage src={resolveMarketingImage(homepage.hero.heroImage)} alt="DevStackBox Services showing Apache 2.4.65, MySQL 8.4.11, and bundled PHP 8.3.31" priority /></div>
  </div></section>;
}
