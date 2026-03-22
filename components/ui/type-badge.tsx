type TypeBadgeProps = {
  type: 'trazim' | 'nudim';
};

export function TypeBadge({ type }: TypeBadgeProps) {
  const styles =
    type === 'trazim'
      ? 'border-[#F6C79E] bg-[#FFF4E8] text-[#A8571E]'
      : 'border-[#BFE3D0] bg-[#EEF9F2] text-[#2F7A57]';

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-bold ${styles}`}
    >
      {type === 'trazim' ? 'Tražim uslugu' : 'Nudim uslugu'}
    </span>
  );
}
