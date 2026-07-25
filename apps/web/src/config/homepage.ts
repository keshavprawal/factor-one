export interface HomepageCategory {
  description: string;
  image: string;
  name: string;
}

export interface HomepagePrinciple {
  description: string;
  title: string;
}

export interface HomepageResource {
  description: string;
  title: string;
}

export const homepagePrinciples: readonly HomepagePrinciple[] = [
  {
    title: 'Chosen by Factor One',
    description: 'Every recommendation is researched before it reaches you.',
  },
  {
    title: 'Fits Your Car',
    description: 'Compatibility before purchase.',
  },
  {
    title: 'Built for Owners',
    description: 'Designed for long-term ownership rather than one-time sales.',
  },
];

export const homepageCategories: readonly HomepageCategory[] = [
  {
    name: 'Exterior',
    description: 'Care for the details you see every day.',
    image: '/images/categories/exterior.jpg',
  },
  {
    name: 'Interior',
    description: 'Thoughtful upgrades for the space you use most.',
    image: '/images/categories/interior.jpg',
  },
  {
    name: 'Electronics',
    description: 'Useful technology for a more considered drive.',
    image: '/images/categories/charging.jpg',
  },
  {
    name: 'Care',
    description: 'Simple ways to protect what you value.',
    image: '/images/categories/storage.jpg',
  },
  {
    name: 'Lighting',
    description: 'Clearer visibility for everyday journeys.',
    image: '/images/categories/lifestyle.jpg',
  },
  {
    name: 'Protection',
    description: 'Practical protection where it matters.',
    image: '/images/categories/protection.jpg',
  },
];

export const homepageResources: readonly HomepageResource[] = [
  {
    title: 'Buying Guides',
    description: 'Understand what matters before choosing a product.',
  },
  {
    title: 'Compatibility Guides',
    description: 'Learn what to check before you buy.',
  },
  {
    title: 'Installation Guides',
    description: 'Prepare for a clear, considered installation.',
  },
  {
    title: 'Ownership Tips',
    description: 'Make everyday ownership easier to understand.',
  },
];
