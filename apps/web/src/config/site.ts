export const siteConfig = {
  description:
    'Thoughtfully designed accessories for VinFast owners, built with owners.',
  name: 'Factor One',
} as const;

interface DeploymentEnvironment {
  readonly [key: string]: string | undefined;
}

function readIndexingEnabled(environment: DeploymentEnvironment) {
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

function readConfiguredSiteUrl(environment: DeploymentEnvironment) {
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
      'SITE_URL must be an origin without credentials or a path.',
    );
  }

  return siteUrl;
}

export function getSiteUrl(environment: DeploymentEnvironment = process.env) {
  const indexingEnabled = readIndexingEnabled(environment);
  const siteUrl = readConfiguredSiteUrl(environment);

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

  return siteUrl;
}
