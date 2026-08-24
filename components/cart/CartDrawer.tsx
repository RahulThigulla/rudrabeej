'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Check, 
  Tag, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { products } from '@/data/products';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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
    addItem
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const router = useRouter();

  if (!isCartDrawerOpen) return null;

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

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    router.push('/checkout');
  };

  // Recommendations that are not currently in the cart
  const inCartIds = items.map((i) => i.product.id);
  const recommendations = products.filter((p) => !inCartIds.includes(p.id)).slice(0, 2);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-50 border-l border-kraft-300 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-kraft-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-charcoal-900" />
              <h3 className="font-serif text-lg tracking-wider text-charcoal-900 font-medium">
                Your Selection
              </h3>
              <span className="text-xs font-mono text-kraft-600 bg-kraft-100 px-2 py-0.5 rounded-full">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-charcoal-400 hover:text-charcoal-900 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-kraft-100/70 border-b border-kraft-200 px-5 py-3 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-charcoal-700">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-copper-600" />
                    <span>Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more for Free Shipping</span>
                  </span>
                  <span className="font-mono text-[10px] text-charcoal-500">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-kraft-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-copper-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You have unlocked complimentary Pan-India shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-kraft-100 flex items-center justify-center text-kraft-500">
                  <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-charcoal-900">Your cart is empty</h4>
                  <p className="text-xs text-charcoal-500 font-light mt-1 max-w-xs mx-auto">
                    Explore our authentic Himalayan Rudraksha beads, malas, and sacred second-life gift sets.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="inline-block bg-charcoal-900 text-ivory-50 px-6 py-2.5 text-xs font-medium uppercase tracking-widest hover:bg-kraft-700 transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-kraft-200/80">
                {items.map(({ product, quantity, selectedVariant }) => (
                  <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-kraft-100 shrink-0 border border-kraft-200 relative overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/rudraksha/${product.slug}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="font-serif text-sm font-medium text-charcoal-900 hover:text-copper-600 transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <p className="text-[11px] text-charcoal-500 font-mono mt-0.5">
                            {product.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-charcoal-400 hover:text-red-600 transition-colors p-1"
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-kraft-300 bg-white shadow-xs">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:bg-kraft-100 active:bg-kraft-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono font-medium text-charcoal-900">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-charcoal-700 hover:bg-kraft-100 active:bg-kraft-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs sm:text-sm font-mono font-medium text-charcoal-900">
                            {formatPrice(product.price * quantity)}
                          </p>
                          {quantity > 1 && (
                            <p className="text-[10px] text-charcoal-400 font-mono">
                              {formatPrice(product.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recommendations Strip in Cart */}
            {items.length > 0 && recommendations.length > 0 && (
              <div className="pt-6 border-t border-kraft-200">
                <h4 className="text-[11px] uppercase tracking-widest font-mono text-charcoal-400 mb-3">
                  You May Also Appreciate
                </h4>
                <div className="space-y-2.5">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-2.5 bg-white border border-kraft-200/80 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-10 h-10 bg-kraft-100 shrink-0">
                          <img
                            src={rec.thumbnail}
                            alt={rec.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-serif font-medium text-charcoal-900 truncate">
                            {rec.name}
                          </p>
                          <p className="text-[11px] text-copper-600 font-mono">
                            {formatPrice(rec.price)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => addItem(rec, 1)}
                        className="text-[11px] uppercase tracking-wider font-medium px-2.5 py-1 bg-kraft-100 hover:bg-kraft-200 text-charcoal-900 border border-kraft-300 transition-colors shrink-0"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer / Summary */}
          {items.length > 0 && (
            <div 
              className="p-5 bg-white border-t border-kraft-200 space-y-4 shadow-elevated"
              style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 0px))' }}
            >
              
              {/* Coupon input */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-kraft-100 px-3 py-1.5 border border-kraft-300 text-xs">
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
                      className="px-4 py-2 bg-kraft-200 hover:bg-kraft-300 text-charcoal-800 text-xs font-medium tracking-wider uppercase transition-colors active:scale-95"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Cost breakdown */}
              <div className="space-y-1.5 text-xs text-charcoal-600 pt-2 border-t border-kraft-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Special Discount</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pan-India Shipping</span>
                  <span className="font-mono text-charcoal-900">
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-charcoal-900 pt-2 border-t border-kraft-200">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-mono text-copper-700">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-charcoal-900 active:bg-charcoal-800 hover:bg-charcoal-800 text-ivory-50 py-3.5 text-xs font-medium uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-copper-400" />
                </button>
                <div className="flex gap-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="flex-1 text-center py-2.5 text-xs text-charcoal-700 border border-kraft-300 hover:bg-kraft-100 transition-colors uppercase tracking-wider font-light"
                  >
                    View Full Cart
                  </Link>
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="flex-1 py-2.5 text-xs text-charcoal-500 hover:text-charcoal-900 transition-colors uppercase tracking-wider font-light"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-center text-charcoal-400 font-light">
                🌿 Delivered in rustic natural jute with companion sacred plant seeds.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
