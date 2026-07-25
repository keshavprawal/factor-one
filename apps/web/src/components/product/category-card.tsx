import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryProduct {
  href: string;
  name: string;
}

export interface CategoryCardProps {
  actionLabel: string;
  description: string;
  name: string;
  products: readonly CategoryProduct[];
  visual: 'cabin' | 'cargo' | 'exterior';
}

const visualShapeClasses = {
  cabin:
    'inset-x-[22%] bottom-[18%] top-[17%] rounded-[1.5rem] border before:absolute before:inset-x-[18%] before:bottom-[16%] before:h-px before:bg-foreground/10',
  cargo:
    'inset-x-[15%] bottom-[20%] top-[28%] rounded-lg border before:absolute before:inset-x-[22%] before:top-[22%] before:h-px before:bg-foreground/10',
  exterior:
    'inset-x-[13%] bottom-[28%] top-[18%] rounded-[45%] border before:absolute before:-bottom-4 before:left-[20%] before:right-[20%] before:h-px before:bg-foreground/10',
};

function CategoryVisual({
  count,
  visual,
}: {
  count: number;
  visual: CategoryCardProps['visual'];
}) {
  return (
    <div className="bg-warm relative aspect-[16/6] overflow-hidden rounded-md">
      <div
        className={cn(
          'border-foreground/10 absolute bg-white/35',
          visualShapeClasses[visual],
        )}
        aria-hidden="true"
      >
        <span className="bg-factor-red/75 absolute right-3 top-3 size-1.5 rounded-full" />
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4">
        <p className="text-muted-foreground text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
          For your VF7
        </p>
        <p className="text-foreground text-xs font-medium">
          {count} {count === 1 ? 'product' : 'products'} available
        </p>
      </div>
    </div>
  );
}

export function CategoryCard({
  actionLabel,
  description,
  name,
  products,
  visual,
}: CategoryCardProps) {
  return (
    <article className="flex h-full flex-col">
      <CategoryVisual count={products.length} visual={visual} />
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-2xl font-medium tracking-[-0.04em]">{name}</h3>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          {description}
        </p>

        <div className="border-border mt-5 border-t">
          <p className="text-muted-foreground py-3 text-[0.65rem] font-semibold uppercase tracking-[0.13em]">
            {actionLabel}
          </p>
          <ul>
            {products.map((product) => (
              <li key={product.name} className="border-border border-t">
                <Link
                  href={product.href}
                  className="group flex min-h-12 items-center justify-between gap-4 py-2 text-sm font-medium"
                >
                  {product.name}
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
