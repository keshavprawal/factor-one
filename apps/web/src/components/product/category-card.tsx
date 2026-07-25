import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CategoryCardProps {
  description: string;
  href?: string;
  name: string;
  products: readonly string[];
  study: 'cabin' | 'cargo' | 'exterior';
}

const studyShapeClasses = {
  cabin: 'left-[18%] right-[18%] top-[24%] bottom-[18%] rounded-[1.5rem]',
  cargo: 'left-[14%] right-[14%] top-[34%] bottom-[16%] rounded-md',
  exterior: 'left-[12%] right-[12%] top-[20%] bottom-[30%] rounded-full',
};

function CategoryContent({
  description,
  href,
  name,
  products,
  study,
}: CategoryCardProps) {
  return (
    <>
      <div className="bg-muted relative aspect-[16/8] overflow-hidden rounded-md">
        <div
          className={cn(
            'border-foreground/10 absolute border',
            studyShapeClasses[study],
          )}
          aria-hidden="true"
        />
        <div
          className="border-foreground/10 absolute inset-x-[28%] bottom-[22%] h-px border-t"
          aria-hidden="true"
        />
        <p className="text-muted-foreground absolute bottom-4 left-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
          VF7 · Category study
        </p>
      </div>
      <div className="flex flex-1 items-start justify-between gap-5 pt-4">
        <div>
          <h3 className="text-xl font-medium tracking-[-0.035em]">{name}</h3>
          <p className="text-muted-foreground mt-1.5 text-sm leading-6">
            {description}
          </p>
          <p className="text-muted-foreground mt-3 text-xs leading-5">
            {products.join(' · ')}
          </p>
        </div>
        {href ? (
          <ArrowRight
            className="mt-1 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
            aria-hidden="true"
          />
        ) : (
          <span className="bg-muted shrink-0 rounded-full px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em]">
            Coming soon
          </span>
        )}
      </div>
    </>
  );
}

export function CategoryCard(props: CategoryCardProps) {
  const className =
    'focus-visible:ring-ring group flex h-full w-full flex-col text-left transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-offset-4 motion-reduce:transform-none';

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={cn(className, 'hover:-translate-y-1')}
        aria-label={`Explore ${props.name}`}
      >
        <CategoryContent {...props} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className="flex h-full w-full cursor-not-allowed flex-col text-left"
      aria-label={`${props.name}. Category page coming soon.`}
    >
      <CategoryContent {...props} />
    </button>
  );
}
