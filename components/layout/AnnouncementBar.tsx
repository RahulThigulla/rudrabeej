'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside aria-label="Announcement" className="bg-charcoal-800 text-ivory-100 text-xs py-2 px-4 border-b border-charcoal-700 tracking-wider">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-kraft-400">
          <span className="w-1.5 h-1.5 rounded-full bg-copper-500 animate-pulse"></span>
          <span className="font-light">Complimentary Pan-India Shipping on Orders Above ₹999</span>
        </div>

        <div className="flex-1 text-center font-light flex items-center justify-center space-x-2">
          <span>Pure rustic jute packaging with companion sacred plant seeds in every order.</span>
          <Link 
            href="/packaging" 
            className="text-kraft-400 hover:text-white underline underline-offset-4 inline-flex items-center gap-0.5 ml-1 transition-colors"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4 text-xs text-charcoal-300">
          <Link href="/track-order" className="hover:text-ivory-100 transition-colors">
            Track Order
          </Link>
          <span>•</span>
          <Link href="/authenticity" className="hover:text-ivory-100 transition-colors">
            Authenticity Promise
          </Link>
        </div>
      </div>
    </aside>
  );
};
