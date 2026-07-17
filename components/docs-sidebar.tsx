import Link from "next/link";
import { docsNav } from "@/lib/navigation";

function findTitleForSlug(slug: string): string {
  for (const section of docsNav) {
    for (const item of section.items) {
      if (item.slug === slug) return item.title;
      if (item.children) {
        for (const child of item.children) {
          if (child.slug === slug) return child.title;
        }
      }
    }
  }
  return slug;
}

export function DocsSidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className="space-y-6 text-sm">
      {docsNav.map((section) => (
        <div key={section.title}>
          <p className="mb-2 font-semibold text-foreground">{section.title}</p>
          <ul className="space-y-1 border-l border-border pl-3">
            {section.items.flatMap((item) =>
              item.children
                ? item.children.map((child) => (
                    <li key={child.slug}>
                      <Link
                        href={`/docs/${child.slug}`}
                        className={
                          activeSlug === child.slug
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))
                : [
                    <li key={item.slug || "index"}>
                      <Link
                        href={item.slug ? `/docs/${item.slug}` : "/docs"}
                        className={
                          activeSlug === item.slug
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      >
                        {item.title}
                      </Link>
                    </li>,
                  ],
            )}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function getPrevNext(activeSlug: string) {
  const flat: { slug: string; title: string }[] = [];
  for (const section of docsNav) {
    for (const item of section.items) {
      if (item.children) {
        for (const child of item.children) {
          flat.push({ slug: child.slug, title: child.title });
        }
      } else {
        flat.push({ slug: item.slug, title: item.title });
      }
    }
  }
  const idx = flat.findIndex((x) => x.slug === activeSlug);
  if (idx === -1) return { prev: null, next: null };
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;
  return {
    prev: prev
      ? {
          title: prev.title,
          href: prev.slug ? `/docs/${prev.slug}` : "/docs",
        }
      : null,
    next: next
      ? {
          title: next.title,
          href: next.slug ? `/docs/${next.slug}` : "/docs",
        }
      : null,
  };
}

export function getBreadcrumbs(activeSlug: string) {
  const crumbs = [{ label: "Documentation", href: "/docs" }];
  if (!activeSlug) return crumbs;
  const parts = activeSlug.split("/");
  let acc = "";
  for (const part of parts) {
    acc = acc ? `${acc}/${part}` : part;
    crumbs.push({
      label: findTitleForSlug(acc),
      href: `/docs/${acc}`,
    });
  }
  return crumbs;
}

export { findTitleForSlug };
