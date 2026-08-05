import type { MetadataRoute } from 'next';
import { getCanonicalSiteUrl } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalSiteUrl = getCanonicalSiteUrl();

  if (!canonicalSiteUrl) {
    return [];
  }

  return [
    { url: new URL('/', canonicalSiteUrl).toString() },
    { url: new URL('/knowledge', canonicalSiteUrl).toString() },
    { url: new URL('/vehicles/vf7', canonicalSiteUrl).toString() },
  ];
}
