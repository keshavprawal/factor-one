import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOwnershipPolicyPath, ownershipPolicies } from '@/config/ownership';
import { getCanonicalSiteUrl, siteConfig } from '@/config/site';

const canonicalSiteUrl = getCanonicalSiteUrl();
const description =
  'Clear policies and support guidance for Factor One owners after purchase.';

export const metadata: Metadata = {
  title: 'Ownership',
  description,
  alternates: canonicalSiteUrl ? { canonical: '/ownership' } : undefined,
  openGraph: {
    description,
    siteName: siteConfig.name,
    title: 'Ownership',
    type: 'website',
    url: canonicalSiteUrl ? '/ownership' : undefined,
  },
  twitter: {
    card: 'summary',
    description,
    title: 'Ownership',
  },
};

export default function OwnershipPage() {
  return (
    <>
      <section
        className="bg-warm section-space"
        aria-labelledby="ownership-heading"
      >
        <Container>
          <Breadcrumbs
            items={[{ href: '/', label: 'Home' }, { label: 'Ownership' }]}
          />
          <div className="mt-10 max-w-3xl">
            <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
              Ownership
            </p>
            <h1
              id="ownership-heading"
              className="mt-4 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Clear support after you buy.
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
              Find the policy and support information that explains what happens
              after your Factor One product arrives.
            </p>
          </div>
        </Container>
      </section>

      <section
        className="section-space bg-white"
        aria-labelledby="ownership-areas-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
              Support and policies
            </p>
            <h2
              id="ownership-areas-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
            >
              Start with the information you need.
            </h2>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ownershipPolicies.map((policy) => (
              <li key={policy.id}>
                <Card className="h-full shadow-none">
                  <CardHeader>
                    <CardTitle className="text-xl tracking-[-0.03em]">
                      <Link
                        href={getOwnershipPolicyPath(policy)}
                        className="motion-safe-transition hover:text-factor-red focus-visible:text-factor-red inline-flex min-h-11 items-center"
                      >
                        {policy.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-6">
                      {policy.description}
                    </p>
                    {policy.publicationStatus === 'provisional' ? (
                      <p className="text-muted-foreground mt-5 text-xs font-medium uppercase tracking-[0.12em]">
                        Provisional policy
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
