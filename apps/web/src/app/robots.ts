import type { MetadataRoute } from 'next';
import { getCanonicalSiteUrl } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const canonicalSiteUrl = getCanonicalSiteUrl();

  if (!canonicalSiteUrl) {
    return {
      rules: {
        disallow: '/',
        userAgent: '*',
      },
    };
  }

  return {
    rules: {
      allow: '/',
      userAgent: '*',
    },
    sitemap: new URL('/sitemap.xml', canonicalSiteUrl).toString(),
  };
}
