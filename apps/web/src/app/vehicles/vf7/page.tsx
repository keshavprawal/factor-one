import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { CategoryCard } from '@/components/product/category-card';
import { ProductCard } from '@/components/product/product-card';
import { ResourceCard } from '@/components/resource/resource-card';
import { Button } from '@/components/ui/button';
import { ScrollLink } from '@/components/ui/scroll-link';
import {
  vf7Categories,
  vf7FeaturedProducts,
  vf7OverviewHighlights,
  vf7OwnershipResources,
} from '@/config/vf7';
import { getCanonicalSiteUrl, siteConfig } from '@/config/site';

const canonicalSiteUrl = getCanonicalSiteUrl();

export const metadata: Metadata = {
  title: 'VinFast VF7',
  description:
    'Explore Factor One accessories and ownership resources for the VinFast VF7.',
  alternates: canonicalSiteUrl ? { canonical: '/vehicles/vf7' } : undefined,
  openGraph: {
    description:
      'Explore Factor One accessories and ownership resources for the VinFast VF7.',
    siteName: siteConfig.name,
    title: 'VinFast VF7',
    type: 'website',
    url: canonicalSiteUrl ? '/vehicles/vf7' : undefined,
  },
  twitter: {
    card: 'summary',
    description:
      'Explore Factor One accessories and ownership resources for the VinFast VF7.',
    title: 'VinFast VF7',
  },
};

export default function VF7Page() {
  return (
    <>
      <section
        id="vehicle-hero"
        className="section-space scroll-mt-24"
        aria-labelledby="vehicle-hero-heading"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
            <div className="order-2 max-w-xl lg:order-1">
              <p className="text-muted-foreground text-xs font-medium tracking-[0.18em]">
                VINFAST
              </p>
              <h1
                id="vehicle-hero-heading"
                className="mt-5 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
              >
                VF7
              </h1>
              <p className="text-foreground mt-6 text-xl leading-8 sm:text-2xl">
                Premium electric SUV engineered for everyday confidence.
              </p>
              <p className="text-muted-foreground mt-6 text-base leading-7 sm:text-lg sm:leading-8">
                Discover accessories engineered specifically for the VinFast
                VF7. Every product is designed to integrate seamlessly with your
                car while maintaining its design language and everyday
                practicality.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <ScrollLink href="#featured-products">
                    Explore Products
                  </ScrollLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6"
                >
                  <ScrollLink href="#vehicle-categories">
                    Browse Categories
                  </ScrollLink>
                </Button>
              </div>
            </div>

            <div className="bg-muted relative order-1 aspect-[4/3] overflow-hidden lg:order-2">
              <Image
                src="/images/hero-suv.jpg"
                alt="White and graphite VinFast electric SUVs outside a minimalist contemporary residence"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[78%_center]"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        id="vehicle-overview"
        className="section-space scroll-mt-24"
        aria-labelledby="vehicle-overview-heading"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
            <div className="bg-muted relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/hero-suv.jpg"
                alt="White and graphite VinFast electric SUVs with minimalist contemporary architecture"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[78%_center]"
              />
            </div>

            <div className="max-w-xl">
              <h2
                id="vehicle-overview-heading"
                className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl"
              >
                Designed Around the Way You Drive.
              </h2>
              <p className="text-muted-foreground mt-7 text-base leading-7 sm:text-lg sm:leading-8">
                The VinFast VF7 combines electric performance, intelligent
                technology and everyday practicality. Factor One develops
                accessories specifically for the VF7, ensuring every product
                complements the car&apos;s design while solving real ownership
                needs.
              </p>

              <dl className="border-border mt-10 border-t">
                {vf7OverviewHighlights.map(([term, description]) => (
                  <div
                    key={term}
                    className="border-border border-b py-5 sm:py-6"
                  >
                    <dt className="text-lg font-medium tracking-[-0.025em]">
                      {term}
                    </dt>
                    <dd className="text-muted-foreground mt-1.5 text-sm leading-6 sm:text-base">
                      {description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="featured-products"
        className="section-space scroll-mt-24"
        aria-labelledby="featured-products-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <h2
              id="featured-products-heading"
              className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl"
            >
              Featured Accessories
            </h2>
            <p className="text-muted-foreground mt-5 text-lg leading-8">
              Carefully selected accessories engineered specifically for the
              VinFast VF7.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {vf7FeaturedProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </Container>
      </section>

      <section
        id="vehicle-categories"
        className="scroll-mt-24 py-16 sm:py-20 lg:py-12"
        aria-labelledby="vehicle-categories-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <h2
              id="vehicle-categories-heading"
              className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl"
            >
              Browse by Category
            </h2>
            <p className="text-muted-foreground mt-5 text-lg leading-8">
              Start with the part of your VF7 you want to protect or improve.
            </p>
          </div>

          <div
            className="mt-8"
            role="group"
            aria-label="VF7 accessory categories"
          >
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {vf7Categories.map((category) => (
                <li key={category.name}>
                  <CategoryCard {...category} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        id="ownership-resources"
        className="section-space scroll-mt-24"
        aria-labelledby="ownership-resources-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <h2
              id="ownership-resources-heading"
              className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl"
            >
              Ownership Resources
            </h2>
            <p className="text-muted-foreground mt-5 text-lg leading-8">
              Everything you need to install, maintain and get the most from
              your VinFast VF7 accessories.
            </p>
          </div>

          <div className="mt-14 grid gap-x-16 gap-y-0 md:grid-cols-2 lg:mt-16 lg:gap-x-24">
            {vf7OwnershipResources.map((resource) => (
              <ResourceCard key={resource.title} {...resource} />
            ))}
          </div>
        </Container>
      </section>

      <section
        id="vehicle-cta"
        className="section-space scroll-mt-24"
        aria-labelledby="vehicle-cta-heading"
      >
        <Container>
          <div className="mx-auto max-w-[44rem] text-center">
            <h2
              id="vehicle-cta-heading"
              className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl"
            >
              Ready to Personalise Your VF7?
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-8">
              Explore accessories engineered specifically for your car and
              designed to enhance every journey.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <ScrollLink href="#featured-products">
                  Explore All Accessories
                </ScrollLink>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled
                aria-disabled="true"
                className="rounded-full px-6"
              >
                Contact Factor One — Coming soon
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
