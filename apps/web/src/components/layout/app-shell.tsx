import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';

export interface AppShellProps {
  children: ReactNode;
}

/** Shared public-page landmarks and navigation. Route modules provide content. */
export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground sr-only fixed left-4 top-4 z-50 rounded-md px-4 py-2 text-sm font-medium focus-visible:not-sr-only"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
