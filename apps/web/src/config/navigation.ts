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

export type ProductId =
  | 'parcel-tray'
  | 'screen-guard'
  | 'door-visor'
  | 'decals'
  | 'rear-door-mud-guard'
  | 'bumper-mud-guard';

export function getProductAnchor(id: Exclude<ProductId, 'decals'>) {
  return `#product-${id}` as const;
}

function getProductHref(id: Exclude<ProductId, 'decals'>) {
  return `/${getProductAnchor(id)}` as const;
}

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
    label: 'Parcel Tray',
  },
  screenGuard: {
    href: getProductHref('screen-guard'),
    id: 'screen-guard',
    label: 'Screen Guard',
  },
  doorVisor: {
    href: getProductHref('door-visor'),
    id: 'door-visor',
    label: 'Door Visor',
  },
  decals: {
    id: 'decals',
    label: 'Decals',
    unavailable: true,
  },
  rearDoorMudGuard: {
    href: getProductHref('rear-door-mud-guard'),
    id: 'rear-door-mud-guard',
    label: 'Rear Door Mud Guard',
  },
  bumperMudGuard: {
    href: getProductHref('bumper-mud-guard'),
    id: 'bumper-mud-guard',
    label: 'Bumper Mud Guard',
  },
} as const satisfies Record<string, NavigationLeaf>;

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
  productDestinations.decals,
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

export function isAvailableNavigationItem(
  item: NavigationItem | NavigationLeaf,
): item is AvailableNavigationItem {
  return 'href' in item;
}

export function isGroupedNavigationItem(
  item: NavigationItem,
): item is GroupedNavigationItem {
  return 'children' in item;
}

export function isCurrentNavigationItem(
  item: AvailableNavigationItem,
  pathname: string,
) {
  return item.href === pathname;
}
