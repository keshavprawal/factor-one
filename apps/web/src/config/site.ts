export const siteConfig = {
  description:
    'Thoughtfully designed accessories for VinFast owners, built with owners.',
  name: 'Factor One',
} as const;

export function getSiteUrl() {
  const configuredUrl = process.env.SITE_URL?.trim();

  if (!configuredUrl) {
    return null;
  }

  const siteUrl = new URL(configuredUrl);

  if (!['http:', 'https:'].includes(siteUrl.protocol)) {
    throw new Error('SITE_URL must use the http or https protocol.');
  }

  if (
    siteUrl.username ||
    siteUrl.password ||
    siteUrl.search ||
    siteUrl.hash ||
    siteUrl.pathname !== '/'
  ) {
    throw new Error(
      'SITE_URL must be an origin without credentials or a path.',
    );
  }

  return siteUrl;
}
