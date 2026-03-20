type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
      <h3>{title}</h3>
      {description ? (
        <p className='mx-auto mt-2 max-w-md text-sm text-gray-600'>
          {description}
        </p>
      ) : null}
      {action ? <div className='mt-6'>{action}</div> : null}
    </div>
  );
}
