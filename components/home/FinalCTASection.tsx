'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-charcoal-900 text-ivory-100 text-center relative overflow-hidden">
      {/* Background grain texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#b89a72_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none border border-copper-500/40 text-[10px] font-mono tracking-widest text-kraft-300 uppercase">
          <span>Sacred • Natural • Timeless</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory-50 font-normal tracking-tight leading-tight">
          Carry the tradition forward.
        </h2>

        <p className="text-sm sm:text-base text-charcoal-300 font-light max-w-xl mx-auto leading-relaxed">
          Discover naturally harvested beads seasoned in consecrated oils, delivered in packaging created to become part of your sanctuary.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/rudraksha"
            className="w-full sm:w-auto bg-kraft-500 hover:bg-kraft-400 text-charcoal-900 px-9 py-4 text-xs font-medium uppercase tracking-widest transition-all duration-200 shadow-elevated flex items-center justify-center gap-2 group"
          >
            <span>Explore Rudraksha</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-ivory-100 px-9 py-4 text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
};
