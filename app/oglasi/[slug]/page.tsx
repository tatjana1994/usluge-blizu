import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { Container } from '@/components/layout/container';
import { SectionCard } from '@/components/ui/section-card';
import { TypeBadge } from '@/components/ui/type-badge';
import {
  primaryButtonClassName,
  secondaryButtonClassName,
} from '@/lib/constants/ui';
import { ListingCard } from '@/components/listings/listing-card';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: listing } = await supabase
    .from('listings')
    .select('title, description, city')
    .eq('slug', slug)
    .single();

  if (!listing) {
    return {
      title: 'Oglas',
    };
  }

  return {
    title: `${listing.title} | ${listing.city} | UslugeBlizu`,
    description: listing.description?.slice(0, 150),
    openGraph: {
      title: listing.title,
      description: listing.description,
      url: `/oglasi/${slug}`,
      siteName: 'UslugeBlizu',
      images: ['/og-image.png'], // kasnije može dynamic
    },
  };
}

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
      category_id,
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

  const { data: relatedListings, error: relatedListingsError } = await supabase
    .from('listings')
    .select(
      `
    id,
    title,
    slug,
    city,
    area,
    price,
    price_currency,
    price_type,
    type,
    categories (
      slug
    )
  `,
    )
    .eq('status', 'approved')
    .eq('category_id', listing.category_id)
    .eq('city', listing.city)
    .neq('id', listing.id)
    .order('created_at', { ascending: false })
    .limit(3);

  if (relatedListingsError) {
    console.error(relatedListingsError);
  }

  const categoryName =
    Array.isArray(listing.categories) && listing.categories.length > 0
      ? listing.categories[0].name
      : null;

  const headerList = await headers();
  const host = headerList.get('host');
  const protocol = headerList.get('x-forwarded-proto') ?? 'http';
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (host ? `${protocol}://${host}` : 'http://localhost:3000');

  const listingUrl = `${origin}/oglasi/${listing.slug}`;
  const mapQuery = encodeURIComponent(
    `${listing.area ? `${listing.area}, ` : ''}${listing.city}, Srbija`,
  );
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=14&output=embed`;
  const mailShareHref = `mailto:?subject=${encodeURIComponent(
    `Pogledaj oglas: ${listing.title}`,
  )}&body=${encodeURIComponent(
    `Pogledaj ovaj oglas na UslugeBlizu:\n\n${listingUrl}`,
  )}`;
  const whatsappShareHref = `https://wa.me/?text=${encodeURIComponent(
    `Pogledaj oglas "${listing.title}" na UslugeBlizu: ${listingUrl}`,
  )}`;

  return (
    <main className='min-h-screen bg-[var(--background)]'>
      <section className='relative border-b border-[var(--border)] bg-[#fff7f2]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(183,110,121,0.16),transparent_28%)]' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(233,213,203,0.65),transparent_30%)]' />

        <Container className='relative max-w-7xl py-16 pb-24 lg:py-20 lg:pb-32'>
          <div className='mb-8'>
            <Link
              href='/oglasi'
              className='inline-flex text-sm font-medium text-rose-600 transition hover:text-rose-700 hover:underline'
            >
              ← Nazad na oglase
            </Link>
          </div>

          <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]'>
            <div className='space-y-8'>
              <SectionCard className='border-stone-200 bg-white p-8 shadow-md lg:p-10'>
                <div className='mb-6 flex flex-wrap items-center gap-2'>
                  <TypeBadge type={listing.type as 'trazim' | 'nudim'} />

                  {categoryName ? (
                    <span className='inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-600'>
                      {categoryName}
                    </span>
                  ) : null}

                  <span className='inline-flex rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500'>
                    Objavljeno{' '}
                    {new Date(listing.created_at).toLocaleDateString('sr-RS')}
                  </span>
                </div>

                <h1 className='text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl lg:text-5xl'>
                  {listing.title}
                </h1>

                <div className='mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-500'>
                  <span className='inline-flex items-center rounded-full bg-stone-100 px-3 py-1'>
                    {listing.city}
                    {listing.area ? `, ${listing.area}` : ''}
                  </span>

                  {categoryName ? (
                    <span className='inline-flex items-center rounded-full bg-stone-100 px-3 py-1'>
                      {categoryName}
                    </span>
                  ) : null}
                </div>

                <div className='mt-8 grid gap-4 sm:grid-cols-3'>
                  <div className='rounded-2xl border border-rose-100 bg-[#fff8f4] p-5'>
                    <p className='text-[11px] font-semibold uppercase tracking-wider text-stone-500'>
                      {listing.price_type === 'hourly'
                        ? 'Cena po satu'
                        : 'Cena'}
                    </p>
                    <p className='mt-2 text-xl font-bold text-stone-900'>
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

                  <div className='rounded-2xl border border-stone-200 bg-stone-50 p-5'>
                    <p className='text-[11px] font-semibold uppercase tracking-wider text-stone-500'>
                      Grad
                    </p>
                    <p className='mt-2 text-lg font-semibold text-stone-900'>
                      {listing.city}
                    </p>
                  </div>

                  <div className='rounded-2xl border border-stone-200 bg-stone-50 p-5'>
                    <p className='text-[11px] font-semibold uppercase tracking-wider text-stone-500'>
                      Lokacija
                    </p>
                    <p className='mt-2 text-lg font-semibold text-stone-900'>
                      {listing.area || 'Nije navedeno'}
                    </p>
                  </div>
                </div>

                <div className='mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5'>
                  <p className='text-sm font-semibold text-emerald-800'>
                    Direktan dogovor sa oglašivačem
                  </p>
                  <p className='mt-2 text-sm leading-6 text-emerald-900/80'>
                    Pozovi ili pošalji email bez posrednika. Sve informacije za
                    kontakt su prikazane sa desne strane.
                  </p>
                </div>

                <div className='mt-10 border-t border-stone-100 pt-8'>
                  <h3 className='text-sm font-semibold uppercase tracking-wider text-stone-500'>
                    Opis oglasa
                  </h3>

                  <p className='mt-4 whitespace-pre-line text-[15px] leading-7 text-stone-700'>
                    {listing.description}
                  </p>
                </div>
              </SectionCard>

              <SectionCard className='border-stone-200 bg-white p-6 shadow-sm lg:p-8'>
                <div className='mb-4 flex items-center justify-between gap-4'>
                  <div>
                    <p className='text-sm font-medium text-rose-600'>
                      Lokacija
                    </p>
                    <h2 className='mt-1 text-2xl font-semibold tracking-tight text-stone-900'>
                      Prikaz na mapi
                    </h2>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target='_blank'
                    rel='noreferrer'
                    className='text-sm font-medium text-rose-600 transition hover:text-rose-700 hover:underline'
                  >
                    Otvori mapu
                  </a>
                </div>

                <div className='overflow-hidden rounded-2xl border border-stone-200'>
                  <iframe
                    title='Mapa oglasa'
                    src={mapEmbedUrl}
                    className='h-[260px] w-full'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                  />
                </div>
              </SectionCard>
            </div>

            <aside className='h-fit self-start lg:sticky lg:top-32'>
              <SectionCard className='border-stone-200 bg-white p-6 shadow-md'>
                <p className='text-sm font-medium text-rose-600'>Kontakt</p>
                <h2 className='mt-2 text-2xl font-semibold tracking-tight text-stone-900'>
                  Kontakt za oglas
                </h2>

                <div className='mt-6 space-y-3'>
                  <div className='rounded-xl border border-stone-200 bg-white p-4'>
                    <p className='text-[11px] font-semibold uppercase tracking-wider text-stone-500'>
                      Kontakt osoba
                    </p>
                    <p className='mt-1 text-sm font-medium text-stone-900'>
                      {listing.contact_name}
                    </p>
                  </div>

                  <div className='rounded-xl border border-stone-200 bg-white p-4'>
                    <p className='text-[11px] font-semibold uppercase tracking-wider text-stone-500'>
                      Telefon
                    </p>
                    <p className='mt-1 text-sm font-medium text-stone-900'>
                      {listing.contact_phone}
                    </p>
                  </div>

                  {listing.contact_email ? (
                    <div className='rounded-xl border border-stone-200 bg-white p-4'>
                      <p className='text-[11px] font-semibold uppercase tracking-wider text-stone-500'>
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

                <div className='mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4'>
                  <p className='text-sm font-semibold text-stone-900'>
                    Podeli oglas
                  </p>

                  <div className='mt-3 grid gap-3 sm:grid-cols-2'>
                    <a
                      href={whatsappShareHref}
                      target='_blank'
                      rel='noreferrer'
                      className='inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-rose-200 hover:text-rose-600'
                    >
                      WhatsApp
                    </a>

                    <a
                      href={mailShareHref}
                      className='inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-rose-200 hover:text-rose-600'
                    >
                      Email
                    </a>
                  </div>
                </div>

                <div className='mt-6 rounded-2xl border border-rose-100 bg-[#fff8f4] p-4'>
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
                  <ListingCard
                    key={item.id}
                    listing={{
                      id: item.id,
                      title: item.title,
                      slug: item.slug,
                      city: item.city,
                      area: item.area,
                      price: item.price,
                      price_currency: item.price_currency as
                        | 'RSD'
                        | 'EUR'
                        | null,
                      price_type: item.price_type as 'fixed' | 'hourly' | null,
                      type: item.type as 'trazim' | 'nudim',
                      image_url:
                        'image_url' in item
                          ? (item.image_url as string | null)
                          : null,
                      category_slug: Array.isArray(item.categories)
                        ? (item.categories[0]?.slug ?? null)
                        : ((item.categories as { slug?: string } | null)
                            ?.slug ?? null),
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        </Container>
      </section>
    </main>
  );
}
