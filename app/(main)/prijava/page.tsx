import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { LoginForm } from './login-form';

const features = [
  {
    title: 'Moji oglasi',
    description: 'Pregled objava i statusa svakog oglasa na jednom mestu',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className='h-5 w-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M7 7h10M7 12h10M7 17h6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z'
        />
      </svg>
    ),
  },
  {
    title: 'Brza izmena',
    description: 'Ažuriranje podataka i izmena oglasa u nekoliko koraka',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className='h-5 w-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16.862 4.487a2.1 2.1 0 113 2.97L9.5 17.82 5 19l1.18-4.5 10.682-10.013z'
        />
      </svg>
    ),
  },
  {
    title: 'Lokalna mreža',
    description:
      'Povezivanje sa ljudima koji nude i traže usluge u istom kraju',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        className='h-5 w-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17 20h5V9l-5-4m0 15H7m10 0v-7H7v7m0 0H2V7l5-4m0 17V10h10'
        />
      </svg>
    ),
  },
];

export default function PrijavaPage() {
  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fdf7f4]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.10),transparent_30%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(251,191,183,0.22),transparent_28%)]' />
        <div className='pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-3xl' />

        <Container className='relative grid min-h-[calc(100vh-140px)] items-center gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_460px] lg:gap-16 lg:py-20'>
          <div className='order-2 max-w-2xl lg:order-1 flex flex-col  mx-auto'>
            <div className='inline-flex w-[150px] items-center rounded-full border border-rose-200/80 bg-white/90 px-3.5 py-1.5 text-sm font-medium text-rose-600 shadow-sm backdrop-blur'>
              UslugeBlizu nalog
            </div>

            <h1 className='mt-5 max-w-2xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl'>
              Prijava i upravljanje oglasima na jednom mestu
            </h1>

            <p className='mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8'>
              Pregled oglasa, izmena podataka i nova objava — sve iz jednog
              profila, jednostavno, lokalno i bez komplikacije.
            </p>

            <div className='mt-8 grid gap-4 sm:grid-cols-3'>
              {features.map((feature) => (
                <SectionCard
                  key={feature.title}
                  className='group rounded-3xl border-stone-200/80 bg-white/85 p-5 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-lg'
                >
                  <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 transition group-hover:bg-rose-100'>
                    {feature.icon}
                  </div>

                  <p className='mt-4 text-lg font-semibold text-stone-900'>
                    {feature.title}
                  </p>

                  <p className='mt-2 text-sm leading-6 text-stone-600'>
                    {feature.description}
                  </p>
                </SectionCard>
              ))}
            </div>

            <div className='mt-6 hidden items-center gap-2 text-sm text-stone-500 lg:flex'>
              <span className='inline-block h-2 w-2 rounded-full bg-emerald-500' />
              Jedan profil za pregled, izmenu i objavu oglasa.
            </div>
          </div>

          <div className='order-1 mx-auto w-full max-w-md lg:order-2'>
            <SectionCard className='rounded-[28px] border border-stone-200/80 bg-white/95 p-5 shadow-[0_20px_60px_rgba(28,28,28,0.08)] backdrop-blur sm:p-8'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[0.16em] text-rose-600'>
                  Prijava
                </p>

                <h2 className='mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl'>
                  Prijava na nalog
                </h2>

                <p className='mt-3 text-sm leading-6 text-stone-600 sm:text-base'>
                  Prijava za upravljanje oglasima i podacima profila.
                </p>
              </div>

              <LoginForm />

              <div className='mt-5 rounded-2xl bg-rose-50/70 px-4 py-3 text-sm leading-6 text-stone-600'>
                Brzo pristupi svojim oglasima, izmeni podatke i upravljaj
                profilom sa jednog mesta.
              </div>

              <p className='mt-6 text-center text-sm text-stone-600'>
                Nemaš nalog?{' '}
                <Link
                  href='/registracija'
                  className='font-semibold text-rose-600 transition hover:text-rose-700 hover:underline'
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
