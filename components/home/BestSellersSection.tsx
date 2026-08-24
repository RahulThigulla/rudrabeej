'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export const BestSellersSection: React.FC = () => {
  const bestSellers = products.filter((p) => p.badges?.includes('BESTSELLER')).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
              <Flame className="w-3.5 h-3.5" />
              <span>Cherished by Custodians</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mt-1">
              Most Revered Creations
            </h2>
            <p className="text-sm text-charcoal-500 font-light mt-1 max-w-md">
              Our most sought-after Panchmukhi malas, single beads, and complete ritual gift sets.
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest font-medium text-copper-600 hover:text-copper-800 inline-flex items-center gap-1.5 border-b border-copper-600/40 pb-0.5 transition-colors self-start sm:self-auto"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
