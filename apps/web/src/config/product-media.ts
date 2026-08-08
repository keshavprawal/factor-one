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
  | 'product-specification'
  | 'installation';

export type ProductMediaRightsStatus =
  | 'unknown'
  | 'owned'
  | 'official'
  | 'licensed'
  | 'user-confirmed-commercial-use';

export type ProductMediaApprovalStatus = 'pending' | 'approved' | 'rejected';

export type ProductMediaLifecycleStatus = 'missing' | 'temporary' | 'final';

export interface ProductMediaAsset {
  altText: string;
  approvalStatus: ProductMediaApprovalStatus;
  aspectRatio: '1:1' | '3:4' | '4:3' | '16:9';
  caption?: string;
  credit: string | null;
  disclosure?: string;
  evidenceOnly?: boolean;
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
    id: 'parcel-tray-temporary-hero',
    productId: 'parcel-tray',
    intendedPlacement: 'product-detail',
    viewport: 'all',
    sourcePath: '/images/products/parcel-tray/parcel-tray-temporary-hero.png',
    aspectRatio: '1:1',
    altText:
      'Representative visualisation of the Factor One VF7 Parcel Tray inside a vehicle luggage compartment.',
    sourceName: 'Gemini-generated visualisation',
    credit: 'Factor One',
    disclosure: 'Representative visualisation',
    rightsStatus: 'user-confirmed-commercial-use',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-temporary-lifestyle',
    productId: 'parcel-tray',
    intendedPlacement: 'product-gallery',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/parcel-tray-temporary-lifestyle.png',
    aspectRatio: '1:1',
    altText:
      'Representative lifestyle visualisation showing a parcel tray in use inside a vehicle luggage compartment.',
    sourceName: 'Gemini-generated visualisation',
    credit: 'Factor One',
    disclosure: 'Representative visualisation',
    rightsStatus: 'user-confirmed-commercial-use',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-prototype-installed',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/parcel-tray-prototype-installed.jpg',
    aspectRatio: '4:3',
    altText:
      'Prototype parcel tray installed in a VinFast VF7 during product development.',
    sourceName: 'Factor One founder photography',
    credit: 'Factor One',
    caption: 'Prototype installed during product development.',
    disclosure: 'Development evidence · Prototype photography',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-prototype-front-close',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/vf7-parcel-tray-prototype-front-close-01.jpg',
    aspectRatio: '4:3',
    altText:
      'Front close view of a prototype parcel tray fitted in a VinFast VF7 cargo area.',
    sourceName: 'Factor One founder photography',
    credit: 'Factor One',
    caption: 'Prototype fitted during product development.',
    disclosure: 'Development evidence · Prototype photography',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-prototype-full-rear',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/vf7-parcel-tray-prototype-full-rear-02.jpg',
    aspectRatio: '3:4',
    altText:
      'Full rear view of a prototype parcel tray fitted in a VinFast VF7 during development.',
    sourceName: 'Factor One founder photography',
    credit: 'Factor One',
    caption: 'Prototype fitted during product development.',
    disclosure: 'Development evidence · Prototype photography',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-prototype-top-fit',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/vf7-parcel-tray-prototype-top-fit-03.jpg',
    aspectRatio: '3:4',
    altText:
      'Top view of the prototype parcel tray shape fitted in a VinFast VF7 cargo area.',
    sourceName: 'Factor One founder photography',
    credit: 'Factor One',
    caption: 'Prototype fitted during product development.',
    disclosure: 'Development evidence · Prototype photography',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-prototype-rear-fit',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/vf7-parcel-tray-prototype-rear-fit-04.jpg',
    aspectRatio: '3:4',
    altText:
      'Rear fit view showing a prototype parcel tray positioned in a VinFast VF7 cargo area.',
    sourceName: 'Factor One founder photography',
    credit: 'Factor One',
    caption: 'Prototype used to assess fit during product development.',
    disclosure: 'Development evidence · Prototype photography',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-prototype-angle-fit',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/vf7-parcel-tray-prototype-angle-fit-05.jpg',
    aspectRatio: '3:4',
    altText:
      'Angled view of a prototype parcel tray installed in a VinFast VF7 cargo area.',
    sourceName: 'Factor One founder photography',
    credit: 'Factor One',
    caption: 'Prototype installation view from product development.',
    disclosure: 'Development evidence · Prototype photography',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-cad-perspective-primary',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/vf7-parcel-tray-cad-perspective-01.jpg',
    aspectRatio: '16:9',
    altText: 'CAD perspective view of the VF7 Parcel Tray development model.',
    sourceName: 'Factor One CAD development media',
    credit: 'Factor One',
    caption: 'CAD development reference.',
    disclosure: 'Engineering reference · CAD development view',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-cad-top',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath: '/images/products/parcel-tray/vf7-parcel-tray-cad-top-02.jpg',
    aspectRatio: '16:9',
    altText:
      'Top CAD reference view showing the VF7 Parcel Tray development shape without dimensions.',
    sourceName: 'Factor One CAD development media',
    credit: 'Factor One',
    caption:
      'Dimensional-reference media; numerical dimensions remain pending.',
    disclosure: 'Engineering reference · Dimensions pending',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    focalPoint: 'center',
  },
  {
    id: 'parcel-tray-cad-perspective-secondary',
    productId: 'parcel-tray',
    intendedPlacement: 'product-specification',
    viewport: 'all',
    sourcePath:
      '/images/products/parcel-tray/vf7-parcel-tray-cad-perspective-03.jpg',
    aspectRatio: '16:9',
    altText:
      'Alternate CAD perspective of the VF7 Parcel Tray development model.',
    sourceName: 'Factor One CAD development media',
    credit: 'Factor One',
    caption: 'CAD development reference.',
    disclosure: 'Engineering reference · CAD development view',
    evidenceOnly: true,
    rightsStatus: 'owned',
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
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
  disclosure?: string;
  evidenceOnly?: boolean;
  focalPoint: string;
  fallbackVisual: ProductMediaFallbackVisual;
  id: ProductId;
  mediaId: string;
  mediaStatus: ProductMediaStatus;
  mobileImage?: string;
  name: string;
  purpose?: string;
  caption?: string;
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
    ...(representativeMedia.caption
      ? { caption: representativeMedia.caption }
      : {}),
    ...(representativeMedia.disclosure
      ? { disclosure: representativeMedia.disclosure }
      : {}),
    ...(representativeMedia.evidenceOnly
      ? { evidenceOnly: representativeMedia.evidenceOnly }
      : {}),
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

function isApprovedProductMedia(media: ProductMediaAsset | undefined) {
  return Boolean(
    media?.sourcePath &&
      media.approvalStatus === 'approved' &&
      media.rightsStatus !== 'unknown' &&
      media.lifecycleStatus !== 'missing',
  );
}

export function getProductDetailMediaItem(
  productId: ProductId,
): ProductMediaItem {
  const product = getProduct(productId);
  const detailMedia = getProductMediaAssets(productId, 'product-detail');
  const desktopMedia =
    detailMedia.find(
      (media) => media.viewport === 'desktop' && isApprovedProductMedia(media),
    ) ??
    detailMedia.find(
      (media) => media.viewport === 'all' && isApprovedProductMedia(media),
    );
  const mobileMedia =
    detailMedia.find(
      (media) => media.viewport === 'mobile' && isApprovedProductMedia(media),
    ) ??
    detailMedia.find(
      (media) => media.viewport === 'all' && isApprovedProductMedia(media),
    );
  const hasApprovedDetailMedia = Boolean(desktopMedia && mobileMedia);

  return {
    id: product.id,
    mediaId: desktopMedia?.id ?? `product-${product.id}-fallback`,
    name: product.name,
    ...(desktopMedia?.caption ? { caption: desktopMedia.caption } : {}),
    ...(desktopMedia?.disclosure
      ? { disclosure: desktopMedia.disclosure }
      : {}),
    ...(desktopMedia?.evidenceOnly
      ? { evidenceOnly: desktopMedia.evidenceOnly }
      : {}),
    altText: hasApprovedDetailMedia
      ? desktopMedia!.altText
      : `${product.name} photography pending`,
    desktopImage: desktopMedia?.sourcePath ?? undefined,
    mobileImage: mobileMedia?.sourcePath ?? undefined,
    mediaStatus: hasApprovedDetailMedia
      ? desktopMedia!.lifecycleStatus === 'final' &&
        mobileMedia!.lifecycleStatus === 'final'
        ? 'approved'
        : 'provisional'
      : 'missing',
    focalPoint: desktopMedia?.focalPoint ?? 'center',
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
