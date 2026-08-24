import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | RUDRABEEJ Heritage Crafts',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-charcoal-700 text-xs sm:text-sm font-light leading-relaxed">
        <div className="border-b border-kraft-200 pb-4">
          <span className="font-mono text-xs uppercase text-copper-600 tracking-widest">Fulfillment Policy</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mt-1">Shipping & Delivery</h1>
          <p className="text-xs text-charcoal-400 font-mono mt-1">Updated: January 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">1. Dispatch Timelines</h2>
          <p>
            All authenticated beads, malas, and gift boxes are dispatched within 24 to 48 business hours from our fulfillment sanctums after final conditioning and inspection.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">2. Pan-India Delivery Estimates</h2>
          <p>
            - Metro Cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata): 2 to 4 business days. <br />
            - Tier 2 & Tier 3 Regional Destinations: 4 to 6 business days. <br />
            - Priority Express Air: 1 to 2 business days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">3. Complimentary Shipping Threshold</h2>
          <p>
            All domestic orders with a net subtotal of ₹999 and above qualify for 100% complimentary standard insured air shipping.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">4. Transit Insurance & Tracking</h2>
          <p>
            Every shipment is 100% insured against loss in transit. Real-time SMS and WhatsApp tracking links are dispatched the moment your parcel is scanned by our logistics partners.
          </p>
        </section>
      </div>
    </div>
  );
}
