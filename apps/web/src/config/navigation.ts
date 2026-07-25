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

export interface GroupedNavigationItem {
  children: readonly AvailableNavigationItem[];
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

const screenGuard: AvailableNavigationItem = {
  href: '/#product-screen-guard',
  id: 'screen-guard',
  label: 'Screen Guard',
};

const rearDoorMudGuard: AvailableNavigationItem = {
  href: '/#product-rear-door-mud-guard',
  id: 'rear-door-mud-guard',
  label: 'Rear Door Mud Guard',
};

const bumperMudGuard: AvailableNavigationItem = {
  href: '/#product-bumper-mud-guard',
  id: 'bumper-mud-guard',
  label: 'Bumper Mud Guard',
};

const parcelTray: AvailableNavigationItem = {
  href: '/#product-parcel-tray',
  id: 'parcel-tray',
  label: 'Parcel Tray',
};

const doorVisor: AvailableNavigationItem = {
  href: '/#product-door-visor',
  id: 'door-visor',
  label: 'Door Visor',
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

export const mudGuardNavigation: GroupedNavigationItem = {
  id: 'mud-guards',
  label: 'Mud Guards',
  children: [rearDoorMudGuard, bumperMudGuard],
};

export const primaryNavigation: readonly NavigationItem[] = [
  parcelTray,
  mudGuardNavigation,
  screenGuard,
  doorVisor,
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
