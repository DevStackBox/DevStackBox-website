import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/homepage";
import { source } from "@/lib/source";
import { docSourcePath } from "@/lib/doc-path";
import { getLastModifiedIso } from "@/lib/git-meta";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const routes = ["", "/download", "/releases", "/changelog", "/community", "/privacy", "/security", "/license", "/whats-new", "/xampp-alternative", "/migrate-from-xampp", "/vs/laragon", "/vs/herd"].map(path => ({url: base + path, priority: path === "" ? 1 : 0.8}));
  const docs = source.generateParams().map(({slug}) => {
    const name = slug?.join("/") ?? "";
    const modified = getLastModifiedIso(docSourcePath(name));
    return {url: base + "/docs" + (name ? "/" + name : ""), ...(modified ? {lastModified: modified} : {}), priority: 0.7};
  });
  return [...new Map([...routes, ...docs].map(route => [route.url, route])).values()];
}
