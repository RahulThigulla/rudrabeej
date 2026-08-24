'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Users, 
  Bell, 
  LogOut, 
  ExternalLink,
  ShieldAlert,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, render children directly without admin sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Products', href: '/admin/products', icon: Layers },
    { label: 'Inventory', href: '/admin/inventory', icon: Package },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Notifications', href: '/admin/notifications', icon: Bell, badge: unreadCount },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (e) {
      router.push('/admin/login');
    }
  };

  useEffect(() => {
    // Poll unread notifications every 30s
    const fetchNotifications = () => {
      fetch('/api/admin/notifications')
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUnreadCount(data.unreadCount || 0);
          }
        })
        .catch(() => {});
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col md:flex-row">
      
      {/* Mobile Admin Topbar */}
      <div className="md:hidden bg-charcoal-950 text-ivory-100 p-4 border-b border-charcoal-800 flex items-center justify-between sticky top-0 z-40">
        <div>
          <span className="font-serif text-lg tracking-widest uppercase text-ivory-100">RUDRABEEJ</span>
          <span className="text-[9px] font-mono text-copper-400 block tracking-widest">ADMIN PORTAL</span>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Link href="/admin/notifications" className="relative p-1.5 text-copper-400">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-mono px-1 rounded-full">
                {unreadCount}
              </span>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-ivory-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={cn(
          'w-64 bg-charcoal-950 text-ivory-200 border-r border-charcoal-800 flex flex-col justify-between shrink-0 transition-all duration-300 z-30',
          'fixed inset-y-0 left-0 md:sticky md:top-0 md:h-screen',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-charcoal-800/80">
            <Link href="/" target="_blank" className="flex items-center justify-between group">
              <div>
                <h1 className="font-serif text-xl text-ivory-100 font-medium tracking-widest uppercase">
                  RUDRABEEJ
                </h1>
                <p className="text-[10px] text-copper-400 font-mono tracking-wider mt-0.5">
                  Sanctum Admin Console
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-charcoal-500 group-hover:text-copper-400 transition-colors" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3.5 py-2.5 text-xs font-mono tracking-wider transition-all duration-200 rounded-none',
                    isActive
                      ? 'bg-charcoal-800 text-ivory-50 border-l-2 border-copper-500 font-medium'
                      : 'text-charcoal-400 hover:text-ivory-200 hover:bg-charcoal-900/60'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-copper-400' : 'text-charcoal-400')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-copper-600 text-white text-[10px] px-1.5 py-0.2 font-mono rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-charcoal-800 space-y-3">
          <div className="p-3 bg-charcoal-900/60 border border-charcoal-800/80 text-[11px] font-mono text-charcoal-400 space-y-0.5">
            <p className="text-ivory-200 truncate">admin@rudrabeej.com</p>
            <p className="text-copper-400 text-[10px]">Role: MASTER ADMIN</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono text-charcoal-400 hover:text-red-400 hover:bg-charcoal-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>

    </div>
  );
}
