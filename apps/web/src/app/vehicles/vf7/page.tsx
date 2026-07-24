import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ScrollLink } from '@/components/ui/scroll-link';

export const metadata: Metadata = {
  title: 'VinFast VF7',
  description: 'Factor One products engineered for the VinFast VF7.',
};

export default function VF7Page() {
  return (
    <>
      <section id="vehicle-hero" className="scroll-mt-[4.5rem] section-space" aria-labelledby="vehicle-hero-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
            <div className="order-2 max-w-xl lg:order-1">
              <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground">VINFAST</p>
              <h1 id="vehicle-hero-heading" className="mt-5 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                VF7
              </h1>
              <p className="mt-6 text-xl leading-8 text-foreground sm:text-2xl">Premium electric SUV engineered for everyday confidence.</p>
              <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Discover accessories engineered specifically for the VinFast VF7. Every product is designed to integrate seamlessly with your vehicle while maintaining its design language and everyday practicality.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <ScrollLink href="#featured-products">Explore Products</ScrollLink>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <ScrollLink href="#vehicle-categories">Browse Categories</ScrollLink>
                </Button>
              </div>
            </div>

            <div className="order-1 relative aspect-[4/3] overflow-hidden bg-muted lg:order-2">
              <Image
                src="/images/hero-suv.jpg"
                alt="Graphite VinFast VF7 electric SUV outside a minimalist contemporary residence"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[78%_center]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section id="vehicle-overview" className="scroll-mt-[4.5rem] section-space" aria-labelledby="vehicle-overview-heading">
        <Container>
          <h2 id="vehicle-overview-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Vehicle Overview
          </h2>
        </Container>
      </section>

      <section id="featured-products" className="scroll-mt-[4.5rem] section-space" aria-labelledby="featured-products-heading">
        <Container>
          <h2 id="featured-products-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Featured Products
          </h2>
        </Container>
      </section>

      <section id="vehicle-categories" className="scroll-mt-[4.5rem] section-space" aria-labelledby="vehicle-categories-heading">
        <Container>
          <h2 id="vehicle-categories-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Browse by Category
          </h2>
        </Container>
      </section>

      <section id="ownership-resources" className="scroll-mt-[4.5rem] section-space" aria-labelledby="ownership-resources-heading">
        <Container>
          <h2 id="ownership-resources-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Ownership Resources
          </h2>
        </Container>
      </section>

      <section id="vehicle-cta" className="scroll-mt-[4.5rem] section-space" aria-labelledby="vehicle-cta-heading">
        <Container>
          <h2 id="vehicle-cta-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            Vehicle CTA
          </h2>
        </Container>
      </section>
    </>
  );
}
