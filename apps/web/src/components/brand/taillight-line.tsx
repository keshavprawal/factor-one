import { cn } from '@/lib/utils';

interface TaillightLineProps {
  className?: string;
  illuminates?: boolean;
}

export function TaillightLine({
  className,
  illuminates = false,
}: TaillightLineProps) {
  return (
    <div
      className={cn(
        'taillight-line',
        illuminates && 'taillight-line-illuminates',
        className,
      )}
      aria-hidden="true"
    >
      <span className="taillight-line-left" />
      <span className="taillight-line-center" />
      <span className="taillight-line-right" />
    </div>
  );
}
