import { productDestinations } from '@/config/navigation';

export const vf7FeaturedProducts = [
  {
    name: productDestinations.screenGuard.label,
    description:
      'A clear layer of protection for the central display and daily touch use.',
    href: productDestinations.screenGuard.href,
    image: '/images/essentials/screen-protector.jpg',
    imageAlt: 'Screen guard positioned over a car display',
    visualStatus:
      'Repository product close-up — final VF7 photography pending.',
  },
  {
    name: productDestinations.parcelTray.label,
    description:
      'A cargo-area solution shaped around the gap owners asked us to solve.',
    href: productDestinations.parcelTray.href,
    visualStatus: 'VF7 product photography pending.',
  },
  {
    name: productDestinations.rearDoorMudGuard.label,
    description:
      'A product direction focused on the spray owners notice around the rear doors.',
    href: productDestinations.rearDoorMudGuard.href,
    visualStatus: 'VF7 product photography pending.',
  },
  {
    name: productDestinations.bumperMudGuard.label,
    description:
      'A separate product direction for protection around the exposed bumper area.',
    href: productDestinations.bumperMudGuard.href,
    visualStatus: 'VF7 product photography pending.',
  },
] as const;

export const vf7Categories = [
  {
    name: 'Screen & Cabin',
    description:
      'Protection and details for the places you use inside the car.',
    actionLabel: 'View Screen Guard',
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
    actionLabel: 'View Parcel Tray',
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
