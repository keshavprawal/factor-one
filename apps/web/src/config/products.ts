export type ProductId =
  | 'screen-guard'
  | 'rear-door-mud-guard'
  | 'bumper-mud-guard'
  | 'parcel-tray'
  | 'door-visor';

export type ProductCategory =
  | 'interior'
  | 'exterior'
  | 'protection'
  | 'storage';

export type ProductStatus =
  | 'direction'
  | 'design'
  | 'testing'
  | 'launch-ready'
  | 'retired';

export type ProductLaunchScope = 'v1' | 'deferred';

export const vinfastVf7VehicleId = 'vinfast-vf7';

export type ContentApprovalStatus = 'pending' | 'draft' | 'approved';

export interface ContentField<T> {
  status: ContentApprovalStatus;
  value: T | null;
}

export interface VehicleCompatibility {
  make: string;
  model: string;
  vehicleId: string;
  verificationStatus: 'pending' | 'verified';
  years: readonly number[] | null;
}

export interface ProductSpecification {
  label: string;
  unit: string | null;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
}

export interface InstallationTime {
  maximumMinutes: number;
  minimumMinutes: number;
}

export type InstallationDifficulty =
  | 'easy'
  | 'moderate'
  | 'advanced'
  | 'professional';

export interface ProductWarranty {
  durationMonths: number | null;
  summary: string;
}

export interface ProductPrice {
  amountMinor: number;
  currency: string;
}

export interface ProductBadge {
  approvalStatus: 'pending' | 'approved';
  id: string;
  label: string;
  ownerRequestCount?: number;
  supportingText: string | null;
}

export interface ProductAvailability {
  approvalStatus: ContentApprovalStatus;
  label: string;
  purchasable: boolean;
  state: 'unavailable' | 'coming-soon' | 'available';
}

export interface ProductSeoMetadata {
  description: string;
  title: string;
}

export interface Product {
  availability: ProductAvailability;
  badges: readonly ProductBadge[];
  careInstructions: ContentField<string>;
  category: ProductCategory;
  estimatedInstallationTime: ContentField<InstallationTime>;
  fullDescription: ContentField<string>;
  honestLimitations: ContentField<readonly string[]>;
  id: ProductId;
  includedItems: ContentField<readonly string[]>;
  installationDifficulty: ContentField<InstallationDifficulty>;
  installationMethod: ContentField<string>;
  keyBenefits: ContentField<readonly string[]>;
  launchScope: ProductLaunchScope;
  materials: ContentField<readonly string[]>;
  media: readonly string[];
  name: string;
  price: ContentField<ProductPrice>;
  problemSolved: ContentField<string>;
  relatedProductIds: readonly ProductId[];
  seo: ContentField<ProductSeoMetadata>;
  shortDescription: ContentField<string>;
  slug: string;
  specifications: ContentField<readonly ProductSpecification[]>;
  status: ProductStatus;
  variants: ContentField<readonly ProductVariant[]>;
  vehicleCompatibility: readonly VehicleCompatibility[];
  warranty: ContentField<ProductWarranty>;
}

function pending<T>(): ContentField<T> {
  return { status: 'pending', value: null };
}

function draft<T>(value: T): ContentField<T> {
  return { status: 'draft', value };
}

export function getPublicContentValue<T>(field: ContentField<T>): T | null {
  return field.status === 'approved' ? field.value : null;
}

const vf7Compatibility = [
  {
    make: 'VinFast',
    model: 'VF7',
    vehicleId: vinfastVf7VehicleId,
    verificationStatus: 'pending',
    years: null,
  },
] as const satisfies readonly VehicleCompatibility[];

export const products = [
  {
    id: 'screen-guard',
    slug: 'screen-guard',
    name: 'Screen Guard',
    vehicleCompatibility: vf7Compatibility,
    category: 'interior',
    status: 'direction',
    launchScope: 'v1',
    shortDescription: draft(
      'A clear layer of protection for the central display and daily touch use.',
    ),
    fullDescription: pending(),
    problemSolved: draft(
      'Helps protect the display without getting in the way of everyday use.',
    ),
    keyBenefits: pending(),
    specifications: pending(),
    materials: pending(),
    variants: pending(),
    includedItems: pending(),
    installationMethod: pending(),
    installationDifficulty: pending(),
    estimatedInstallationTime: pending(),
    careInstructions: pending(),
    warranty: pending(),
    honestLimitations: pending(),
    price: pending(),
    availability: {
      approvalStatus: 'approved',
      state: 'unavailable',
      purchasable: false,
      label: 'Product direction',
    },
    badges: [],
    media: [
      'screen-guard-homepage-hero',
      'screen-guard-homepage-featured',
      'screen-guard-vf7-featured',
    ],
    seo: pending(),
    relatedProductIds: [],
  },
  {
    id: 'rear-door-mud-guard',
    slug: 'rear-door-mud-guard',
    name: 'Rear Door Mud Guard',
    vehicleCompatibility: vf7Compatibility,
    category: 'exterior',
    status: 'testing',
    launchScope: 'v1',
    shortDescription: draft(
      'A product direction focused on the spray owners notice around the rear doors.',
    ),
    fullDescription: pending(),
    problemSolved: draft(
      'Made to address the spray and grime owners notice around the rear doors.',
    ),
    keyBenefits: pending(),
    specifications: pending(),
    materials: pending(),
    variants: pending(),
    includedItems: pending(),
    installationMethod: pending(),
    installationDifficulty: pending(),
    estimatedInstallationTime: pending(),
    careInstructions: pending(),
    warranty: pending(),
    honestLimitations: pending(),
    price: pending(),
    availability: {
      approvalStatus: 'approved',
      state: 'unavailable',
      purchasable: false,
      label: 'In testing',
    },
    badges: [
      {
        id: 'owner-built',
        label: 'OWNER BUILT',
        ownerRequestCount: 67,
        supportingText: 'Requested by 67 owners.',
        approvalStatus: 'approved',
      },
    ],
    media: [
      'rear-door-mud-guard-homepage-hero',
      'rear-door-mud-guard-homepage-featured',
      'rear-door-mud-guard-vf7-featured',
    ],
    seo: pending(),
    relatedProductIds: [],
  },
  {
    id: 'bumper-mud-guard',
    slug: 'bumper-mud-guard',
    name: 'Bumper Mud Guard',
    vehicleCompatibility: vf7Compatibility,
    category: 'exterior',
    status: 'direction',
    launchScope: 'v1',
    shortDescription: draft(
      'A separate product direction for protection around the exposed bumper area.',
    ),
    fullDescription: pending(),
    problemSolved: draft(
      'A practical layer of protection for an exposed part of the car.',
    ),
    keyBenefits: pending(),
    specifications: pending(),
    materials: pending(),
    variants: pending(),
    includedItems: pending(),
    installationMethod: pending(),
    installationDifficulty: pending(),
    estimatedInstallationTime: pending(),
    careInstructions: pending(),
    warranty: pending(),
    honestLimitations: pending(),
    price: pending(),
    availability: {
      approvalStatus: 'approved',
      state: 'unavailable',
      purchasable: false,
      label: 'Product direction',
    },
    badges: [],
    media: [
      'bumper-mud-guard-homepage-hero',
      'bumper-mud-guard-homepage-featured',
      'bumper-mud-guard-vf7-featured',
    ],
    seo: pending(),
    relatedProductIds: [],
  },
  {
    id: 'parcel-tray',
    slug: 'parcel-tray',
    name: 'Parcel Tray',
    vehicleCompatibility: vf7Compatibility,
    category: 'storage',
    status: 'design',
    launchScope: 'v1',
    shortDescription: draft(
      'A cargo-area solution shaped around the gap owners asked us to solve.',
    ),
    fullDescription: pending(),
    problemSolved: draft(
      'Designed to close the open cargo-area gap owners asked Factor One to solve.',
    ),
    keyBenefits: pending(),
    specifications: pending(),
    materials: pending(),
    variants: pending(),
    includedItems: pending(),
    installationMethod: pending(),
    installationDifficulty: pending(),
    estimatedInstallationTime: pending(),
    careInstructions: pending(),
    warranty: pending(),
    honestLimitations: pending(),
    price: pending(),
    availability: {
      approvalStatus: 'approved',
      state: 'unavailable',
      purchasable: false,
      label: 'In design',
    },
    badges: [
      {
        id: 'owner-built',
        label: 'OWNER BUILT',
        ownerRequestCount: 184,
        supportingText: 'Requested by 184 owners.',
        approvalStatus: 'approved',
      },
    ],
    media: [
      'parcel-tray-homepage-hero',
      'parcel-tray-homepage-featured',
      'parcel-tray-vf7-featured',
    ],
    seo: pending(),
    relatedProductIds: [],
  },
  {
    id: 'door-visor',
    slug: 'door-visor',
    name: 'Door Visor',
    vehicleCompatibility: vf7Compatibility,
    category: 'exterior',
    status: 'direction',
    launchScope: 'v1',
    shortDescription: draft(
      'A considered exterior addition for ventilation in everyday conditions.',
    ),
    fullDescription: pending(),
    problemSolved: draft(
      'A considered exterior addition for ventilation in everyday conditions.',
    ),
    keyBenefits: pending(),
    specifications: pending(),
    materials: pending(),
    variants: pending(),
    includedItems: pending(),
    installationMethod: pending(),
    installationDifficulty: pending(),
    estimatedInstallationTime: pending(),
    careInstructions: pending(),
    warranty: pending(),
    honestLimitations: pending(),
    price: pending(),
    availability: {
      approvalStatus: 'approved',
      state: 'unavailable',
      purchasable: false,
      label: 'Product direction',
    },
    badges: [],
    media: ['door-visor-homepage-hero', 'door-visor-homepage-featured'],
    seo: pending(),
    relatedProductIds: [],
  },
] as const satisfies readonly Product[];

export function getProduct(productId: ProductId): Product {
  const product = products.find((candidate) => candidate.id === productId);

  if (!product) {
    throw new Error(`Unknown product: ${productId}`);
  }

  return product;
}

export function getVehicleCompatibility(vehicleId: string) {
  return (
    products
      .flatMap((product) => product.vehicleCompatibility)
      .find((compatibility) => compatibility.vehicleId === vehicleId) ?? null
  );
}
