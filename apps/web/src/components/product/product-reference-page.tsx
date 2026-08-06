import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Check,
  ChevronDown,
  CircleCheck,
  ClipboardCheck,
  Droplets,
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
      className={`section-space scroll-mt-24 ${className}`}
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
    description: 'Developed for the VinFast VF7',
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
  const careSentences =
    content.careInstructions
      ?.match(/[^.]+\./g)
      ?.map((sentence) => sentence.trim()) ?? [];
  const carePrimary = careSentences.slice(0, 3).join(' ');
  const careSecondary = careSentences.slice(3).join(' ');
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
        className="section-space scroll-mt-24 pt-10 sm:pt-14"
        aria-labelledby="product-heading"
      >
        <Container>
          <Breadcrumbs
            items={[{ href: '/', label: 'Home' }, { label: product.name }]}
          />
          <div className="mt-8 grid items-start gap-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(24rem,0.88fr)] lg:gap-14 xl:gap-20">
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
                className="mt-4 text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl xl:text-7xl"
              >
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8 sm:text-xl">
                {presentation.heroValueStatement}
              </p>

              {content.price ? (
                <p className="mt-8 text-3xl font-medium tracking-[-0.045em]">
                  {formatPrice(
                    content.price.amountMinor,
                    content.price.currency,
                  )}
                </p>
              ) : null}
              {content.launchDate ? (
                <p className="text-muted-foreground mt-2 text-sm font-medium">
                  Launching {content.launchDate.label}
                </p>
              ) : null}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <p
                  className="bg-primary text-primary-foreground inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-medium"
                  role="status"
                >
                  Launching 15 August
                </p>
                <Button asChild variant="outline" size="lg" className="px-6">
                  <Link href="/compatibility">Check Vehicle Compatibility</Link>
                </Button>
              </div>

              <ul className="border-border mt-9 grid gap-3 border-t pt-6 text-sm sm:grid-cols-2">
                {coreBenefitItems.map(({ icon: Icon, title }) => (
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

      <ProductSection
        id="owners-noticed"
        title="The gap owners noticed."
        className="bg-charcoal text-charcoal-foreground"
      >
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end">
          <p className="text-charcoal-foreground/72 max-w-md text-lg leading-8">
            The factory cargo area leaves an open section behind the rear seats.
          </p>
          <div className="border-charcoal-foreground/20 grid min-h-52 place-items-center border-y py-10 sm:min-h-64">
            <PanelTop
              className="text-factor-red-contrast size-11"
              aria-hidden="true"
            />
            <p className="text-charcoal-foreground/55 mt-4 max-w-xs text-center text-sm leading-6">
              A restrained reference to the area owners asked to cover.
            </p>
          </div>
        </div>
      </ProductSection>

      <ProductSection id="coverage" title={presentation.solutionHeadline}>
        <div className="mt-9 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <p className="text-muted-foreground max-w-xl text-lg leading-8">
            {presentation.solutionSupportingLine}
          </p>
          {heroMedia?.sourcePath ? (
            <figure className="bg-warm relative aspect-[4/3] overflow-hidden rounded-lg">
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
        </div>
      </ProductSection>

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

      <ProductSection id="compatibility" title="Made for your VF7.">
        <div className="mt-9 grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="border-border bg-warm rounded-lg border p-6 sm:p-8">
            <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.15em]">
              Verified compatibility
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.045em]">
              {compatibility?.make} {compatibility?.model}
            </h3>
            {compatibility?.yearStart ? (
              <p className="text-muted-foreground mt-2">
                {compatibility.yearStart} onwards
              </p>
            ) : null}
            {compatibility?.variants?.length ? (
              <p className="text-muted-foreground mt-6 text-sm leading-6">
                {compatibility.variants.join(' · ')}
              </p>
            ) : null}
            <Button asChild variant="outline" size="lg" className="mt-7 px-6">
              <Link href="/compatibility">Check Vehicle Compatibility</Link>
            </Button>
          </div>
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.04em]">
              Built to belong.
            </h3>
            <p className="text-muted-foreground mt-4 max-w-md leading-7">
              Compatibility stays clear so you can confirm the product listed
              for your car before it launches.
            </p>
          </div>
        </div>
      </ProductSection>

      <ProductSection
        id="installation"
        title="Installs without modifying the vehicle."
      >
        <ol className="mt-9 grid gap-6 md:grid-cols-3">
          {presentation.installationSteps.map((step, index) => (
            <li key={step} className="border-border border-t pt-5">
              <p className="text-factor-red text-sm font-semibold">
                0{index + 1}
              </p>
              <p className="mt-4 text-xl font-medium tracking-[-0.03em]">
                {step}
              </p>
            </li>
          ))}
        </ol>
        <ul className="text-muted-foreground mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm">
          {[
            'Self-installation',
            'No drilling',
            'No cutting',
            'No additional hardware',
            'No vehicle modification',
          ].map((item) => (
            <li key={item} className="inline-flex items-center gap-2">
              <Check className="text-factor-red size-4" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </ProductSection>

      <ProductSection
        id="specifications"
        title="Specifications and care"
        className="bg-warm"
      >
        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
          <details
            className="border-border group border-y"
            aria-labelledby="specifications-summary"
          >
            <summary
              id="specifications-summary"
              className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-medium"
            >
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
                  className="border-border grid gap-1 border-b py-4 text-sm sm:grid-cols-2"
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
          {content.careInstructions ? (
            <aside
              className="border-border bg-background rounded-lg border p-6"
              aria-labelledby="care-heading"
            >
              <Droplets className="text-factor-red size-5" aria-hidden="true" />
              <h3
                id="care-heading"
                className="mt-5 text-xl font-medium tracking-[-0.03em]"
              >
                Care
              </h3>
              {carePrimary ? (
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {carePrimary}
                </p>
              ) : null}
              {careSecondary ? (
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {careSecondary}
                </p>
              ) : null}
            </aside>
          ) : null}
        </div>
      </ProductSection>

      <ProductSection id="ownership-confidence" title="Ownership, kept clear.">
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visibleOwnershipItems.map(({ href, icon: Icon, title }) => (
            <Link
              key={href}
              href={href}
              className="motion-safe-transition border-border hover:border-foreground/35 focus-visible:border-factor-red flex min-h-28 flex-col justify-between rounded-lg border p-5 transition-colors"
            >
              <Icon className="text-factor-red size-5" aria-hidden="true" />
              <span className="mt-6 text-sm font-medium">{title}</span>
            </Link>
          ))}
        </div>
      </ProductSection>

      <ProductSection id="faq" title="Questions, answered.">
        <div className="border-border mt-8 max-w-4xl border-t">
          {visibleFaqs.map(({ answer, id, question }) => (
            <details key={id} className="border-border group border-b">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-base font-medium sm:text-lg">
                {question}
                <ChevronDown
                  className="motion-safe-transition size-5 shrink-0 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="text-muted-foreground max-w-3xl pb-5 text-sm leading-6 sm:text-base sm:leading-7">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </ProductSection>
    </>
  );
}
