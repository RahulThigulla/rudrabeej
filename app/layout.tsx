import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import '@/app/globals.css';
import { AppProviders } from '@/components/layout/AppProviders';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RUDRABEEJ | Authentic Himalayan Rudraksha & Heritage Keepsakes',
  description:
    'Authentic Rudraksha beads, malas, and copper chains thoughtfully presented in signature second-life natural kraft packaging. Ancient Roots. Modern Form.',
  keywords: [
    'Rudraksha',
    'Panchmukhi Rudraksha',
    'Rudraksha Mala 108',
    'Gauri Shankar Rudraksha',
    'Copper Capped Rudraksha',
    'Authentic Rudraksha India',
    'Sustainable Packaging',
    'Indian Heritage Brand',
  ],
  authors: [{ name: 'Rudrabeej Heritage Crafts' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'RUDRABEEJ | Ancient Roots. Modern Form.',
    description:
      'Authentic Himalayan Rudraksha, naturally harvested and delivered in natural rustic jute packaging accompanied by sacred living plant seeds.',
    url: 'http://localhost:3000',
    siteName: 'RUDRABEEJ Rudraksha',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased bg-ivory-50 text-charcoal-900 min-h-screen">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
