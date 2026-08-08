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
  getProductDetailMediaItem,
  getProductMediaItem,
  productMediaManifest,
} = require('../apps/web/.content-check/src/config/product-media.js');
const {
  getApprovedProductMedia,
  getIndexableProductPaths,
  getProductBySlug,
  getProductCanonicalPath,
  getProductPageContent,
  getProductStructuredData,
  getProductWarrantySummary,
  getRelatedProducts,
  isApprovedProductMedia,
  isProductPageIndexable,
} = require('../apps/web/.content-check/src/config/product-pages.js');
const {
  getProductHref,
  getProductPath,
} = require('../apps/web/.content-check/src/config/product-routes.js');
const {
  getProductPageReferencePresentation,
} = require('../apps/web/.content-check/src/config/product-page-reference.js');
const {
  compatibilityNavigation,
  companyNavigation,
  footerNavigation,
  garageNavigation,
  ownershipNavigation,
  productNavigation,
} = require('../apps/web/.content-check/src/config/navigation.js');
const {
  getIndexableOwnershipPolicyPaths,
  getOwnershipPolicy,
  getOwnershipPolicyPath,
  isOwnershipPolicyIndexable,
  ownershipPolicies,
} = require('../apps/web/.content-check/src/config/ownership.js');
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
  validateOwnershipContent,
} = require('../apps/web/.content-check/src/content/ownership-content-validation.js');
const {
  createEmptyGarageState,
  parseGarageState,
  serializeGarageState,
} = require('../apps/web/.content-check/src/features/garage/garage-state.js');

const localMediaExists = (sourcePath) =>
  [
    '/images/essentials/screen-protector.jpg',
    '/images/products/parcel-tray/parcel-tray-temporary-hero.png',
    '/images/products/parcel-tray/parcel-tray-temporary-lifestyle.png',
    '/images/products/parcel-tray/parcel-tray-prototype-installed.jpg',
  ].includes(sourcePath);

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

test('canonical product routes resolve from the Product Bible', () => {
  assert.deepEqual(
    products.map((product) => getProductBySlug(product.slug)?.id),
    products.map((product) => product.id),
  );
  assert.equal(getProductBySlug('not-a-product'), null);
  assert.equal(getProductPath('screen-guard'), '/products/screen-guard');
  assert.equal(getProductHref('screen-guard'), '/products/screen-guard');
  assert.equal(getProductCanonicalPath(products[0]), '/products/screen-guard');
});

test('product page projections hide draft and pending fields', () => {
  const content = getProductPageContent(products[0]);

  assert.equal(content.shortDescription, null);
  assert.equal(content.problemSolved, null);
  assert.equal(content.fullDescription, null);
  assert.equal(content.price, null);
  assert.equal(content.warranty, null);
});

test('product warranty summaries require approved canonical content', () => {
  const approvedProduct = structuredClone(products[0]);
  approvedProduct.warranty = {
    status: 'approved',
    value: {
      durationMonths: 12,
      summary: 'Covered against approved manufacturing defects.',
    },
  };

  assert.deepEqual(getProductWarrantySummary(approvedProduct), {
    heading: '12-Month Limited Manufacturer Warranty',
    summary: 'Covered against approved manufacturing defects.',
  });

  const pendingProduct = structuredClone(approvedProduct);
  pendingProduct.warranty = { status: 'pending', value: null };
  assert.equal(getProductWarrantySummary(pendingProduct), null);

  const draftProduct = structuredClone(approvedProduct);
  draftProduct.warranty = {
    status: 'draft',
    value: {
      durationMonths: 12,
      summary: 'Draft warranty content.',
    },
  };
  assert.equal(getProductWarrantySummary(draftProduct), null);
});

test('Parcel Tray projects its approved 12-month warranty without affecting other products', () => {
  const parcelTray = products.find((product) => product.id === 'parcel-tray');

  assert.ok(parcelTray);
  assert.deepEqual(getProductWarrantySummary(parcelTray), {
    heading: '12-Month Limited Manufacturer Warranty',
    summary:
      'Covered against manufacturing defects in materials or workmanship for 12 months from delivery.',
  });
  assert.equal(getProductWarrantySummary(products[0]), null);
});

test('the Parcel Tray reference presentation is explicit and stays separate from product identity', () => {
  const presentation = getProductPageReferencePresentation('parcel-tray');

  assert.ok(presentation);
  assert.equal(
    presentation.heroValueStatement,
    'Extended coverage behind the rear seats, designed specifically for the VinFast VF7.',
  );
  assert.deepEqual(
    presentation.featureStory.map((feature) => feature.title),
    [
      'Extended Rear Coverage',
      'OEM Fit',
      'Tailgate and Rear-Seat Clearance',
      'Rigorously Tested',
    ],
  );
  assert.equal('installationSteps' in presentation, false);
  assert.equal(presentation.faqs.length, 8);
  assert.equal(getProductPageReferencePresentation('screen-guard'), null);
});

test('product navigation uses the product-family label without changing canonical identity', () => {
  assert.equal(productNavigation[0].label, 'Parcel Tray');
  assert.equal(
    products.find((product) => product.id === 'parcel-tray')?.name,
    'VF7 Parcel Tray',
  );
});

test('the VF7 Parcel Tray uses approved canonical content and verified compatibility', () => {
  const parcelTray = products.find((product) => product.id === 'parcel-tray');

  assert.ok(parcelTray);
  assert.equal(parcelTray.name, 'VF7 Parcel Tray');
  assert.equal(parcelTray.internalCode, 'FO-VF7-PT-001');
  assert.equal(parcelTray.category, 'cargo-storage');
  assert.deepEqual(getPublicContentValue(parcelTray.price), {
    amountMinor: 299900,
    currency: 'INR',
  });
  assert.deepEqual(getPublicContentValue(parcelTray.launchDate), {
    date: '2026-08-15',
    label: '15 August 2026',
  });
  assert.equal(parcelTray.availability.purchasable, false);
  assert.equal(
    parcelTray.vehicleCompatibility[0]?.verificationStatus,
    'verified',
  );
  assert.equal(parcelTray.vehicleCompatibility[0]?.yearStart, 2025);
  assert.deepEqual(parcelTray.vehicleCompatibility[0]?.variants, [
    'Earth',
    'Wind',
    'Wind Infinity',
    'Sky',
    'Sky Infinity',
  ]);
  assert.equal(parcelTray.vehicleCompatibility[0]?.evidence?.length, 5);
  assert.equal('dimensions' in parcelTray, false);

  const publicContent = JSON.stringify(getProductPageContent(parcelTray));
  for (const prohibitedClaim of [
    'noise dampening',
    'acoustic',
    'load capacity',
    'impact resistance',
    'UV resistance',
    'security',
    'perfect fit',
    'OEM mounting',
    'laser scanned',
  ]) {
    assert.doesNotMatch(
      publicContent.toLowerCase(),
      new RegExp(prohibitedClaim),
    );
  }
});

test('product pages use only approved media and remain non-indexable until launch-ready', () => {
  const approvedTemporaryMedia = {
    ...productMediaManifest[0],
    approvalStatus: 'approved',
    lifecycleStatus: 'temporary',
    rightsStatus: 'owned',
  };

  assert.equal(isApprovedProductMedia(approvedTemporaryMedia), true);
  assert.deepEqual(getApprovedProductMedia('screen-guard'), []);
  assert.equal(isProductPageIndexable(products[0]), false);
  assert.deepEqual(getIndexableProductPaths(), []);
  assert.equal(
    getProductStructuredData(products[0], new URL('https://example.com')),
    null,
  );
});

test('Parcel Tray media uses approved temporary visuals and disclosed prototype evidence', () => {
  const parcelTrayDetail = getProductDetailMediaItem('parcel-tray');
  const parcelTrayEvidence = productMediaManifest.filter(
    (media) => media.productId === 'parcel-tray' && media.evidenceOnly === true,
  );

  assert.equal(parcelTrayDetail.mediaId, 'parcel-tray-temporary-hero');
  assert.equal(parcelTrayDetail.disclosure, 'Representative visualisation');
  assert.equal(
    parcelTrayDetail.desktopImage,
    '/images/products/parcel-tray/parcel-tray-temporary-hero.png',
  );
  assert.deepEqual(
    parcelTrayEvidence.map((media) => media.lifecycleStatus),
    ['temporary'],
  );
  assert.equal(parcelTrayEvidence[0]?.id, 'parcel-tray-prototype-installed');
  assert.equal(
    parcelTrayEvidence[0]?.sourcePath,
    '/images/products/parcel-tray/parcel-tray-prototype-installed.jpg',
  );
  assert.equal(
    parcelTrayEvidence[0]?.caption,
    'Prototype installed during product development.',
  );
  assert.equal(
    parcelTrayEvidence[0]?.disclosure,
    'Development evidence · Prototype photography',
  );
  assert.equal(
    getApprovedProductMedia('parcel-tray', 'product-gallery').length,
    2,
  );
  assert.equal(
    getApprovedProductMedia('parcel-tray', 'product-gallery').some(
      (media) => media.id === 'parcel-tray-temporary-lifestyle',
    ),
    true,
  );
  assert.equal(
    productMediaManifest.some((media) => media.id.includes('infographic')),
    false,
  );
  assert.equal(
    getProductPageContent(
      products.find((product) => product.id === 'parcel-tray'),
    ).careInstructions,
    'Clean using a soft, damp cloth. Use a mild automotive interior cleaner only when required. Avoid abrasive pads, harsh chemicals and strong solvents. Dry before reinstalling, and inspect the support strings periodically for wear or damage.',
  );
  assert.equal(
    parcelTrayEvidence.some(
      (media) => media.rightsStatus === 'user-confirmed-commercial-use',
    ),
    false,
  );
  assert.equal(
    productMediaManifest.some(
      (media) =>
        media.id === 'parcel-tray-temporary-hero' &&
        media.rightsStatus === 'user-confirmed-commercial-use',
    ),
    true,
  );
});

test('related product pages follow explicit canonical relationships only', () => {
  const productWithRelations = structuredClone(products[0]);
  productWithRelations.relatedProductIds = ['parcel-tray', 'door-visor'];

  assert.deepEqual(
    getRelatedProducts(productWithRelations).map((product) => product.slug),
    ['parcel-tray', 'door-visor'],
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
    compatibilityVehicles[0].products.find(
      (product) => product.id === 'parcel-tray',
    )?.status,
    'verified',
  );
  assert.equal(
    compatibilityVehicles[0].products.some(
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

test('ownership policies are repository-driven and provisional policies stay non-indexable', () => {
  const warranty = getOwnershipPolicy('warranty');
  const privacy = getOwnershipPolicy('privacy');

  assert.ok(warranty);
  assert.ok(privacy);
  assert.equal(warranty.publicationStatus, 'approved');
  assert.equal(privacy.publicationStatus, 'provisional');
  assert.equal(getOwnershipPolicy('not-a-policy'), null);
  assert.equal(getOwnershipPolicyPath(warranty), '/ownership/warranty');
  assert.equal(isOwnershipPolicyIndexable(privacy), false);
  assert.deepEqual(getIndexableOwnershipPolicyPaths(), [
    '/ownership/warranty',
    '/ownership/returns',
    '/ownership/cancellation',
    '/ownership/shipping',
    '/ownership/installation',
    '/ownership/contact',
    '/ownership/faq',
  ]);
  assert.deepEqual(validateOwnershipContent(ownershipPolicies), []);
});

test('warranty policy and FAQ describe product-specific coverage', () => {
  const warranty = getOwnershipPolicy('warranty');
  const faq = getOwnershipPolicy('faq');

  assert.ok(warranty);
  assert.ok(faq);

  const warrantyText = JSON.stringify(warranty);
  const faqText = JSON.stringify(faq);

  assert.match(
    warrantyText,
    /This policy applies to Factor One products whose product page, packaging or order documentation states that a limited manufacturer warranty is included\./,
  );
  assert.match(
    warrantyText,
    /The applicable warranty duration is the duration stated for that product\./,
  );
  assert.match(
    warrantyText,
    /The VF7 Parcel Tray carries a 12-month limited manufacturer warranty from the date of delivery\./,
  );
  assert.doesNotMatch(
    warrantyText,
    /Factor One provides a limited manufacturer warranty for 12 months from delivery\./,
  );
  assert.match(
    faqText,
    /Warranty coverage is product-specific\. The VF7 Parcel Tray carries a 12-month limited manufacturer warranty\./,
  );
  assert.match(
    faqText,
    /Check the relevant product page or order documentation for the warranty applicable to another product\./,
  );
});

test('ownership navigation stays centralized across the header and footer', () => {
  assert.deepEqual(ownershipNavigation, {
    href: '/ownership',
    id: 'ownership',
    label: 'Ownership',
  });
  assert.equal(companyNavigation.includes(ownershipNavigation), true);

  const ownershipFooterGroup = footerNavigation.find(
    (group) => group.label === 'Ownership',
  );

  assert.ok(ownershipFooterGroup);
  assert.deepEqual(
    ownershipFooterGroup.items.map((item) => item.href),
    [
      '/ownership/warranty',
      '/ownership/cancellation',
      '/ownership/shipping',
      '/ownership/returns',
      '/ownership/installation',
      '/ownership/contact',
      '/ownership/faq',
    ],
  );

  const legalFooterGroup = footerNavigation.find(
    (group) => group.label === 'Legal',
  );

  assert.ok(legalFooterGroup);
  assert.deepEqual(
    legalFooterGroup.items.map((item) => item.href),
    ['/ownership/privacy', '/ownership/terms'],
  );
});
