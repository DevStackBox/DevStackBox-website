"use client";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { Expand, X } from "lucide-react";
import { getScreenshot } from "@/lib/screenshots";

export function ProductImage({ src, alt, priority = false }: {
  src: string; alt: string; priority?: boolean; width?: number; height?: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const isOpen = useRef(false);
  useEffect(() => () => {
    if (isOpen.current) document.body.style.overflow = previousOverflow.current;
  }, []);
  const id = useId();
  const screenshot = getScreenshot(src);
  if (!screenshot) throw new Error(`Unregistered screenshot: ${src}`);
  const { width, height } = screenshot;

  function open() {
    previousOverflow.current = document.body.style.overflow;
    dialog.current?.showModal();
    isOpen.current = true;
    document.body.style.overflow = "hidden";
  }
  function closed() {
    document.body.style.overflow = previousOverflow.current;
    isOpen.current = false;
    opener.current?.focus();
  }
  return <>
    <button ref={opener} type="button" onClick={open} aria-label={"Enlarge: " + alt}
      className="group relative block w-full overflow-hidden rounded-xl border border-border bg-background text-left shadow-lg shadow-black/5">
      <Image unoptimized src={src} alt={alt} width={width} height={height} priority={priority} className="h-auto w-full" />
      <span className="absolute right-3 bottom-3 flex items-center gap-2 rounded-md bg-black/80 px-3 py-2 text-xs font-medium text-white"><Expand className="size-3.5" /> Enlarge</span>
    </button>
    <dialog ref={dialog} aria-labelledby={id} onClose={closed}
      style={{ width: `min(96vw, ${width + 24}px)` }}
      className="m-auto max-h-[95dvh] max-w-none overflow-auto rounded-xl border border-border bg-background p-3 text-foreground shadow-2xl backdrop:bg-black/75"
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="sticky top-0 z-10 mb-3 flex items-start justify-between gap-4 bg-background pb-2">
        <div className="min-w-0"><p id={id} className="text-sm">{alt}</p><p className="mt-1 text-xs text-muted-foreground">{screenshot.caption}</p>
          <a href={src} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm underline">Open original image</a></div>
        <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close screenshot" className="flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-muted"><X /></button>
      </div>
      <Image unoptimized src={src} alt={alt} width={width} height={height} className="h-auto w-full rounded-lg" />
    </dialog>
  </>;
}
