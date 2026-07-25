import { productMedia, type ProductMediaItem } from '@/config/product-media';

export interface FeaturedProduct extends ProductMediaItem {
  ownerRequestCount?: number;
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

export const featuredProducts: readonly FeaturedProduct[] = productMedia.map(
  (product) => ({
    ...product,
    ...(product.id === 'rear-door-mud-guard'
      ? { ownerRequestCount: 67 }
      : product.id === 'parcel-tray'
        ? { ownerRequestCount: 184 }
        : {}),
  }),
);

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
