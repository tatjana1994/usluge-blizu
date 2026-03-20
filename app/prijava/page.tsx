import Link from 'next/link';
import { signIn } from '@/app/actions/auth';
import { Container } from '@/components/layout/container';
import { inputClassName } from '@/lib/constants/ui';

export default async function PrijavaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className='min-h-screen bg-white'>
      <Container className='grid min-h-[calc(100vh-160px)] items-center gap-10 py-16 lg:grid-cols-2'>
        <div className='hidden max-w-md lg:block'>
          <p className='text-sm font-medium text-blue-600'>UslugeBlizu</p>

          <h1 className='mt-4 text-4xl font-semibold tracking-tight text-gray-900'>
            Prijavi se i upravljaj svojim oglasima
          </h1>

          <p className='mt-4 text-base leading-7 text-gray-600'>
            Nastavi tamo gde si stala. Pregledaj, menjaj i objavljuj oglase iz
            svog profila na jednom mestu.
          </p>

          <div className='mt-8 space-y-4'>
            <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
              <p className='text-sm font-medium text-gray-900'>Moji oglasi</p>
              <p className='mt-1 text-sm text-gray-600'>
                Upravljaj objavama i statusima oglasa
              </p>
            </div>

            <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
              <p className='text-sm font-medium text-gray-900'>Brza izmena</p>
              <p className='mt-1 text-sm text-gray-600'>
                Promeni podatke ili ažuriraj oglas kad god poželiš
              </p>
            </div>

            <div className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
              <p className='text-sm font-medium text-gray-900'>Lokalna mreža</p>
              <p className='mt-1 text-sm text-gray-600'>
                Poveži se sa ljudima koji nude i traže usluge u tvom kraju
              </p>
            </div>
          </div>
        </div>

        <div className='mx-auto w-full max-w-md'>
          <div className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm'>
            <h2 className='text-2xl font-semibold tracking-tight text-gray-900'>
              Prijava
            </h2>

            <p className='mt-2 text-sm text-gray-600'>
              Prijavi se da upravljaš svojim oglasima.
            </p>

            {error ? (
              <div className='mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
                {error}
              </div>
            ) : null}

            <form action={signIn} className='mt-6 space-y-4'>
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
                Prijavi se
              </button>
            </form>

            <p className='mt-6 text-center text-sm text-gray-600'>
              Nemaš nalog?{' '}
              <Link
                href='/registracija'
                className='font-medium text-blue-600 hover:underline'
              >
                Registruj se
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
