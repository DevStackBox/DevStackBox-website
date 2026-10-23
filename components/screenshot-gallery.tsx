import { ProductImage } from "@/components/product-image";
import { listGalleryImages } from "@/lib/marketing-images";

export function ScreenshotGallery() {
  const files = listGalleryImages();
  if (files.length === 0) return null;

  return (
    <section className="section-py mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="text-section mb-3 text-center">More screenshots</h2>
      <p className="text-body mx-auto mb-10 max-w-xl text-center">
        Project workspace, per-site PHP, and trusted HTTPS in DevStackBox.
      </p>
      <div
        className={
          files.length === 1
            ? "mx-auto max-w-4xl"
            : "grid gap-6 sm:grid-cols-2"
        }
      >
        {files.map((screenshot) => (
          <div
            key={screenshot.src}
            className="overflow-hidden rounded-xl border border-border bg-muted/20 shadow-md ring-1 ring-border/50"
          >
            <ProductImage src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} />
            <div className="p-4">
              <h3 className="font-semibold">{screenshot.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{screenshot.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{screenshot.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
