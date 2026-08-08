'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ProductMediaAsset } from '@/config/product-media';
import type { ProductSpecification } from '@/config/products';
import { cn } from '@/lib/utils';

export interface ProductDetailMediaEntry {
  asset: ProductMediaAsset;
  specificationLabels: readonly string[];
}

interface ProductDetailsExperienceProps {
  careInstructions: string | null;
  media: readonly ProductDetailMediaEntry[];
  specifications: readonly ProductSpecification[];
}

function getMediaLabel(media: ProductMediaAsset) {
  if (media.evidenceOnly) {
    return media.disclosure ?? 'Development evidence';
  }

  return media.disclosure ?? 'Product image';
}

export function ProductDetailsExperience({
  careInstructions,
  media,
  specifications,
}: ProductDetailsExperienceProps) {
  const [activeMediaId, setActiveMediaId] = useState(media[0]?.asset.id ?? '');
  const rowRefs = useRef(new Map<string, HTMLDivElement>());
  const mediaBySpecification = useMemo(
    () =>
      new Map(
        media.flatMap((entry) =>
          entry.specificationLabels.map((label) => [label, entry.asset.id]),
        ),
      ),
    [media],
  );
  const activeIndex = Math.max(
    0,
    media.findIndex((entry) => entry.asset.id === activeMediaId),
  );

  useEffect(() => {
    if (media.length < 2 || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const mediaId = visibleEntry.target.getAttribute('data-media-id');
          if (mediaId) {
            setActiveMediaId(mediaId);
          }
        }
      },
      { rootMargin: '-35% 0px -45%', threshold: [0.25, 0.6] },
    );

    rowRefs.current.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [media.length]);

  return (
    <div
      className={cn(
        'mt-8 grid gap-10',
        media.length > 0 &&
          'xl:grid-cols-[minmax(18rem,0.54fr)_minmax(0,1fr)] xl:gap-16',
      )}
      data-product-details-experience="true"
    >
      <div className={cn(media.length === 0 && 'max-w-3xl')}>
        <dl className="divide-border border-border divide-y border-y">
          {specifications.map((item) => {
            const mediaId = mediaBySpecification.get(item.label);

            return (
              <div
                key={item.label}
                ref={(node) => {
                  if (!mediaId) {
                    return;
                  }

                  if (node) {
                    rowRefs.current.set(item.label, node);
                  } else {
                    rowRefs.current.delete(item.label);
                  }
                }}
                className="group py-4 text-sm"
                data-media-id={mediaId}
                onMouseEnter={() => mediaId && setActiveMediaId(mediaId)}
              >
                <dt className="font-medium">{item.label}</dt>
                <dd className="text-muted-foreground mt-1 leading-6">
                  {item.value}
                  {item.unit ? ` ${item.unit}` : ''}
                  {item.label === 'Installation' ? (
                    <Link
                      href="/ownership/installation"
                      className="text-factor-red focus-visible:ring-foreground focus-visible:ring-offset-warm mt-2 inline-flex min-h-11 items-center font-medium underline underline-offset-4 sm:ml-4 sm:mt-0"
                    >
                      View installation guidance
                    </Link>
                  ) : null}
                  {mediaId && media.length > 1 ? (
                    <button
                      type="button"
                      className="text-factor-red focus-visible:ring-foreground focus-visible:ring-offset-warm mt-2 flex min-h-11 items-center font-medium underline underline-offset-4"
                      onClick={() => setActiveMediaId(mediaId)}
                      onFocus={() => setActiveMediaId(mediaId)}
                    >
                      Show related image
                    </button>
                  ) : null}
                </dd>
              </div>
            );
          })}
        </dl>

        {careInstructions ? (
          <p className="text-muted-foreground border-border border-b py-5 text-sm leading-6">
            <span className="text-foreground font-medium">Care:</span>{' '}
            {careInstructions}
          </p>
        ) : null}
      </div>

      {media.length > 0 ? (
        <div className="xl:sticky xl:top-24 xl:self-start">
          <div
            className="relative aspect-[4/3] overflow-hidden px-[7%] py-[4%]"
            aria-label="Product detail media"
            data-product-detail-media-stack="true"
          >
            {media.map(({ asset }, index) => {
              if (!asset.sourcePath) {
                return null;
              }

              const relativeIndex =
                (index - activeIndex + media.length) % media.length;
              const isActive = relativeIndex === 0;
              const isNext = relativeIndex === 1;
              const isPrevious = relativeIndex === media.length - 1;

              return (
                <figure
                  key={asset.id}
                  className={cn(
                    'bg-background motion-media-transition border-border absolute inset-[4%_7%] overflow-hidden rounded-md border transition-[transform,opacity]',
                    isActive && 'z-30 translate-x-0 opacity-100',
                    isNext &&
                      'opacity-48 z-20 translate-x-[9%] translate-y-[3%] scale-[0.96]',
                    isPrevious &&
                      'opacity-28 z-10 -translate-x-[7%] translate-y-[5%] scale-[0.94]',
                    !isActive && !isNext && !isPrevious && 'opacity-0',
                  )}
                  aria-hidden={!isActive}
                  data-active-detail-media={isActive ? 'true' : 'false'}
                >
                  <Image
                    src={asset.sourcePath}
                    alt={isActive ? asset.altText : ''}
                    fill
                    sizes="(min-width: 1280px) 58vw, 100vw"
                    className={cn(
                      'object-cover',
                      asset.intendedPlacement === 'product-specification' &&
                        'object-contain',
                    )}
                    style={{ objectPosition: asset.focalPoint }}
                  />
                  {isActive ? (
                    <figcaption className="bg-charcoal/88 text-charcoal-foreground absolute bottom-4 left-4 rounded-sm px-3 py-2 text-xs font-medium">
                      {getMediaLabel(asset)}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>

          {media.length > 1 ? (
            <div
              className="mt-3 flex justify-center gap-2"
              aria-label="Choose product detail image"
            >
              {media.map(({ asset }, index) => (
                <button
                  key={asset.id}
                  type="button"
                  className={cn(
                    'inline-flex size-11 items-center justify-center rounded-full',
                    index === activeIndex
                      ? 'text-factor-red'
                      : 'text-foreground/35',
                  )}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-label={`Show product detail image ${index + 1}`}
                  onClick={() => setActiveMediaId(asset.id)}
                >
                  <span className="size-2 rounded-full bg-current" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
