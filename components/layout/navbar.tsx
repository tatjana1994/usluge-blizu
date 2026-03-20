import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    isAdmin = profile?.role === 'admin';
  }

  return (
    <header className='sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <Link
          href='/'
          className='text-xl font-semibold tracking-tight text-gray-900'
        >
          Usluge<span className='text-blue-600'>Blizu</span>
        </Link>

        <nav className='hidden items-center gap-6 md:flex'>
          <Link
            href='/oglasi'
            className='text-sm font-medium text-gray-600 hover:text-gray-900'
          >
            Oglasi
          </Link>
          <Link
            href='/postavi'
            className='text-sm font-medium text-gray-600 hover:text-gray-900'
          >
            Postavi oglas
          </Link>
          {user ? (
            <>
              <Link
                href='/moji-oglasi'
                className='text-sm font-medium text-gray-600 hover:text-gray-900'
              >
                Moji oglasi
              </Link>
              {isAdmin ? (
                <Link
                  href='/admin/oglasi'
                  className='text-sm font-medium text-gray-600 hover:text-gray-900'
                >
                  Admin
                </Link>
              ) : null}
              <Link
                href='/profil'
                className='rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
              >
                Profil
              </Link>
            </>
          ) : (
            <Link
              href='/prijava'
              className='rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
            >
              Prijava
            </Link>
          )}
        </nav>

        <div className='md:hidden'>
          {user ? (
            <Link
              href='/profil'
              className='rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
            >
              Profil
            </Link>
          ) : (
            <Link
              href='/prijava'
              className='rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
            >
              Prijava
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
