type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
      <div>
        {eyebrow ? (
          <p className='text-sm font-medium text-blue-600'>{eyebrow}</p>
        ) : null}
        <h1 className='mt-2'>{title}</h1>
        {description ? (
          <p className='mt-3 max-w-2xl text-base leading-7 text-gray-600'>
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className='shrink-0'>{actions}</div> : null}
    </div>
  );
}
