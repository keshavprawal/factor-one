'use client';

import Link from 'next/link';
import { CarFront, ChevronDown, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import { Wordmark } from '@/components/brand/wordmark';
import { Container } from '@/components/layout/container';
import {
  isAvailableNavigationItem,
  isCurrentNavigationItem,
  isGroupedNavigationItem,
  mobileNavigation,
  primaryNavigation,
  type AvailableNavigationItem,
  type GroupedNavigationItem,
} from '@/config/navigation';
import { cn } from '@/lib/utils';

const iconButtonClassName =
  'inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-black/5 focus-visible:bg-black/5 disabled:cursor-not-allowed disabled:opacity-45';

interface NavigationItemLinkProps {
  className: string;
  item: AvailableNavigationItem;
  onNavigate?: () => void;
  pathname: string;
}

function NavigationItemLink({
  className,
  item,
  onNavigate,
  pathname,
}: NavigationItemLinkProps) {
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

interface DesktopNavigationGroupProps {
  group: GroupedNavigationItem;
  isOpen: boolean;
  onClose: (restoreFocus?: boolean) => void;
  onOpen: () => void;
  pathname: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

function DesktopNavigationGroup({
  group,
  isOpen,
  onClose,
  onOpen,
  pathname,
  triggerRef,
}: DesktopNavigationGroupProps) {
  const groupRef = useRef<HTMLLIElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !groupRef.current?.contains(event.target)
      ) {
        onClose();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen, onClose]);

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      onOpen();
      requestAnimationFrame(() => firstItemRef.current?.focus());
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      onClose(true);
    }
  }

  return (
    <li ref={groupRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="text-foreground/70 hover:text-foreground inline-flex min-h-11 items-center gap-1 whitespace-nowrap text-xs font-medium transition-colors"
        aria-expanded={isOpen}
        aria-controls={`${group.id}-desktop-menu`}
        onClick={() => (isOpen ? onClose() : onOpen())}
        onKeyDown={handleTriggerKeyDown}
      >
        {group.label}
        <ChevronDown
          className={cn(
            'size-3.5 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id={`${group.id}-desktop-menu`}
          className="border-border bg-warm absolute left-1/2 top-[calc(100%+0.5rem)] w-64 -translate-x-1/2 rounded-lg border p-2 shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
        >
          <p className="text-muted-foreground px-3 pb-2 pt-1 text-[0.65rem] font-medium uppercase tracking-[0.14em]">
            Mud Guards
          </p>
          <ul>
            {group.children.map((item, index) => (
              <li key={item.id}>
                <Link
                  ref={index === 0 ? firstItemRef : undefined}
                  href={item.href}
                  aria-current={
                    isCurrentNavigationItem(item, pathname) ? 'page' : undefined
                  }
                  className="hover:bg-muted flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-colors"
                  onClick={() => onClose()}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      event.preventDefault();
                      onClose(true);
                    }
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

export function Navbar() {
  const pathname = usePathname() ?? '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [desktopGroupOpen, setDesktopGroupOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const groupTriggerRef = useRef<HTMLButtonElement>(null);
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

  function closeDesktopGroup(restoreFocus = false) {
    setDesktopGroupOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => groupTriggerRef.current?.focus());
    }
  }

  return (
    <header
      className={cn(
        'border-border bg-warm/95 animate-hero-fade sticky top-0 z-40 border-b backdrop-blur transition-shadow duration-300',
        isScrolled && 'shadow-[0_1px_18px_rgba(15,23,42,0.08)]',
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center"
          aria-label="Factor One home"
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <Wordmark />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 xl:block"
        >
          <ul className="flex items-center gap-5">
            {primaryNavigation.map((item) => {
              if (isGroupedNavigationItem(item)) {
                return (
                  <DesktopNavigationGroup
                    key={item.id}
                    group={item}
                    isOpen={desktopGroupOpen}
                    onOpen={() => setDesktopGroupOpen(true)}
                    onClose={closeDesktopGroup}
                    pathname={pathname}
                    triggerRef={groupTriggerRef}
                  />
                );
              }

              if (!isAvailableNavigationItem(item)) {
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="text-foreground/70 inline-flex min-h-11 items-center whitespace-nowrap text-xs font-medium opacity-40"
                      title={`${item.label} is not yet available`}
                    >
                      {item.label}
                      <span className="sr-only"> (not yet available)</span>
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <NavigationItemLink
                    item={item}
                    pathname={pathname}
                    className="text-foreground/70 hover:text-foreground inline-flex min-h-11 items-center whitespace-nowrap text-xs font-medium transition-colors"
                  />
                </li>
              );
            })}
          </ul>
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
        onClose={() => {
          setIsMenuOpen(false);
          setMobileGroupOpen(false);
        }}
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
          <nav aria-label="Mobile navigation" className="mt-4">
            <ul>
              {mobileNavigation.map((item) => {
                if (isGroupedNavigationItem(item)) {
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="hover:bg-muted flex min-h-11 w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-medium transition-colors"
                        aria-expanded={mobileGroupOpen}
                        aria-controls={`${item.id}-mobile-menu`}
                        onClick={() => setMobileGroupOpen((open) => !open)}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            'size-4 transition-transform duration-200',
                            mobileGroupOpen && 'rotate-180',
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      {mobileGroupOpen ? (
                        <ul
                          id={`${item.id}-mobile-menu`}
                          className="border-border ml-3 border-l pl-3"
                        >
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <NavigationItemLink
                                item={child}
                                pathname={pathname}
                                onNavigate={() => setIsMenuOpen(false)}
                                className="hover:bg-muted flex min-h-11 items-center rounded-md px-3 py-3 text-sm font-medium transition-colors"
                              />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                }

                if (!isAvailableNavigationItem(item)) {
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        className="inline-flex min-h-11 w-full items-center rounded-md px-3 py-3 text-sm font-medium opacity-45"
                        title={`${item.label} is not yet available`}
                      >
                        {item.label}
                        <span className="sr-only"> (not yet available)</span>
                      </button>
                    </li>
                  );
                }

                return (
                  <li key={item.id}>
                    <NavigationItemLink
                      item={item}
                      pathname={pathname}
                      onNavigate={() => setIsMenuOpen(false)}
                      className="hover:bg-muted flex min-h-11 items-center rounded-md px-3 py-3 text-sm font-medium transition-colors"
                    />
                  </li>
                );
              })}
            </ul>
          </nav>
        </Container>
      </dialog>
    </header>
  );
}
