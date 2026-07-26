import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const { getSiteUrl } = require('../apps/web/.content-check/src/config/site.js');
const {
  onRequestError,
} = require('../apps/web/.content-check/src/instrumentation.js');

test('preview deployments remain non-indexable even when an origin is present', () => {
  const siteUrl = getSiteUrl({
    SITE_INDEXING_ENABLED: 'false',
    SITE_URL: 'https://preview.example.com',
  });

  assert.equal(siteUrl, null);
});

test('public indexing requires an approved HTTPS origin', () => {
  assert.throws(
    () =>
      getSiteUrl({
        SITE_INDEXING_ENABLED: 'true',
        SITE_URL: undefined,
      }),
    /SITE_URL is required/,
  );

  assert.throws(
    () =>
      getSiteUrl({
        SITE_INDEXING_ENABLED: 'true',
        SITE_URL: 'http://example.com',
      }),
    /must use HTTPS/,
  );
});

test('deployment configuration rejects ambiguous values', () => {
  assert.throws(
    () =>
      getSiteUrl({
        SITE_INDEXING_ENABLED: 'yes',
        SITE_URL: 'https://example.com',
      }),
    /must be either "true" or "false"/,
  );

  assert.throws(
    () =>
      getSiteUrl({
        SITE_INDEXING_ENABLED: 'false',
        SITE_URL: 'https://example.com/path',
      }),
    /must be an origin/,
  );
});

test('approved indexing resolves the single canonical origin', () => {
  const siteUrl = getSiteUrl({
    SITE_INDEXING_ENABLED: 'true',
    SITE_URL: 'https://example.com',
  });

  assert.equal(siteUrl?.toString(), 'https://example.com/');
});

test('server error events exclude sensitive request and error details', () => {
  const output = [];
  const originalConsoleError = console.error;

  console.error = (message) => output.push(message);

  try {
    onRequestError(
      Object.assign(new Error('customer@example.com'), {
        digest: 'safe-digest',
      }),
      {
        headers: { authorization: 'Bearer secret' },
        method: 'GET',
        path: '/account?token=secret',
      },
      {
        renderSource: 'server-rendering',
        renderType: 'dynamic',
        revalidateReason: undefined,
        routePath: '/account',
        routeType: 'render',
        routerKind: 'App Router',
      },
    );
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(output.length, 1);
  assert.match(output[0], /"event":"request_error"/);
  assert.match(output[0], /"digest":"safe-digest"/);
  assert.doesNotMatch(
    output[0],
    /customer@example\.com|Bearer secret|token=secret/,
  );
});
