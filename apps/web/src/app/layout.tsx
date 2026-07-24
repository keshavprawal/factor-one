import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Factor One',
    template: '%s | Factor One',
  },
  description: 'Factor One Product Engineering',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
