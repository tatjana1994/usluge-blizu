import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from 'sonner';
import { SearchParamToasts } from '@/components/ui/search-param-toasts';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'UslugeBlizu - Lokalni oglasi usluga',
  description:
    'Pronađi ili objavi uslugu u svom gradu. Majstori, čišćenje, čuvanje dece, selidbe i još mnogo toga.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'UslugeBlizu',
    description: 'Lokalna platforma za usluge. Pronađi ili objavi oglas.',
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
        <Navbar />
        {children}
        <Footer />
        <Toaster position='bottom-center' richColors />
        <Suspense fallback={null}>
          <SearchParamToasts />
        </Suspense>
      </body>
    </html>
  );
}
