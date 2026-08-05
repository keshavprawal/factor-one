import { getProduct, type ProductId } from './products';

export function getProductElementId(id: ProductId) {
  return `product-${id}` as const;
}

export function getProductAnchor(id: ProductId) {
  return `#${getProductElementId(id)}` as const;
}

export function getProductPath(slug: string) {
  return `/products/${slug}` as const;
}

export function getProductHref(id: ProductId) {
  return getProductPath(getProduct(id).slug);
}
