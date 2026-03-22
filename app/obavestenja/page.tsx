import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { markNotificationAsRead } from '@/app/actions/notifications';
import { formatListingPrice } from '@/lib/utils/format-listing-price';

function getTypeStyles(type: string) {
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

export default async function ObavestenjaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const { data: notifications, error } = await supabase
    .from('notifications')
    .select(
      `
      id,
      title,
      message,
      type,
      is_read,
      created_at,
      link,
      listing_id,
      listings (
        price,
        price_currency,
        price_type
      )
    `,
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className='min-h-screen bg-[var(--background)]'>
        <Container className='max-w-4xl py-16'>
          <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700'>
            Greška pri učitavanju obaveštenja.
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <Container className='relative max-w-4xl py-16 lg:py-20'>
          <div className='flex flex-col gap-6'>
            <div>
              <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
                Obaveštenja
              </div>

              <h1 className='mt-4 text-4xl font-bold tracking-tight text-stone-900'>
                Tvoja obaveštenja
              </h1>

              <p className='mt-4 text-lg text-stone-600'>
                Ovde možeš pratiti status svojih oglasa i sve važne promene.
              </p>
            </div>

            {!notifications || notifications.length === 0 ? (
              <SectionCard className='p-8 text-center'>
                <p className='text-lg font-medium text-stone-900'>
                  Nema obaveštenja
                </p>
                <p className='mt-2 text-stone-500'>
                  Kada se nešto desi sa tvojim oglasima, videćeš ovde.
                </p>
              </SectionCard>
            ) : (
              <div className='space-y-4'>
                {notifications.map((n) => {
                  const listing = Array.isArray(n.listings)
                    ? n.listings[0]
                    : n.listings;

                  const priceText = listing
                    ? formatListingPrice({
                        price: listing.price,
                        priceCurrency: listing.price_currency,
                        priceType: listing.price_type,
                      })
                    : null;

                  return (
                    <form key={n.id} action={markNotificationAsRead}>
                      <input type='hidden' name='id' value={n.id} />

                      <Link
                        href={n.link || '/moji-oglasi'}
                        className={`block rounded-2xl border p-5 transition hover:shadow-md ${
                          n.is_read
                            ? 'border-stone-200 bg-white'
                            : 'border-rose-200 bg-rose-50/40'
                        }`}
                      >
                        <div className='flex items-start justify-between gap-4'>
                          <div className='min-w-0'>
                            <div
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getTypeStyles(
                                n.type,
                              )}`}
                            >
                              {n.title}
                            </div>

                            <p className='mt-3 text-sm text-stone-700'>
                              {n.message}
                            </p>

                            {priceText && (
                              <p className='mt-2 text-sm font-semibold text-rose-600'>
                                {priceText}
                              </p>
                            )}

                            <p className='mt-2 text-xs text-stone-400'>
                              {formatTime(n.created_at)}
                            </p>
                          </div>

                          {!n.is_read && (
                            <span className='mt-1 h-2.5 w-2.5 rounded-full bg-rose-500' />
                          )}
                        </div>
                      </Link>
                    </form>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
