import docsMetadata from "@/content/docs-meta.json";
export function docSourcePath(slug: string) {
  if (!slug) return "docs/index.mdx";
  const index = "docs/" + slug + "/index.mdx";
  return index in docsMetadata ? index : "docs/" + slug + ".mdx";
}
