import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { homepage, siteConfig } from "@/content/homepage";
import { docsNav } from "@/lib/navigation";
import {
  formatReleaseDate,
  getLatestRelease,
  getRepoStats,
  parseReleaseSections,
} from "@/lib/github";

export default async function HomePage() {
  const [release, stats] = await Promise.all([
    getLatestRelease(),
    getRepoStats(),
  ]);
  const highlights = release ? parseReleaseSections(release.body) : {};

  return (
    <>
      <section className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 text-sm font-medium text-primary">
            Free & open source · Windows 10/11
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {homepage.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {homepage.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              {homepage.hero.primaryCta}
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              {homepage.hero.secondaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {release ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Latest release:{" "}
              <Link href="/download" className="font-medium text-foreground">
                {release.tag_name}
              </Link>{" "}
              · {formatReleaseDate(release.published_at)}
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-bold">Why DevStackBox?</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {homepage.features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border p-6 shadow-sm"
            >
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {release && (highlights.Added?.length || highlights.Changed?.length) ? (
        <section className="border-y border-border/60 bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">What&apos;s new</h2>
                <p className="mt-1 text-muted-foreground">{release.tag_name}</p>
              </div>
              <Link href="/whats-new" className="text-sm font-medium text-primary">
                Read more →
              </Link>
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[...(highlights.Added ?? []), ...(highlights.Changed ?? [])]
                .slice(0, 6)
                .map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    • {item}
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ScreenshotGallery />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold">Documentation</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {docsNav.map((section) => (
            <Link
              key={section.title}
              href={
                section.items[0]?.slug
                  ? `/docs/${section.items[0].slug}`
                  : "/docs"
              }
              className="rounded-xl border border-border p-5 transition-colors hover:bg-muted/50"
            >
              <h3 className="font-semibold">{section.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {section.items.length} guides
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold">Community</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            DevStackBox is open source. Report bugs, suggest features, or
            contribute on GitHub.
          </p>
          {stats ? (
            <p className="mt-4 text-sm text-muted-foreground">
              {stats.stargazers_count.toLocaleString()} stars ·{" "}
              {stats.forks_count.toLocaleString()} forks
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-background"
            >
              GitHub
            </a>
            <Link
              href="/community"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-background"
            >
              Community
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
