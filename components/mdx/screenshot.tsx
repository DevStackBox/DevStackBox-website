import { ProductImage } from "@/components/product-image";
import { getScreenshot } from "@/lib/screenshots";

export function Screenshot({ src }: { src: string }) {
  const screenshot = getScreenshot(src);
  if (!screenshot) throw new Error(`Unregistered documentation screenshot: ${src}`);
  return (
    <figure className="my-6">
      <ProductImage src={src} alt={screenshot.alt} />
      <figcaption className="mt-3 text-sm text-muted-foreground">{screenshot.caption}</figcaption>
    </figure>
  );
}
