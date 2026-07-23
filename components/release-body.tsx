import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

function prepareReleaseBody(body: string): string {
  let text = body.trim();
  text = text.replace(/^#\s+.+\n+/, "");
  text = text.replace(/^##\s+DevStackBox[^\n]*\n+/i, "");
  text = text.replace(/^\*\*[^*\n]+\*\*\s*\n+/, "");
  return text.trim();
}

type ReleaseBodyProps = {
  body: string;
  className?: string;
};

export function ReleaseBody({ body, className }: ReleaseBodyProps) {
  const markdown = prepareReleaseBody(body);
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
