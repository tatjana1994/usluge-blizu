import Link from 'next/link';
import { signUp } from '@/app/actions/auth';
import { Container } from '@/components/layout/container';
import { inputClassName } from '@/lib/constants/ui';

export default async function RegistracijaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className='min-h-screen bg-white'>
      <Container className='grid min-h-[calc(100vh-160px)] items-center gap-10 py-16 lg:grid-cols-2'>
        {/* LEFT SIDE */}
        <div className='hidden max-w-md lg:block'>
          <p className='text-sm font-medium text-blue-600'>UslugeBlizu</p>

          <h1 className='mt-4 text-4xl font-semibold tracking-tight text-gray-900'>
            Napravi nalog i objavi svoj prvi oglas
          </h1>

          <p className='mt-4 text-base leading-7 text-gray-600'>
            Poveži se sa ljudima u svom gradu. Bilo da tražiš pomoć ili nudiš
            uslugu — ovde si na pravom mestu.
          </p>

          <div className='mt-8 space-y-4'>
            <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
              <p className='text-sm font-medium text-gray-900'>
                Brzo postavljanje
              </p>
              <p className='mt-1 text-sm text-gray-600'>
                Oglas objavi za manje od 2 minuta
              </p>
            </div>

            <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
              <p className='text-sm font-medium text-gray-900'>Lokalni fokus</p>
              <p className='mt-1 text-sm text-gray-600'>
                Pronađi ljude u svom gradu ili okolini
              </p>
            </div>

            <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
              <p className='text-sm font-medium text-gray-900'>Jednostavno</p>
              <p className='mt-1 text-sm text-gray-600'>
                Bez komplikacija i nepotrebnih koraka
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className='mx-auto w-full max-w-md'>
          <div className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm'>
            <h2 className='text-2xl font-semibold tracking-tight text-gray-900'>
              Registracija
            </h2>

            <p className='mt-2 text-sm text-gray-600'>
              Napravi nalog da bi mogla da postavljaš oglase.
            </p>

            {error ? (
              <div className='mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                {error}
              </div>
            ) : null}

            <form action={signUp} className='mt-6 space-y-4'>
              <div>
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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
                <label className='mb-1.5 block text-sm font-medium text-gray-700'>
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
                className='w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700'
              >
                Napravi nalog
              </button>
            </form>

            <p className='mt-6 text-center text-sm text-gray-600'>
              Već imaš nalog?{' '}
              <Link
                href='/prijava'
                className='font-medium text-blue-600 hover:underline'
              >
                Prijavi se
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
