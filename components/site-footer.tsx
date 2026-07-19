import Link from "next/link";
import { siteFooterNav } from "@/lib/navigation";
import { siteConfig } from "@/content/homepage";

const extraCommunityLinks = [
  {
    label: "Issues",
    href: `${siteConfig.githubUrl}/issues`,
    external: true as const,
  },
  {
    label: "Discussions",
    href: `${siteConfig.githubUrl}/discussions`,
    external: true as const,
  },
];

export function SiteFooter() {
  const communityLinks = [...siteFooterNav.community, ...extraCommunityLinks];

  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="mb-2 text-sm font-semibold">Documentation</p>
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
          <p className="mb-2 text-sm font-semibold">Community</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {communityLinks.map((item) =>
              "external" in item && item.external ? (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Legal</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
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
      <div className="border-t border-border/60 px-4 py-5 text-center text-sm text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} DevStackBox</p>
        <p className="mt-1.5">
          This site is powered by{" "}
          <a
            href="https://www.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Netlify
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
