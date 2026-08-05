import type { MetadataRoute } from 'next';
import { getCanonicalSiteUrl, indexableSitePaths } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalSiteUrl = getCanonicalSiteUrl();

  if (!canonicalSiteUrl) {
    return [];
  }

  return indexableSitePaths.map((path) => ({
    url: new URL(path, canonicalSiteUrl).toString(),
  }));
}
