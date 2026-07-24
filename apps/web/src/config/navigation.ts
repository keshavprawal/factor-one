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

/**
 * Canonical V1 destinations remain disabled until their approved routes exist.
 * This avoids shipping misleading links while keeping the information
 * architecture ready for those routes.
 */
export const primaryNavigation: NavigationItem[] = [
  { id: 'shop', label: 'Shop', unavailable: true },
  { id: 'about', label: 'About', unavailable: true },
  { id: 'contact', label: 'Contact', unavailable: true },
];

export const utilityNavigation: NavigationItem[] = [
  { id: 'search', label: 'Search', unavailable: true },
  { id: 'cart', label: 'Cart', unavailable: true },
];

export const mobileNavigation: NavigationItem[] = [home, ...primaryNavigation];

export const footerNavigation: FooterNavigationGroup[] = [
  {
    items: [home, vf7],
    label: 'Navigation',
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
