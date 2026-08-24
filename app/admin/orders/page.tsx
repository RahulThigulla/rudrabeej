'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Eye, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = `/api/admin/orders?status=${activeFilter}&search=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders();
  };

  const statusTabs = [
    { label: 'All Orders', value: 'ALL' },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Confirmed', value: 'CONFIRMED' },
    { label: 'Packed', value: 'PACKED' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' },
    { label: 'Cancelled', value: 'CANCELLED' },
    { label: 'Refunded', value: 'REFUNDED' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kraft-200 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper-600">
            DISPATCH & FULFILLMENT SANCTUM
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium mt-0.5">
            Customer Orders Directory
          </h1>
        </div>

        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-kraft-300 text-xs font-mono text-charcoal-700 hover:text-charcoal-900 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white border border-kraft-300 p-4 sm:p-6 shadow-subtle space-y-4">
        {/* Horizontal Status Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-3.5 py-1.5 text-xs font-mono whitespace-nowrap border transition-all ${
                activeFilter === tab.value
                  ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900 shadow-xs'
                  : 'bg-white text-charcoal-700 border-kraft-200 hover:border-kraft-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order # (RB-2026-000001), Customer Name, Email, or Phone..."
              className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5 text-copper-400" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-kraft-300 shadow-kraft overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-charcoal-400 space-y-2">
            <ShoppingBag className="w-8 h-8 mx-auto text-kraft-400" />
            <p>No orders found matching your selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-kraft-200 bg-kraft-50/60 text-charcoal-600">
                  <th className="py-3.5 px-4">ORDER NUMBER</th>
                  <th className="py-3.5 px-4">CUSTOMER</th>
                  <th className="py-3.5 px-4">ITEMS</th>
                  <th className="py-3.5 px-4">DATE</th>
                  <th className="py-3.5 px-4">TOTAL</th>
                  <th className="py-3.5 px-4">PAYMENT</th>
                  <th className="py-3.5 px-4">ORDER STATUS</th>
                  <th className="py-3.5 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kraft-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-ivory-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-serif font-medium text-charcoal-900">{order.customerName}</p>
                      <p className="text-[10px] text-charcoal-400">{order.customerPhone}</p>
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-700">
                      {order.items?.length || 1} {order.items?.length === 1 ? 'bead' : 'items'}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-charcoal-900">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] uppercase font-mono ${
                          order.paymentStatus === 'PAID'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-mono bg-kraft-100 text-charcoal-800 border border-kraft-300">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
