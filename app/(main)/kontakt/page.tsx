import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';

export default function KontaktPage() {
  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative py-16 lg:py-24'>
          <div className='max-w-3xl'>
            <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
              Kontakt
            </div>

            <h1 className='mt-6 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl'>
              Kontakt i podrška za platformu UslugeBlizu
            </h1>

            <p className='mt-6 max-w-2xl text-lg leading-8 text-stone-600'>
              Za pitanja, predloge, prijavu problema ili saradnju, kontakt je
              otvoren. Odgovor stiže u najkraćem mogućem roku.
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Link href='/oglasi' className={secondaryButtonClassName}>
                Pregledaj oglase
              </Link>
              <Link href='/postavi' className={primaryButtonClassName}>
                Postavi oglas
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className='border-b border-[var(--border)] bg-[var(--background)] py-14 lg:py-16'>
        <Container>
          <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-sm lg:p-4'>
              <p className='text-md font-medium text-rose-600'>
                Kontakt informacije
              </p>
              <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                Kako možeš da stupiš u kontakt
              </h2>
              <p className='mt-3 max-w-2xl text-md leading-6 text-stone-600'>
                Za sva pitanja u vezi sa platformom, objavom oglasa ili prijavom
                sadržaja, moguće je javiti se putem sledećih kanala.
              </p>

              <div className='mt-8 space-y-4'>
                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-sm font-semibold text-stone-900'>Email</p>
                  <p className='mt-1 text-sm leading-6 text-stone-600'>
                    kontakt@uslugeblizu.rs
                  </p>
                </div>

                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Podrška za oglase
                  </p>
                  <p className='mt-1 text-sm leading-6 text-stone-600'>
                    pitanja u vezi sa objavom, izmenom ili pregledom oglasa
                  </p>
                </div>

                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Prijava problema
                  </p>
                  <p className='mt-1 text-sm leading-6 text-stone-600'>
                    tehnički problem, neispravan sadržaj ili prijava oglasa
                  </p>
                </div>

                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Saradnja
                  </p>
                  <p className='mt-1 text-sm leading-6 text-stone-600'>
                    predlozi za saradnju, partnerstva i razvoj platforme
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-lg lg:p-4'>
              <p className='text-md font-medium text-rose-600'>
                Najčešća pitanja
              </p>
              <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                Pre nego što pošalješ poruku
              </h2>

              <div className='mt-8 space-y-4'>
                <div className='rounded-2xl border border-rose-100 bg-[#fff8f4] p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Kada će oglas biti objavljen?
                  </p>
                  <p className='mt-2 text-sm leading-6 text-stone-600'>
                    Svaki oglas ide na pregled pre objave. Vreme obrade može da
                    zavisi od broja pristiglih oglasa.
                  </p>
                </div>

                <div className='rounded-2xl border border-rose-100 bg-[#fff8f4] p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Kako mogu da izmenim svoj oglas?
                  </p>
                  <p className='mt-2 text-sm leading-6 text-stone-600'>
                    U okviru profila i stranice “Moji oglasi” moguće je otvoriti
                    postojeći oglas i poslati izmenu.
                  </p>
                </div>

                <div className='rounded-2xl border border-rose-100 bg-[#fff8f4] p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Kako mogu da prijavim neprimeren sadržaj?
                  </p>
                  <p className='mt-2 text-sm leading-6 text-stone-600'>
                    Najbolje je poslati poruku sa što više detalja kako bi
                    prijava mogla brže da bude proverena.
                  </p>
                </div>

                <div className='rounded-2xl border border-rose-100 bg-[#fff8f4] p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Da li je kontakt direktan?
                  </p>
                  <p className='mt-2 text-sm leading-6 text-stone-600'>
                    Da. Kada je oglas objavljen, kontakt ide direktno između
                    osoba koje traže i nude uslugu.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>
        </Container>
      </section>

      <section className='bg-[var(--background)] py-14 lg:py-16'>
        <Container>
          <div className='rounded-3xl border border-rose-200 bg-[#fff1ea] px-8 py-10 lg:px-12 lg:py-12'>
            <div className='flex justify-between w-full gap-4 flex-col lg:flex-row lg:items-center'>
              <div>
                <p className='text-lg font-medium text-rose-600'>
                  Potrebna pomoć?
                </p>
                <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
                  Pregledaj oglase ili dodaj svoj
                </h2>
                <p className='mt-3 max-w-2xl text-base leading-7 text-stone-600'>
                  Ako je cilj pronalazak pomoći ili objava usluge, sve počinje
                  jednostavnom pretragom ili novim oglasom.
                </p>
              </div>

              <div className='flex w-full gap-3 justify-start lg:justify-end'>
                <Link href='/oglasi' className={secondaryButtonClassName}>
                  Pregledaj oglase
                </Link>
                <Link href='/postavi' className={primaryButtonClassName}>
                  Postavi oglas
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
