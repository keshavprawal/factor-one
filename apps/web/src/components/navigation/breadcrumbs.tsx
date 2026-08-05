import Link from 'next/link';

export interface BreadcrumbItem {
  href?: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: readonly BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex items-center gap-2"
            >
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="motion-safe-transition hover:text-foreground inline-flex min-h-11 items-center transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
