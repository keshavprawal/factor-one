import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
type ContainerSize = 'default' | 'wide' | 'narrow';
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> { size?: ContainerSize; }
const sizes: Record<ContainerSize, string> = { default: 'max-w-7xl', wide: 'max-w-[90rem]', narrow: 'max-w-3xl' };
export function Container({ className, size = 'default', ...props }: ContainerProps) { return <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)} {...props} />; }
