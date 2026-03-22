import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from 'sonner';
import { SearchParamToasts } from '@/components/ui/search-param-toasts';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UslugeBlizu',
  description: 'Lokalne usluge blizu tebe.',
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
        <SearchParamToasts />
      </body>
    </html>
  );
}
