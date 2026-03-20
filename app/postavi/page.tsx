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
      <main className='min-h-screen bg-white py-16'>
        <Container className='max-w-3xl'>
          <div className='rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700'>
            Greška pri učitavanju kategorija.
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-white py-16'>
      <Container className='grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]'>
        <div className='h-fit space-y-4'>
          <div>
            <p className='text-sm font-medium text-blue-600'>Novi oglas</p>
            <h1 className='mt-2 text-4xl font-semibold tracking-tight text-gray-900'>
              Postavi oglas
            </h1>
            <p className='mt-3 text-base leading-7 text-gray-600'>
              Popuni osnovne podatke i tvoj oglas će biti poslat na pregled pre
              objave.
            </p>
          </div>

          <SectionCard className='p-5'>
            <p className='text-sm font-medium text-gray-900'>
              Kako funkcioniše
            </p>
            <ul className='mt-3 space-y-3 text-sm text-gray-600'>
              <li>1. Izaberi da li tražiš ili nudiš uslugu</li>
              <li>2. Unesi osnovne podatke i kontakt</li>
              <li>3. Oglas ide na pregled pre objave</li>
            </ul>
          </SectionCard>

          <SectionCard className='p-5'>
            <p className='text-sm font-medium text-gray-900'>Saveti</p>
            <ul className='mt-3 space-y-3 text-sm text-gray-600'>
              <li>• Napiši jasan i konkretan naslov</li>
              <li>• U opisu objasni šta tačno tražiš ili nudiš</li>
              <li>• Ostavi ispravan kontakt telefon</li>
            </ul>
          </SectionCard>
        </div>

        <SectionCard className='p-8'>
          {error ? (
            <div className='mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {error}
            </div>
          ) : null}

          <form action={createListing} className='space-y-8'>
            <div className='space-y-5'>
              <div>
                <h2 className='text-xl font-semibold tracking-tight text-gray-900'>
                  Osnovne informacije
                </h2>
                <p className='mt-1 text-sm text-gray-600'>
                  Unesi osnovne podatke o oglasu.
                </p>
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Tip oglasa
                </label>
                <select name='type' required className={selectClassName}>
                  <option value=''>Izaberi tip</option>
                  <option value='trazim'>Tražim uslugu</option>
                  <option value='nudim'>Nudim uslugu</option>
                </select>
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Naslov
                </label>
                <input
                  name='title'
                  type='text'
                  required
                  placeholder='Npr. Treba mi neko da očisti stan'
                  className={inputClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Opis
                </label>
                <textarea
                  name='description'
                  required
                  rows={6}
                  placeholder='Opiši šta ti treba ili šta nudiš...'
                  className={textareaClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Kategorija
                </label>
                <select name='categoryId' required className={selectClassName}>
                  <option value=''>Izaberi kategoriju</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='space-y-5 border-t border-gray-100 pt-8'>
              <div>
                <h2 className='text-xl font-semibold tracking-tight text-gray-900'>
                  Lokacija i cena
                </h2>
                <p className='mt-1 text-sm text-gray-600'>
                  Dodaj grad, naselje i okvirnu cenu ako je poznata.
                </p>
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Cena
                </label>
                <input
                  name='price'
                  type='number'
                  placeholder='3000'
                  className={inputClassName}
                />
                <p className='mt-1.5 text-xs text-gray-500'>
                  Opciono. Ostavi prazno ako cena nije definisana.
                </p>
              </div>
            </div>

            <div className='space-y-5 border-t border-gray-100 pt-8'>
              <div>
                <h2 className='text-xl font-semibold tracking-tight text-gray-900'>
                  Kontakt podaci
                </h2>
                <p className='mt-1 text-sm text-gray-600'>
                  Ove podatke će drugi korisnici koristiti da te kontaktiraju.
                </p>
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Kontakt ime
                  </label>
                  <input
                    name='contactName'
                    type='text'
                    required
                    placeholder='Tatjana'
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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

            <div className='border-t border-gray-100 pt-8'>
              <button
                type='submit'
                className='w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto'
              >
                Pošalji oglas
              </button>
            </div>
          </form>
        </SectionCard>
      </Container>
    </main>
  );
}
