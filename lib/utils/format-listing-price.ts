import type { ListingCurrency, ListingPriceType } from '@/lib/types/listing';

type Params = {
  price?: number | null;
  priceCurrency?: ListingCurrency;
  priceType?: ListingPriceType;
};

export function formatListingPrice({
  price,
  priceCurrency,
  priceType,
}: Params) {
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
