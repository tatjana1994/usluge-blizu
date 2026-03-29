'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MobileNavProps = {
  user: { id: string } | null;
  isAdmin: boolean;
  notificationSlot: React.ReactNode;
};

function getMobileLinkClass(pathname: string, href: string, bold = true) {
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return [
    'rounded-2xl px-4 py-3 transition',
    bold ? 'text-lg font-bold' : 'text-base font-medium',
    isActive
      ? 'bg-rose-50 text-rose-500'
      : 'text-stone-800 hover:bg-rose-50 hover:text-rose-600',
  ].join(' ');
}

export function MobileNav({ user, isAdmin, notificationSlot }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className='lg:hidden'>
      <div className='flex items-center gap-2'>
        {user ? notificationSlot : null}

        <button
          type='button'
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Zatvori meni' : 'Otvori meni'}
          aria-expanded={isOpen}
          className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-rose-200 hover:text-rose-600'
        >
          {isOpen ? (
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6 6L18 18M18 6L6 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          ) : (
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M4 7H20M4 12H20M4 17H20'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-[#fffaf7] transition-all duration-300 ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className='flex h-screen flex-col bg-white'>
          <div className='flex items-center justify-between border-b border-stone-200 bg-white/90 px-4 py-4 backdrop-blur-md'>
            <p className='text-lg font-bold tracking-tight text-stone-900'>
              Meni
            </p>

            <button
              type='button'
              onClick={closeMenu}
              aria-label='Zatvori meni'
              className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-rose-200 hover:text-rose-600'
            >
              <svg
                className='h-5 w-5'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 6L18 18M18 6L6 18'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </div>

          <div className='flex-1 overflow-y-auto px-4 py-6'>
            <nav className='flex flex-col gap-2'>
              <Link
                href='/oglasi'
                onClick={closeMenu}
                className={getMobileLinkClass(pathname, '/oglasi')}
              >
                Oglasi
              </Link>

              <Link
                href='/postavi'
                onClick={closeMenu}
                className={getMobileLinkClass(pathname, '/postavi')}
              >
                Postavi oglas
              </Link>

              {user ? (
                <>
                  <Link
                    href='/moji-oglasi'
                    onClick={closeMenu}
                    className={getMobileLinkClass(pathname, '/moji-oglasi')}
                  >
                    Moji oglasi
                  </Link>

                  {isAdmin ? (
                    <Link
                      href='/admin/oglasi'
                      onClick={closeMenu}
                      className={getMobileLinkClass(pathname, '/admin/oglasi')}
                    >
                      Admin
                    </Link>
                  ) : null}
                </>
              ) : null}
            </nav>

            <div className='mt-6 border-t border-stone-200 pt-6'>
              <div className='grid gap-3'>
                {user ? (
                  <Link
                    href='/profil'
                    onClick={closeMenu}
                    className='inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-600'
                  >
                    Profil
                  </Link>
                ) : (
                  <Link
                    href='/prijava'
                    onClick={closeMenu}
                    className='inline-flex items-center justify-center rounded-xl bg-rose-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-rose-600'
                  >
                    Prijava
                  </Link>
                )}
              </div>
            </div>

            <div className='mt-8 border-t border-stone-200 pt-6'>
              <p className='px-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-400'>
                Dodatno
              </p>

              <div className='mt-3 flex flex-col gap-1'>
                <Link
                  href='/kontakt'
                  onClick={closeMenu}
                  className={getMobileLinkClass(pathname, '/kontakt', false)}
                >
                  Kontakt
                </Link>

                <Link
                  href='/o-nama'
                  onClick={closeMenu}
                  className={getMobileLinkClass(pathname, '/o-nama', false)}
                >
                  O nama
                </Link>

                <Link
                  href='/uslovi-koriscenja'
                  onClick={closeMenu}
                  className={getMobileLinkClass(
                    pathname,
                    '/uslovi-koriscenja',
                    false,
                  )}
                >
                  Uslovi korišćenja
                </Link>

                <Link
                  href='/politika-privatnosti'
                  onClick={closeMenu}
                  className={getMobileLinkClass(
                    pathname,
                    '/politika-privatnosti',
                    false,
                  )}
                >
                  Politika privatnosti
                </Link>
              </div>
            </div>
          </div>

          <div className='border-t border-stone-200 px-4 py-4 text-xs text-stone-500'>
            © {new Date().getFullYear()} UslugeBlizu. Sva prava zadržana.
          </div>
        </div>
      </div>
    </div>
  );
}
