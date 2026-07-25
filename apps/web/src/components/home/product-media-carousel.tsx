'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState, type KeyboardEvent, type UIEvent } from 'react';
import { ProductMediaVisual } from '@/components/product/product-media-visual';
import { Button } from '@/components/ui/button';
import type { ProductMediaItem } from '@/config/product-media';
import { cn } from '@/lib/utils';

interface ProductMediaCarouselProps {
  products: readonly ProductMediaItem[];
}

export function ProductMediaCarousel({ products }: ProductMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  function showProduct(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), products.length - 1);
    const product = trackRef.current?.querySelector<HTMLElement>(
      `[data-hero-product-index="${nextIndex}"]`,
    );

    if (!product) {
      return;
    }

    setActiveIndex(nextIndex);
    product.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }

  function updateActiveProduct(event: UIEvent<HTMLDivElement>) {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    const track = event.currentTarget;
    frameRef.current = requestAnimationFrame(() => {
      const trackBounds = track.getBoundingClientRect();
      const trackCenter = trackBounds.left + trackBounds.width / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      track
        .querySelectorAll<HTMLElement>('[data-hero-product-index]')
        .forEach((product) => {
          const index = Number(product.dataset.heroProductIndex);
          const productBounds = product.getBoundingClientRect();
          const productCenter = productBounds.left + productBounds.width / 2;
          const distance = Math.abs(trackCenter - productCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

      setActiveIndex(closestIndex);
      frameRef.current = null;
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showProduct(activeIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showProduct(activeIndex + 1);
    }
  }

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Factor One product directions"
        tabIndex={0}
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:-mx-6 sm:gap-4 sm:px-6 lg:-mx-4 lg:px-4"
        onScroll={updateActiveProduct}
        onKeyDown={handleKeyDown}
      >
        <div className="w-[4%] shrink-0 sm:w-[12%]" aria-hidden="true" />
        {products.map((product, index) => (
          <article
            key={product.id}
            data-hero-product-index={index}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={cn(
              'w-[86%] shrink-0 snap-center transition-[transform,opacity] duration-300 motion-reduce:transform-none motion-reduce:transition-none sm:w-[72%] lg:w-[78%]',
              index === activeIndex
                ? '-translate-y-1 opacity-100'
                : 'opacity-60',
            )}
          >
            <ProductMediaVisual
              media={product}
              priority={index === 0}
              className="aspect-[4/3] rounded-lg"
            />
            <div className="px-1 pt-4">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.13em]">
                {product.availability}
              </p>
              <p className="mt-2 text-xl font-medium tracking-[-0.03em]">
                {product.name}
              </p>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {product.purpose}
              </p>
            </div>
          </article>
        ))}
        <div className="w-[4%] shrink-0 sm:w-[12%]" aria-hidden="true" />
      </div>

      <div className="mt-4 flex items-center justify-between gap-5">
        <p className="text-muted-foreground text-sm" aria-live="polite">
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(products.length).padStart(2, '0')}
          <span className="sr-only">
            , {products[activeIndex]?.name} is active
          </span>
        </p>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent"
            aria-label="Show previous hero product"
            disabled={activeIndex === 0}
            onClick={() => showProduct(activeIndex - 1)}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent"
            aria-label="Show next hero product"
            disabled={activeIndex === products.length - 1}
            onClick={() => showProduct(activeIndex + 1)}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
