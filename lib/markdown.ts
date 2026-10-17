import fs from "node:fs";
import path from "node:path";

export function readRootMarkdown(filename: string): string {
  const filePath = path.join(process.cwd(), "content", "root-markdown", filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required Markdown content missing: ${filename}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/\r\n?/g, "\n").replace(/^#\s+[^\n]+\n+/, "");
}
