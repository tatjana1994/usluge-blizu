import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';

export default function ONamaPage() {
  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative py-16 lg:py-24'>
          <div className='max-w-3xl'>
            <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
              O nama
            </div>

            <h1 className='mt-6 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl'>
              Lokalna platforma koja povezuje ljude i usluge
            </h1>

            <p className='mt-6 max-w-2xl text-lg leading-8 text-stone-600'>
              UslugeBlizu je napravljena da olakša pronalazak pomoći, ponudu
              usluga i povezivanje ljudi u istom gradu, naselju ili okolini —
              jednostavno, lokalno i bez komplikacije.
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Link href='/oglasi' className={primaryButtonClassName}>
                Pregledaj oglase
              </Link>
              <Link href='/postavi' className={secondaryButtonClassName}>
                Postavi oglas
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className='border-b border-[var(--border)] bg-[var(--background)] py-14 lg:py-16'>
        <Container>
          <div className='grid gap-4 md:grid-cols-3'>
            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-sm'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600'>
                1
              </div>
              <h2 className='text-2xl font-semibold text-stone-900'>
                Lokalni fokus
              </h2>
              <p className='mt-2 text-md leading-6 text-stone-600'>
                Fokus je na oglasima iz gradova, naselja i mesta u kojima je
                stvarno važna blizina i brz kontakt.
              </p>
            </SectionCard>

            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-sm'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600'>
                2
              </div>
              <h2 className='text-2xl font-semibold text-stone-900'>
                Jednostavno korišćenje
              </h2>
              <p className='mt-2 text-md leading-6 text-stone-600'>
                Platforma je napravljena tako da objava i pretraga oglasa budu
                jasne, brze i razumljive bez suvišnih koraka.
              </p>
            </SectionCard>

            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-sm'>
              <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-600'>
                3
              </div>
              <h2 className='text-2xl font-semibold text-stone-900'>
                Direktan kontakt
              </h2>
              <p className='mt-2 text-md leading-6 text-stone-600'>
                Kada se pronađe odgovarajuća usluga ili pomoć, komunikacija ide
                direktno između ljudi, bez komplikovanih posrednika.
              </p>
            </SectionCard>
          </div>
        </Container>
      </section>

      <section className='bg-[var(--background)] py-14 lg:py-16'>
        <Container>
          <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start'>
            <div>
              <p className='text-lg font-medium text-rose-600'>Naša ideja</p>
              <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
                Zašto postoji UslugeBlizu
              </h2>

              <div className='mt-6 space-y-5 text-base leading-8 text-stone-600'>
                <p>
                  U mnogim mestima ljudi i dalje najčešće traže preporuke preko
                  poznanika, poruka ili lokalnih grupa. To često oduzima vreme i
                  otežava da se brzo pronađe prava osoba za posao koji je
                  potreban.
                </p>

                <p>
                  Ideja UslugeBlizu je da na jednom mestu omogući pregled
                  lokalnih oglasa za usluge koje se traže i nude — od sitnih
                  pomoći i kućnih poslova do svakodnevnih praktičnih usluga.
                </p>

                <p>
                  Cilj nije komplikovan marketplace, već jednostavna platforma
                  na kojoj je lako postaviti oglas, pregledati ponudu i stupiti
                  u kontakt sa pravom osobom.
                </p>
              </div>
            </div>

            <SectionCard className='border-stone-200 bg-white/95 p-4 shadow-lg'>
              <p className='text-md font-medium text-rose-600'>Šta je važno</p>
              <h3 className='mt-2 text-2xl font-semibold tracking-tight text-stone-900'>
                Na čemu gradimo platformu
              </h3>

              <div className='mt-6 space-y-4'>
                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Jasni oglasi
                  </p>
                  <p className='mt-1 text-sm leading-6 text-stone-600'>
                    Naslov, opis, lokacija i kontakt treba da budu pregledni i
                    korisni.
                  </p>
                </div>

                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Pouzdan pregled
                  </p>
                  <p className='mt-1 text-sm leading-6 text-stone-600'>
                    Oglasi prolaze pregled pre objave kako bi sadržaj ostao
                    uredan i razumljiv.
                  </p>
                </div>

                <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Lokalna povezanost
                  </p>
                  <p className='mt-1 text-sm leading-6 text-stone-600'>
                    Važno je da ljudi mogu lakše da pronađu uslugu baš u svom
                    kraju.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>
        </Container>
      </section>

      <section className='border-y border-[var(--border)] bg-[#fff5ef] py-14 lg:py-16'>
        <Container>
          <div className='mb-8'>
            <p className='text-lg font-medium text-rose-600'>
              Kako funkcioniše
            </p>
            <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
              Jednostavan tok za obe strane
            </h2>
            <p className='mt-3 max-w-2xl text-md leading-6 text-stone-600'>
              Platforma je osmišljena i za one koji traže pomoć i za one koji
              nude uslugu.
            </p>
          </div>

          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
            <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
              <p className='text-sm font-semibold text-stone-900'>Pretraga</p>
              <p className='mt-2 text-sm leading-6 text-stone-600'>
                Pregled oglasa po vrsti usluge, gradu i tipu objave.
              </p>
            </SectionCard>

            <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
              <p className='text-sm font-semibold text-stone-900'>Objava</p>
              <p className='mt-2 text-sm leading-6 text-stone-600'>
                Unos osnovnih podataka i slanje oglasa na pregled.
              </p>
            </SectionCard>

            <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
              <p className='text-sm font-semibold text-stone-900'>Pregled</p>
              <p className='mt-2 text-sm leading-6 text-stone-600'>
                Provera oglasa pre objave radi urednosti i boljeg kvaliteta
                sadržaja.
              </p>
            </SectionCard>

            <SectionCard className='border-stone-200 bg-white/95 p-5 shadow-sm'>
              <p className='text-sm font-semibold text-stone-900'>Kontakt</p>
              <p className='mt-2 text-sm leading-6 text-stone-600'>
                Direktno povezivanje sa osobom koja traži ili nudi uslugu.
              </p>
            </SectionCard>
          </div>
        </Container>
      </section>

      <section className='bg-[var(--background)] py-14 lg:py-16'>
        <Container>
          <div className='rounded-3xl border border-rose-200 bg-[#fff1ea] px-8 py-10 lg:px-12 lg:py-12'>
            <div className='flex justify-between w-full gap-4 flex-col lg:flex-row lg:items-center'>
              <div className='w-full'>
                <p className='text-lg font-medium text-rose-600'>Počni odmah</p>
                <h2 className='mt-2 text-3xl font-bold tracking-tight text-stone-900'>
                  Tražiš pomoć ili nudiš uslugu?
                </h2>
                <p className='mt-3 max-w-2xl text-base leading-7 text-stone-600'>
                  Pregledaj postojeće oglase ili dodaj svoj i poveži se sa
                  ljudima iz svog kraja.
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
