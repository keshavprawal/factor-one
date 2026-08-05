import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const {
  getPublicContentValue,
  products,
} = require('../apps/web/.content-check/src/config/products.js');
const {
  compatibilityGarageHref,
  compatibilityVehicles,
  createCompatibilityProducts,
  getCompatibilityVehicle,
  getProductCompatibilityStatus,
} = require('../apps/web/.content-check/src/config/compatibility.js');
const {
  getArticleReadingTime,
  getKnowledgeArticle,
  getRelatedKnowledgeArticles,
  knowledgeArticles,
  knowledgeCategories,
  searchKnowledgeArticles,
} = require('../apps/web/.content-check/src/config/knowledge.js');
const {
  getProductMediaItem,
  productMediaManifest,
} = require('../apps/web/.content-check/src/config/product-media.js');
const {
  compatibilityNavigation,
  garageNavigation,
} = require('../apps/web/.content-check/src/config/navigation.js');
const {
  indexableSitePaths,
} = require('../apps/web/.content-check/src/config/site.js');
const {
  validateProductContent,
} = require('../apps/web/.content-check/src/content/product-content-validation.js');
const {
  validateKnowledgeContent,
} = require('../apps/web/.content-check/src/content/knowledge-content-validation.js');
const {
  createEmptyGarageState,
  parseGarageState,
  serializeGarageState,
} = require('../apps/web/.content-check/src/features/garage/garage-state.js');

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

test('public projections expose approved content only', () => {
  assert.equal(getPublicContentValue({ status: 'pending', value: null }), null);
  assert.equal(
    getPublicContentValue({
      status: 'draft',
      value: 'Working copy awaiting approval.',
    }),
    null,
  );
  assert.equal(
    getPublicContentValue({
      status: 'approved',
      value: 'Founder-approved public copy.',
    }),
    'Founder-approved public copy.',
  );
});

test('garage state accepts only repository-supported identities', () => {
  const scope = {
    productIds: ['screen-guard', 'parcel-tray'],
    vehicleIds: ['vinfast-vf7'],
  };
  const state = parseGarageState(
    JSON.stringify({
      installedProductIds: ['screen-guard', 'screen-guard', 'unknown-product'],
      selectedVehicleId: 'vinfast-vf7',
      version: 1,
    }),
    scope,
  );

  assert.deepEqual(state, {
    installedProductIds: ['screen-guard'],
    selectedVehicleId: 'vinfast-vf7',
    version: 1,
  });
  assert.deepEqual(parseGarageState(serializeGarageState(state), scope), state);
});

test('garage navigation exposes the implemented route and keeps assistance unavailable', () => {
  assert.deepEqual(garageNavigation.children, [
    { href: '/garage', id: 'garage-home', label: 'My Garage' },
    { id: 'assistance', label: 'Assistance', unavailable: true },
  ]);
});

test('garage state fails safely when local data is invalid', () => {
  const scope = {
    productIds: ['screen-guard'],
    vehicleIds: ['vinfast-vf7'],
  };

  assert.deepEqual(parseGarageState('{not-json', scope), {
    installedProductIds: [],
    selectedVehicleId: null,
    version: 1,
  });
  assert.deepEqual(
    parseGarageState(
      JSON.stringify({
        installedProductIds: ['screen-guard'],
        selectedVehicleId: 'unknown-car',
        version: 1,
      }),
      scope,
    ),
    createEmptyGarageState(),
  );
});

test('compatibility projections distinguish verified, pending and not-listed states', () => {
  const pendingProduct = structuredClone(products[0]);
  const verifiedProduct = structuredClone(products[0]);
  const notListedProduct = structuredClone(products[0]);

  verifiedProduct.vehicleCompatibility[0].verificationStatus = 'verified';
  notListedProduct.vehicleCompatibility = [];

  assert.equal(
    getProductCompatibilityStatus(pendingProduct, 'vinfast-vf7'),
    'pending',
  );
  assert.equal(
    getProductCompatibilityStatus(verifiedProduct, 'vinfast-vf7'),
    'verified',
  );
  assert.equal(
    getProductCompatibilityStatus(notListedProduct, 'vinfast-vf7'),
    'not-listed',
  );
});

test('compatibility results derive every product from the canonical registry', () => {
  const results = createCompatibilityProducts(products, 'vinfast-vf7');

  assert.deepEqual(
    results.map((product) => product.id),
    products.map((product) => product.id),
  );
  assert.equal(
    compatibilityVehicles[0].products.every(
      (product) => product.status === 'pending',
    ),
    true,
  );
});

test('compatibility rejects unsupported vehicle identity and links to My Garage', () => {
  assert.equal(getCompatibilityVehicle('vinfast-vf6'), null);
  assert.equal(getCompatibilityVehicle('../vinfast-vf7'), null);
  assert.equal(compatibilityGarageHref, '/garage');
});

test('compatibility navigation and canonical sitemap path are centralized', () => {
  assert.deepEqual(compatibilityNavigation, {
    href: '/compatibility',
    id: 'compatibility',
    label: 'Vehicle Compatibility',
  });
  assert.equal(indexableSitePaths.includes('/compatibility'), true);
});

test('product presentation omits unapproved draft copy', () => {
  const product = getProductMediaItem('screen-guard', 'homepage-featured');

  assert.equal(product.purpose, undefined);
  assert.equal(product.availability, 'Product direction');
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

test('repository knowledge content is structurally valid', () => {
  const issues = validateKnowledgeContent(
    knowledgeArticles,
    knowledgeCategories.map((category) => category.id),
  );

  assert.deepEqual(issues, []);
});

test('knowledge search supports partial queries and category filters', () => {
  assert.deepEqual(
    searchKnowledgeArticles({ query: 'compat' }).map((article) => article.slug),
    ['reading-compatibility-information', 'confirming-product-fit'],
  );
  assert.deepEqual(
    searchKnowledgeArticles({ categoryId: 'installation' }).map(
      (article) => article.slug,
    ),
    ['preparing-for-installation'],
  );
});

test('knowledge articles provide reading time and related content', () => {
  const article = getKnowledgeArticle('reading-compatibility-information');

  assert.ok(article);
  assert.equal(getArticleReadingTime(article), 1);
  assert.equal(getRelatedKnowledgeArticles(article).length, 2);
  assert.equal(
    getRelatedKnowledgeArticles(article)[0].categoryId,
    article.categoryId,
  );
});
