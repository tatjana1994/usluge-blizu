'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type Props = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: Props) {
  const pathname = usePathname();

  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={clsx(
        'text-md font-bold transition',
        isActive ? 'text-rose-500' : 'text-stone-600 hover:text-stone-900',
      )}
    >
      {children}
    </Link>
  );
}
