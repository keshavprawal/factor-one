import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { ProductDetailSections } from '@/components/product/product-detail-sections';
import { ProductMediaVisual } from '@/components/product/product-media-visual';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  getApprovedProductMedia,
  getProductBySlug,
  getProductCanonicalPath,
  getProductCompatibilitySummary,
  getProductPageContent,
  getProductStructuredData,
  getProductWarrantySummary,
  getRelatedProducts,
  isProductPageIndexable,
} from '@/config/product-pages';
import { getProductDetailMediaItem } from '@/config/product-media';
import { products } from '@/config/products';
import { getCanonicalSiteUrl, siteConfig } from '@/config/site';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

function statusLabel(status: 'pending' | 'verified' | 'not-listed') {
  if (status === 'verified') {
    return 'Verified';
  }

  if (status === 'pending') {
    return 'Verification pending';
  }

  return 'Not listed';
}

function formatPrice(amountMinor: number, currency: string) {
  return new Intl.NumberFormat('en-IN', {
    currency,
    style: 'currency',
  }).format(amountMinor / 100);
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const canonicalSiteUrl = getCanonicalSiteUrl();
  const isIndexable =
    isProductPageIndexable(product) && Boolean(canonicalSiteUrl);
  const seo = product.seo.status === 'approved' ? product.seo.value : null;
  const canonicalPath = getProductCanonicalPath(product);

  return {
    title: seo?.title ?? product.name,
    ...(seo ? { description: seo.description } : {}),
    alternates: isIndexable
      ? { canonical: canonicalPath }
      : { canonical: null },
    openGraph:
      isIndexable && seo
        ? {
            description: seo.description,
            siteName: siteConfig.name,
            title: seo.title,
            type: 'website',
            url: canonicalPath,
          }
        : null,
    robots: isIndexable
      ? { follow: true, index: true }
      : { follow: false, index: false },
    twitter:
      isIndexable && seo
        ? {
            card: 'summary',
            description: seo.description,
            title: seo.title,
          }
        : null,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const content = getProductPageContent(product);
  const warrantySummary = getProductWarrantySummary(product);
  const detailMedia = getProductDetailMediaItem(product.id);
  const galleryMedia = getApprovedProductMedia(product.id, 'product-gallery');
  const compatibility = getProductCompatibilitySummary(product);
  const relatedProducts = getRelatedProducts(product);
  const canonicalSiteUrl = getCanonicalSiteUrl();
  const structuredData = getProductStructuredData(product, canonicalSiteUrl);

  return (
    <>
      <section
        className="section-space scroll-mt-24"
        aria-labelledby="product-heading"
      >
        <Container>
          <Breadcrumbs
            items={[{ href: '/', label: 'Home' }, { label: product.name }]}
          />

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
            <ProductMediaVisual
              media={detailMedia}
              priority
              className="aspect-[4/3] rounded-lg"
            />

            <div className="max-w-xl">
              {product.availability.approvalStatus === 'approved' ? (
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.14em]">
                  {product.availability.label}
                </p>
              ) : null}
              <h1
                id="product-heading"
                className="mt-4 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl"
              >
                {product.name}
              </h1>

              {product.badges
                .filter((badge) => badge.approvalStatus === 'approved')
                .map((badge) => (
                  <div key={badge.id} className="mt-5">
                    <Badge variant="outline" className="w-fit">
                      {badge.label}
                    </Badge>
                    {badge.supportingText ? (
                      <p className="text-muted-foreground mt-2 text-sm">
                        {badge.supportingText}
                      </p>
                    ) : null}
                  </div>
                ))}

              {content.shortDescription ? (
                <p className="text-muted-foreground mt-6 text-lg leading-8 sm:text-xl">
                  {content.shortDescription}
                </p>
              ) : null}

              {content.price ? (
                <p className="mt-6 text-xl font-medium tracking-[-0.03em]">
                  {formatPrice(
                    content.price.amountMinor,
                    content.price.currency,
                  )}
                </p>
              ) : null}

              {!product.availability.purchasable ? (
                <p className="text-muted-foreground mt-6 text-base leading-7">
                  This product is not currently available to purchase.
                </p>
              ) : null}

              <div className="border-border mt-8 border-y py-5">
                <h2 className="text-sm font-medium">Compatibility</h2>
                <ul className="mt-3 space-y-3">
                  {compatibility.map((item) => (
                    <li
                      key={item.vehicleId}
                      className="flex flex-wrap items-center justify-between gap-3 text-sm"
                    >
                      <span>{item.label}</span>
                      <span className="text-muted-foreground inline-flex items-center gap-2">
                        <span
                          className="bg-factor-red size-1.5 rounded-full"
                          aria-hidden="true"
                        />
                        {statusLabel(item.status)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside
                className="border-border mt-8 border-t pt-6"
                aria-labelledby="product-ownership-policies-heading"
              >
                <h2
                  id="product-ownership-policies-heading"
                  className="text-base font-medium"
                >
                  {warrantySummary?.heading ?? 'Ownership policies'}
                </h2>
                {warrantySummary ? (
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {warrantySummary.summary}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
                  {warrantySummary ? (
                    <Link
                      href="/ownership/warranty"
                      className="motion-safe-transition hover:text-factor-red focus-visible:text-factor-red inline-flex min-h-11 items-center"
                    >
                      Read the Warranty Policy →
                    </Link>
                  ) : null}
                  <Link
                    href="/ownership/returns"
                    className="motion-safe-transition hover:text-factor-red focus-visible:text-factor-red inline-flex min-h-11 items-center"
                  >
                    Returns & Refunds
                  </Link>
                  <Link
                    href="/ownership/shipping"
                    className="motion-safe-transition hover:text-factor-red focus-visible:text-factor-red inline-flex min-h-11 items-center"
                  >
                    Shipping
                  </Link>
                  <Link
                    href="/ownership/installation"
                    className="motion-safe-transition hover:text-factor-red focus-visible:text-factor-red inline-flex min-h-11 items-center"
                  >
                    Installation Guidance
                  </Link>
                </div>
              </aside>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6"
                >
                  <Link href="/compatibility">View vehicle compatibility</Link>
                </Button>
                <Link
                  href="/garage"
                  className="motion-safe-transition border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform,opacity] active:translate-y-px motion-reduce:transform-none"
                >
                  View in My Garage
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProductDetailSections
        content={content}
        galleryMedia={galleryMedia}
        relatedProducts={relatedProducts}
      />

      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      ) : null}
    </>
  );
}
