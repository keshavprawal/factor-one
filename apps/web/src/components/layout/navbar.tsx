'use client';

import Link from 'next/link';
import { CarFront, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/container';
import {
  isAvailableNavigationItem,
  isCurrentNavigationItem,
  mobileNavigation,
  primaryNavigation,
  productNavigation,
  type NavigationItem,
} from '@/config/navigation';
import { cn } from '@/lib/utils';

const iconButtonClassName =
  'inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-black/5 focus-visible:bg-black/5 disabled:cursor-not-allowed disabled:opacity-45';

interface NavigationItemLinkProps {
  className: string;
  item: NavigationItem;
  onNavigate?: () => void;
  pathname: string;
}

function NavigationItemLink({
  className,
  item,
  onNavigate,
  pathname,
}: NavigationItemLinkProps) {
  if (!isAvailableNavigationItem(item)) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={className}
        title={`${item.label} is not yet available`}
      >
        {item.label}
        <span className="sr-only"> (not yet available)</span>
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={
        isCurrentNavigationItem(item, pathname) ? 'page' : undefined
      }
      className={className}
      onClick={onNavigate}
    >
      {item.label}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname() ?? '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpenRef = useRef(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isMenuOpen) {
      wasMenuOpenRef.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    if (dialog.open) {
      dialog.close();
    }
    if (wasMenuOpenRef.current) {
      menuTriggerRef.current?.focus();
      wasMenuOpenRef.current = false;
    }
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        'animate-hero-fade sticky top-0 z-40 transition-shadow duration-300',
        isScrolled && 'shadow-[0_1px_18px_rgba(15,23,42,0.12)]',
      )}
    >
      <nav
        aria-label="Product navigation"
        className="bg-charcoal text-charcoal-foreground"
      >
        <Container className="scrollbar-none flex h-10 items-center gap-7 overflow-x-auto">
          <span className="text-charcoal-foreground/55 shrink-0 text-[0.65rem] font-medium uppercase tracking-[0.16em]">
            Products
          </span>
          {productNavigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-charcoal-foreground/75 hover:text-charcoal-foreground focus-visible:ring-charcoal-foreground focus-visible:ring-offset-charcoal inline-flex min-h-10 shrink-0 items-center text-xs font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </nav>

      <div className="bg-warm/95 border-border border-b backdrop-blur">
        <Container className="flex h-[4.5rem] items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-base font-semibold tracking-[-0.03em]"
            aria-label="Factor One home"
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Factor One
          </Link>

          <nav
            aria-label="Primary navigation"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:flex"
          >
            {primaryNavigation.map((item) => (
              <NavigationItemLink
                key={item.id}
                item={item}
                pathname={pathname}
                className="text-foreground/70 hover:text-foreground disabled:hover:text-foreground/70 inline-flex min-h-11 min-w-11 items-center text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              />
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className={cn(
                iconButtonClassName,
                'hidden gap-2 px-3 sm:flex sm:w-auto',
              )}
              title="My Garage is not yet available"
            >
              <CarFront className="size-4" aria-hidden="true" />
              <span className="text-xs font-medium">My Garage</span>
              <span className="sr-only"> (not yet available)</span>
            </button>
            <button
              ref={menuTriggerRef}
              type="button"
              className={cn(iconButtonClassName, 'xl:hidden')}
              aria-label={
                isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-labelledby="mobile-navigation-heading"
        aria-modal="true"
        className="bg-warm text-foreground border-border backdrop:bg-foreground/30 m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg border p-0 xl:hidden"
        onCancel={(event) => {
          event.preventDefault();
          setIsMenuOpen(false);
        }}
        onClose={() => setIsMenuOpen(false)}
      >
        <Container className="py-5 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="mobile-navigation-heading"
              className="text-lg font-semibold tracking-[-0.02em]"
            >
              Navigation
            </h2>
            <button
              type="button"
              className={iconButtonClassName}
              aria-label="Close navigation menu"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-4 grid">
            {mobileNavigation.map((item) => (
              <NavigationItemLink
                key={item.id}
                item={item}
                pathname={pathname}
                onNavigate={() => setIsMenuOpen(false)}
                className="hover:bg-muted inline-flex min-h-11 min-w-11 items-center rounded-md px-3 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45"
              />
            ))}
          </nav>
        </Container>
      </dialog>
    </header>
  );
}
