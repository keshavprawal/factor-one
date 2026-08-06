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
import { Wordmark } from '@/components/brand/wordmark';
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
  const prototypeMedia = media.find((item) => item.evidenceOnly) ?? null;
  const lifestyleMedia =
    media.find((item) => item.id.includes('lifestyle')) ?? media[1] ?? null;
  const compatibility = product.vehicleCompatibility[0] ?? null;
  const benefitItems = warrantySummary
    ? [
        ...coreBenefitItems,
        {
          icon: ShieldCheck,
          title: warrantySummary.heading.replace(
            ' Limited Manufacturer Warranty',
            ' Warranty',
          ),
          description: 'Product-specific limited warranty',
        },
      ]
    : coreBenefitItems;
  const visibleFaqs = presentation.faqs.filter(
    (faq) => faq.id !== 'warranty' || Boolean(warrantySummary),
  );
  const visibleOwnershipItems = warrantySummary
    ? [
        {
          href: '/ownership/warranty',
          title: warrantySummary.heading,
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
              <div className="mt-4 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                {content.launchDate ? (
                  <div
                    className="border-factor-red/35 bg-warm inline-flex min-h-14 items-center gap-3 rounded-md border px-4 py-3 text-sm"
                    role="status"
                    aria-label={`Launch status: Launching ${content.launchDate.label}`}
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
                <Button asChild variant="outline" size="lg" className="px-6">
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
        id="problem-solution"
        className="scroll-mt-24 py-8 sm:py-12 lg:py-14"
        aria-labelledby="problem-solution-heading"
      >
        <Container>
          <h2 id="problem-solution-heading" className="sr-only">
            Problem versus solution
          </h2>
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <article className="bg-charcoal text-charcoal-foreground overflow-hidden rounded-lg">
              <div className="px-5 pb-5 pt-6 sm:px-7 sm:pb-7 sm:pt-8">
                <p className="text-charcoal-foreground/65 text-xs font-semibold uppercase tracking-[0.14em]">
                  Before
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                  The gap owners noticed.
                </h2>
                <p className="text-charcoal-foreground/72 mt-2 text-sm leading-6">
                  Factory cargo area
                </p>
              </div>
              <div
                className="border-charcoal-foreground/20 relative aspect-[4/3] overflow-hidden border-y"
                role="img"
                aria-label="Open gap behind rear seats."
              >
                <div
                  className="border-charcoal-foreground/30 absolute left-[14%] right-[14%] top-[28%] border-t"
                  aria-hidden="true"
                />
                <div
                  className="border-charcoal-foreground/60 absolute left-[19%] right-[19%] top-[29%] h-16 rounded-t-md border-x border-t sm:h-20"
                  aria-hidden="true"
                />
                <div
                  className="border-factor-red absolute left-[19%] right-[19%] top-[62%] border-t-2"
                  aria-hidden="true"
                />
                <p className="text-factor-red-contrast absolute left-[19%] right-[19%] top-[66%] text-center text-sm font-medium leading-6">
                  Open gap behind rear seats.
                </p>
                <div
                  className="border-charcoal-foreground/30 absolute bottom-[14%] left-[14%] right-[14%] border-t"
                  aria-hidden="true"
                />
              </div>
              <p className="text-charcoal-foreground/72 px-5 py-5 text-sm leading-6 sm:px-7 sm:py-7">
                An open section remains behind the rear seats.
              </p>
            </article>

            <article className="border-border bg-warm overflow-hidden rounded-lg border">
              <div className="px-5 pb-5 pt-6 sm:px-7 sm:pb-7 sm:pt-8">
                <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.14em]">
                  Factor One
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
                  The coverage Factor One added.
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Factor One Parcel Tray
                </p>
              </div>
              {heroMedia?.sourcePath ? (
                <figure className="bg-warm relative aspect-[4/3] overflow-hidden border-y">
                  <Image
                    src={heroMedia.sourcePath}
                    alt={heroMedia.altText}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: heroMedia.focalPoint }}
                  />
                  <figcaption className="bg-charcoal/85 text-charcoal-foreground absolute bottom-4 left-4 rounded-sm px-3 py-2 text-xs font-medium">
                    {heroMedia.disclosure}
                  </figcaption>
                </figure>
              ) : null}
              <p className="text-muted-foreground px-5 py-5 text-sm leading-6 sm:px-7 sm:py-7">
                Extended rear coverage creates a cleaner, more complete cargo
                area.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section
        className="border-border bg-warm border-y py-7 sm:py-8"
        aria-label="Parcel Tray benefits"
      >
        <Container>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-5 lg:gap-6">
            {benefitItems.map(({ icon: Icon, title, description }) => (
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
        <div className="border-border mt-9 grid gap-x-8 border-t sm:grid-cols-2 lg:grid-cols-3">
          {presentation.featureStory.map(
            ({ description, id, title }, index) => (
              <article key={id} className="border-border border-b py-7">
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
      </ProductSection>

      {lifestyleMedia?.sourcePath ? (
        <section
          className="bg-charcoal text-charcoal-foreground"
          aria-labelledby="lifestyle-heading"
        >
          <div className="relative min-h-[34rem] overflow-hidden sm:min-h-[42rem]">
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
            <Container className="relative flex min-h-[34rem] flex-col justify-end py-10 sm:min-h-[42rem] sm:py-14">
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
        id="engineering-proof"
        title="Developed from the vehicle, not guessed from measurements."
        className="bg-graphite text-graphite-foreground"
      >
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <ul
            className="grid gap-4 sm:grid-cols-2"
            aria-label="Development evidence"
          >
            {[
              'VF7 scanned and modelled',
              'CAD-developed',
              'Prototype-fitted',
              'Manufacturer dynamically tested',
            ].map((item) => (
              <li
                key={item}
                className="border-graphite-foreground/20 flex min-h-24 items-end border-t pt-4 text-lg font-medium tracking-[-0.025em]"
              >
                {item}
              </li>
            ))}
          </ul>
          {prototypeMedia?.sourcePath ? (
            <figure className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={prototypeMedia.sourcePath}
                alt={prototypeMedia.altText}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: prototypeMedia.focalPoint }}
              />
              <figcaption className="bg-charcoal/90 text-charcoal-foreground absolute bottom-4 left-4 rounded-sm px-3 py-2 text-xs font-medium">
                {prototypeMedia.disclosure}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </ProductSection>

      <ProductSection
        id="specifications"
        title="Product details"
        className="bg-warm"
      >
        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
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
          <div className="border-border bg-background rounded-lg border p-5 sm:p-6">
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
              <div className="border-border mt-5 border-t pt-5">
                <p className="text-muted-foreground text-sm leading-6">
                  Care: Wipe clean with a soft, damp cloth.
                </p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="border-border mt-10 border-t pt-8">
          <h3 className="text-2xl font-semibold tracking-[-0.045em]">
            Ownership, kept clear.
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="border-border mt-10 max-w-4xl border-t pt-8">
          <h3 className="text-2xl font-semibold tracking-[-0.045em]">
            Questions, answered.
          </h3>
          <div className="mt-5">
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

      <section
        className="bg-charcoal text-charcoal-foreground border-t py-16 sm:py-24"
        aria-labelledby="brand-statement-heading"
      >
        <Container>
          <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.18em]">
            Built with owners
          </p>
          <Wordmark
            as="h2"
            id="brand-statement-heading"
            size="display"
            className="text-charcoal-foreground mt-5 max-w-5xl"
          />
          <p className="text-charcoal-foreground/72 mt-6 max-w-xl text-lg leading-7 sm:text-xl">
            By VinFast owners, for VinFast owners.
          </p>
        </Container>
      </section>
    </>
  );
}
