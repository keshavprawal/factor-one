import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ChevronDown,
  CircleCheck,
  ClipboardCheck,
  PackageCheck,
  PanelTop,
  ScanLine,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/breadcrumbs';
import { Container } from '@/components/layout/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductHeroGallery } from '@/components/product/product-hero-gallery';
import type { ProductPageReferencePresentation } from '@/config/product-page-reference';
import type { ProductMediaAsset } from '@/config/product-media';
import type { Product, ProductSpecification } from '@/config/products';
import type {
  ProductPageContent,
  ProductWarrantySummary,
} from '@/config/product-pages';

interface ProductReferencePageProps {
  content: ProductPageContent;
  galleryMedia: readonly ProductMediaAsset[];
  presentation: ProductPageReferencePresentation;
  product: Product;
  warrantySummary: ProductWarrantySummary | null;
}

function formatPrice(amountMinor: number, currency: string) {
  return new Intl.NumberFormat('en-IN', {
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
  }).format(amountMinor / 100);
}

function getApprovedGalleryMedia(
  product: Product,
  galleryMedia: readonly ProductMediaAsset[],
) {
  const allMedia = [
    ...galleryMedia.filter(
      (media) => media.intendedPlacement === 'product-detail',
    ),
    ...galleryMedia.filter(
      (media) => media.intendedPlacement === 'product-gallery',
    ),
  ];

  return allMedia.filter(
    (media, index, items) =>
      media.productId === product.id &&
      Boolean(media.sourcePath) &&
      media.approvalStatus === 'approved' &&
      media.rightsStatus !== 'unknown' &&
      media.lifecycleStatus !== 'missing' &&
      items.findIndex((candidate) => candidate.id === media.id) === index,
  );
}

function addSpecification(
  items: readonly ProductSpecification[] | null,
  label: string,
  value: string | null,
) {
  if (!value) {
    return items ?? [];
  }

  return [...(items ?? []), { label, value, unit: null }];
}

function ProductSection({
  children,
  className = '',
  id,
  title,
}: {
  children: ReactNode;
  className?: string;
  id: string;
  title: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-12 sm:py-16 lg:py-20 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <h2
          id={`${id}-heading`}
          className="text-balance text-3xl font-semibold tracking-[-0.05em] sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}

const coreBenefitItems = [
  {
    icon: PanelTop,
    title: 'Extended Coverage',
    description: 'Covers the gap behind the rear seats',
  },
  {
    icon: ScanLine,
    title: 'Vehicle-Specific',
    description: 'Listed for every supported VF7 variant',
  },
  {
    icon: Wrench,
    title: 'No Modification',
    description: 'No drilling or cutting required',
  },
  {
    icon: PackageCheck,
    title: 'Self-Installation',
    description: 'No additional mounting hardware',
  },
] as const;

const heroTrustItems = [
  { icon: PanelTop, title: 'Extended Rear Coverage' },
  { icon: ScanLine, title: 'All VF7 Variants' },
  { icon: Wrench, title: 'No Vehicle Modification' },
  { icon: ShieldCheck, title: '12-Month Warranty' },
] as const;

const ownershipItems = [
  {
    href: '/ownership/shipping',
    title: 'Free Standard Shipping',
    icon: PackageCheck,
  },
  {
    href: '/ownership/returns',
    title: 'Transparent Returns',
    icon: CircleCheck,
  },
  {
    href: '/ownership/contact',
    title: 'Ownership Support',
    icon: ClipboardCheck,
  },
] as const;

export function ProductReferencePage({
  content,
  galleryMedia,
  presentation,
  product,
  warrantySummary,
}: ProductReferencePageProps) {
  const media = getApprovedGalleryMedia(product, galleryMedia);
  const heroMedia = media[0];
  const lifestyleMedia =
    media.find((item) => item.id.includes('lifestyle')) ?? media[1] ?? null;
  const compatibility = product.vehicleCompatibility[0] ?? null;
  const visibleFaqs = presentation.faqs.filter(
    (faq) => faq.id !== 'warranty' || Boolean(warrantySummary),
  );
  const visibleOwnershipItems = warrantySummary
    ? [
        {
          href: '/ownership/warranty',
          title: '12-Month Warranty',
          icon: ShieldCheck,
        },
        ...ownershipItems,
      ]
    : ownershipItems;
  const specifications = addSpecification(
    addSpecification(
      addSpecification(
        content.specifications,
        'Box contents',
        content.includedItems?.join(' and ') ?? null,
      ),
      'Installation',
      content.installationMethod,
    ),
    'Additional hardware',
    content.specifications?.find(
      (item) => item.label === 'Additional mounting hardware',
    )?.value ?? null,
  ).filter(
    (item, index, items) =>
      item.label !== 'Additional mounting hardware' ||
      !items.some((candidate) => candidate.label === 'Additional hardware'),
  );

  return (
    <>
      <section
        className="scroll-mt-24 pb-8 pt-5 sm:pb-12 sm:pt-10 lg:pb-14 lg:pt-14"
        aria-labelledby="product-heading"
      >
        <Container>
          <Breadcrumbs
            items={[{ href: '/', label: 'Home' }, { label: product.name }]}
          />
          <div className="mt-3 grid items-start gap-6 sm:mt-5 sm:gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(24rem,0.88fr)] lg:gap-14 xl:gap-20">
            <ProductHeroGallery media={media} productName={product.name} />

            <div className="lg:pt-3">
              <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
                VinFast VF7{' '}
                {compatibility?.yearStart
                  ? `— ${compatibility.yearStart} onwards`
                  : ''}
              </p>
              <h1
                id="product-heading"
                className="mt-2 text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:mt-4 sm:text-6xl xl:text-7xl"
              >
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl text-lg leading-8 sm:mt-6 sm:text-xl">
                {presentation.heroValueStatement}
              </p>

              {content.price ? (
                <p className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:mt-8">
                  {formatPrice(
                    content.price.amountMinor,
                    content.price.currency,
                  )}
                </p>
              ) : null}
              <div className="mt-4 grid gap-3 sm:mt-7 sm:grid-cols-2">
                {content.launchDate ? (
                  <div
                    className="border-factor-red/35 bg-warm inline-flex h-14 w-full items-center justify-center gap-3 rounded-md border px-4 py-3 text-center text-sm"
                    role="status"
                    aria-label={`Launch status: Launching ${content.launchDate.label}`}
                    data-hero-control="matched"
                    data-launch-status="true"
                  >
                    <span
                      className="bg-factor-red size-2 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    <span className="font-medium">
                      Launching {content.launchDate.label}
                    </span>
                  </div>
                ) : null}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 w-full rounded-md px-4"
                  data-hero-control="matched"
                  data-compatibility-control="true"
                >
                  <Link href="/compatibility">Check Vehicle Compatibility</Link>
                </Button>
              </div>

              <ul className="border-border mt-6 grid gap-2 border-t pt-5 text-sm sm:mt-9 sm:grid-cols-2 sm:gap-3 sm:pt-6">
                {heroTrustItems.map(({ icon: Icon, title }) => (
                  <li key={title} className="flex items-center gap-2.5">
                    <Icon
                      className="text-factor-red size-4"
                      aria-hidden="true"
                    />
                    <span>{title}</span>
                  </li>
                ))}
              </ul>

              {product.badges
                .filter((badge) => badge.approvalStatus === 'approved')
                .map((badge) => (
                  <div key={badge.id} className="mt-7">
                    <Badge
                      variant="outline"
                      className="w-fit rounded-sm tracking-[0.12em]"
                    >
                      {badge.label}
                    </Badge>
                    {badge.supportingText ? (
                      <p className="text-muted-foreground mt-2 text-sm">
                        {badge.supportingText}
                      </p>
                    ) : null}
                  </div>
                ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="product-story"
        className="bg-charcoal text-charcoal-foreground scroll-mt-24 py-10 sm:py-14 lg:py-16"
        aria-labelledby="product-story-heading"
        data-sticky-story="true"
      >
        <Container>
          <h2 id="product-story-heading" className="sr-only">
            The Parcel Tray story
          </h2>
          <div className="lg:grid lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:gap-8 xl:gap-12">
            <aside className="hidden lg:block" aria-label="Product context">
              <div className="sticky top-28">
                {heroMedia?.sourcePath ? (
                  <figure className="relative aspect-[5/4] overflow-hidden rounded-md">
                    <Image
                      src={heroMedia.sourcePath}
                      alt={heroMedia.altText}
                      fill
                      sizes="(min-width: 1280px) 32vw, 36vw"
                      className="object-cover"
                      style={{ objectPosition: heroMedia.focalPoint }}
                    />
                    <figcaption className="bg-charcoal/88 absolute bottom-3 left-3 rounded-sm px-3 py-2 text-xs font-medium">
                      {heroMedia.disclosure}
                    </figcaption>
                  </figure>
                ) : null}
                <p className="text-factor-red mt-5 text-xs font-semibold uppercase tracking-[0.16em]">
                  VinFast VF7
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">
                  {product.name}
                </h3>
                <div className="mt-3 flex items-center justify-between gap-4 text-sm">
                  {content.price ? (
                    <span className="text-xl font-medium">
                      {formatPrice(
                        content.price.amountMinor,
                        content.price.currency,
                      )}
                    </span>
                  ) : null}
                  {content.launchDate ? (
                    <span className="text-charcoal-foreground/68">
                      Launching {content.launchDate.label}
                    </span>
                  ) : null}
                </div>
              </div>
            </aside>

            <div className="space-y-5 sm:space-y-6">
              <article className="bg-graphite overflow-hidden rounded-md">
                <div className="px-5 pb-4 pt-6 sm:px-7 sm:pt-7">
                  <p className="text-charcoal-foreground/65 text-xs font-semibold uppercase tracking-[0.14em]">
                    Before
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                    The gap owners noticed.
                  </h3>
                  <p className="text-charcoal-foreground/72 mt-2 text-sm">
                    Factory cargo area
                  </p>
                </div>
                <div
                  className="border-charcoal-foreground/20 relative aspect-[16/8] overflow-hidden border-y"
                  role="img"
                  aria-label="Open gap behind rear seats."
                >
                  <div
                    className="border-charcoal-foreground/30 absolute left-[14%] right-[14%] top-[24%] border-t"
                    aria-hidden="true"
                  />
                  <div
                    className="border-charcoal-foreground/60 absolute left-[19%] right-[19%] top-[25%] h-14 rounded-t-md border-x border-t sm:h-20"
                    aria-hidden="true"
                  />
                  <div
                    className="border-factor-red absolute left-[19%] right-[19%] top-[62%] border-t-2"
                    aria-hidden="true"
                  />
                  <p className="text-factor-red-contrast absolute left-[19%] right-[19%] top-[67%] text-center text-sm font-medium">
                    Open gap behind rear seats.
                  </p>
                  <div
                    className="border-charcoal-foreground/30 absolute bottom-[12%] left-[14%] right-[14%] border-t"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-charcoal-foreground/72 px-5 py-4 text-sm leading-6 sm:px-7">
                  An open section remains behind the rear seats.
                </p>
              </article>

              <article className="bg-background text-foreground overflow-hidden rounded-md">
                <div className="px-5 pb-4 pt-6 sm:px-7 sm:pt-7">
                  <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.14em]">
                    Factor One
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                    {presentation.solutionHeadline}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Factor One Parcel Tray
                  </p>
                </div>
                {heroMedia?.sourcePath ? (
                  <figure className="bg-warm relative aspect-[16/8] overflow-hidden border-y">
                    <Image
                      src={heroMedia.sourcePath}
                      alt={heroMedia.altText}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: heroMedia.focalPoint }}
                    />
                    <figcaption className="bg-charcoal/88 text-charcoal-foreground absolute bottom-3 left-3 rounded-sm px-3 py-2 text-xs font-medium">
                      {heroMedia.disclosure}
                    </figcaption>
                  </figure>
                ) : null}
                <p className="text-muted-foreground px-5 py-4 text-sm leading-6 sm:px-7">
                  {presentation.solutionSupportingLine}
                </p>
              </article>

              <div className="border-charcoal-foreground/18 border-y py-6">
                <p className="max-w-xl text-xl font-medium tracking-[-0.03em]">
                  Developed from the vehicle, not guessed from measurements.
                </p>
                <ul
                  className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2"
                  aria-label="Engineering proof"
                >
                  {[
                    'VF7 scanned and modelled',
                    'CAD-developed',
                    'Prototype-fitted',
                    'Manufacturer dynamically tested',
                  ].map((item) => (
                    <li
                      key={item}
                      className="border-charcoal-foreground/18 border-t pt-3 text-sm font-medium"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="border-border bg-background border-b py-6 sm:py-7"
        aria-label="Parcel Tray benefits"
      >
        <Container>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4 lg:gap-7">
            {coreBenefitItems.map(({ icon: Icon, title, description }) => (
              <li key={title} className="min-w-0">
                <Icon className="text-factor-red size-5" aria-hidden="true" />
                <h2 className="mt-3 text-sm font-semibold">{title}</h2>
                <p className="text-muted-foreground mt-1 text-sm leading-5">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProductSection id="features" title="Designed around the details.">
        <div className="border-border mt-7 grid gap-x-7 border-t sm:grid-cols-2 lg:grid-cols-4">
          {presentation.featureStory.map(
            ({ description, id, title }, index) => (
              <article key={id} className="border-border border-b py-6">
                <p className="text-factor-red text-xs font-semibold tracking-[0.14em]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-medium tracking-[-0.035em]">
                  {title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {description}
                </p>
              </article>
            ),
          )}
        </div>
        {warrantySummary ? (
          <aside
            className="border-factor-red mt-7 flex flex-col justify-between gap-4 border-l-2 py-2 pl-5 sm:flex-row sm:items-center"
            data-warranty-emphasis="true"
          >
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.035em]">
                12-Month Factor One Warranty
              </h3>
              <p className="text-muted-foreground mt-1 text-sm leading-6">
                Covered against manufacturing defects in materials or
                workmanship.
              </p>
            </div>
            <Link
              href="/ownership/warranty"
              className="text-factor-red inline-flex min-h-11 shrink-0 items-center text-sm font-medium underline underline-offset-4"
            >
              Read the Warranty Policy
            </Link>
          </aside>
        ) : null}
      </ProductSection>

      {lifestyleMedia?.sourcePath ? (
        <section
          className="bg-charcoal text-charcoal-foreground"
          aria-labelledby="lifestyle-heading"
        >
          <div className="relative min-h-[28rem] overflow-hidden sm:min-h-[34rem]">
            <Image
              src={lifestyleMedia.sourcePath}
              alt={lifestyleMedia.altText}
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: lifestyleMedia.focalPoint }}
            />
            <div
              className="bg-charcoal/20 absolute inset-0"
              aria-hidden="true"
            />
            <Container className="relative flex min-h-[28rem] flex-col justify-end py-9 sm:min-h-[34rem] sm:py-12">
              <p className="bg-charcoal/85 w-fit rounded-sm px-3 py-2 text-xs font-medium">
                {lifestyleMedia.disclosure}
              </p>
              <h2
                id="lifestyle-heading"
                className="mt-5 max-w-xl text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl"
              >
                Built for everyday ownership.
              </h2>
            </Container>
          </div>
        </section>
      ) : null}

      <ProductSection
        id="specifications"
        title="Product details"
        className="bg-warm"
      >
        <div className="mt-6 max-w-4xl">
          <div className="border-border divide-border divide-y border-y">
            <details className="group" open>
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium">
                Product specifications
                <ChevronDown
                  className="motion-safe-transition size-5 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <dl className="border-border border-t pb-2">
                {specifications.map((item) => (
                  <div
                    key={item.label}
                    className="border-border grid gap-1 border-b py-3 text-sm sm:grid-cols-2"
                  >
                    <dt className="font-medium">{item.label}</dt>
                    <dd className="text-muted-foreground">
                      {item.value}
                      {item.unit ? ` ${item.unit}` : ''}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
            {compatibility?.variants?.length ? (
              <details className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium">
                  Compatibility
                  <ChevronDown
                    className="motion-safe-transition size-5 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-border border-t py-4 text-sm">
                  <p className="font-medium">
                    {compatibility.make} {compatibility.model}{' '}
                    {compatibility.yearStart
                      ? `${compatibility.yearStart} onwards`
                      : ''}
                  </p>
                  <p className="text-muted-foreground mt-2 leading-6">
                    {compatibility.variants.join(' · ')}
                  </p>
                </div>
              </details>
            ) : null}
          </div>
          <div className="border-border mt-5 border-b pb-5">
            <p className="text-sm font-medium">
              Easy self-installation. No drilling or vehicle modification
              required.
            </p>
            <Link
              href="/ownership/installation"
              className="text-factor-red focus-visible:ring-ring mt-3 inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4"
            >
              View installation guidance
            </Link>
            {content.careInstructions ? (
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                Care: Wipe clean with a soft, damp cloth.
              </p>
            ) : null}
          </div>
        </div>
        <div className="border-border mt-8 border-t pt-7">
          <h3 className="text-2xl font-semibold tracking-[-0.045em]">
            Ownership, kept clear.
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleOwnershipItems.map(({ href, icon: Icon, title }) => (
              <Link
                key={href}
                href={href}
                className="motion-safe-transition border-border hover:border-foreground/35 focus-visible:border-factor-red flex min-h-20 items-center gap-3 rounded-md border p-4 transition-colors"
              >
                <Icon className="text-factor-red size-5" aria-hidden="true" />
                <span className="text-sm font-medium">{title}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-border mt-8 max-w-4xl border-t pt-7">
          <h3 className="text-2xl font-semibold tracking-[-0.045em]">
            Questions, answered.
          </h3>
          <div className="mt-4">
            {visibleFaqs.map(({ answer, id, question }) => (
              <details key={id} className="border-border group border-b">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 text-base font-medium">
                  {question}
                  <ChevronDown
                    className="motion-safe-transition size-5 shrink-0 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-muted-foreground max-w-3xl pb-4 text-sm leading-6">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </ProductSection>
    </>
  );
}
