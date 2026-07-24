import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';
export interface NavigationItem { href: string; label: string; }
export interface NavbarProps { items?: NavigationItem[]; className?: string; }
export function Navbar({ items = [], className }: NavbarProps) { return <header className={cn('border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80', className)}><Container className="flex h-16 items-center justify-between gap-6"><Link href="/" className="text-sm font-semibold tracking-tight" aria-label="Factor One home">Factor One</Link>{items.length > 0 ? <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">{items.map((item) => <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}</nav> : null}</Container></header>; }
