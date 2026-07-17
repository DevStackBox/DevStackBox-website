import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocPageActions } from "@/components/doc-page-actions";
import {
  DocsSidebar,
  getBreadcrumbs,
  getPrevNext,
} from "@/components/docs-sidebar";
import { getLastUpdated } from "@/lib/git-meta";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function DocPage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page =
    source.getPage(slug) ??
    (slug.length === 0 ? source.getPage(["index"]) : undefined);
  if (!page) notFound();

  const activeSlug = slug.join("/");
  const MDX = page.data.body;
  const { prev, next } = getPrevNext(activeSlug);
  const crumbs = getBreadcrumbs(activeSlug);
  const mdxPath = activeSlug ? `docs/${activeSlug}.mdx` : "docs/index.mdx";

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <DocsSidebar activeSlug={activeSlug} />
      </aside>
      <article className="min-w-0 max-w-3xl">
        <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {crumbs.map((c, i) => (
            <span key={c.href} className="flex items-center gap-1">
              {i > 0 ? <span>/</span> : null}
              <Link href={c.href} className="hover:text-foreground">
                {c.label}
              </Link>
            </span>
          ))}
        </nav>
        <header className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight">{page.data.title}</h1>
          {page.data.description ? (
            <p className="mt-2 text-lg text-muted-foreground">
              {page.data.description}
            </p>
          ) : null}
        </header>
        <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-primary">
          <MDX components={getMDXComponents() as never} />
        </div>
        <DocPageActions
          slug={activeSlug}
          lastUpdated={getLastUpdated(mdxPath)}
          prev={prev}
          next={next}
        />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug ?? [];
  const page =
    source.getPage(slug) ??
    (slug.length === 0 ? source.getPage(["index"]) : undefined);
  if (!page) return {};
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: `${page.data.title} · DevStackBox`,
      description: page.data.description,
      type: "article",
    },
  };
}
