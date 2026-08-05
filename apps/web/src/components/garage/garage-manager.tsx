'use client';

import Link from 'next/link';
import { Check, ExternalLink } from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type {
  GarageProductSummary,
  GarageVehicleOption,
} from '@/config/garage';
import type { ProductId } from '@/config/products';
import {
  createEmptyGarageState,
  garageStateVersion,
  type GarageState,
  type GarageStateScope,
} from '@/features/garage/garage-state';
import {
  loadGarageState,
  saveGarageState,
} from '@/features/garage/garage-storage';

export interface GarageManagerProps {
  products: readonly GarageProductSummary[];
  vehicles: readonly GarageVehicleOption[];
}

function verificationLabel(status: 'pending' | 'verified') {
  return status === 'verified'
    ? 'Compatibility verified'
    : 'Compatibility verification pending';
}

export function GarageManager({ products, vehicles }: GarageManagerProps) {
  const [garageState, setGarageState] = useState<GarageState | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    vehicles[0]?.id ?? '',
  );
  const [statusMessage, setStatusMessage] = useState('');
  const [storageAvailable, setStorageAvailable] = useState(true);
  const scope = useMemo<GarageStateScope>(
    () => ({
      productIds: products.map((product) => product.id),
      vehicleIds: vehicles.map((vehicle) => vehicle.id),
    }),
    [products, vehicles],
  );

  useEffect(() => {
    const storedGarage = loadGarageState(scope);
    setGarageState(storedGarage.state);
    setStorageAvailable(storedGarage.available);
    if (storedGarage.state.selectedVehicleId) {
      setSelectedVehicleId(storedGarage.state.selectedVehicleId);
    }
  }, [scope]);

  function commitGarageState(nextState: GarageState, message: string) {
    const saved = saveGarageState(nextState);
    setGarageState(nextState);
    setStorageAvailable(saved);
    setStatusMessage(
      saved
        ? message
        : 'Your change is available in this tab, but browser storage is unavailable.',
    );
  }

  function handleVehicleSelection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedVehicleId || !scope.vehicleIds.includes(selectedVehicleId)) {
      setStatusMessage('Choose an available car before continuing.');
      return;
    }

    commitGarageState(
      {
        installedProductIds: [],
        selectedVehicleId,
        version: garageStateVersion,
      },
      'Your car was saved to My Garage.',
    );
  }

  function handleInstalledChange(productId: ProductId, installed: boolean) {
    if (!garageState) {
      return;
    }

    const installedProductIds = installed
      ? [...new Set([...garageState.installedProductIds, productId])]
      : garageState.installedProductIds.filter(
          (installedId) => installedId !== productId,
        );

    commitGarageState(
      { ...garageState, installedProductIds },
      installed
        ? 'Accessory marked as installed.'
        : 'Accessory removed from your installed list.',
    );
  }

  function clearGarage() {
    commitGarageState(createEmptyGarageState(), 'My Garage was cleared.');
  }

  const savedVehicle = vehicles.find(
    (vehicle) => vehicle.id === garageState?.selectedVehicleId,
  );
  const installedProducts = products.filter((product) =>
    garageState?.installedProductIds.includes(product.id),
  );

  return (
    <>
      <section
        className="section-space bg-white"
        aria-labelledby="saved-car-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
              Saved car
            </p>
            <h2
              id="saved-car-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
            >
              Start with what you drive.
            </h2>
          </div>

          {garageState === null ? (
            <p className="text-muted-foreground mt-10" role="status">
              Loading your saved garage…
            </p>
          ) : savedVehicle ? (
            <Card className="mt-10 max-w-3xl shadow-none">
              <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">
                    Currently saved
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                    {savedVehicle.label}
                  </h3>
                </div>
                <span className="bg-muted text-muted-foreground rounded-full px-3 py-2 text-xs font-medium">
                  Saved locally
                </span>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-foreground text-sm">Make</dt>
                    <dd className="mt-1 font-medium">{savedVehicle.make}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-sm">Model</dt>
                    <dd className="mt-1 font-medium">{savedVehicle.model}</dd>
                  </div>
                </dl>
                <p className="text-muted-foreground mt-6 text-sm leading-6">
                  {verificationLabel(
                    savedVehicle.compatibilityVerificationStatus,
                  )}
                  . Product-level information remains the source of truth.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-7"
                  onClick={clearGarage}
                >
                  Clear My Garage
                </Button>
              </CardContent>
            </Card>
          ) : (
            <form
              className="border-border mt-10 max-w-3xl border-t pt-8"
              onSubmit={handleVehicleSelection}
            >
              <label htmlFor="garage-vehicle" className="text-sm font-medium">
                Choose your car
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <select
                  id="garage-vehicle"
                  value={selectedVehicleId}
                  onChange={(event) => setSelectedVehicleId(event.target.value)}
                  className="border-input bg-background focus-visible:ring-ring h-11 min-w-0 flex-1 rounded-md border px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                >
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.label}
                    </option>
                  ))}
                </select>
                <Button type="submit" className="sm:px-7">
                  Save to My Garage
                </Button>
              </div>
              <p className="text-muted-foreground mt-4 text-sm leading-6">
                Only cars represented in the current Product Bible are shown.
              </p>
            </form>
          )}

          <p
            className="text-muted-foreground mt-5 min-h-6 text-sm"
            role="status"
            aria-live="polite"
          >
            {statusMessage ||
              (!storageAvailable
                ? 'Browser storage is unavailable. Changes will last only for this tab.'
                : '')}
          </p>
        </Container>
      </section>

      {savedVehicle && garageState ? (
        <>
          <section
            className="bg-muted/50 section-space"
            aria-labelledby="installed-accessories-heading"
          >
            <Container>
              <div className="max-w-3xl">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
                  Installed accessories
                </p>
                <h2
                  id="installed-accessories-heading"
                  className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
                >
                  What is already on your car.
                </h2>
              </div>
              {installedProducts.length > 0 ? (
                <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                  {installedProducts.map((product) => (
                    <li
                      key={product.id}
                      className="border-border bg-background flex min-h-20 items-center gap-4 rounded-md border px-5 py-4"
                    >
                      <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full">
                        <Check className="size-4" aria-hidden="true" />
                      </span>
                      <span className="font-medium">{product.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="border-border mt-10 max-w-2xl border-t pt-7">
                  <h3 className="text-2xl font-medium tracking-[-0.035em]">
                    No installed accessories saved yet.
                  </h3>
                  <p className="text-muted-foreground mt-3 leading-7">
                    Use the product list below to record accessories already on
                    your car.
                  </p>
                </div>
              )}
            </Container>
          </section>

          <section
            className="section-space bg-white"
            aria-labelledby="garage-products-heading"
          >
            <Container>
              <div className="max-w-3xl">
                <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
                  Product directions
                </p>
                <h2
                  id="garage-products-heading"
                  className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
                >
                  Listed for {savedVehicle.model}.
                </h2>
                <p className="text-muted-foreground mt-5 max-w-2xl leading-7">
                  These products are associated with your car in the Product
                  Bible. A listing does not replace product-level fit
                  verification.
                </p>
              </div>
              <Grid columns={2} gap="lg" className="mt-10">
                {products.map((product) => {
                  const installed = garageState.installedProductIds.includes(
                    product.id,
                  );

                  return (
                    <Card
                      key={product.id}
                      className="flex h-full flex-col shadow-none"
                    >
                      <CardHeader>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">
                            {product.category}
                          </p>
                          {product.availabilityLabel ? (
                            <span className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium">
                              {product.availabilityLabel}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="pt-2 text-2xl font-semibold tracking-[-0.035em]">
                          {product.name}
                        </h3>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col">
                        {product.description ? (
                          <p className="text-muted-foreground leading-7">
                            {product.description}
                          </p>
                        ) : null}
                        <p className="text-muted-foreground text-sm leading-6">
                          {verificationLabel(
                            product.compatibilityVerificationStatus,
                          )}
                        </p>
                        <div className="border-border mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium">
                            <input
                              type="checkbox"
                              checked={installed}
                              onChange={(event) =>
                                handleInstalledChange(
                                  product.id,
                                  event.target.checked,
                                )
                              }
                              className="accent-primary size-5"
                            />
                            Installed
                          </label>
                          <Link
                            href={product.href}
                            className="motion-safe-transition hover:text-primary inline-flex min-h-11 items-center gap-2 text-sm font-medium transition-colors"
                          >
                            View product direction
                            <ExternalLink
                              className="size-3.5"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </Grid>
            </Container>
          </section>
        </>
      ) : null}
    </>
  );
}
