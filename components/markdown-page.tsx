import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownPageProps = {
  title: string;
  markdown: string;
  description?: string;
};

export function MarkdownPage({ title, markdown, description }: MarkdownPageProps) {
  const body = markdown.replace(/^#\s+.+\n+/, "");

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-2 text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="doc-content prose-no-margin text-fd-foreground">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </article>
  );
}

export function MarkdownPageSimple({ markdown }: { markdown: string }) {
  return (
    <div className="doc-content prose-no-margin text-fd-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
