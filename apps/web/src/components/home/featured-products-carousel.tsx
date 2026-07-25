'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRef, useState, type UIEvent } from 'react';
import { OwnerBuiltBadge } from '@/components/home/owner-built-badge';
import { Button } from '@/components/ui/button';
import type { FeaturedProduct } from '@/config/homepage';
import { cn } from '@/lib/utils';

export interface FeaturedProductsCarouselProps {
  products: readonly FeaturedProduct[];
}

export function FeaturedProductsCarousel({
  products,
}: FeaturedProductsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  function scrollToProduct(index: number) {
    const track = trackRef.current;
    const product = track?.children.item(index);

    if (!(product instanceof HTMLElement)) {
      return;
    }

    setActiveIndex(index);
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
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement)) {
          return;
        }

        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(trackCenter - childCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
      frameRef.current = null;
    });
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 pt-3 sm:-mx-6 sm:gap-6 sm:px-6 lg:-mx-8 lg:px-8"
        aria-label="Featured products"
        onScroll={updateActiveProduct}
      >
        {products.map((product, index) => (
          <article
            key={product.id}
            id={`product-${product.id}`}
            className={cn(
              'bg-warm w-[86%] shrink-0 snap-center scroll-mt-36 overflow-hidden rounded-lg transition-[transform,opacity] duration-300 sm:w-[64%] lg:w-[46%] xl:w-[40%]',
              index === activeIndex
                ? '-translate-y-2 opacity-100'
                : 'opacity-70',
            )}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <div className="bg-muted relative aspect-[4/3] overflow-hidden">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(min-width: 1280px) 40vw, (min-width: 1024px) 46vw, (min-width: 640px) 64vw, 86vw"
                className="object-cover"
              />
              <p className="bg-charcoal/85 text-charcoal-foreground absolute bottom-3 left-3 right-3 rounded-sm px-3 py-2 text-xs leading-5 backdrop-blur-sm">
                {product.visualStatus}
              </p>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.14em]">
                    {product.availability}
                  </p>
                  <h3 className="mt-3 text-3xl font-medium tracking-[-0.045em]">
                    {product.name}
                  </h3>
                </div>
                {product.ownerRequestCount ? (
                  <OwnerBuiltBadge count={product.ownerRequestCount} />
                ) : null}
              </div>
              <p className="text-muted-foreground mt-5 max-w-lg text-base leading-7">
                {product.description}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-6">
        <p className="text-graphite-foreground/65 text-sm" aria-live="polite">
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
            className="border-graphite-foreground/25 text-graphite-foreground hover:bg-graphite-foreground hover:text-graphite rounded-full bg-transparent"
            aria-label="Show previous featured product"
            disabled={activeIndex === 0}
            onClick={() => scrollToProduct(activeIndex - 1)}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="border-graphite-foreground/25 text-graphite-foreground hover:bg-graphite-foreground hover:text-graphite rounded-full bg-transparent"
            aria-label="Show next featured product"
            disabled={activeIndex === products.length - 1}
            onClick={() => scrollToProduct(activeIndex + 1)}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
