"use client";

import { Check, Link2, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/homepage";
import { cn } from "@/lib/utils";

type DocPageActionsProps = {
  slug: string;
  lastUpdated?: string | null;
  prev?: { title: string; href: string } | null;
  next?: { title: string; href: string } | null;
};

export function DocPageActions({
  slug,
  lastUpdated,
  prev,
  next,
}: DocPageActionsProps) {
  const [copied, setCopied] = useState(false);
  const docPath = slug ? `docs/${slug}.mdx` : "docs/index.mdx";
  const editUrl = `${siteConfig.githubUrl}/edit/main/${docPath}`;
  const pageUrl = `${siteConfig.url}/docs${slug ? `/${slug}` : ""}`;

  async function copyLink() {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-12 space-y-6 border-t border-fd-border pt-6">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {lastUpdated ? <span>Last updated: {lastUpdated}</span> : null}
        <a
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <Pencil className="size-3.5" />
          Edit this page
        </a>
        <button
          type="button"
          onClick={copyLink}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
          {copied ? "Copied" : "Copy page link"}
        </button>
      </div>
      {(prev || next) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              href={prev.href}
              className="rounded-lg border border-fd-border bg-card p-4 text-sm transition-colors hover:bg-muted/50"
            >
              <span className="text-muted-foreground">Previous</span>
              <p className="mt-1 font-medium text-foreground">{prev.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={next.href}
              className="rounded-lg border border-fd-border bg-card p-4 text-sm text-right transition-colors hover:bg-muted/50 sm:text-right"
            >
              <span className="text-muted-foreground">Next</span>
              <p className="mt-1 font-medium text-foreground">{next.title}</p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
