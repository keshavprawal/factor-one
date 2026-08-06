import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

/** Approved horizontal Factor One symbol-and-wordmark lockup. */
export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/factor-one-logo-horizontal.png"
      alt="Factor One logo"
      width={1792}
      height={696}
      priority={priority}
      sizes="(min-width: 640px) 136px, 120px"
      className={cn('h-auto w-[7.5rem] sm:w-[8.5rem]', className)}
    />
  );
}
