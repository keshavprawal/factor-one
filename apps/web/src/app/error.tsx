'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="section-space" id="main-content">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-factor-red text-xs font-semibold uppercase tracking-[0.16em]">
            Something went wrong
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            We could not load this page.
          </h1>
          <p className="text-muted-foreground mt-6 text-base leading-7 sm:text-lg">
            Try again, or return home if the problem continues.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" className="rounded-full px-7" onClick={reset}>
              Try again
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-7"
            >
              <Link href="/">Return home</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
