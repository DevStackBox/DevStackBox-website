import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function prepareReleaseBody(body: string): string {
  let text = body.trim();
  text = text.replace(/^#\s+.+\n+/, "");
  text = text.replace(/^\*\*[^*\n]+\*\*\s*\n+/, "");
  return text.trim();
}

type ReleaseBodyProps = {
  body: string;
};

export function ReleaseBody({ body }: ReleaseBodyProps) {
  const markdown = prepareReleaseBody(body);
  if (!markdown) return null;

  return (
    <div className="release-body doc-content prose-no-margin mt-3 text-sm text-muted-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
