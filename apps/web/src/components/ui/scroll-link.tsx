'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from 'react';

export const ScrollLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'>
>(function ScrollLink({ href, onClick, ...props }, ref) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented || !href) {
      return;
    }

    const destination = new URL(href, window.location.href);

    if (
      destination.pathname !== window.location.pathname ||
      !destination.hash
    ) {
      return;
    }

    const target = document.getElementById(destination.hash.slice(1));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
      inline: 'center',
    });
    window.history.replaceState(
      null,
      '',
      `${destination.pathname}${destination.hash}`,
    );
  }

  return <a ref={ref} href={href} onClick={handleClick} {...props} />;
});

ScrollLink.displayName = 'ScrollLink';
