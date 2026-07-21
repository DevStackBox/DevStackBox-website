import type { Metadata } from "next";
import { siteConfig } from "@/content/homepage";

export const DEFAULT_OG_IMAGE = "/og-default.svg";

export function pageUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalized === "/" ? "" : normalized}`;
}

export function buildPageMetadata({
  path,
  title,
  description,
  type = "website",
}: {
  path: string;
  title?: string;
  description: string;
  type?: "website" | "article";
}): Metadata {
  const url = pageUrl(path);
  const ogTitle = title ? `${title} · DevStackBox` : undefined;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle ?? siteConfig.name,
      description,
      url,
      type,
      siteName: siteConfig.name,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? siteConfig.name,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export function docPageMetadata({
  slug,
  title,
  description,
  modifiedTime,
}: {
  slug: string;
  title: string;
  description?: string;
  modifiedTime?: string | null;
}): Metadata {
  const path = slug ? `/docs/${slug}` : "/docs";
  const url = pageUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · DevStackBox`,
      description,
      url,
      type: "article",
      siteName: siteConfig.name,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: siteConfig.name }],
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · DevStackBox`,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
