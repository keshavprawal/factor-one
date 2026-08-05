import type { ProductMediaAsset } from '../config/product-media';
import type { Product } from '../config/products';

export type ContentIssueSeverity = 'error' | 'warning';

export interface ContentIssue {
  code: string;
  message: string;
  productId?: string;
  severity: ContentIssueSeverity;
}

export interface ContentValidationOptions {
  mediaPathExists: (sourcePath: string) => boolean;
  strict: boolean;
}

function hasContentValue(value: unknown): boolean {
  if (value === null) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0 && value.every(hasContentValue);
  }

  if (typeof value === 'object') {
    const values = Object.values(value).filter(
      (nestedValue) => nestedValue !== null,
    );

    return values.length > 0 && values.every(hasContentValue);
  }

  return true;
}

function hasApprovedValue(field: { status: string; value: unknown }): boolean {
  return field.status === 'approved' && hasContentValue(field.value);
}

function launchSeverity(strict: boolean): ContentIssueSeverity {
  return strict ? 'error' : 'warning';
}

function findDuplicates(values: readonly string[]): readonly string[] {
  return [
    ...new Set(
      values.filter((value, index) => values.indexOf(value) !== index),
    ),
  ];
}

export function validateProductContent(
  products: readonly Product[],
  mediaManifest: readonly ProductMediaAsset[],
  options: ContentValidationOptions,
): readonly ContentIssue[] {
  const issues: ContentIssue[] = [];
  const productIds = new Set(products.map((product) => product.id));
  const mediaIds = new Set(mediaManifest.map((media) => media.id));

  for (const id of findDuplicates(products.map((product) => product.id))) {
    issues.push({
      code: 'DUPLICATE_PRODUCT_ID',
      message: `Product id "${id}" is duplicated.`,
      productId: id,
      severity: 'error',
    });
  }

  for (const slug of findDuplicates(products.map((product) => product.slug))) {
    issues.push({
      code: 'DUPLICATE_PRODUCT_SLUG',
      message: `Product slug "${slug}" is duplicated.`,
      severity: 'error',
    });
  }

  for (const id of findDuplicates(mediaManifest.map((media) => media.id))) {
    issues.push({
      code: 'DUPLICATE_MEDIA_ID',
      message: `Media id "${id}" is duplicated.`,
      severity: 'error',
    });
  }

  for (const product of products) {
    const contentFields = [
      ['short description', product.shortDescription],
      ['full description', product.fullDescription],
      ['problem solved', product.problemSolved],
      ['key benefits', product.keyBenefits],
      ['specifications', product.specifications],
      ['materials', product.materials],
      ['variants', product.variants],
      ['included items', product.includedItems],
      ['installation method', product.installationMethod],
      ['installation difficulty', product.installationDifficulty],
      ['estimated installation time', product.estimatedInstallationTime],
      ['care instructions', product.careInstructions],
      ['launch date', product.launchDate],
      ['warranty', product.warranty],
      ['honest limitations', product.honestLimitations],
      ['price', product.price],
      ['SEO metadata', product.seo],
    ] as const;

    for (const [label, field] of contentFields) {
      const hasValue = field.value !== null;

      if (
        (field.status === 'pending' && hasValue) ||
        (field.status !== 'pending' && !hasValue)
      ) {
        issues.push({
          code: 'CONTENT_STATE_MISMATCH',
          message: `${label} status "${field.status}" does not match whether a value exists.`,
          productId: product.id,
          severity: 'error',
        });
      }

      if (
        field.status === 'approved' &&
        field.value !== null &&
        !hasContentValue(field.value)
      ) {
        issues.push({
          code: 'APPROVED_CONTENT_EMPTY',
          message: `${label} is approved but empty.`,
          productId: product.id,
          severity: 'error',
        });
      }
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug)) {
      issues.push({
        code: 'INVALID_PRODUCT_SLUG',
        message: `Product slug "${product.slug}" is not URL-safe.`,
        productId: product.id,
        severity: 'error',
      });
    }

    if (
      product.launchDate.status === 'approved' &&
      product.launchDate.value !== null &&
      !/^\d{4}-\d{2}-\d{2}$/.test(product.launchDate.value.date)
    ) {
      issues.push({
        code: 'INVALID_LAUNCH_DATE',
        message: 'Approved launch dates must use the ISO YYYY-MM-DD format.',
        productId: product.id,
        severity: 'error',
      });
    }

    if (product.vehicleCompatibility.length === 0) {
      issues.push({
        code: 'MISSING_COMPATIBILITY',
        message: 'At least one vehicle compatibility record is required.',
        productId: product.id,
        severity: 'error',
      });
    } else if (
      product.launchScope === 'v1' &&
      product.vehicleCompatibility.some(
        (compatibility) => compatibility.verificationStatus !== 'verified',
      )
    ) {
      issues.push({
        code: 'COMPATIBILITY_PENDING',
        message: 'Vehicle compatibility has not been verified for launch.',
        productId: product.id,
        severity: launchSeverity(options.strict),
      });
    }

    for (const mediaId of product.media) {
      if (!mediaIds.has(mediaId)) {
        issues.push({
          code: 'UNKNOWN_MEDIA_REFERENCE',
          message: `Product references unknown media id "${mediaId}".`,
          productId: product.id,
          severity: 'error',
        });
      }
    }

    for (const relatedProductId of product.relatedProductIds) {
      if (!productIds.has(relatedProductId)) {
        issues.push({
          code: 'UNKNOWN_RELATED_PRODUCT',
          message: `Related product "${relatedProductId}" does not exist.`,
          productId: product.id,
          severity: 'error',
        });
      }
    }

    if (
      product.availability.purchasable !==
      (product.availability.state === 'available')
    ) {
      issues.push({
        code: 'PURCHASE_STATE_MISMATCH',
        message:
          'Availability and purchasable state disagree; unavailable products must not appear purchasable.',
        productId: product.id,
        severity: 'error',
      });
    }

    if (product.status !== 'launch-ready' && product.availability.purchasable) {
      issues.push({
        code: 'UNREADY_PRODUCT_PURCHASABLE',
        message: 'A product that is not launch-ready cannot be purchasable.',
        productId: product.id,
        severity: 'error',
      });
    }

    const hasApprovedCompatibility =
      product.vehicleCompatibility.length > 0 &&
      product.vehicleCompatibility.every(
        (compatibility) => compatibility.verificationStatus === 'verified',
      );

    if (
      product.availability.purchasable &&
      (!hasApprovedValue(product.price) ||
        product.availability.approvalStatus !== 'approved' ||
        !hasApprovedCompatibility)
    ) {
      issues.push({
        code: 'PURCHASABLE_CONTENT_INCOMPLETE',
        message:
          'Purchasable products require an approved price, approved availability, and verified compatibility.',
        productId: product.id,
        severity: 'error',
      });
    }

    const productMedia = mediaManifest.filter(
      (media) => media.productId === product.id,
    );

    if (
      product.status === 'launch-ready' &&
      productMedia.some(
        (media) =>
          media.lifecycleStatus !== 'final' ||
          media.approvalStatus !== 'approved' ||
          !['owned', 'official', 'licensed'].includes(media.rightsStatus),
      )
    ) {
      issues.push({
        code: 'UNAPPROVED_LAUNCH_MEDIA',
        message:
          'A launch-ready product cannot use temporary, unapproved, or rights-unresolved imagery.',
        productId: product.id,
        severity: 'error',
      });
    }

    if (product.launchScope !== 'v1') {
      continue;
    }

    const launchFields = [
      ['short description', product.shortDescription],
      ['full description', product.fullDescription],
      ['problem solved', product.problemSolved],
      ['key benefits', product.keyBenefits],
      ['specifications', product.specifications],
      ['materials', product.materials],
      ['included items', product.includedItems],
      ['installation method', product.installationMethod],
      ['installation difficulty', product.installationDifficulty],
      ['estimated installation time', product.estimatedInstallationTime],
      ['care instructions', product.careInstructions],
      ['warranty', product.warranty],
      ['honest limitations', product.honestLimitations],
    ] as const;
    const incompleteLaunchFields: string[] = launchFields
      .filter(([, field]) => !hasApprovedValue(field))
      .map(([label]) => label);

    if (
      product.seo.status === 'approved' &&
      (!product.seo.value?.title.trim() ||
        !product.seo.value?.description.trim() ||
        (product.seo.value?.openGraphTitle !== undefined &&
          !product.seo.value.openGraphTitle.trim()) ||
        (product.seo.value?.openGraphDescription !== undefined &&
          !product.seo.value.openGraphDescription.trim()))
    ) {
      issues.push({
        code: 'INVALID_SEO_METADATA',
        message: 'Approved SEO metadata requires a title and description.',
        productId: product.id,
        severity: 'error',
      });
    }

    if (!hasApprovedValue(product.seo)) {
      incompleteLaunchFields.push('SEO metadata');
    }

    if (
      product.availability.state === 'available' &&
      !hasApprovedValue(product.price)
    ) {
      incompleteLaunchFields.push('price');
    }

    if (product.status !== 'launch-ready') {
      incompleteLaunchFields.push('launch-ready status');
    }

    if (incompleteLaunchFields.length > 0) {
      issues.push({
        code: 'LAUNCH_FIELDS_PENDING',
        message: `Launch content pending: ${incompleteLaunchFields.join(', ')}.`,
        productId: product.id,
        severity: launchSeverity(options.strict),
      });
    }

    const unresolvedMedia = productMedia.filter(
      (media) =>
        !media.sourcePath ||
        media.approvalStatus !== 'approved' ||
        media.lifecycleStatus !== 'final' ||
        !['owned', 'official', 'licensed'].includes(media.rightsStatus),
    );

    if (unresolvedMedia.length > 0) {
      issues.push({
        code: 'PRODUCT_MEDIA_PENDING',
        message: `${unresolvedMedia.length} media record(s) are missing, temporary, unapproved, or have unresolved rights.`,
        productId: product.id,
        severity: launchSeverity(options.strict),
      });
    }

    const homepageHeroSources = new Set(
      productMedia
        .filter(
          (media) =>
            media.intendedPlacement === 'homepage-hero' && media.sourcePath,
        )
        .map((media) => media.sourcePath),
    );
    const repeatedPrimarySource = productMedia.find(
      (media) =>
        media.intendedPlacement === 'homepage-featured' &&
        media.sourcePath &&
        homepageHeroSources.has(media.sourcePath),
    );

    if (repeatedPrimarySource?.sourcePath) {
      issues.push({
        code: 'DUPLICATE_PRIMARY_MEDIA',
        message: `The same source is used for homepage hero and featured placement: ${repeatedPrimarySource.sourcePath}.`,
        productId: product.id,
        severity: launchSeverity(options.strict),
      });
    }
  }

  for (const media of mediaManifest) {
    if (!productIds.has(media.productId)) {
      issues.push({
        code: 'UNKNOWN_MEDIA_PRODUCT',
        message: `Media "${media.id}" references unknown product "${media.productId}".`,
        productId: media.productId,
        severity: 'error',
      });
    }

    const owningProduct = products.find(
      (product) => product.id === media.productId,
    );

    if (owningProduct && !owningProduct.media.includes(media.id)) {
      issues.push({
        code: 'UNREFERENCED_MEDIA',
        message: `Media "${media.id}" is not referenced by its product record.`,
        productId: media.productId,
        severity: 'error',
      });
    }

    if (!media.altText.trim()) {
      issues.push({
        code: 'MISSING_ALT_TEXT',
        message: `Media "${media.id}" is missing alt text.`,
        productId: media.productId,
        severity: 'error',
      });
    }

    if (
      !media.evidenceOnly &&
      ((media.lifecycleStatus === 'missing' && media.sourcePath) ||
        (media.lifecycleStatus !== 'missing' && !media.sourcePath))
    ) {
      issues.push({
        code: 'MEDIA_STATE_MISMATCH',
        message: `Media "${media.id}" lifecycle status does not match whether a source path exists.`,
        productId: media.productId,
        severity: 'error',
      });
    }

    if (
      media.evidenceOnly &&
      (media.lifecycleStatus !== 'temporary' ||
        !media.sourcePath ||
        !media.disclosure?.trim())
    ) {
      issues.push({
        code: 'INVALID_EVIDENCE_MEDIA',
        message: `Evidence-only media "${media.id}" must remain temporary, renderable and clearly disclosed.`,
        productId: media.productId,
        severity: 'error',
      });
    }

    if (
      media.lifecycleStatus === 'final' &&
      (media.approvalStatus !== 'approved' ||
        !['owned', 'official', 'licensed'].includes(media.rightsStatus))
    ) {
      issues.push({
        code: 'FINAL_MEDIA_UNRESOLVED',
        message: `Final media "${media.id}" requires approved status and resolved usage rights.`,
        productId: media.productId,
        severity: 'error',
      });
    }

    if (
      media.sourcePath &&
      (!media.sourcePath.startsWith('/') ||
        !options.mediaPathExists(media.sourcePath))
    ) {
      issues.push({
        code: 'MISSING_MEDIA_FILE',
        message: `Media "${media.id}" references an absent local path: ${media.sourcePath}.`,
        productId: media.productId,
        severity: 'error',
      });
    }
  }

  return issues;
}
