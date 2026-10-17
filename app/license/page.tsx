import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";
import { readRootMarkdown } from "@/lib/markdown";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/license",
  title: "License",
  description: "DevStackBox is released under the MIT License.",
});

export default function LicensePage() {
  return (
    <><MarkdownPage title="MIT License" markdown={readRootMarkdown("LICENSE")} /><section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6"><h2 className="text-xl font-semibold">Bundled software</h2><p className="mt-3 leading-7 text-muted-foreground">This license covers DevStackBox. Apache, PHP, MySQL, phpMyAdmin, and other bundled dependencies have their own licenses. Consult the LICENSE and NOTICE files distributed with each component in your installation.</p></section></>
  );
}
