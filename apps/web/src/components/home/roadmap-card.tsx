import { ThumbsUp } from 'lucide-react';
import type { RoadmapItem } from '@/config/homepage';

export function RoadmapCard({
  agreementCount,
  raisedBy,
  status,
  title,
}: RoadmapItem) {
  return (
    <article className="border-charcoal-foreground/15 flex min-h-64 flex-col border-t pt-6">
      <div className="flex items-start justify-between gap-5">
        <p className="text-charcoal-foreground/55 text-xs font-medium uppercase tracking-[0.14em]">
          {status}
        </p>
        <span
          className="bg-factor-red mt-1 size-2 shrink-0 rounded-full"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-charcoal-foreground mt-5 max-w-xs text-2xl font-medium leading-tight tracking-[-0.035em]">
        {title}
      </h3>
      <div className="mt-auto pt-8 text-sm">
        {raisedBy ? (
          <p className="text-charcoal-foreground/60">Raised by {raisedBy}</p>
        ) : null}
        {agreementCount ? (
          <p className="text-charcoal-foreground mt-3 inline-flex items-center gap-2 font-medium">
            <ThumbsUp className="size-4" aria-hidden="true" />
            {agreementCount} owners agree
          </p>
        ) : null}
      </div>
    </article>
  );
}
