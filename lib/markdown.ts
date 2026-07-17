import fs from "node:fs";
import { devstackboxPath } from "./devstackbox-root";

export function readRootMarkdown(filename: string): string {
  const filePath = devstackboxPath(filename);
  if (!fs.existsSync(filePath)) {
    return `# ${filename}\n\nContent not found.`;
  }
  return fs.readFileSync(filePath, "utf8");
}

export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/, "");
}
