import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { approveListing, rejectListing } from '@/app/actions/listings';
import { formatListingPrice } from '@/lib/utils/format-listing-price';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { textareaClassName } from '@/lib/constants/ui';

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
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative max-w-5xl py-16 lg:py-20'>
          <Link
            href='/admin/oglasi'
            className='mb-6 inline-flex text-sm font-medium text-rose-600 hover:underline'
          >
            ← Nazad na admin oglase
          </Link>

          <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]'>
            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-lg'>
              <div className='mb-4 flex flex-wrap items-center gap-2'>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
                    listing.type === 'trazim'
                      ? 'border-amber-200 bg-amber-50 text-amber-700'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {listing.type === 'trazim' ? 'Tražim uslugu' : 'Nudim uslugu'}
                </span>

                {Array.isArray(listing.categories) &&
                listing.categories.length > 0 ? (
                  <span className='inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-stone-700'>
                    {listing.categories[0].name}
                  </span>
                ) : null}

                <span className='inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700'>
                  Status: {listing.status}
                </span>
              </div>

              <h1 className='text-4xl font-bold tracking-tight text-stone-900'>
                {listing.title}
              </h1>

              <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-stone-500'>
                <span>
                  {listing.city}
                  {listing.area ? `, ${listing.area}` : ''}
                </span>
                <span>
                  {new Date(listing.created_at).toLocaleDateString('sr-RS')}
                </span>
              </div>

              <div className='mt-8 grid gap-4 sm:grid-cols-3'>
                <div className='rounded-2xl border border-rose-100 bg-[#fff8f4] p-4'>
                  <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                    {listing.price_type === 'hourly' ? 'Cena po satu' : 'Cena'}
                  </p>
                  <p className='mt-2 text-lg font-bold text-stone-900'>
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
                  </p>
                </div>

                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                    Grad
                  </p>
                  <p className='mt-2 text-lg font-bold text-stone-900'>
                    {listing.city}
                  </p>
                </div>

                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                    Naselje
                  </p>
                  <p className='mt-2 text-lg font-bold text-stone-900'>
                    {listing.area || 'Nije navedeno'}
                  </p>
                </div>
              </div>

              <div className='mt-8'>
                <p className='text-xs uppercase tracking-wide text-stone-500'>
                  Opis
                </p>
                <div className='mt-3 whitespace-pre-line text-base leading-8 text-stone-700'>
                  {listing.description}
                </div>
              </div>
            </SectionCard>

            <aside>
              <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-lg'>
                <div className='space-y-4'>
                  <div className='rounded-xl border border-stone-200 bg-stone-50 p-4'>
                    <p className='text-xs uppercase tracking-wide text-stone-500'>
                      Kontakt osoba
                    </p>
                    <p className='mt-1 text-sm font-medium text-stone-900'>
                      {listing.contact_name}
                    </p>
                  </div>

                  <div className='rounded-xl border border-stone-200 bg-stone-50 p-4'>
                    <p className='text-xs uppercase tracking-wide text-stone-500'>
                      Telefon
                    </p>
                    <p className='mt-1 text-sm font-medium text-stone-900'>
                      {listing.contact_phone}
                    </p>
                  </div>

                  {listing.contact_email ? (
                    <div className='rounded-xl border border-stone-200 bg-stone-50 p-4'>
                      <p className='text-xs uppercase tracking-wide text-stone-500'>
                        Email
                      </p>
                      <p className='mt-1 break-all text-sm font-medium text-stone-900'>
                        {listing.contact_email}
                      </p>
                    </div>
                  ) : null}

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
                      className='block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-emerald-700'
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
                      className={textareaClassName}
                    />
                    <button
                      type='submit'
                      className='block w-full rounded-xl bg-rose-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-rose-700'
                    >
                      Odbij oglas
                    </button>
                  </form>
                </div>
              </SectionCard>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
