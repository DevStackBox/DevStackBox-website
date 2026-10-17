import Link from "next/link";
import { comparisonChecked } from "@/content/comparisons";
type Props = {title: string; intro: string; competitor: string; rows: readonly (readonly [string,string,string])[]; tradeoff: string; source: string; sourceLabel: string};
export function ComparisonPage({title,intro,competitor,rows,tradeoff,source,sourceLabel}: Props) {
  return <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
    <p className="eyebrow">Find your local development workflow</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
    <div role="region" aria-label={title + " comparison table"} tabIndex={0} className="mt-10 overflow-x-auto rounded-2xl border border-border"><table className="w-full min-w-[600px] text-left text-sm"><caption className="sr-only">{title}</caption><thead className="bg-muted/50"><tr><th scope="col" className="p-4">Feature</th><th scope="col" className="p-4 text-primary">DevStackBox</th><th scope="col" className="p-4">{competitor}</th></tr></thead><tbody>{rows.map(([feature,ours,theirs]) => <tr key={feature} className="border-t border-border"><th scope="row" className="p-4 font-medium">{feature}</th><td className="p-4 leading-6">{ours}</td><td className="p-4 leading-6 text-muted-foreground">{theirs}</td></tr>)}</tbody></table></div>
    <p className="mt-4 text-xs leading-6 text-muted-foreground">Checked {comparisonChecked}. <a href={source} target="_blank" rel="noopener noreferrer" className="link-primary">{sourceLabel}</a>. Offerings and pricing may change.{competitor === "Laragon" ? " Commercial prices shown refer to one device." : ""}</p>
    <section className="mt-12 max-w-3xl"><h2 className="text-2xl font-semibold">Which fits your work?</h2><p className="mt-4 leading-8 text-muted-foreground">{tradeoff}</p></section>
    <div className="mt-10 flex flex-wrap gap-3"><Link href="/download" className="btn-primary">Download for Windows</Link><Link href="/migrate-from-xampp" className="btn-secondary">Moving from XAMPP?</Link></div>
    <nav aria-label="Other comparisons" className="mt-12 flex flex-wrap gap-5 border-t border-border pt-6 text-sm"><Link href="/xampp-alternative" className="link-primary">XAMPP</Link><Link href="/vs/laragon" className="link-primary">Laragon</Link><Link href="/vs/herd" className="link-primary">Herd</Link></nav>
  </div>;
}
