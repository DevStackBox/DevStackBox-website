import { DocsSearch } from "@/components/docs-tools";
import { docSourcePath } from "@/lib/doc-path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocPageActions } from "@/components/doc-page-actions";
import { JsonLd } from "@/components/json-ld";
import {
  DocsSidebar,
  getBreadcrumbs,
  getPrevNext,
} from "@/components/docs-sidebar";
import { getLastModifiedIso, getLastUpdated } from "@/lib/git-meta";
import { docPageMetadata } from "@/lib/page-metadata";
import { source } from "@/lib/source";
import { docPageSchemas } from "@/lib/structured-data";
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
  const mdxPath = docSourcePath(activeSlug);
  const modifiedIso = getLastModifiedIso(mdxPath);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <JsonLd
        data={docPageSchemas({
          slug: activeSlug,
          title: page.data.title,
          description: page.data.description,
          crumbs,
          modifiedTime: modifiedIso,
        })}
      />
      <aside className="hidden lg:block"><div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-3"><DocsSearch />
        <DocsSidebar activeSlug={activeSlug} />
      </div></aside>
      <article className="min-w-0 max-w-3xl">
        <div className="mb-6 lg:hidden"><DocsSearch /><details className="rounded-lg border border-border p-4"><summary className="font-medium">Browse documentation</summary><div className="mt-5"><DocsSidebar activeSlug={activeSlug} /></div></details></div>
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {crumbs.map((c, i) => (
            <span key={`${c.label}-${i}`} className="flex items-center gap-1">
              {i > 0 ? <span>/</span> : null}
              {c.href ? (
                <Link href={c.href} className="hover:text-foreground">
                  {c.label}
                </Link>
              ) : (
                <span>{c.label}</span>
              )}
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
        {page.data.toc.length > 0 && <details className="mb-8 rounded-lg border border-border p-4"><summary className="text-sm font-medium">On this page</summary><ul className="mt-3 space-y-2 text-sm">{page.data.toc.map(item => <li key={item.url} className={item.depth > 2 ? "pl-4" : ""}><a href={item.url} className="text-muted-foreground hover:text-primary">{item.title}</a></li>)}</ul></details>}
        <div className="doc-content prose-no-margin text-fd-foreground">
          <MDX components={getMDXComponents() as never} />
        </div>
        <DocPageActions
          slug={activeSlug}
          sourcePath={mdxPath}
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
  const activeSlug = slug.join("/");
  const mdxPath = docSourcePath(activeSlug);
  return docPageMetadata({
    slug: activeSlug,
    title: page.data.title,
    description: page.data.description,
    modifiedTime: getLastModifiedIso(mdxPath),
  });
}
