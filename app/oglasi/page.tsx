import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { TypeBadge } from '@/components/ui/type-badge';
import { EmptyState } from '@/components/ui/empty-state';
import {
  inputClassName,
  selectClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';

type SearchParams = Promise<{
  q?: string;
  city?: string;
  type?: string;
  category?: string;
}>;

export default async function OglasiPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = params.q?.trim() || '';
  const city = params.city?.trim() || '';
  const type = params.type?.trim() || '';
  const category = params.category?.trim() || '';

  const supabase = await createClient();

  let query = supabase
    .from('listings')
    .select(
      `
      id,
      title,
      slug,
      description,
      city,
      area,
      price,
      type,
      status,
      created_at,
      categories (
        id,
        name,
        slug
      )
    `,
    )
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (q) {
    query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  }

  if (city) {
    query = query.ilike('city', city);
  }

  if (type && (type === 'trazim' || type === 'nudim')) {
    query = query.eq('type', type);
  }

  if (category) {
    query = query.eq('category_id', category);
  }

  const { data: listings, error } = await query;

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name', { ascending: true });

  if (error) {
    return (
      <main className='min-h-screen bg-white py-16'>
        <Container className='max-w-6xl'>
          <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700'>
            Greška pri učitavanju oglasa.
          </div>
        </Container>
      </main>
    );
  }

  const totalResults = listings?.length ?? 0;

  return (
    <main className='min-h-screen bg-white py-16'>
      <Container className='max-w-7xl'>
        <div className='mb-10'>
          <p className='text-sm font-medium text-blue-600'>Javni oglasi</p>
          <h1 className='mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
            Pronađi lokalnu uslugu
          </h1>
          <p className='mt-3 max-w-2xl text-base leading-7 text-gray-600'>
            Pretraži oglase po gradu, kategoriji ili tipu objave i pronađi ono
            što ti treba u svom kraju.
          </p>
        </div>

        <div className='grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]'>
          <aside className='h-fit lg:sticky lg:top-24'>
            <SectionCard className='p-5'>
              <div className='mb-5'>
                <h2 className='text-lg font-semibold text-gray-900'>Filteri</h2>
                <p className='mt-1 text-sm text-gray-600'>
                  Suzi rezultate po onome što ti je bitno.
                </p>
              </div>

              <form className='space-y-4' method='GET'>
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Pretraga
                  </label>
                  <input
                    name='q'
                    defaultValue={q}
                    placeholder='majstor, čišćenje...'
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5  block text-sm font-medium text-gray-700'>
                    Grad
                  </label>
                  <input
                    name='city'
                    defaultValue={city}
                    placeholder='Subotica'
                    className={inputClassName}
                  />
                </div>

                <div className='relative'>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Tip oglasa
                  </label>
                  <select
                    name='type'
                    defaultValue={type}
                    className={selectClassName}
                  >
                    <option value=''>Svi oglasi</option>
                    <option value='trazim'>Tražim uslugu</option>
                    <option value='nudim'>Nudim uslugu</option>
                  </select>
                  <svg
                    className='pointer-events-none absolute right-1 top-10 h-6 w-6 text-gray-500'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 8L10 12L14 8'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>

                <div className='relative'>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Kategorija
                  </label>
                  <select
                    name='category'
                    defaultValue={category}
                    className={selectClassName}
                  >
                    <option value=''>Sve kategorije</option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <svg
                    className='pointer-events-none absolute right-1 top-10 h-6 w-6 text-gray-500'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6 8L10 12L14 8'
                      stroke='currentColor'
                      strokeWidth='1.8'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>

                <div className='flex gap-3 pt-2'>
                  <button
                    type='submit'
                    className='flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700'
                  >
                    Primeni
                  </button>

                  <Link href='/oglasi' className={secondaryButtonClassName}>
                    Reset
                  </Link>
                </div>
              </form>
            </SectionCard>
          </aside>

          <section>
            <div className='mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <p className='text-sm text-gray-600'>
                  Ukupno rezultata:{' '}
                  <span className='font-semibold text-gray-900'>
                    {totalResults}
                  </span>
                </p>

                {(q || city || type || category) && (
                  <div className='mt-3 flex flex-wrap gap-2'>
                    {q ? (
                      <span className='inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700'>
                        Pretraga: {q}
                      </span>
                    ) : null}
                    {city ? (
                      <span className='inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700'>
                        Grad: {city}
                      </span>
                    ) : null}
                    {type ? (
                      <span className='inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700'>
                        {type === 'trazim' ? 'Tražim uslugu' : 'Nudim uslugu'}
                      </span>
                    ) : null}
                  </div>
                )}
              </div>

              <Link href='/postavi' className={primaryButtonClassName}>
                Postavi oglas
              </Link>
            </div>

            {!listings || listings.length === 0 ? (
              <EmptyState
                title='Nema rezultata'
                description='Pokušaj sa drugim gradom, kategorijom ili pretragom.'
                action={
                  <Link href='/oglasi' className={secondaryButtonClassName}>
                    Resetuj filtere
                  </Link>
                }
              />
            ) : (
              <div className='grid gap-4'>
                {listings.map((listing) => {
                  const categoryName =
                    Array.isArray(listing.categories) &&
                    listing.categories.length > 0
                      ? listing.categories[0].name
                      : null;

                  return (
                    <Link
                      key={listing.id}
                      href={`/oglasi/${listing.slug}`}
                      className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                    >
                      <div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
                        <div className='min-w-0'>
                          <div className='mb-3 flex flex-wrap items-center gap-2'>
                            <TypeBadge
                              type={listing.type as 'trazim' | 'nudim'}
                            />

                            {categoryName ? (
                              <span className='inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700'>
                                {categoryName}
                              </span>
                            ) : null}
                          </div>

                          <h2 className='text-xl font-semibold tracking-tight text-gray-900'>
                            {listing.title}
                          </h2>

                          <p className='mt-2 line-clamp-2 text-sm leading-6 text-gray-600'>
                            {listing.description}
                          </p>

                          <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500'>
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

                          <div className='mt-5 inline-flex items-center text-sm font-medium text-blue-600'>
                            Pogledaj detalje
                            <span className='ml-2 text-gray-300'>→</span>
                          </div>
                        </div>

                        <div className='shrink-0 sm:min-w-[130px]'>
                          <div className='rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left sm:text-right'>
                            <p className='text-[11px] font-medium uppercase tracking-wide text-gray-500'>
                              Cena
                            </p>
                            <p className='mt-1 text-lg font-semibold text-gray-900'>
                              {listing.price
                                ? `${listing.price} RSD`
                                : 'Po dogovoru'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
