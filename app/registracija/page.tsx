import Link from 'next/link';
import { signUp } from '@/app/actions/auth';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { inputClassName } from '@/lib/constants/ui';

export default async function RegistracijaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative grid min-h-[calc(100vh-160px)] items-center gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_460px] lg:py-24'>
          <div className='hidden max-w-2xl lg:block'>
            <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
              UslugeBlizu nalog
            </div>

            <h1 className='mt-6 max-w-2xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
              Kreiranje naloga i objava oglasa na jednom mestu
            </h1>

            <p className='mt-6 max-w-xl text-lg leading-8 text-stone-600'>
              Povezivanje sa ljudima iz svog grada počinje za nekoliko koraka.
              Bilo da je cilj pronalazak pomoći ili objava usluge, sve kreće od
              jednog naloga.
            </p>

            <div className='mt-10 grid max-w-2xl gap-4 sm:grid-cols-3'>
              <SectionCard className='border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>
                  Brza objava
                </p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Kreiranje oglasa i slanje na pregled u nekoliko minuta
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>
                  Lokalni fokus
                </p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Lakše povezivanje sa ljudima iz svog grada i okoline
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>
                  Jednostavan početak
                </p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Bez komplikacija, nepotrebnih koraka i suvišnih opcija
                </p>
              </SectionCard>
            </div>
          </div>

          <div className='mx-auto w-full max-w-md'>
            <SectionCard className='border-stone-200 bg-white/95 p-8 shadow-lg sm:p-9'>
              <div>
                <p className='text-md font-medium text-rose-600'>
                  Registracija
                </p>
                <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                  Kreiranje naloga
                </h2>
                <p className='mt-2 text-md leading-6 text-stone-600'>
                  Registracija omogućava objavu oglasa i upravljanje podacima
                  profila na jednom mestu.
                </p>
              </div>

              {error ? (
                <div className='mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                  {error}
                </div>
              ) : null}

              <form action={signUp} className='mt-6 space-y-4'>
                <div>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Ime i prezime
                  </label>
                  <input
                    name='fullName'
                    type='text'
                    placeholder='Tatjana Devrnja'
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Telefon
                  </label>
                  <input
                    name='phone'
                    type='text'
                    placeholder='06x xxx xxxx'
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Grad
                  </label>
                  <input
                    name='city'
                    type='text'
                    placeholder='Subotica'
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Email
                  </label>
                  <input
                    name='email'
                    type='email'
                    required
                    placeholder='ti@email.com'
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className='mb-1.5 block text-md font-medium text-stone-700'>
                    Lozinka
                  </label>
                  <input
                    name='password'
                    type='password'
                    required
                    placeholder='••••••••'
                    className={inputClassName}
                  />
                </div>

                <button
                  type='submit'
                  className='w-full cursor-pointer rounded-xl bg-rose-500 px-4 py-3 !text-lg !font-bold text-white transition hover:bg-rose-600'
                >
                  Napravi nalog
                </button>
              </form>

              <p className='mt-6 text-center text-sm text-stone-600'>
                Već postoji nalog?{' '}
                <Link
                  href='/prijava'
                  className='font-medium text-rose-600 hover:underline'
                >
                  Prijava
                </Link>
              </p>
            </SectionCard>
          </div>
        </Container>
      </section>
    </main>
  );
}
