export interface FeaturedProduct {
  availability: string;
  description: string;
  id: string;
  image: string;
  imageAlt: string;
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
    id: 'screen-guard',
    name: 'Screen Guard',
    description:
      'Helps protect the display without getting in the way of everyday use.',
    availability: 'Product direction',
    image: '/images/essentials/screen-protector.jpg',
    imageAlt: 'Screen guard positioned over a car display',
    visualStatus: 'Development visual — final product photography pending.',
  },
  {
    id: 'rear-door-mud-guard',
    name: 'Rear Door Mud Guard',
    description:
      'Made to address the spray and grime owners notice around the rear doors.',
    availability: 'In testing',
    image: '/images/categories/protection.jpg',
    imageAlt: 'Close view of a protected car exterior after rain',
    visualStatus: 'Development visual — final product photography pending.',
    ownerRequestCount: 67,
  },
  {
    id: 'mud-guards',
    name: 'Mud Guards',
    description:
      'A practical layer of protection for the parts of the car exposed every day.',
    availability: 'Product direction',
    image: '/images/categories/exterior.jpg',
    imageAlt: 'Rear exterior of a car in warm light',
    visualStatus: 'Development visual — final product photography pending.',
  },
  {
    id: 'parcel-tray',
    name: 'Parcel Tray',
    description:
      'Designed to close the open cargo-area gap owners asked Factor One to solve.',
    availability: 'In design',
    image: '/images/essentials/trunk-organizer.jpg',
    imageAlt: 'Development collage of car protection and storage accessories',
    visualStatus: 'Development visual — final product photography pending.',
    ownerRequestCount: 184,
  },
  {
    id: 'door-visor',
    name: 'Door Visor',
    description:
      'A considered exterior addition for ventilation in everyday conditions.',
    availability: 'Product direction',
    image: '/images/categories/exterior.jpg',
    imageAlt: 'Side profile of a car showing the window line',
    visualStatus: 'Development visual — final product photography pending.',
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
