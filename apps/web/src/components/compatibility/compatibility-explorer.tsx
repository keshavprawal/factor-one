'use client';

import Link from 'next/link';
import { Check, CircleHelp, Clock3 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  compatibilityGarageHref,
  type CompatibilityProductSummary,
  type CompatibilityStatus,
  type CompatibilityVehicleSummary,
} from '@/config/compatibility';
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

export interface CompatibilityExplorerProps {
  vehicles: readonly CompatibilityVehicleSummary[];
}

const statusDetails = {
  verified: {
    description: 'Factor One has approved physical fitment for this car.',
    icon: Check,
    label: 'Verified',
  },
  pending: {
    description:
      'The product is associated with this car, but physical fitment has not been approved yet.',
    icon: Clock3,
    label: 'Verification pending',
  },
  'not-listed': {
    description:
      'Factor One does not currently list this product for the selected car.',
    icon: CircleHelp,
    label: 'Not listed',
  },
} as const satisfies Record<
  CompatibilityStatus,
  { description: string; icon: typeof Check; label: string }
>;

function StatusBadge({ status }: { status: CompatibilityStatus }) {
  const detail = statusDetails[status];
  const Icon = detail.icon;

  return (
    <Badge
      variant={status === 'verified' ? 'default' : 'outline'}
      className="min-h-7 gap-1.5 whitespace-nowrap"
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {detail.label}
    </Badge>
  );
}

function ProductResult({ product }: { product: CompatibilityProductSummary }) {
  return (
    <article className="h-full">
      <Card className="flex h-full flex-col shadow-none">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-2xl font-semibold tracking-[-0.035em]">
              {product.name}
            </h3>
            <StatusBadge status={product.status} />
          </div>
          {product.availabilityLabel ? (
            <p className="text-muted-foreground text-sm">
              {product.availabilityLabel}
            </p>
          ) : null}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <p className="text-muted-foreground text-sm leading-6">
            {statusDetails[product.status].description}
          </p>
          <Link
            href={product.href}
            className="motion-safe-transition text-foreground hover:text-primary focus-visible:ring-ring mt-auto inline-flex min-h-11 items-center self-start rounded-sm pt-6 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-4"
          >
            View product direction
          </Link>
        </CardContent>
      </Card>
    </article>
  );
}

export function CompatibilityExplorer({
  vehicles,
}: CompatibilityExplorerProps) {
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    vehicles[0]?.id ?? '',
  );
  const [garageState, setGarageState] = useState<GarageState | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const scope = useMemo<GarageStateScope>(
    () => ({
      productIds: vehicles.flatMap((vehicle) =>
        vehicle.products.map((product) => product.id),
      ),
      vehicleIds: vehicles.map((vehicle) => vehicle.id),
    }),
    [vehicles],
  );

  useEffect(() => {
    const storedGarage = loadGarageState(scope);
    setGarageState(storedGarage.state);

    if (storedGarage.state.selectedVehicleId) {
      setSelectedVehicleId(storedGarage.state.selectedVehicleId);
    }

    if (!storedGarage.available) {
      setStatusMessage(
        'Browser storage is unavailable. You can still review compatibility in this tab.',
      );
    }
  }, [scope]);

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.id === selectedVehicleId,
  );
  const listedCount =
    selectedVehicle?.products.filter(
      (product) => product.status !== 'not-listed',
    ).length ?? 0;

  function saveVehicle() {
    if (!selectedVehicle) {
      setStatusMessage('Choose a supported car before saving.');
      return;
    }

    const currentState = garageState ?? createEmptyGarageState();
    const nextState: GarageState = {
      installedProductIds:
        currentState.selectedVehicleId === selectedVehicle.id
          ? currentState.installedProductIds
          : [],
      selectedVehicleId: selectedVehicle.id,
      version: garageStateVersion,
    };
    const saved = saveGarageState(nextState);

    setGarageState(nextState);
    setStatusMessage(
      saved
        ? `${selectedVehicle.label} was saved to My Garage.`
        : 'Your car is selected in this tab, but browser storage is unavailable.',
    );
  }

  return (
    <>
      <section
        className="section-space bg-white"
        aria-labelledby="compatibility-selector-heading"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div className="max-w-xl">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
                Choose your car
              </p>
              <h2
                id="compatibility-selector-heading"
                className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
              >
                Start with the car you drive.
              </h2>
              <p className="text-muted-foreground mt-5 leading-7">
                Release 1.0 currently represents only the VinFast VF7. No model
                year or variant claim is implied.
              </p>
            </div>

            <div className="border-border border-t pt-8">
              <label
                htmlFor="compatibility-vehicle"
                className="text-sm font-medium"
              >
                Supported car
              </label>
              <select
                id="compatibility-vehicle"
                value={selectedVehicleId}
                onChange={(event) => {
                  setSelectedVehicleId(event.target.value);
                  setStatusMessage('');
                }}
                className="border-input bg-background focus-visible:ring-ring mt-3 h-11 w-full rounded-md border px-3 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.label}
                  </option>
                ))}
              </select>

              {selectedVehicle ? (
                <div className="bg-muted/50 mt-6 rounded-lg p-6">
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.12em]">
                    Selected car
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
                    {selectedVehicle.label}
                  </h3>
                  <p className="text-muted-foreground mt-4 text-sm leading-6">
                    {listedCount} Factor One product directions are currently
                    associated with this car. Each result below carries its own
                    verification state.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button type="button" onClick={saveVehicle}>
                      Save to My Garage
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={compatibilityGarageHref}>View My Garage</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-border mt-6 border-t pt-6">
                  <h3 className="text-xl font-semibold">Car not supported.</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    Choose a car represented in the current Product Bible.
                  </p>
                </div>
              )}

              <p
                className="text-muted-foreground mt-5 min-h-6 text-sm"
                role="status"
                aria-live="polite"
              >
                {statusMessage}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="bg-warm section-space"
        aria-labelledby="compatibility-results-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
              Product compatibility
            </p>
            <h2
              id="compatibility-results-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
            >
              {selectedVehicle
                ? `Listed for ${selectedVehicle.model}.`
                : 'Choose a supported car.'}
            </h2>
            <p className="text-muted-foreground mt-5 max-w-2xl leading-7">
              Association is not the same as verified fitment. Review the status
              on every product before drawing a compatibility conclusion.
            </p>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {selectedVehicle
              ? `${selectedVehicle.products.length} product results shown for ${selectedVehicle.label}.`
              : 'No compatibility results are available.'}
          </p>

          {selectedVehicle && selectedVehicle.products.length > 0 ? (
            <Grid columns={2} gap="lg" className="mt-10">
              {selectedVehicle.products.map((product) => (
                <ProductResult key={product.id} product={product} />
              ))}
            </Grid>
          ) : (
            <div className="border-border mt-10 max-w-2xl border-t pt-7">
              <h3 className="text-2xl font-medium tracking-[-0.035em]">
                No products are listed for this car.
              </h3>
              <p className="text-muted-foreground mt-3 leading-7">
                Factor One does not currently show a canonical compatibility
                relationship for the selected car.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
