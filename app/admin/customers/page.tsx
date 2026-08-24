'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, Mail, Phone, Calendar, ShoppingBag, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/customers');
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.phone && c.phone.includes(searchQuery))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kraft-200 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper-600">
            CUSTOMER RELATIONSHIPS & PATRON REGISTRY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium mt-0.5">
            Registered Customers & Devotees
          </h1>
        </div>

        <button
          onClick={fetchCustomers}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-kraft-300 text-xs font-mono text-charcoal-700 hover:text-charcoal-900 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-kraft-300 p-4 sm:p-6 shadow-subtle flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by Name, Email, or Phone..."
            className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-mono"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-kraft-300 shadow-kraft overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-charcoal-400 space-y-2">
            <Users className="w-8 h-8 mx-auto text-kraft-400" />
            <p>No customer records found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-kraft-200 bg-kraft-50/60 text-charcoal-600">
                  <th className="py-3.5 px-4">CUSTOMER</th>
                  <th className="py-3.5 px-4">CONTACT</th>
                  <th className="py-3.5 px-4">ORDERS</th>
                  <th className="py-3.5 px-4">LIFETIME VALUE</th>
                  <th className="py-3.5 px-4">JOINED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kraft-200">
                {filtered.map((cust) => (
                  <tr key={cust.id} className="hover:bg-ivory-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                      <p className="font-serif text-sm">{cust.name}</p>
                      <p className="text-[10px] text-charcoal-400 font-mono font-normal">ID: {cust.id.slice(0, 8)}</p>
                    </td>

                    <td className="py-3.5 px-4 space-y-0.5 text-charcoal-600">
                      <p className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-copper-600" />
                        <span>{cust.email}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-copper-600" />
                        <span>{cust.phone}</span>
                      </p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="bg-kraft-100 text-charcoal-800 border border-kraft-300 px-2.5 py-0.5 text-[11px] font-semibold">
                        {cust.totalOrders} {cust.totalOrders === 1 ? 'order' : 'orders'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-copper-700">
                      {formatPrice(cust.totalSpent)}
                    </td>

                    <td className="py-3.5 px-4 text-charcoal-500">
                      {new Date(cust.joinedDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
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
