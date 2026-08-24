'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Tag, 
  Check, 
  ArrowLeft 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export default function FullCartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const router = useRouter();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (!success) {
      setCouponError('Invalid code. Try "ROOTED10" for 10% off.');
    } else {
      setCouponCode('');
    }
  };

  const inCartIds = items.map((i) => i.product.id);
  const recommendations = products.filter((p) => !inCartIds.includes(p.id)).slice(0, 3);

  if (items.length === 0) {
    return (
      <div className="bg-ivory-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="text-center space-y-6 max-w-md bg-white border border-kraft-300 p-10 shadow-subtle">
          <div className="w-16 h-16 mx-auto rounded-full bg-kraft-100 flex items-center justify-center text-copper-600">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              Your Cart is Empty
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light leading-relaxed">
              Explore our naturally harvested Himalayan beads, meditation malas, and second-life keepsake sets.
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
              Your Selection
            </h1>
            <p className="text-xs text-charcoal-500 font-mono mt-1">
              {items.length} unique creation{items.length > 1 ? 's' : ''} held in your bag
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-charcoal-400 hover:text-red-700 font-mono underline"
          >
            Clear Bag
          </button>
        </div>

        {/* 2-Column: Cart Table + Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Table / Items List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free Shipping Banner */}
            <div className="p-4 bg-white border border-kraft-200 text-xs flex items-center justify-between">
              {amountNeededForFreeShipping > 0 ? (
                <div className="flex items-center gap-2 text-charcoal-700">
                  <Truck className="w-4 h-4 text-copper-600 shrink-0" />
                  <span>
                    Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more to unlock Complimentary Pan-India Shipping.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-emerald-800 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Your order qualifies for Complimentary Pan-India Shipping!</span>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="bg-white border border-kraft-300 divide-y divide-kraft-200 shadow-subtle">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  
                  {/* Thumbnail & Name */}
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/rudraksha/${product.slug}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 bg-ivory-50 shrink-0 border border-kraft-200 overflow-hidden"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="space-y-1">
                      <Link
                        href={`/rudraksha/${product.slug}`}
                        className="font-serif text-base sm:text-lg font-medium text-charcoal-900 hover:text-copper-700 transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-charcoal-500 font-mono">
                        {product.size} • {product.origin.split(',')[0]}
                      </p>
                      <p className="text-xs font-serif font-semibold text-charcoal-900 font-mono sm:hidden">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="flex items-center border border-kraft-300 bg-white">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="p-2 text-charcoal-600 hover:bg-kraft-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3.5 text-xs font-mono font-medium text-charcoal-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="p-2 text-charcoal-600 hover:bg-kraft-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="hidden sm:block text-right min-w-[90px]">
                      <span className="font-serif text-base font-semibold text-charcoal-900 font-mono">
                        {formatPrice(product.price * quantity)}
                      </span>
                      {quantity > 1 && (
                        <span className="block text-[11px] text-charcoal-400 font-mono">
                          {formatPrice(product.price)} each
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-2 text-charcoal-400 hover:text-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Back link */}
            <div className="pt-2">
              <Link
                href="/shop"
                className="text-xs font-mono uppercase tracking-widest text-charcoal-600 hover:text-charcoal-900 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-kraft-300 p-6 sm:p-8 space-y-6 shadow-kraft">
              <h3 className="font-serif text-xl text-charcoal-900 font-medium pb-4 border-b border-kraft-200">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-kraft-100 p-2.5 border border-kraft-300 text-xs">
                    <span className="flex items-center gap-1.5 font-mono text-charcoal-800">
                      <Tag className="w-3.5 h-3.5 text-copper-600" />
                      <span>Code <strong>{appliedCoupon}</strong> (-10%)</span>
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-[11px] text-charcoal-500 hover:text-charcoal-900 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (e.g. ROOTED10)"
                      className="flex-1 bg-ivory-50 border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-kraft-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-kraft-200 hover:bg-kraft-300 text-charcoal-800 text-xs font-medium tracking-wider uppercase"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Calculation Rows */}
              <div className="space-y-3 text-xs text-charcoal-600 pt-2 border-t border-kraft-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>10% Savings</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Shipping</span>
                  <span className="font-mono text-charcoal-900">
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-charcoal-900 pt-3 border-t border-kraft-200">
                  <span className="font-serif">Total Amount</span>
                  <span className="font-mono text-copper-700">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div>
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 py-4 text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-elevated"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-copper-400" />
                </button>
              </div>

              <div className="pt-2 text-[11px] text-charcoal-400 space-y-2 font-light">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-copper-600" />
                  <span>Tamper-sealed authentic botanical parcel</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-copper-600" />
                  <span>Insured Pan-India delivery via BlueDart/DTDC</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Cross-Sell Recommendations */}
        {recommendations.length > 0 && (
          <div className="pt-12 border-t border-kraft-200 space-y-6">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal">
              You May Also Appreciate
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
