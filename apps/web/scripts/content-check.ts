import { existsSync } from 'node:fs';
import path from 'node:path';
import { productMediaManifest } from '../src/config/product-media';
import { products } from '../src/config/products';
import { validateProductContent } from '../src/content/product-content-validation';

const strict = process.argv.includes('--strict');
const publicDirectory = path.resolve(process.cwd(), 'public');
const issues = validateProductContent(products, productMediaManifest, {
  strict,
  mediaPathExists(sourcePath) {
    return existsSync(
      path.join(publicDirectory, sourcePath.replace(/^\/+/, '')),
    );
  },
});
const errors = issues.filter((issue) => issue.severity === 'error');
const warnings = issues.filter((issue) => issue.severity === 'warning');

for (const issue of issues) {
  const scope = issue.productId ? ` [${issue.productId}]` : '';
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
