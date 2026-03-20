import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { approveListing, rejectListing } from '@/app/actions/listings';

export default async function AdminOglasDetaljPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  const { data: listing, error } = await supabase
    .from('listings')
    .select(
      `
      *,
      categories (
        id,
        name,
        slug
      )
    `,
    )
    .eq('id', id)
    .single();

  if (error || !listing) {
    notFound();
  }

  return (
    <main className='min-h-screen bg-white px-4 py-16'>
      <div className='mx-auto max-w-5xl'>
        <Link
          href='/admin/oglasi'
          className='mb-6 inline-flex text-sm font-medium text-blue-600 hover:underline'
        >
          ← Nazad na admin oglase
        </Link>

        <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]'>
          <section className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm'>
            <div className='mb-4 flex flex-wrap items-center gap-2'>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
                  listing.type === 'trazim'
                    ? 'border-yellow-200 bg-yellow-50 text-yellow-700'
                    : 'border-green-200 bg-green-50 text-green-700'
                }`}
              >
                {listing.type === 'trazim' ? 'Tražim uslugu' : 'Nudim uslugu'}
              </span>

              {Array.isArray(listing.categories) &&
              listing.categories.length > 0 ? (
                <span className='inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700'>
                  {listing.categories[0].name}
                </span>
              ) : null}

              <span className='inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700'>
                Status: {listing.status}
              </span>
            </div>

            <h1 className='text-4xl font-semibold tracking-tight text-gray-900'>
              {listing.title}
            </h1>

            <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500'>
              <span>
                {listing.city}
                {listing.area ? `, ${listing.area}` : ''}
              </span>
              <span>
                {new Date(listing.created_at).toLocaleDateString('sr-RS')}
              </span>
            </div>

            <div className='mt-8'>
              <p className='text-xs uppercase tracking-wide text-gray-500'>
                Opis
              </p>
              <div className='mt-3 whitespace-pre-line text-base leading-8 text-gray-700'>
                {listing.description}
              </div>
            </div>
          </section>

          <aside className='h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm'>
            <div className='space-y-4'>
              <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
                <p className='text-xs uppercase tracking-wide text-gray-500'>
                  Kontakt osoba
                </p>
                <p className='mt-1 text-sm font-medium text-gray-900'>
                  {listing.contact_name}
                </p>
              </div>

              <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
                <p className='text-xs uppercase tracking-wide text-gray-500'>
                  Telefon
                </p>
                <p className='mt-1 text-sm font-medium text-gray-900'>
                  {listing.contact_phone}
                </p>
              </div>

              {listing.contact_email ? (
                <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
                  <p className='text-xs uppercase tracking-wide text-gray-500'>
                    Email
                  </p>
                  <p className='mt-1 break-all text-sm font-medium text-gray-900'>
                    {listing.contact_email}
                  </p>
                </div>
              ) : null}

              <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
                <p className='text-xs uppercase tracking-wide text-gray-500'>
                  Cena
                </p>
                <p className='mt-1 text-sm font-medium text-gray-900'>
                  {listing.price ? `${listing.price} RSD` : 'Po dogovoru'}
                </p>
              </div>

              {listing.rejection_reason ? (
                <div className='rounded-xl border border-red-200 bg-red-50 p-4'>
                  <p className='text-xs uppercase tracking-wide text-red-600'>
                    Razlog odbijanja
                  </p>
                  <p className='mt-1 text-sm font-medium text-red-700'>
                    {listing.rejection_reason}
                  </p>
                </div>
              ) : null}
            </div>

            <div className='mt-6 space-y-3'>
              <form action={approveListing}>
                <input type='hidden' name='id' value={listing.id} />
                <button
                  type='submit'
                  className='block w-full rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-green-700'
                >
                  Odobri oglas
                </button>
              </form>

              <form action={rejectListing} className='space-y-3'>
                <input type='hidden' name='id' value={listing.id} />
                <textarea
                  name='reason'
                  rows={4}
                  placeholder='Razlog odbijanja...'
                  className='w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500'
                />
                <button
                  type='submit'
                  className='block w-full rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-red-700'
                >
                  Odbij oglas
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
