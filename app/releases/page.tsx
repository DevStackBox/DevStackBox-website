import type { Metadata } from "next";
import Link from "next/link";
import { ReleaseBody } from "@/components/release-body";
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
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Releases</h1>
      <p className="mt-2 text-muted-foreground">
        All DevStackBox releases from GitHub.
      </p>
      <ul className="mt-10 space-y-6">
        {releases.length === 0 ? (
          <li className="text-muted-foreground">No releases found.</li>
        ) : (
          releases.map((r) => {
            const installer = findWindowsInstaller(r);
            return (
            <li
              key={r.tag_name}
              className="rounded-xl border border-border p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-semibold">{r.tag_name}</h2>
                <time className="text-sm text-muted-foreground">
                  {formatReleaseDate(r.published_at)}
                </time>
              </div>
              {r.body ? <ReleaseBody body={r.body} /> : null}
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View on GitHub
                </a>
                {installer ? (
                  <a
                    href={installer.browser_download_url}
                    className="text-primary hover:underline"
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
      <p className="mt-8">
        <Link href="/download" className="text-sm text-primary hover:underline">
          ← Latest download
        </Link>
      </p>
    </div>
  );
}
