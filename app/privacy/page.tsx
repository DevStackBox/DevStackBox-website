import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";
import { readRootMarkdown } from "@/lib/markdown";

import { buildPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: "Privacy",
  description: "DevStackBox privacy policy - no telemetry, local-first.",
});

export default function PrivacyPage() {
  return (
    <MarkdownPage
      title="Privacy Policy"
      markdown={readRootMarkdown("PRIVACY.md")}
    />
  );
}
