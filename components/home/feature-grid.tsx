import { Layers, Shield, Wrench, Zap, type LucideIcon } from "lucide-react";
import { homepage, type FeatureIcon } from "@/content/homepage";

const ICONS: Record<FeatureIcon, LucideIcon> = {
  Layers,
  Shield,
  Zap,
  Wrench,
};

export function FeatureGrid() {
  return (
    <section className="section-py mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="text-section mb-10 text-center">Why DevStackBox?</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {homepage.features.map((f) => {
          const Icon = ICONS[f.icon];
          return (
            <div
              key={f.title}
              className="rounded-xl border border-border p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-muted/20"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-card-title">{f.title}</h3>
              <p className="text-body mt-2">{f.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
