import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/homepage";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/download",
    "/docs",
    "/releases",
    "/changelog",
    "/community",
    "/privacy",
    "/security",
    "/license",
    "/whats-new",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const docRoutes = source.generateParams().map(({ slug }) => ({
    url: `${base}/docs/${slug?.join("/") ?? ""}`.replace(/\/$/, "") || `${base}/docs`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...docRoutes];
}
