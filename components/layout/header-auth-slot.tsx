import Link from 'next/link';
import { NotificationBell } from '@/components/notifications/notification-bell';

type HeaderAuthSlotProps = {
  user: { id: string } | null;
  isAdmin: boolean;
  notifications: {
    id: string;
    user_id: string;
    listing_id: string | null;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    is_read: boolean;
    created_at: string;
    link?: string | null;
  }[];
  variant?: 'desktop' | 'mobile';
};

export function HeaderAuthSlot({
  user,
  isAdmin,
  notifications,
  variant = 'desktop',
}: HeaderAuthSlotProps) {
  if (!user) {
    return (
      <Link
        href='/prijava'
        className='rounded-xl bg-rose-500 px-4 py-2 text-md font-bold text-white transition hover:bg-rose-600'
      >
        Prijava
      </Link>
    );
  }

  if (variant === 'mobile') {
    return (
      <>
        <NotificationBell
          userId={user.id}
          initialNotifications={notifications}
        />

        <Link
          href='/profil'
          className='rounded-xl bg-rose-500 px-4 py-2 text-md font-bold text-white transition hover:bg-rose-600'
        >
          Profil
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href='/moji-oglasi'
        className='text-md font-medium text-stone-700 transition hover:text-stone-900'
      >
        Moji oglasi
      </Link>

      <NotificationBell userId={user.id} initialNotifications={notifications} />

      {isAdmin ? (
        <Link
          href='/admin/oglasi'
          className='text-md font-medium text-stone-700 transition hover:text-stone-900'
        >
          Admin
        </Link>
      ) : null}

      <Link
        href='/profil'
        className='rounded-xl bg-rose-500 px-4 py-2 text-md font-bold text-white transition hover:bg-rose-600'
      >
        Profil
      </Link>
    </>
  );
}
