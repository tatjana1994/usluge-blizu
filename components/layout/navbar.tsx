import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { getUserNotifications } from '@/lib/services/notifications/queries';
import { HeaderAuthSlot } from '@/components/layout/header-auth-slot';
import { NavLink } from '@/components/nav-link';
import { MobileNav } from '@/components/layout/mobile-nav';

export async function Navbar() {
  const cookieStore = await cookies();
  const recoveryMode = cookieStore.get('recovery_mode')?.value === '1';

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const showAuthenticatedUi = !!user && !recoveryMode;

  let isAdmin = false;
  let notifications: Awaited<ReturnType<typeof getUserNotifications>> = [];

  if (showAuthenticatedUi && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    isAdmin = profile?.role === 'admin';
    notifications = await getUserNotifications(user.id);
  }

  return (
    <header className='sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur-md'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
        <Link href='/' className='flex min-w-0 items-center gap-2'>
          <Image
            src='/logo.webp'
            alt='UslugeBlizu'
            width={48}
            height={48}
            loading='eager'
            className='h-auto w-auto object-contain'
          />
          <span className='hidden truncate text-xl font-bold text-stone-900 sm:block'>
            Usluge<span className='text-rose-500'>Blizu</span>
          </span>
        </Link>

        <nav className='hidden items-center gap-4 lg:flex'>
          <NavLink href='/oglasi' className='text-md font-bold'>
            Oglasi
          </NavLink>

          <NavLink href='/postavi' className='text-md font-bold'>
            Postavi oglas
          </NavLink>

          <HeaderAuthSlot
            user={showAuthenticatedUi && user ? { id: user.id } : null}
            isAdmin={showAuthenticatedUi ? isAdmin : false}
            notifications={notifications}
            variant='desktop'
          />
        </nav>

        <MobileNav
          user={showAuthenticatedUi && user ? { id: user.id } : null}
          isAdmin={showAuthenticatedUi ? isAdmin : false}
          notificationSlot={
            showAuthenticatedUi && user ? (
              <HeaderAuthSlot
                user={{ id: user.id }}
                isAdmin={isAdmin}
                notifications={notifications}
                variant='mobile'
              />
            ) : null
          }
        />
      </div>
    </header>
  );
}
