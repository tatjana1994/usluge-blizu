import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updateListing } from '@/app/actions/listings';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import {
  inputClassName,
  selectClassName,
  textareaClassName,
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';

export default async function IzmeniOglasPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const errorMessage = sp.error;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/prijava');
  }

  const { data: listing, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !listing) {
    notFound();
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true });

  return (
    <main className='min-h-screen bg-white py-16'>
      <Container className='grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]'>
        <div className='h-fit space-y-4'>
          <div>
            <p className='text-sm font-medium text-blue-600'>Izmena oglasa</p>
            <h1 className='mt-2 text-4xl font-semibold tracking-tight text-gray-900'>
              Izmeni oglas
            </h1>
            <p className='mt-3 text-base leading-7 text-gray-600'>
              Ažuriraj podatke oglasa. Nakon izmene, oglas će ponovo biti poslat
              na pregled.
            </p>
          </div>

          <SectionCard className='p-5'>
            <p className='text-sm font-medium text-gray-900'>Važno</p>
            <ul className='mt-3 space-y-3 text-sm text-gray-600'>
              <li>• Posle izmene status oglasa ide nazad na pregled</li>
              <li>• Proveri naslov, opis i kontakt podatke pre čuvanja</li>
              <li>• Jasniji opis povećava šansu da te neko kontaktira</li>
            </ul>
          </SectionCard>

          <SectionCard className='p-5'>
            <p className='text-sm font-medium text-gray-900'>Brzi pregled</p>
            <div className='mt-3 space-y-3 text-sm text-gray-600'>
              <div>
                <span className='font-medium text-gray-900'>
                  Trenutni naslov:
                </span>{' '}
                {listing.title}
              </div>
              <div>
                <span className='font-medium text-gray-900'>Grad:</span>{' '}
                {listing.city}
                {listing.area ? `, ${listing.area}` : ''}
              </div>
              <div>
                <span className='font-medium text-gray-900'>Status:</span>{' '}
                {listing.status}
              </div>
            </div>
          </SectionCard>
        </div>

        <SectionCard className='p-4'>
          {errorMessage ? (
            <div className='mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {errorMessage}
            </div>
          ) : null}

          <form action={updateListing} className='space-y-8'>
            <input type='hidden' name='id' value={listing.id} />

            <div className='space-y-5'>
              <div>
                <h2 className='text-xl font-semibold tracking-tight text-gray-900'>
                  Osnovne informacije
                </h2>
                <p className='mt-1 text-sm text-gray-600'>
                  Ažuriraj osnovne podatke o oglasu.
                </p>
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Tip oglasa
                </label>
                <select
                  name='type'
                  defaultValue={listing.type}
                  required
                  className={selectClassName}
                >
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
                  defaultValue={listing.title}
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Opis
                </label>
                <textarea
                  name='description'
                  rows={6}
                  defaultValue={listing.description}
                  required
                  className={textareaClassName}
                />
              </div>

              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                  Kategorija
                </label>
                <select
                  name='categoryId'
                  defaultValue={listing.category_id}
                  required
                  className={selectClassName}
                >
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
                  Izmeni grad, naselje i cenu ako je potrebno.
                </p>
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Grad
                  </label>
                  <input
                    name='city'
                    defaultValue={listing.city}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Naselje / selo
                  </label>
                  <input
                    name='area'
                    defaultValue={listing.area ?? ''}
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
                  defaultValue={listing.price ?? ''}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className='space-y-5 border-t border-gray-100 pt-8'>
              <div>
                <h2 className='text-xl font-semibold tracking-tight text-gray-900'>
                  Kontakt podaci
                </h2>
                <p className='mt-1 text-sm text-gray-600'>
                  Proveri podatke preko kojih korisnici mogu da te kontaktiraju.
                </p>
              </div>

              <div className='grid gap-5 sm:grid-cols-2'>
                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Kontakt ime
                  </label>
                  <input
                    name='contactName'
                    defaultValue={listing.contact_name}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-sm font-medium text-gray-700'>
                    Telefon
                  </label>
                  <input
                    name='contactPhone'
                    defaultValue={listing.contact_phone}
                    required
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
                  defaultValue={listing.contact_email ?? ''}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className='flex flex-col gap-3 border-t border-gray-100 pt-8 sm:flex-row'>
              <button type='submit' className={primaryButtonClassName}>
                Sačuvaj izmene
              </button>

              <Link href='/moji-oglasi' className={secondaryButtonClassName}>
                Nazad na moje oglase
              </Link>
            </div>
          </form>
        </SectionCard>
      </Container>
    </main>
  );
}
