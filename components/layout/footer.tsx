import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className='border-t border-stone-200 bg-[#fffaf7]'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-4 lg:px-8'>
        <div className='flex flex-col gap-10 md:flex-row md:items-start md:justify-between'>
          <div className='max-w-sm'>
            <div className='flex items-center gap-3'>
              <Image
                src='/logo.webp'
                alt='UslugeBlizu'
                loading='eager'
                width={40}
                height={40}
                className='rounded-lg'
              />

              <p className='text-lg font-bold tracking-tight text-stone-900'>
                Usluge<span className='text-rose-500'>Blizu</span>
              </p>
            </div>

            <p className='mt-3 text-sm leading-6 text-stone-600'>
              Lokalnе usluge blizu tebe. Brzo pronađi pomoć ili ponudi svoju
              uslugu u svom gradu.
            </p>
          </div>

          <div className='flex flex-wrap gap-4 text-sm'>
            <Link
              href='/oglasi'
              className='font-medium text-stone-600 transition hover:text-rose-600'
            >
              Oglasi
            </Link>

            <Link
              href='/postavi'
              className='font-medium text-stone-600 transition hover:text-rose-600'
            >
              Postavi oglas
            </Link>

            <Link
              href='/kontakt'
              className='font-medium text-stone-600 transition hover:text-rose-600'
            >
              Kontakt
            </Link>

            <Link
              href='/o-nama'
              className='font-medium text-stone-600 transition hover:text-rose-600'
            >
              O nama
            </Link>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-3 border-t border-stone-200 pt-6 text-xs text-stone-500 md:flex-row md:items-center md:justify-between'>
          <p>© {new Date().getFullYear()} UslugeBlizu. Sva prava zadržana.</p>

          <div className='flex gap-4'>
            <Link href='/uslovi-koriscenja' className='hover:text-rose-500'>
              Uslovi korišćenja
            </Link>
            <Link href='/politika-privatnosti' className='hover:text-rose-500'>
              Politika privatnosti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
