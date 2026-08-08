import Image from 'next/image';
import Link from 'next/link';
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
import { ScrollLink } from '@/components/ui/scroll-link';
import {
  ProductDetailsExperience,
  type ProductDetailMediaEntry,
} from '@/components/product/product-details-experience';
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

function getApprovedMedia(
  product: Product,
  galleryMedia: readonly ProductMediaAsset[],
) {
  return galleryMedia.filter(
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

const heroTrustItems = [
  { icon: PanelTop, title: 'Extended Rear Coverage' },
  { icon: ScanLine, title: 'All VF7 Variants' },
  { icon: Wrench, title: 'No Vehicle Modification' },
  { icon: ShieldCheck, title: '12-Month Warranty' },
] as const;

const engineeringProofPoints = [
  'VF7 scanned and modelled',
  'CAD-developed',
  'Prototype-fitted',
  'Dynamic testing completed',
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
  const approvedMedia = getApprovedMedia(product, galleryMedia);
  const media = approvedMedia.filter(
    (item) =>
      item.intendedPlacement === 'product-detail' ||
      item.intendedPlacement === 'product-gallery',
  );
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
  const compatibilityValue = compatibility?.variants?.length
    ? `${compatibility.make} ${compatibility.model}${
        compatibility.yearStart ? ` ${compatibility.yearStart} onwards` : ''
      } — ${compatibility.variants.join(' · ')}`
    : null;
  const specifications = addSpecification(
    addSpecification(
      addSpecification(
        addSpecification(
          content.specifications,
          'Compatibility',
          compatibilityValue,
        ),
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
  const detailMedia = presentation.detailMediaStory.flatMap(
    ({ mediaId, specificationLabels }): ProductDetailMediaEntry[] => {
      const asset = approvedMedia.find((item) => item.id === mediaId);

      return asset
        ? [
            {
              asset,
              specificationLabels,
            },
          ]
        : [];
    },
  );

  return (
    <>
      <section
        id="product"
        className="product-story-ramp scroll-mt-24 overflow-clip pb-16 pt-5 sm:pb-24 sm:pt-10 xl:pb-0 xl:pt-14"
        aria-labelledby="product-heading"
        data-sticky-story="true"
      >
        <Container>
          <Breadcrumbs
            items={[{ href: '/', label: 'Home' }, { label: product.name }]}
          />
          <div className="mt-3 grid items-start gap-x-10 sm:mt-5 xl:mt-8 xl:grid-cols-[minmax(0,2.15fr)_minmax(20rem,1fr)] xl:gap-x-14 2xl:gap-x-20">
            <div className="xl:col-start-1 xl:row-start-1">
              <ProductHeroGallery media={media} productName={product.name} />
            </div>

            <aside
              className="mt-7 xl:col-start-2 xl:row-span-3 xl:row-start-1 xl:mt-0 xl:self-stretch"
              aria-label="Product information"
              data-hero-product-information="true"
            >
              <div className="xl:sticky xl:top-24 xl:pt-2">
                <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
                  VinFast VF7{' '}
                  {compatibility?.yearStart
                    ? `— ${compatibility.yearStart} onwards`
                    : ''}
                </p>
                <h1
                  id="product-heading"
                  className="mt-2 text-balance text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:mt-4 sm:text-6xl xl:text-[3.75rem]"
                >
                  {product.name}
                </h1>
                <p className="text-muted-foreground mt-3 max-w-xl text-lg leading-8 sm:mt-6 xl:text-lg">
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
                <div className="mt-4 grid gap-3 sm:mt-7 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
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
                  <div
                    data-hero-control="matched"
                    data-compatibility-control="true"
                  >
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-14 w-full rounded-md px-4"
                    >
                      <Link href="/compatibility">
                        Check Vehicle Compatibility
                      </Link>
                    </Button>
                  </div>
                </div>

                <ul className="border-border mt-6 grid gap-2 border-t pt-5 text-sm sm:mt-9 sm:grid-cols-2 sm:gap-3 sm:pt-6 xl:grid-cols-1 2xl:grid-cols-2">
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
            </aside>

            <article
              className="mt-20 xl:col-start-1 xl:row-start-2 xl:flex xl:min-h-[82svh] xl:flex-col xl:justify-center xl:pb-16 xl:pt-24"
              data-story-state="problem"
            >
              <div className="max-w-3xl">
                <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.14em]">
                  Before
                </p>
                <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                  The gap owners noticed.
                </h2>
                <p className="text-muted-foreground mt-3 text-sm">
                  Factory cargo area
                </p>
              </div>
              <div
                className="bg-graphite text-charcoal-foreground relative mt-8 aspect-[16/8] overflow-hidden"
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
              <p className="text-muted-foreground mt-4 max-w-xl text-sm leading-6">
                An open section remains behind the rear seats.
              </p>
            </article>

            <article
              className="relative z-10 mt-20 xl:col-start-1 xl:row-span-2 xl:row-start-3 xl:mt-0 xl:self-stretch"
              data-story-state="solution"
              data-sticky-solution-visual="true"
            >
              <div className="xl:bg-charcoal xl:text-charcoal-foreground xl:sticky xl:top-24 xl:flex xl:min-h-[calc(100svh-7rem)] xl:flex-col xl:justify-center xl:px-8 xl:py-12">
                <div className="max-w-3xl">
                  <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.14em]">
                    Factor One
                  </p>
                  <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                    {presentation.solutionHeadline}
                  </h2>
                  <p className="text-muted-foreground xl:text-charcoal-foreground/64 mt-3 text-sm">
                    Factor One Parcel Tray
                  </p>
                </div>
                {heroMedia?.sourcePath ? (
                  <figure className="bg-warm relative mt-7 aspect-[16/10] overflow-hidden sm:aspect-[16/9] xl:aspect-[16/10]">
                    <Image
                      src={heroMedia.sourcePath}
                      alt={heroMedia.altText}
                      fill
                      sizes="(min-width: 1280px) 68vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: heroMedia.focalPoint }}
                    />
                    <figcaption className="bg-charcoal/88 text-charcoal-foreground absolute bottom-3 left-3 rounded-sm px-3 py-2 text-xs font-medium">
                      {heroMedia.disclosure}
                    </figcaption>
                  </figure>
                ) : null}
                <p className="text-muted-foreground xl:text-charcoal-foreground/64 mt-4 max-w-xl text-sm leading-6">
                  {presentation.solutionSupportingLine}
                </p>
              </div>
            </article>

            <article
              className="story-engineering-pane text-charcoal-foreground relative isolate mt-16 flex min-h-[38rem] flex-col justify-center py-20 xl:col-start-2 xl:row-start-4 xl:mt-0 xl:min-h-[82svh] xl:py-24"
              data-engineering-handoff="true"
              data-engineering-proof="true"
            >
              <p className="text-factor-red-contrast text-xs font-semibold uppercase tracking-[0.16em]">
                Engineering proof
              </p>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-4xl xl:text-[2.65rem]">
                Developed from the vehicle, not guessed from measurements.
              </h2>
              <ol className="mt-9 space-y-1" aria-label="Engineering proof">
                {engineeringProofPoints.map((item, index) => (
                  <li
                    key={item}
                    className="engineering-proof-item border-charcoal-foreground/16 flex items-center gap-4 border-t py-5"
                  >
                    <span className="text-factor-red-contrast text-xs font-semibold tracking-[0.14em]">
                      0{index + 1}
                    </span>
                    <span className="text-lg font-medium tracking-[-0.03em] xl:text-xl">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </Container>
      </section>

      {lifestyleMedia?.sourcePath ? (
        <section
          id="features"
          className="bg-charcoal text-charcoal-foreground scroll-mt-24"
          aria-labelledby="features-heading"
          data-image-led-features="true"
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
                id="features-heading"
                className="mt-5 max-w-xl text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl"
              >
                Designed around the details.
              </h2>
              <p className="text-charcoal-foreground/80 mt-3 text-base font-medium sm:text-lg">
                Built for everyday ownership.
              </p>
            </Container>
          </div>
          <Container>
            <div className="border-charcoal-foreground/18 grid border-t sm:grid-cols-2 lg:grid-cols-4">
              {presentation.featureStory.map(
                ({ description, id, title }, index) => (
                  <article
                    key={id}
                    className="border-charcoal-foreground/18 border-b py-6 first:pl-0 last:pr-0 sm:px-5 lg:border-b-0 lg:border-l first:lg:border-l-0"
                  >
                    <p className="text-factor-red text-xs font-semibold tracking-[0.14em]">
                      0{index + 1}
                    </p>
                    <h3 className="mt-3 text-lg font-medium tracking-[-0.03em]">
                      {title}
                    </h3>
                    <p className="text-charcoal-foreground/70 mt-2 text-sm leading-6">
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </Container>
        </section>
      ) : null}

      <section
        id="specifications"
        className="bg-warm scroll-mt-24 py-12 sm:py-16 xl:py-20"
        aria-labelledby="specifications-heading"
      >
        <Container>
          <h2
            id="specifications-heading"
            className="text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-5xl"
          >
            Product details
          </h2>
          <ProductDetailsExperience
            careInstructions={content.careInstructions}
            media={detailMedia}
            specifications={specifications}
          />

          <div className="border-border mt-12 border-t pt-8">
            <h3 className="text-2xl font-semibold tracking-[-0.045em]">
              Ownership, kept honest.
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
            <div className="mt-3">
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
        </Container>
      </section>

      <section
        className="bg-charcoal text-charcoal-foreground"
        aria-label="Return to product"
        data-product-final-cta="true"
      >
        <Container className="flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div>
            <p className="text-factor-red-contrast text-xs font-semibold uppercase tracking-[0.16em]">
              Still thinking about it?
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.045em]">
              {product.name}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-charcoal-foreground/30 text-charcoal-foreground hover:bg-charcoal-foreground hover:text-charcoal w-fit bg-transparent"
          >
            <ScrollLink href="#product">Back to product</ScrollLink>
          </Button>
        </Container>
      </section>
    </>
  );
}
