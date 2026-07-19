import { homepage } from "@/content/homepage";

export function BuiltFor() {
  return (
    <section className="border-y border-border/60 bg-muted/20 section-py">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-section mb-3">Built for</h2>
        <p className="text-body mx-auto mb-8 max-w-2xl">
          Local PHP development for the frameworks and CMS platforms you already
          use.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {homepage.builtFor.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
