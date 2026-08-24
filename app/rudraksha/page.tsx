import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShopCatalogClient } from '@/components/shop/ShopCatalogClient';

export const metadata: Metadata = {
  title: 'Rudraksha Beads & Malas | RUDRABEEJ Ancient Roots',
  description:
    'Explore naturally harvested authentic Rudraksha beads (Panchmukhi, Shanmukhi, Dwimukhi, Ek Mukhi, Gauri Shankar) in reusable kraft boxes.',
};

export default function RudrakshaPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs font-mono text-charcoal-400">Loading Rudraksha catalog...</div>}>
      <ShopCatalogClient
        pageTitle="The Sacred Rudraksha Collection"
        pageSubtitle="Authentic botanical seeds from the Himalayan valleys, individually inspected for natural cleft symmetry and conditioned in organic cold-pressed oil."
      />
    </Suspense>
  );
}
