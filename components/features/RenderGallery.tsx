"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Render } from "@/types";
import { cn } from "@/lib/utils";

type RenderGalleryProps = {
  renders: readonly Render[];
};

export function RenderGallery({ renders }: RenderGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = (idx: number) => emblaApi?.scrollTo(idx);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // Close lightbox on Escape.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i !== null ? (i + 1) % renders.length : i));
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i !== null ? (i - 1 + renders.length) % renders.length : i));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, renders.length]);

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {renders.map((render, idx) => (
              <div
                key={render.src}
                className="min-w-0 flex-[0_0_100%] px-2 md:px-3"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative block w-full overflow-hidden"
                  aria-label={`View ${render.caption} full-size`}
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={render.src}
                      alt={render.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-navy via-navy/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="font-sans text-xs uppercase tracking-widest text-gold">
                      {render.caption}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 border border-white/30 bg-navy/60 p-2 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold md:block"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 border border-white/30 bg-navy/60 p-2 text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold md:block"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {renders.map((render, idx) => (
          <button
            key={render.src}
            type="button"
            onClick={() => scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "h-px w-8 transition-all duration-300",
              selected === idx ? "bg-gold h-0.5 w-12" : "bg-white/30 hover:bg-white/60",
            )}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
            aria-label="Close lightbox"
          >
            <X className="h-7 w-7" />
          </button>
          <div
            className="relative h-full w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={renders[lightboxIndex].src}
              alt={renders[lightboxIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
