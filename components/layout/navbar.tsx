import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { NotificationBell } from '@/components/notifications/notification-bell';
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

  let initialNotifications: {
    id: string;
    user_id: string;
    listing_id: string | null;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    is_read: boolean;
    created_at: string;
  }[] = [];

  if (showAuthenticatedUi && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    isAdmin = profile?.role === 'admin';

    const { data: notifications } = await supabase
      .from('notifications')
      .select(
        'id, user_id, listing_id, title, message, type, is_read, created_at, link',
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    initialNotifications =
      (notifications as typeof initialNotifications | null) ?? [];
  }

  const notificationSlot =
    showAuthenticatedUi && user ? (
      <NotificationBell
        userId={user.id}
        initialNotifications={initialNotifications}
      />
    ) : null;

  return (
    <header className='sticky top-0 z-40 border-b border-stone-200 bg-white/80 backdrop-blur-md'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/logo.webp'
            alt='UslugeBlizu'
            width={48}
            height={48}
            className='h-auto w-auto object-contain'
          />
          <span className='text-xl font-bold text-stone-900'>
            Usluge
            <span className='text-rose-500'>Blizu</span>
          </span>
        </Link>

        <nav className='hidden items-center gap-4 md:flex'>
          <NavLink href='/oglasi'>Oglasi</NavLink>
          <NavLink href='/postavi'>Postavi oglas</NavLink>

          {showAuthenticatedUi ? (
            <>
              <NavLink href='/moji-oglasi'>Moji oglasi</NavLink>
              {notificationSlot}
              {isAdmin ? <NavLink href='/admin/oglasi'>Admin</NavLink> : null}
              <Link
                href='/profil'
                className='rounded-xl bg-rose-500 px-4 py-2 text-md font-bold text-white transition hover:bg-rose-600'
              >
                Profil
              </Link>
            </>
          ) : (
            <Link
              href='/prijava'
              className='rounded-xl bg-rose-500 px-4 py-2 text-md font-bold text-white transition hover:bg-rose-600'
            >
              Prijava
            </Link>
          )}
        </nav>

        <MobileNav
          user={showAuthenticatedUi && user ? { id: user.id } : null}
          isAdmin={showAuthenticatedUi ? isAdmin : false}
          notificationSlot={showAuthenticatedUi ? notificationSlot : null}
        />
      </div>
    </header>
  );
}
