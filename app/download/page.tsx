import type { Metadata } from "next";
import Link from "next/link";
import { Check, Download, ExternalLink, ShieldCheck } from "lucide-react";
import { ReleaseBody } from "@/components/release-body";
import { homepage } from "@/content/homepage";
import {
  findWindowsInstaller,
  findSha256,
  formatReleaseDate,
  getLatestRelease,
} from "@/lib/github";

import { StackIncludedPanel } from "@/components/marketing/stack-included-panel";
import { buildPageMetadata } from "@/lib/page-metadata";

export const revalidate = 300;

export const metadata: Metadata = buildPageMetadata({
  path: "/download",
  title: "Download",
  description:
    "Download DevStackBox for Windows - free XAMPP alternative with PHP 8.3, MySQL 8.4 LTS, and PHP 8.5 on demand.",
  ogImage: "/og/download.png",
});

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const installer = release ? findWindowsInstaller(release) : null;
  const checksum = findSha256(installer);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <section className="grid gap-10 rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">DevStackBox for Windows</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {release
              ? `${release.tag_name} is the latest stable release from GitHub.`
              : "The button below installs the latest release from GitHub."}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Download the local PHP stack.</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Install Apache, PHP, MySQL, and phpMyAdmin in one desktop application. Your projects and settings stay on your PC.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {installer ? (
              <a href={installer.browser_download_url} className="btn-primary">
                <Download className="size-4" />
                Download {release?.tag_name}
              </a>
            ) : (
              <a href="https://github.com/DevStackBox/DevStackBox/releases/latest" className="btn-primary">
                <ExternalLink className="size-4" />
                View latest release
              </a>
            )}
            <Link href="/docs/getting-started/installation" className="btn-secondary">Installation guide</Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {release ? `Latest stable: ${release.tag_name} · ${formatReleaseDate(release.published_at)}` : "Release information is temporarily unavailable."}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-primary/10 p-2.5 text-primary"><ShieldCheck className="size-5" /></span>
            <div>
              <h2 className="font-semibold">Windows 10/11 · 64-bit</h2>
              <p className="mt-1 text-sm text-muted-foreground">Single installer for supported Windows PCs.</p>
            </div>
          </div>
          {installer ? (
            <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Version</dt><dd className="font-medium">{release?.tag_name}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">File</dt><dd className="break-all text-right font-mono text-xs">{installer.name}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Size</dt><dd>{(installer.size / 1024 / 1024).toFixed(1)} MB</dd></div>
            </dl>
          ) : (
            <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">The installer details will appear here when GitHub release data is available.</p>
          )}
          {checksum ? (
            <div className="mt-5 rounded-xl bg-muted p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Check className="size-4 text-primary" />SHA-256 checksum</p>
              <code className="mt-2 block break-all font-mono text-xs leading-relaxed">{checksum}</code>
              <p className="mt-3 text-xs leading-6">In PowerShell, run <code>Get-FileHash -Algorithm SHA256 &quot;path-to-installer.exe&quot;</code> and compare the full hash.</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight">Stack contents</h2>
        <div className="mt-6">
          <StackIncludedPanel />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          The installer is not Windows Authenticode-signed, so SmartScreen may show an unknown publisher. Verify the file and its source before running it. See{" "}
          <Link href="/docs/faq#why-does-windows-smartscreen-warn-about-the-installer" className="link-primary">
            SmartScreen FAQ
          </Link>{" "}
          and our{" "}
          <Link href="/security" className="link-primary">
            security page
          </Link>
          .
        </p>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <section>
            <h2 className="text-2xl font-bold tracking-tight">What you need</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {homepage.systemRequirements.map((req) => <li key={req} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{req}</li>)}
            </ul>
          </section>
          <section className="mt-10 rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold">Prefer to verify the release?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Review the release files on GitHub and compare the installer’s SHA-256 digest when available.</p>
            <a href={release?.html_url ?? "https://github.com/DevStackBox/DevStackBox/releases/latest"} target="_blank" rel="noopener noreferrer" className="link-primary mt-4 inline-flex items-center gap-2 text-sm">Open GitHub release <ExternalLink className="size-3.5" /></a>
          </section>
        </div>

        <section className="min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-2xl font-bold tracking-tight">Release notes</h2>
            <Link href="/releases" className="link-primary text-sm">All releases</Link>
          </div>
          {release?.body ? <ReleaseBody body={release.body} className="mt-5 rounded-2xl border border-border bg-card p-5 sm:p-7" /> : <p className="mt-5 rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">Release notes are temporarily unavailable. Visit GitHub Releases to view them.</p>}
        </section>
      </div>

      <nav aria-label="Download page links" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-7 text-sm">
        <Link href="/releases" className="link-primary">Previous releases</Link>
        <Link href="/changelog" className="link-primary">Changelog</Link>
        <Link href="/docs/getting-started/installation" className="link-primary">Installation guide</Link>
        <Link href="/community" className="link-primary">Get help</Link>
      </nav>
    </div>
  );
}
