'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, ArrowLeft, ArrowRight, Truck, RefreshCw, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders || []);
        } else {
          // Fallback to local storage
          const saved = localStorage.getItem('rudrabeej_latest_order');
          if (saved) {
            setOrders([JSON.parse(saved)]);
          }
        }
      })
      .catch(() => {
        const saved = localStorage.getItem('rudrabeej_latest_order');
        if (saved) {
          setOrders([JSON.parse(saved)]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-500 hover:text-charcoal-900 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account</span>
          </Link>
          <div className="border-b border-kraft-200 pb-4">
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium">
              My Sacred Orders History
            </h1>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-charcoal-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-copper-600 mb-2" />
            <span>Retrieving your order records...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white border border-kraft-300 p-12 text-center shadow-subtle space-y-4">
            <Package className="w-10 h-10 mx-auto text-kraft-400 stroke-[1.5]" />
            <p className="font-serif text-base text-charcoal-800">You have no recorded acquisitions yet.</p>
            <Link
              href="/shop"
              className="inline-block bg-charcoal-900 text-ivory-50 px-6 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-kraft-300 p-6 shadow-subtle space-y-4 transition-all hover:border-kraft-400"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-kraft-200 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-charcoal-400">ORDER NUMBER: </span>
                    <strong className="text-charcoal-900 text-sm font-semibold">{order.orderNumber}</strong>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-kraft-100 text-charcoal-800 border border-kraft-300 px-2 py-0.5 uppercase text-[10px]">
                      {order.orderStatus}
                    </span>
                    <span className="text-charcoal-400">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-kraft-100">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-ivory-50 border border-kraft-200 overflow-hidden shrink-0">
                          {item.thumbnail && (
                            <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-serif font-medium text-charcoal-900">{item.name}</p>
                          <p className="text-[11px] text-charcoal-400 font-mono">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono text-charcoal-900 font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-kraft-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="font-mono">
                    <span className="text-charcoal-500">Total Paid: </span>
                    <strong className="text-copper-700 text-sm">{formatPrice(order.totalAmount || order.total)}</strong>
                  </div>

                  <Link
                    href={`/track-order?id=${order.orderNumber}`}
                    className="inline-flex items-center gap-1 text-copper-700 hover:text-copper-900 font-mono font-medium"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Live Delivery →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
