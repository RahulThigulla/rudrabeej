'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  QrCode, 
  Building, 
  Banknote, 
  ArrowRight, 
  Check, 
  AlertCircle,
  Tag,
  Loader2,
  X
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, subtotal, discount, shipping, total, appliedCoupon, applyCoupon, removeCoupon, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    country: 'India',
    deliveryMethod: 'standard', // 'standard' | 'express'
    paymentMethod: 'UPI', // 'UPI' | 'CARD' | 'NETBANKING' | 'COD'
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Mock Payment Simulator Modal State
  const [mockPaymentModal, setMockPaymentModal] = useState<{
    isOpen: boolean;
    orderId: string;
    amount: number;
    currency: string;
  } | null>(null);

  // Load user session details if logged in
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setFormData((prev) => ({
            ...prev,
            fullName: prev.fullName || data.user.name || '',
            email: prev.email || data.user.email || '',
            phone: prev.phone || data.user.phone || '',
          }));
        }
      })
      .catch(() => {});
  }, []);

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 
    'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleApplyCouponCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponLoading(true);
    setCouponMsg(null);

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, subtotal }),
      });
      const data = await res.json();

      if (data.valid) {
        applyCoupon(data.code);
        setCouponMsg({ text: `✓ ${data.message} (₹${data.discountAmount} saved)`, isError: false });
        setCouponInput('');
      } else {
        setCouponMsg({ text: data.message || 'Invalid coupon code', isError: true });
      }
    } catch (err) {
      setCouponMsg({ text: 'Error applying coupon', isError: true });
    } finally {
      setCouponLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.addressLine1 || !formData.pincode) {
      setErrorMessage('Please fill in all mandatory contact and shipping fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Initialize Payment Order on Server
      const createRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          shippingAddress: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country,
          },
          deliveryMethod: formData.deliveryMethod,
          paymentMethod: formData.paymentMethod,
          couponCode: appliedCoupon,
        }),
      });

      const orderData = await createRes.json();

      if (!orderData.success) {
        throw new Error(orderData.message || orderData.error || 'Failed to initialize order.');
      }

      // Handle COD order placement immediately
      if (formData.paymentMethod === 'COD') {
        await handleVerifyAndComplete({
          razorpayOrderId: null,
          razorpayPaymentId: null,
          razorpaySignature: null,
        });
        return;
      }

      // Handle Mock Payment Mode Simulation Modal
      if (orderData.mode === 'mock') {
        setIsSubmitting(false);
        setMockPaymentModal({
          isOpen: true,
          orderId: orderData.razorpayOrderId,
          amount: orderData.amount,
          currency: orderData.currency,
        });
        return;
      }

      // Handle Real Razorpay Checkout
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your network connection.');
      }

      const options = {
        key: orderData.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'RUDRABEEJ',
        description: 'Authentic Himalayan Rudraksha Selection',
        image: '/images/rudraksha/5-mukhi-1.jpg',
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          await handleVerifyAndComplete({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#171614',
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', (resp: any) => {
        setIsSubmitting(false);
        setErrorMessage(resp.error.description || 'Payment was declined.');
      });
      razorpayInstance.open();

    } catch (err: any) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage(err.message || 'An unexpected error occurred during checkout.');
    }
  };

  const handleVerifyAndComplete = async (paymentDetails: {
    razorpayOrderId: string | null;
    razorpayPaymentId: string | null;
    razorpaySignature: string | null;
  }) => {
    setIsSubmitting(true);
    setMockPaymentModal(null);

    try {
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...paymentDetails,
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          shippingAddress: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            addressLine1: formData.addressLine1,
            addressLine2: formData.addressLine2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country,
          },
          deliveryMethod: formData.deliveryMethod,
          paymentMethod: formData.paymentMethod,
          couponCode: appliedCoupon,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        throw new Error(verifyData.message || verifyData.error || 'Payment verification failed.');
      }

      // Order saved in PostgreSQL & confirmed
      clearCart();
      setIsSubmitting(false);
      router.push(`/order-success/${verifyData.order.orderNumber}`);

    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to confirm order.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-ivory-50 min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm bg-white border border-kraft-300 p-8 shadow-kraft">
          <p className="font-serif text-lg text-charcoal-900">Your shopping bag is empty.</p>
          <Link
            href="/shop"
            className="inline-block bg-charcoal-900 text-ivory-50 px-6 py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-charcoal-800 transition-colors"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const finalTotal = formData.deliveryMethod === 'express' ? total + 150 : total;

  return (
    <div className="bg-ivory-50 min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-kraft-200 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-copper-600">RUDRABEEJ CONSECRATED CHECKOUT</span>
            <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              Secure Sacred Checkout
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-mono bg-emerald-50 px-2.5 py-1 border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted</span>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 2-Column Form & Summary */}
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Input Sections */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* 1. Contact Info */}
            <div className="bg-white border border-kraft-300 p-5 sm:p-8 space-y-4 shadow-subtle">
              <div className="flex items-center justify-between border-b border-kraft-200 pb-3">
                <h3 className="font-serif text-lg text-charcoal-900 font-medium flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-charcoal-900 text-ivory-100 text-[11px] font-mono flex items-center justify-center">1</span>
                  <span>Contact Information</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-charcoal-700 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                  />
                  <span className="text-[10px] text-charcoal-400">Order receipt & certificate sent here</span>
                </div>

                <div>
                  <label className="block text-charcoal-700 font-medium mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                  />
                  <span className="text-[10px] text-charcoal-400">For WhatsApp dispatch alert & OTP</span>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white border border-kraft-300 p-5 sm:p-8 space-y-4 shadow-subtle">
              <div className="flex items-center justify-between border-b border-kraft-200 pb-3">
                <h3 className="font-serif text-lg text-charcoal-900 font-medium flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-charcoal-900 text-ivory-100 text-[11px] font-mono flex items-center justify-center">2</span>
                  <span>Shipping Address (India)</span>
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-charcoal-700 font-medium mb-1">Full Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Radhika Sundaram"
                    className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-700 font-medium mb-1">Address Line 1 (House/Flat, Building, Street) *</label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="House / Flat No., Apartment / Building Name, Street"
                    className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-700 font-medium mb-1">Address Line 2 (Landmark, Colony / Area)</label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Nearby Landmark, Locality"
                    className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Bengaluru"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">State *</label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-serif"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">PIN Code (6 digits) *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      placeholder="560001"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white border border-kraft-300 p-5 sm:p-8 space-y-4 shadow-subtle">
              <div className="flex items-center justify-between border-b border-kraft-200 pb-3">
                <h3 className="font-serif text-lg text-charcoal-900 font-medium flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-charcoal-900 text-ivory-100 text-[11px] font-mono flex items-center justify-center">3</span>
                  <span>Air Dispatch Speed</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-4 border border-kraft-300 bg-ivory-50/50 cursor-pointer transition-colors hover:bg-kraft-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="standard"
                      checked={formData.deliveryMethod === 'standard'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                      className="w-4 h-4 text-copper-600 focus:ring-copper-500"
                    />
                    <div>
                      <span className="font-serif font-medium text-charcoal-900 block">
                        Standard Pan-India Insured Dispatch (3–5 business days)
                      </span>
                      <span className="text-[11px] text-charcoal-500 font-light">
                        Handled via BlueDart / DTDC Air with tracking
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-charcoal-800">
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </label>

                <label className="flex items-center justify-between p-4 border border-kraft-300 bg-ivory-50/50 cursor-pointer transition-colors hover:bg-kraft-50">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="express"
                      checked={formData.deliveryMethod === 'express'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                      className="w-4 h-4 text-copper-600 focus:ring-copper-500"
                    />
                    <div>
                      <span className="font-serif font-medium text-charcoal-900 block">
                        Priority Express Air Dispatch (1–2 business days)
                      </span>
                      <span className="text-[11px] text-charcoal-500 font-light">
                        Guaranteed next-flight courier allocation
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-charcoal-800">
                    +₹150
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Options */}
            <div className="bg-white border border-kraft-300 p-5 sm:p-8 space-y-4 shadow-subtle">
              <div className="flex items-center justify-between border-b border-kraft-200 pb-3">
                <h3 className="font-serif text-lg text-charcoal-900 font-medium flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-charcoal-900 text-ivory-100 text-[11px] font-mono flex items-center justify-center">4</span>
                  <span>Payment Gateway</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* UPI Option */}
                <div className="border border-kraft-300 p-4 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={formData.paymentMethod === 'UPI'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'UPI' })}
                        className="w-4 h-4 text-copper-600"
                      />
                      <span className="font-serif font-medium text-charcoal-900 flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-copper-600" />
                        <span>Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                      Zero Surcharge
                    </span>
                  </label>
                </div>

                {/* Credit/Debit Cards */}
                <div className="border border-kraft-300 p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CARD"
                      checked={formData.paymentMethod === 'CARD'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'CARD' })}
                      className="w-4 h-4 text-copper-600"
                    />
                    <span className="font-serif font-medium text-charcoal-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-copper-600" />
                      <span>Credit / Debit Card (Visa, Mastercard, RuPay, Amex)</span>
                    </span>
                  </label>
                </div>

                {/* Net Banking */}
                <div className="border border-kraft-300 p-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="NETBANKING"
                      checked={formData.paymentMethod === 'NETBANKING'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'NETBANKING' })}
                      className="w-4 h-4 text-copper-600"
                    />
                    <span className="font-serif font-medium text-charcoal-900 flex items-center gap-2">
                      <Building className="w-4 h-4 text-copper-600" />
                      <span>Net Banking (All Indian Banks)</span>
                    </span>
                  </label>
                </div>

                {/* Cash on Delivery */}
                <div className="border border-kraft-300 p-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={formData.paymentMethod === 'COD'}
                        onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                        className="w-4 h-4 text-copper-600"
                      />
                      <span className="font-serif font-medium text-charcoal-900 flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-copper-600" />
                        <span>Cash on Delivery (COD)</span>
                      </span>
                    </div>
                    <span className="text-[10px] text-charcoal-500 font-mono">Available Pan-India</span>
                  </label>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Place Order Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-kraft-300 p-5 sm:p-8 space-y-6 shadow-kraft sticky top-24">
              <h3 className="font-serif text-xl text-charcoal-900 font-medium pb-4 border-b border-kraft-200">
                Order Review ({items.length} items)
              </h3>

              {/* Items summary thumbnail list */}
              <div className="divide-y divide-kraft-200 max-h-60 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-ivory-50 border border-kraft-200 overflow-hidden shrink-0">
                        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-serif font-medium text-charcoal-900 truncate max-w-[160px]">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-charcoal-400 font-mono">Qty: {quantity} • {product.size}</p>
                      </div>
                    </div>
                    <span className="font-mono font-medium text-charcoal-900">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo code box */}
              <div className="pt-2 border-t border-kraft-200">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-kraft-100 px-3 py-2 border border-kraft-300 text-xs">
                    <span className="flex items-center gap-1.5 font-mono text-charcoal-800">
                      <Tag className="w-3.5 h-3.5 text-copper-600" />
                      <span>Code <strong>{appliedCoupon}</strong> Applied</span>
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[11px] text-charcoal-500 hover:text-charcoal-900 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo code (e.g. ROOTED10)"
                        className="flex-1 bg-ivory-50 border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCouponCode}
                        disabled={couponLoading}
                        className="px-4 py-2 bg-kraft-200 hover:bg-kraft-300 text-charcoal-900 text-xs font-medium uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        {couponLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Apply'}
                      </button>
                    </div>
                    {couponMsg && (
                      <p className={`text-[11px] ${couponMsg.isError ? 'text-red-600' : 'text-emerald-700 font-medium'}`}>
                        {couponMsg.text}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-charcoal-600 pt-3 border-t border-kraft-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-charcoal-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="font-mono text-charcoal-900">
                    {formData.deliveryMethod === 'express' ? '+₹150 (Express)' : (shipping === 0 ? 'Complimentary' : formatPrice(shipping))}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-charcoal-900 pt-3 border-t border-kraft-200">
                  <span className="font-serif">Total Payable</span>
                  <span className="font-mono text-copper-700">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 py-4 text-xs font-medium uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-elevated disabled:opacity-70 active:scale-95"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-copper-400" />
                    <span>Verifying & Placing Order...</span>
                  </div>
                ) : (
                  <>
                    <span>{formData.paymentMethod === 'COD' ? 'Confirm Cash on Delivery Order' : 'Authorize & Pay Securely'}</span>
                    <ArrowRight className="w-4 h-4 text-copper-400" />
                  </>
                )}
              </button>

              <div className="pt-2 text-[10px] text-charcoal-400 space-y-1 text-center font-light">
                <p>🌿 Packaged in signature unbleached second-life kraft cases.</p>
                <p>🛡️ 100% Botanical Authenticity & Consecration Guarantee.</p>
              </div>

            </div>
          </div>

        </form>

      </div>

      {/* Mock Payment Simulation Modal for Development Testing */}
      {mockPaymentModal && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-kraft-300 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-kraft-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <h3 className="font-serif text-lg font-medium text-charcoal-900">
                  Rudrabeej Payment Simulator
                </h3>
              </div>
              <button
                onClick={() => setMockPaymentModal(null)}
                className="text-charcoal-400 hover:text-charcoal-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-kraft-50 border border-kraft-200 text-xs space-y-1.5 font-mono">
              <p className="text-charcoal-600">Mode: <strong className="text-copper-700 uppercase">MOCK DEV ENVIRONMENT</strong></p>
              <p className="text-charcoal-600">Order Ref: {mockPaymentModal.orderId}</p>
              <p className="text-charcoal-900 text-sm font-semibold">
                Amount Payable: {formatPrice(mockPaymentModal.amount / 100)}
              </p>
            </div>

            <p className="text-xs text-charcoal-500 leading-relaxed font-light">
              Since <code>PAYMENT_MODE=mock</code> is active, you can test both successful order placement and failure handling without entering real payment cards.
            </p>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() =>
                  handleVerifyAndComplete({
                    razorpayOrderId: mockPaymentModal.orderId,
                    razorpayPaymentId: `pay_mock_${Date.now()}`,
                    razorpaySignature: 'mock_signature_valid',
                  })
                }
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-ivory-50 py-3 text-xs font-medium uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Simulate Payment Success (Confirm Order)</span>
              </button>

              <button
                onClick={() => {
                  setMockPaymentModal(null);
                  setErrorMessage('Payment simulation failed: Insufficient bank balance or user cancellation.');
                }}
                className="w-full bg-kraft-200 hover:bg-kraft-300 text-charcoal-800 py-3 text-xs font-medium uppercase tracking-widest transition-colors"
              >
                Simulate Payment Failure
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
