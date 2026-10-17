"use client";
import Image from "next/image";
import { useId, useRef } from "react";
import { Expand, X } from "lucide-react";
export function ProductImage({src, alt, priority = false}: {src: string; alt: string; priority?: boolean}) {
  const dialog = useRef<HTMLDialogElement>(null); const id = useId();
  return <>
    <button type="button" onClick={() => dialog.current?.showModal()} aria-label={"Enlarge: " + alt} className="group relative block w-full overflow-hidden rounded-xl border border-border bg-[#111b26] text-left shadow-lg shadow-black/5">
      <Image src={src} alt={alt} width={1202} height={831} sizes="(max-width: 1024px) 100vw, 720px" priority={priority} className="h-auto w-full" />
      <span className="absolute right-3 bottom-3 flex items-center gap-2 rounded-md bg-black/80 px-3 py-2 text-xs font-medium text-white"><Expand className="size-3.5" /> Enlarge</span>
    </button>
    <dialog ref={dialog} aria-labelledby={id} className="m-auto max-h-[95dvh] w-[min(96vw,1400px)] max-w-none overflow-auto rounded-xl border border-border bg-background p-3 text-foreground shadow-2xl backdrop:bg-black/75" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="mb-3 flex items-center justify-between gap-4"><p id={id} className="text-sm">{alt}</p><button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close screenshot" className="flex size-11 shrink-0 items-center justify-center rounded-lg hover:bg-muted"><X /></button></div>
      <Image src={src} alt={alt} width={1202} height={831} sizes="96vw" className="h-auto w-full rounded-lg" />
    </dialog>
  </>;
}
