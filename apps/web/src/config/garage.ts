import { getProductHref } from '@/config/product-routes';
import {
  getPublicContentValue,
  getVehicleCompatibility,
  products,
  vinfastVf7VehicleId,
  type ProductId,
} from '@/config/products';
import { vf7OwnershipResources } from '@/config/vf7';

export interface GarageVehicleOption {
  compatibilityVerificationStatus: 'pending' | 'verified';
  id: string;
  label: string;
  make: string;
  model: string;
}

export interface GarageProductSummary {
  availabilityLabel: string | null;
  category: string;
  compatibilityVerificationStatus: 'pending' | 'verified';
  description: string | null;
  href: string;
  id: ProductId;
  name: string;
}

export interface GarageKnowledgeLink {
  description: string;
  href: string;
  label: string;
}

const categoryLabels = {
  exterior: 'Exterior',
  interior: 'Interior',
  protection: 'Protection',
  storage: 'Storage',
} as const;

function getVf7Compatibility() {
  const compatibility = getVehicleCompatibility(vinfastVf7VehicleId);

  if (!compatibility) {
    throw new Error(
      `My Garage requires Product Bible compatibility for ${vinfastVf7VehicleId}.`,
    );
  }

  return compatibility;
}

const vf7Compatibility = getVf7Compatibility();

export const garageVehicles = [
  {
    id: vf7Compatibility.vehicleId,
    make: vf7Compatibility.make,
    model: vf7Compatibility.model,
    label: `${vf7Compatibility.make} ${vf7Compatibility.model}`,
    compatibilityVerificationStatus: vf7Compatibility.verificationStatus,
  },
] as const satisfies readonly GarageVehicleOption[];

export const garageProducts = products
  .filter((product) =>
    product.vehicleCompatibility.some(
      (compatibility) => compatibility.vehicleId === vinfastVf7VehicleId,
    ),
  )
  .map((product) => {
    const compatibility = product.vehicleCompatibility.find(
      (candidate) => candidate.vehicleId === vinfastVf7VehicleId,
    )!;

    return {
      id: product.id,
      name: product.name,
      category: categoryLabels[product.category],
      href: getProductHref(product.id),
      description: getPublicContentValue(product.shortDescription),
      compatibilityVerificationStatus: compatibility.verificationStatus,
      availabilityLabel:
        product.availability.approvalStatus === 'approved'
          ? product.availability.label
          : null,
    };
  }) satisfies readonly GarageProductSummary[];

export const garageKnowledgeLinks = [
  {
    label: 'Compatibility previews',
    description: 'See how compatibility guidance will be presented.',
    href: '/knowledge?category=compatibility',
  },
  {
    label: 'Installation previews',
    description: 'See where approved installation guidance will live.',
    href: '/knowledge?category=installation',
  },
  {
    label: 'Care previews',
    description: 'See where approved care guidance will live.',
    href: '/knowledge?category=care',
  },
] as const satisfies readonly GarageKnowledgeLink[];

export const garageOwnershipResources = vf7OwnershipResources;
