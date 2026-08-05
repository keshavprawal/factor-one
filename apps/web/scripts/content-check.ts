import { existsSync } from 'node:fs';
import path from 'node:path';
import {
  knowledgeArticles,
  knowledgeCategories,
} from '../src/config/knowledge';
import { ownershipPolicies } from '../src/config/ownership';
import { productMediaManifest } from '../src/config/product-media';
import { products } from '../src/config/products';
import { validateKnowledgeContent } from '../src/content/knowledge-content-validation';
import { validateOwnershipContent } from '../src/content/ownership-content-validation';
import { validateProductContent } from '../src/content/product-content-validation';

const strict = process.argv.includes('--strict');
const publicDirectory = path.resolve(process.cwd(), 'public');
const productIssues = validateProductContent(products, productMediaManifest, {
  strict,
  mediaPathExists(sourcePath) {
    return existsSync(
      path.join(publicDirectory, sourcePath.replace(/^\/+/, '')),
    );
  },
});
const knowledgeIssues = validateKnowledgeContent(
  knowledgeArticles,
  knowledgeCategories.map((category) => category.id),
);
const ownershipIssues = validateOwnershipContent(ownershipPolicies);
const issues = [...productIssues, ...knowledgeIssues, ...ownershipIssues];
const errors = issues.filter((issue) => issue.severity === 'error');
const warnings = issues.filter((issue) => issue.severity === 'warning');

for (const issue of issues) {
  const scope =
    'productId' in issue && issue.productId
      ? ` [${issue.productId}]`
      : 'articleSlug' in issue && issue.articleSlug
        ? ` [${issue.articleSlug}]`
        : '';
  console.log(
    `${issue.severity.toUpperCase()} ${issue.code}${scope}: ${issue.message}`,
  );
}

console.log(
  `Content check completed with ${errors.length} error(s) and ${warnings.length} launch warning(s).`,
);

if (errors.length > 0) {
  process.exitCode = 1;
} else if (strict) {
  console.log('Strict launch content validation passed.');
} else {
  console.log(
    'Structural content validation passed. Run with --strict to enforce launch completeness.',
  );
}
