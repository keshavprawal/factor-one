import { productDestinations, type ProductId } from '@/config/navigation';

export type FeaturedProductId = Exclude<ProductId, 'decals'>;
export type ProductMediaStatus = 'approved' | 'provisional' | 'missing';
export type ProductAvailabilityState = 'direction' | 'design' | 'testing';

export interface ProductMediaItem {
  altText: string;
  availability: string;
  availabilityState: ProductAvailabilityState;
  desktopImage?: string;
  destination: string;
  focalPoint: string;
  id: FeaturedProductId;
  mediaStatus: ProductMediaStatus;
  mobileImage?: string;
  name: string;
  purpose: string;
}

export const productMedia = [
  {
    id: productDestinations.screenGuard.id,
    name: productDestinations.screenGuard.label,
    purpose:
      'Helps protect the display without getting in the way of everyday use.',
    desktopImage: '/images/essentials/screen-protector.jpg',
    mobileImage: '/images/essentials/screen-protector.jpg',
    altText: 'Screen guard positioned over a car display',
    mediaStatus: 'provisional',
    focalPoint: 'center',
    destination: productDestinations.screenGuard.href,
    availability: 'Product direction',
    availabilityState: 'direction',
  },
  {
    id: productDestinations.rearDoorMudGuard.id,
    name: productDestinations.rearDoorMudGuard.label,
    purpose:
      'Made to address the spray and grime owners notice around the rear doors.',
    altText: 'Rear Door Mud Guard photography pending',
    mediaStatus: 'missing',
    focalPoint: 'center',
    destination: productDestinations.rearDoorMudGuard.href,
    availability: 'In testing',
    availabilityState: 'testing',
  },
  {
    id: productDestinations.bumperMudGuard.id,
    name: productDestinations.bumperMudGuard.label,
    purpose: 'A practical layer of protection for an exposed part of the car.',
    altText: 'Bumper Mud Guard photography pending',
    mediaStatus: 'missing',
    focalPoint: 'center',
    destination: productDestinations.bumperMudGuard.href,
    availability: 'Product direction',
    availabilityState: 'direction',
  },
  {
    id: productDestinations.parcelTray.id,
    name: productDestinations.parcelTray.label,
    purpose:
      'Designed to close the open cargo-area gap owners asked Factor One to solve.',
    altText: 'Parcel Tray photography pending',
    mediaStatus: 'missing',
    focalPoint: 'center',
    destination: productDestinations.parcelTray.href,
    availability: 'In design',
    availabilityState: 'design',
  },
  {
    id: productDestinations.doorVisor.id,
    name: productDestinations.doorVisor.label,
    purpose:
      'A considered exterior addition for ventilation in everyday conditions.',
    altText: 'Door Visor photography pending',
    mediaStatus: 'missing',
    focalPoint: 'center',
    destination: productDestinations.doorVisor.href,
    availability: 'Product direction',
    availabilityState: 'direction',
  },
] as const satisfies readonly ProductMediaItem[];
