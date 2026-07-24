import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  href: string;
  image: string;
}

export function ProductCard({
  name,
  description,
  price,
  href,
  image,
}: ProductCardProps) {
  return (
    <article className="group h-full">
      <Link
        href={href}
        className="focus-visible:ring-ring flex h-full flex-col transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-4 motion-reduce:transform-none"
      >
        <div className="bg-muted relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>
        <div className="flex flex-1 flex-col pt-5">
          <h3 className="text-xl font-medium tracking-[-0.03em]">{name}</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            {description}
          </p>
          <p className="text-foreground mt-4 text-sm font-medium">{price}</p>
          <span className="text-foreground mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium">
            View Product
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
