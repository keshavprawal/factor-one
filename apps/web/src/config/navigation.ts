import { getProductAnchor, getProductHref } from './product-routes';
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
  items: readonly AvailableNavigationItem[];
  label: string;
}

export interface NavigationSection {
  id: string;
  items: readonly NavigationItem[];
  label: string;
}

export { getProductAnchor };
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
  href: '/#knowledge',
  id: 'knowledge',
  label: 'Knowledge',
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

export const productNavigation: readonly NavigationItem[] = [
  productDestinations.parcelTray,
  mudGuardNavigation,
  productDestinations.screenGuard,
  productDestinations.doorVisor,
];

export const companyNavigation: readonly NavigationItem[] = [
  builtWithOwners,
  knowledge,
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
    { id: 'garage-home', label: 'My Garage', unavailable: true },
    { id: 'assistance', label: 'Assistance', unavailable: true },
  ],
};

export const mobileNavigationSections: readonly NavigationSection[] = [
  { id: 'products', label: 'Products', items: productNavigation },
  { id: 'factor-one', label: 'Factor One', items: companyNavigation },
  { id: 'account', label: 'Account', items: [garageNavigation] },
];

export const footerNavigation: readonly FooterNavigationGroup[] = [
  {
    items: [home, vf7],
    label: 'Explore',
  },
  {
    items: [knowledge, builtWithOwners],
    label: 'Factor One',
  },
];
