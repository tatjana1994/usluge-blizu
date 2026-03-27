import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { deleteListing } from '@/app/actions/listings';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { EmptyState } from '@/components/ui/empty-state';
import { StatusBadge } from '@/components/ui/status-badge';
import { formatListingPrice } from '@/lib/utils/format-listing-price';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
  dangerButtonClassName,
} from '@/lib/constants/ui';

export default async function MojiOglasiPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const success = params.success;
  const errorMessage = params.error;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const { data: listings, error } = await supabase
    .from('listings')
    .select(
      'id, title, city, area, status, created_at, slug, price, price_currency, price_type',
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className='min-h-screen bg-[var(--background)]'>
        <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

          <Container className='relative max-w-5xl py-16 lg:py-20'>
            <div className='rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700'>
              Greška pri učitavanju oglasa.
            </div>
          </Container>
        </section>
      </main>
    );
  }

  const totalListings = listings?.length ?? 0;
  const approvedCount =
    listings?.filter((listing) => listing.status === 'approved').length ?? 0;
  const pendingCount =
    listings?.filter((listing) => listing.status === 'pending').length ?? 0;
  const rejectedCount =
    listings?.filter((listing) => listing.status === 'rejected').length ?? 0;

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative max-w-6xl py-16 lg:py-20'>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
              <div>
                <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
                  Kontrolna tabla
                </div>

                <h1 className='mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
                  Moji oglasi
                </h1>

                <p className='mt-4 max-w-2xl text-lg leading-8 text-stone-600'>
                  Pregled objava, izmena podataka i upravljanje statusima oglasa
                  na jednom mestu.
                </p>
              </div>

              <Link href='/postavi' className={primaryButtonClassName}>
                Postavi novi oglas
              </Link>
            </div>

            {success ? (
              <div className='rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>
                {success}
              </div>
            ) : null}

            {errorMessage ? (
              <div className='rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                {errorMessage}
              </div>
            ) : null}

            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                  Ukupno oglasa
                </p>
                <p className='mt-2 text-3xl font-semibold text-stone-900'>
                  {totalListings}
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                  Odobreni
                </p>
                <p className='mt-2 text-3xl font-semibold text-emerald-700'>
                  {approvedCount}
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                  Na pregledu
                </p>
                <p className='mt-2 text-3xl font-semibold text-amber-700'>
                  {pendingCount}
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                  Odbijeni
                </p>
                <p className='mt-2 text-3xl font-semibold text-rose-700'>
                  {rejectedCount}
                </p>
              </SectionCard>
            </div>

            {!listings || listings.length === 0 ? (
              <EmptyState
                title='Nema oglasa'
                description='Još nema objavljenih ili poslatih oglasa.'
                action={
                  <Link href='/postavi' className={primaryButtonClassName}>
                    Postavi oglas
                  </Link>
                }
              />
            ) : (
              <div className='grid gap-4'>
                {listings.map((listing) => (
                  <SectionCard
                    key={listing.id}
                    className='border-stone-200 bg-white/95 p-4 shadow-sm'
                  >
                    <div className='flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between'>
                      <div className='min-w-0'>
                        <div className='mb-3 flex flex-wrap items-center gap-2'>
                          <StatusBadge
                            status={
                              listing.status as
                                | 'pending'
                                | 'approved'
                                | 'rejected'
                                | 'archived'
                            }
                          />

                          <span className='inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600'>
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

                        <h2 className='text-xl font-semibold tracking-tight text-stone-900'>
                          {listing.title}
                        </h2>

                        <div className='mt-3 flex flex-wrap items-center gap-4 text-sm text-stone-500'>
                          <span>
                            {listing.city}
                            {listing.area ? `, ${listing.area}` : ''}
                          </span>
                          <span>
                            {new Date(listing.created_at).toLocaleDateString(
                              'sr-RS',
                            )}
                          </span>
                        </div>
                      </div>

                      <div className='flex flex-wrap gap-2'>
                        <Link
                          href={`/moji-oglasi/${listing.id}/izmeni`}
                          className={secondaryButtonClassName}
                        >
                          Izmeni
                        </Link>

                        {listing.status === 'approved' ? (
                          <Link
                            href={`/oglasi/${listing.slug}`}
                            className={secondaryButtonClassName}
                          >
                            Pogledaj
                          </Link>
                        ) : null}

                        <form action={deleteListing}>
                          <input type='hidden' name='id' value={listing.id} />
                          <button
                            type='submit'
                            className={dangerButtonClassName}
                          >
                            Obriši
                          </button>
                        </form>
                      </div>
                    </div>
                  </SectionCard>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
