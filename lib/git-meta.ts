import docsMetadata from "@/content/docs-meta.json";

export function getLastUpdated(relativePath: string): string | null {
  const iso = getLastModifiedIso(relativePath);
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getLastModifiedIso(relativePath: string): string | null {
  return (docsMetadata as Record<string, string | null>)[relativePath] ?? null;
}
