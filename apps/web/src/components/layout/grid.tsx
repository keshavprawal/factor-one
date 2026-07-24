import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
const gridVariants = cva('grid', { variants: { columns: { 1: 'grid-cols-1', 2: 'grid-cols-1 sm:grid-cols-2', 3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', 4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' }, gap: { sm: 'gap-4', default: 'gap-6', lg: 'gap-8' } }, defaultVariants: { columns: 3, gap: 'default' } });
export interface GridProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof gridVariants> {}
export function Grid({ className, columns, gap, ...props }: GridProps) { return <div className={cn(gridVariants({ columns, gap }), className)} {...props} />; }
export { gridVariants };
