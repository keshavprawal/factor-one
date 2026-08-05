import { getProductCompatibilityStatus } from './compatibility';
import { getProductMediaAssets, type ProductMediaAsset } from './product-media';
import { getProductPath } from './product-routes';
import {
  getPublicContentValue,
  products,
  type Product,
  type ProductId,
  type ProductWarranty,
} from './products';

export interface ProductPageContent {
  careInstructions: string | null;
  estimatedInstallationTime:
    | Product['estimatedInstallationTime']['value']
    | null;
  fullDescription: string | null;
  honestLimitations: readonly string[] | null;
  includedItems: readonly string[] | null;
  installationDifficulty: Product['installationDifficulty']['value'] | null;
  installationMethod: string | null;
  keyBenefits: readonly string[] | null;
  launchDate: Product['launchDate']['value'] | null;
  materials: readonly string[] | null;
  price: Product['price']['value'] | null;
  problemSolved: string | null;
  shortDescription: string | null;
  specifications: Product['specifications']['value'] | null;
  variants: Product['variants']['value'] | null;
  warranty: Product['warranty']['value'] | null;
}

export interface ProductWarrantySummary {
  heading: string;
  summary: string;
}

function hasContent(value: unknown): boolean {
  if (value === null) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0 && value.every(hasContent);
  }

  if (typeof value === 'object') {
    return Object.values(value).every(hasContent);
  }

  return true;
}

export function getProductBySlug(slug: string): Product | null {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getProductPageContent(product: Product): ProductPageContent {
  return {
    careInstructions: getPublicContentValue(product.careInstructions),
    estimatedInstallationTime: getPublicContentValue(
      product.estimatedInstallationTime,
    ),
    fullDescription: getPublicContentValue(product.fullDescription),
    honestLimitations: getPublicContentValue(product.honestLimitations),
    includedItems: getPublicContentValue(product.includedItems),
    installationDifficulty: getPublicContentValue(
      product.installationDifficulty,
    ),
    installationMethod: getPublicContentValue(product.installationMethod),
    keyBenefits: getPublicContentValue(product.keyBenefits),
    launchDate: getPublicContentValue(product.launchDate),
    materials: getPublicContentValue(product.materials),
    price: getPublicContentValue(product.price),
    problemSolved: getPublicContentValue(product.problemSolved),
    shortDescription: getPublicContentValue(product.shortDescription),
    specifications: getPublicContentValue(product.specifications),
    variants: getPublicContentValue(product.variants),
    warranty: getPublicContentValue(product.warranty),
  };
}

export function getProductWarrantySummary(
  product: Product,
): ProductWarrantySummary | null {
  const warranty = getPublicContentValue(product.warranty);

  if (!warranty || !warranty.summary.trim()) {
    return null;
  }

  return {
    heading: formatProductWarrantyHeading(warranty),
    summary: warranty.summary,
  };
}

function formatProductWarrantyHeading(warranty: ProductWarranty) {
  return warranty.durationMonths
    ? `${warranty.durationMonths}-Month Limited Manufacturer Warranty`
    : 'Limited Manufacturer Warranty';
}

export function isApprovedProductMedia(media: ProductMediaAsset) {
  return Boolean(
    media.sourcePath &&
      media.approvalStatus === 'approved' &&
      media.rightsStatus !== 'unknown' &&
      media.lifecycleStatus !== 'missing',
  );
}

export function getApprovedProductMedia(
  productId: ProductId,
  placement?: ProductMediaAsset['intendedPlacement'],
) {
  return getProductMediaAssets(productId, placement).filter(
    isApprovedProductMedia,
  );
}

export function getRelatedProducts(product: Product): readonly Product[] {
  const productRegistry: readonly Product[] = products;

  return product.relatedProductIds.flatMap((productId) => {
    const relatedProduct = productRegistry.find(
      (candidate) => candidate.id === productId,
    );

    return relatedProduct && relatedProduct.status !== 'retired'
      ? [relatedProduct]
      : [];
  });
}

export function getProductCanonicalPath(product: Product) {
  return getProductPath(product.slug);
}

export function isProductPageIndexable(product: Product) {
  const pageContent = getProductPageContent(product);
  const hasVerifiedCompatibility = product.vehicleCompatibility.some(
    (compatibility) => compatibility.verificationStatus === 'verified',
  );
  const hasApprovedMedia = getApprovedProductMedia(product.id).length > 0;

  return (
    product.status === 'launch-ready' &&
    product.availability.approvalStatus === 'approved' &&
    product.availability.state === 'available' &&
    product.availability.purchasable &&
    hasVerifiedCompatibility &&
    hasApprovedMedia &&
    Object.values(pageContent).every(hasContent) &&
    Boolean(getPublicContentValue(product.seo))
  );
}

export function getIndexableProductPaths() {
  return products.filter(isProductPageIndexable).map(getProductCanonicalPath);
}

export function getProductCompatibilitySummary(product: Product) {
  return product.vehicleCompatibility.map((compatibility) => ({
    label: `${compatibility.make} ${compatibility.model}${
      compatibility.yearStart ? ` (${compatibility.yearStart} onwards)` : ''
    }`,
    status: getProductCompatibilityStatus(product, compatibility.vehicleId),
    vehicleId: compatibility.vehicleId,
    variants: compatibility.variants,
    years: compatibility.years,
  }));
}

export function getProductStructuredData(
  product: Product,
  canonicalSiteUrl: URL | null,
) {
  const seo = getPublicContentValue(product.seo);
  const price = getPublicContentValue(product.price);

  if (!canonicalSiteUrl || !seo || !price || !isProductPageIndexable(product)) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    description: seo.description,
    name: product.name,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: (price.amountMinor / 100).toFixed(2),
      priceCurrency: price.currency,
    },
    url: new URL(getProductCanonicalPath(product), canonicalSiteUrl).toString(),
  };
}
