import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createListing } from '@/app/actions/listings';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import {
  inputClassName,
  selectClassName,
  textareaClassName,
} from '@/lib/constants/ui';

export default async function PostaviPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name', { ascending: true });

  if (categoriesError) {
    return (
      <main className='min-h-screen bg-[var(--background)]'>
        <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

          <Container className='relative max-w-3xl py-16 lg:py-20'>
            <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700'>
              Greška pri učitavanju kategorija.
            </div>
          </Container>
        </section>
      </main>
    );
  }

  const order = [
    'lepota',
    'majstori',
    'pomoc',
    'briga',
    'dvoriste',
    'selidbe',
    'ljubimci',
    'it',
  ];

  const sortedCategories = categories?.sort(
    (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug),
  );

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative grid gap-10 py-16 lg:grid-cols-[320px_minmax(0,1fr)] lg:py-20'>
          <div className='h-fit space-y-4'>
            <div>
              <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
                Novi oglas
              </div>

              <h1 className='mt-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
                Postavljanje oglasa
              </h1>

              <p className='mt-4 text-lg leading-8 text-stone-600'>
                Unos osnovnih informacija i slanje oglasa na pregled pre objave.
              </p>
            </div>

            <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
              <p className='text-base font-semibold text-stone-900'>
                Kako funkcioniše
              </p>

              <ul className='mt-3 space-y-3 text-sm leading-6 text-stone-600'>
                <li>1. Izbor tipa oglasa i kategorije</li>
                <li>2. Unos osnovnih podataka i kontakta</li>
                <li>3. Slanje oglasa na pregled pre objave</li>
              </ul>
            </SectionCard>

            <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
              <p className='text-base font-semibold text-stone-900'>Saveti</p>

              <ul className='mt-3 space-y-3 text-sm leading-6 text-stone-600'>
                <li>• Naslov treba da bude jasan i konkretan</li>
                <li>• U opisu je korisno navesti što više detalja</li>
                <li>• Kontakt telefon treba da bude ispravan i dostupan</li>
              </ul>
            </SectionCard>
          </div>

          <SectionCard className='border-stone-200 bg-white/95 p-8 shadow-lg'>
            {error ? (
              <div className='mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                {error}
              </div>
            ) : null}

            <form action={createListing} className='space-y-8'>
              <div className='space-y-5'>
                <div>
                  <p className='text-md font-medium text-rose-600'>
                    Osnovne informacije
                  </p>
                  <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                    Podaci o oglasu
                  </h2>
                  <p className='mt-2 text-md leading-6 text-stone-600'>
                    Unos osnovnih informacija potrebnih za objavu oglasa.
                  </p>
                </div>

                <div className='relative'>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Tip oglasa
                  </label>
                  <select name='type' required className={selectClassName}>
                    <option value=''>Izaberi tip</option>
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

                <div>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Naslov
                  </label>
                  <input
                    name='title'
                    type='text'
                    required
                    placeholder='Npr. Potrebno čišćenje stana'
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Opis
                  </label>
                  <textarea
                    name='description'
                    required
                    rows={6}
                    placeholder='Upiši detalje oglasa, šta je potrebno ili šta se nudi...'
                    className={textareaClassName}
                  />
                </div>

                <div className='relative'>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Kategorija
                  </label>
                  <select
                    name='categoryId'
                    required
                    defaultValue=''
                    className={selectClassName}
                  >
                    <option value='' disabled>
                      Odaberi vrstu usluge
                    </option>
                    {sortedCategories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
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
              </div>

              <div className='space-y-5 border-t border-stone-100 pt-8'>
                <div>
                  <p className='text-md font-medium text-rose-600'>
                    Lokacija i cena
                  </p>
                  <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                    Mesto objave
                  </h2>
                  <p className='mt-2 text-md leading-6 text-stone-600'>
                    Dodavanje grada, naselja i okvirne cene ako je poznata.
                  </p>
                </div>

                <div className='grid gap-5 sm:grid-cols-2'>
                  <div>
                    <label className='mb-1.5 block text-md font-medium text-stone-700'>
                      Grad
                    </label>
                    <input
                      name='city'
                      type='text'
                      required
                      placeholder='Subotica'
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className='mb-1.5 block text-md font-medium text-stone-700'>
                      Naselje / selo
                    </label>
                    <input
                      name='area'
                      type='text'
                      placeholder='Palić'
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <div>
                    <label className='mb-1.5 block text-md font-medium text-stone-700'>
                      Cena
                    </label>
                    <input
                      name='price'
                      type='number'
                      min='0'
                      step='0.01'
                      placeholder='3000'
                      className={inputClassName}
                    />
                  </div>

                  <div className='grid gap-5 sm:grid-cols-2'>
                    <div className='relative'>
                      <label className='mb-1.5 block text-md font-medium text-stone-700'>
                        Valuta
                      </label>
                      <select name='priceCurrency' className={selectClassName}>
                        <option value='RSD'>Dinari (RSD)</option>
                        <option value='EUR'>Evri (EUR)</option>
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

                    <div className='relative'>
                      <label className='mb-1.5 block text-md font-medium text-stone-700'>
                        Obračun
                      </label>
                      <select name='priceType' className={selectClassName}>
                        <option value='fixed'>Ukupno</option>
                        <option value='hourly'>Po satu</option>
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
                  </div>

                  <p className='text-xs text-stone-500'>
                    Opciono. Primer: 3000 RSD ukupno ili 10 EUR po satu.
                  </p>
                </div>
              </div>

              <div className='space-y-5 border-t border-stone-100 pt-8'>
                <div>
                  <p className='text-md font-medium text-rose-600'>
                    Kontakt podaci
                  </p>
                  <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                    Podaci za kontakt
                  </h2>
                  <p className='mt-2 text-md leading-6 text-stone-600'>
                    Ovi podaci služe za kontakt u vezi sa oglasom.
                  </p>
                </div>

                <div className='grid gap-5 sm:grid-cols-2'>
                  <div>
                    <label className='mb-1.5 block text-md font-medium text-stone-700'>
                      Kontakt ime
                    </label>
                    <input
                      name='contactName'
                      type='text'
                      required
                      placeholder='Ime'
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label className='mb-1.5 block text-md font-medium text-stone-700'>
                      Telefon
                    </label>
                    <input
                      name='contactPhone'
                      type='text'
                      required
                      placeholder='06x xxx xxxx'
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Email
                  </label>
                  <input
                    name='contactEmail'
                    type='email'
                    placeholder='kontakt@email.com'
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className='border-t border-stone-100 pt-8'>
                <button
                  type='submit'
                  className='w-full cursor-pointer rounded-xl bg-rose-500 px-4 py-3 text-lg font-bold text-white transition hover:bg-rose-600 sm:w-auto'
                >
                  Pošalji oglas
                </button>
              </div>
            </form>
          </SectionCard>
        </Container>
      </section>
    </main>
  );
}
