import Link from "next/link";
import { siteFooterNav } from "@/lib/navigation";
import { siteConfig } from "@/content/homepage";
import { SiteLogo } from "@/components/site-logo";

type FooterLinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

const productLinks: FooterLinkItem[] = [
  { label: "Download", href: "/download" },
  { label: "Releases", href: "/releases" },
  { label: "What's new", href: "/whats-new" },
];

const documentationLinks = siteFooterNav.documentation.filter(
  (item) => item.label !== "Download" && item.label !== "Releases",
);

const communityLinks: FooterLinkItem[] = [
  { label: "Community guidelines", href: "/community" },
  { label: "Report an issue", href: `${siteConfig.githubUrl}/issues`, external: true },
  { label: "Discussions", href: `${siteConfig.githubUrl}/discussions`, external: true },
  {
    label: "Contribute",
    href: `${siteConfig.githubUrl}/blob/main/CONTRIBUTING.md`,
    external: true,
  },
];

function FooterLinkList({ items }: { items: readonly FooterLinkItem[] }) {
  return (
    <ul className="space-y-2.5 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              {item.label}
            </a>
          ) : (
            <Link href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function FooterColumn({ title, items }: { title: string; items: readonly FooterLinkItem[] }) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold text-foreground">{title}</h2>
      <FooterLinkList items={items} />
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(220px,1.1fr)_minmax(0,2.9fr)] lg:gap-14">
        <div className="max-w-xs">
          <Link href="/" aria-label={siteConfig.name}>
            <SiteLogo />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A local Apache, PHP, and MySQL environment for Windows developers.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FooterColumn title="Product" items={productLinks} />
          <section>
            <h2 className="mb-4 text-sm font-semibold text-foreground">Resources</h2>
            <div className="space-y-7">
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Documentation</h3>
                <FooterLinkList items={documentationLinks} />
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Legal</h3>
                <FooterLinkList items={siteFooterNav.legal} />
              </div>
            </div>
          </section>
          <FooterColumn title="Community" items={communityLinks} />
        </nav>
      </div>

      <div className="border-t border-border/60 px-4 py-5 text-sm text-muted-foreground sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevStackBox</p>
          <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
            Open-source project on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
