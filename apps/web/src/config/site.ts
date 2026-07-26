export const siteConfig = {
  description:
    'Thoughtfully designed accessories for VinFast owners, built with owners.',
  name: 'Factor One',
} as const;

interface DeploymentEnvironment {
  readonly [key: string]: string | undefined;
}

export function isIndexingEnabled(
  environment: DeploymentEnvironment = process.env,
) {
  const configuredValue = environment.SITE_INDEXING_ENABLED?.trim();

  if (!configuredValue || configuredValue === 'false') {
    return false;
  }

  if (configuredValue === 'true') {
    return true;
  }

  throw new Error(
    'SITE_INDEXING_ENABLED must be either "true" or "false" when provided.',
  );
}

export function getConfiguredSiteUrl(
  environment: DeploymentEnvironment = process.env,
) {
  const configuredUrl = environment.SITE_URL?.trim();

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
      'SITE_URL must be an origin without credentials, a path, a query, or a fragment.',
    );
  }

  return siteUrl;
}

function isLocalOrigin(siteUrl: URL) {
  const hostname = siteUrl.hostname.toLowerCase().replace(/\.$/, '');

  return (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname === '0.0.0.0' ||
    hostname === '::1' ||
    hostname === '[::1]' ||
    /^127(?:\.\d{1,3}){3}$/.test(hostname)
  );
}

export function getCanonicalSiteUrl(
  environment: DeploymentEnvironment = process.env,
) {
  const indexingEnabled = isIndexingEnabled(environment);
  const siteUrl = getConfiguredSiteUrl(environment);

  if (!indexingEnabled) {
    return null;
  }

  if (!siteUrl) {
    throw new Error(
      'SITE_URL is required when SITE_INDEXING_ENABLED is set to "true".',
    );
  }

  if (siteUrl.protocol !== 'https:') {
    throw new Error(
      'SITE_URL must use HTTPS when SITE_INDEXING_ENABLED is set to "true".',
    );
  }

  if (isLocalOrigin(siteUrl)) {
    throw new Error(
      'SITE_URL cannot use localhost or a loopback origin when SITE_INDEXING_ENABLED is set to "true".',
    );
  }

  return siteUrl;
}
