import type { MetadataRoute } from 'next';
import { getIndexableOwnershipPolicyPaths } from '@/config/ownership';
import { getIndexableProductPaths } from '@/config/product-pages';
import { getCanonicalSiteUrl, indexableSitePaths } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalSiteUrl = getCanonicalSiteUrl();

  if (!canonicalSiteUrl) {
    return [];
  }

  return [
    ...indexableSitePaths,
    '/ownership',
    ...getIndexableOwnershipPolicyPaths(),
    ...getIndexableProductPaths(),
  ].map((path) => ({
    url: new URL(path, canonicalSiteUrl).toString(),
  }));
}
