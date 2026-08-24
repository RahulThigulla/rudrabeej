'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Sprout, Leaf } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-ivory-50 border-b border-kraft-200 overflow-hidden pt-12 pb-16 sm:pb-20 lg:py-24">
      {/* Subtle organic background gradient & grain accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#b89a72_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase shadow-subtle mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-copper-500"></span>
          <span>RUDRABEEJ • The Seed of Rudra.</span>
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-6xl text-charcoal-900 font-normal tracking-tight leading-[1.15]">
            Born of Sacred Tears. <br />
            <span className="italic font-light text-copper-700">Shaped for Modern Form.</span>
          </h1>
          <p className="text-base sm:text-lg text-charcoal-600 font-light max-w-2xl mx-auto leading-relaxed">
            Legend tells that when Shiva's tears of deep compassion touched the mountain earth, the sacred Rudraksha trees arose. At <strong>Rudrabeej</strong>, we honor this timeless botanical heritage, presenting pure authenticated beads in rustic natural jute pouches accompanied by living plant seeds to sow in the earth.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 max-w-md mx-auto">
          <Link
            href="/rudraksha"
            className="w-full sm:w-auto bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-all duration-300 shadow-elevated flex items-center justify-center gap-2 group"
          >
            <span>Shop Rudraksha</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-copper-400" />
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto bg-white hover:bg-kraft-100 border border-kraft-300 text-charcoal-800 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center"
          >
            Explore Collection
          </Link>
        </div>

        {/* Micro Trust Indicators */}
        <div className="pt-8 border-t border-kraft-200 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
          <div>
            <span className="block font-serif text-lg sm:text-xl font-medium text-charcoal-900">100%</span>
            <span className="text-[11px] sm:text-xs text-charcoal-500 font-light">Botanical Purity</span>
          </div>
          <div>
            <span className="block font-serif text-lg sm:text-xl font-medium text-charcoal-900">Zero</span>
            <span className="text-[11px] sm:text-xs text-charcoal-500 font-light">Plastic Packaging</span>
          </div>
          <div>
            <span className="block font-serif text-lg sm:text-xl font-medium text-charcoal-900">Plant Seeds</span>
            <span className="text-[11px] sm:text-xs text-charcoal-500 font-light">Included in Every Order</span>
          </div>
        </div>

      </div>
    </section>
  );
};
