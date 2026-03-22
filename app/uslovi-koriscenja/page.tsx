import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';

export default function UsloviKoriscenjaPage() {
  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative py-16 lg:py-20'>
          <div className='max-w-3xl'>
            <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
              Uslovi korišćenja
            </div>

            <h1 className='mt-6 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
              Pravila korišćenja platforme UslugeBlizu
            </h1>

            <p className='mt-6 text-lg leading-8 text-stone-600'>
              Korišćenjem platforme prihvataju se sledeći uslovi. Molimo te da
              ih pažljivo pročitaš pre korišćenja sajta.
            </p>
          </div>
        </Container>
      </section>

      <section className='py-14 lg:py-16'>
        <Container className='max-w-4xl space-y-6'>
          <SectionCard className='p-6 lg:p-8'>
            <h2 className='text-2xl font-semibold text-stone-900'>
              1. Opis platforme
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              UslugeBlizu je online platforma koja omogućava korisnicima da
              objavljuju i pregledaju oglase za lokalne usluge. Platforma ne
              učestvuje u samoj realizaciji usluga između korisnika.
            </p>
          </SectionCard>

          <SectionCard className='p-6 lg:p-8'>
            <h2 className='text-2xl font-semibold text-stone-900'>
              2. Odgovornost korisnika
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Korisnik je odgovoran za tačnost podataka koje unosi u oglas,
              uključujući opis, cenu i kontakt informacije. Zabranjeno je
              objavljivanje lažnih, obmanjujućih ili neprimerenih oglasa.
            </p>
          </SectionCard>

          <SectionCard className='p-6 lg:p-8'>
            <h2 className='text-2xl font-semibold text-stone-900'>
              3. Objavljivanje oglasa
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Svi oglasi prolaze pregled pre objave. Platforma zadržava pravo da
              odbije ili ukloni oglas koji krši pravila ili nije u skladu sa
              namenom sajta.
            </p>
          </SectionCard>

          <SectionCard className='p-6 lg:p-8'>
            <h2 className='text-2xl font-semibold text-stone-900'>
              4. Ograničenje odgovornosti
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              UslugeBlizu ne garantuje kvalitet, tačnost ili realizaciju usluga
              koje korisnici nude ili traže. Sva komunikacija i dogovor se
              odvijaju direktno između korisnika.
            </p>
          </SectionCard>

          <SectionCard className='p-6 lg:p-8'>
            <h2 className='text-2xl font-semibold text-stone-900'>
              5. Zabrane
            </h2>
            <ul className='mt-3 space-y-2 text-base leading-7 text-stone-600'>
              <li>• Zabranjen je nelegalan sadržaj</li>
              <li>• Zabranjene su prevare i obmane</li>
              <li>• Zabranjeno je spamovanje oglasa</li>
              <li>• Zabranjeno je lažno predstavljanje</li>
            </ul>
          </SectionCard>

          <SectionCard className='p-6 lg:p-8'>
            <h2 className='text-2xl font-semibold text-stone-900'>
              6. Izmene uslova
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Platforma zadržava pravo da u bilo kom trenutku izmeni ove uslove.
              Nastavak korišćenja sajta podrazumeva prihvatanje izmena.
            </p>
          </SectionCard>

          <SectionCard className='p-6 lg:p-8'>
            <h2 className='text-2xl font-semibold text-stone-900'>
              7. Kontakt
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Za sva pitanja u vezi sa uslovima korišćenja možeš se obratiti
              putem kontakt stranice ili email adrese.
            </p>
          </SectionCard>
        </Container>
      </section>
    </main>
  );
}
