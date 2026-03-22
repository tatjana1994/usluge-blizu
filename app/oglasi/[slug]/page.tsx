import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { TypeBadge } from '@/components/ui/type-badge';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';

function formatListingPrice({
  price,
  priceCurrency,
  priceType,
}: {
  price?: number | null;
  priceCurrency?: 'RSD' | 'EUR' | null;
  priceType?: 'fixed' | 'hourly' | null;
}) {
  if (price === null || price === undefined) return 'Po dogovoru';

  const currency = priceCurrency === 'EUR' ? 'EUR' : 'RSD';

  const formatted =
    currency === 'RSD'
      ? new Intl.NumberFormat('sr-RS', {
          maximumFractionDigits: 0,
        }).format(price)
      : new Intl.NumberFormat('sr-RS', {
          minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
          maximumFractionDigits: 2,
        }).format(price);

  const suffix = priceType === 'hourly' ? ' / sat' : '';

  return `${formatted} ${currency}${suffix}`;
}

export default async function OglasDetaljPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: listing, error } = await supabase
    .from('listings')
    .select(
      `
      id,
      title,
      slug,
      description,
      city,
      area,
      price,
      price_currency,
      price_type,
      type,
      contact_name,
      contact_phone,
      contact_email,
      created_at,
      status,
      categories (
        id,
        name,
        slug
      )
    `,
    )
    .eq('slug', slug)
    .eq('status', 'approved')
    .single();

  if (error || !listing) {
    notFound();
  }

  const { data: relatedListings } = await supabase
    .from('listings')
    .select('id, title, slug, city, area, price, price_currency, price_type')
    .eq('status', 'approved')
    .neq('id', listing.id)
    .limit(3);

  const categoryName =
    Array.isArray(listing.categories) && listing.categories.length > 0
      ? listing.categories[0].name
      : null;

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative overflow-hidden border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative max-w-7xl py-16 lg:py-20'>
          <div className='mb-8'>
            <Link
              href='/oglasi'
              className='inline-flex text-sm font-medium text-rose-600 hover:underline'
            >
              ← Nazad na oglase
            </Link>
          </div>

          <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]'>
            <div className='space-y-8'>
              <SectionCard className='border-stone-200 bg-white/95 p-8 shadow-lg lg:p-10'>
                <div className='mb-5 flex flex-wrap items-center gap-2'>
                  <TypeBadge type={listing.type as 'trazim' | 'nudim'} />

                  {categoryName ? (
                    <span className='inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-stone-700'>
                      {categoryName}
                    </span>
                  ) : null}
                </div>

                <h1 className='text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl'>
                  {listing.title}
                </h1>

                <div className='mt-5 flex flex-wrap items-center gap-4 text-sm text-stone-500'>
                  <span>
                    {listing.city}
                    {listing.area ? `, ${listing.area}` : ''}
                  </span>
                  <span>
                    {new Date(listing.created_at).toLocaleDateString('sr-RS')}
                  </span>
                </div>

                <div className='mt-8 grid gap-4 sm:grid-cols-3'>
                  <div className='rounded-2xl border border-rose-100 bg-[#fff8f4] p-4'>
                    <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                      {listing.price_type === 'hourly'
                        ? 'Cena po satu'
                        : 'Cena'}
                    </p>
                    <p className='mt-2 text-lg font-semibold text-stone-900'>
                      {formatListingPrice({
                        price: listing.price,
                        priceCurrency: listing.price_currency as
                          | 'RSD'
                          | 'EUR'
                          | null,
                        priceType: listing.price_type as
                          | 'fixed'
                          | 'hourly'
                          | null,
                      })}
                    </p>
                  </div>

                  <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                    <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                      Grad
                    </p>
                    <p className='mt-2 text-lg font-semibold text-stone-900'>
                      {listing.city}
                    </p>
                  </div>

                  <div className='rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                    <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                      Lokacija
                    </p>
                    <p className='mt-2 text-lg font-semibold text-stone-900'>
                      {listing.area || 'Nije navedeno'}
                    </p>
                  </div>
                </div>

                <div className='mt-10 border-t border-stone-100 pt-8'>
                  <p className='text-xs font-medium uppercase tracking-wide text-stone-500'>
                    Opis oglasa
                  </p>
                  <div className='mt-4 whitespace-pre-line text-base leading-8 text-stone-700'>
                    {listing.description}
                  </div>
                </div>
              </SectionCard>
            </div>

            <aside className='h-fit lg:sticky lg:top-24'>
              <SectionCard className='border-stone-200 bg-white/95 p-6 shadow-lg'>
                <p className='text-sm font-medium text-rose-600'>Kontakt</p>
                <h2 className='mt-2 text-2xl font-semibold tracking-tight text-stone-900'>
                  Kontakt za oglas
                </h2>

                <div className='mt-6 space-y-4'>
                  <div className='rounded-xl border border-stone-200 bg-stone-50 p-4'>
                    <p className='text-xs uppercase tracking-wide text-stone-500'>
                      Kontakt osoba
                    </p>
                    <p className='mt-1 text-sm font-medium text-stone-900'>
                      {listing.contact_name}
                    </p>
                  </div>

                  <div className='rounded-xl border border-stone-200 bg-stone-50 p-4'>
                    <p className='text-xs uppercase tracking-wide text-stone-500'>
                      Telefon
                    </p>
                    <p className='mt-1 text-sm font-medium text-stone-900'>
                      {listing.contact_phone}
                    </p>
                  </div>

                  {listing.contact_email ? (
                    <div className='rounded-xl border border-stone-200 bg-stone-50 p-4'>
                      <p className='text-xs uppercase tracking-wide text-stone-500'>
                        Email
                      </p>
                      <p className='mt-1 break-all text-sm font-medium text-stone-900'>
                        {listing.contact_email}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className='mt-6 space-y-3'>
                  <a
                    href={`tel:${listing.contact_phone}`}
                    className={`${primaryButtonClassName} w-full`}
                  >
                    Pozovi
                  </a>

                  {listing.contact_email ? (
                    <a
                      href={`mailto:${listing.contact_email}`}
                      className={`${secondaryButtonClassName} w-full`}
                    >
                      Pošalji email
                    </a>
                  ) : null}
                </div>

                <div className='mt-6 rounded-xl border border-rose-100 bg-[#fff8f4] p-4'>
                  <p className='text-sm font-medium text-stone-900'>
                    Savet za kontakt
                  </p>
                  <p className='mt-1 text-sm leading-6 text-stone-600'>
                    Kada zoveš ili pišeš, spomeni da je oglas pronađen preko
                    UslugeBlizu.
                  </p>
                </div>
              </SectionCard>
            </aside>
          </div>

          <section className='mt-12'>
            <div className='mb-6 flex items-end justify-between gap-4'>
              <div>
                <p className='text-sm font-medium text-rose-600'>Još oglasa</p>
                <h2 className='mt-2 text-3xl font-semibold tracking-tight text-stone-900'>
                  Slični oglasi
                </h2>
              </div>

              <Link
                href='/oglasi'
                className='text-sm font-medium text-rose-600 hover:underline'
              >
                Vidi sve
              </Link>
            </div>

            {!relatedListings || relatedListings.length === 0 ? (
              <SectionCard className='border-stone-200 bg-white/95 p-6 shadow-sm'>
                <p className='text-sm text-stone-600'>
                  Trenutno nema sličnih oglasa.
                </p>
              </SectionCard>
            ) : (
              <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
                {relatedListings.map((item) => (
                  <Link
                    key={item.id}
                    href={`/oglasi/${item.slug}`}
                    className='rounded-2xl border border-stone-200 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                  >
                    <h3 className='text-lg font-semibold tracking-tight text-stone-900'>
                      {item.title}
                    </h3>

                    <p className='mt-2 text-sm text-stone-600'>
                      {item.city}
                      {item.area ? `, ${item.area}` : ''}
                    </p>

                    <div className='mt-5 flex items-center justify-between'>
                      <p className='text-sm font-medium text-stone-900'>
                        {formatListingPrice({
                          price: item.price,
                          priceCurrency: item.price_currency as
                            | 'RSD'
                            | 'EUR'
                            | null,
                          priceType: item.price_type as
                            | 'fixed'
                            | 'hourly'
                            | null,
                        })}
                      </p>
                      <span className='text-sm font-medium text-rose-600'>
                        Detalji
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </Container>
      </section>
    </main>
  );
}
