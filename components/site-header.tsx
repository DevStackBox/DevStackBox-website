"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Star, X } from "lucide-react";
import { ThemeSwitch } from "fumadocs-ui/layouts/shared/slots/theme-switch";
import { GitHubIcon } from "@/components/github-icon";
import { SiteLogo } from "@/components/site-logo";
import { siteConfig } from "@/content/homepage";
const links = [{ label: "Documentation", href: "/docs" }, { label: "Releases", href: "/releases" }, { label: "Community", href: "/community" }];
export function SiteHeader({ stars }: { stars: number | null }) {
  const formattedStars = stars !== null && Number.isSafeInteger(stars) && stars >= 0
    ? stars.toLocaleString("en-US")
    : null;
  const repoLabel = formattedStars === null ? "DevStackBox on GitHub"
    : `DevStackBox on GitHub, ${formattedStars} ${stars === 1 ? "star" : "stars"}`;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) { if (!menu.current?.contains(event.target as Node)) setOpen(false); }
    function escape(event: KeyboardEvent) { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }
    document.addEventListener("pointerdown", dismiss); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <header className="@container sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur"><div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-5 sm:px-6">
    <Link href="/" aria-label="DevStackBox home" onClick={() => setOpen(false)}><SiteLogo className="@max-[24rem]:[&>span]:sr-only" /></Link>
    <nav aria-label="Main navigation" className="hidden items-center gap-7 @min-[48rem]:flex">{links.map(({label, href}) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined} className="py-3 text-sm font-medium text-muted-foreground hover:text-primary aria-[current=page]:text-primary">{label}</Link>)}</nav>
    <div className="flex items-center gap-2"><ThemeSwitch mode="light-dark" />
      <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer"
        aria-label={repoLabel} title={repoLabel}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">
        <GitHubIcon className="size-5 shrink-0" />
        {formattedStars !== null && <>
          <Star aria-hidden="true" className="size-3.5 text-muted-foreground" />
          <span className="tabular-nums">{formattedStars}</span>
        </>}
      </a>
      <Link href="/download" className="btn-primary !hidden !px-4 !py-2.5 @min-[48rem]:!inline-flex">Download</Link>
      <div className="relative @min-[48rem]:hidden" ref={menu} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}>
        <button ref={toggle} type="button" aria-label={open ? "Close site menu" : "Open site menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-lg border border-border">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        {open && <nav id="site-menu" aria-label="Mobile navigation" className="absolute right-0 top-14 grid w-[min(18rem,calc(100vw-2.5rem))] gap-1 rounded-xl border border-border bg-background p-3 shadow-xl">
          {links.map(({label, href}) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname.startsWith(href) ? "page" : undefined} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">{label}</Link>)}
          <Link href="/download" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">Download for Windows</Link>
        </nav>}
      </div>
    </div>
  </div></header>;
}
