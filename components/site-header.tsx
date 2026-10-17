"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { GitHubIcon } from "@/components/github-icon";
import { SiteLogo } from "@/components/site-logo";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/homepage";
import { siteHeaderNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center"
          aria-label={siteConfig.name}
        >
          <SiteLogo />
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {siteHeaderNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/download" className="btn-primary !hidden px-4 py-2 md:!inline-flex">
            Download
          </Link>
          <ThemeSwitch mode="light-dark" />
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className={cn(buttonVariants({ variant: "outline", size: "icon-sm" }))}
          >
            <GitHubIcon className="size-4" />
          </a>
          <details className="group relative md:hidden">
            <summary className={cn(buttonVariants({ variant: "outline", size: "icon-sm" }), "list-none [&::-webkit-details-marker]:hidden")} aria-label="Open site menu">
              <Menu className="size-4 group-open:hidden" />
              <X className="hidden size-4 group-open:block" />
            </summary>
            <nav aria-label="Mobile navigation" className="absolute right-0 top-[calc(100%+0.75rem)] z-50 grid w-64 gap-1 rounded-xl border border-border bg-background p-2 shadow-xl">
              {siteHeaderNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/download" className="btn-primary mt-1 justify-center">Download for Windows</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
