import type { Metadata } from 'next';
import Link from 'next/link';
import { GarageManager } from '@/components/garage/garage-manager';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import {
  garageKnowledgeLinks,
  garageOwnershipResources,
  garageProducts,
  garageVehicles,
} from '@/config/garage';

export const metadata: Metadata = {
  title: 'My Garage',
  description:
    'Save your car locally and organize available Factor One product and ownership information.',
  alternates: {},
  robots: { follow: false, index: false },
};

export default function GaragePage() {
  return (
    <>
      <section
        className="bg-warm section-space"
        aria-labelledby="garage-heading"
      >
        <Container>
          <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
            My Garage
          </p>
          <div className="mt-4 max-w-3xl">
            <h1
              id="garage-heading"
              className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Your car, in one clear place.
            </h1>
            <p className="text-muted-foreground mt-7 max-w-2xl text-lg leading-8 sm:text-xl">
              Save the car you drive, keep track of installed Factor One
              accessories, and find the product and ownership information
              currently available for it.
            </p>
          </div>
          <p className="text-muted-foreground mt-8 max-w-2xl text-sm leading-6">
            My Garage is stored only in this browser. It is not connected to an
            account or sent to Factor One.
          </p>
        </Container>
      </section>

      <GarageManager products={garageProducts} vehicles={garageVehicles} />

      <section
        className="bg-warm section-space"
        aria-labelledby="garage-knowledge-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
              Knowledge Centre
            </p>
            <h2
              id="garage-knowledge-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
            >
              Guidance for your garage.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-2xl leading-7">
              VF7-specific guidance has not been approved yet. The current
              previews show where compatibility, installation and care
              information will live.
            </p>
          </div>
          <Grid columns={3} className="mt-10">
            {garageKnowledgeLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="motion-safe-transition border-border hover:border-foreground focus-visible:border-foreground rounded-md border p-6 transition-[border-color,transform] hover:-translate-y-1 focus-visible:-translate-y-1 motion-reduce:transform-none"
              >
                <h3 className="text-xl font-semibold tracking-[-0.03em]">
                  {item.label}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {item.description}
                </p>
              </Link>
            ))}
          </Grid>
        </Container>
      </section>

      <section
        className="section-space bg-white"
        aria-labelledby="ownership-information-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.14em]">
              Ownership information
            </p>
            <h2
              id="ownership-information-heading"
              className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl"
            >
              Information as it becomes available.
            </h2>
          </div>
          <Grid columns={2} className="mt-10">
            {garageOwnershipResources.map((resource) => (
              <article
                key={resource.title}
                className="border-border border-t py-7"
              >
                <h3 className="text-2xl font-medium tracking-[-0.035em]">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground mt-3 max-w-md leading-7">
                  {resource.description}
                </p>
              </article>
            ))}
          </Grid>
        </Container>
      </section>
    </>
  );
}
