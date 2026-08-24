'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { wishlistProducts, wishlistCount } = useWishlist();

  if (wishlistCount === 0) {
    return (
      <div className="bg-ivory-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="text-center space-y-6 max-w-md bg-white border border-kraft-300 p-10 shadow-subtle">
          <div className="w-16 h-16 mx-auto rounded-full bg-kraft-100 flex items-center justify-center text-copper-600">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              Your Wishlist is Empty
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
              Save your favorite authentic Rudraksha beads, malas, and sacred second-life gift sets to review later.
            </p>
          </div>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-charcoal-900 text-ivory-50 px-8 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-charcoal-800 transition-colors"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="border-b border-kraft-200 pb-6 flex items-baseline justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Saved Wishlist
            </h1>
            <p className="text-xs text-charcoal-500 font-mono mt-1">
              {wishlistCount} sacred creation{wishlistCount > 1 ? 's' : ''} saved in your vault
            </p>
          </div>

          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-widest text-copper-600 hover:text-copper-800"
          >
            Continue Shopping →
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
