import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/homepage";
import { SiteLogo } from "@/components/site-logo";
import { GitHubIcon } from "@/components/github-icon";
const groups = [
  { title: "Product", links: [["Download for Windows", "/download"], ["What's new", "/whats-new"], ["Releases", "/releases"], ["Compare alternatives", "/xampp-alternative"], ["Migrate from XAMPP", "/migrate-from-xampp"]] },
  { title: "Resources", links: [["Documentation", "/docs"], ["Projects, PHP & HTTPS", "/docs/getting-started/projects"], ["Troubleshooting", "/docs/advanced/troubleshooting"], ["FAQ", "/docs/faq"], ["Roadmap", "/docs/roadmap"]] },
  { title: "Community", links: [["Contributing", siteConfig.githubUrl + "/blob/main/CONTRIBUTING.md"], ["Discussions", siteConfig.githubUrl + "/discussions"], ["Report an issue", siteConfig.githubUrl + "/issues"], ["Meet the project", "/community"], ["Code of Conduct", "/community#code-of-conduct"]] },
];
export function SiteFooter() {
  return <footer className="border-t border-border bg-muted/35"><div className="mx-auto max-w-6xl px-5 sm:px-6">
    <div className="grid gap-12 py-14 lg:grid-cols-[1.1fr_2fr] lg:gap-20">
      <div><Link href="/" aria-label="DevStackBox home" className="inline-flex"><SiteLogo /></Link>
        <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">Local PHP development for Windows.<br />Your projects. Your machine. Your stack.</p>
        <a href={siteConfig.githubUrl} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:text-primary" target="_blank" rel="noopener noreferrer"><GitHubIcon className="size-4" /> Built in the open <ArrowUpRight className="size-3.5" /></a>
      </div>
      <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3">{groups.map(group => <section key={group.title}>
        <h2 className="mb-4 text-sm font-semibold">{group.title}</h2><ul className="space-y-1">{group.links.map(([label, href]) => <li key={href}>
          {href.startsWith("https:") ? <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center text-sm text-muted-foreground hover:text-primary">{label}</a> : <Link href={href} className="inline-flex min-h-9 items-center text-sm text-muted-foreground hover:text-primary">{label}</Link>}
        </li>)}</ul></section>)}</nav>
    </div>
    <div className="flex flex-col gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>© {new Date().getFullYear()} DevStackBox · Made by Nomad Programmer</p>
      <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-3"><Link href="/license" className="hover:text-foreground">MIT License</Link><Link href="/privacy" className="hover:text-foreground">Privacy</Link><Link href="/security" className="hover:text-foreground">Security</Link></nav>
    </div>
  </div></footer>;
}
