import Link from 'next/link';
import { Container } from '@/components/layout/container';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';

export default function NotFound() {
  return (
    <main className='min-h-screen bg-white'>
      <Container className='flex min-h-[calc(100vh-160px)] items-center justify-center py-16'>
        <div className='w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-12'>
          <div className='mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-lg font-semibold text-blue-600'>
            404
          </div>

          <h1 className='mt-6 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
            Stranica nije pronađena
          </h1>

          <p className='mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600'>
            Oglas ili stranica koju tražiš ne postoji, uklonjena je ili link
            više nije ispravan.
          </p>

          <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Link href='/' className={primaryButtonClassName}>
              Nazad na početnu
            </Link>

            <Link href='/oglasi' className={secondaryButtonClassName}>
              Pregledaj oglase
            </Link>
          </div>

          <div className='mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-5 text-left'>
            <p className='text-sm font-medium text-gray-900'>Možda tražiš:</p>
            <div className='mt-3 flex flex-wrap gap-2'>
              <Link
                href='/oglasi?type=trazim'
                className='rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50'
              >
                Tražim uslugu
              </Link>
              <Link
                href='/oglasi?type=nudim'
                className='rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50'
              >
                Nudim uslugu
              </Link>
              <Link
                href='/postavi'
                className='rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50'
              >
                Postavi oglas
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
