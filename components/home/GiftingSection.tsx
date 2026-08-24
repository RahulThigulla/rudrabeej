'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ArrowRight, Sparkles, Building2, Heart, Award } from 'lucide-react';

export const GiftingSection: React.FC = () => {
  const occasions = [
    {
      title: 'Personal Gifting',
      desc: 'Birthdays, new beginnings, and meaningful personal tokens.'
    },
    {
      title: 'Wedding & Auspicious Favors',
      desc: 'Elegant keepsake boxes for guests and bridal blessings.'
    },
    {
      title: 'Festival & Traditional Milestones',
      desc: 'Diwali, Mahashivratri, and festive gratitude hampers.'
    },
    {
      title: 'Corporate & Executive Gifting',
      desc: 'Bespoke debossed boxes and custom branded certificates.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Occasion Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
                <Gift className="w-3.5 h-3.5" />
                <span>The Art of Thoughtful Offering</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal leading-tight">
                Give Something With Meaning.
              </h2>
            </div>

            <p className="text-sm text-charcoal-600 font-light leading-relaxed">
              Move beyond generic sweets and synthetic corporate gifts. Give an authentic, enduring piece of sacred Indian craftsmanship housed in packaging that becomes an altar keepsake.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {occasions.map((occ, idx) => (
                <div key={idx} className="p-4 bg-ivory-50 border border-kraft-200/80 space-y-1">
                  <h4 className="font-serif text-sm font-medium text-charcoal-900">
                    {occ.title}
                  </h4>
                  <p className="text-xs text-charcoal-500 font-light">
                    {occ.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/gifting"
                className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-7 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors inline-flex items-center gap-2"
              >
                <span>Shop Gift Sets</span>
                <ArrowRight className="w-4 h-4 text-copper-400" />
              </Link>

              <Link
                href="/bulk-orders"
                className="border border-kraft-300 hover:bg-kraft-100 text-charcoal-800 px-7 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors inline-flex items-center gap-2"
              >
                <span>Bulk & Corporate Enquiries</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Packaging Image Feature */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-kraft-100 border border-kraft-300 shadow-elevated overflow-hidden group">
              <img
                src="/images/rudraksha/gift-set-1.jpg"
                alt="Heritage Rudraksha Gift Set with brass and copper accompaniments"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-kraft-300">
                    Bespoke Kraft Gift Hamper
                  </p>
                  <p className="font-serif text-lg font-light">
                    "Every box includes pure copper dishes, natural oil, and silk string."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
