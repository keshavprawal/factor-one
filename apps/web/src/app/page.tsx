import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Wordmark } from '@/components/brand/wordmark';
import { FeaturedProductsCarousel } from '@/components/home/featured-products-carousel';
import { RoadmapCard } from '@/components/home/roadmap-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { ScrollLink } from '@/components/ui/scroll-link';
import {
  featuredProducts,
  knowledgeTopics,
  proofPoints,
  roadmapItems,
} from '@/config/homepage';

const sectionHeadingClassName =
  'text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl';

export default function Home() {
  return (
    <>
      <section
        className="bg-warm overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-16 lg:pb-32"
        aria-labelledby="homepage-hero-heading"
      >
        <Container>
          <div className="overflow-hidden pb-10 text-center">
            <Wordmark
              as="p"
              size="display"
              className="mx-auto whitespace-nowrap"
            />
            <p className="text-muted-foreground mt-5 text-sm leading-6 sm:mt-6 sm:text-base">
              By The VinFast owners, for The VinFast owners.
            </p>
          </div>

          <div className="border-border grid items-center gap-12 border-t pt-12 sm:pt-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(25rem,1.08fr)] lg:gap-20">
            <div className="max-w-2xl">
              <h1
                id="homepage-hero-heading"
                className="text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
              >
                Accessories that belong on your car.
              </h1>
              <p className="text-muted-foreground mt-7 max-w-xl text-lg leading-8 sm:text-xl">
                Designed by VinFast owners who understand it better.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-w-48 rounded-full bg-transparent px-6"
                >
                  <ScrollLink href="#explore-my-car">Explore My Car</ScrollLink>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-w-48 rounded-full bg-transparent px-6"
                >
                  <ScrollLink href="#explore-accessories">
                    Explore Accessories
                  </ScrollLink>
                </Button>
              </div>
            </div>

            <figure>
              <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/essentials/screen-protector.jpg"
                  alt="Screen guard positioned over a car display"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-muted-foreground mt-4 text-xs leading-5">
                Repository product close-up — final Factor One photography
                pending.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section
        className="section-space bg-white"
        aria-labelledby="discovery-heading"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
              Start where it makes sense
            </p>
            <h2
              id="discovery-heading"
              className={`${sectionHeadingClassName} mt-4`}
            >
              Your car, or the problem you want to solve.
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-8">
              Begin with the VinFast you drive, or go straight to the accessory
              you have in mind.
            </p>
          </div>

          <Grid columns={2} gap="lg" className="mt-12 lg:mt-16">
            <Card
              id="explore-my-car"
              className="bg-warm scroll-mt-28 border-0 p-6 shadow-none sm:p-9"
            >
              <CardContent className="p-0">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.14em]">
                  My Car
                </p>
                <CardTitle className="mt-4 text-3xl font-medium tracking-[-0.045em]">
                  Start with the right fit.
                </CardTitle>
                <CardDescription className="mt-4 max-w-md text-base leading-7">
                  Choose your car before exploring what Factor One is building
                  for it.
                </CardDescription>
                <div className="border-border mt-8 border-t">
                  <Link
                    href="/vehicles/vf7"
                    className="group flex min-h-16 items-center justify-between gap-4 border-b py-3 font-medium"
                  >
                    VinFast VF7
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </Link>
                  <div
                    className="text-muted-foreground flex min-h-16 items-center justify-between gap-4 border-b py-3"
                    aria-label="VinFast VF6, coming soon"
                  >
                    <span className="font-medium">VinFast VF6</span>
                    <span className="text-xs uppercase tracking-[0.12em]">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              id="explore-accessories"
              className="bg-warm scroll-mt-28 border-0 p-6 shadow-none sm:p-9"
            >
              <CardContent className="p-0">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.14em]">
                  Accessories
                </p>
                <CardTitle className="mt-4 text-3xl font-medium tracking-[-0.045em]">
                  Start with what your car needs.
                </CardTitle>
                <CardDescription className="mt-4 max-w-md text-base leading-7">
                  Explore the problems Factor One is working on with VinFast
                  owners.
                </CardDescription>
                <ul className="border-border mt-8 border-t">
                  {featuredProducts.map((product) => (
                    <li key={product.id} className="border-border border-b">
                      <ScrollLink
                        href={`#product-${product.id}`}
                        className="group flex min-h-14 items-center justify-between gap-4 py-2 text-sm font-medium"
                      >
                        {product.name}
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                          aria-hidden="true"
                        />
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </section>

      <section
        id="featured-products"
        className="section-space bg-muted/60 scroll-mt-28 overflow-hidden"
        aria-labelledby="featured-products-heading"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end">
            <div>
              <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
                Current product direction
              </p>
              <h2
                id="featured-products-heading"
                className={`${sectionHeadingClassName} mt-4`}
              >
                Built around the problems owners notice.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xl text-base leading-7 lg:justify-self-end">
              These are the accessories Factor One is shaping now. Final
              photography, availability, and purchase details are not yet
              published.
            </p>
          </div>
          <div className="mt-14 lg:mt-20">
            <FeaturedProductsCarousel products={featuredProducts} />
          </div>
        </Container>
      </section>

      <section
        id="built-with-owners"
        className="section-space bg-charcoal text-charcoal-foreground scroll-mt-28"
        aria-labelledby="built-with-owners-heading"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
                Built with Owners
              </p>
              <h2
                id="built-with-owners-heading"
                className={`${sectionHeadingClassName} mt-4`}
              >
                See what owners want Factor One to solve next.
              </h2>
            </div>
            <p className="text-charcoal-foreground/65 max-w-xl text-base leading-7 lg:justify-self-end">
              This is a first look at the product roadmap. Owner ideas move
              through research, design, prototypes, and testing before they
              become products.
            </p>
          </div>

          <Grid columns={3} gap="lg" className="mt-14 lg:mt-20">
            {roadmapItems.map((item) => (
              <RoadmapCard key={item.title} {...item} />
            ))}
          </Grid>
        </Container>
      </section>

      <section
        id="knowledge"
        className="section-space bg-warm scroll-mt-28"
        aria-labelledby="knowledge-heading"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div className="max-w-xl">
              <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
                Knowledge
              </p>
              <h2
                id="knowledge-heading"
                className={`${sectionHeadingClassName} mt-4`}
              >
                Know what fits before it reaches your car.
              </h2>
              <p className="text-muted-foreground mt-6 text-lg leading-8">
                Useful products need useful guidance. Factor One is building the
                information owners need around fit, installation, and care.
              </p>
            </div>

            <div className="border-border border-t">
              {knowledgeTopics.map((topic) => (
                <article
                  key={topic.index}
                  className="border-border grid gap-3 border-b py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5 sm:py-8"
                >
                  <p className="text-factor-red text-xs font-semibold tracking-[0.12em]">
                    {topic.index}
                  </p>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                      {topic.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-6 sm:text-base sm:leading-7">
                      {topic.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="why-factor-one"
        className="section-space bg-muted/50 scroll-mt-28"
        aria-labelledby="why-factor-one-heading"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div className="max-w-xl">
              <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
                Why Factor One
              </p>
              <h2
                id="why-factor-one-heading"
                className={`${sectionHeadingClassName} mt-4`}
              >
                By the owners. For the owners.
              </h2>
              <p className="text-muted-foreground mt-6 text-lg leading-8">
                We start with the problems people notice while living with the
                same cars—not with a target catalogue size.
              </p>
            </div>

            <div className="border-border border-t">
              {proofPoints.map((point) => (
                <article
                  key={point.title}
                  className="border-border border-b py-7 sm:py-8"
                >
                  <h3 className="text-2xl font-medium tracking-[-0.035em]">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 max-w-lg text-base leading-7">
                    {point.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="border-border mt-16 border-t pt-12 sm:mt-24 sm:pt-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-20">
              <div>
                <p className="text-factor-red text-sm font-semibold uppercase tracking-[0.18em]">
                  PPF
                </p>
                <h3 className="mt-4 text-3xl font-medium tracking-[-0.045em]">
                  Our product standard.
                </h3>
                <p className="text-muted-foreground mt-4 text-sm leading-6">
                  Here, PPF means Purpose, Protection, Fit—not Paint Protection
                  Film.
                </p>
              </div>
              <Grid columns={3} gap="lg">
                {[
                  [
                    'Purpose',
                    'It solves a real problem owners have with their car.',
                  ],
                  [
                    'Protection',
                    'It helps care for the parts of the car owners use.',
                  ],
                  [
                    'Fit',
                    'It is designed around the intended car and how owners use it.',
                  ],
                ].map(([title, description]) => (
                  <article key={title}>
                    <h4 className="text-xl font-medium tracking-[-0.025em]">
                      {title}
                    </h4>
                    <p className="text-muted-foreground mt-3 text-sm leading-6">
                      {description}
                    </p>
                  </article>
                ))}
              </Grid>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
