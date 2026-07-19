import Image from "next/image";
import { homepage } from "@/content/homepage";
import { resolveMarketingImage } from "@/lib/marketing-images";

export function FeatureShowcase() {
  return (
    <section className="section-py mx-auto max-w-6xl space-y-16 px-4 sm:px-6 sm:space-y-20">
      {homepage.featureShowcase.map((row) => {
        const imageFirst = row.imagePosition === "left";
        const src = resolveMarketingImage(row.image);

        const text = (
          <div className="flex flex-col justify-center">
            <h3 className="text-section text-2xl sm:text-3xl">{row.title}</h3>
            <p className="text-body mt-4 text-lg leading-relaxed">
              {row.description}
            </p>
          </div>
        );

        const image = (
          <div className="overflow-hidden rounded-xl border border-border bg-muted/20 shadow-md ring-1 ring-border/50">
            <Image
              src={src}
              alt={row.title}
              width={1280}
              height={800}
              className="h-auto w-full"
            />
          </div>
        );

        return (
          <div
            key={row.title}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          >
            {imageFirst ? (
              <>
                {image}
                {text}
              </>
            ) : (
              <>
                {text}
                {image}
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}
