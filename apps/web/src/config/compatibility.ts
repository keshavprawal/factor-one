import { getProductHref } from './product-routes';
import {
  getVehicleCompatibility,
  products,
  vinfastVf7VehicleId,
  type Product,
  type ProductId,
} from './products';

export type CompatibilityStatus = 'verified' | 'pending' | 'not-listed';

export interface CompatibilityProductSummary {
  availabilityLabel: string | null;
  href: string;
  id: ProductId;
  name: string;
  status: CompatibilityStatus;
}

export interface CompatibilityVehicleSummary {
  compatibilityVerificationStatus: 'pending' | 'verified';
  id: string;
  label: string;
  make: string;
  model: string;
  products: readonly CompatibilityProductSummary[];
}

export const compatibilityGarageHref = '/garage';

export const compatibilityKnowledgeLinks = [
  {
    href: '/knowledge/reading-compatibility-information',
    label: 'How to Read Compatibility Information',
  },
  {
    href: '/knowledge/confirming-product-fit',
    label: 'Confirming Product Fit',
  },
] as const;

export function getProductCompatibilityStatus(
  product: Product,
  vehicleId: string,
): CompatibilityStatus {
  const compatibility = product.vehicleCompatibility.find(
    (candidate) => candidate.vehicleId === vehicleId,
  );

  if (!compatibility) {
    return 'not-listed';
  }

  return compatibility.verificationStatus;
}

export function createCompatibilityProducts(
  productRegistry: readonly Product[],
  vehicleId: string,
): readonly CompatibilityProductSummary[] {
  return productRegistry.map((product) => ({
    availabilityLabel:
      product.availability.approvalStatus === 'approved'
        ? product.availability.label
        : null,
    href: getProductHref(product.id),
    id: product.id,
    name: product.name,
    status: getProductCompatibilityStatus(product, vehicleId),
  }));
}

const vf7Compatibility = getVehicleCompatibility(vinfastVf7VehicleId);

if (!vf7Compatibility) {
  throw new Error(
    `Vehicle Compatibility requires Product Bible compatibility for ${vinfastVf7VehicleId}.`,
  );
}

export const compatibilityVehicles = [
  {
    id: vf7Compatibility.vehicleId,
    make: vf7Compatibility.make,
    model: vf7Compatibility.model,
    label: `${vf7Compatibility.make} ${vf7Compatibility.model}`,
    compatibilityVerificationStatus: vf7Compatibility.verificationStatus,
    products: createCompatibilityProducts(products, vf7Compatibility.vehicleId),
  },
] satisfies readonly CompatibilityVehicleSummary[];

export function getCompatibilityVehicle(vehicleId: string) {
  return (
    compatibilityVehicles.find((vehicle) => vehicle.id === vehicleId) ?? null
  );
}
