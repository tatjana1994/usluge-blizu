import { Container } from '@/components/layout/container';

export default function LoadingOglasDetalj() {
  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative max-w-7xl py-16 pb-24 lg:py-20 lg:pb-32'>
          <div className='mb-8 h-5 w-36 animate-pulse rounded bg-stone-200' />

          <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]'>
            <div className='space-y-8'>
              <div className='rounded-3xl border border-stone-200 bg-white p-8 shadow-md lg:p-10'>
                <div className='mb-6 flex flex-wrap gap-2'>
                  <div className='h-9 w-32 animate-pulse rounded-full bg-stone-200' />
                  <div className='h-9 w-28 animate-pulse rounded-full bg-stone-200' />
                  <div className='h-9 w-36 animate-pulse rounded-full bg-stone-200' />
                </div>

                <div className='h-12 w-3/4 animate-pulse rounded bg-stone-200' />
                <div className='mt-3 h-5 w-40 animate-pulse rounded bg-stone-200' />

                <div className='mt-8 grid gap-4 sm:grid-cols-3'>
                  <div className='rounded-2xl border border-stone-200 bg-stone-50 p-5'>
                    <div className='h-3 w-16 animate-pulse rounded bg-stone-200' />
                    <div className='mt-3 h-7 w-24 animate-pulse rounded bg-stone-200' />
                  </div>

                  <div className='rounded-2xl border border-stone-200 bg-stone-50 p-5'>
                    <div className='h-3 w-12 animate-pulse rounded bg-stone-200' />
                    <div className='mt-3 h-7 w-20 animate-pulse rounded bg-stone-200' />
                  </div>

                  <div className='rounded-2xl border border-stone-200 bg-stone-50 p-5'>
                    <div className='h-3 w-16 animate-pulse rounded bg-stone-200' />
                    <div className='mt-3 h-7 w-24 animate-pulse rounded bg-stone-200' />
                  </div>
                </div>

                <div className='mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5'>
                  <div className='h-4 w-40 animate-pulse rounded bg-stone-200' />
                  <div className='mt-3 h-4 w-full animate-pulse rounded bg-stone-200' />
                  <div className='mt-2 h-4 w-11/12 animate-pulse rounded bg-stone-200' />
                </div>

                <div className='mt-10 border-t border-stone-100 pt-8'>
                  <div className='h-4 w-28 animate-pulse rounded bg-stone-200' />
                  <div className='mt-4 h-4 w-full animate-pulse rounded bg-stone-200' />
                  <div className='mt-2 h-4 w-full animate-pulse rounded bg-stone-200' />
                  <div className='mt-2 h-4 w-10/12 animate-pulse rounded bg-stone-200' />
                </div>
              </div>

              <div className='rounded-3xl border border-stone-200 bg-white p-6 shadow-sm lg:p-8'>
                <div className='mb-4 h-4 w-20 animate-pulse rounded bg-stone-200' />
                <div className='h-8 w-40 animate-pulse rounded bg-stone-200' />
                <div className='mt-5 h-[260px] animate-pulse rounded-2xl bg-stone-200' />
              </div>
            </div>

            <aside className='h-fit self-start'>
              <div className='rounded-3xl border border-stone-200 bg-white p-6 shadow-md'>
                <div className='h-4 w-16 animate-pulse rounded bg-stone-200' />
                <div className='mt-3 h-8 w-40 animate-pulse rounded bg-stone-200' />

                <div className='mt-6 space-y-3'>
                  <div className='h-20 animate-pulse rounded-xl bg-stone-100' />
                  <div className='h-20 animate-pulse rounded-xl bg-stone-100' />
                  <div className='h-20 animate-pulse rounded-xl bg-stone-100' />
                </div>

                <div className='mt-6 space-y-3'>
                  <div className='h-12 animate-pulse rounded-xl bg-rose-200' />
                  <div className='h-12 animate-pulse rounded-xl bg-stone-200' />
                </div>

                <div className='mt-6 h-28 animate-pulse rounded-2xl bg-stone-100' />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}
