import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { getSiteUrl, siteConfig } from '@/config/site';
import './globals.css';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: siteUrl ?? undefined,
  alternates: siteUrl ? { canonical: '/' } : undefined,
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: 'website',
    url: siteUrl ?? undefined,
  },
  twitter: {
    card: 'summary',
    description: siteConfig.description,
    title: siteConfig.name,
  },
  robots: siteUrl
    ? { follow: true, index: true }
    : { follow: false, index: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const websiteStructuredData = siteUrl
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteUrl.toString(),
      }
    : null;

  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen font-sans">
        <AppShell>{children}</AppShell>
        {websiteStructuredData ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteStructuredData).replace(
                /</g,
                '\\u003c',
              ),
            }}
          />
        ) : null}
      </body>
    </html>
  );
}
