'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useRef, useState } from 'react';
import type { ProductMediaAsset } from '@/config/product-media';
import { cn } from '@/lib/utils';

interface ProductHeroGalleryProps {
  media: readonly ProductMediaAsset[];
  productName: string;
}

function mediaTypeLabel(media: ProductMediaAsset) {
  if (media.evidenceOnly) {
    return 'Prototype shown · Development evidence';
  }

  return media.disclosure ?? 'Product image';
}

export function ProductHeroGallery({
  media,
  productName,
}: ProductHeroGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedMediaId, setLoadedMediaId] = useState<string | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const activeMedia = media[activeIndex];
  const isActiveImageLoaded = loadedMediaId === activeMedia?.id;

  if (!activeMedia?.sourcePath) {
    return null;
  }

  const selectIndex = (nextIndex: number) => {
    setActiveIndex((nextIndex + media.length) % media.length);
  };

  const openLightbox = () => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }

    lightboxRef.current?.showModal();
  };

  return (
    <section aria-label={`${productName} image gallery`}>
      <div
        className="bg-warm group relative aspect-[5/4] touch-pan-y overflow-hidden rounded-lg sm:aspect-square"
        aria-busy={!isActiveImageLoaded}
        onPointerDown={(event) => {
          pointerStartX.current = event.clientX;
          didSwipe.current = false;
        }}
        onPointerUp={(event) => {
          if (pointerStartX.current === null) {
            return;
          }

          const distance = event.clientX - pointerStartX.current;
          pointerStartX.current = null;

          if (Math.abs(distance) < 44) {
            return;
          }

          didSwipe.current = true;
          selectIndex(activeIndex + (distance < 0 ? 1 : -1));
        }}
      >
        <div
          className={cn(
            'bg-muted absolute inset-0 transition-opacity duration-200',
            isActiveImageLoaded ? 'opacity-0' : 'opacity-100',
          )}
          aria-hidden="true"
        />
        <button
          type="button"
          className="absolute inset-0 z-10 cursor-zoom-in"
          aria-label={`Open ${activeMedia.altText} fullscreen`}
          onClick={openLightbox}
        >
          <span className="sr-only">Open image</span>
        </button>
        <Image
          key={activeMedia.id}
          src={activeMedia.sourcePath}
          alt={activeMedia.altText}
          fill
          priority={activeIndex === 0}
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="motion-media-transition object-cover transition-opacity"
          style={{ objectPosition: activeMedia.focalPoint }}
          onLoad={() => setLoadedMediaId(activeMedia.id)}
          data-gallery-image-loaded={isActiveImageLoaded ? 'true' : 'false'}
        />
        <div className="bg-charcoal/85 text-charcoal-foreground pointer-events-none absolute bottom-4 left-4 z-20 rounded-sm px-3 py-2 text-xs font-medium sm:bottom-5 sm:left-5">
          {mediaTypeLabel(activeMedia)}
        </div>
        <span className="bg-charcoal/85 text-charcoal-foreground pointer-events-none absolute bottom-4 right-4 z-20 rounded-sm px-3 py-2 text-xs tabular-nums sm:bottom-5 sm:right-5">
          {activeIndex + 1} / {media.length}
        </span>

        {media.length > 1 ? (
          <>
            <button
              type="button"
              className="bg-background/90 text-foreground motion-safe-transition hover:bg-background absolute left-4 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full opacity-100 shadow-sm focus-visible:opacity-100 sm:left-5 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Show previous image"
              onClick={() => selectIndex(activeIndex - 1)}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="bg-background/90 text-foreground motion-safe-transition hover:bg-background absolute right-4 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full opacity-100 shadow-sm focus-visible:opacity-100 sm:right-5 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Show next image"
              onClick={() => selectIndex(activeIndex + 1)}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </>
        ) : null}

        <span className="bg-background/90 text-foreground pointer-events-none absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full sm:right-5 sm:top-5">
          <Expand className="size-4" aria-hidden="true" />
        </span>
      </div>

      {media.length > 1 ? (
        <>
          <div
            className="mt-3 hidden gap-3 sm:flex"
            aria-label="Choose an image"
          >
            {media.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  'bg-warm relative aspect-square w-20 overflow-hidden rounded-sm border-2 transition-colors',
                  index === activeIndex
                    ? 'border-factor-red'
                    : 'hover:border-foreground/35 border-transparent',
                )}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-label={`Show image ${index + 1}: ${mediaTypeLabel(item)}`}
                onClick={() => selectIndex(index)}
              >
                {item.sourcePath ? (
                  <Image
                    src={item.sourcePath}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    style={{ objectPosition: item.focalPoint }}
                  />
                ) : null}
              </button>
            ))}
          </div>
          <div
            className="mt-4 flex justify-center gap-2 sm:hidden"
            aria-label="Image pagination"
          >
            {media.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  'inline-flex size-11 items-center justify-center',
                  index === activeIndex
                    ? 'text-factor-red'
                    : 'text-foreground/35',
                )}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-label={`Show image ${index + 1}`}
                onClick={() => selectIndex(index)}
              >
                <span className="block size-2 rounded-full bg-current" />
              </button>
            ))}
          </div>
        </>
      ) : null}

      <dialog
        ref={lightboxRef}
        className="bg-charcoal text-charcoal-foreground backdrop:bg-charcoal/85 m-auto w-[min(92vw,1100px)] max-w-none overflow-hidden rounded-lg p-0"
        aria-label={`${activeMedia.altText} fullscreen`}
      >
        <div className="relative aspect-[4/3] max-h-[86vh]">
          <Image
            src={activeMedia.sourcePath}
            alt={activeMedia.altText}
            fill
            sizes="92vw"
            className="object-contain"
          />
          <button
            type="button"
            className="bg-background text-foreground absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full"
            aria-label="Close fullscreen image"
            onClick={() => lightboxRef.current?.close()}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </section>
  );
}
