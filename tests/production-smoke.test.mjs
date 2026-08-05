import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const webDirectory = path.join(repositoryRoot, 'apps', 'web');
const require = createRequire(import.meta.url);
const nextCli = require.resolve('next/dist/bin/next', {
  paths: [webDirectory],
});

async function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();

    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();

      if (!address || typeof address === 'string') {
        server.close();
        reject(new Error('Could not determine an available test port.'));
        return;
      }

      server.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(baseUrl, processOutput) {
  const deadline = Date.now() + 20_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);

      if (response.ok) {
        return;
      }
    } catch {
      // The production server may still be starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(
    `Production server did not start.\n${processOutput.join('')}`,
  );
}

test('production routes, crawl controls and security headers are ready', async () => {
  const port = await getAvailablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const processOutput = [];
  const server = spawn(
    process.execPath,
    [nextCli, 'start', '--hostname', '127.0.0.1', '--port', String(port)],
    {
      cwd: webDirectory,
      env: {
        ...process.env,
        NODE_ENV: 'production',
        SITE_INDEXING_ENABLED: 'false',
        SITE_URL: '',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  server.stdout.on('data', (chunk) => processOutput.push(chunk.toString()));
  server.stderr.on('data', (chunk) => processOutput.push(chunk.toString()));

  try {
    await waitForServer(baseUrl, processOutput);

    const homeResponse = await fetch(baseUrl);
    const home = await homeResponse.text();

    assert.equal(homeResponse.status, 200);
    assert.match(home, /<main[^>]+id="main-content"/);
    assert.match(home, /Accessories that belong on your car/);
    assert.match(home, /href="\/products\/screen-guard"/);
    assert.match(home, /name="robots" content="noindex, nofollow"/);
    assert.doesNotMatch(home, /rel="canonical"/);
    assert.doesNotMatch(home, /application\/ld\+json/);
    assert.equal(homeResponse.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(homeResponse.headers.get('x-frame-options'), 'DENY');
    assert.equal(
      homeResponse.headers.get('referrer-policy'),
      'strict-origin-when-cross-origin',
    );
    assert.match(
      homeResponse.headers.get('permissions-policy') ?? '',
      /payment=\(\)/,
    );
    assert.equal(homeResponse.headers.get('strict-transport-security'), null);
    assert.match(
      homeResponse.headers.get('content-security-policy') ?? '',
      /frame-ancestors 'none'/,
    );

    const vf7Response = await fetch(`${baseUrl}/vehicles/vf7`);
    const vf7 = await vf7Response.text();

    assert.equal(vf7Response.status, 200);
    assert.match(vf7, /<h1[^>]*>VF7<\/h1>/);

    const trailingSlashResponse = await fetch(`${baseUrl}/vehicles/vf7/`, {
      redirect: 'manual',
    });

    assert.equal(trailingSlashResponse.status, 308);
    assert.equal(
      trailingSlashResponse.headers.get('location'),
      '/vehicles/vf7',
    );

    const knowledgeResponse = await fetch(`${baseUrl}/knowledge?q=compat`);
    const knowledge = await knowledgeResponse.text();

    assert.equal(knowledgeResponse.status, 200);
    assert.match(knowledge, /Knowledge Centre/);
    assert.match(knowledge, /How to Read Compatibility Information/);
    assert.doesNotMatch(knowledge, /Preparing for Installation/);

    const articleResponse = await fetch(
      `${baseUrl}/knowledge/reading-compatibility-information`,
    );
    const article = await articleResponse.text();

    assert.equal(articleResponse.status, 200);
    assert.match(article, /Preview article/);
    assert.match(article, /noindex/);
    assert.doesNotMatch(article, /application\/ld\+json/);

    const garageResponse = await fetch(`${baseUrl}/garage`);
    const garage = await garageResponse.text();

    assert.equal(garageResponse.status, 200);
    assert.match(garage, /Your car, in one clear place/);
    assert.match(garage, /name="robots" content="noindex, nofollow"/);

    const compatibilityResponse = await fetch(`${baseUrl}/compatibility`);
    const compatibility = await compatibilityResponse.text();

    assert.equal(compatibilityResponse.status, 200);
    assert.match(compatibility, /Know what is listed for your car/);
    assert.match(compatibility, /Verification pending/);
    assert.match(compatibility, /href="\/garage"/);
    assert.match(compatibility, /href="\/products\/screen-guard"/);
    assert.match(compatibility, /name="robots" content="noindex, nofollow"/);
    assert.doesNotMatch(compatibility, /rel="canonical"/);

    const ownershipResponse = await fetch(`${baseUrl}/ownership`);
    const ownership = await ownershipResponse.text();

    assert.equal(ownershipResponse.status, 200);
    assert.match(ownership, /Clear support after you buy/);
    assert.match(ownership, /href="\/ownership\/warranty"/);
    assert.match(ownership, /name="robots" content="noindex, nofollow"/);

    for (const policySlug of [
      'warranty',
      'returns',
      'shipping',
      'installation',
      'contact',
      'privacy',
      'terms',
    ]) {
      const policyResponse = await fetch(`${baseUrl}/ownership/${policySlug}`);
      const policy = await policyResponse.text();

      assert.equal(policyResponse.status, 200);
      assert.match(policy, /Ownership/);
      assert.match(policy, /name="robots" content="noindex, nofollow"/);
      assert.doesNotMatch(policy, /rel="canonical"/);
      assert.doesNotMatch(policy, /application\/ld\+json/);
    }

    const warrantyResponse = await fetch(`${baseUrl}/ownership/warranty`);
    const warranty = await warrantyResponse.text();

    assert.match(warranty, /12-Month Limited Manufacturer Warranty/);
    assert.match(warranty, /Misuse, accidental damage or overloading/);

    for (const productSlug of [
      'screen-guard',
      'parcel-tray',
      'rear-door-mud-guard',
      'bumper-mud-guard',
      'door-visor',
    ]) {
      const productResponse = await fetch(`${baseUrl}/products/${productSlug}`);
      const product = await productResponse.text();

      assert.equal(productResponse.status, 200);
      assert.match(product, /Photography pending/);
      assert.match(product, /Verification pending/);
      assert.match(product, /href="\/compatibility"/);
      assert.match(product, /href="\/garage"/);
      assert.match(product, /Ownership policies/);
      assert.doesNotMatch(product, /12-Month Limited Manufacturer Warranty/);
      assert.match(product, /href="\/ownership\/returns"/);
      assert.match(product, /href="\/ownership\/shipping"/);
      assert.match(product, /href="\/ownership\/installation"/);
      assert.doesNotMatch(product, /Misuse, accidental damage or overloading/);
      assert.match(product, /name="robots" content="noindex, nofollow"/);
      assert.doesNotMatch(product, /rel="canonical"/);
      assert.doesNotMatch(product, /application\/ld\+json/);
    }

    const unknownProductResponse = await fetch(
      `${baseUrl}/products/not-a-product`,
    );
    const unknownProduct = await unknownProductResponse.text();

    assert.equal(unknownProductResponse.status, 404);
    assert.match(unknownProduct, /This page does not exist/);

    const unknownOwnershipResponse = await fetch(
      `${baseUrl}/ownership/not-a-policy`,
    );
    const unknownOwnership = await unknownOwnershipResponse.text();

    assert.equal(unknownOwnershipResponse.status, 404);
    assert.match(unknownOwnership, /This page does not exist/);

    const notFoundResponse = await fetch(`${baseUrl}/not-a-real-route`);
    const notFound = await notFoundResponse.text();

    assert.equal(notFoundResponse.status, 404);
    assert.match(notFound, /This page does not exist/);

    const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
    const robots = await robotsResponse.text();

    assert.equal(robotsResponse.status, 200);
    assert.match(robots, /Disallow: \//);
    assert.doesNotMatch(robots, /Sitemap:/);

    const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
    const sitemap = await sitemapResponse.text();

    assert.equal(sitemapResponse.status, 200);
    assert.doesNotMatch(sitemap, /<loc>/);
    assert.doesNotMatch(sitemap, /compatibility/);
    assert.doesNotMatch(sitemap, /preview\.example\.com/);
  } finally {
    server.kill('SIGTERM');
    await new Promise((resolve) => {
      server.once('exit', resolve);
      setTimeout(resolve, 2_000);
    });
  }
});
