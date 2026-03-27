import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { TypeBadge } from '@/components/ui/type-badge';
import { EmptyState } from '@/components/ui/empty-state';
import {
  inputClassName,
  selectClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';

type SearchParams = Promise<{
  q?: string;
  city?: string;
  type?: string;
  category?: string;
  page?: string;
}>;

const PAGE_SIZE = 9;

function formatListingPrice({
  price,
  priceCurrency,
  priceType,
}: {
  price?: number | null;
  priceCurrency?: 'RSD' | 'EUR' | null;
  priceType?: 'fixed' | 'hourly' | null;
}) {
  if (price === null || price === undefined) return 'Po dogovoru';

  const currency = priceCurrency === 'EUR' ? 'EUR' : 'RSD';

  const formatted =
    currency === 'RSD'
      ? new Intl.NumberFormat('sr-RS', {
          maximumFractionDigits: 0,
        }).format(price)
      : new Intl.NumberFormat('sr-RS', {
          minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
          maximumFractionDigits: 2,
        }).format(price);

  const suffix = priceType === 'hourly' ? ' / sat' : '';

  return `${formatted} ${currency}${suffix}`;
}

function buildPageHref({
  page,
  q,
  city,
  type,
  category,
}: {
  page: number;
  q?: string;
  city?: string;
  type?: string;
  category?: string;
}) {
  const params = new URLSearchParams();

  if (q) params.set('q', q);
  if (city) params.set('city', city);
  if (type) params.set('type', type);
  if (category) params.set('category', category);
  if (page > 1) params.set('page', String(page));

  const query = params.toString();
  return query ? `/oglasi?${query}` : '/oglasi';
}

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
  const currentPage = Math.max(1, Number(params.page) || 1);

  const supabase = await createClient();

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let listingsQuery = supabase
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
      price_currency,
      price_type,
      type,
      status,
      created_at,
      categories (
        id,
        name,
        slug
      )
    `,
      { count: 'exact' },
    )
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (q) {
    listingsQuery = listingsQuery.or(
      `title.ilike.%${q}%,description.ilike.%${q}%`,
    );
  }

  if (city) {
    listingsQuery = listingsQuery.ilike('city', `%${city}%`);
  }

  if (type && (type === 'trazim' || type === 'nudim')) {
    listingsQuery = listingsQuery.eq('type', type);
  }

  if (category) {
    listingsQuery = listingsQuery.eq('category_id', category);
  }

  const { data: listings, error, count } = await listingsQuery.range(from, to);

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name', { ascending: true });

  if (error) {
    return (
      <main className='min-h-screen bg-[var(--background)]'>
        <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

          <Container className='relative max-w-6xl py-16 lg:py-20'>
            <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700'>
              Greška pri učitavanju oglasa.
            </div>
          </Container>
        </section>
      </main>
    );
  }

  const totalResults = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startResult = totalResults === 0 ? 0 : from + 1;
  const endResult =
    totalResults === 0 ? 0 : Math.min(from + PAGE_SIZE, totalResults);

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative max-w-7xl pt-16 lg:mt-20 lg:mb-8'>
          <div className='mb-10 grid gap-6 rounded-[32px] border border-rose-100 bg-white/55 p-6 shadow-sm backdrop-blur-sm lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:p-8'>
            <div>
              <div className='inline-flex items-center rounded-full border border-rose-200 bg-white px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
                Javni oglasi
              </div>

              <h1 className='mt-4 max-w-3xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl'>
                Pronađi lokalnu uslugu bez lutanja po grupama
              </h1>

              <p className='mt-4 max-w-2xl text-lg leading-8 text-stone-600'>
                Pretraži oglase po gradu, kategoriji i tipu objave i lakše
                pronađi majstore, pomoć u kući, negu i druge usluge u svom
                kraju.
              </p>
            </div>

            <div className='rounded-[28px] border border-rose-100 bg-[#fff8f4] p-5 shadow-sm'>
              <p className='text-sm font-medium text-stone-500'>
                Trenutno dostupno
              </p>

              <div className='mt-3 flex items-end gap-2'>
                <span className='text-4xl font-bold leading-none text-stone-900'>
                  {totalResults}
                </span>
                <span className='pb-1 text-sm text-stone-500'>
                  {totalResults === 1 ? 'oglas' : 'oglasa'}
                </span>
              </div>

              <p className='mt-3 text-sm leading-6 text-stone-600'>
                Pregledaj postojeće oglase ili dodaj svoj i poveži se sa ljudima
                iz svog grada.
              </p>

              <Link
                href='/postavi'
                className='mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600'
              >
                Postavi oglas
              </Link>
            </div>
          </div>

          <div className='grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]'>
            <aside className='h-fit self-start lg:sticky lg:top-24'>
              <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
                <div className='mb-5'>
                  <h2 className='text-lg font-semibold text-stone-900'>
                    Filteri
                  </h2>
                  <p className='mt-1 text-sm text-stone-600'>
                    Suzi rezultate po onome što je najbitnije.
                  </p>
                </div>

                <form className='space-y-4' method='GET'>
                  <div>
                    <label className='mb-1.5 block text-sm font-medium text-stone-700'>
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
                    <label className='mb-1.5 block text-sm font-medium text-stone-700'>
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
                    <label className='mb-1.5 block text-sm font-medium text-stone-700'>
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
                      className='pointer-events-none absolute right-1 top-10 h-6 w-6 text-stone-500'
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
                    <label className='mb-1.5 block text-sm font-medium text-stone-700'>
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
                      className='pointer-events-none absolute right-1 top-10 h-6 w-6 text-stone-500'
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
                      className='flex-1 cursor-pointer rounded-xl bg-rose-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-rose-600'
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
              <div className='mb-5 flex flex-col gap-3 rounded-2xl border border-stone-200/80 bg-white/70 px-4 py-4 shadow-sm sm:px-5'>
                <div className='flex flex-wrap items-center justify-between gap-3'>
                  {q || city || type || category ? (
                    <>
                      <p className='text-sm font-medium text-stone-900'>
                        Aktivni filteri
                      </p>

                      <Link
                        href='/oglasi'
                        className='text-sm font-medium text-rose-600 transition hover:text-rose-700'
                      >
                        Obriši sve
                      </Link>
                    </>
                  ) : (
                    <p className='text-sm text-stone-600'>
                      Nema aktivnih filtera. Prikazani su svi oglasi.
                    </p>
                  )}
                </div>

                {(q || city || type || category) && (
                  <div className='flex flex-wrap gap-2'>
                    {q ? (
                      <span className='inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-stone-700'>
                        Pretraga: {q}
                      </span>
                    ) : null}
                    {city ? (
                      <span className='inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-stone-700'>
                        Grad: {city}
                      </span>
                    ) : null}
                    {type ? (
                      <span className='inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-stone-700'>
                        {type === 'trazim' ? 'Tražim uslugu' : 'Nudim uslugu'}
                      </span>
                    ) : null}
                    {category ? (
                      <span className='inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-stone-700'>
                        Kategorija izabrana
                      </span>
                    ) : null}
                  </div>
                )}

                {totalResults > 0 ? (
                  <p className='text-sm text-stone-500'>
                    Prikazano {startResult}–{endResult} od ukupno {totalResults}{' '}
                    {totalResults === 1 ? 'oglasa' : 'oglasa'}
                  </p>
                ) : null}
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
                <>
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
                          className='group block rounded-[28px] border border-stone-200 bg-white px-6 py-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md sm:px-7'
                        >
                          <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
                            <div className='min-w-0 flex-1'>
                              <div className='mb-4 flex flex-wrap items-center gap-2'>
                                <TypeBadge
                                  type={listing.type as 'trazim' | 'nudim'}
                                />

                                {categoryName ? (
                                  <span className='inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600'>
                                    {categoryName}
                                  </span>
                                ) : null}
                              </div>

                              <h2 className='text-2xl font-semibold tracking-tight text-stone-900 transition group-hover:text-rose-600'>
                                {listing.title}
                              </h2>

                              <p className='mt-3 max-w-2xl line-clamp-2 text-[15px] leading-7 text-stone-600'>
                                {listing.description}
                              </p>

                              <div className='mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-500'>
                                <span className='inline-flex items-center rounded-full bg-stone-100 px-3 py-1'>
                                  {listing.city}
                                  {listing.area ? `, ${listing.area}` : ''}
                                </span>

                                <span className='inline-flex items-center rounded-full bg-stone-100 px-3 py-1'>
                                  {new Date(
                                    listing.created_at,
                                  ).toLocaleDateString('sr-RS')}
                                </span>
                              </div>

                              <div className='mt-6 inline-flex items-center text-sm font-semibold text-rose-600 transition group-hover:text-rose-700'>
                                Pogledaj detalje
                                <span className='ml-2 transition-transform duration-200 group-hover:translate-x-1'>
                                  →
                                </span>
                              </div>
                            </div>

                            <div className='lg:w-[190px] lg:shrink-0'>
                              <div className='rounded-[24px] border border-rose-100 bg-gradient-to-b from-[#fff8f4] to-[#fffdfb] px-5 py-4 text-left shadow-sm lg:text-right'>
                                <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500'>
                                  Cena
                                </p>

                                <p className='mt-2 text-2xl font-bold tracking-tight text-stone-900'>
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

                                <p className='mt-2 text-xs text-stone-500'>
                                  Kontakt i detalji u oglasu
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {totalPages > 1 ? (
                    <div className='mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white/80 px-4 py-4 shadow-sm sm:flex-row sm:px-5'>
                      {safeCurrentPage === 1 ? (
                        <span className='inline-flex min-w-[120px] cursor-not-allowed items-center justify-center rounded-xl border border-stone-200 bg-stone-100 px-4 py-3 text-sm font-medium text-stone-400 opacity-60'>
                          ← Prethodna
                        </span>
                      ) : (
                        <Link
                          href={buildPageHref({
                            page: safeCurrentPage - 1,
                            q,
                            city,
                            type,
                            category,
                          })}
                          className='inline-flex min-w-[120px] items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-rose-200 hover:text-rose-600'
                        >
                          ← Prethodna
                        </Link>
                      )}

                      <div className='flex flex-wrap items-center justify-center gap-2'>
                        {Array.from({ length: totalPages }, (_, index) => {
                          const pageNumber = index + 1;
                          const isActive = pageNumber === safeCurrentPage;

                          return (
                            <Link
                              key={pageNumber}
                              href={buildPageHref({
                                page: pageNumber,
                                q,
                                city,
                                type,
                                category,
                              })}
                              className={`inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-medium transition ${
                                isActive
                                  ? 'bg-rose-500 text-white'
                                  : 'border border-stone-200 bg-white text-stone-700 hover:border-rose-200 hover:text-rose-600'
                              }`}
                            >
                              {pageNumber}
                            </Link>
                          );
                        })}
                      </div>

                      {safeCurrentPage === totalPages ? (
                        <span className='inline-flex min-w-[120px] cursor-not-allowed items-center justify-center rounded-xl border border-stone-200 bg-stone-100 px-4 py-3 text-sm font-medium text-stone-400 opacity-70'>
                          Sledeća →
                        </span>
                      ) : (
                        <Link
                          href={buildPageHref({
                            page: safeCurrentPage + 1,
                            q,
                            city,
                            type,
                            category,
                          })}
                          className='inline-flex min-w-[120px] items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-rose-200 hover:text-rose-600'
                        >
                          Sledeća →
                        </Link>
                      )}
                    </div>
                  ) : null}
                </>
              )}
            </section>
          </div>
        </Container>
      </section>
    </main>
  );
}
