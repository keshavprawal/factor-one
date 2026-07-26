'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type UIEvent } from 'react';
import { OwnerBuiltBadge } from '@/components/home/owner-built-badge';
import { ProductMediaVisual } from '@/components/product/product-media-visual';
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

  const scrollToProduct = useCallback((index: number) => {
    const track = trackRef.current;
    const product = track?.querySelector<HTMLElement>(
      `[data-product-index="${index}"]`,
    );

    if (!product) {
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
  }, []);

  useEffect(() => {
    function activateHashProduct() {
      const index = products.findIndex(
        (product) => `#product-${product.id}` === window.location.hash,
      );

      if (index >= 0) {
        requestAnimationFrame(() => scrollToProduct(index));
      }
    }

    activateHashProduct();
    window.addEventListener('hashchange', activateHashProduct);
    return () => window.removeEventListener('hashchange', activateHashProduct);
  }, [products, scrollToProduct]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

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
        .querySelectorAll<HTMLElement>('[data-product-index]')
        .forEach((child) => {
          const index = Number(child.dataset.productIndex);

          const childBounds = child.getBoundingClientRect();
          const childCenter = childBounds.left + childBounds.width / 2;
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
        id="featured-products-carousel"
        ref={trackRef}
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-8 pt-3 motion-reduce:scroll-auto sm:-mx-6 sm:gap-6 sm:px-6 lg:-mx-8 lg:px-8"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured products"
        onScroll={updateActiveProduct}
      >
        <div
          className="w-[7%] shrink-0 sm:w-[18%] lg:w-[27%] xl:w-[30%]"
          aria-hidden="true"
        />
        {products.map((product, index) => (
          <article
            key={product.id}
            id={`product-${product.id}`}
            data-product-index={index}
            className={cn(
              'motion-safe-transition w-[86%] shrink-0 snap-center snap-always scroll-mt-28 overflow-hidden rounded-lg bg-white transition-transform motion-reduce:transform-none motion-reduce:transition-none sm:w-[64%] lg:w-[46%] xl:w-[40%]',
              index === activeIndex && '-translate-y-2',
            )}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <ProductMediaVisual media={product} className="aspect-[4/3]" />
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
                {product.purpose}
              </p>
            </div>
          </article>
        ))}
        <div
          className="w-[7%] shrink-0 sm:w-[18%] lg:w-[27%] xl:w-[30%]"
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-6">
        <p
          className="text-muted-foreground text-sm"
          aria-live="polite"
          aria-atomic="true"
        >
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
            aria-controls="featured-products-carousel"
            aria-label={
              products[activeIndex - 1]
                ? `Show previous featured product: ${products[activeIndex - 1].name}`
                : 'No previous featured product'
            }
            disabled={activeIndex === 0}
            onClick={() => scrollToProduct(activeIndex - 1)}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full bg-transparent"
            aria-controls="featured-products-carousel"
            aria-label={
              products[activeIndex + 1]
                ? `Show next featured product: ${products[activeIndex + 1].name}`
                : 'No next featured product'
            }
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
