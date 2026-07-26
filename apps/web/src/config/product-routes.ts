import type { ProductId } from './products';

export function getProductAnchor(id: ProductId) {
  return `#product-${id}` as const;
}

export function getProductHref(id: ProductId) {
  return `/${getProductAnchor(id)}` as const;
}
