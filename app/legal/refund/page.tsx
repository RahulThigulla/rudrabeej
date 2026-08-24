import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return & Refund Policy | RUDRABEEJ Heritage Crafts',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-charcoal-700 text-xs sm:text-sm font-light leading-relaxed">
        <div className="border-b border-kraft-200 pb-4">
          <span className="font-mono text-xs uppercase text-copper-600 tracking-widest">Customer Assurance</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mt-1">Return & Refund Policy</h1>
          <p className="text-xs text-charcoal-400 font-mono mt-1">Updated: January 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">1. 7-Day Sanctum Inspection Period</h2>
          <p>
            We take immense pride in our botanical authenticity and craftsmanship. If your Rudraksha arrives damaged, broken in transit, or structurally defective, you may initiate a replacement or return request within 7 calendar days of receipt.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">2. Return Eligibility Criteria</h2>
          <p>
            - The bead or mala must be in its original, unworn condition with our botanical authenticity card intact. <br />
            - The original unbleached kraft second-life presentation box and accessories must be enclosed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">3. Swift Refund Process</h2>
          <p>
            Once our verification team inspects the returned parcel, refunds are processed within 24 to 48 hours directly to your original payment method (Bank Account, UPI, or Card).
          </p>
        </section>
      </div>
    </div>
  );
}
