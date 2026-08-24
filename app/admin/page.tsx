'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  ArrowRight,
  RefreshCw,
  Eye,
  DollarSign
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
        setRecentOrders(data.recentOrders || []);
        setLastRefreshed(new Date());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000); // 10s auto-polling
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'TOTAL SALES',
      value: stats ? formatPrice(stats.totalSales) : '₹0',
      icon: DollarSign,
      color: 'text-copper-700',
      bg: 'bg-copper-50/60',
    },
    {
      title: "TODAY'S SALES",
      value: stats ? formatPrice(stats.todaysSales) : '₹0',
      icon: TrendingUp,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50/60',
    },
    {
      title: 'TOTAL ORDERS',
      value: stats ? stats.totalOrders : '0',
      icon: ShoppingBag,
      color: 'text-charcoal-900',
      bg: 'bg-kraft-100/60',
    },
    {
      title: 'PENDING ACTION',
      value: stats ? stats.pendingOrders : '0',
      icon: Clock,
      color: 'text-amber-700',
      bg: 'bg-amber-50/60',
    },
    {
      title: 'PAID ORDERS',
      value: stats ? stats.paidOrders : '0',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50/60',
    },
    {
      title: 'LOW STOCK (< 5)',
      value: stats ? stats.lowStockCount : '0',
      icon: AlertTriangle,
      color: stats?.lowStockCount > 0 ? 'text-red-700 font-bold' : 'text-charcoal-700',
      bg: stats?.lowStockCount > 0 ? 'bg-red-50' : 'bg-kraft-100/60',
      link: '/admin/inventory',
    },
    {
      title: 'REGISTERED CUSTOMERS',
      value: stats ? stats.customerCount : '0',
      icon: Users,
      color: 'text-charcoal-800',
      bg: 'bg-ivory-100',
      link: '/admin/customers',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kraft-200 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper-600">
            SANCTUM MANAGEMENT • LIVE FEED
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium mt-0.5">
            Admin Overview Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-charcoal-500">
            Auto-refreshed: {lastRefreshed.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchDashboardData}
            className="p-2 bg-white border border-kraft-300 text-charcoal-700 hover:text-charcoal-900 transition-colors shadow-xs"
            title="Refresh dashboard"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          const CardWrapper = card.link ? Link : 'div';
          return (
            <CardWrapper
              key={idx}
              href={card.link || '#'}
              className={`bg-white border border-kraft-300 p-5 sm:p-6 shadow-subtle flex flex-col justify-between transition-all duration-200 ${
                card.link ? 'hover:border-copper-600 hover:shadow-kraft cursor-pointer' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-charcoal-500 uppercase">
                  {card.title}
                </span>
                <div className={`w-8 h-8 rounded-none ${card.bg} flex items-center justify-center ${card.color}`}>
                  <Icon className="w-4 h-4 stroke-[1.75]" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`font-serif text-2xl sm:text-3xl font-medium ${card.color}`}>
                  {card.value}
                </span>
              </div>
            </CardWrapper>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white border border-kraft-300 shadow-kraft p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-kraft-200 pb-4">
          <div>
            <h2 className="font-serif text-lg sm:text-xl text-charcoal-900 font-medium">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-charcoal-500 font-light mt-0.5">
              Live orders requiring packing, air courier dispatch, and fulfillment tracking.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-mono text-copper-700 hover:text-copper-900 flex items-center gap-1 uppercase tracking-wider font-medium"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-charcoal-400">
            No orders placed yet. Test the checkout flow on storefront to generate your first order!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-kraft-200 bg-kraft-50/60 text-charcoal-600">
                  <th className="py-3 px-4">ORDER REF</th>
                  <th className="py-3 px-4">CUSTOMER</th>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4">AMOUNT</th>
                  <th className="py-3 px-4">PAYMENT</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kraft-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-ivory-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-charcoal-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-serif font-medium text-charcoal-900">{order.customerName}</p>
                      <p className="text-[10px] text-charcoal-400">{order.customerPhone}</p>
                    </td>
                    <td className="py-3 px-4 text-charcoal-500">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-4 font-medium text-charcoal-900">
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td className="py-3 px-4">
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
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-mono bg-kraft-100 text-charcoal-800 border border-kraft-300">
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
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
