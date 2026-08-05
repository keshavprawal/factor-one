import { getProductHref } from './product-routes';
import {
  getPublicContentValue,
  getProduct,
  products,
  type ProductId,
  type ProductStatus,
} from './products';

export type ProductMediaPlacement =
  | 'homepage-hero'
  | 'homepage-featured'
  | 'vehicle-featured'
  | 'product-gallery'
  | 'product-detail'
  | 'installation';

export type ProductMediaRightsStatus =
  | 'unknown'
  | 'owned'
  | 'official'
  | 'licensed';

export type ProductMediaApprovalStatus = 'pending' | 'approved' | 'rejected';

export type ProductMediaLifecycleStatus = 'missing' | 'temporary' | 'final';

export interface ProductMediaAsset {
  altText: string;
  approvalStatus: ProductMediaApprovalStatus;
  aspectRatio: '1:1' | '4:3' | '16:9';
  credit: string | null;
  focalPoint: string;
  id: string;
  intendedPlacement: ProductMediaPlacement;
  lifecycleStatus: ProductMediaLifecycleStatus;
  productId: ProductId;
  rightsStatus: ProductMediaRightsStatus;
  sourcePath: string | null;
  sourceName: string | null;
  viewport: 'all' | 'desktop' | 'mobile';
}

export type ProductMediaFallbackVisual =
  | 'screen'
  | 'rear-mud-guard'
  | 'bumper-mud-guard'
  | 'parcel-tray'
  | 'door-visor';

const productFallbackVisuals: Record<ProductId, ProductMediaFallbackVisual> = {
  'screen-guard': 'screen',
  'rear-door-mud-guard': 'rear-mud-guard',
  'bumper-mud-guard': 'bumper-mud-guard',
  'parcel-tray': 'parcel-tray',
  'door-visor': 'door-visor',
};

export const productMediaManifest = [
  {
    id: 'screen-guard-homepage-hero',
    productId: 'screen-guard',
    intendedPlacement: 'homepage-hero',
    viewport: 'all',
    sourcePath: '/images/essentials/screen-protector.jpg',
    aspectRatio: '4:3',
    altText: 'Screen guard positioned over a car display',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'screen-guard-homepage-featured',
    productId: 'screen-guard',
    intendedPlacement: 'homepage-featured',
    viewport: 'all',
    sourcePath: '/images/essentials/screen-protector.jpg',
    aspectRatio: '4:3',
    altText: 'Screen guard positioned over a car display',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'screen-guard-vf7-featured',
    productId: 'screen-guard',
    intendedPlacement: 'vehicle-featured',
    viewport: 'all',
    sourcePath: '/images/essentials/screen-protector.jpg',
    aspectRatio: '1:1',
    altText: 'Screen guard positioned over a car display',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'rear-door-mud-guard-homepage-hero',
    productId: 'rear-door-mud-guard',
    intendedPlacement: 'homepage-hero',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '4:3',
    altText: 'Rear Door Mud Guard photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'rear-door-mud-guard-homepage-featured',
    productId: 'rear-door-mud-guard',
    intendedPlacement: 'homepage-featured',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '4:3',
    altText: 'Rear Door Mud Guard photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'rear-door-mud-guard-vf7-featured',
    productId: 'rear-door-mud-guard',
    intendedPlacement: 'vehicle-featured',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '1:1',
    altText: 'Rear Door Mud Guard photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'bumper-mud-guard-homepage-hero',
    productId: 'bumper-mud-guard',
    intendedPlacement: 'homepage-hero',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '4:3',
    altText: 'Bumper Mud Guard photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'bumper-mud-guard-homepage-featured',
    productId: 'bumper-mud-guard',
    intendedPlacement: 'homepage-featured',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '4:3',
    altText: 'Bumper Mud Guard photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'bumper-mud-guard-vf7-featured',
    productId: 'bumper-mud-guard',
    intendedPlacement: 'vehicle-featured',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '1:1',
    altText: 'Bumper Mud Guard photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-homepage-hero',
    productId: 'parcel-tray',
    intendedPlacement: 'homepage-hero',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '4:3',
    altText: 'Parcel Tray photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-homepage-featured',
    productId: 'parcel-tray',
    intendedPlacement: 'homepage-featured',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '4:3',
    altText: 'Parcel Tray photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-vf7-featured',
    productId: 'parcel-tray',
    intendedPlacement: 'vehicle-featured',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '1:1',
    altText: 'Parcel Tray photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'door-visor-homepage-hero',
    productId: 'door-visor',
    intendedPlacement: 'homepage-hero',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '4:3',
    altText: 'Door Visor photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
  {
    id: 'door-visor-homepage-featured',
    productId: 'door-visor',
    intendedPlacement: 'homepage-featured',
    viewport: 'all',
    sourcePath: null,
    aspectRatio: '4:3',
    altText: 'Door Visor photography pending',
    sourceName: null,
    credit: null,
    rightsStatus: 'unknown',
    approvalStatus: 'pending',
    lifecycleStatus: 'missing',
    focalPoint: 'center',
  },
] as const satisfies readonly ProductMediaAsset[];

export type ProductMediaStatus = 'approved' | 'provisional' | 'missing';

export interface ProductMediaItem {
  altText: string;
  availability?: string;
  availabilityState: ProductStatus;
  desktopImage?: string;
  destination: string;
  focalPoint: string;
  fallbackVisual: ProductMediaFallbackVisual;
  id: ProductId;
  mediaId: string;
  mediaStatus: ProductMediaStatus;
  mobileImage?: string;
  name: string;
  purpose?: string;
}

export function getProductMediaAssets(
  productId: ProductId,
  intendedPlacement?: ProductMediaPlacement,
): readonly ProductMediaAsset[] {
  return productMediaManifest.filter(
    (media) =>
      media.productId === productId &&
      (!intendedPlacement || media.intendedPlacement === intendedPlacement),
  );
}

export function getProductMediaItem(
  productId: ProductId,
  intendedPlacement: ProductMediaPlacement,
): ProductMediaItem {
  const product = getProduct(productId);
  const media = getProductMediaAssets(productId, intendedPlacement);
  const desktopMedia =
    media.find((item) => item.viewport === 'desktop') ??
    media.find((item) => item.viewport === 'all');
  const mobileMedia =
    media.find((item) => item.viewport === 'mobile') ??
    media.find((item) => item.viewport === 'all');
  const representativeMedia = desktopMedia ?? mobileMedia;
  const hasMedia = Boolean(desktopMedia?.sourcePath && mobileMedia?.sourcePath);
  const purpose =
    getPublicContentValue(product.problemSolved) ??
    getPublicContentValue(product.shortDescription);
  const mediaStatus: ProductMediaStatus = !hasMedia
    ? 'missing'
    : media.every(
          (item) =>
            item.approvalStatus === 'approved' &&
            item.lifecycleStatus === 'final',
        )
      ? 'approved'
      : 'provisional';

  if (!representativeMedia) {
    throw new Error(
      `No ${intendedPlacement} media record exists for ${productId}.`,
    );
  }

  return {
    id: product.id,
    mediaId: representativeMedia.id,
    name: product.name,
    ...(purpose ? { purpose } : {}),
    desktopImage: desktopMedia?.sourcePath ?? undefined,
    mobileImage: mobileMedia?.sourcePath ?? undefined,
    altText: representativeMedia.altText,
    mediaStatus,
    focalPoint: representativeMedia.focalPoint,
    fallbackVisual: productFallbackVisuals[product.id],
    destination: getProductHref(product.id),
    ...(product.availability.approvalStatus === 'approved'
      ? { availability: product.availability.label }
      : {}),
    availabilityState: product.status,
  };
}

export function getProductMediaItems(
  intendedPlacement: ProductMediaPlacement,
): readonly ProductMediaItem[] {
  return products
    .filter((product) =>
      product.media.some((mediaId) =>
        productMediaManifest.some(
          (media) =>
            media.id === mediaId &&
            media.intendedPlacement === intendedPlacement,
        ),
      ),
    )
    .map((product) => getProductMediaItem(product.id, intendedPlacement));
}

export const productMedia = getProductMediaItems('homepage-hero');
