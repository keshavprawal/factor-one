import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main
      className="section-space flex min-h-[calc(100svh-4.5rem)] items-center"
      id="main-content"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
            Page not found
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            This page does not exist.
          </h1>
          <p className="text-muted-foreground mt-6 text-base leading-7 sm:text-lg">
            Return to Factor One to continue exploring accessories built with
            owners.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full px-7">
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </Container>
    </main>
  );
}
