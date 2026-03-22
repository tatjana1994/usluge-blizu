import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
  inputClassName,
  selectClassName,
} from '@/lib/constants/ui';
import { ListingCard } from '@/components/listings/listing-card';
import { LatestListingsCarousel } from '@/components/listings/latest-listings-carousel';

export default async function HomePage() {
  const supabase = await createClient();

  const { data: latestListings } = await supabase
    .from('listings')
    .select(
      'id, title, slug, city, area, price, price_currency, price_type, type',
    )
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(6);

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name', { ascending: true });

  return (
    <main className='bg-[var(--background)]'>
      {/* HERO */}
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center lg:py-24'>
          <div className='max-w-2xl'>
            <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
              Lokalna platforma za usluge
            </div>

            <h1 className='mt-6 max-w-3xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl'>
              Pronađi ili objavi uslugu u svom gradu
            </h1>

            <p className='mt-6 max-w-xl text-lg leading-8 text-stone-600'>
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

            <div className='mt-10 grid max-w-2xl gap-4 sm:grid-cols-3'>
              <div className='rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>Lokalno</p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Fokus na gradove, naselja i sela
                </p>
              </div>

              <div className='rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>
                  Jednostavno
                </p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Bez komplikovanih koraka i viška opcija
                </p>
              </div>

              <div className='rounded-2xl border border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>Brzo</p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Do oglasa ili objave za par minuta
                </p>
              </div>
            </div>
          </div>

          <SectionCard className='border-stone-200 bg-white/95 p-6 shadow-lg lg:p-7'>
            <div className='mb-6'>
              <p className='text-md font-medium text-rose-600'>Brza pretraga</p>
              <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                Nađi ono što ti treba
              </h2>
              <p className='mt-2 text-md leading-6 text-stone-600'>
                Pretraži oglase po usluzi, gradu i tipu objave.
              </p>
            </div>

            <form action='/oglasi' className='space-y-4'>
              <div>
                <label className='mb-1.5 block text-md font-medium text-stone-700'>
                  Šta tražiš
                </label>
                <input
                  name='q'
                  placeholder='npr. čišćenje, moler, čuvanje psa'
                  className={inputClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-md font-medium text-stone-700'>
                  Grad
                </label>
                <input
                  name='city'
                  placeholder='npr. Subotica'
                  className={inputClassName}
                />
              </div>

              <div className='relative'>
                <label className='mb-1.5 block text-md font-medium text-stone-700'>
                  Tip oglasa
                </label>
                <select name='type' className={selectClassName}>
                  <option value=''>Svi oglasi</option>
                  <option value='trazim'>Tražim uslugu</option>
                  <option value='nudim'>Nudim uslugu</option>
                </select>
                <svg
                  className='pointer-events-none absolute right-1 top-11 h-6 w-6 text-gray-500'
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

              <button
                type='submit'
                className='w-full cursor-pointer rounded-xl bg-rose-500 px-4 py-3 !text-lg !font-bold text-white transition hover:bg-rose-600'
              >
                Pretraži oglase
              </button>
            </form>
          </SectionCard>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className='border-b border-[var(--border)] bg-[var(--background)] py-14 lg:py-16'>
        <Container>
          <div className='mb-8 text-left'>
            <p className='text-lg font-medium text-rose-600'>
              Kako funkcioniše
            </p>
            <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
              Tri jednostavna koraka
            </h2>
            <p className=' mt-3 max-w-2xl text-md leading-6 text-stone-600'>
              Platforma je napravljena da bude jednostavna i za one koji traže
              pomoć i za one koji nude usluge.
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-3'>
            <SectionCard className='border-stone-200 p-6'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600'>
                1
              </div>
              <h3 className='text-2xl font-semibold text-stone-900'>
                Pretraži ili objavi
              </h3>
              <p className='mt-2 text-md leading-6 text-stone-600'>
                Pronađi postojeći oglas ili dodaj svoj za nekoliko minuta.
              </p>
            </SectionCard>

            <SectionCard className='border-stone-200 p-6'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600'>
                2
              </div>
              <h3 className='text-2xl font-semibold text-stone-900'>
                Oglas ide na pregled
              </h3>
              <p className='mt-2 text-md leading-6 text-stone-600'>
                Svaki oglas se pregleda pre objave kako bi platforma ostala
                uredna i pouzdana.
              </p>
            </SectionCard>

            <SectionCard className='border-stone-200 p-6'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600'>
                3
              </div>
              <h3 className='text-2xl font-semibold text-stone-900'>
                Poveži se direktno
              </h3>
              <p className='mt-2 text-md leading-6 text-stone-600'>
                Kada pronađeš odgovarajuću uslugu, kontaktiraš oglašivača
                direktno.
              </p>
            </SectionCard>
          </div>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className='bg-[var(--background)] py-14 lg:py-16'>
        <Container>
          <div className='mb-6 flex items-end justify-between gap-4'>
            <div>
              <p className='text-lg font-medium text-rose-600'>Kategorije</p>
              <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
                Popularne kategorije
              </h2>
              <p className='mt-2 max-w-2xl text-md leading-6 text-stone-600'>
                Pregledaj oglase po najčešćim vrstama usluga.
              </p>
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {categories?.map((category) => (
              <Link key={category.id} href={`/oglasi?category=${category.id}`}>
                <SectionCard className='h-full border-stone-200 p-5 transition hover:-translate-y-0.5 hover:shadow-md'>
                  <div className='flex h-full flex-col'>
                    <p className='text-xl font-bold text-stone-900'>
                      {category.name}
                    </p>
                    <p className='mt-2 text-md leading-6 text-stone-600'>
                      Pregledaj oglase iz kategorije{' '}
                      {category.name.toLowerCase()}.
                    </p>
                    <span className='mt-5 inline-flex text-md font-medium text-rose-600 hover:text-rose-600'>
                      Pogledaj oglase →
                    </span>
                  </div>
                </SectionCard>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* LATEST */}
      <section className='border-y border-[var(--border)] bg-[#fff5ef] py-14 lg:py-16'>
        <Container>
          <div className='mb-6 flex items-end justify-between gap-4'>
            <div>
              <p className='text-lg font-medium text-rose-600'>Najnovije</p>
              <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
                Aktuelni oglasi
              </h2>
              <p className='mt-2 max-w-2xl text-md leading-6 text-stone-600'>
                Poslednji odobreni oglasi na platformi.
              </p>
            </div>

            <Link
              href='/oglasi'
              className='text-sm font-medium text-rose-500 hover:text-rose-600 hover:underline'
            >
              Vidi sve →
            </Link>
          </div>

          {!latestListings || latestListings.length === 0 ? (
            <SectionCard className='border-stone-200 p-8'>
              <p className='text-sm text-stone-600'>
                Trenutno nema odobrenih oglasa.
              </p>
            </SectionCard>
          ) : (
            <LatestListingsCarousel
              listings={latestListings.map((listing) => ({
                ...listing,
                type: listing.type as 'trazim' | 'nudim',
              }))}
            />
          )}
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className='bg-[var(--background)] py-14 lg:py-16'>
        <Container>
          <div className='rounded-3xl border border-rose-200 bg-[#fff1ea] px-8 py-10 lg:px-12 lg:py-12'>
            <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center'>
              <div>
                <p className='text-lg font-medium text-rose-600'>
                  Spreman/na da objaviš?
                </p>
                <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
                  Dodaj svoj oglas za nekoliko minuta
                </h2>
                <p className='mt-3 max-w-2xl text-base leading-7 text-stone-600'>
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
          </div>
        </Container>
      </section>
    </main>
  );
}
