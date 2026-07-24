import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';

export const metadata: Metadata = {
  title: 'VinFast VF7',
  description: 'Factor One products engineered for the VinFast VF7.',
};

export default function VF7Page() {
  return (
    <>
      <section id="vehicle-hero" className="scroll-mt-[4.5rem] section-space" aria-labelledby="vehicle-hero-heading">
        <Container>
          <h1 id="vehicle-hero-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            VinFast VF7
          </h1>
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
