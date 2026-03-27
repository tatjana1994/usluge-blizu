import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-[var(--background)]'>
      <div className='mx-auto flex max-w-7xl justify-center px-4 pt-6 sm:px-6 lg:px-8'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/logo.webp'
            alt='UslugeBlizu'
            width={40}
            height={40}
            className='h-auto w-auto object-contain'
          />
          <span className='text-lg font-bold text-stone-900'>
            Usluge<span className='text-rose-500'>Blizu</span>
          </span>
        </Link>
      </div>

      {children}
    </div>
  );
}
