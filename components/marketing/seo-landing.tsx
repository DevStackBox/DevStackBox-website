import Link from "next/link";
import { StackIncludedPanel } from "@/components/marketing/stack-included-panel";
import { positioning } from "@/content/stack-versions";

type SeoLandingProps = {
  title: string;
  intro: string;
  bullets: readonly string[];
};

export function SeoLanding({ title, intro, bullets }: SeoLandingProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{positioning.headline}</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-10 rounded-2xl border border-border bg-card p-6">
        <StackIncludedPanel />
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/download" className="btn-primary">
          Download for Windows
        </Link>
        <Link href="/docs/getting-started/installation" className="btn-secondary">
          Installation guide
        </Link>
      </div>
    </div>
  );
}
