"use client";
import { Search } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
export function DocsSearch() {
  const {setOpenSearch} = useSearchContext();
  return <button type="button" onClick={() => setOpenSearch(true)} className="mb-5 flex min-h-11 w-full items-center gap-3 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground hover:bg-muted"><Search className="size-4" /> Search documentation</button>;
}
