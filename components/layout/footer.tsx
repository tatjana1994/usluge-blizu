import Link from 'next/link';

export function Footer() {
  return (
    <footer className='mt-20 border-t border-gray-200 bg-white'>
      <div className='mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-lg font-semibold tracking-tight text-gray-900'>
            Usluge<span className='text-blue-600'>Blizu</span>
          </p>
          <p className='mt-2 text-sm text-gray-600'>
            Lokalне usluge blizu tebe.
          </p>
        </div>

        <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
          <Link href='/oglasi' className='hover:text-gray-900'>
            Oglasi
          </Link>
          <Link href='/postavi' className='hover:text-gray-900'>
            Postavi oglas
          </Link>
          <Link href='/kontakt' className='hover:text-gray-900'>
            Kontakt
          </Link>
          <Link href='/o-nama' className='hover:text-gray-900'>
            O nama
          </Link>
        </div>
      </div>
    </footer>
  );
}
