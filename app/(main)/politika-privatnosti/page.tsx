import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';

export const metadata = {
  title: 'Politika privatnosti | UslugeBlizu',
  description:
    'Politika privatnosti platforme UslugeBlizu. Informacije o prikupljanju, obradi i zaštiti vaših ličnih podataka.',
};

export default function PolitikaPrivatnostiPage() {
  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative py-16 lg:py-20'>
          <div className='max-w-3xl'>
            <div className='inline-flex items-center rounded-full border border-rose-200 bg-white/90 px-3 py-1 text-sm font-medium text-rose-600 shadow-sm'>
              Politika privatnosti
            </div>

            <h1 className='mt-6 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
              Kako se obrađuju i štite tvoji podaci
            </h1>

            <p className='mt-6 text-lg leading-8 text-stone-600'>
              Privatnost korisnika je važna. Ova politika objašnjava koje
              podatke prikupljamo, kako ih koristimo i koja su tvoja prava.
            </p>
          </div>
        </Container>
      </section>

      <section className='py-14 lg:py-16'>
        <Container className='max-w-4xl space-y-6'>
          <SectionCard className='p-4 lg:p-4'>
            <h2 className='text-2xl font-bold text-stone-900'>
              1. Koje podatke prikupljamo
            </h2>
            <ul className='mt-3 space-y-2 text-base leading-7 text-stone-600'>
              <li>• Email adresa</li>
              <li>• Ime i prezime (ako je uneto)</li>
              <li>• Broj telefona</li>
              <li>• Podaci iz oglasa (grad, opis, cena)</li>
            </ul>
          </SectionCard>

          <SectionCard className='p-4 lg:p-4'>
            <h2 className='text-2xl font-bold text-stone-900'>
              2. Kako koristimo podatke
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Podaci se koriste isključivo za omogućavanje funkcionalnosti
              platforme, uključujući:
            </p>
            <ul className='mt-3 space-y-2 text-base leading-7 text-stone-600'>
              <li>• Kreiranje i upravljanje nalogom</li>
              <li>• Objavu i prikaz oglasa</li>
              <li>• Kontakt između korisnika</li>
              <li>• Poboljšanje rada platforme</li>
            </ul>
          </SectionCard>

          <SectionCard className='p-4 lg:p-4'>
            <h2 className='text-2xl font-bold text-stone-900'>
              3. Deljenje podataka
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Platforma ne prodaje niti deli lične podatke trećim stranama.
              Podaci koje korisnik sam unese u oglas (npr. telefon) mogu biti
              vidljivi drugim korisnicima.
            </p>
          </SectionCard>

          <SectionCard className='p-4 lg:p-4'>
            <h2 className='text-2xl font-bold text-stone-900'>
              4. Čuvanje podataka
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Podaci se čuvaju onoliko dugo koliko je potrebno za funkcionisanje
              naloga i platforme, ili dok korisnik ne zatraži brisanje.
            </p>
          </SectionCard>

          <SectionCard className='p-4 lg:p-4'>
            <h2 className='text-2xl font-bold text-stone-900'>
              5. Tvoja prava
            </h2>
            <ul className='mt-3 space-y-2 text-base leading-7 text-stone-600'>
              <li>• Pravo na uvid u podatke</li>
              <li>• Pravo na ispravku podataka</li>
              <li>• Pravo na brisanje naloga</li>
              <li>• Pravo na ograničenje obrade</li>
            </ul>
          </SectionCard>

          <SectionCard className='p-4 lg:p-4'>
            <h2 className='text-2xl font-bold text-stone-900'>6. Bezbednost</h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Preduzimaju se tehničke i organizacione mere kako bi se zaštitili
              podaci korisnika od neovlašćenog pristupa.
            </p>
          </SectionCard>

          <SectionCard className='p-4 lg:p-4'>
            <h2 className='text-2xl font-bold text-stone-900'>
              7. Izmene politike
            </h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Politika privatnosti može biti povremeno ažurirana. Sve izmene
              biće objavljene na ovoj stranici.
            </p>
          </SectionCard>

          <SectionCard className='p-4 lg:p-4'>
            <h2 className='text-2xl font-bold text-stone-900'>8. Kontakt</h2>
            <p className='mt-3 text-base leading-7 text-stone-600'>
              Za pitanja u vezi sa privatnošću i podacima možeš se obratiti
              putem kontakt stranice.
            </p>
          </SectionCard>
        </Container>
      </section>
    </main>
  );
}
