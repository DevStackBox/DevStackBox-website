import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownPage } from "@/components/markdown-page";
import { readRootMarkdown } from "@/lib/markdown";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/changelog",
  title: "Changelog",
  description: "DevStackBox release history and notable changes.",
});

export default function ChangelogPage() {
  const markdown = readRootMarkdown("CHANGELOG.md");
  return (
    <>
      <MarkdownPage title="Changelog" markdown={markdown} />
      <p className="mx-auto max-w-3xl px-4 pb-12 text-sm text-muted-foreground sm:px-6">
        <Link href="/releases" className="text-primary hover:underline">
          View releases with download links →
        </Link>
      </p>
    </>
  );
}
