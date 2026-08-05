import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { OwnershipPolicySections } from '@/components/ownership/policy-sections';
import {
  getOwnershipPolicy,
  getOwnershipPolicyPath,
  isOwnershipPolicyIndexable,
  ownershipPolicies,
} from '@/config/ownership';
import { getCanonicalSiteUrl, siteConfig } from '@/config/site';

interface OwnershipPolicyPageProps {
  params: Promise<{ policy: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ownershipPolicies.map((policy) => ({ policy: policy.slug }));
}

export async function generateMetadata({
  params,
}: OwnershipPolicyPageProps): Promise<Metadata> {
  const { policy: slug } = await params;
  const policy = getOwnershipPolicy(slug);

  if (!policy) {
    return {};
  }

  const canonicalSiteUrl = getCanonicalSiteUrl();
  const isIndexable =
    isOwnershipPolicyIndexable(policy) && Boolean(canonicalSiteUrl);
  const policyPath = getOwnershipPolicyPath(policy);

  return {
    title: policy.title,
    description: policy.description,
    alternates: isIndexable ? { canonical: policyPath } : { canonical: null },
    openGraph: isIndexable
      ? {
          description: policy.description,
          siteName: siteConfig.name,
          title: policy.title,
          type: 'article',
          url: policyPath,
        }
      : null,
    robots: isIndexable
      ? { follow: true, index: true }
      : { follow: false, index: false },
    twitter: isIndexable
      ? {
          card: 'summary',
          description: policy.description,
          title: policy.title,
        }
      : null,
  };
}

export default async function OwnershipPolicyPage({
  params,
}: OwnershipPolicyPageProps) {
  const { policy: slug } = await params;
  const policy = getOwnershipPolicy(slug);

  if (!policy) {
    notFound();
  }

  return (
    <article>
      <header className="bg-warm section-space">
        <Container>
          <Breadcrumbs
            items={[
              { href: '/', label: 'Home' },
              { href: '/ownership', label: 'Ownership' },
              { label: policy.title },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
              Ownership
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {policy.title}
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
              {policy.description}
            </p>
            {policy.publicationStatus === 'provisional' ? (
              <p className="border-factor-red mt-8 max-w-2xl border-l-2 pl-5 text-sm leading-6">
                This policy is provisional and will be updated with
                founder-approved operational or legal details before launch.
              </p>
            ) : null}
          </div>
        </Container>
      </header>

      <div className="section-space bg-white">
        <Container>
          <OwnershipPolicySections policy={policy} />
        </Container>
      </div>
    </article>
  );
}
