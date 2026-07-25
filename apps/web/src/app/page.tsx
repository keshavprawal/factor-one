import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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
import { homepagePrinciples } from '@/config/homepage';

const sectionHeadingClassName =
  'text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl';

export default function Home() {
  return (
    <>
      <section
        className="section-space"
        aria-labelledby="homepage-hero-heading"
      >
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)] lg:gap-16 xl:gap-24">
            <div className="max-w-2xl">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.14em]">
                Clearer choices for your car
              </p>
              <h1
                id="homepage-hero-heading"
                className="mt-5 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
              >
                Choose what belongs on your car.
              </h1>
              <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8 sm:text-xl">
                Factor One helps you understand what fits, why it matters, and
                which products are worth considering.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-full px-6">
                  <Link href="/vehicles/vf7">
                    Explore the VF7
                    <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6"
                >
                  <ScrollLink href="#why-factor-one">
                    How Factor One helps
                  </ScrollLink>
                </Button>
              </div>
            </div>

            <figure>
              <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/images/essentials/screen-protector.jpg"
                  alt="Screen protector positioned over a vehicle display"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="text-muted-foreground mt-4 max-w-md text-sm leading-6">
                A considered product starts with a clear purpose and the right
                fit for the vehicle.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section
        className="section-space bg-muted/35"
        aria-labelledby="vehicle-collection-heading"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
            <div className="max-w-xl">
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.14em]">
                Start with the vehicle
              </p>
              <h2
                id="vehicle-collection-heading"
                className={`${sectionHeadingClassName} mt-4`}
              >
                The right product starts with the right fit.
              </h2>
              <p className="text-muted-foreground mt-6 text-lg leading-8">
                Begin with the current Factor One vehicle experience.
              </p>
            </div>

            <Link
              href="/vehicles/vf7"
              className="focus-visible:ring-ring group block rounded-lg transition-transform duration-200 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-4 motion-reduce:transform-none"
            >
              <article>
                <div className="bg-muted relative aspect-[16/10] overflow-hidden rounded-lg">
                  <Image
                    src="/images/hero-suv.jpg"
                    alt="Graphite VinFast VF7 outside a contemporary residence"
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-[80%_center] transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                  />
                </div>
                <div className="flex items-end justify-between gap-6 pt-5">
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
                      VinFast VF7
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      Explore the current Factor One vehicle experience.
                    </p>
                  </div>
                  <ArrowRight
                    className="mb-1 size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </div>
              </article>
            </Link>
          </div>
        </Container>
      </section>

      <section
        id="why-factor-one"
        className="section-space scroll-mt-[4.5rem]"
        aria-labelledby="why-factor-one-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.14em]">
              Why Factor One
            </p>
            <h2
              id="why-factor-one-heading"
              className={`${sectionHeadingClassName} mt-4`}
            >
              Less uncertainty. Better ownership decisions.
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
              Factor One focuses on the information owners need before deciding
              what belongs on their vehicle.
            </p>
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
        className="section-space bg-muted/35"
        aria-labelledby="engineering-philosophy-heading"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-24">
            <div>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-[0.14em]">
                Engineering philosophy
              </p>
              <h2
                id="engineering-philosophy-heading"
                className={`${sectionHeadingClassName} mt-4`}
              >
                Every product should earn its place.
              </h2>
            </div>

            <div className="border-border border-t">
              {[
                [
                  'Solve a real problem',
                  'A product should make ownership meaningfully better.',
                ],
                [
                  'Integrate naturally',
                  'Fit and usability should feel considered from the start.',
                ],
                [
                  'Deliver long-term value',
                  'Quality should support everyday ownership over time.',
                ],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="border-border border-b py-7 sm:py-8"
                >
                  <h3 className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-lg text-base leading-7">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space" aria-labelledby="homepage-cta-heading">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="homepage-cta-heading" className={sectionHeadingClassName}>
              Start with your vehicle.
            </h2>
            <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg leading-8">
              Explore the Factor One experience for the VinFast VF7.
            </p>
            <Button asChild size="lg" className="mt-9 rounded-full px-7">
              <Link href="/vehicles/vf7">
                Explore the VF7
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
