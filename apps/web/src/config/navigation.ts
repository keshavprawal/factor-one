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

export interface HiddenNavigationItem {
  id: string;
  label: string;
  visible: false;
}

export type NavigationItem =
  | AvailableNavigationItem
  | UnavailableNavigationItem;

export interface FooterNavigationGroup {
  items: AvailableNavigationItem[];
  label: string;
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

export const productNavigation: readonly AvailableNavigationItem[] = [
  {
    href: '/#product-screen-guard',
    id: 'screen-guard',
    label: 'Screen Guard',
  },
  {
    href: '/#product-rear-door-mud-guard',
    id: 'rear-door-mud-guard',
    label: 'Rear Door Mud Guard',
  },
  {
    href: '/#product-mud-guards',
    id: 'mud-guards',
    label: 'Mud Guards',
  },
  {
    href: '/#product-parcel-tray',
    id: 'parcel-tray',
    label: 'Parcel Tray',
  },
  {
    href: '/#product-door-visor',
    id: 'door-visor',
    label: 'Door Visor',
  },
];

/**
 * Current product destinations use real homepage anchors. Assistance remains
 * disabled until an approved route exists. Vehicles is configured separately
 * so it can be enabled later without changing the navigation model.
 */
export const primaryNavigation: readonly NavigationItem[] = [
  productNavigation[3],
  productNavigation[2],
  productNavigation[0],
  knowledge,
  builtWithOwners,
  { id: 'assistance', label: 'Assistance', unavailable: true },
];

export const futureNavigation: readonly HiddenNavigationItem[] = [
  { id: 'vehicles', label: 'Vehicles', visible: false },
];

export const utilityNavigation: readonly NavigationItem[] = [
  { id: 'garage', label: 'My Garage', unavailable: true },
];

export const mobileNavigation: readonly NavigationItem[] = [
  home,
  ...primaryNavigation,
  ...utilityNavigation,
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
  item: NavigationItem,
): item is AvailableNavigationItem {
  return 'href' in item;
}

export function isCurrentNavigationItem(
  item: AvailableNavigationItem,
  pathname: string,
) {
  return item.href === pathname;
}
