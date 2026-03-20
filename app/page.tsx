import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { TypeBadge } from '@/components/ui/type-badge';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
  inputClassName,
  selectClassName,
} from '@/lib/constants/ui';

export default async function HomePage() {
  const supabase = await createClient();

  const { data: latestListings } = await supabase
    .from('listings')
    .select('id, title, slug, city, area, price, type')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name', { ascending: true });

  return (
    <main className='bg-white'>
      <section className='relative overflow-hidden border-b border-gray-100 bg-white'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_35%)]' />
        <Container className='relative grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:py-24'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700'>
              Lokalna platforma za usluge
            </div>

            <h1 className='mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl'>
              Pronađi ili objavi uslugu u svom gradu
            </h1>

            <p className='mt-6 max-w-xl text-lg leading-8 text-gray-600'>
              UslugeBlizu povezuje ljude kojima nešto treba sa ljudima koji tu
              uslugu nude — jednostavno, lokalno i bez komplikacije.
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Link href='/oglasi' className={primaryButtonClassName}>
                Pregledaj oglase
              </Link>
              <Link href='/postavi' className={secondaryButtonClassName}>
                Postavi oglas
              </Link>
            </div>

            <div className='mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3'>
              <div className='rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4'>
                <p className='text-2xl font-semibold text-gray-900'>Lokalno</p>
                <p className='mt-1 text-sm text-gray-600'>
                  Fokus na gradove, naselja i sela
                </p>
              </div>
              <div className='rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4'>
                <p className='text-2xl font-semibold text-gray-900'>
                  Jednostavno
                </p>
                <p className='mt-1 text-sm text-gray-600'>
                  Bez komplikovanih koraka i viška opcija
                </p>
              </div>
              <div className='rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4'>
                <p className='text-2xl font-semibold text-gray-900'>Brzo</p>
                <p className='mt-1 text-sm text-gray-600'>
                  Do oglasa ili objave za par minuta
                </p>
              </div>
            </div>
          </div>

          <SectionCard className='border-gray-200 p-6 lg:p-7'>
            <div className='mb-6'>
              <p className='text-sm font-medium text-blue-600'>Brza pretraga</p>
              <h2 className='mt-2 text-2xl font-semibold tracking-tight text-gray-900'>
                Nađi ono što ti treba
              </h2>
              <p className='mt-2 text-sm leading-6 text-gray-600'>
                Pretraži oglase po usluzi, gradu i tipu objave.
              </p>
            </div>

            <form action='/oglasi' className='space-y-4'>
              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Šta tražiš
                </label>
                <input
                  name='q'
                  placeholder='npr. čišćenje, moler, čuvanje psa'
                  className={inputClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Grad
                </label>
                <input
                  name='city'
                  placeholder='npr. Subotica'
                  className={inputClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Tip oglasa
                </label>
                <select name='type' className={selectClassName}>
                  <option value=''>Svi oglasi</option>
                  <option value='trazim'>Tražim uslugu</option>
                  <option value='nudim'>Nudim uslugu</option>
                </select>
              </div>

              <button
                type='submit'
                className='w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700'
              >
                Pretraži oglase
              </button>
            </form>
          </SectionCard>
        </Container>
      </section>

      <section className='py-14 lg:py-16'>
        <Container>
          <div className='mb-6 flex items-end justify-between gap-4'>
            <div>
              <p className='text-sm font-medium text-blue-600'>Kategorije</p>
              <h2 className='mt-2 text-3xl font-semibold tracking-tight text-gray-900'>
                Popularne kategorije
              </h2>
              <p className='mt-2 max-w-2xl text-sm leading-6 text-gray-600'>
                Pregledaj oglase po najčešćim vrstama usluga.
              </p>
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {categories?.map((category) => (
              <Link key={category.id} href={`/oglasi?category=${category.id}`}>
                <SectionCard className='h-full p-5 transition hover:-translate-y-0.5 hover:shadow-md'>
                  <div className='flex h-full flex-col'>
                    <p className='text-lg font-semibold text-gray-900'>
                      {category.name}
                    </p>
                    <p className='mt-2 text-sm leading-6 text-gray-600'>
                      Pregledaj oglase iz kategorije{' '}
                      {category.name.toLowerCase()}.
                    </p>
                    <span className='mt-5 inline-flex text-sm font-medium text-blue-600'>
                      Pogledaj oglase →
                    </span>
                  </div>
                </SectionCard>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className='border-t border-gray-100 py-14 lg:py-16'>
        <Container>
          <div className='mb-6 flex items-end justify-between gap-4'>
            <div>
              <p className='text-sm font-medium text-blue-600'>Najnovije</p>
              <h2 className='mt-2 text-3xl font-semibold tracking-tight text-gray-900'>
                Aktuelni oglasi
              </h2>
              <p className='mt-2 max-w-2xl text-sm leading-6 text-gray-600'>
                Poslednji odobreni oglasi na platformi.
              </p>
            </div>

            <Link
              href='/oglasi'
              className='text-sm font-medium text-blue-600 hover:underline'
            >
              Vidi sve
            </Link>
          </div>

          {!latestListings || latestListings.length === 0 ? (
            <SectionCard className='p-8'>
              <p className='text-sm text-gray-600'>
                Trenutno nema odobrenih oglasa.
              </p>
            </SectionCard>
          ) : (
            <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
              {latestListings.map((listing) => (
                <Link
                  key={listing.id}
                  href={`/oglasi/${listing.slug}`}
                  className='rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                >
                  <div className='mb-4 flex items-center justify-between gap-3'>
                    <TypeBadge type={listing.type as 'trazim' | 'nudim'} />
                    <span className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                      {listing.price ? `${listing.price} RSD` : 'Po dogovoru'}
                    </span>
                  </div>

                  <h3 className='line-clamp-2 text-xl font-semibold tracking-tight text-gray-900'>
                    {listing.title}
                  </h3>

                  <p className='mt-3 text-sm leading-6 text-gray-600'>
                    {listing.city}
                    {listing.area ? `, ${listing.area}` : ''}
                  </p>

                  <div className='mt-6 flex items-center justify-between'>
                    <span className='text-sm font-medium text-blue-600'>
                      Pogledaj detalje
                    </span>
                    <span className='text-gray-300'>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className='border-t border-gray-100 py-14 lg:py-16'>
        <Container>
          <SectionCard className='overflow-hidden bg-gray-50 p-8 lg:p-10'>
            <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center'>
              <div>
                <p className='text-sm font-medium text-blue-600'>
                  Spremna da objaviš?
                </p>
                <h2 className='mt-2 text-3xl font-semibold tracking-tight text-gray-900'>
                  Dodaj svoj oglas za nekoliko minuta
                </h2>
                <p className='mt-3 max-w-2xl text-base leading-7 text-gray-600'>
                  Bilo da tražiš pomoć ili nudiš uslugu, dovoljno je da uneseš
                  osnovne podatke i pošalješ oglas na pregled.
                </p>
              </div>

              <div className='flex lg:justify-end'>
                <Link href='/postavi' className={primaryButtonClassName}>
                  Postavi oglas
                </Link>
              </div>
            </div>
          </SectionCard>
        </Container>
      </section>
    </main>
  );
}
