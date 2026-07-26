import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface ProductCardProps {
  description: string;
  href: string;
  image?: string;
  imageAlt?: string;
  name: string;
  visualStatus: string;
}

function ProductVisual({
  image,
  imageAlt,
  name,
}: Pick<ProductCardProps, 'image' | 'imageAlt' | 'name'>) {
  if (image && imageAlt) {
    return (
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        className="motion-media-transition object-cover transition-transform group-hover:scale-[1.03] motion-reduce:transform-none"
      />
    );
  }

  return (
    <div
      className="bg-muted absolute inset-0 flex items-end overflow-hidden p-5"
      role="img"
      aria-label={`${name} product photography pending`}
    >
      <div
        className="border-foreground/10 absolute inset-[14%] rounded-[1.5rem] border"
        aria-hidden="true"
      />
      <div
        className="border-foreground/10 absolute inset-x-[24%] bottom-[24%] top-[34%] rounded-full border"
        aria-hidden="true"
      />
      <p className="text-muted-foreground relative text-[0.65rem] font-semibold uppercase tracking-[0.12em]">
        {name} · Photography pending
      </p>
    </div>
  );
}

export function ProductCard({
  description,
  href,
  image,
  imageAlt,
  name,
  visualStatus,
}: ProductCardProps) {
  return (
    <article className="group h-full">
      <Link
        href={href}
        className="motion-safe-transition focus-visible:ring-ring flex h-full flex-col transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-4 active:translate-y-0 motion-reduce:transform-none"
      >
        <div className="bg-muted relative aspect-square overflow-hidden rounded-md">
          <ProductVisual image={image} imageAlt={imageAlt} name={name} />
          <p className="bg-charcoal/85 text-charcoal-foreground absolute bottom-3 left-3 right-3 rounded-sm px-3 py-2 text-xs leading-5">
            {visualStatus}
          </p>
        </div>
        <div className="flex flex-1 flex-col pt-5">
          <h3 className="text-xl font-medium tracking-[-0.03em]">{name}</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            {description}
          </p>
          <span className="text-foreground mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium">
            View product direction
            <ArrowUpRight
              className="motion-safe-transition size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
