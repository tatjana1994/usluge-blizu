import Link from 'next/link';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
};

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, '...', totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      '...',
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}

function pageBaseClassName(isActive: boolean) {
  return [
    'inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition',
    isActive
      ? 'border-rose-500 bg-rose-500 text-white shadow-sm'
      : 'border-stone-200 bg-white text-stone-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600',
  ].join(' ');
}

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      aria-label='Paginacija'
      className='my-10 flex flex-wrap items-center justify-center gap-2'
    >
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`inline-flex h-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition ${
          currentPage === 1
            ? 'pointer-events-none border-stone-200 bg-stone-100 text-stone-400'
            : 'border-stone-200 bg-white text-stone-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600'
        }`}
      >
        ← Prethodna
      </Link>

      {items.map((item, index) => {
        if (item === '...') {
          return (
            <span
              key={`dots-${index}`}
              className='inline-flex h-11 min-w-11 items-center justify-center px-1 text-sm font-semibold text-stone-400'
            >
              ...
            </span>
          );
        }

        // 👇 ovde je fix (item je sada number)
        return (
          <Link
            key={item}
            href={buildHref(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            className={pageBaseClassName(item === currentPage)}
          >
            {item}
          </Link>
        );
      })}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`inline-flex h-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition ${
          currentPage === totalPages
            ? 'pointer-events-none border-stone-200 bg-stone-100 text-stone-400'
            : 'border-stone-200 bg-white text-stone-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600'
        }`}
      >
        Sledeća →
      </Link>
    </nav>
  );
}
