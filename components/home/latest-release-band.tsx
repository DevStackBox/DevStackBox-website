import Link from "next/link";
import type { GitHubRelease } from "@/lib/github";

type LatestReleaseBandProps = {
  release: GitHubRelease | null;
};

export function LatestReleaseBand({ release }: LatestReleaseBandProps) {
  const label = release?.tag_name ?? "the latest release";
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
      <div className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-10">
        <p className="text-sm font-semibold text-primary">
          New in {label}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Each project, with its own PHP and HTTPS.
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          Connect an existing folder, give it a .test hostname, and manage its
          document root, installed PHP runtime, and trusted local certificate
          from one details page.
        </p>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-semibold">Keep existing projects</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use folders outside www. Connecting a site keeps your files in
              place.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Choose installed PHP</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Download in PHP Versions, then pin a version per website or
              inherit the default.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Check HTTPS and site health</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Local certificates use mkcert. Windows trust approval is required;
              website errors are checked separately.
            </p>
          </div>
        </div>
        <Link
          href="/docs/getting-started/projects"
          className="mt-7 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4"
        >
          Explore the project workflow
        </Link>
        {release ? (
          <p className="mt-4 text-sm text-muted-foreground">
            <Link href="/whats-new" className="link-primary">
              Read {label} release notes
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
