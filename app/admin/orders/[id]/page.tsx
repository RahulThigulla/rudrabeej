'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  AlertCircle,
  Loader2,
  Send,
  Sparkles
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id;
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Form states for status update
  const [selectedStatus, setSelectedStatus] = useState<string>('CONFIRMED');
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [courierPartner, setCourierPartner] = useState<string>('BlueDart Insured Air');
  const [adminNotes, setAdminNotes] = useState<string>('');

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
        setSelectedStatus(data.order.orderStatus);
        setTrackingNumber(data.order.trackingNumber || '');
        setCourierPartner(data.order.courierPartner || 'BlueDart Insured Air');
        setAdminNotes(data.order.notes || '');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleUpdateStatus = async (statusOverride?: string) => {
    const statusToSet = statusOverride || selectedStatus;
    setUpdating(true);
    setMsg(null);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderStatus: statusToSet,
          trackingNumber,
          courierPartner,
          notes: adminNotes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
        setSelectedStatus(data.order.orderStatus);
        setMsg(`✓ Order status successfully updated to ${statusToSet}. Customer notified via Email & WhatsApp.`);
      } else {
        throw new Error(data.error || 'Failed to update order status');
      }
    } catch (err: any) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-xs font-mono text-charcoal-400">
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-copper-600 mb-2" />
        <span>Loading Order Dossier...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="font-serif text-lg text-charcoal-900">Order not found.</p>
        <Link href="/admin/orders" className="text-xs font-mono text-copper-700 underline">
          ← Return to Orders Directory
        </Link>
      </div>
    );
  }

  const shippingAddr = typeof order.shippingAddress === 'string' ? JSON.parse(order.shippingAddress) : order.shippingAddress;

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header & Back Link */}
      <div className="space-y-2">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-500 hover:text-charcoal-900 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kraft-200 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium">
                Order #{order.orderNumber}
              </h1>
              <span className="bg-kraft-100 text-charcoal-800 border border-kraft-300 text-xs font-mono px-2.5 py-0.5 uppercase">
                {order.orderStatus}
              </span>
            </div>
            <p className="text-xs font-mono text-charcoal-500 mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 text-xs uppercase font-mono ${
                order.paymentStatus === 'PAID'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              Payment: {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Products & Customer Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Purchased Items */}
          <div className="bg-white border border-kraft-300 p-6 shadow-subtle space-y-4">
            <h2 className="font-serif text-lg text-charcoal-900 font-medium border-b border-kraft-200 pb-3">
              Sacred Creations Ordered ({order.items?.length || 0})
            </h2>

            <div className="divide-y divide-kraft-200">
              {order.items?.map((item: any) => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-ivory-50 border border-kraft-200 overflow-hidden shrink-0">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-6 h-6 m-4 text-kraft-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-serif text-sm font-medium text-charcoal-900">{item.name}</p>
                      <p className="text-[11px] font-mono text-charcoal-400">
                        Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs font-medium text-charcoal-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-charcoal-400 font-mono">
                        {formatPrice(item.price)} each
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="pt-4 border-t border-kraft-200 text-xs space-y-2 font-mono">
              <div className="flex justify-between text-charcoal-600">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal-600">
                <span>Shipping ({order.deliveryMethod})</span>
                <span>{order.shippingAmount === 0 ? 'Complimentary' : formatPrice(order.shippingAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-charcoal-900 pt-2 border-t border-kraft-200">
                <span>Total Amount Paid</span>
                <span className="text-copper-700">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Dossier */}
          <div className="bg-white border border-kraft-300 p-6 shadow-subtle space-y-4">
            <h2 className="font-serif text-lg text-charcoal-900 font-medium border-b border-kraft-200 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-copper-600" />
              <span>Customer & Shipping Dossier</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 font-mono">
                <p className="text-[10px] text-charcoal-400 uppercase tracking-widest">Recipient</p>
                <p className="text-charcoal-900 font-serif text-sm font-medium">{order.customerName}</p>
                <p className="text-charcoal-600 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-copper-600" />
                  <span>{order.customerEmail}</span>
                </p>
                <p className="text-charcoal-600 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-copper-600" />
                  <span>{order.customerPhone}</span>
                </p>
              </div>

              <div className="space-y-1.5 font-mono">
                <p className="text-[10px] text-charcoal-400 uppercase tracking-widest">Delivery Address</p>
                <p className="text-charcoal-800 leading-relaxed">
                  {shippingAddr?.addressLine1}<br />
                  {shippingAddr?.addressLine2 && <>{shippingAddr.addressLine2}<br /></>}
                  {shippingAddr?.city}, {shippingAddr?.state} - <strong>{shippingAddr?.pincode}</strong><br />
                  {shippingAddr?.country || 'India'}
                </p>
              </div>
            </div>
          </div>

          {/* Payment & Audit Info */}
          <div className="bg-white border border-kraft-300 p-6 shadow-subtle space-y-3 text-xs font-mono">
            <h2 className="font-serif text-lg text-charcoal-900 font-medium border-b border-kraft-200 pb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-copper-600" />
              <span>Payment & Gateway Audit</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 text-charcoal-600">
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase block">Payment Method</span>
                <span className="text-charcoal-900 font-medium">{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-[10px] text-charcoal-400 uppercase block">Payment Status</span>
                <span className="text-emerald-700 font-medium">{order.paymentStatus}</span>
              </div>
              {order.razorpayOrderId && (
                <div>
                  <span className="text-[10px] text-charcoal-400 uppercase block">Razorpay Order ID</span>
                  <span className="text-charcoal-800">{order.razorpayOrderId}</span>
                </div>
              )}
              {order.razorpayPaymentId && (
                <div>
                  <span className="text-[10px] text-charcoal-400 uppercase block">Razorpay Payment ID</span>
                  <span className="text-charcoal-800">{order.razorpayPaymentId}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Order Actions & Status Stepper */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-kraft-300 p-6 shadow-kraft space-y-5 sticky top-24">
            <h3 className="font-serif text-xl text-charcoal-900 font-medium border-b border-kraft-200 pb-3">
              Fulfillment Workflow Actions
            </h3>

            {/* Quick Status Buttons */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-charcoal-600 uppercase">
                Quick Workflow Stepper:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('CONFIRMED')}
                  disabled={updating}
                  className={`py-2 px-3 border transition-colors ${
                    order.orderStatus === 'CONFIRMED'
                      ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                      : 'bg-kraft-50 hover:bg-kraft-100 border-kraft-300 text-charcoal-800'
                  }`}
                >
                  1. Confirm Order
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus('PACKED')}
                  disabled={updating}
                  className={`py-2 px-3 border transition-colors ${
                    order.orderStatus === 'PACKED'
                      ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                      : 'bg-kraft-50 hover:bg-kraft-100 border-kraft-300 text-charcoal-800'
                  }`}
                >
                  2. Mark Packed
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus('SHIPPED')}
                  disabled={updating}
                  className={`py-2 px-3 border transition-colors ${
                    order.orderStatus === 'SHIPPED'
                      ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                      : 'bg-kraft-50 hover:bg-kraft-100 border-kraft-300 text-charcoal-800'
                  }`}
                >
                  3. Mark Shipped
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus('OUT_FOR_DELIVERY')}
                  disabled={updating}
                  className={`py-2 px-3 border transition-colors ${
                    order.orderStatus === 'OUT_FOR_DELIVERY'
                      ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                      : 'bg-kraft-50 hover:bg-kraft-100 border-kraft-300 text-charcoal-800'
                  }`}
                >
                  4. Out For Delivery
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus('DELIVERED')}
                  disabled={updating}
                  className={`col-span-2 py-2 px-3 border transition-colors ${
                    order.orderStatus === 'DELIVERED'
                      ? 'bg-emerald-900 text-ivory-50 border-emerald-900 font-semibold'
                      : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900'
                  }`}
                >
                  ✓ 5. Mark Order Delivered
                </button>
              </div>
            </div>

            {/* Courier Tracking Inputs */}
            <div className="space-y-3 pt-3 border-t border-kraft-200 text-xs font-mono">
              <div>
                <label className="block text-charcoal-700 font-medium mb-1">Courier Partner</label>
                <input
                  type="text"
                  value={courierPartner}
                  onChange={(e) => setCourierPartner(e.target.value)}
                  placeholder="e.g. BlueDart Insured Air / DTDC"
                  className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-charcoal-700 font-medium mb-1">Tracking AWB Number</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. BD-892184918IN"
                  className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-charcoal-700 font-medium mb-1">Internal Admin Notes</label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Notes for sanctum dispatch team..."
                  className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none font-sans"
                />
              </div>

              <button
                type="button"
                onClick={() => handleUpdateStatus()}
                disabled={updating}
                className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 py-3 text-xs uppercase tracking-widest font-mono transition-colors flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50"
              >
                {updating ? (
                  <Loader2 className="w-4 h-4 animate-spin text-copper-400" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-copper-400" />
                    <span>Save & Notify Customer</span>
                  </>
                )}
              </button>
            </div>

            {/* Refund & Cancellation Section */}
            <div className="pt-4 border-t border-kraft-200 space-y-2 text-xs font-mono">
              <p className="text-[10px] text-charcoal-400 uppercase tracking-wider">Exceptional Actions</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('CANCELLED')}
                  disabled={updating}
                  className="flex-1 py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-[11px] transition-colors"
                >
                  Cancel Order
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('REFUNDED')}
                  disabled={updating}
                  className="flex-1 py-2 bg-white border border-red-300 text-red-700 hover:bg-red-50 text-[11px] transition-colors"
                >
                  Process Refund
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
