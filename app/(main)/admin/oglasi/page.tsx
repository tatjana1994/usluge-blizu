import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatListingPrice } from '@/lib/utils/format-listing-price';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';

export default async function AdminOglasiPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string; status?: string }>;
}) {
  const params = await searchParams;
  const success = params.success;
  const errorMessage = params.error;
  const statusFilter = params.status || 'pending';

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  const { data: listings, error } = await supabase
    .from('listings')
    .select(
      'id, title, city, area, status, created_at, type, slug, price, price_currency, price_type',
    )
    .eq('status', statusFilter)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className='min-h-screen bg-[var(--background)]'>
        <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

          <Container className='relative max-w-6xl py-16 lg:py-20'>
            <div className='rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700'>
              Greška pri učitavanju admin oglasa.
            </div>
          </Container>
        </section>
      </main>
    );
  }

  const tabs = [
    { label: 'Na pregledu', value: 'pending' },
    { label: 'Odobreni', value: 'approved' },
    { label: 'Odbijeni', value: 'rejected' },
    { label: 'Arhivirani', value: 'archived' },
  ];

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative max-w-6xl py-16 lg:py-20'>
          <div className='mb-8'>
            <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
              Admin
            </div>

            <h1 className='mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
              Upravljanje oglasima
            </h1>
          </div>

          {success ? (
            <div className='mb-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>
              {success}
            </div>
          ) : null}

          {errorMessage ? (
            <div className='mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {errorMessage}
            </div>
          ) : null}

          <div className='mb-6 flex flex-wrap gap-2'>
            {tabs.map((tab) => {
              const active = statusFilter === tab.value;

              return (
                <Link
                  key={tab.value}
                  href={`/admin/oglasi?status=${tab.value}`}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-rose-500 text-white'
                      : 'border border-rose-200 bg-white text-stone-700 hover:bg-rose-50'
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>

          {!listings || listings.length === 0 ? (
            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-sm'>
              <h2 className='text-xl font-bold text-stone-900'>
                Nema oglasa u ovoj sekciji
              </h2>
              <p className='mt-2 text-sm text-stone-600'>
                Trenutno nema oglasa sa statusom: {statusFilter}
              </p>
            </SectionCard>
          ) : (
            <div className='grid gap-4'>
              {listings.map((listing) => (
                <SectionCard
                  key={listing.id}
                  className='border-stone-200 bg-white/95 p-4 shadow-sm'
                >
                  <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                    <div className='min-w-0'>
                      <div className='mb-3 flex flex-wrap items-center gap-2'>
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
                            listing.type === 'trazim'
                              ? 'border-amber-200 bg-amber-50 text-amber-700'
                              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {listing.type === 'trazim'
                            ? 'Tražim uslugu'
                            : 'Nudim uslugu'}
                        </span>

                        <span className='inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600'>
                          {formatListingPrice({
                            price: listing.price,
                            priceCurrency: listing.price_currency as
                              | 'RSD'
                              | 'EUR'
                              | null,
                            priceType: listing.price_type as
                              | 'fixed'
                              | 'hourly'
                              | null,
                          })}
                        </span>
                      </div>

                      <h2 className='text-lg font-bold text-stone-900'>
                        {listing.title}
                      </h2>

                      <p className='mt-1 text-sm text-stone-600'>
                        {listing.city}
                        {listing.area ? `, ${listing.area}` : ''}
                      </p>

                      <p className='mt-2 text-xs text-stone-500'>
                        Kreirano:{' '}
                        {new Date(listing.created_at).toLocaleDateString(
                          'sr-RS',
                        )}
                      </p>
                    </div>

                    <Link
                      href={`/admin/oglasi/${listing.id}`}
                      className='rounded-xl bg-rose-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-rose-600'
                    >
                      Otvori
                    </Link>
                  </div>
                </SectionCard>
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
