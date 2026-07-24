import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { footerNavigation } from '@/config/navigation';

export function Footer() {
  return (
    <footer className="border-border border-t bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          {footerNavigation.map((group) => (
            <section
              key={group.label}
              aria-labelledby={`footer-${group.label.toLowerCase()}`}
            >
              <h2
                id={`footer-${group.label.toLowerCase()}`}
                className="text-foreground text-sm font-semibold"
              >
                {group.label}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="border-border mt-12 border-t pt-6 sm:mt-16">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Factor One. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
