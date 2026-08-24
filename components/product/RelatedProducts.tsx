'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  allProducts: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category,
  allProducts,
}) => {
  const related = allProducts
    .filter((p) => p.id !== currentProductId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
              Explore Harmonies
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mt-1">
              You May Also Appreciate
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest font-medium text-copper-600 hover:text-copper-800 inline-flex items-center gap-1.5 border-b border-copper-600/40 pb-0.5"
          >
            <span>View All Creations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
};
