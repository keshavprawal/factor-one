import {
  createEmptyGarageState,
  parseGarageState,
  serializeGarageState,
  type GarageState,
  type GarageStateScope,
} from '@/features/garage/garage-state';

export const garageStorageKey = 'factor-one:my-garage:v1';

export interface GarageStorageResult {
  available: boolean;
  state: GarageState;
}

export function loadGarageState(scope: GarageStateScope): GarageStorageResult {
  try {
    return {
      available: true,
      state: parseGarageState(localStorage.getItem(garageStorageKey), scope),
    };
  } catch {
    return { available: false, state: createEmptyGarageState() };
  }
}

export function saveGarageState(state: GarageState): boolean {
  try {
    localStorage.setItem(garageStorageKey, serializeGarageState(state));
    return true;
  } catch {
    return false;
  }
}
