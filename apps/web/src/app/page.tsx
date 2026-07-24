import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

const vehicles = [
  {
    name: 'VF6',
    description: 'Designed for everyday electric mobility.',
    href: '/vehicles/vf6',
    imagePosition: 'object-[20%_center]',
  },
  {
    name: 'VF7',
    description: 'Designed for drivers who expect more.',
    href: '/vehicles/vf7',
    imagePosition: 'object-[80%_center]',
  },
];

export default function Home() {
  return (
    <>
      <section className="relative -mt-[4.5rem] flex min-h-[100svh] overflow-hidden pt-[4.5rem]" aria-labelledby="hero-heading">
        <Image
          src="/images/hero-suv.jpg"
          alt="A graphite premium SUV outside a minimalist contemporary residence"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.32),rgba(255,255,255,0)_62%)]" aria-hidden="true" />

        <Container className="relative z-10 flex flex-1 items-center justify-center py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl text-center">
            <h1
              id="hero-heading"
              className="animate-hero-rise text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Designed to Belong.
            </h1>
            <p className="mx-auto mt-6 max-w-xl animate-hero-fade text-lg leading-8 text-foreground/80 [animation-delay:140ms] sm:text-xl">
              Premium automotive products engineered specifically for your vehicle.
            </p>
            <div className="mt-9 flex animate-hero-fade flex-col justify-center gap-3 [animation-delay:280ms] sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/vehicles">
                  Explore Your Vehicle
                  <ArrowUpRight className="ml-2 size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-foreground/25 bg-white/55 px-6 backdrop-blur-sm">
                <Link href="/about">Our Philosophy</Link>
              </Button>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground/65 sm:flex" aria-hidden="true">
          <span>Scroll</span>
          <ArrowDown className="size-3.5" />
        </div>
      </section>

      <section id="why-factor-one" className="scroll-mt-[4.5rem] bg-background section-space" aria-labelledby="why-factor-one-heading">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-24 xl:gap-32">
            <div className="max-w-xl animate-hero-rise">
              <h2 id="why-factor-one-heading" className="text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Engineered for the Vehicle. Not Adapted to It.
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-8 text-muted-foreground">
                <p>Most aftermarket accessories are designed to fit many vehicles.</p>
                <p>Factor One takes a different approach.</p>
                <p>Every product begins with the vehicle itself, resulting in cleaner integration, better fit, and a more refined ownership experience.</p>
              </div>
            </div>

            <ol className="animate-hero-rise border-t border-border [animation-delay:120ms]">
              {[
                ['Vehicle Specific', 'Designed around the vehicle from the beginning.'],
                ['Precision Fit', 'Clean integration with factory design.'],
                ['Premium Materials', 'Built to last through everyday ownership.'],
                ['Thoughtful Engineering', 'Every detail exists for a reason.'],
              ].map(([title, description], index) => (
                <li key={title} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-border py-7 sm:grid-cols-[3rem_1fr] sm:py-8">
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">{title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="vehicle-selector" className="scroll-mt-[4.5rem] bg-background section-space" aria-labelledby="vehicle-selector-heading">
        <Container>
          <div className="mx-auto max-w-2xl text-center animate-hero-rise">
            <h2 id="vehicle-selector-heading" className="text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Which vehicle do you drive?
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Select your vehicle to explore products engineered specifically for it.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12">
            {vehicles.map((vehicle) => (
              <article key={vehicle.name} className="group animate-hero-rise [animation-delay:140ms]">
                <Link href={vehicle.href} className="block overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src="/images/hero-suv.jpg"
                      alt={`${vehicle.name} electric vehicle`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={`object-cover ${vehicle.imagePosition} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                    />
                  </div>
                  <div className="flex items-end justify-between gap-6 pt-6">
                    <div>
                      <h3 className="text-3xl font-semibold tracking-[-0.04em]">{vehicle.name}</h3>
                      <p className="mt-2 text-base text-muted-foreground">{vehicle.description}</p>
                    </div>
                    <Button asChild className="shrink-0 rounded-full px-5">
                      <span>Explore {vehicle.name}</span>
                    </Button>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center sm:mt-20">
            <p className="text-sm font-medium text-muted-foreground">Coming Soon</p>
            <p className="mt-3 text-sm tracking-[0.12em] text-foreground/70">Tesla&nbsp;&nbsp;&nbsp; BYD&nbsp;&nbsp;&nbsp; Toyota</p>
          </div>
        </Container>
      </section>
    </>
  );
}
