import Link from 'next/link';
import { Instagram, Mail, MessageCircle } from 'lucide-react';
import { Wordmark } from '@/components/brand/wordmark';
import { Container } from '@/components/layout/container';
import { brandContactLinks } from '@/config/brand-contact';
import { footerNavigation } from '@/config/navigation';

const contactIcons = {
  email: Mail,
  instagram: Instagram,
  whatsapp: MessageCircle,
} as const;

export function Footer() {
  return (
    <footer
      className="bg-charcoal text-charcoal-foreground flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Factor One footer"
    >
      <Container className="flex flex-1 flex-col justify-end pb-10 pt-12 sm:pb-12 sm:pt-16">
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
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {brandContactLinks.map((contact) => {
                const Icon = contactIcons[contact.icon];
                return (
                  <Link
                    key={contact.id}
                    href={contact.href}
                    aria-label={contact.srLabel}
                    className="motion-safe-transition text-charcoal-foreground/62 hover:text-charcoal-foreground focus-visible:ring-charcoal-foreground focus-visible:ring-offset-charcoal inline-flex min-h-11 items-center gap-2 rounded-sm text-left transition-colors"
                    {...(contact.external
                      ? { rel: 'noopener noreferrer', target: '_blank' }
                      : {})}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span>{contact.label}</span>
                  </Link>
                );
              })}
            </div>
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
                {group.label === 'Ownership' ? (
                  <Link
                    href="/ownership"
                    className="focus-visible:ring-charcoal-foreground focus-visible:ring-offset-charcoal rounded-sm"
                  >
                    {group.label}
                  </Link>
                ) : (
                  group.label
                )}
              </h2>
              {(() => {
                const items = group.items.filter(
                  (item) =>
                    !(
                      group.label === 'Ownership' &&
                      'href' in item &&
                      item.href === '/ownership'
                    ),
                );
                const renderItems = (columnItems: typeof items) =>
                  columnItems.map((item) => (
                    <li key={item.id}>
                      {'href' in item ? (
                        <Link
                          href={item.href}
                          className="motion-safe-transition text-charcoal-foreground/62 hover:text-charcoal-foreground focus-visible:ring-charcoal-foreground focus-visible:ring-offset-charcoal inline-flex min-h-11 min-w-11 items-center justify-self-start text-left text-sm transition-[color,transform] active:translate-y-px"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span
                          aria-disabled="true"
                          className="text-charcoal-foreground/42 inline-flex min-h-11 min-w-11 items-center text-left text-sm"
                        >
                          {item.label}
                        </span>
                      )}
                    </li>
                  ));

                return group.label === 'Ownership' ? (
                  <div className="mt-3 grid items-start gap-x-5 sm:grid-cols-2">
                    <ul className="min-w-0 text-left">
                      {renderItems(items.slice(0, 4))}
                    </ul>
                    <ul className="min-w-0 text-left">
                      {renderItems(items.slice(4))}
                    </ul>
                  </div>
                ) : (
                  <ul className="mt-3">{renderItems(items)}</ul>
                );
              })()}
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
        aria-label="Factor One"
        className="flex translate-y-[0.06em] gap-[0.12em] whitespace-nowrap px-4 text-[clamp(5.5rem,18vw,17rem)] font-semibold leading-[0.72] tracking-[-0.045em] sm:gap-[0.16em] sm:px-6 lg:px-8"
        data-footer-ending="true"
      >
        <span>Factor</span>
        <span>One</span>
      </p>
    </footer>
  );
}
