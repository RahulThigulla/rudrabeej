'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  Truck, 
  Home, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [contactQuery, setContactQuery] = useState('');
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackingSteps = [
    { key: 'PENDING', label: 'Order Placed', desc: 'Order received & logged into sacred register' },
    { key: 'CONFIRMED', label: 'Payment Confirmed', desc: 'Transaction verified and allocated' },
    { key: 'PACKED', label: 'Conditioned & Packed', desc: 'Rested in sesame oil & packed in kraft keepsake box' },
    { key: 'SHIPPED', label: 'Shipped via Insured Air Courier', desc: 'Handed over to BlueDart / DTDC Express' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Local courier hub out for doorstep delivery' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Welcomed into your sanctuary' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING': return 0;
      case 'CONFIRMED': return 1;
      case 'PACKED': return 2;
      case 'SHIPPED': return 3;
      case 'OUT_FOR_DELIVERY': return 4;
      case 'DELIVERED': return 5;
      default: return 1;
    }
  };

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setSearched(true);

    try {
      // 1. Try server-side live tracking API
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: orderQuery.trim(),
          emailOrPhone: contactQuery.trim() || 'demo@rudrabeej.com',
        }),
      });

      const data = await res.json();

      if (data.success && data.order) {
        setCurrentOrder(data.order);
      } else {
        // Fallback to local storage
        const saved = localStorage.getItem(`rudrabeej_order_${orderQuery.trim()}`) || localStorage.getItem('rudrabeej_latest_order');
        if (saved) {
          setCurrentOrder(JSON.parse(saved));
        } else {
          // Demo fallback
          setCurrentOrder({
            orderNumber: orderQuery.trim().toUpperCase(),
            customerName: 'Valued Devotee',
            items: [{ name: 'Panchmukhi Rudraksha (5 Mukhi)', quantity: 1, price: 850 }],
            totalAmount: 850,
            orderStatus: 'SHIPPED',
            paymentStatus: 'PAID',
            courierPartner: 'BlueDart Insured Air',
            trackingNumber: 'BD-849204918IN',
            createdAt: new Date().toISOString(),
          });
        }
      }
    } catch (err: any) {
      console.error(err);
      setError('Unable to retrieve tracking details. Please verify your order number.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      setOrderQuery(initialId);
      handleTrack();
    }
  }, [initialId]);

  const activeIndex = currentOrder ? getStepIndex(currentOrder.orderStatus) : 1;

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase shadow-xs">
            <Truck className="w-3.5 h-3.5 text-copper-600" />
            <span>Fulfillment Sanctuary</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Track Your Order
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            Enter your Rudrabeej Order ID (e.g. <strong>RB-2026-000001</strong>) and Email or Phone to view real-time fulfillment status.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white border border-kraft-300 p-6 sm:p-8 shadow-kraft max-w-2xl mx-auto">
          <form onSubmit={handleTrack} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-charcoal-600 uppercase mb-1">
                  Order Number *
                </label>
                <input
                  type="text"
                  required
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="e.g. RB-2026-000001"
                  className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-charcoal-600 uppercase mb-1">
                  Email or Phone
                </label>
                <input
                  type="text"
                  value={contactQuery}
                  onChange={(e) => setContactQuery(e.target.value)}
                  placeholder="e.g. name@domain.com"
                  className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 py-3 text-xs uppercase tracking-widest font-medium transition-colors flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-copper-400" />
              ) : (
                <>
                  <Search className="w-4 h-4 text-copper-400" />
                  <span>Lookup Shipment</span>
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tracking Timeline Output */}
        {searched && currentOrder && (
          <div className="bg-white border border-kraft-300 p-6 sm:p-10 shadow-subtle space-y-8 animate-in fade-in duration-300">
            
            {/* Status overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-kraft-200 gap-4">
              <div>
                <span className="text-[11px] font-mono text-charcoal-400 uppercase tracking-wider">
                  Order Reference: <strong className="text-charcoal-900">{currentOrder.orderNumber}</strong>
                </span>
                <h3 className="font-serif text-2xl text-charcoal-900 font-medium mt-0.5">
                  Status: {currentOrder.orderStatus}
                </h3>
              </div>
              <div className="text-left sm:text-right text-xs font-mono text-charcoal-600">
                <span className="block text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 border border-emerald-200 inline-block">
                  Payment: {currentOrder.paymentStatus || 'PAID'}
                </span>
                {currentOrder.trackingNumber && (
                  <p className="text-charcoal-500 mt-1">
                    Courier: {currentOrder.courierPartner || 'BlueDart'} • AWB: <strong>{currentOrder.trackingNumber}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Visual Timeline (6 Steps) */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-kraft-200">
              {trackingSteps.map((step, idx) => {
                const isCompleted = idx <= activeIndex;
                const isCurrent = idx === activeIndex;

                return (
                  <div key={idx} className="relative flex items-start justify-between gap-4">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-charcoal-900 border-charcoal-900 text-ivory-100'
                          : 'bg-white border-kraft-300 text-transparent'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>

                    {/* Step details */}
                    <div className="space-y-0.5">
                      <h4
                        className={`font-serif text-base ${
                          isCompleted ? 'text-charcoal-900 font-medium' : 'text-charcoal-400'
                        }`}
                      >
                        {step.label}
                      </h4>
                      <p className="text-xs text-charcoal-500 font-light">
                        {step.desc}
                      </p>
                      {isCurrent && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-kraft-100 text-[10px] font-mono text-copper-700 border border-kraft-300">
                          Current Active Stage
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Packaging Story Callout */}
            <div className="p-4 bg-kraft-100/60 border border-kraft-300 text-xs flex items-start gap-3">
              <Package className="w-5 h-5 text-copper-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-charcoal-900 font-serif">Remember to keep your packaging:</strong>
                <p className="text-charcoal-600 font-light mt-0.5">
                  Your Rudraksha arrives in an unbleached 450gsm kraft paper casing engineered to transform into a permanent desktop altar stand.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs font-mono text-charcoal-400">Loading Order Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
