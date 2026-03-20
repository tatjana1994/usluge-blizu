import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: 'pending' | 'approved' | 'rejected' | 'archived';
};

const labelMap = {
  pending: 'Na pregledu',
  approved: 'Odobren',
  rejected: 'Odbijen',
  archived: 'Arhiviran',
};

const classMap = {
  pending: 'border-yellow-200 bg-yellow-50 text-yellow-700',
  approved: 'border-green-200 bg-green-50 text-green-700',
  rejected: 'border-red-200 bg-red-50 text-red-700',
  archived: 'border-gray-200 bg-gray-50 text-gray-700',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-3 py-1 text-xs font-medium',
        classMap[status],
      )}
    >
      {labelMap[status]}
    </span>
  );
}
