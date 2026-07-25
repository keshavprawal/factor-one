import { Badge } from '@/components/ui/badge';

export interface OwnerBuiltBadgeProps {
  count: number;
}

export function OwnerBuiltBadge({ count }: OwnerBuiltBadgeProps) {
  return (
    <div>
      <Badge className="border-factor-red/40 bg-factor-red/10 text-factor-red rounded-sm px-2.5 py-1 tracking-[0.12em]">
        OWNER BUILT
      </Badge>
      <p className="text-current/65 mt-2 text-xs leading-5">
        Requested by {count} owners.
      </p>
    </div>
  );
}
