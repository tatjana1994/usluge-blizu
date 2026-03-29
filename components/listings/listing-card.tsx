import Link from 'next/link';
import { TypeBadge } from '@/components/ui/type-badge';

type ListingCardProps = {
  listing: {
    id: string;
    title: string;
    slug: string;
    city: string;
    area?: string | null;
    price?: number | null;
    price_currency?: 'RSD' | 'EUR' | null;
    price_type?: 'fixed' | 'hourly' | null;
    type: 'trazim' | 'nudim';
    image_url?: string | null;
    category_slug?: string | null;
  };
};

const categoryImages: Record<string, string> = {
  lepota: '/images/categories/lepota.png',
  majstori: '/images/categories/majstori.png',
  pomoc: '/images/categories/pomoc.png',
  briga: '/images/categories/briga.png',
  dvoriste: '/images/categories/dvoriste.png',
  selidbe: '/images/categories/selidbe.png',
  ljubimci: '/images/categories/ljubimci.png',
  it: '/images/categories/it.png',
};

const defaultListingImage = '/images/categories/default.jpg';

function formatPrice({
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

export function ListingCard({ listing }: ListingCardProps) {
  const fallbackImage =
    (listing.category_slug && categoryImages[listing.category_slug]) ||
    defaultListingImage;

  const displayImage = listing.image_url || fallbackImage;

  return (
    <Link
      href={`/oglasi/${listing.slug}`}
      className='group block overflow-hidden rounded-[28px] border border-stone-300 bg-[#fffaf7] shadow-[0_8px_24px_rgba(47,38,34,0.06)] transition duration-200 hover:shadow-[0_14px_32px_rgba(47,38,34,0.10)]'
    >
      <div className='relative aspect-[16/10] overflow-hidden bg-[#f6ede7]'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayImage}
          alt={listing.title}
          className='h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]'
        />

        <div className='absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4'>
          <TypeBadge type={listing.type} />

          <div className='rounded-full bg-white/90 px-3 py-1.5 text-md font-bold text-stone-700 shadow-sm backdrop-blur'>
            {formatPrice({
              price: listing.price,
              priceCurrency: listing.price_currency,
              priceType: listing.price_type,
            })}
          </div>
        </div>
      </div>

      <div className='bg-[#fffaf7] p-5'>
        <h3 className='line-clamp-2 text-2xl font-bold tracking-tight text-stone-900'>
          {listing.title}
        </h3>

        <p className='mt-3 text-md text-stone-600'>
          {listing.city}
          {listing.area ? `, ${listing.area}` : ''}
        </p>

        <div className='mt-6 flex items-center justify-between'>
          <span className='text-md font-bold text-rose-600 transition group-hover:text-rose-700'>
            Pogledaj detalje
          </span>

          <span className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-rose-400 transition group-hover:border-rose-300 group-hover:bg-rose-100 group-hover:text-rose-500'>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
