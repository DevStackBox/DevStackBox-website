import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

function prepareReleaseBody(body: string, omitInstallerSha: boolean): string {
  let text = body.replace(/\r\n?/g, "\n").trim();
  text = text.replace(/^#\s+.+\n+/, "");
  text = text.replace(/^##\s+DevStackBox[^\n]*\n+/i, "");
  text = text.replace(/^\*\*[^*\n]+\*\*\s*\n+/, "");
  if (omitInstallerSha) {
    text = text.replace(
      /^\*\*Installer SHA-256:\*\* `[0-9A-Fa-f]{64}`\s*\n*/gm,
      "",
    );
  }
  return text.trim();
}

type ReleaseBodyProps = {
  body: string;
  className?: string;
  /** When true, hide SHA lines (shown separately from GitHub asset digest). */
  omitInstallerSha?: boolean;
};

export function ReleaseBody({
  body,
  className,
  omitInstallerSha = false,
}: ReleaseBodyProps) {
  const markdown = prepareReleaseBody(body, omitInstallerSha);
  if (!markdown) return null;

  return (
    <div
      className={cn(
        "release-body doc-content prose-no-margin rounded-lg border border-border bg-muted/20 p-6 text-sm text-muted-foreground",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
