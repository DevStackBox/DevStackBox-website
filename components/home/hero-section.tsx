import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import { homepage } from "@/content/homepage";
import { resolveMarketingImage } from "@/lib/marketing-images";
import { formatReleaseDate, type GitHubRelease } from "@/lib/github";

type HeroSectionProps = {
  release: GitHubRelease | null;
};

function BadgeRow({ items }: { items: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function HeroSection({ release }: HeroSectionProps) {
  const heroSrc = resolveMarketingImage(homepage.hero.heroImage);

  return (
    <section className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background section-py">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="mb-4 text-sm font-medium text-primary">
            Free & open source · Windows 10/11
          </p>
          <h1 className="text-hero max-w-xl">{homepage.hero.title}</h1>
          <p className="text-body mt-5 max-w-xl text-lg leading-relaxed">
            {homepage.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/download" className="btn-primary">
              <Download className="h-4 w-4" />
              {homepage.hero.primaryCta}
            </Link>
            <Link href="/docs" className="btn-secondary">
              {homepage.hero.secondaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 space-y-3">
            <BadgeRow items={homepage.hero.trustBadges} />
            <BadgeRow items={homepage.hero.stackBadges} />
          </div>
          {release ? (
            <p className="text-small mt-5">
              Latest stable:{" "}
              <Link href="/download" className="link-primary">
                {release.tag_name}
              </Link>{" "}
              · {formatReleaseDate(release.published_at)}
            </p>
          ) : null}
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="overflow-hidden rounded-xl border border-border bg-muted/30 shadow-lg shadow-black/5 ring-1 ring-border/60">
            <Image
              src={heroSrc}
              alt="DevStackBox desktop application"
              width={1280}
              height={800}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
