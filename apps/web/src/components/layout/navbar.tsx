'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';

const navigationItems = [
  { href: '/vehicles', label: 'Vehicles' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/support', label: 'Support' },
];

const iconButtonClassName =
  'inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-black/5 focus-visible:bg-black/5';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <header
      className={cn(
        'animate-hero-fade sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-300',
        isScrolled && 'border-border bg-white/95 shadow-[0_1px_12px_rgba(15,23,42,0.06)] backdrop-blur',
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-[-0.02em]" aria-label="Factor One home">
          Factor One
        </Link>

        <nav aria-label="Primary navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-foreground/75 transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className={cn(iconButtonClassName, 'lg:hidden')}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
          <Link href="/search" className={iconButtonClassName} aria-label="Search">
            <Search className="size-[18px]" aria-hidden="true" />
          </Link>
          <Link href="/cart" className={iconButtonClassName} aria-label="Cart">
            <ShoppingBag className="size-[18px]" aria-hidden="true" />
          </Link>
        </div>
      </Container>

      {isMenuOpen ? (
        <div id="mobile-navigation" className="border-t border-border bg-white lg:hidden">
          <Container>
            <nav aria-label="Mobile navigation" className="grid py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
