import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | RUDRABEEJ Heritage Crafts',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-charcoal-700 text-xs sm:text-sm font-light leading-relaxed">
        <div className="border-b border-kraft-200 pb-4">
          <span className="font-mono text-xs uppercase text-copper-600 tracking-widest">Legal Document</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mt-1">Privacy Policy</h1>
          <p className="text-xs text-charcoal-400 font-mono mt-1">Effective Date: January 1, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">1. Information We Collect</h2>
          <p>
            At Rudrabeej, we respect the sanctity of your personal data. We only collect details necessary to process your orders, deliver parcels to your doorstep, and provide direct customer support (such as your Name, Delivery Address, Email Address, and Phone Number).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">2. Payment Security</h2>
          <p>
            We never store your credit card numbers, debit card PINs, or UPI credentials on our servers. All monetary transactions are processed through RBI-authorized, PCI-DSS Level 1 compliant payment gateways.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">3. Zero Spam Commitment</h2>
          <p>
            We will never sell, lease, or distribute your personal contact information to third-party advertisers or commercial brokers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">4. Contacting the Grievance Officer</h2>
          <p>
            For questions regarding your data or to request deletion of your account records, please write to us at <span className="font-mono text-charcoal-900">care@rudrabeejrudraksha.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
