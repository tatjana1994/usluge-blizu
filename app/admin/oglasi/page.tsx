import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

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
    .select('id, title, city, area, status, created_at, type, slug')
    .eq('status', statusFilter)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main className='min-h-screen bg-white px-4 py-16'>
        <div className='mx-auto max-w-6xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700'>
          Greška pri učitavanju admin oglasa.
        </div>
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
    <main className='min-h-screen bg-white px-4 py-16'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8'>
          <p className='text-sm font-medium text-blue-600'>Admin</p>
          <h1 className='mt-2 text-4xl font-semibold tracking-tight text-gray-900'>
            Upravljanje oglasima
          </h1>
        </div>

        {success ? (
          <div className='mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>
            {success}
          </div>
        ) : null}

        {errorMessage ? (
          <div className='mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
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
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {!listings || listings.length === 0 ? (
          <div className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Nema oglasa u ovoj sekciji
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Trenutno nema oglasa sa statusom: {statusFilter}
            </p>
          </div>
        ) : (
          <div className='grid gap-4'>
            {listings.map((listing) => (
              <div
                key={listing.id}
                className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'
              >
                <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
                  <div>
                    <div className='mb-2 flex flex-wrap items-center gap-2'>
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
                          listing.type === 'trazim'
                            ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
                            : 'border-green-200 bg-green-50 text-green-700'
                        }`}
                      >
                        {listing.type === 'trazim'
                          ? 'Tražim uslugu'
                          : 'Nudim uslugu'}
                      </span>
                    </div>

                    <h2 className='text-lg font-semibold text-gray-900'>
                      {listing.title}
                    </h2>

                    <p className='mt-1 text-sm text-gray-600'>
                      {listing.city}
                      {listing.area ? `, ${listing.area}` : ''}
                    </p>

                    <p className='mt-2 text-xs text-gray-500'>
                      Kreirano:{' '}
                      {new Date(listing.created_at).toLocaleDateString('sr-RS')}
                    </p>
                  </div>

                  <Link
                    href={`/admin/oglasi/${listing.id}`}
                    className='rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700'
                  >
                    Otvori
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
