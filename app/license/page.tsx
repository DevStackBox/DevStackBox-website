import type { Metadata } from "next";
import { MarkdownPage } from "@/components/markdown-page";
import { readRootMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "License",
  description: "DevStackBox is released under the MIT License.",
};

export default function LicensePage() {
  return (
    <MarkdownPage title="MIT License" markdown={readRootMarkdown("LICENSE")} />
  );
}
