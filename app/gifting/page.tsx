import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Gift, ArrowRight, Sparkles, Building2, Package } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export const metadata: Metadata = {
  title: 'Sacred Gifting & Heritage Hampers | RUDRABEEJ',
  description:
    'Give something with meaning. Curated Rudraksha gift sets featuring authenticated seeds, hand-hammered copper vessels, and reusable second-life packaging.',
};

export default function GiftingPage() {
  const giftSets = products.filter((p) => p.category === 'gift-sets' || p.badges?.includes('BESTSELLER'));

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <Gift className="w-3.5 h-3.5 text-copper-600" />
            <span>The Sacred Offering</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Give Something With Meaning
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            Move beyond transient items. Gift an authentic, enduring piece of sacred Indian heritage presented in packaging engineered to become an altar keepsake.
          </p>
        </div>

        {/* Gift Sets Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-kraft-200 pb-4">
            <h2 className="font-serif text-2xl text-charcoal-900 font-normal">
              Curated Gift Sets
            </h2>
            <Link
              href="/bulk-orders"
              className="text-xs uppercase tracking-widest font-medium text-copper-600 hover:text-copper-800 font-mono inline-flex items-center gap-1"
            >
              <span>Corporate & Bulk Gifting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftSets.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        {/* Corporate Banner */}
        <div className="bg-charcoal-900 text-ivory-100 p-8 sm:p-12 border border-charcoal-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-elevated">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-kraft-400">
              Corporate & Wedding Favors
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-medium">
              Thoughtful Gifting at Scale
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-300 font-light leading-relaxed">
              We offer custom copper debossing, bespoke Sanskrit greetings, and curated gift boxes for executive milestones, weddings, and traditional gatherings.
            </p>
          </div>

          <Link
            href="/bulk-orders"
            className="bg-kraft-500 hover:bg-kraft-400 text-charcoal-900 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-colors shrink-0 shadow-sm"
          >
            Request Bulk Quote
          </Link>
        </div>

      </div>
    </div>
  );
}
