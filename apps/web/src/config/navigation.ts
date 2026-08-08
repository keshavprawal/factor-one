import { getProductHref } from './product-routes';
import { getProduct, type ProductId } from './products';

export interface AvailableNavigationItem {
  href: string;
  id: string;
  label: string;
}

export interface UnavailableNavigationItem {
  id: string;
  label: string;
  unavailable: true;
}

export type NavigationLeaf =
  | AvailableNavigationItem
  | UnavailableNavigationItem;

export interface GroupedNavigationItem {
  children: readonly NavigationLeaf[];
  id: string;
  label: string;
}

export interface HiddenNavigationItem {
  id: string;
  label: string;
  visible: false;
}

export type NavigationItem =
  | AvailableNavigationItem
  | GroupedNavigationItem
  | UnavailableNavigationItem;

export interface FooterNavigationGroup {
  items: readonly NavigationLeaf[];
  label: string;
}

export interface NavigationSection {
  id: string;
  items: readonly NavigationItem[];
  label: string;
}

export type { ProductId };

const home: AvailableNavigationItem = {
  href: '/',
  id: 'home',
  label: 'Home',
};

const vf7: AvailableNavigationItem = {
  href: '/vehicles/vf7',
  id: 'vinfast-vf7',
  label: 'VinFast VF7',
};

const vf6: UnavailableNavigationItem = {
  id: 'vinfast-vf6',
  label: 'VinFast VF6',
  unavailable: true,
};

export const productDestinations = {
  parcelTray: {
    href: getProductHref('parcel-tray'),
    id: 'parcel-tray',
    label: getProduct('parcel-tray').name,
  },
  screenGuard: {
    href: getProductHref('screen-guard'),
    id: 'screen-guard',
    label: getProduct('screen-guard').name,
  },
  doorVisor: {
    href: getProductHref('door-visor'),
    id: 'door-visor',
    label: getProduct('door-visor').name,
  },
  decals: {
    id: 'decals',
    label: 'Decals',
    visible: false,
  },
  rearDoorMudGuard: {
    href: getProductHref('rear-door-mud-guard'),
    id: 'rear-door-mud-guard',
    label: getProduct('rear-door-mud-guard').name,
  },
  bumperMudGuard: {
    href: getProductHref('bumper-mud-guard'),
    id: 'bumper-mud-guard',
    label: getProduct('bumper-mud-guard').name,
  },
} as const;

const knowledge: AvailableNavigationItem = {
  href: '/knowledge',
  id: 'knowledge',
  label: 'Knowledge',
};

export const compatibilityNavigation: AvailableNavigationItem = {
  href: '/compatibility',
  id: 'compatibility',
  label: 'Vehicle Compatibility',
};

export const ownershipNavigation: AvailableNavigationItem = {
  href: '/ownership',
  id: 'ownership',
  label: 'Ownership',
};

const builtWithOwners: AvailableNavigationItem = {
  href: '/#built-with-owners',
  id: 'built-with-owners',
  label: 'Built with Owners',
};

export const mudGuardNavigation: GroupedNavigationItem = {
  id: 'mud-guards',
  label: 'Mud Guards',
  children: [
    productDestinations.rearDoorMudGuard,
    productDestinations.bumperMudGuard,
  ],
};

const parcelTrayNavigation: AvailableNavigationItem = {
  ...productDestinations.parcelTray,
  label: 'Parcel Tray',
};

export const productNavigation: readonly NavigationItem[] = [
  parcelTrayNavigation,
  mudGuardNavigation,
  productDestinations.screenGuard,
  productDestinations.doorVisor,
];

export const companyNavigation: readonly NavigationItem[] = [
  builtWithOwners,
  compatibilityNavigation,
  knowledge,
  ownershipNavigation,
];

export const primaryNavigation: readonly NavigationItem[] = [
  ...productNavigation,
  ...companyNavigation,
];

export const futureNavigation: readonly HiddenNavigationItem[] = [
  { id: 'vehicles', label: 'Vehicles', visible: false },
];

export const garageNavigation: GroupedNavigationItem = {
  id: 'garage',
  label: 'My Garage',
  children: [
    { href: '/garage', id: 'garage-home', label: 'My Garage' },
    { id: 'assistance', label: 'Assistance', unavailable: true },
  ],
};

export const mobileNavigationSections: readonly NavigationSection[] = [
  { id: 'products', label: 'Products', items: productNavigation },
  { id: 'factor-one', label: 'Factor One', items: companyNavigation },
  { id: 'garage', label: 'Garage', items: [garageNavigation] },
];

export const footerNavigation: readonly FooterNavigationGroup[] = [
  {
    items: [home, vf7, vf6],
    label: 'Explore',
  },
  {
    items: [compatibilityNavigation, knowledge, builtWithOwners],
    label: 'Factor One',
  },
  {
    items: [
      {
        href: '/ownership/warranty',
        id: 'warranty',
        label: 'Limited Warranty',
      },
      {
        href: '/ownership/cancellation',
        id: 'cancellation',
        label: 'Order Cancellation',
      },
      { href: '/ownership/shipping', id: 'shipping', label: 'Shipping' },
      { href: '/ownership/returns', id: 'returns', label: 'Returns & Refunds' },
      {
        href: '/ownership/installation',
        id: 'installation-guidance',
        label: 'Installation Guidance',
      },
      {
        href: '/ownership/contact',
        id: 'contact-support',
        label: 'Contact Support',
      },
      { href: '/ownership/privacy', id: 'privacy', label: 'Privacy' },
      { href: '/ownership/terms', id: 'terms', label: 'Terms' },
      { href: '/ownership/faq', id: 'ownership-faq', label: 'Ownership FAQ' },
    ],
    label: 'Ownership',
  },
];
