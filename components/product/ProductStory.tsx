'use client';

import React from 'react';
import { Product } from '@/types';
import { Sparkles, Shield, Compass, Feather } from 'lucide-react';

interface ProductStoryProps {
  product: Product;
}

export const ProductStory: React.FC<ProductStoryProps> = ({ product }) => {
  return (
    <section className="bg-white border-y border-kraft-200 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
                The Heritage Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal leading-tight">
                More Than a Bead.
              </h2>
            </div>

            <p className="text-sm text-charcoal-600 font-light leading-relaxed">
              {product.story}
            </p>

            {/* Sacred Origin Callout */}
            <div className="p-4 bg-ivory-50 border-l-2 border-copper-600 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal-500 block">
                RUDRABEEJ • The Seed of Rudra
              </span>
              <p className="text-xs text-charcoal-700 font-serif italic leading-relaxed">
                "Rudraksha is associated with Shiva's tears. Those sacred drops touched the earth, and the sacred Rudraksha trees arose."
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-kraft-200">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-charcoal-900 font-serif text-sm font-medium">
                  <Compass className="w-4 h-4 text-copper-600" />
                  <span>Sacred Geography</span>
                </div>
                <p className="text-xs text-charcoal-500 font-light">
                  Harvested responsibly from mature *Elaeocarpus* trees in {product.origin}.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-charcoal-900 font-serif text-sm font-medium">
                  <Feather className="w-4 h-4 text-copper-600" />
                  <span>Natural Integrity</span>
                </div>
                <p className="text-xs text-charcoal-500 font-light">
                  Free from synthetic dyes, chemical varnishes, or artificial glue composites.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Feature */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] bg-ivory-100 border border-kraft-300 overflow-hidden shadow-elevated">
              <img
                src={product.images.find(img => img.type === 'lifestyle')?.url || product.images[0].url}
                alt="Product story lifestyle imagery"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-kraft-300">
                    Traditional Indian Craftsmanship
                  </p>
                  <p className="font-serif text-lg font-light italic">
                    "Held by nature. Seasoned by tradition."
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
