import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import {
  findWindowsInstaller,
  formatReleaseDate,
  getLatestRelease,
  parseReleaseSections,
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
        <h1 className="text-3xl font-bold">What&apos;s New</h1>
        <p className="mt-4 text-muted-foreground">No release data available.</p>
      </div>
    );
  }

  const sections = parseReleaseSections(release.body);
  const installer = findWindowsInstaller(release);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-primary">Latest release</p>
      <h1 className="mt-2 text-4xl font-bold">{release.tag_name}</h1>
      <p className="mt-2 text-muted-foreground">
        {formatReleaseDate(release.published_at)}
      </p>

      {Object.entries(sections).map(([name, items]) =>
        items.length ? (
          <section key={name} className="mt-10">
            <h2 className="text-lg font-semibold">{name}</h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null,
      )}

      {installer ? (
        <a
          href={installer.browser_download_url}
          className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white"
        >
          <Download className="h-4 w-4" />
          Download {release.tag_name}
        </a>
      ) : null}

      <nav className="mt-12 flex flex-wrap gap-4 border-t border-border pt-8 text-sm">
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
