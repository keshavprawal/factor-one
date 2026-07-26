import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const {
  getPublicContentValue,
  products,
} = require('../apps/web/.content-check/src/config/products.js');
const {
  productMediaManifest,
} = require('../apps/web/.content-check/src/config/product-media.js');
const {
  validateProductContent,
} = require('../apps/web/.content-check/src/content/product-content-validation.js');

const localMediaExists = (sourcePath) =>
  sourcePath === '/images/essentials/screen-protector.jpg';

test('draft content is structurally valid and exposes launch warnings', () => {
  const issues = validateProductContent(products, productMediaManifest, {
    mediaPathExists: localMediaExists,
    strict: false,
  });

  assert.equal(
    issues.some((issue) => issue.severity === 'error'),
    false,
  );
  assert.equal(
    issues.some((issue) => issue.code === 'DUPLICATE_PRIMARY_MEDIA'),
    true,
  );
  assert.equal(
    issues.some((issue) => issue.code === 'LAUNCH_FIELDS_PENDING'),
    true,
  );
});

test('duplicate product identity is rejected', () => {
  const duplicateProducts = [...structuredClone(products), products[0]];
  const issues = validateProductContent(
    duplicateProducts,
    productMediaManifest,
    {
      mediaPathExists: localMediaExists,
      strict: false,
    },
  );

  assert.equal(
    issues.some((issue) => issue.code === 'DUPLICATE_PRODUCT_ID'),
    true,
  );
  assert.equal(
    issues.some((issue) => issue.code === 'DUPLICATE_PRODUCT_SLUG'),
    true,
  );
});

test('missing alt text and absent media files are rejected', () => {
  const invalidMedia = structuredClone(productMediaManifest);

  invalidMedia[0].altText = '';
  invalidMedia[0].sourcePath = '/images/products/missing.jpg';

  const issues = validateProductContent(products, invalidMedia, {
    mediaPathExists: localMediaExists,
    strict: false,
  });

  assert.equal(
    issues.some((issue) => issue.code === 'MISSING_ALT_TEXT'),
    true,
  );
  assert.equal(
    issues.some((issue) => issue.code === 'MISSING_MEDIA_FILE'),
    true,
  );
});

test('unavailable products cannot be represented as purchasable', () => {
  const invalidProducts = structuredClone(products);

  invalidProducts[0].availability.purchasable = true;

  const issues = validateProductContent(invalidProducts, productMediaManifest, {
    mediaPathExists: localMediaExists,
    strict: false,
  });

  assert.equal(
    issues.some((issue) => issue.code === 'PURCHASE_STATE_MISMATCH'),
    true,
  );
  assert.equal(
    issues.some((issue) => issue.code === 'UNREADY_PRODUCT_PURCHASABLE'),
    true,
  );
});

test('approved SEO metadata must be complete', () => {
  const invalidProducts = structuredClone(products);

  invalidProducts[0].seo = {
    status: 'approved',
    value: { title: '', description: '' },
  };

  const issues = validateProductContent(invalidProducts, productMediaManifest, {
    mediaPathExists: localMediaExists,
    strict: false,
  });

  assert.equal(
    issues.some((issue) => issue.code === 'INVALID_SEO_METADATA'),
    true,
  );
});

test('pending fields cannot carry publishable values', () => {
  const invalidProducts = structuredClone(products);

  invalidProducts[0].fullDescription = {
    status: 'pending',
    value: 'This value has not been approved.',
  };

  const issues = validateProductContent(invalidProducts, productMediaManifest, {
    mediaPathExists: localMediaExists,
    strict: false,
  });

  assert.equal(
    issues.some((issue) => issue.code === 'CONTENT_STATE_MISMATCH'),
    true,
  );
  assert.equal(getPublicContentValue(invalidProducts[0].fullDescription), null);
});

test('approved content cannot be empty', () => {
  const invalidProducts = structuredClone(products);

  invalidProducts[0].fullDescription = {
    status: 'approved',
    value: '   ',
  };

  const issues = validateProductContent(invalidProducts, productMediaManifest, {
    mediaPathExists: localMediaExists,
    strict: false,
  });

  assert.equal(
    issues.some((issue) => issue.code === 'APPROVED_CONTENT_EMPTY'),
    true,
  );
});

test('final media requires approval and resolved rights', () => {
  const invalidMedia = structuredClone(productMediaManifest);

  invalidMedia[0].lifecycleStatus = 'final';

  const issues = validateProductContent(products, invalidMedia, {
    mediaPathExists: localMediaExists,
    strict: false,
  });

  assert.equal(
    issues.some((issue) => issue.code === 'FINAL_MEDIA_UNRESOLVED'),
    true,
  );
});

test('purchasable products require approved commercial and compatibility data', () => {
  const invalidProducts = structuredClone(products);

  invalidProducts[0].status = 'launch-ready';
  invalidProducts[0].availability = {
    approvalStatus: 'pending',
    label: 'Available',
    purchasable: true,
    state: 'available',
  };

  const issues = validateProductContent(invalidProducts, productMediaManifest, {
    mediaPathExists: localMediaExists,
    strict: false,
  });

  assert.equal(
    issues.some((issue) => issue.code === 'PURCHASABLE_CONTENT_INCOMPLETE'),
    true,
  );
});

test('strict launch validation ignores deliberately deferred products', () => {
  const deferredProduct = structuredClone(products[0]);
  deferredProduct.launchScope = 'deferred';
  const deferredMedia = productMediaManifest.filter(
    (media) => media.productId === deferredProduct.id,
  );

  const issues = validateProductContent([deferredProduct], deferredMedia, {
    mediaPathExists: localMediaExists,
    strict: true,
  });

  assert.deepEqual(issues, []);
});
