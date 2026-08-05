import type { Metadata } from 'next';
import Link from 'next/link';
import { CompatibilityExplorer } from '@/components/compatibility/compatibility-explorer';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { StructuredData } from '@/components/seo/structured-data';
import {
  compatibilityKnowledgeLinks,
  compatibilityVehicles,
} from '@/config/compatibility';
import { getCanonicalSiteUrl, siteConfig } from '@/config/site';

const canonicalSiteUrl = getCanonicalSiteUrl();
const description =
  'Review which Factor One product directions are listed for the VinFast VF7 and understand their verification status.';

export const metadata: Metadata = {
  title: 'Vehicle Compatibility',
  description,
  alternates: canonicalSiteUrl ? { canonical: '/compatibility' } : undefined,
  openGraph: {
    description,
    siteName: siteConfig.name,
    title: 'Vehicle Compatibility',
    type: 'website',
    url: canonicalSiteUrl ? '/compatibility' : undefined,
  },
  twitter: {
    card: 'summary',
    description,
    title: 'Vehicle Compatibility',
  },
};

const statusExplanations = [
  {
    label: 'Verified',
    description:
      'Factor One has approved physical fitment for the selected car.',
  },
  {
    label: 'Verification pending',
    description:
      'The product is associated with the car, but physical fitment has not been approved yet.',
  },
  {
    label: 'Not listed',
    description:
      'Factor One does not currently list the product for the selected car.',
  },
] as const;

export default function CompatibilityPage() {
  const structuredData = canonicalSiteUrl
    ? {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Factor One Vehicle Compatibility',
        description,
        url: new URL('/compatibility', canonicalSiteUrl).toString(),
      }
    : null;

  return (
    <>
      <section
        className="bg-warm section-space"
        aria-labelledby="compatibility-heading"
      >
        <Container>
          <Breadcrumbs
            items={[
              { href: '/', label: 'Home' },
              { label: 'Vehicle Compatibility' },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
              Vehicle Compatibility
            </p>
            <h1
              id="compatibility-heading"
              className="mt-4 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Know what is listed for your car.
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
              See which Factor One product directions are associated with your
              car, and whether physical fitment has been verified or is still
              pending.
            </p>
          </div>
        </Container>
      </section>

      <CompatibilityExplorer vehicles={compatibilityVehicles} />

      <section
        className="section-space bg-white"
        aria-labelledby="compatibility-status-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
              Status guide
            </p>
            <h2
              id="compatibility-status-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
            >
              Read every status clearly.
            </h2>
          </div>
          <Grid columns={3} className="mt-10">
            {statusExplanations.map((status) => (
              <article
                key={status.label}
                className="border-border border-t py-7"
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em]">
                  {status.label}
                </h3>
                <p className="text-muted-foreground mt-3 leading-7">
                  {status.description}
                </p>
              </article>
            ))}
          </Grid>
        </Container>
      </section>

      <section
        className="bg-charcoal text-charcoal-foreground section-space"
        aria-labelledby="compatibility-guidance-heading"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div className="max-w-xl">
              <p className="text-charcoal-foreground/60 text-xs font-semibold uppercase tracking-[0.14em]">
                Knowledge Centre
              </p>
              <h2
                id="compatibility-guidance-heading"
                className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
              >
                Understand before you choose.
              </h2>
              <p className="text-charcoal-foreground/70 mt-5 leading-7">
                These preview guides explain where reviewed compatibility
                information will live. They do not replace product-level
                verification.
              </p>
            </div>
            <ul className="divide-charcoal-foreground/15 divide-y border-y border-white/15">
              {compatibilityKnowledgeLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="motion-safe-transition hover:text-factor-red focus-visible:ring-factor-red flex min-h-16 items-center py-4 text-lg font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-[hsl(var(--charcoal))]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {structuredData ? <StructuredData data={structuredData} /> : null}
    </>
  );
}
