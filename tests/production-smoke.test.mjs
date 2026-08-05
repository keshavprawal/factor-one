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
    assert.equal(homeResponse.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(homeResponse.headers.get('x-frame-options'), 'DENY');
    assert.match(
      homeResponse.headers.get('content-security-policy') ?? '',
      /frame-ancestors 'none'/,
    );

    const vf7Response = await fetch(`${baseUrl}/vehicles/vf7`);
    const vf7 = await vf7Response.text();

    assert.equal(vf7Response.status, 200);
    assert.match(vf7, /<h1[^>]*>VF7<\/h1>/);

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
    assert.match(article, /BreadcrumbList/);
    assert.match(article, /noindex/);

    const notFoundResponse = await fetch(`${baseUrl}/not-a-real-route`);
    const notFound = await notFoundResponse.text();

    assert.equal(notFoundResponse.status, 404);
    assert.match(notFound, /This page does not exist/);

    const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
    const robots = await robotsResponse.text();

    assert.equal(robotsResponse.status, 200);
    assert.match(robots, /Disallow: \//);

    const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
    const sitemap = await sitemapResponse.text();

    assert.equal(sitemapResponse.status, 200);
    assert.doesNotMatch(sitemap, /localhost|127\.0\.0\.1/);
  } finally {
    server.kill('SIGTERM');
    await new Promise((resolve) => {
      server.once('exit', resolve);
      setTimeout(resolve, 2_000);
    });
  }
});
