'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ListingCard } from '@/components/listings/listing-card';

type Listing = {
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

export function LatestListingsCarousel({ listings }: { listings: Listing[] }) {
  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1.08,
          },
          640: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 2.2,
          },
          1200: {
            slidesPerView: 3.2,
          },
        }}
        className='latest-listings-swiper !pb-12'
      >
        {listings.map((listing) => (
          <SwiperSlide key={listing.id} className='h-auto'>
            <div className='h-full'>
              <ListingCard listing={listing} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
