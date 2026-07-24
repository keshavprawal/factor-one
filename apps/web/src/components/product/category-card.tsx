import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface CategoryCardProps {
  name: string;
  description: string;
  href: string;
  image: string;
}

export function CategoryCard({ name, description, href, image }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group block transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transform-none"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image src={image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none" />
      </div>
      <div className="flex items-start justify-between gap-5 pt-5">
        <div>
          <h3 className="text-2xl font-medium tracking-[-0.035em]">{name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <ArrowRight className="mt-1 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
      </div>
    </Link>
  );
}
