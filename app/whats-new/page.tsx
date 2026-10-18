import { ReleaseBody } from "@/components/release-body";
import { ReleaseChecksum } from "@/components/release-checksum";
import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import {
  findWindowsInstaller,
  formatReleaseDate,
  getLatestRelease,
} from "@/lib/github";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/whats-new",
  title: "What's New",
  description: "Latest DevStackBox release highlights.",
});

export default async function WhatsNewPage() {
  const release = await getLatestRelease();
  if (!release) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Release updates</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">What&apos;s New</h1>
          <p className="mt-4 text-muted-foreground">Release information is temporarily unavailable. You can check the latest updates on GitHub.</p>
          <a href="https://github.com/DevStackBox/DevStackBox/releases" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
            View GitHub releases <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    );
  }

  const installer = findWindowsInstaller(release);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-7 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Latest stable release</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">What&apos;s New in {release.tag_name}</h1>
        <p className="mt-3 text-muted-foreground">Released {formatReleaseDate(release.published_at)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {installer ? (
            <a href={installer.browser_download_url} className="btn-primary">
              <Download className="size-4" /> Download for Windows
            </a>
          ) : null}
          <a href={release.html_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Full release on GitHub <ExternalLink className="size-4" />
          </a>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-semibold">Release highlights</h2>
        {installer ? (
          <ReleaseChecksum
            release={release}
            className="mb-6 rounded-xl border border-border bg-muted/30 p-4"
          />
        ) : null}
        {release.body ? (
          <ReleaseBody body={release.body} omitInstallerSha={Boolean(installer)} />
        ) : (
          <p className="text-muted-foreground">Read the full release on GitHub for details.</p>
        )}
      </section>

      <nav aria-label="Release links" className="mt-12 flex flex-wrap gap-4 border-t border-border pt-8 text-sm">
        <Link href="/changelog" className="text-primary hover:underline">
          Full changelog
        </Link>
        <Link href="/releases" className="text-primary hover:underline">
          All releases
        </Link>
        <Link href="/download" className="text-primary hover:underline">
          Download page
        </Link>
      </nav>
    </div>
  );
}
