import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocPageActions } from "@/components/doc-page-actions";
import { DocsSidebar } from "@/components/docs-sidebar";
import { getLastUpdated } from "@/lib/git-meta";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "DevStackBox product roadmap and planned features.",
};

export default async function RoadmapPage() {
  const page = source.getPage(["roadmap"]);
  if (!page) notFound();
  const MDX = page.data.body;

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[240px_1fr] lg:px-6">
      <aside className="hidden lg:block">
        <DocsSidebar activeSlug="roadmap" />
      </aside>
      <article className="min-w-0 max-w-3xl">
        <header className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl font-bold">{page.data.title}</h1>
          <p className="mt-2 text-muted-foreground">{page.data.description}</p>
        </header>
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <MDX components={getMDXComponents() as never} />
        </div>
        <DocPageActions
          slug="roadmap"
          lastUpdated={getLastUpdated("docs/roadmap.mdx")}
        />
        <p className="mt-4 text-sm">
          <Link href="/docs" className="text-primary hover:underline">
            ← All documentation
          </Link>
        </p>
      </article>
    </div>
  );
}
