import Link from 'next/link';
import { Wordmark } from '@/components/brand/wordmark';
import { Container } from '@/components/layout/container';
import { footerNavigation } from '@/config/navigation';

export function Footer() {
  return (
    <footer className="bg-charcoal text-charcoal-foreground">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,0.7fr))]">
          <div className="max-w-sm">
            <Wordmark as="p" size="footer" />
            <p className="text-charcoal-foreground/60 mt-4 text-sm leading-6">
              Accessories for VinFast owners, shaped by the people who drive
              them.
            </p>
          </div>
          {footerNavigation.map((group) => (
            <section
              key={group.label}
              aria-labelledby={`footer-${group.label.toLowerCase()}`}
            >
              <h2
                id={`footer-${group.label.toLowerCase()}`}
                className="text-charcoal-foreground text-sm font-semibold"
              >
                {group.label}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-charcoal-foreground/60 hover:text-charcoal-foreground focus-visible:ring-charcoal-foreground focus-visible:ring-offset-charcoal inline-flex min-h-11 items-center text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="border-charcoal-foreground/15 mt-12 border-t pt-6 sm:mt-16">
          <p className="text-charcoal-foreground/50 text-sm">
            © {new Date().getFullYear()} Factor One. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
