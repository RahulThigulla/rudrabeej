'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  ShoppingBag, 
  AlertTriangle, 
  DollarSign, 
  Star, 
  MessageSquare,
  ArrowRight,
  RefreshCw 
} from 'lucide-react';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/notifications');
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (e) {}
  };

  const handleMarkAllAsRead = async () => {
    try {
      await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (e) {}
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'NEW_ORDER':
        return <ShoppingBag className="w-4 h-4 text-copper-600" />;
      case 'PAYMENT_RECEIVED':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'LOW_STOCK':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'REVIEW_SUBMITTED':
        return <Star className="w-4 h-4 text-amber-600" />;
      case 'BULK_ENQUIRY':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-charcoal-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kraft-200 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper-600">
            AUDIT LOG & SANCTUM NOTIFICATIONS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium mt-0.5">
            Admin Notification Center
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-charcoal-900 text-ivory-50 text-xs font-mono uppercase tracking-wider hover:bg-charcoal-800 transition-colors shadow-xs"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Read</span>
            </button>
          )}

          <button
            onClick={fetchNotifications}
            className="p-2 bg-white border border-kraft-300 text-charcoal-700 hover:text-charcoal-900 shadow-xs"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-kraft-300 shadow-kraft divide-y divide-kraft-200">
        {notifications.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-charcoal-400 space-y-2">
            <Bell className="w-8 h-8 mx-auto text-kraft-400 stroke-[1.5]" />
            <p>No notifications logged yet.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
                !n.isRead ? 'bg-kraft-50/70' : 'bg-white hover:bg-ivory-50/50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 bg-white border border-kraft-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {getNotificationIcon(n.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-sm font-medium text-charcoal-900">
                      {n.title}
                    </h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-copper-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                    {n.message}
                  </p>
                  <p className="text-[10px] font-mono text-charcoal-400">
                    {new Date(n.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {n.link && (
                  <Link
                    href={n.link}
                    className="p-1.5 text-xs text-copper-700 hover:text-copper-900 font-mono flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    className="p-1.5 text-charcoal-400 hover:text-charcoal-800 transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
