import Link from "next/link";
import { siteFooterNav } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="mb-3 text-sm font-semibold">Documentation</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
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
            {siteFooterNav.community.map((item) =>
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
      <div className="border-t border-border/60 px-4 py-6 text-center text-sm text-muted-foreground sm:px-6">
        <p>© {new Date().getFullYear()} DevStackBox</p>
        <p className="mt-2">
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
