import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";
import { readRootMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Security",
  description: "DevStackBox security policy and vulnerability reporting.",
};

export default function SecurityPage() {
  return (
    <MarkdownPage
      title="Security Policy"
      markdown={readRootMarkdown("SECURITY.md")}
    />
  );
}
