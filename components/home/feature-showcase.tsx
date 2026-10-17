import Image from "next/image";
import { listGalleryImages } from "@/lib/marketing-images";

export function FeatureShowcase() {
  const screenshots = listGalleryImages();
  if (screenshots.length === 0) return null;

  return (
    <section className="section-py mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Inside the app</p>
        <h2 className="text-section mt-3">A desktop workflow for your local stack</h2>
        <p className="text-body mt-4 text-lg leading-relaxed">
          See real screens from DevStackBox. Animated product demos from the documentation are included here when available.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {screenshots.map((screenshot) => {
          const isGif = screenshot.src.toLowerCase().endsWith(".gif");
          return (
            <article key={screenshot.src} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[1202/831] overflow-hidden border-b border-border bg-[#111b26]">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1202}
                  height={831}
                  unoptimized={isGif}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-card-title">{screenshot.title}</h3>
                <p className="text-body mt-2">{screenshot.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
