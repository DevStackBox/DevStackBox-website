import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownPageSimple } from "@/components/markdown-page";
import { siteConfig } from "@/content/homepage";
import { readRootMarkdown } from "@/lib/markdown";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/community",
  title: "Community",
  description: "Join the DevStackBox open-source community.",
});

export default function CommunityPage() {
  const coc = readRootMarkdown("CODE_OF_CONDUCT.md");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Community</h1>
      <p className="mt-3 text-muted-foreground">
        DevStackBox is a free, open-source project. We welcome bug reports,
        feature discussions, documentation, translations, testing, and code contributions.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-border p-6 transition-colors hover:bg-muted/50"
        >
          <h2 className="font-semibold">GitHub</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Source code, issues, and pull requests.
          </p>
        </a>
        <a
          href={`${siteConfig.githubUrl}/discussions`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-border p-6 transition-colors hover:bg-muted/50"
        >
          <h2 className="font-semibold">Discussions</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ask questions and share ideas.
          </p>
        </a>
        <a
          href={`${siteConfig.githubUrl}/blob/main/CONTRIBUTING.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-border p-6 transition-colors hover:bg-muted/50"
        >
          <h2 className="font-semibold">Contributing</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            How to set up, build, and submit changes.
          </p>
        </a>
        <Link
          href="mailto:hello@devstackbox.com"
          className="rounded-xl border border-border p-6 transition-colors hover:bg-muted/50"
        >
          <h2 className="font-semibold">Contact</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            hello@devstackbox.com
          </p>
        </Link>
      </div>

      <section className="mt-10 rounded-xl border border-border p-6"><h2 className="text-xl font-semibold">Maintained by Nomad Programmer</h2><p className="mt-3 leading-7 text-muted-foreground">DevStackBox grows through practical feedback from Windows PHP developers. <a href="https://www.youtube.com/@NomadProgrammer" className="link-primary">Watch the tutorials on YouTube</a> or help improve the project on GitHub.</p><p className="mt-3 text-sm text-muted-foreground">For vulnerabilities, use the private reporting instructions on our <Link href="/security" className="link-primary">security page</Link>.</p></section>
      <section id="code-of-conduct" className="mt-16 scroll-mt-20">
        <h2 className="text-2xl font-bold">Code of Conduct</h2>
        <div className="mt-6">
          <MarkdownPageSimple markdown={coc} />
        </div>
      </section>
    </div>
  );
}
