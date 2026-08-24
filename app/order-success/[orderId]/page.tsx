'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Truck, Sparkles, MapPin, Calendar, Compass } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function OrderSuccessPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`rudrabeej_order_${params.orderId}`) || localStorage.getItem('rudrabeej_latest_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, [params.orderId]);

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Success Header Card */}
        <div className="bg-white border border-kraft-300 p-8 sm:p-12 text-center space-y-4 shadow-kraft">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 stroke-[1.5]" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
              Order Confirmed & Sanctified
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
              Your order is on its way.
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 font-light max-w-md mx-auto">
              Namaste. Your authentic Himalayan creation is being carefully conditioned and prepared for dispatch.
            </p>
          </div>

          <div className="pt-2 inline-flex items-center gap-2 bg-kraft-100 px-4 py-2 text-xs font-mono text-charcoal-900 border border-kraft-300">
            <span>Order Number:</span>
            <strong>{params.orderId}</strong>
          </div>
        </div>

        {/* Second Life Packaging Reminder Banner */}
        <div className="bg-charcoal-900 text-ivory-100 p-6 sm:p-8 border border-charcoal-800 flex items-start gap-4 shadow-elevated">
          <div className="w-10 h-10 rounded-full bg-charcoal-800 border border-kraft-500/40 flex items-center justify-center text-copper-400 shrink-0 mt-0.5">
            <Package className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-base font-medium text-ivory-50">
              "Your packaging is designed to be reused."
            </h3>
            <p className="text-xs text-charcoal-300 font-light leading-relaxed">
              When your parcel arrives, do not discard the box. Invert the modular inner tray to transform the casing into a freestanding desktop altar pedestal or keepsake box for your living space.
            </p>
            <Link
              href="/packaging"
              className="inline-block pt-1 text-xs text-kraft-300 hover:text-white underline font-mono"
            >
              Plant Your Seeds Guide →
            </Link>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        {order && (
          <div className="bg-white border border-kraft-300 p-6 sm:p-8 space-y-6 shadow-subtle text-xs">
            <h3 className="font-serif text-lg font-medium text-charcoal-900 pb-3 border-b border-kraft-200">
              Order Details
            </h3>

            {/* Items */}
            <div className="divide-y divide-kraft-200">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.thumbnail} alt={item.name} className="w-12 h-12 object-cover border border-kraft-200" />
                    <div>
                      <p className="font-serif text-sm font-medium text-charcoal-900">{item.name}</p>
                      <p className="text-[11px] text-charcoal-400 font-mono">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-charcoal-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery address & Estimation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-kraft-200">
              <div className="space-y-1">
                <span className="font-mono uppercase text-[10px] text-charcoal-400 block">Shipping Destination</span>
                <p className="font-medium text-charcoal-800">{order.shippingAddress?.fullName}</p>
                <p className="text-charcoal-500 font-light">
                  {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}, {order.shippingAddress?.state} – {order.shippingAddress?.pincode}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono uppercase text-[10px] text-charcoal-400 block">Estimated Arrival</span>
                <p className="font-medium text-charcoal-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-copper-600" />
                  <span>{order.estimatedDelivery} (3–5 Business Days)</span>
                </p>
                <p className="text-charcoal-500 font-light">Courier Tracking: {order.trackingNumber}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-kraft-200 text-sm font-medium text-charcoal-900">
              <span className="font-serif">Total Paid</span>
              <span className="font-mono text-copper-700">{formatPrice(order.total)}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/track-order?id=${params.orderId}`}
            className="w-full sm:w-auto bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors text-center"
          >
            Track Order Status
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto border border-kraft-300 hover:bg-kraft-100 text-charcoal-800 px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}
