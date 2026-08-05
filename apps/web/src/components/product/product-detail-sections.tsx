import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import type { ProductMediaAsset } from '@/config/product-media';
import { getProductHref } from '@/config/product-routes';
import type { Product, ProductSpecification } from '@/config/products';
import type { ProductPageContent } from '@/config/product-pages';

export interface ProductDetailSectionsProps {
  content: ProductPageContent;
  galleryMedia: readonly ProductMediaAsset[];
  relatedProducts: readonly Product[];
}

function DetailSection({
  children,
  id,
  title,
}: {
  children: ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section
      id={id}
      className="section-space scroll-mt-24"
      aria-labelledby={`${id}-heading`}
    >
      <Container>
        <h2
          id={`${id}-heading`}
          className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
        >
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

function DefinitionList({
  items,
}: {
  items: readonly { label: string; value: ReactNode }[];
}) {
  return (
    <dl className="border-border max-w-3xl border-t">
      {items.map((item) => (
        <div
          key={item.label}
          className="border-border grid gap-2 border-b py-4 sm:grid-cols-2"
        >
          <dt className="font-medium">{item.label}</dt>
          <dd className="text-muted-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function specificationsToItems(
  specifications: readonly ProductSpecification[],
) {
  return specifications.map((specification) => ({
    label: specification.label,
    value: `${specification.value}${
      specification.unit ? ` ${specification.unit}` : ''
    }`,
  }));
}

export function ProductDetailSections({
  content,
  galleryMedia,
  relatedProducts,
}: ProductDetailSectionsProps) {
  const hasInstallation =
    content.installationMethod ||
    content.installationDifficulty ||
    content.estimatedInstallationTime;

  return (
    <>
      {content.fullDescription ? (
        <DetailSection id="overview" title="Overview">
          <p className="text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
            {content.fullDescription}
          </p>
        </DetailSection>
      ) : null}

      {content.problemSolved ? (
        <DetailSection id="the-problem" title="The Problem">
          <p className="max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
            {content.problemSolved}
          </p>
        </DetailSection>
      ) : null}

      {content.keyBenefits?.length ? (
        <DetailSection id="owner-benefits" title="Owner benefits">
          <ul className="grid gap-6 md:grid-cols-2">
            {content.keyBenefits.map((benefit) => (
              <li
                key={benefit}
                className="border-border border-t pt-5 text-base leading-7"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {content.specifications?.length ? (
        <DetailSection id="specifications" title="Specifications">
          <DefinitionList
            items={specificationsToItems(content.specifications)}
          />
        </DetailSection>
      ) : null}

      {content.materials?.length ? (
        <DetailSection id="materials-and-finish" title="Materials and finish">
          <p className="text-muted-foreground max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
            {content.materials.join(', ')}
          </p>
        </DetailSection>
      ) : null}

      {content.variants?.length ? (
        <DetailSection id="variants" title="Options">
          <ul className="max-w-3xl space-y-3">
            {content.variants.map((variant) => (
              <li key={variant.id} className="border-border border-b pb-3">
                {variant.name}
              </li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {galleryMedia.length ? (
        <DetailSection id="product-gallery" title="Product gallery">
          <Grid columns={2} gap="lg">
            {galleryMedia.map((media) => (
              <figure
                key={media.id}
                className="bg-muted relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={media.sourcePath!}
                  alt={media.altText}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: media.focalPoint }}
                />
              </figure>
            ))}
          </Grid>
        </DetailSection>
      ) : null}

      {hasInstallation ? (
        <DetailSection id="installation" title="Installation">
          <DefinitionList
            items={[
              ...(content.installationMethod
                ? [{ label: 'Method', value: content.installationMethod }]
                : []),
              ...(content.installationDifficulty
                ? [
                    {
                      label: 'Difficulty',
                      value: content.installationDifficulty,
                    },
                  ]
                : []),
              ...(content.estimatedInstallationTime
                ? [
                    {
                      label: 'Estimated time',
                      value: `${content.estimatedInstallationTime.minimumMinutes}–${content.estimatedInstallationTime.maximumMinutes} minutes`,
                    },
                  ]
                : []),
            ]}
          />
        </DetailSection>
      ) : null}

      {content.includedItems?.length ? (
        <DetailSection id="included-items" title="Included items">
          <ul className="max-w-3xl list-disc space-y-2 pl-5">
            {content.includedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {content.careInstructions ? (
        <DetailSection id="care" title="Care">
          <p className="max-w-3xl text-base leading-7">
            {content.careInstructions}
          </p>
        </DetailSection>
      ) : null}

      {content.honestLimitations?.length ? (
        <DetailSection id="honest-limitations" title="Honest limitations">
          <ul className="max-w-3xl list-disc space-y-2 pl-5">
            {content.honestLimitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {relatedProducts.length ? (
        <DetailSection id="related-products" title="Often Installed Together">
          <Grid columns={3} gap="lg">
            {relatedProducts.map((relatedProduct) => (
              <article
                key={relatedProduct.id}
                className="border-border border-t pt-5"
              >
                <h3 className="text-xl font-medium tracking-[-0.03em]">
                  <Link
                    href={getProductHref(relatedProduct.id)}
                    className="motion-safe-transition hover:text-factor-red focus-visible:text-factor-red"
                  >
                    {relatedProduct.name}
                  </Link>
                </h3>
              </article>
            ))}
          </Grid>
        </DetailSection>
      ) : null}
    </>
  );
}
