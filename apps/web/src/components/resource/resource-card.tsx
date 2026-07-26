import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface ResourceCardProps {
  description: string;
  href?: string;
  title: string;
}

function ResourceContent({ description, href, title }: ResourceCardProps) {
  return (
    <>
      <div>
        <h3 className="text-2xl font-medium tracking-[-0.035em]">{title}</h3>
        <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6 sm:text-base">
          {description}
        </p>
      </div>
      {href ? (
        <ArrowRight
          className="motion-safe-transition mt-8 size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
          aria-hidden="true"
        />
      ) : (
        <span className="text-muted-foreground mt-8 text-xs font-medium uppercase tracking-[0.1em]">
          Coming soon
        </span>
      )}
    </>
  );
}

export function ResourceCard(props: ResourceCardProps) {
  const className =
    'motion-safe-transition border-border focus-visible:ring-ring group flex h-full min-h-44 flex-col justify-between border-t py-6 transition-transform focus-visible:ring-2 focus-visible:ring-offset-4 motion-reduce:transform-none sm:py-7';

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={`${className} hover:-translate-y-1 focus-visible:-translate-y-1 active:translate-y-0`}
      >
        <ResourceContent {...props} />
      </Link>
    );
  }

  return (
    <article className={className} aria-label={`${props.title}, coming soon`}>
      <ResourceContent {...props} />
    </article>
  );
}
