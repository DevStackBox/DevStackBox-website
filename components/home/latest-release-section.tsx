import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-medium text-primary">Latest stable</p>
        <h2 className="text-section mt-2">{release.tag_name}</h2>
        <p className="text-body mt-2">
          Released {formatReleaseDate(release.published_at)}
        </p>

        <div className="mt-8 max-w-xl rounded-2xl border border-border bg-background p-8 shadow-sm">
          <p className="text-card-title">Windows x64 Installer</p>
          {installer ? (
            <p className="text-small mt-2 font-mono">{installer.name}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-4">
            {installer ? (
              <a href={installer.browser_download_url} className="btn-primary">
                <Download className="h-4 w-4" />
                Download
              </a>
            ) : (
              <Link href="/download" className="btn-primary">
                <Download className="h-4 w-4" />
                Download
              </Link>
            )}
            <Link href="/whats-new" className="btn-secondary">
              Release notes
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
