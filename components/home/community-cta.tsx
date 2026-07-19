import Link from "next/link";
import { siteConfig } from "@/content/homepage";
import type { RepoStats } from "@/lib/github";

type CommunityCtaProps = {
  stats: RepoStats | null;
};

const LINKS = [
  {
    label: "GitHub",
    href: siteConfig.githubUrl,
    external: true,
    description: "Source code and releases",
  },
  {
    label: "Documentation",
    href: "/docs",
    external: false,
    description: "Install, configure, and develop",
  },
  {
    label: "Contributing",
    href: `${siteConfig.githubUrl}/blob/main/CONTRIBUTING.md`,
    external: true,
    description: "Build from source and submit PRs",
  },
  {
    label: "Issues",
    href: `${siteConfig.githubUrl}/issues`,
    external: true,
    description: "Report bugs and request features",
  },
  {
    label: "Discussions",
    href: `${siteConfig.githubUrl}/discussions`,
    external: true,
    description: "Ask questions and share ideas",
  },
] as const;

export function CommunityCta({ stats }: CommunityCtaProps) {
  const showStats =
    stats && stats.stargazers_count >= siteConfig.minStarsToShowStats;

  return (
    <section className="border-t border-border/60 bg-muted/20 section-py">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-section text-center">Community</h2>
        <p className="text-body mx-auto mt-3 max-w-xl text-center">
          DevStackBox is open source. Join us on GitHub - report bugs, suggest
          features, or contribute code.
        </p>
        {showStats ? (
          <p className="text-small mt-4 text-center">
            {stats.stargazers_count.toLocaleString()} stars ·{" "}
            {stats.forks_count.toLocaleString()} forks on GitHub
          </p>
        ) : null}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LINKS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
              >
                <p className="text-card-title">{item.label}</p>
                <p className="text-small mt-2">{item.description}</p>
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-primary/30 hover:bg-muted/30"
              >
                <p className="text-card-title">{item.label}</p>
                <p className="text-small mt-2">{item.description}</p>
              </Link>
            ),
          )}
        </div>
        <p className="text-small mt-8 text-center">
          <Link href="/community" className="link-primary">
            Code of Conduct and contact
          </Link>
        </p>
      </div>
    </section>
  );
}
