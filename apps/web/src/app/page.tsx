import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { CategoryCard } from '@/components/product/category-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { ScrollLink } from '@/components/ui/scroll-link';
import {
  homepageCategories,
  homepagePrinciples,
  homepageResources,
} from '@/config/homepage';

const sectionHeadingClassName =
  'text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl';

export default function Home() {
  return (
    <>
      <section
        className="relative -mt-[4.5rem] flex min-h-[min(46rem,100svh)] overflow-hidden pt-[4.5rem]"
        aria-labelledby="hero-heading"
      >
        <Image
          src="/images/hero-suv.jpg"
          alt="Premium electric vehicles outside a minimalist contemporary residence"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/35 to-white/80"
          aria-hidden="true"
        />

        <Container className="relative z-10 flex flex-1 items-center py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-foreground/70 text-sm font-medium uppercase tracking-[0.16em]">
              Factor One
            </p>
            <h1
              id="hero-heading"
              className="mt-5 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Own Your Car With Confidence.
            </h1>
            <p className="text-foreground/80 mt-6 max-w-xl text-lg leading-8 sm:text-xl">
              Factor One helps you choose the right products, understand your
              vehicle, and make confident ownership decisions.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <ScrollLink href="#featured-categories">
                  Explore Products
                  <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                </ScrollLink>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground/25 rounded-full bg-white/70 px-6"
              >
                <ScrollLink href="#why-factor-one">Learn More</ScrollLink>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="section-space scroll-mt-[4.5rem]"
        aria-labelledby="principles-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.14em]">
              A clearer standard
            </p>
            <h2
              id="principles-heading"
              className={`${sectionHeadingClassName} mt-4`}
            >
              Guidance that earns its place.
            </h2>
          </div>
          <Grid columns={3} gap="lg" className="mt-12 lg:mt-16">
            {homepagePrinciples.map((principle) => (
              <Card
                key={principle.title}
                className="border-border bg-card h-full p-6 shadow-none sm:p-8"
              >
                <CardContent className="p-0">
                  <CardTitle className="text-2xl font-medium tracking-[-0.035em]">
                    {principle.title}
                  </CardTitle>
                  <CardDescription className="mt-4 text-base leading-7">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      <section
        id="featured-categories"
        className="section-space bg-muted/35 scroll-mt-[4.5rem]"
        aria-labelledby="categories-heading"
      >
        <Container>
          <div className="flex max-w-2xl flex-col gap-5">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.14em]">
              Start with what matters
            </p>
            <h2 id="categories-heading" className={sectionHeadingClassName}>
              Explore the parts of ownership you want to improve.
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg leading-8">
              Browse considered areas of ownership. Product availability and
              compatibility will be made clear before you choose.
            </p>
          </div>
          <Grid columns={3} gap="lg" className="mt-12 lg:mt-16">
            {homepageCategories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </Grid>
        </Container>
      </section>

      <section
        id="why-factor-one"
        className="section-space scroll-mt-[4.5rem]"
        aria-labelledby="why-factor-one-heading"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
            <h2 id="why-factor-one-heading" className={sectionHeadingClassName}>
              Better information makes better ownership decisions.
            </h2>
            <div className="text-muted-foreground max-w-xl space-y-5 text-lg leading-8">
              <p>
                Factor One is built to reduce uncertainty, not add more options
                for their own sake.
              </p>
              <p>
                We help you understand what matters, choose with confidence, and
                enjoy ownership with less second-guessing.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="section-space bg-muted/35"
        aria-labelledby="knowledge-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.14em]">
              Knowledge
            </p>
            <h2
              id="knowledge-heading"
              className={`${sectionHeadingClassName} mt-4`}
            >
              Make each next step easier to understand.
            </h2>
          </div>
          <Grid columns={4} gap="default" className="mt-12 lg:mt-16">
            {homepageResources.map((resource) => (
              <Card
                key={resource.title}
                className="border-border bg-card h-full p-6 shadow-none sm:p-7"
              >
                <CardContent className="p-0">
                  <CardTitle className="text-xl font-medium tracking-[-0.03em]">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="mt-3 text-sm leading-6">
                    {resource.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </section>

      <section className="section-space" aria-labelledby="homepage-cta-heading">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="homepage-cta-heading" className={sectionHeadingClassName}>
              Ready to build your garage?
            </h2>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-8">
              Start by exploring the areas of ownership that matter most to you.
            </p>
            <Button asChild size="lg" className="mt-9 rounded-full px-7">
              <ScrollLink href="#featured-categories">
                Get Started
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </ScrollLink>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
