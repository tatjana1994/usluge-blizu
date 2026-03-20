import { cn } from '@/lib/utils';

type TypeBadgeProps = {
  type: 'trazim' | 'nudim';
};

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-3 py-1 text-xs font-medium',
        type === 'trazim'
          ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
          : 'border-green-200 bg-green-50 text-green-700',
      )}
    >
      {type === 'trazim' ? 'Tražim uslugu' : 'Nudim uslugu'}
    </span>
  );
}
