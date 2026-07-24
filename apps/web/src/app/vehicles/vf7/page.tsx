import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/layout/container';
import { CategoryCard } from '@/components/product/category-card';
import { ProductCard } from '@/components/product/product-card';
import { ResourceCard } from '@/components/resource/resource-card';
import { Button } from '@/components/ui/button';
import { ScrollLink } from '@/components/ui/scroll-link';

export const metadata: Metadata = {
  title: 'VinFast VF7',
  description: 'Factor One products engineered for the VinFast VF7.',
};

const featuredProducts = [
  {
    name: 'All-Weather Floor Mats',
    description: 'Everyday protection tailored to the VF7 interior.',
    price: '₹5,990',
    href: '/vehicles/vf7/products/all-weather-floor-mats',
    image: '/images/essentials/floor-mats.jpg',
  },
  {
    name: 'Premium Parcel Tray',
    description: 'A refined way to keep the rear cargo area organized.',
    price: '₹4,490',
    href: '/vehicles/vf7/products/premium-parcel-tray',
    image: '/images/essentials/trunk-organizer.jpg',
  },
  {
    name: 'Tempered Screen Protector',
    description: 'Clear, durable protection for your central display.',
    price: '₹1,990',
    href: '/vehicles/vf7/products/tempered-screen-protector',
    image: '/images/essentials/screen-protector.jpg',
  },
  {
    name: 'Center Console Organizer',
    description: 'Purposeful storage for the details you carry daily.',
    price: '₹2,990',
    href: '/vehicles/vf7/products/center-console-organizer',
    image: '/images/essentials/trunk-organizer.jpg',
  },
];

const vehicleCategories = [
  { name: 'Interior', description: 'Refined details for the cabin.', href: '/vehicles/vf7/categories/interior', image: '/images/categories/interior.jpg' },
  { name: 'Exterior', description: 'Considered protection from every angle.', href: '/vehicles/vf7/categories/exterior', image: '/images/categories/exterior.jpg' },
  { name: 'Protection', description: 'Made to preserve what matters.', href: '/vehicles/vf7/categories/protection', image: '/images/categories/protection.jpg' },
  { name: 'Storage', description: 'Space designed around real life.', href: '/vehicles/vf7/categories/storage', image: '/images/categories/storage.jpg' },
  { name: 'Electronics', description: 'Technology that integrates cleanly.', href: '/vehicles/vf7/categories/electronics', image: '/images/categories/lifestyle.jpg' },
  { name: 'Charging', description: 'Power for your everyday routine.', href: '/vehicles/vf7/categories/charging', image: '/images/categories/charging.jpg' },
];

const ownershipResources = [
  { title: 'Installation Guides', description: 'View step-by-step installation instructions.', href: '/support/installation-guides' },
  { title: 'Warranty', description: 'Understand coverage and claims.', href: '/support/warranty' },
  { title: 'Care & Maintenance', description: 'Learn how to maximise product life.', href: '/support/care-and-maintenance' },
  { title: 'Frequently Asked Questions', description: 'Quick answers to common questions.', href: '/support/faq' },
];

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
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-28">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src="/images/hero-suv.jpg"
                alt="Graphite VinFast VF7 electric SUV with minimalist contemporary architecture"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[78%_center]"
              />
            </div>

            <div className="max-w-xl">
              <h2 id="vehicle-overview-heading" className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Designed Around the Way You Drive.
              </h2>
              <p className="mt-7 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                The VinFast VF7 combines electric performance, intelligent technology and everyday practicality. Factor One develops accessories specifically for the VF7, ensuring every product complements the vehicle&apos;s design while solving real ownership needs.
              </p>

              <dl className="mt-10 border-t border-border">
                {[
                  ['Precision Fit', 'Designed specifically for the VF7.'],
                  ['Daily Practicality', 'Accessories created around real ownership.'],
                  ['Premium Quality', 'Materials selected for long-term durability.'],
                ].map(([term, description]) => (
                  <div key={term} className="border-b border-border py-5 sm:py-6">
                    <dt className="text-lg font-medium tracking-[-0.025em]">{term}</dt>
                    <dd className="mt-1.5 text-sm leading-6 text-muted-foreground sm:text-base">{description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section id="featured-products" className="scroll-mt-[4.5rem] section-space" aria-labelledby="featured-products-heading">
        <Container>
          <div className="max-w-2xl">
            <h2 id="featured-products-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Featured Accessories
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">Carefully selected accessories engineered specifically for the VinFast VF7.</p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </Container>
      </section>

      <section id="vehicle-categories" className="scroll-mt-[4.5rem] section-space" aria-labelledby="vehicle-categories-heading">
        <Container>
          <div className="max-w-2xl">
            <h2 id="vehicle-categories-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Browse by Category
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">Find accessories designed for every part of your VF7.</p>
          </div>

          <nav className="mt-14 lg:mt-16" aria-label="VF7 accessory categories">
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16">
              {vehicleCategories.map((category) => (
                <li key={category.name}>
                  <CategoryCard {...category} />
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <section id="ownership-resources" className="scroll-mt-[4.5rem] section-space" aria-labelledby="ownership-resources-heading">
        <Container>
          <div className="max-w-2xl">
            <h2 id="ownership-resources-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Ownership Resources
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Everything you need to install, maintain and get the most from your VinFast VF7 accessories.
            </p>
          </div>

          <div className="mt-14 grid gap-x-16 gap-y-0 md:grid-cols-2 lg:mt-16 lg:gap-x-24">
            {ownershipResources.map((resource) => (
              <ResourceCard key={resource.title} {...resource} />
            ))}
          </div>
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
