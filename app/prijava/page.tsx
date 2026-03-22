import Link from 'next/link';
import { signIn } from '@/app/actions/auth';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { inputClassName } from '@/lib/constants/ui';

export default async function PrijavaPage({
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
              Prijava i upravljanje oglasima na jednom mestu
            </h1>

            <p className='mt-6 max-w-xl text-lg leading-8 text-stone-600'>
              Pregled oglasa, izmena podataka i nova objava — sve iz jednog
              profila, jednostavno, lokalno i bez komplikacije.
            </p>

            <div className='mt-10 grid max-w-2xl gap-4 sm:grid-cols-3'>
              <SectionCard className='border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>
                  Moji oglasi
                </p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Pregled objava i statusa svakog oglasa na jednom mestu
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>
                  Brza izmena
                </p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Ažuriranje podataka i izmena oglasa u nekoliko koraka
                </p>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white/85 p-5 shadow-sm backdrop-blur'>
                <p className='text-xl font-semibold text-stone-900'>
                  Lokalna mreža
                </p>
                <p className='mt-2 text-sm leading-6 text-stone-600'>
                  Povezivanje sa ljudima koji nude i traže usluge u istom kraju
                </p>
              </SectionCard>
            </div>
          </div>

          <div className='mx-auto w-full max-w-md'>
            <SectionCard className='border-stone-200 bg-white/95 p-8 shadow-lg sm:p-9'>
              <div>
                <p className='text-md font-medium text-rose-600'>Prijava</p>
                <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                  Prijava na nalog
                </h2>
                <p className='mt-2 text-md leading-6 text-stone-600'>
                  Prijava za upravljanje oglasima i podacima profila.
                </p>
              </div>

              {error ? (
                <div className='mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                  {error}
                </div>
              ) : null}

              <form action={signIn} className='mt-6 space-y-4'>
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
                  Prijavi se
                </button>
              </form>

              <p className='mt-6 text-center text-sm text-stone-600'>
                Nemaš nalog?{' '}
                <Link
                  href='/registracija'
                  className='font-medium text-rose-600 hover:underline'
                >
                  Registracija
                </Link>
              </p>
            </SectionCard>
          </div>
        </Container>
      </section>
    </main>
  );
}
