import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/homepage";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
