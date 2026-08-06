import Link from 'next/link';
import { Wordmark } from '@/components/brand/wordmark';
import { Container } from '@/components/layout/container';
import { footerNavigation } from '@/config/navigation';

export function Footer() {
  return (
    <footer
      className="bg-charcoal text-charcoal-foreground overflow-hidden"
      aria-label="Factor One footer"
    >
      <Container className="pb-10 pt-12 sm:pb-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,0.85fr))] lg:gap-8">
          <div className="max-w-sm">
            <Wordmark as="p" size="footer" />
            <p className="text-charcoal-foreground/62 mt-3 text-sm leading-6">
              Accessories for VinFast owners, shaped by the people who drive
              them.
            </p>
            <p className="text-charcoal-foreground mt-5 text-sm font-medium">
              By VinFast owners, for VinFast owners.
            </p>
          </div>
          {footerNavigation.map((group) => (
            <section
              key={group.label}
              aria-labelledby={`footer-${group.label.toLowerCase()}`}
            >
              <h2
                id={`footer-${group.label.toLowerCase()}`}
                className="text-factor-red text-xs font-semibold uppercase tracking-[0.14em]"
              >
                {group.label}
              </h2>
              <ul
                className={
                  group.label === 'Ownership'
                    ? 'mt-3 grid grid-cols-2 gap-x-5'
                    : 'mt-3'
                }
              >
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="motion-safe-transition text-charcoal-foreground/62 hover:text-charcoal-foreground focus-visible:ring-charcoal-foreground focus-visible:ring-offset-charcoal inline-flex min-h-11 min-w-11 items-center text-sm transition-[color,transform] active:translate-y-px"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="border-charcoal-foreground/15 mt-10 border-t pt-5">
          <p className="text-charcoal-foreground/50 text-xs sm:text-sm">
            © {new Date().getFullYear()} Factor One. All rights reserved.
          </p>
        </div>
      </Container>

      <p
        className="translate-y-[0.06em] whitespace-nowrap px-4 text-[clamp(5.5rem,18vw,17rem)] font-semibold leading-[0.72] tracking-[-0.085em] [word-spacing:0.08em] sm:px-6 lg:px-8"
        data-footer-ending="true"
      >
        Factor One
      </p>
    </footer>
  );
}
