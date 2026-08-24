'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Package, 
  Plus, 
  Minus, 
  Check, 
  Share2, 
  ArrowRight 
} from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount, cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductAccordion } from '@/components/product/ProductAccordion';
import { ProductStory } from '@/components/product/ProductStory';
import { PackagingTransformation } from '@/components/product/PackagingTransformation';
import { ReviewSection } from '@/components/product/ReviewSection';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { StickyMobileCartCTA } from '@/components/product/StickyMobileCartCTA';
import { products as allProducts } from '@/data/products';

interface ProductDetailClientProps {
  product: Product;
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const { addItem, setIsCartDrawerOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.price, product.compareAtPrice);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    setIsCartDrawerOpen(false);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav className="flex items-center space-x-2 text-xs text-charcoal-400 font-mono">
          <Link href="/" className="hover:text-charcoal-800 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-charcoal-800 transition-colors">Shop</Link>
          <span>/</span>
          <Link href="/rudraksha" className="hover:text-charcoal-800 transition-colors">Rudraksha</Link>
          <span>/</span>
          <span className="text-charcoal-800 truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Two-Column Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Image Gallery with Lightbox & Zoom */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Purchasing & Accordions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title, Badges & Sanskrit Name */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {product.badges && product.badges.length > 0 && (
                    <span className="bg-charcoal-900 text-ivory-100 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
                      {product.badges[0]}
                    </span>
                  )}
                  {product.mukhi && (
                    <span className="border border-kraft-400 text-charcoal-800 text-[10px] font-mono px-2 py-0.5">
                      {product.mukhi} Mukhi
                    </span>
                  )}
                </div>

                <button
                  onClick={handleShare}
                  className="text-xs text-charcoal-500 hover:text-charcoal-900 inline-flex items-center gap-1 font-mono"
                  aria-label="Share product"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal leading-tight">
                {product.name}
              </h1>

              {product.sanskritName && (
                <p className="text-xs text-charcoal-500 font-serif italic tracking-wide">
                  {product.sanskritName}
                </p>
              )}

              {/* Rating review link */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-medium text-charcoal-800">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-charcoal-400 font-mono">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price & Discounts */}
            <div className="py-3 border-y border-kraft-200 flex items-baseline gap-3">
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-900 font-mono">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-charcoal-400 line-through font-mono">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-mono text-copper-700 bg-copper-50 border border-copper-200 px-2 py-0.5">
                  Save {discountPercent}%
                </span>
              )}
              <span className="text-[11px] text-charcoal-400 font-light ml-auto">
                Inclusive of all taxes
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quantity Selector & Purchase CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-kraft-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-charcoal-600 hover:bg-kraft-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-mono font-medium text-charcoal-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-charcoal-600 hover:bg-kraft-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Selection</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    'p-3.5 border transition-colors',
                    isWishlisted
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white border-kraft-300 text-charcoal-700 hover:bg-kraft-100'
                  )}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={cn('w-4 h-4', isWishlisted && 'fill-current')} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full bg-kraft-500 hover:bg-kraft-400 text-charcoal-900 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-subtle"
              >
                <Zap className="w-4 h-4" />
                <span>Buy Now with 1-Click</span>
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="grid grid-cols-3 gap-3 p-3.5 bg-white border border-kraft-200 text-center">
              <div className="space-y-1">
                <Truck className="w-4 h-4 mx-auto text-copper-600" />
                <span className="text-[10px] font-mono uppercase text-charcoal-700 block">
                  Dispatches in 24h
                </span>
              </div>
              <div className="space-y-1 border-x border-kraft-200">
                <ShieldCheck className="w-4 h-4 mx-auto text-copper-600" />
                <span className="text-[10px] font-mono uppercase text-charcoal-700 block">
                  X-Ray Verified
                </span>
              </div>
              <div className="space-y-1">
                <Package className="w-4 h-4 mx-auto text-copper-600" />
                <span className="text-[10px] font-mono uppercase text-charcoal-700 block">
                  Keepsake Box
                </span>
              </div>
            </div>

            {/* Accordion Tabs for Depth of Information */}
            <div className="pt-4">
              <ProductAccordion product={product} />
            </div>

          </div>

        </div>
      </section>

      {/* Story Section ("More Than A Bead") */}
      <ProductStory product={product} />

      {/* Second Life Packaging Transformation */}
      <PackagingTransformation />

      {/* Customer Reviews Section */}
      <ReviewSection product={product} />

      {/* Related Products */}
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
        allProducts={allProducts}
      />

      {/* Sticky Mobile Cart Bar */}
      <StickyMobileCartCTA product={product} quantity={quantity} />
    </div>
  );
};
