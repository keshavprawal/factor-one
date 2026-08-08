export type BrandContactIcon = 'instagram' | 'email' | 'whatsapp';

export interface BrandContactLink {
  external?: boolean;
  href: string;
  icon: BrandContactIcon;
  id: string;
  label: string;
  srLabel: string;
}

export const brandContactLinks = [
  {
    external: true,
    href: 'https://www.instagram.com/Factorone_/',
    icon: 'instagram',
    id: 'instagram',
    label: '@Factorone_',
    srLabel: 'Instagram, Factorone_',
  },
  {
    external: false,
    href: 'mailto:contact@factorone.in',
    icon: 'email',
    id: 'email',
    label: 'contact@factorone.in',
    srLabel: 'Email contact@factorone.in',
  },
  {
    external: true,
    href: 'https://wa.me/919829292629',
    icon: 'whatsapp',
    id: 'whatsapp',
    label: 'WhatsApp',
    srLabel: 'WhatsApp, Factor One',
  },
] as const satisfies readonly BrandContactLink[];
