import Image from 'next/image';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import type { ProductMediaAsset } from '@/config/product-media';
import type { ContentField, Product } from '@/config/products';

export interface ProductDetailSectionsProps {
  media: readonly ProductMediaAsset[];
  product: Product;
  relatedProducts?: readonly Product[];
}

function contentValue<T>(field: ContentField<T>): T | null {
  return field.status === 'approved' ? field.value : null;
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
      className="section-space"
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

export function ProductDetailSections({
  media,
  product,
  relatedProducts = [],
}: ProductDetailSectionsProps) {
  const shortDescription = contentValue(product.shortDescription);
  const fullDescription = contentValue(product.fullDescription);
  const problemSolved = contentValue(product.problemSolved);
  const benefits = contentValue(product.keyBenefits);
  const specifications = contentValue(product.specifications);
  const materials = contentValue(product.materials);
  const installationMethod = contentValue(product.installationMethod);
  const installationDifficulty = contentValue(product.installationDifficulty);
  const estimatedInstallationTime = contentValue(
    product.estimatedInstallationTime,
  );
  const includedItems = contentValue(product.includedItems);
  const warranty = contentValue(product.warranty);
  const limitations = contentValue(product.honestLimitations);
  const approvedGalleryMedia = media.filter(
    (item) =>
      item.productId === product.id &&
      item.intendedPlacement === 'product-gallery' &&
      item.sourcePath &&
      item.approvalStatus === 'approved' &&
      item.rightsStatus !== 'unknown',
  );
  const resolvedRelatedProducts = relatedProducts.filter((candidate) =>
    product.relatedProductIds.includes(candidate.id),
  );
  const verifiedCompatibility = product.vehicleCompatibility.filter(
    (compatibility) => compatibility.verificationStatus === 'verified',
  );
  const hasInstallation =
    installationMethod || installationDifficulty || estimatedInstallationTime;

  return (
    <>
      <section className="section-space" aria-labelledby="product-heading">
        <Container>
          <div className="max-w-3xl">
            <h1
              id="product-heading"
              className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              {product.name}
            </h1>
            {shortDescription ? (
              <p className="text-muted-foreground mt-6 text-lg leading-8 sm:text-xl">
                {shortDescription}
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      {problemSolved || fullDescription ? (
        <DetailSection id="problem-and-solution" title="Problem and solution">
          <div className="max-w-3xl space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
            {problemSolved ? <p>{problemSolved}</p> : null}
            {fullDescription ? (
              <p className="text-muted-foreground">{fullDescription}</p>
            ) : null}
          </div>
        </DetailSection>
      ) : null}

      {benefits?.length ? (
        <DetailSection id="benefits" title="Benefits">
          <ul className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit) => (
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

      {specifications?.length || materials?.length ? (
        <DetailSection id="specifications" title="Specifications">
          <dl className="border-border max-w-3xl border-t">
            {specifications?.map((specification) => (
              <div
                key={specification.label}
                className="border-border grid gap-2 border-b py-4 sm:grid-cols-2"
              >
                <dt className="font-medium">{specification.label}</dt>
                <dd className="text-muted-foreground">
                  {specification.value}
                  {specification.unit ? ` ${specification.unit}` : ''}
                </dd>
              </div>
            ))}
            {materials?.length ? (
              <div className="border-border grid gap-2 border-b py-4 sm:grid-cols-2">
                <dt className="font-medium">Materials</dt>
                <dd className="text-muted-foreground">
                  {materials.join(', ')}
                </dd>
              </div>
            ) : null}
          </dl>
        </DetailSection>
      ) : null}

      {verifiedCompatibility.length ? (
        <DetailSection id="compatibility" title="Compatibility">
          <ul className="max-w-3xl space-y-3">
            {verifiedCompatibility.map((compatibility) => (
              <li
                key={compatibility.vehicleId}
                className="border-border border-b pb-3"
              >
                {compatibility.make} {compatibility.model}
                {compatibility.years?.length
                  ? ` — ${compatibility.years.join(', ')}`
                  : ''}
              </li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {approvedGalleryMedia.length ? (
        <DetailSection id="gallery" title="Gallery">
          <Grid columns={2} gap="lg">
            {approvedGalleryMedia.map((item) => (
              <figure
                key={item.id}
                className="bg-muted relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src={item.sourcePath!}
                  alt={item.altText}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: item.focalPoint }}
                />
              </figure>
            ))}
          </Grid>
        </DetailSection>
      ) : null}

      {hasInstallation ? (
        <DetailSection id="installation" title="Installation">
          <dl className="border-border max-w-3xl border-t">
            {installationMethod ? (
              <div className="border-border grid gap-2 border-b py-4 sm:grid-cols-2">
                <dt className="font-medium">Method</dt>
                <dd className="text-muted-foreground">{installationMethod}</dd>
              </div>
            ) : null}
            {installationDifficulty ? (
              <div className="border-border grid gap-2 border-b py-4 sm:grid-cols-2">
                <dt className="font-medium">Difficulty</dt>
                <dd className="text-muted-foreground capitalize">
                  {installationDifficulty}
                </dd>
              </div>
            ) : null}
            {estimatedInstallationTime ? (
              <div className="border-border grid gap-2 border-b py-4 sm:grid-cols-2">
                <dt className="font-medium">Estimated time</dt>
                <dd className="text-muted-foreground">
                  {estimatedInstallationTime.minimumMinutes}–
                  {estimatedInstallationTime.maximumMinutes} minutes
                </dd>
              </div>
            ) : null}
          </dl>
        </DetailSection>
      ) : null}

      {includedItems?.length ? (
        <DetailSection id="included-items" title="Included items">
          <ul className="max-w-3xl list-disc space-y-2 pl-5">
            {includedItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {warranty ? (
        <DetailSection id="warranty" title="Warranty">
          <p className="max-w-3xl text-base leading-7">{warranty.summary}</p>
        </DetailSection>
      ) : null}

      {limitations?.length ? (
        <DetailSection id="limitations" title="Limitations">
          <ul className="max-w-3xl list-disc space-y-2 pl-5">
            {limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </DetailSection>
      ) : null}

      {resolvedRelatedProducts.length ? (
        <DetailSection id="related-products" title="Related products">
          <Grid columns={3} gap="lg">
            {resolvedRelatedProducts.map((relatedProduct) => (
              <article
                key={relatedProduct.id}
                className="border-border border-t pt-5"
              >
                <h3 className="text-xl font-medium">{relatedProduct.name}</h3>
                {relatedProduct.shortDescription.status === 'approved' &&
                relatedProduct.shortDescription.value ? (
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {relatedProduct.shortDescription.value}
                  </p>
                ) : null}
              </article>
            ))}
          </Grid>
        </DetailSection>
      ) : null}
    </>
  );
}
