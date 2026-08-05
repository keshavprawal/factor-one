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
  | 'storage'
  | 'cargo-storage';

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
  evidence: readonly string[] | null;
  make: string;
  model: string;
  vehicleId: string;
  verificationStatus: 'pending' | 'verified';
  variants: readonly string[] | null;
  yearStart: number | null;
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

export interface ProductLaunchDate {
  date: string;
  label: string;
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
  openGraphDescription?: string;
  openGraphTitle?: string;
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
  internalCode: string | null;
  installationDifficulty: ContentField<InstallationDifficulty>;
  installationMethod: ContentField<string>;
  keyBenefits: ContentField<readonly string[]>;
  launchDate: ContentField<ProductLaunchDate>;
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

function approved<T>(value: T): ContentField<T> {
  return { status: 'approved', value };
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
    variants: null,
    yearStart: null,
    years: null,
    evidence: null,
  },
] as const satisfies readonly VehicleCompatibility[];

export const products = [
  {
    id: 'screen-guard',
    slug: 'screen-guard',
    name: 'Screen Guard',
    internalCode: null,
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
    launchDate: pending(),
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
    internalCode: null,
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
    launchDate: pending(),
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
    internalCode: null,
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
    launchDate: pending(),
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
    name: 'VF7 Parcel Tray',
    internalCode: 'FO-VF7-PT-001',
    vehicleCompatibility: [
      {
        make: 'VinFast',
        model: 'VF7',
        vehicleId: vinfastVf7VehicleId,
        verificationStatus: 'verified',
        variants: ['Earth', 'Wind', 'Wind Infinity', 'Sky', 'Sky Infinity'],
        yearStart: 2025,
        years: null,
        evidence: [
          'Full vehicle scanning and modelling during development.',
          'CAD design.',
          'Fitted wooden prototype.',
          'Manufacturer fit confirmation.',
          'Manufacturer dynamic testing.',
        ],
      },
    ],
    category: 'cargo-storage',
    status: 'testing',
    launchScope: 'v1',
    shortDescription: approved(
      'Vehicle-specific rear-seat coverage for the VinFast VF7 cargo area.',
    ),
    fullDescription: approved(
      'Designed for the VinFast VF7, the Parcel Tray extends coverage behind the rear seats while keeping daily cargo access straightforward. It can be removed and reinstalled without additional mounting hardware or vehicle modification.',
    ),
    problemSolved: approved(
      'The open gap behind the rear seats leaves part of the cargo area uncovered. The VF7 Parcel Tray adds extended coverage there while retaining tailgate and rear-seat operation.',
    ),
    keyBenefits: approved([
      'Extended coverage behind the rear seats.',
      'Correct edge alignment around the cargo area.',
      'Tailgate movement without interference.',
      'Rear-seat folding and reclining without interference.',
      'Stable and rattle-free behaviour during manufacturer dynamic testing.',
      'Straightforward removal and reinstallation.',
    ]),
    specifications: approved([
      { label: 'Material', value: 'ABS plastic', unit: null },
      { label: 'Colour', value: 'Black', unit: null },
      { label: 'Finish', value: 'Rough textured', unit: null },
      { label: 'Weight', value: '900', unit: 'g' },
      { label: 'Fit type', value: 'Vehicle-specific fit', unit: null },
      {
        label: 'Additional mounting hardware',
        value: 'None required',
        unit: null,
      },
      { label: 'Vehicle modification', value: 'None required', unit: null },
    ]),
    materials: approved(['ABS plastic', 'Black rough textured finish']),
    variants: pending(),
    includedItems: approved(['Parcel tray', 'Two support strings']),
    installationMethod: approved('Self-installation'),
    installationDifficulty: pending(),
    estimatedInstallationTime: pending(),
    careInstructions: approved(
      'Clean using a soft, damp cloth. Use a mild automotive interior cleaner only when required. Avoid abrasive pads, harsh chemicals and strong solvents. Dry before reinstalling, and inspect the support strings periodically for wear or damage.',
    ),
    warranty: approved({
      durationMonths: 12,
      summary:
        'Covered against manufacturing defects in materials or workmanship for 12 months from delivery.',
    }),
    honestLimitations: pending(),
    price: approved({ amountMinor: 299900, currency: 'INR' }),
    launchDate: approved({ date: '2026-08-15', label: '15 August 2026' }),
    availability: {
      approvalStatus: 'approved',
      state: 'coming-soon',
      purchasable: false,
      label: 'Launching 15 August 2026',
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
      'parcel-tray-temporary-hero',
      'parcel-tray-temporary-lifestyle',
      'parcel-tray-prototype-installed',
    ],
    seo: approved({
      title: 'VF7 Parcel Tray with Extended Rear Coverage | Factor One',
      description:
        'Vehicle-specific parcel tray for the VinFast VF7 with extended coverage behind the rear seats, removable construction and a clean integrated appearance.',
      openGraphTitle: 'Factor One VF7 Parcel Tray',
      openGraphDescription:
        'Designed for the VinFast VF7 with extended rear-seat coverage, self-installation and a removable vehicle-specific design.',
    }),
    relatedProductIds: [],
  },
  {
    id: 'door-visor',
    slug: 'door-visor',
    name: 'Door Visor',
    internalCode: null,
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
    launchDate: pending(),
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

export function getVehicleCompatibility(
  vehicleId: string,
): VehicleCompatibility | null {
  const productRegistry: readonly Product[] = products;

  return (
    productRegistry
      .flatMap((product) => product.vehicleCompatibility)
      .find((compatibility) => compatibility.vehicleId === vehicleId) ?? null
  );
}
