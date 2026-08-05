import type { MetadataRoute } from 'next';
import { getIndexableProductPaths } from '@/config/product-pages';
import { getCanonicalSiteUrl, indexableSitePaths } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalSiteUrl = getCanonicalSiteUrl();

  if (!canonicalSiteUrl) {
    return [];
  }

  return [...indexableSitePaths, ...getIndexableProductPaths()].map((path) => ({
    url: new URL(path, canonicalSiteUrl).toString(),
  }));
}
