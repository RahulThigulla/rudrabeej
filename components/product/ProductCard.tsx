'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const discountPercent = calculateDiscount(product.price, product.compareAtPrice);
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product, 1);
    setIsAdding(false);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const secondaryImage = product.images.length > 1 ? product.images[1].url : product.thumbnail;

  return (
    <article
      className={cn(
        'group relative bg-white border border-kraft-200/90 flex flex-col justify-between transition-all duration-300 hover:border-kraft-400 hover:shadow-elevated',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-ivory-50">
        <Link href={`/rudraksha/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered && secondaryImage ? secondaryImage : product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badges && product.badges.length > 0 && (
            <span className="bg-charcoal-900 text-ivory-100 text-[9px] sm:text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 font-medium shadow-sm">
              {product.badges[0]}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-copper-600 text-white text-[9px] sm:text-[10px] font-mono tracking-wider px-1.5 py-0.5 shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Mukhi Indicator */}
        {product.mukhi && (
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 pointer-events-none">
            <span className="bg-ivory-50/95 backdrop-blur-sm border border-kraft-300 text-charcoal-900 text-[10px] sm:text-[11px] font-serif font-medium px-2 py-0.5 tracking-wider shadow-xs">
              {product.mukhi} Mukhi
            </span>
          </div>
        )}

        {/* Wishlist Button (Mobile touch target >= 36px) */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={cn(
            'absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm active:scale-90',
            isWishlisted
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-white/95 text-charcoal-600 hover:text-charcoal-900 border border-kraft-200 hover:bg-white'
          )}
        >
          <Heart
            className={cn('w-4 h-4 transition-transform', isWishlisted && 'fill-current text-red-600')}
          />
        </button>

        {/* Quick Add Overlay on Desktop */}
        <div className="hidden lg:block absolute inset-x-3 bottom-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="w-full bg-charcoal-900/95 hover:bg-charcoal-900 text-ivory-100 backdrop-blur-sm py-2.5 text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
          >
            {addedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Added to Selection</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div>
          {/* Ratings & Origin */}
          <div className="flex items-center gap-1.5 text-xs text-charcoal-500 mb-1">
            <div className="flex items-center text-amber-600">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            </div>
            <span className="font-mono text-[11px] font-medium text-charcoal-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-charcoal-400 text-[10px]">
              ({product.reviewCount})
            </span>
          </div>

          {/* Title & Sanskrit subtitle */}
          <Link href={`/rudraksha/${product.slug}`} className="block group-hover:text-copper-700 transition-colors">
            <h3 className="font-serif text-sm sm:text-base md:text-lg font-medium text-charcoal-900 leading-snug line-clamp-1">
              {product.name}
            </h3>
            {product.sanskritName && (
              <p className="text-[10px] sm:text-[11px] text-charcoal-400 font-light mt-0.5 tracking-wide line-clamp-1">
                {product.sanskritName}
              </p>
            )}
          </Link>

          {/* Short Description */}
          <p className="hidden sm:block text-xs text-charcoal-500 font-light line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Mobile Add to Cart */}
        <div className="pt-2 sm:pt-3 border-t border-kraft-200/70 flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
            <span className="text-sm sm:text-base font-serif font-semibold text-charcoal-900 font-mono">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[11px] sm:text-xs text-charcoal-400 line-through font-mono">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button (Thumb friendly touch target) */}
          <button
            onClick={handleQuickAdd}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 bg-kraft-100 hover:bg-kraft-200 border border-kraft-300 text-charcoal-900 flex items-center justify-center transition-all active:scale-90"
            aria-label={`Add ${product.name} to cart`}
          >
            {addedSuccess ? (
              <Check className="w-4 h-4 text-emerald-700" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
