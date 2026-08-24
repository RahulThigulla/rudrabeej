import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShopCatalogClient } from '@/components/shop/ShopCatalogClient';

export const metadata: Metadata = {
  title: 'Shop All Rudraksha | RUDRABEEJ Heritage Collection',
  description:
    'Discover our complete collection of authentic Himalayan Rudraksha beads, 108 malas, copper chains, and second-life keepsake gift sets.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs font-mono text-charcoal-400">Loading catalog...</div>}>
      <ShopCatalogClient />
    </Suspense>
  );
}
