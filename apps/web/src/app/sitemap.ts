import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return [];
  }

  return [
    { url: new URL('/', siteUrl).toString() },
    { url: new URL('/knowledge', siteUrl).toString() },
    { url: new URL('/vehicles/vf7', siteUrl).toString() },
  ];
}
