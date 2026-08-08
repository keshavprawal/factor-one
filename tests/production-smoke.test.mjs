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
      'cancellation',
      'shipping',
      'installation',
      'contact',
      'privacy',
      'terms',
      'faq',
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

    assert.match(warranty, /Limited Warranty Policy/);
    assert.match(
      warranty,
      /This policy applies to Factor One products whose product page, packaging or order documentation states that a limited manufacturer warranty is included\./,
    );
    assert.match(
      warranty,
      /The VF7 Parcel Tray carries a 12-month limited manufacturer warranty from the date of delivery\./,
    );
    assert.doesNotMatch(
      warranty,
      /Factor One provides a limited manufacturer warranty for 12 months from delivery\./,
    );
    assert.match(warranty, /Accidental damage, misuse or excessive loading/);

    const faqResponse = await fetch(`${baseUrl}/ownership/faq`);
    const faq = await faqResponse.text();

    assert.match(faq, /Warranty coverage is product-specific/);
    assert.match(
      faq,
      /Check the relevant product page or order documentation for the warranty applicable to another product\./,
    );

    const returnsResponse = await fetch(`${baseUrl}/ownership/returns`);
    const returns = await returnsResponse.text();

    assert.match(returns, /within 7 calendar days of delivery/);
    assert.match(returns, /70% of the product price/);

    const shippingResponse = await fetch(`${baseUrl}/ownership/shipping`);
    const shipping = await shippingResponse.text();

    assert.match(shipping, /Free standard shipping on all orders/);
    assert.match(shipping, /Orders are prepaid only/);
    assert.match(shipping, /Cash on delivery is not available/);

    const contactResponse = await fetch(`${baseUrl}/ownership/contact`);
    const contact = await contactResponse.text();

    assert.match(contact, /mailto:contact@factorone\.in/);

    const parcelTrayResponse = await fetch(`${baseUrl}/products/parcel-tray`);
    const parcelTray = await parcelTrayResponse.text();

    assert.equal(parcelTrayResponse.status, 200);
    assert.match(
      parcelTray,
      /href="\/products\/parcel-tray"[^>]*>Parcel Tray<\/a>/,
    );
    assert.doesNotMatch(
      parcelTray,
      /href="\/products\/parcel-tray"[^>]*>VF7 Parcel Tray<\/a>/,
    );
    assert.match(parcelTray, /alt="Factor One logo"/);
    assert.match(parcelTray, /factor-one-logo-horizontal-transparent\.png/);
    assert.match(parcelTray, /VF7 Parcel Tray/);
    assert.match(parcelTray, /₹2,999/);
    assert.doesNotMatch(parcelTray, /₹2,999\.00/);
    assert.match(parcelTray, /Launching[\s\S]{0,100}15 August 2026/);
    assert.match(parcelTray, /Launch status: Launching 15 August 2026/);
    assert.match(parcelTray, /data-launch-status="true"/);
    assert.match(parcelTray, /data-compatibility-control="true"/);
    assert.equal(
      (parcelTray.match(/data-hero-control="matched"/g) ?? []).length,
      2,
    );
    assert.doesNotMatch(
      parcelTray,
      /data-launch-status="true"[^>]*(href=|tabindex=)/,
    );
    assert.doesNotMatch(parcelTray, /Made for your VF7\./);
    assert.doesNotMatch(parcelTray, /Installs without modifying the vehicle\./);
    assert.match(parcelTray, /VinFast VF7[^<]{0,20}2025 onwards/);
    assert.match(parcelTray, /Earth[^<]{0,20}Wind[^<]{0,20}Wind Infinity/);
    assert.match(parcelTray, /Extended Rear Coverage/);
    assert.match(parcelTray, /All VF7 Variants/);
    assert.match(parcelTray, /No Vehicle Modification/);
    assert.match(parcelTray, /12-Month Warranty/);
    assert.match(parcelTray, /Dynamic testing completed/);
    assert.match(parcelTray, /data-sticky-story="true"/);
    assert.equal(
      (parcelTray.match(/data-hero-product-information="true"/g) ?? []).length,
      1,
    );
    assert.doesNotMatch(parcelTray, /aria-label="Product context"/);
    assert.match(parcelTray, /data-story-state="problem"/);
    assert.match(parcelTray, /data-story-state="solution"/);
    assert.match(parcelTray, /The gap owners noticed/);
    assert.match(parcelTray, /Before/);
    assert.match(parcelTray, /Factory cargo area/);
    assert.match(parcelTray, /An open section remains behind the rear seats\./);
    assert.match(parcelTray, /Open gap behind rear seats/);
    assert.match(parcelTray, /The coverage Factor One added/);
    assert.match(parcelTray, /Factor One Parcel Tray/);
    assert.match(
      parcelTray,
      /Extended rear coverage creates a cleaner, more complete cargo area\./,
    );
    assert.ok(
      parcelTray.indexOf('The gap owners noticed.') <
        parcelTray.indexOf('Designed around the details.'),
    );
    assert.match(
      parcelTray,
      /<h2[^>]*id="features-heading"[^>]*>Designed around the details\.<\/h2>/,
    );
    assert.match(parcelTray, /data-image-led-features="true"/);
    assert.match(
      parcelTray,
      /data-image-led-features="true"[\s\S]*Built for everyday ownership\./,
    );
    assert.doesNotMatch(parcelTray, /id="lifestyle-heading"/);
    assert.doesNotMatch(parcelTray, /id="engineering-proof"/);
    assert.match(
      parcelTray,
      /The coverage Factor One added\.[\s\S]*VF7 scanned and modelled/,
    );
    assert.match(parcelTray, /data-engineering-handoff="true"/);
    assert.match(parcelTray, /data-sticky-solution-visual="true"/);
    assert.match(parcelTray, /data-engineering-proof="true"/);
    for (const featureHeading of [
      'Extended Rear Coverage',
      'OEM Fit',
      'Tailgate and Rear-Seat Clearance',
      'Rigorously Tested',
    ]) {
      assert.match(parcelTray, new RegExp(featureHeading));
    }
    assert.doesNotMatch(parcelTray, /Vehicle-Specific Alignment/);
    assert.doesNotMatch(parcelTray, /Easy to Remove/);
    assert.doesNotMatch(parcelTray, /data-warranty-emphasis="true"/);
    assert.doesNotMatch(parcelTray, /12-Month Factor One Warranty/);
    assert.match(parcelTray, /Questions, answered/);
    assert.match(parcelTray, /Product details/);
    assert.equal(
      (parcelTray.match(/id="specifications-heading"/g) ?? []).length,
      1,
    );
    assert.match(parcelTray, /data-product-details-experience="true"/);
    assert.match(parcelTray, /data-product-detail-media-stack="true"/);
    assert.doesNotMatch(parcelTray, /Product specifications/);
    assert.doesNotMatch(parcelTray, /<summary[^>]*>Compatibility</);
    assert.match(
      parcelTray,
      /<dt[^>]*>Compatibility<\/dt>[\s\S]*Earth[^<]{0,20}Wind Infinity/,
    );
    assert.match(
      parcelTray,
      /<dt[^>]*>Installation<\/dt>[\s\S]*Self-installation/,
    );
    assert.match(parcelTray, /View installation guidance/);
    assert.equal(
      (parcelTray.match(/>View installation guidance<\/a>/g) ?? []).length,
      1,
    );
    assert.match(
      parcelTray,
      /Care:<\/span>[\s\S]{0,20}Clean using a soft, damp cloth\./,
    );
    assert.doesNotMatch(parcelTray, /Position the tray/);
    assert.doesNotMatch(parcelTray, /Attach the two support strings/);
    assert.match(parcelTray, /Ownership, kept honest\./);
    assert.match(parcelTray, /href="\/ownership\/warranty"/);
    assert.match(parcelTray, /href="\/ownership">Ownership<\/a>/);
    assert.match(
      parcelTray,
      /href="https:\/\/www\.instagram\.com\/Factorone_\//,
    );
    assert.match(parcelTray, /mailto:contact@factorone\.in/);
    assert.match(parcelTray, /href="https:\/\/wa\.me\/919829292629"/);
    assert.match(parcelTray, /VinFast VF6/);
    assert.match(parcelTray, /aria-disabled="true"[^>]*>VinFast VF6<\/span>/);
    const footer = parcelTray.slice(parcelTray.indexOf('<footer'));
    assert.ok(
      footer.indexOf('Limited Warranty') < footer.indexOf('Order Cancellation'),
    );
    assert.ok(
      footer.indexOf('Order Cancellation') < footer.indexOf('Shipping'),
    );
    assert.ok(
      footer.indexOf('Shipping') < footer.indexOf('Returns &amp; Refunds'),
    );
    assert.match(parcelTray, /By VinFast owners, for VinFast owners\./);
    assert.doesNotMatch(
      footer,
      /Accessories for VinFast owners, shaped by the people who drive them/,
    );
    for (const group of ['Explore', 'Factor One', 'Ownership', 'Legal']) {
      assert.match(footer, new RegExp(`>${group}<`));
    }
    assert.ok(
      parcelTray.indexOf('Ownership, kept honest.') <
        parcelTray.indexOf('Questions, answered.'),
    );
    assert.ok((parcelTray.match(/<footer\b/g) ?? []).length === 1);
    assert.match(parcelTray, /<footer[^>]*min-h-\[100svh\]/);
    assert.match(
      parcelTray,
      /data-footer-ending="true"[^>]*>[\s\S]*<span>Factor<\/span>[\s\S]*<span>One<\/span>[\s\S]*<\/p>\s*<\/footer>/,
    );
    assert.equal(
      (parcelTray.match(/data-footer-ending="true"/g) ?? []).length,
      1,
    );
    assert.match(parcelTray, /Does installation require drilling/);
    assert.match(parcelTray, /Representative visualisation/);
    assert.match(parcelTray, /Prototype shown[^<]{0,50}Development evidence/);
    assert.match(parcelTray, /Development evidence · Prototype photography/);
    assert.match(
      parcelTray,
      /Prototype installed during product development\./,
    );
    assert.match(
      parcelTray,
      /Care:<\/span>[\s\S]{0,20}Clean using a soft, damp cloth\./,
    );
    assert.match(parcelTray, /parcel-tray-temporary-hero\.png/);
    assert.match(parcelTray, /data-gallery-image-loaded="false"/);
    assert.match(parcelTray, /parcel-tray-temporary-lifestyle\.png/);
    assert.match(parcelTray, /parcel-tray-prototype-installed\.jpg/);
    assert.doesNotMatch(
      parcelTray,
      /DENSE CARPETING|SOUND DAMPENING|FULL LOAD PRIVACY/,
    );
    assert.doesNotMatch(parcelTray, /Dimensions/);
    assert.doesNotMatch(parcelTray, />Overview</);
    assert.doesNotMatch(parcelTray, />The Problem</);
    assert.doesNotMatch(parcelTray, /noise dampening/i);
    assert.doesNotMatch(parcelTray, /load capacity/i);
    assert.match(parcelTray, /name="robots" content="noindex, nofollow"/);
    assert.doesNotMatch(parcelTray, /application\/ld\+json/);

    for (const productSlug of [
      'screen-guard',
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
