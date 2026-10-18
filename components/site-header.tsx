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
export function SiteHeader() {
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
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur"><div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-5 sm:px-6">
    <Link href="/" aria-label="DevStackBox home" onClick={() => setOpen(false)}><SiteLogo /></Link>
    <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">{links.map(({label, href}) => <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined} className="py-3 text-sm font-medium text-muted-foreground hover:text-primary aria-[current=page]:text-primary">{label}</Link>)}</nav>
    <div className="flex items-center gap-2"><ThemeSwitch mode="light-dark" /><a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary md:inline-flex"><Star className="size-4" />Star</a><a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" className="hidden size-11 items-center justify-center rounded-lg hover:bg-muted sm:inline-flex md:hidden"><GitHubIcon className="size-5" /></a><Link href="/download" className="btn-primary !hidden !px-4 !py-2.5 md:!inline-flex">Download</Link>
      <div className="relative md:hidden" ref={menu} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}>
        <button ref={toggle} type="button" aria-label={open ? "Close site menu" : "Open site menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)} className="flex size-11 items-center justify-center rounded-lg border border-border">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        {open && <nav id="site-menu" aria-label="Mobile navigation" className="absolute right-0 top-14 grid w-[min(18rem,calc(100vw-2.5rem))] gap-1 rounded-xl border border-border bg-background p-3 shadow-xl">
          {links.map(({label, href}) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname.startsWith(href) ? "page" : undefined} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">{label}</Link>)}
          <a href={siteConfig.githubUrl} className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">GitHub repository</a><Link href="/download" onClick={() => setOpen(false)} className="btn-primary mt-2 justify-center">Download for Windows</Link>
        </nav>}
      </div>
    </div>
  </div></header>;
}
