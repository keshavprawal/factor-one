import type { ProductId } from '@/config/products';

export const garageStateVersion = 1;

export interface GarageState {
  installedProductIds: ProductId[];
  selectedVehicleId: string | null;
  version: typeof garageStateVersion;
}

export interface GarageStateScope {
  productIds: readonly ProductId[];
  vehicleIds: readonly string[];
}

export function createEmptyGarageState(): GarageState {
  return {
    installedProductIds: [],
    selectedVehicleId: null,
    version: garageStateVersion,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseGarageState(
  serializedState: string | null,
  scope: GarageStateScope,
): GarageState {
  if (!serializedState) {
    return createEmptyGarageState();
  }

  try {
    const candidate: unknown = JSON.parse(serializedState);

    if (!isRecord(candidate) || candidate.version !== garageStateVersion) {
      return createEmptyGarageState();
    }

    const selectedVehicleId =
      typeof candidate.selectedVehicleId === 'string' &&
      scope.vehicleIds.includes(candidate.selectedVehicleId)
        ? candidate.selectedVehicleId
        : null;
    const installedProductIds =
      selectedVehicleId && Array.isArray(candidate.installedProductIds)
        ? candidate.installedProductIds.filter(
            (productId): productId is ProductId =>
              typeof productId === 'string' &&
              scope.productIds.includes(productId as ProductId),
          )
        : [];

    return {
      installedProductIds: [...new Set(installedProductIds)],
      selectedVehicleId,
      version: garageStateVersion,
    };
  } catch {
    return createEmptyGarageState();
  }
}

export function serializeGarageState(state: GarageState): string {
  return JSON.stringify(state);
}
