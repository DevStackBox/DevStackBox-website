import Link from "next/link";
import { siteFooterNav } from "@/lib/navigation";
import { siteConfig } from "@/content/homepage";
import { SiteLogo } from "@/components/site-logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link href="/" aria-label={siteConfig.name}>
            <SiteLogo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A local Apache, PHP, and MySQL environment for Windows developers.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Product</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/download" className="hover:text-foreground">Download</Link></li>
            <li><Link href="/releases" className="hover:text-foreground">Releases</Link></li>
            <li><Link href="/whats-new" className="hover:text-foreground">What&apos;s new</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Documentation</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {siteFooterNav.documentation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Community</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/community" className="hover:text-foreground">Community guidelines</Link></li>
            <li><a href={`${siteConfig.githubUrl}/issues`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Report an issue</a></li>
            <li><a href={`${siteConfig.githubUrl}/discussions`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Discussions</a></li>
            <li><a href={`${siteConfig.githubUrl}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Contribute</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Legal</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {siteFooterNav.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-4 py-5 text-sm text-muted-foreground sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevStackBox</p>
          <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Open-source project on GitHub</a>
        </div>
      </div>
    </footer>
  );
}
