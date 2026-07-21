import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";
import { readRootMarkdown } from "@/lib/markdown";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/security",
  title: "Security",
  description: "DevStackBox security policy and vulnerability reporting.",
});

export default function SecurityPage() {
  return (
    <MarkdownPage
      title="Security Policy"
      markdown={readRootMarkdown("SECURITY.md")}
    />
  );
}
