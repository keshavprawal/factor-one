import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

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
    </>
  );
}
