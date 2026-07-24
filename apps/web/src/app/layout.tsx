import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import './globals.css';
export const metadata: Metadata = { title: { default: 'Factor One', template: '%s | Factor One' }, description: 'Factor One Product Engineering' };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) { return <html lang="en"><body className="min-h-screen bg-background font-sans text-foreground"><a href="#main-content" className="sr-only fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only">Skip to content</a><div className="flex min-h-screen flex-col"><Navbar /><main id="main-content" className="flex-1">{children}</main><Footer /></div></body></html>; }
