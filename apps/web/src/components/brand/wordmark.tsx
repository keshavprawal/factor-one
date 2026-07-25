import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface WordmarkProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: 'display' | 'footer' | 'header';
}

const sizeClasses = {
  display: 'text-[clamp(3rem,10.5vw,8rem)] leading-[0.82] tracking-[-0.075em]',
  footer: 'text-2xl tracking-[-0.04em]',
  header: 'text-base tracking-[-0.03em]',
};

export function Wordmark({
  as: Comp = 'span',
  className,
  size = 'header',
  ...props
}: WordmarkProps) {
  return (
    <Comp
      className={cn('font-semibold', sizeClasses[size], className)}
      {...props}
    >
      Factor One
    </Comp>
  );
}
