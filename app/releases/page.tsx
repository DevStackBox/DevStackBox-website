import type { Metadata } from "next";
import Link from "next/link";
import { ReleaseBody } from "@/components/release-body";
import { ReleaseChecksum } from "@/components/release-checksum";
import {
  findWindowsInstaller,
  formatReleaseDate,
  getReleases,
} from "@/lib/github";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/releases",
  title: "Releases",
  description: "DevStackBox release history and downloads.",
});

export default async function ReleasesPage() {
  const releases = await getReleases(30);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Download history</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">DevStackBox releases</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Release notes and Windows installers published to GitHub.</p>
      </header>
      <ul className="mt-10 space-y-5">
        {releases.length === 0 ? (
          <li className="rounded-2xl border border-border bg-card p-6 text-muted-foreground">
            Release information is temporarily unavailable. <a href="https://github.com/DevStackBox/DevStackBox/releases" target="_blank" rel="noopener noreferrer" className="link-primary">Open GitHub Releases</a>.
          </li>
        ) : (
          releases.map((r) => {
            const installer = findWindowsInstaller(r);
            return (
            <li
              key={r.tag_name}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-semibold tracking-tight">{r.name || r.tag_name}</h2>
                <time dateTime={r.published_at} className="text-sm text-muted-foreground">
                  {formatReleaseDate(r.published_at)}
                </time>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.tag_name} · {r.prerelease ? "Pre-release" : "Stable"}</p>
              {installer ? (
                <ReleaseChecksum
                  release={r}
                  className="mt-5 rounded-xl border border-border bg-muted/20 p-4"
                />
              ) : null}
              {r.body ? (
                <details className="mt-5">
                  <summary className="py-2 text-sm font-medium text-primary">Read release notes</summary>
                  <ReleaseBody
                    body={r.body}
                    className="mt-3"
                    omitInstallerSha={Boolean(installer)}
                  />
                </details>
              ) : null}
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-primary"
                >
                  View on GitHub
                </a>
                {installer ? (
                  <a
                    href={installer.browser_download_url}
                    className="link-primary"
                  >
                    Download {installer.name}
                  </a>
                ) : null}
              </div>
            </li>
            );
          })
        )}
      </ul>
      <p className="mt-8 text-sm text-muted-foreground">Showing up to 30 recent releases. <a href="https://github.com/DevStackBox/DevStackBox/releases" className="link-primary">Browse the complete history on GitHub</a>.</p>
      <p className="mt-8"><Link href="/download" className="link-primary text-sm">← Latest download</Link></p>
    </div>
  );
}
