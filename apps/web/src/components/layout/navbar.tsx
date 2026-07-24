'use client';

import Link from 'next/link';
import { Menu, Search, ShoppingBag, X, type LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/layout/container';
import {
  isAvailableNavigationItem,
  isCurrentNavigationItem,
  mobileNavigation,
  primaryNavigation,
  utilityNavigation,
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

function UtilityControl({
  icon: Icon,
  item,
}: {
  icon: LucideIcon;
  item: NavigationItem;
}) {
  if (isAvailableNavigationItem(item)) {
    return (
      <Link
        href={item.href}
        className={iconButtonClassName}
        aria-label={item.label}
      >
        <Icon className="size-5" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className={iconButtonClassName}
      aria-label={`${item.label} is not yet available`}
      title={`${item.label} is not yet available`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
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
        'animate-hero-fade sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-300',
        isScrolled &&
          'border-border bg-white/95 shadow-[0_1px_12px_rgba(15,23,42,0.06)] backdrop-blur',
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-base font-semibold tracking-[-0.02em]"
          aria-label="Factor One home"
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          Factor One
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
        >
          {primaryNavigation.map((item) => (
            <NavigationItemLink
              key={item.id}
              item={item}
              pathname={pathname}
              className="text-foreground/75 hover:text-foreground disabled:hover:text-foreground/75 inline-flex min-h-11 min-w-11 items-center text-sm font-medium transition-colors"
            />
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <UtilityControl item={utilityNavigation[0]} icon={Search} />
          <UtilityControl item={utilityNavigation[1]} icon={ShoppingBag} />
          <button
            ref={menuTriggerRef}
            type="button"
            className={cn(iconButtonClassName, 'lg:hidden')}
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

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        aria-labelledby="mobile-navigation-heading"
        aria-modal="true"
        className="bg-background text-foreground border-border backdrop:bg-foreground/20 m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg border p-0 lg:hidden"
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
