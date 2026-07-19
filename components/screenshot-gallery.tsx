import Image from "next/image";
import { listGalleryImages } from "@/lib/marketing-images";

export function ScreenshotGallery() {
  const files = listGalleryImages();
  if (files.length === 0) return null;

  return (
    <section className="section-py mx-auto max-w-6xl px-4 sm:px-6">
      <h2 className="text-section mb-3 text-center">More screenshots</h2>
      <p className="text-body mx-auto mb-10 max-w-xl text-center">
        A closer look at the DevStackBox desktop experience.
      </p>
      <div
        className={
          files.length === 1
            ? "mx-auto max-w-4xl"
            : "grid gap-6 sm:grid-cols-2"
        }
      >
        {files.map((file) => (
          <div
            key={file}
            className="overflow-hidden rounded-xl border border-border bg-muted/20 shadow-md ring-1 ring-border/50"
          >
            <Image
              src={`/docs-images/${file}`}
              alt={file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}
              width={1280}
              height={800}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
