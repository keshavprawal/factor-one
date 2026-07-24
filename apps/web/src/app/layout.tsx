import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import './globals.css';

export const metadata: Metadata = { title: { default: 'Factor One', template: '%s | Factor One' }, description: 'Factor One Product Engineering' };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body className="min-h-screen bg-background font-sans text-foreground"><div className="flex min-h-screen flex-col"><Navbar /><main id="main-content" className="flex-1">{children}</main><Footer /></div></body></html>;
}
