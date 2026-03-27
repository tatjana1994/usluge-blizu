'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type NotificationItem = {
  id: string;
  user_id: string;
  listing_id: string | null;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
  link?: string | null;
};

function getTypeStyles(type: NotificationItem['type']) {
  switch (type) {
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700';
    case 'error':
      return 'border-rose-200 bg-rose-50 text-rose-700';
    case 'warning':
      return 'border-amber-200 bg-amber-50 text-amber-700';
    default:
      return 'border-stone-200 bg-stone-50 text-stone-700';
  }
}

function formatTime(value: string) {
  return new Date(value).toLocaleString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NotificationBell({
  userId,
  initialNotifications,
}: {
  userId: string;
  initialNotifications: NotificationItem[];
}) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.is_read).length,
    [notifications],
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const baseTitle = 'UslugeBlizu';
      document.title =
        unreadCount > 0 ? `(${unreadCount}) ${baseTitle}` : baseTitle;
    }
  }, [unreadCount]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newItem = payload.new as NotificationItem;

            setNotifications((prev) => {
              const next = [newItem, ...prev];
              return next
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime(),
                )
                .slice(0, 20);
            });
          }

          if (payload.eventType === 'UPDATE') {
            const updated = payload.new as NotificationItem;

            setNotifications((prev) =>
              prev.map((item) => (item.id === updated.id ? updated : item)),
            );
          }

          if (payload.eventType === 'DELETE') {
            const deleted = payload.old as NotificationItem;

            setNotifications((prev) =>
              prev.filter((item) => item.id !== deleted.id),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  async function markOneAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_read: true } : item)),
    );

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_read: false } : item,
        ),
      );
    }
  }

  async function markAllAsRead() {
    const unreadIds = notifications
      .filter((item) => !item.is_read)
      .map((i) => i.id);

    if (!unreadIds.length) return;

    setNotifications((prev) =>
      prev.map((item) => ({ ...item, is_read: true })),
    );

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) {
      setNotifications((prev) =>
        prev.map((item) =>
          unreadIds.includes(item.id) ? { ...item, is_read: false } : item,
        ),
      );
    }
  }

  return (
    <div ref={wrapperRef} className='relative'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className='relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white transition hover:bg-rose-50'
        aria-label='Obaveštenja'
        aria-expanded={open}
      >
        <svg
          className={`h-5 w-5 transition-colors ${
            open ? 'text-rose-500' : 'text-stone-600'
          }`}
          fill='none'
          stroke='currentColor'
          strokeWidth='1.8'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 17h5l-1.405-1.405C18.21 15.21 18 14.7 18 14.172V11a6 6 0 10-12 0v3.172c0 .528-.21 1.039-.595 1.423L4 17h5m6 0a3 3 0 11-6 0m6 0H9'
          />
        </svg>

        {unreadCount > 0 && (
          <span className='absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow'>
            {unreadCount}
          </span>
        )}
      </button>

      <div
        className={`fixed left-0 right-0 top-20 z-50 max-h-[75vh] origin-top overflow-hidden rounded-b-3xl lg:rounded-3xl border border-stone-200 bg-white shadow-[0_20px_60px_rgba(47,38,34,0.12)] transition-all duration-200 sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[360px] sm:max-h-none sm:origin-top-right ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        }`}
      >
        <div className='flex items-start justify-between gap-3 border-b border-stone-100 px-4 py-4 sm:items-center sm:px-5'>
          <div className='min-w-0'>
            <p className='text-sm font-semibold text-stone-900'>Obaveštenja</p>
            <p className='mt-1 text-xs text-stone-500'>
              {unreadCount > 0
                ? `${unreadCount} nepročitanih`
                : 'Sve je pročitano'}
            </p>
          </div>

          <button
            type='button'
            onClick={markAllAsRead}
            className='shrink-0 cursor-pointer text-sm font-medium text-rose-600 transition hover:text-rose-700'
          >
            Označi sve
          </button>
        </div>

        <div className='max-h-[calc(75vh-140px)] overflow-y-auto sm:max-h-[420px]'>
          {notifications.length === 0 ? (
            <div className='px-4 py-8 text-center sm:px-5'>
              <p className='text-sm font-medium text-stone-900'>
                Nema obaveštenja
              </p>
              <p className='mt-2 text-sm text-stone-500'>
                Kada se pojavi nova poruka, biće prikazana ovde.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Link
                key={notification.id}
                href={notification.link || '/obavestenja'}
                onClick={() => {
                  void markOneAsRead(notification.id);
                  setOpen(false);
                }}
                className={`block border-b border-stone-100 px-4 py-4 transition hover:bg-[#fff8f4] sm:px-5 ${
                  !notification.is_read ? 'bg-rose-50/40' : 'bg-white'
                }`}
              >
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0 flex-1'>
                    <div
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium ${getTypeStyles(
                        notification.type,
                      )}`}
                    >
                      {notification.title}
                    </div>

                    <p className='mt-3 pr-1 text-sm leading-6 text-stone-700'>
                      {notification.message}
                    </p>

                    <p className='mt-2 text-xs text-stone-400'>
                      {formatTime(notification.created_at)}
                    </p>
                  </div>

                  {!notification.is_read ? (
                    <span className='mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-500' />
                  ) : null}
                </div>
              </Link>
            ))
          )}
        </div>

        <div className='border-t border-stone-100 px-4 py-4 sm:px-5'>
          <Link
            href='/obavestenja'
            onClick={() => setOpen(false)}
            className='text-sm font-medium text-rose-600 transition hover:text-rose-700'
          >
            Prikaži sva obaveštenja
          </Link>
        </div>
      </div>
    </div>
  );
}
