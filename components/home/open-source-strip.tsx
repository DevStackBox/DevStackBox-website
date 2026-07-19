import Link from "next/link";
import { homepage, siteConfig } from "@/content/homepage";

export function OpenSourceStrip() {
  return (
    <section className="border-b border-border/60 bg-muted/20 py-4">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm sm:px-6">
        {homepage.openSourceStrip.map((item) =>
          "external" in item && item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-primary"
            >
              {item.label}
            </a>
          ) : (
            <Link key={item.label} href={item.href} className="link-primary">
              {item.label}
            </Link>
          ),
        )}
        <span className="hidden text-muted-foreground sm:inline">·</span>
        <a
          href={siteConfig.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-small hover:text-foreground"
        >
          {siteConfig.githubOrg}
        </a>
      </div>
    </section>
  );
}
