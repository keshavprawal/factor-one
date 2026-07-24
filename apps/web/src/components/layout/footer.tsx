import Link from 'next/link';
import { Container } from '@/components/layout/container';
import type { NavigationItem } from '@/components/layout/navbar';
import { cn } from '@/lib/utils';
export interface FooterProps { items?: NavigationItem[]; className?: string; }
export function Footer({ items = [], className }: FooterProps) { return <footer className={cn('border-t', className)}><Container className="flex min-h-20 flex-col justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center"><p>© {new Date().getFullYear()} Factor One.</p>{items.length > 0 ? <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">{items.map((item) => <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">{item.label}</Link>)}</nav> : null}</Container></footer>; }
