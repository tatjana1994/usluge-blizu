// lib/utils/format-listing-price.ts
type PriceCurrency = 'RSD' | 'EUR' | null | undefined;
type PriceType = 'fixed' | 'hourly' | null | undefined;

export function formatListingPrice({
  price,
  priceCurrency,
  priceType,
}: {
  price: number | string | null | undefined;
  priceCurrency?: PriceCurrency;
  priceType?: PriceType;
}) {
  if (price === null || price === undefined || price === '') {
    return 'Po dogovoru';
  }

  const numericPrice =
    typeof price === 'number' ? price : Number(String(price).replace(',', '.'));

  if (Number.isNaN(numericPrice)) {
    return 'Po dogovoru';
  }

  const currency = priceCurrency === 'EUR' ? 'EUR' : 'RSD';
  const formattedNumber =
    currency === 'RSD'
      ? new Intl.NumberFormat('sr-RS', {
          maximumFractionDigits: 0,
        }).format(numericPrice)
      : new Intl.NumberFormat('sr-RS', {
          minimumFractionDigits: numericPrice % 1 === 0 ? 0 : 2,
          maximumFractionDigits: 2,
        }).format(numericPrice);

  const suffix = priceType === 'hourly' ? ' / sat' : '';

  return `${formattedNumber} ${currency}${suffix}`;
}
