'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Package, MapPin, Heart, Shield, LogOut, ArrowRight, Bell } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';

export default function AccountPage() {
  const { wishlistCount } = useWishlist();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [recentOrder, setRecentOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});

    // Fetch user recent orders
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.orders && data.orders.length > 0) {
          setRecentOrder(data.orders[0]);
        } else {
          const saved = localStorage.getItem('rudrabeej_latest_order');
          if (saved) setRecentOrder(JSON.parse(saved));
        }
      })
      .catch(() => {
        const saved = localStorage.getItem('rudrabeej_latest_order');
        if (saved) setRecentOrder(JSON.parse(saved));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/account/login');
    } catch (e) {
      router.push('/account/login');
    }
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Account Header */}
        <div className="border-b border-kraft-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-charcoal-900 text-ivory-100 rounded-full flex items-center justify-center font-serif text-xl border border-kraft-300">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                Namaste, {user?.name || 'Devotee'}
              </h1>
              <p className="text-xs text-charcoal-400 font-mono">
                {user?.email || 'Rudrabeej Heritage Circle Patron'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/account/orders"
              className="px-4 py-2 bg-white border border-kraft-300 text-xs font-mono text-charcoal-800 hover:bg-kraft-50 transition-colors"
            >
              My Orders
            </Link>
            <Link
              href="/wishlist"
              className="px-4 py-2 bg-white border border-kraft-300 text-xs font-mono text-charcoal-800 hover:bg-kraft-50 transition-colors"
            >
              Wishlist ({wishlistCount})
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="p-2 text-charcoal-500 hover:text-charcoal-900"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 2-Column: Navigation / Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Summary Cards */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Orders Section */}
            <div className="bg-white border border-kraft-300 p-6 sm:p-8 space-y-6 shadow-subtle">
              <div className="flex items-center justify-between border-b border-kraft-200 pb-3">
                <h3 className="font-serif text-lg text-charcoal-900 font-medium flex items-center gap-2">
                  <Package className="w-4 h-4 text-copper-600" />
                  <span>Latest Sacred Acquisition</span>
                </h3>
                <Link href="/account/orders" className="text-xs font-mono text-copper-700 hover:underline">
                  View All Orders →
                </Link>
              </div>

              {recentOrder ? (
                <div className="border border-kraft-200 p-4 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span>Order: <strong>{recentOrder.orderNumber}</strong></span>
                    <span className="bg-kraft-100 text-charcoal-800 border border-kraft-300 px-2 py-0.5 uppercase text-[10px]">
                      {recentOrder.orderStatus || recentOrder.status}
                    </span>
                  </div>

                  <div className="divide-y divide-kraft-100">
                    {recentOrder.items?.map((item: any, i: number) => (
                      <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          {item.thumbnail && (
                            <img src={item.thumbnail} alt={item.name} className="w-10 h-10 object-cover border border-kraft-200" />
                          )}
                          <span className="font-serif font-medium text-charcoal-900">{item.name}</span>
                        </div>
                        <span className="font-mono text-charcoal-800">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-kraft-200 flex items-center justify-between text-xs">
                    <span className="text-charcoal-500 font-mono">Total: {formatPrice(recentOrder.totalAmount || recentOrder.total)}</span>
                    <Link
                      href={`/track-order?id=${recentOrder.orderNumber}`}
                      className="text-copper-600 hover:underline font-mono"
                    >
                      Track Shipment →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <p className="text-xs text-charcoal-500 font-light">No past orders found in session.</p>
                  <Link
                    href="/shop"
                    className="inline-block pt-1 text-xs text-copper-600 font-mono underline"
                  >
                    Start your first acquisition →
                  </Link>
                </div>
              )}
            </div>

            {/* Default Address & Auth Links */}
            <div className="bg-white border border-kraft-300 p-6 sm:p-8 space-y-4 shadow-subtle">
              <h3 className="font-serif text-lg text-charcoal-900 font-medium flex items-center gap-2 border-b border-kraft-200 pb-3">
                <MapPin className="w-4 h-4 text-copper-600" />
                <span>Account Status & Profile</span>
              </h3>
              <div className="text-xs text-charcoal-600 font-mono space-y-2">
                <p>Status: <strong className="text-emerald-800">{user ? 'AUTHENTICATED PATRON' : 'GUEST SESSION'}</strong></p>
                {!user && (
                  <div className="pt-2">
                    <Link
                      href="/account/login"
                      className="inline-block bg-charcoal-900 text-ivory-50 px-5 py-2 text-xs uppercase tracking-wider font-mono hover:bg-charcoal-800 transition-colors shadow-xs"
                    >
                      Sign In / Register Account
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Lifetime Guarantee & Second Life Tips */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-charcoal-900 text-ivory-100 p-6 sm:p-8 space-y-4 shadow-elevated">
              <span className="text-[10px] font-mono uppercase tracking-widest text-kraft-400">
                The Heritage Guarantee
              </span>
              <h4 className="font-serif text-lg text-ivory-50 font-medium">
                Lifetime Botanical Authenticity
              </h4>
              <p className="text-xs text-charcoal-300 font-light leading-relaxed">
                All Rudraksha beads purchased through Rudrabeej are backed by our sacred botanical purity guarantee and laboratory X-ray imaging.
              </p>
              <Link
                href="/authenticity"
                className="inline-block text-xs text-kraft-300 hover:text-white underline font-mono"
              >
                View Authenticity Protocols →
              </Link>
            </div>

            <div className="bg-white border border-kraft-300 p-6 space-y-3 shadow-subtle">
              <h4 className="font-serif text-base text-charcoal-900 font-medium">
                Second-Life Packaging Tips
              </h4>
              <p className="text-xs text-charcoal-500 font-light leading-relaxed">
                Have you transformed your kraft presentation casing into a desktop altar? Explore creative display ideas.
              </p>
              <Link
                href="/packaging"
                className="inline-block text-xs text-copper-600 hover:underline font-mono"
              >
                Explore Packaging Story →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
