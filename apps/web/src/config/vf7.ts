import { productDestinations } from '@/config/navigation';
import { getProductHref } from '@/config/product-routes';
import { getProductMediaItem } from '@/config/product-media';
import {
  getPublicContentValue,
  getProduct,
  type ProductId,
} from '@/config/products';

const vf7FeaturedProductIds = [
  'screen-guard',
  'parcel-tray',
  'rear-door-mud-guard',
  'bumper-mud-guard',
] as const satisfies readonly ProductId[];

export const vf7FeaturedProducts = vf7FeaturedProductIds.map((productId) => {
  const product = getProduct(productId);
  const media = getProductMediaItem(productId, 'vehicle-featured');

  const description = getPublicContentValue(product.shortDescription);

  return {
    name: product.name,
    ...(description ? { description } : {}),
    href: getProductHref(product.id),
    ...(media.desktopImage && media.altText
      ? { image: media.desktopImage, imageAlt: media.altText }
      : {}),
    visualStatus:
      media.mediaStatus === 'missing'
        ? 'VF7 product photography pending.'
        : 'Repository product close-up — final VF7 photography pending.',
  };
});

export const vf7Categories = [
  {
    name: 'Screen & Cabin',
    description:
      'Protection and details for the places you use inside the car.',
    actionLabel: `View ${productDestinations.screenGuard.label}`,
    products: [
      {
        name: productDestinations.screenGuard.label,
        href: productDestinations.screenGuard.href,
      },
    ],
    visual: 'cabin',
  },
  {
    name: 'Exterior Details',
    description: 'Products shaped around exposed areas and everyday weather.',
    actionLabel: 'Explore Exterior Products',
    products: [
      {
        name: productDestinations.rearDoorMudGuard.label,
        href: productDestinations.rearDoorMudGuard.href,
      },
      {
        name: productDestinations.bumperMudGuard.label,
        href: productDestinations.bumperMudGuard.href,
      },
      {
        name: productDestinations.doorVisor.label,
        href: productDestinations.doorVisor.href,
      },
    ],
    visual: 'exterior',
  },
  {
    name: 'Cargo & Storage',
    description: 'Purposeful solutions for the VF7 cargo area.',
    actionLabel: `View ${productDestinations.parcelTray.label}`,
    products: [
      {
        name: productDestinations.parcelTray.label,
        href: productDestinations.parcelTray.href,
      },
    ],
    visual: 'cargo',
  },
] as const;

export const vf7OverviewHighlights = [
  ['Precision Fit', 'Designed specifically for the VF7.'],
  ['Daily Practicality', 'Accessories created around real ownership.'],
  ['Premium Quality', 'Materials selected for long-term durability.'],
] as const;

export const vf7OwnershipResources = [
  {
    title: 'Installation Guides',
    description: 'Step-by-step installation instructions are being prepared.',
  },
  {
    title: 'Warranty',
    description: 'Coverage and claims guidance is being prepared.',
  },
  {
    title: 'Care & Maintenance',
    description: 'Product care guidance is being prepared.',
  },
  {
    title: 'Frequently Asked Questions',
    description: 'Answers to common owner questions are being prepared.',
  },
] as const;
