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
import { ScrollLink } from '@/components/ui/scroll-link';
import type {
  AvailableNavigationItem,
  GroupedNavigationItem,
  NavigationItem,
  NavigationLeaf,
  NavigationSection,
} from '@/config/navigation';
import { cn } from '@/lib/utils';

const iconButtonClassName =
  'motion-safe-transition inline-flex size-11 items-center justify-center rounded-full text-foreground transition-[color,background-color,transform] hover:bg-black/5 focus-visible:bg-black/5 active:scale-[0.97] disabled:cursor-not-allowed motion-reduce:transform-none';

function isAvailableNavigationItem(
  item: NavigationItem | NavigationLeaf,
): item is AvailableNavigationItem {
  return 'href' in item;
}

function isGroupedNavigationItem(
  item: NavigationItem,
): item is GroupedNavigationItem {
  return 'children' in item;
}

function isCurrentNavigationItem(
  item: AvailableNavigationItem,
  pathname: string,
) {
  return item.href === pathname;
}

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
    <ScrollLink
      href={item.href}
      aria-current={
        isCurrentNavigationItem(item, pathname) ? 'page' : undefined
      }
      className={className}
      onClick={onNavigate}
    >
      {item.label}
    </ScrollLink>
  );
}

function UnavailableNavigationControl({
  item,
  compact = false,
}: {
  compact?: boolean;
  item: NavigationLeaf;
}) {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className={cn(
        'text-muted-foreground inline-flex min-h-11 cursor-not-allowed select-none items-center justify-between gap-3 rounded-md text-left font-medium',
        compact ? 'w-full px-3 text-sm' : 'whitespace-nowrap text-xs',
      )}
      title={`${item.label} is not yet available`}
    >
      {item.label}
      <span className="bg-muted rounded-full px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em]">
        Coming soon
      </span>
    </button>
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

  let availableIndex = 0;

  return (
    <li ref={groupRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="motion-safe-transition text-foreground/85 hover:text-foreground inline-flex min-h-11 items-center gap-1 whitespace-nowrap text-xs font-medium transition-[color,transform] active:translate-y-px"
        aria-expanded={isOpen}
        aria-controls={`${group.id}-desktop-menu`}
        onClick={() => (isOpen ? onClose() : onOpen())}
        onKeyDown={handleTriggerKeyDown}
      >
        {group.label}
        <ChevronDown
          className={cn(
            'motion-safe-transition size-3.5 transition-transform',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id={`${group.id}-desktop-menu`}
          className="motion-menu-in border-border bg-warm absolute left-1/2 top-[calc(100%+0.5rem)] w-64 -translate-x-1/2 rounded-lg border p-2 shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
        >
          <p className="text-muted-foreground px-3 pb-2 pt-1 text-[0.65rem] font-medium uppercase tracking-[0.14em]">
            {group.label}
          </p>
          <ul>
            {group.children.map((item) => {
              if (!isAvailableNavigationItem(item)) {
                return (
                  <li key={item.id}>
                    <UnavailableNavigationControl item={item} compact />
                  </li>
                );
              }

              const isFirstAvailable = availableIndex === 0;
              availableIndex += 1;

              return (
                <li key={item.id}>
                  <ScrollLink
                    ref={isFirstAvailable ? firstItemRef : undefined}
                    href={item.href}
                    aria-current={
                      isCurrentNavigationItem(item, pathname)
                        ? 'page'
                        : undefined
                    }
                    className="motion-safe-transition hover:bg-muted focus-visible:bg-muted flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-[color,background-color,transform] active:translate-y-px"
                    onClick={() => onClose()}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        event.preventDefault();
                        onClose(true);
                      }
                    }}
                  >
                    {item.label}
                  </ScrollLink>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

interface DesktopGarageMenuProps {
  group: GroupedNavigationItem;
  isOpen: boolean;
  onClose: (restoreFocus?: boolean) => void;
  onOpen: () => void;
  pathname: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

function DesktopGarageMenu({
  group,
  isOpen,
  onClose,
  onOpen,
  pathname,
  triggerRef,
}: DesktopGarageMenuProps) {
  const groupRef = useRef<HTMLDivElement>(null);

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

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      onOpen();
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      onClose(true);
    }
  }

  return (
    <div ref={groupRef} className="relative hidden sm:block">
      <button
        ref={triggerRef}
        type="button"
        className={cn(iconButtonClassName, 'gap-2 px-3 sm:w-auto')}
        aria-expanded={isOpen}
        aria-controls="garage-desktop-menu"
        onClick={() => (isOpen ? onClose() : onOpen())}
        onKeyDown={handleKeyDown}
      >
        <CarFront className="size-4" aria-hidden="true" />
        <span className="text-xs font-medium">My Garage</span>
        <ChevronDown
          className={cn(
            'motion-safe-transition size-3.5 transition-transform',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id="garage-desktop-menu"
          className="motion-menu-in border-border bg-warm absolute right-0 top-[calc(100%+0.5rem)] w-72 rounded-lg border p-2 shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault();
              onClose(true);
            }
          }}
        >
          <p className="text-muted-foreground px-3 pb-2 pt-1 text-[0.65rem] font-medium uppercase tracking-[0.14em]">
            Garage
          </p>
          <ul>
            {group.children.map((item) => {
              if (!isAvailableNavigationItem(item)) {
                return (
                  <li key={item.id}>
                    <UnavailableNavigationControl item={item} compact />
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <NavigationItemLink
                    item={item}
                    pathname={pathname}
                    onNavigate={() => onClose()}
                    className="motion-safe-transition hover:bg-muted focus-visible:bg-muted flex min-h-11 items-center rounded-md px-3 text-sm font-medium transition-[color,background-color,transform] active:translate-y-px aria-[current=page]:font-semibold"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export interface NavbarProps {
  companyNavigation: readonly NavigationItem[];
  garageNavigation: GroupedNavigationItem;
  mobileNavigationSections: readonly NavigationSection[];
  productNavigation: readonly NavigationItem[];
}

export function Navbar({
  companyNavigation,
  garageNavigation,
  mobileNavigationSections,
  productNavigation,
}: NavbarProps) {
  const pathname = usePathname() ?? '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [desktopProductMenuOpen, setDesktopProductMenuOpen] = useState(false);
  const [desktopGarageOpen, setDesktopGarageOpen] = useState(false);
  const [mobileGroupOpen, setMobileGroupOpen] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const productMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const garageTriggerRef = useRef<HTMLButtonElement>(null);
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

  function closeProductMenu(restoreFocus = false) {
    setDesktopProductMenuOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => productMenuTriggerRef.current?.focus());
    }
  }

  function closeGarageMenu(restoreFocus = false) {
    setDesktopGarageOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => garageTriggerRef.current?.focus());
    }
  }

  function renderDesktopItem(item: NavigationItem) {
    if (isGroupedNavigationItem(item)) {
      return (
        <DesktopNavigationGroup
          key={item.id}
          group={item}
          isOpen={desktopProductMenuOpen}
          onOpen={() => {
            setDesktopGarageOpen(false);
            setDesktopProductMenuOpen(true);
          }}
          onClose={closeProductMenu}
          pathname={pathname}
          triggerRef={productMenuTriggerRef}
        />
      );
    }

    if (!isAvailableNavigationItem(item)) {
      return (
        <li key={item.id}>
          <UnavailableNavigationControl item={item} />
        </li>
      );
    }

    return (
      <li key={item.id}>
        <NavigationItemLink
          item={item}
          pathname={pathname}
          className="motion-safe-transition text-foreground/85 hover:text-foreground aria-[current=page]:text-foreground inline-flex min-h-11 items-center whitespace-nowrap text-xs font-medium transition-[color,transform] active:translate-y-px aria-[current=page]:font-semibold"
        />
      </li>
    );
  }

  function renderMobileItem(item: NavigationItem) {
    if (isGroupedNavigationItem(item)) {
      const isOpen = mobileGroupOpen === item.id;

      return (
        <li key={item.id}>
          <button
            type="button"
            className="motion-safe-transition hover:bg-muted focus-visible:bg-muted flex min-h-11 w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-medium transition-[color,background-color,transform] active:translate-y-px"
            aria-expanded={isOpen}
            aria-controls={`${item.id}-mobile-menu`}
            onClick={() => setMobileGroupOpen(isOpen ? null : item.id)}
          >
            {item.label}
            <ChevronDown
              className={cn(
                'motion-safe-transition size-4 transition-transform',
                isOpen && 'rotate-180',
              )}
              aria-hidden="true"
            />
          </button>
          {isOpen ? (
            <ul
              id={`${item.id}-mobile-menu`}
              className="motion-menu-in border-border ml-3 border-l pl-3"
            >
              {item.children.map((child) => (
                <li key={child.id}>
                  {isAvailableNavigationItem(child) ? (
                    <NavigationItemLink
                      item={child}
                      pathname={pathname}
                      onNavigate={() => setIsMenuOpen(false)}
                      className="motion-safe-transition hover:bg-muted focus-visible:bg-muted flex min-h-11 items-center rounded-md px-3 py-3 text-sm font-medium transition-[color,background-color,transform] active:translate-y-px"
                    />
                  ) : (
                    <UnavailableNavigationControl item={child} compact />
                  )}
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
          <UnavailableNavigationControl item={item} compact />
        </li>
      );
    }

    return (
      <li key={item.id}>
        <NavigationItemLink
          item={item}
          pathname={pathname}
          onNavigate={() => setIsMenuOpen(false)}
          className="motion-safe-transition hover:bg-muted focus-visible:bg-muted aria-[current=page]:text-foreground flex min-h-11 items-center rounded-md px-3 py-3 text-sm font-medium transition-[color,background-color,transform] active:translate-y-px aria-[current=page]:font-semibold"
        />
      </li>
    );
  }

  return (
    <header
      className={cn(
        'motion-safe-transition border-border bg-warm/95 animate-hero-fade sticky top-0 z-40 border-b backdrop-blur transition-[background-color,box-shadow]',
        isScrolled && 'shadow-[0_1px_18px_rgba(15,23,42,0.08)]',
      )}
    >
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Link
          href="/"
          className="motion-safe-transition inline-flex min-h-11 items-center transition-opacity hover:opacity-75 active:opacity-60"
          aria-label="Factor One home"
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <Wordmark />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 xl:flex xl:items-center xl:gap-8"
        >
          <ul className="flex items-center gap-5">
            {productNavigation.map(renderDesktopItem)}
          </ul>
          <ul className="flex items-center gap-5">
            {companyNavigation.map(renderDesktopItem)}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <DesktopGarageMenu
            group={garageNavigation}
            isOpen={desktopGarageOpen}
            onOpen={() => {
              setDesktopProductMenuOpen(false);
              setDesktopGarageOpen(true);
            }}
            onClose={closeGarageMenu}
            pathname={pathname}
            triggerRef={garageTriggerRef}
          />
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
        className="motion-dialog-in bg-warm text-foreground border-border backdrop:bg-foreground/30 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-lg border p-0 xl:hidden"
        onCancel={(event) => {
          event.preventDefault();
          setIsMenuOpen(false);
        }}
        onClose={() => {
          setIsMenuOpen(false);
          setMobileGroupOpen(null);
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
            {mobileNavigationSections.map((section, index) => (
              <section
                key={section.id}
                className={cn(index > 0 && 'border-border mt-4 border-t pt-4')}
                aria-labelledby={`mobile-navigation-${section.id}`}
              >
                <h3
                  id={`mobile-navigation-${section.id}`}
                  className="text-muted-foreground px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em]"
                >
                  {section.label}
                </h3>
                <ul className="mt-1">{section.items.map(renderMobileItem)}</ul>
              </section>
            ))}
          </nav>
        </Container>
      </dialog>
    </header>
  );
}
