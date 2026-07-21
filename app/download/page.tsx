import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { homepage } from "@/content/homepage";
import {
  findWindowsInstaller,
  formatReleaseDate,
  getLatestRelease,
} from "@/lib/github";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/download",
  title: "Download",
  description: "Download the latest DevStackBox installer for Windows.",
});

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const installer = release ? findWindowsInstaller(release) : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-primary">Latest stable release</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">
        {release?.tag_name ?? "DevStackBox"}
      </h1>
      {release ? (
        <p className="mt-2 text-muted-foreground">
          Released {formatReleaseDate(release.published_at)}
        </p>
      ) : (
        <p className="mt-2 text-muted-foreground">
          Release information is temporarily unavailable. Visit GitHub Releases.
        </p>
      )}

      <div className="mt-10 rounded-2xl border border-border bg-muted/20 p-8">
        <h2 className="text-lg font-semibold">Windows x64 Installer</h2>
        {installer ? (
          <>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              {installer.name} · {(installer.size / 1024 / 1024).toFixed(1)} MB
            </p>
            <a
              href={installer.browser_download_url}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </>
        ) : (
          <a
            href="https://github.com/DevStackBox/DevStackBox/releases/latest"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white"
          >
            View on GitHub
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {release?.body ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Release notes</h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            {release.body.slice(0, 2000)}
          </pre>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">System requirements</h2>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {homepage.systemRequirements.map((req) => (
            <li key={req}>{req}</li>
          ))}
        </ul>
      </section>

      <nav className="mt-12 flex flex-wrap gap-4 border-t border-border pt-8 text-sm">
        <Link href="/releases" className="text-primary hover:underline">
          Previous releases
        </Link>
        <Link href="/changelog" className="text-primary hover:underline">
          Changelog
        </Link>
        <Link
          href="/docs/getting-started/installation"
          className="text-primary hover:underline"
        >
          Installation guide
        </Link>
        <a
          href="https://github.com/DevStackBox/DevStackBox/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          GitHub Releases
        </a>
      </nav>
    </div>
  );
}
