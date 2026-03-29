export type ListingType = 'trazim' | 'nudim';
export type ListingCurrency = 'RSD' | 'EUR' | null;
export type ListingPriceType = 'fixed' | 'hourly' | null;
export type ListingStatus = 'pending' | 'approved' | 'rejected' | 'archived';

export type ListingCardItem = {
  id: string;
  title: string;
  slug: string;
  city: string;
  area?: string | null;
  price?: number | null;
  price_currency?: ListingCurrency;
  price_type?: ListingPriceType;
  type: ListingType;
  image_url?: string | null;
  category_slug?: string | null;
};
