import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';

export const metadata = {
  title: 'Stranica nije pronađena | UslugeBlizu',
  description:
    'Stranica koju tražite ne postoji. Pogledajte dostupne oglase ili se vratite na početnu stranicu.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative flex min-h-[calc(100vh-160px)] items-center justify-center py-16 lg:py-24'>
          <SectionCard className='w-full max-w-5xl border-stone-200 bg-white/95 p-4 text-center shadow-lg sm:p-12'>
            <div className='mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-lg font-bold text-rose-600'>
              404
            </div>

            <h1 className='mt-6 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
              Stranica nije pronađena
            </h1>

            <p className='mx-auto mt-4 max-w-xl text-base leading-7 text-stone-600'>
              Stranica ili oglas koji se traži trenutno nije dostupan. Moguće je
              da je uklonjen ili da link više nije ispravan.
            </p>

            <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <Link href='/' className={primaryButtonClassName}>
                Nazad na početnu
              </Link>

              <Link href='/oglasi' className={secondaryButtonClassName}>
                Pregledaj oglase
              </Link>
            </div>

            <div className='mt-10 rounded-2xl border border-rose-100 bg-[#fff8f4] p-5 text-left'>
              <p className='text-sm font-medium text-stone-900'>
                Možda je korisno:
              </p>

              <div className='mt-3 flex flex-wrap gap-2'>
                <Link
                  href='/oglasi?type=trazim'
                  className='rounded-full border border-rose-200 bg-white px-3 py-1.5 text-sm text-stone-700 transition hover:bg-rose-50'
                >
                  Tražim uslugu
                </Link>

                <Link
                  href='/oglasi?type=nudim'
                  className='rounded-full border border-rose-200 bg-white px-3 py-1.5 text-sm text-stone-700 transition hover:bg-rose-50'
                >
                  Nudim uslugu
                </Link>

                <Link
                  href='/postavi'
                  className='rounded-full border border-rose-200 bg-white px-3 py-1.5 text-sm text-stone-700 transition hover:bg-rose-50'
                >
                  Postavi oglas
                </Link>
              </div>
            </div>
          </SectionCard>
        </Container>
      </section>
    </main>
  );
}
