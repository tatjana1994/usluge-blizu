import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { deleteListing } from '@/app/actions/listings';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { EmptyState } from '@/components/ui/empty-state';
import { StatusBadge } from '@/components/ui/status-badge';
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
    .select('id, title, city, area, status, created_at, slug')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className='min-h-screen bg-white py-16'>
        <Container className='max-w-5xl'>
          <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700'>
            Greška pri učitavanju oglasa.
          </div>
        </Container>
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
    <main className='min-h-screen bg-white py-16'>
      <Container className='max-w-6xl'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='text-sm font-medium text-blue-600'>
                Kontrolna tabla
              </p>
              <h1 className='mt-2 text-4xl font-semibold tracking-tight text-gray-900'>
                Moji oglasi
              </h1>
              <p className='mt-3 max-w-2xl text-base leading-7 text-gray-600'>
                Ovde možeš da pregledaš, menjaš i upravljaš svojim objavljenim
                oglasima.
              </p>
            </div>

            <Link href='/postavi' className={primaryButtonClassName}>
              Postavi novi oglas
            </Link>
          </div>

          {success ? (
            <div className='rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>
              {success}
            </div>
          ) : null}

          {errorMessage ? (
            <div className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {errorMessage}
            </div>
          ) : null}

          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            <SectionCard className='p-5'>
              <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                Ukupno oglasa
              </p>
              <p className='mt-2 text-3xl font-semibold text-gray-900'>
                {totalListings}
              </p>
            </SectionCard>

            <SectionCard className='p-5'>
              <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                Odobreni
              </p>
              <p className='mt-2 text-3xl font-semibold text-green-700'>
                {approvedCount}
              </p>
            </SectionCard>

            <SectionCard className='p-5'>
              <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                Na pregledu
              </p>
              <p className='mt-2 text-3xl font-semibold text-yellow-700'>
                {pendingCount}
              </p>
            </SectionCard>

            <SectionCard className='p-5'>
              <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                Odbijeni
              </p>
              <p className='mt-2 text-3xl font-semibold text-red-700'>
                {rejectedCount}
              </p>
            </SectionCard>
          </div>

          {!listings || listings.length === 0 ? (
            <EmptyState
              title='Nema oglasa'
              description='Budi prvi koji će postaviti oglas u ovoj kategoriji.'
              action={
                <Link href='/postavi' className={primaryButtonClassName}>
                  Postavi oglas
                </Link>
              }
            />
          ) : (
            <div className='grid gap-4'>
              {listings.map((listing) => (
                <SectionCard key={listing.id} className='p-6'>
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
                      </div>

                      <h2 className='text-xl font-semibold tracking-tight text-gray-900'>
                        {listing.title}
                      </h2>

                      <div className='mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500'>
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
                        <button type='submit' className={dangerButtonClassName}>
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
    </main>
  );
}
