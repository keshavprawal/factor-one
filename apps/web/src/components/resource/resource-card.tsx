import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface ResourceCardProps {
  title: string;
  description: string;
  href: string;
}

export function ResourceCard({ title, description, href }: ResourceCardProps) {
  return (
    <Link
      href={href}
      className="border-border focus-visible:ring-ring group flex h-full min-h-44 flex-col justify-between border-t py-6 transition-transform duration-500 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-4 motion-reduce:transform-none sm:py-7"
    >
      <div>
        <h3 className="text-2xl font-medium tracking-[-0.035em]">{title}</h3>
        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6 sm:text-base">
          {description}
        </p>
      </div>
      <ArrowRight
        className="mt-8 size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
        aria-hidden="true"
      />
    </Link>
  );
}
