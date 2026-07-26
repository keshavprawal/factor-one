import type { ProductId } from './products';

export function getProductElementId(id: ProductId) {
  return `product-${id}` as const;
}

export function getProductAnchor(id: ProductId) {
  return `#${getProductElementId(id)}` as const;
}

export function getProductHref(id: ProductId) {
  return `/${getProductAnchor(id)}` as const;
}
