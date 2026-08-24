'use client';

import React from 'react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No Rudraksha products match your selected filters.'
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-white border border-kraft-200 p-8 space-y-3">
        <p className="font-serif text-base text-charcoal-800">{emptyMessage}</p>
        <p className="text-xs text-charcoal-400 font-light">
          Try adjusting your Mukhi selection or price filters to explore our full collection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
