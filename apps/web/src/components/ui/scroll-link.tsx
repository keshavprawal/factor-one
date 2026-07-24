'use client';

import { forwardRef, type ComponentPropsWithoutRef, type MouseEvent } from 'react';

export const ScrollLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<'a'>>(function ScrollLink(
  { href, onClick, ...props },
  ref,
) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented || !href?.startsWith('#')) {
      return;
    }

    const target = document.getElementById(href.slice(1));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    window.history.replaceState(null, '', href);
  }

  return <a ref={ref} href={href} onClick={handleClick} {...props} />;
});

ScrollLink.displayName = 'ScrollLink';
