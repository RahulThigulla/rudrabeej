'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, Shield, HeartHandshake, Box } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-charcoal-900 text-ivory-100 overflow-hidden relative">
      {/* Texture accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#5a4634_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Atmospheric image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[3/4] bg-charcoal-800 border border-charcoal-700 overflow-hidden shadow-2xl">
              <img
                src="/images/rudraksha/gauri-shankar-1.jpg"
                alt="Rudrabeej artisan conditioning Rudraksha seeds in natural sesame oil"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-kraft-400">
                    The Art of Stillness
                  </p>
                  <p className="font-serif text-lg text-ivory-100 font-light italic">
                    "We did not create Rudraksha. We simply stopped decorating it with plastic."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest font-mono text-kraft-400 font-medium">
                The Sacred Origins of Rudrabeej
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory-50 font-normal leading-tight">
                The Seed of Rudra. <br />
                <span className="text-kraft-400 italic">Born of Compassionate Tears.</span>
              </h2>
            </div>

            {/* Origin Story Quote Box */}
            <div className="p-4 sm:p-5 bg-charcoal-800/90 border-l-2 border-copper-500 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-kraft-400 block">
                How We Got Our Name
              </span>
              <p className="text-xs sm:text-sm text-ivory-100 font-serif italic leading-relaxed">
                "Rudraksha is associated with Shiva's tears. After centuries of deep cosmic meditation, when Lord Shiva opened his eyes and witnessed the struggles of creation, tears of boundless empathy fell from his eyes. Where those sacred drops touched the earth, the first Rudraksha trees arose."
              </p>
              <p className="text-[11px] text-charcoal-300 font-light pt-1">
                <strong>Rudra</strong> (Shiva) + <strong>Beej</strong> (The Divine Seed) = <strong>RUDRABEEJ</strong>.
              </p>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-300 font-light leading-relaxed">
              We source single-origin botanical seeds directly from the Himalayan Terai. We wash them with pure mountain water, season them in cold-pressed natural oils, and present them in unbleached kraft paper boxes engineered to become altar keepsakes.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-charcoal-800">
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-copper-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-serif text-sm font-medium text-ivory-100">Botanical Honesty</h4>
                  <p className="text-xs text-charcoal-400 font-light mt-0.5">
                    No artificial carvings, glued fragments, or exaggerated claims.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Box className="w-4 h-4 text-copper-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-serif text-sm font-medium text-ivory-100">Second-Life Packaging</h4>
                  <p className="text-xs text-charcoal-400 font-light mt-0.5">
                    Designed to transform into a desktop altar rather than landfill waste.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-kraft-500 hover:bg-kraft-400 text-charcoal-900 px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
