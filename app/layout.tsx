import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { SearchParamToasts } from '@/components/ui/search-param-toasts';
import { Suspense } from 'react';
import { BASE_URL } from '@/lib/config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'UslugeBlizu - Pronađi ili ponudi uslugu u svom gradu',
    template: '%s | UslugeBlizu',
  },

  description:
    'Lokalni oglasi za sve vrste usluga. Pronađi ili ponudi uslugu u svom gradu i poveži se brzo sa ljudima koji traže ili nude usluge.',

  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'UslugeBlizu - Pronađi ili ponudi uslugu',
    description:
      'Platforma za lokalne oglase usluga. Pronađi ili ponudi uslugu u svom gradu brzo i jednostavno.',
    url: BASE_URL,
    siteName: 'UslugeBlizu',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'UslugeBlizu platforma za usluge',
      },
    ],
    locale: 'sr_RS',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'UslugeBlizu - Pronađi ili ponudi uslugu',
    description:
      'Lokalni oglasi za usluge. Brzo pronađi ili ponudi uslugu u svom gradu.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='sr'>
      <body className={inter.className}>
        {children}
        <Toaster position='bottom-center' richColors />
        <Suspense fallback={null}>
          <SearchParamToasts />
        </Suspense>
      </body>
    </html>
  );
}
