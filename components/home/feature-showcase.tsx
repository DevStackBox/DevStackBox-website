import Link from "next/link";
import { ArrowRight, FolderInput, Settings2 } from "lucide-react";
import { ProductImage } from "@/components/product-image";
export function FeatureShowcase() {
  return <section className="section-py mx-auto max-w-6xl px-5 sm:px-6">
    <div className="mb-10 max-w-2xl"><p className="eyebrow">A workflow that stays local</p><h2 className="text-section mt-3">Less setup. More building.</h2><p className="text-body mt-4 leading-7">Start your services, choose your PHP runtime, and keep your existing projects close at hand.</p></div>
    <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-12">
      <ProductImage src="/screenshots/app/project-php-preview.jpg" alt="Project details with per-site PHP and HTTPS enabled in DevStackBox" />
      <div><Settings2 className="mb-4 size-7 text-primary" /><h3 className="text-2xl font-semibold tracking-tight">Choose the PHP your project needs</h3><p className="mt-4 leading-7 text-muted-foreground">PHP 8.3.36 is bundled. PHP Versions shows exact patch releases and updates installed PHP 8.2–8.5 branches. Select a supported installed version per website in project details. The terminal still uses global PHP.</p><Link href="/docs/getting-started/projects" className="link-primary mt-5 inline-flex items-center gap-2 text-sm">Explore projects and PHP <ArrowRight className="size-4" /></Link></div>
    </div>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <article className="rounded-2xl border border-border bg-card p-7"><Settings2 className="size-6 text-primary" /><h3 className="mt-4 text-xl font-semibold">One place for your services</h3><p className="mt-3 leading-7 text-muted-foreground">Start and stop Apache and MySQL, inspect configuration, and open phpMyAdmin from the same Windows app.</p><Link href="/docs/reference/configuration" className="link-primary mt-5 inline-flex text-sm">Configuration guide →</Link></article>
      <article className="rounded-2xl border border-border bg-card p-7"><FolderInput className="size-6 text-primary" /><h3 className="mt-4 text-xl font-semibold">Bring your XAMPP projects</h3><p className="mt-3 leading-7 text-muted-foreground">Copy htdocs into your DevStackBox www folder. Move databases separately with an export and import, then test your site.</p><Link href="/migrate-from-xampp" className="link-primary mt-5 inline-flex text-sm">Migration guide →</Link></article>
    </div>
  </section>;
}
