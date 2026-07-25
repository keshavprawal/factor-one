import { productDestinations, type ProductId } from '@/config/navigation';

export interface FeaturedProduct {
  availability: string;
  description: string;
  id: Exclude<ProductId, 'decals'>;
  image?: string;
  imageAlt?: string;
  name: string;
  ownerRequestCount?: number;
  visualStatus: string;
}

export interface KnowledgeTopic {
  description: string;
  index: string;
  title: string;
}

export interface ProofPoint {
  description: string;
  title: string;
}

export interface RoadmapItem {
  agreementCount?: number;
  raisedBy?: string;
  status: 'Designing' | 'Research' | 'Testing' | 'Prototype' | 'Under Review';
  title: string;
}

export const featuredProducts: readonly FeaturedProduct[] = [
  {
    id: productDestinations.screenGuard.id,
    name: productDestinations.screenGuard.label,
    description:
      'Helps protect the display without getting in the way of everyday use.',
    availability: 'Product direction',
    image: '/images/essentials/screen-protector.jpg',
    imageAlt: 'Screen guard positioned over a car display',
    visualStatus:
      'Repository product close-up — final Factor One photography pending.',
  },
  {
    id: productDestinations.rearDoorMudGuard.id,
    name: productDestinations.rearDoorMudGuard.label,
    description:
      'Made to address the spray and grime owners notice around the rear doors.',
    availability: 'In testing',
    visualStatus: 'Product photography pending.',
    ownerRequestCount: 67,
  },
  {
    id: productDestinations.bumperMudGuard.id,
    name: productDestinations.bumperMudGuard.label,
    description:
      'A practical layer of protection for an exposed part of the car.',
    availability: 'Product direction',
    visualStatus: 'Product photography pending.',
  },
  {
    id: productDestinations.parcelTray.id,
    name: productDestinations.parcelTray.label,
    description:
      'Designed to close the open cargo-area gap owners asked Factor One to solve.',
    availability: 'In design',
    visualStatus: 'Product photography pending.',
    ownerRequestCount: 184,
  },
  {
    id: productDestinations.doorVisor.id,
    name: productDestinations.doorVisor.label,
    description:
      'A considered exterior addition for ventilation in everyday conditions.',
    availability: 'Product direction',
    visualStatus: 'Product photography pending.',
  },
];

export const knowledgeTopics: readonly KnowledgeTopic[] = [
  {
    index: '01',
    title: 'Fit before you buy',
    description:
      'Know which car a product is intended for before it reaches your garage.',
  },
  {
    index: '02',
    title: 'Install it properly',
    description:
      'Clear installation guidance should be part of the product, not an afterthought.',
  },
  {
    index: '03',
    title: 'Protect what gets used',
    description:
      'Focus on the places that take the wear of real, everyday ownership.',
  },
  {
    index: '04',
    title: 'Learn from other owners',
    description:
      'The problems owners share help shape what Factor One works on next.',
  },
];

export const proofPoints: readonly ProofPoint[] = [
  {
    title: 'Engineered to Fit',
    description:
      'The starting point is the intended car, not a universal dimension.',
  },
  {
    title: 'Designed to Belong',
    description:
      'The product should work with the car instead of looking added on.',
  },
  {
    title: 'Built to Protect',
    description:
      'Protection should solve the everyday problem without creating a new one.',
  },
];

export const roadmapItems: readonly RoadmapItem[] = [
  {
    title: 'Close the Parcel Tray Gap',
    raisedBy: 'Keshav',
    agreementCount: 184,
    status: 'Designing',
  },
  {
    title: 'Need Better Moonroof Cover',
    raisedBy: 'Factor Lab',
    status: 'Research',
  },
  {
    title: 'Rear Door Mud Guard',
    raisedBy: 'Factor Lab',
    agreementCount: 67,
    status: 'Testing',
  },
  {
    title: 'Better Protection Mud Flaps',
    agreementCount: 212,
    status: 'Prototype',
  },
  {
    title: 'Frunk Organiser',
    agreementCount: 143,
    status: 'Under Review',
  },
];
