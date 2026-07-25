'use client';

import Image, { getImageProps } from 'next/image';
import { useState } from 'react';
import type { ProductMediaItem } from '@/config/product-media';
import { cn } from '@/lib/utils';

interface ProductMediaVisualProps {
  className?: string;
  media: ProductMediaItem;
  priority?: boolean;
}

function ProductSilhouette({ id }: { id: ProductMediaItem['id'] }) {
  return (
    <div
      className={cn(
        'border-foreground/10 absolute border',
        id === 'screen-guard' &&
          'inset-x-[20%] bottom-[25%] top-[20%] rounded-[1.75rem]',
        id === 'rear-door-mud-guard' &&
          'bottom-[19%] left-[24%] top-[18%] w-[30%] rounded-bl-[2.5rem] rounded-tr-[1.5rem]',
        id === 'bumper-mud-guard' &&
          'inset-x-[15%] bottom-[22%] top-[31%] rounded-b-[3rem] rounded-t-xl',
        id === 'parcel-tray' &&
          'inset-x-[13%] bottom-[24%] top-[28%] rounded-[45%_45%_1rem_1rem]',
        id === 'door-visor' &&
          'inset-x-[14%] bottom-[40%] top-[28%] skew-x-[-8deg] rounded-full',
      )}
      aria-hidden="true"
    >
      <div className="bg-factor-red/70 absolute bottom-3 right-3 size-1.5 rounded-full" />
    </div>
  );
}

export function ProductMediaVisual({
  className,
  media,
  priority = false,
}: ProductMediaVisualProps) {
  const [hasFailed, setHasFailed] = useState(false);
  const hasConfiguredMedia = Boolean(
    media.desktopImage && media.mobileImage && media.mediaStatus !== 'missing',
  );

  const desktopImage = hasConfiguredMedia
    ? getImageProps({
        src: media.desktopImage!,
        alt: media.altText,
        fill: true,
        priority,
        sizes:
          '(min-width: 1280px) 44vw, (min-width: 1024px) 48vw, (min-width: 640px) 72vw, 88vw',
      }).props
    : null;
  const mobileImage = hasConfiguredMedia
    ? getImageProps({
        src: media.mobileImage!,
        alt: media.altText,
        fill: true,
        priority,
        sizes: '88vw',
      }).props
    : null;

  return (
    <div className={cn('bg-warm relative isolate overflow-hidden', className)}>
      <div
        className="bg-muted absolute inset-0"
        role={!hasConfiguredMedia || hasFailed ? 'img' : undefined}
        aria-label={
          !hasConfiguredMedia || hasFailed ? media.altText : undefined
        }
        aria-hidden={hasConfiguredMedia && !hasFailed ? 'true' : undefined}
      >
        <div
          className="bg-factor-red/5 absolute right-[12%] top-[12%] size-16 rounded-full"
          aria-hidden="true"
        />
        <ProductSilhouette id={media.id} />
        <div className="bg-foreground/10 absolute inset-x-[18%] bottom-[18%] h-px" />
      </div>

      {desktopImage && mobileImage && !hasFailed ? (
        media.desktopImage === media.mobileImage ? (
          <div className="absolute inset-0">
            <Image
              src={media.desktopImage!}
              alt={media.altText}
              fill
              priority={priority}
              sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 48vw, (min-width: 640px) 72vw, 88vw"
              className="object-cover"
              style={{ objectPosition: media.focalPoint }}
              onError={() => setHasFailed(true)}
            />
          </div>
        ) : (
          <picture className="absolute inset-0">
            <source
              media="(max-width: 639px)"
              srcSet={mobileImage.srcSet}
              sizes={mobileImage.sizes}
            />
            <img
              {...desktopImage}
              alt={media.altText}
              style={{
                ...desktopImage.style,
                objectFit: 'cover',
                objectPosition: media.focalPoint,
              }}
              onError={() => setHasFailed(true)}
            />
          </picture>
        )
      ) : null}

      <div className="bg-charcoal/85 text-charcoal-foreground absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-4 rounded-sm px-4 py-3 backdrop-blur-sm sm:inset-x-5 sm:bottom-5">
        <div>
          <p className="text-sm font-medium">{media.name}</p>
          <p className="text-charcoal-foreground/70 mt-1 text-[0.65rem] uppercase tracking-[0.12em]">
            {!hasConfiguredMedia || hasFailed
              ? 'Photography pending'
              : 'Provisional photography'}
          </p>
        </div>
        <span
          className="bg-factor-red block size-2 shrink-0 rounded-full"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
