import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { homepage } from "@/content/homepage";

export function DocsPreview() {
  return (
    <section className="section-py mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="text-section mb-3 text-center">Documentation</h2>
      <p className="text-body mx-auto mb-10 max-w-xl text-center">
        Get installed, run your first site, and fix issues - step by step.
      </p>
      <ul className="mx-auto max-w-2xl divide-y divide-border rounded-xl border border-border bg-muted/10">
        {homepage.docLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-start gap-4 px-6 py-5 transition-colors hover:bg-muted/30"
            >
              <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="text-card-title group-hover:text-primary">
                  {link.label}
                </p>
                <p className="text-small mt-1">{link.description}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-small mt-6 text-center">
        <Link href="/docs" className="link-primary">
          Browse all documentation
        </Link>
      </p>
    </section>
  );
}
