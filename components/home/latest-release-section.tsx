import Link from "next/link";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import {
  findWindowsInstaller,
  formatReleaseDate,
  type GitHubRelease,
} from "@/lib/github";

type LatestReleaseSectionProps = {
  release: GitHubRelease | null;
};

export function LatestReleaseSection({ release }: LatestReleaseSectionProps) {
  if (!release) return null;

  const installer = findWindowsInstaller(release);

  return (
    <section className="border-y border-border/60 bg-muted/20 section-py">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Latest stable release</p>
          <h2 className="text-section mt-3">{release.tag_name}</h2>
          <p className="text-body mt-2">Published {formatReleaseDate(release.published_at)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/whats-new" className="link-primary inline-flex items-center gap-2">
              What&apos;s new <ExternalLink className="size-4" />
            </Link>
            <Link href="/releases" className="link-primary inline-flex items-center gap-2">
              Release history <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="text-card-title">Windows installer · 64-bit</p>
          {installer ? <p className="text-small mt-2 break-all font-mono">{installer.name} · {(installer.size / 1024 / 1024).toFixed(1)} MB</p> : <p className="text-small mt-2">Installer details are available on GitHub.</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            {installer ? (
              <a href={installer.browser_download_url} className="btn-primary"><Download className="size-4" />Download {release.tag_name}</a>
            ) : (
              <Link href="/download" className="btn-primary"><Download className="size-4" />Download</Link>
            )}
            <Link href="/docs/getting-started/installation" className="btn-secondary">Installation guide</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
