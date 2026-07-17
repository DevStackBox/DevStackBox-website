import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { devstackboxPath } from "@/lib/devstackbox-root";

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

export function getScreenshotFiles(): string[] {
  const dir = devstackboxPath("docs", "images");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort();
}

export function ScreenshotGallery() {
  const files = getScreenshotFiles();
  if (files.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">
        Screenshots
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
          <div
            key={file}
            className="overflow-hidden rounded-xl border border-border bg-muted/20"
          >
            <Image
              src={`/docs-images/${file}`}
              alt={file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}
              width={640}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
