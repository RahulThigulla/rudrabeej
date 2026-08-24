import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | RUDRABEEJ Heritage Crafts',
};

export default function TermsPage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-charcoal-700 text-xs sm:text-sm font-light leading-relaxed">
        <div className="border-b border-kraft-200 pb-4">
          <span className="font-mono text-xs uppercase text-copper-600 tracking-widest">Legal Document</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mt-1">Terms & Conditions</h1>
          <p className="text-xs text-charcoal-400 font-mono mt-1">Effective Date: January 1, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">1. Natural Product Variations</h2>
          <p>
            Every Rudraksha bead is an authentic botanical seed created by nature. As such, slight variations in natural diameter, contour curvature, surface texture, and natural color hue (from warm amber to deep chocolate brown) are intrinsic hallmarks of botanical authenticity and are not defects.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">2. Heritage & Cultural Context</h2>
          <p>
            Information provided regarding Mukhi lore, planetary energies, and traditional associations is rooted in classical Indian scriptural history. It is provided for cultural enrichment and educational appreciation, not as medical, psychiatric, or legally guaranteed remedies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-medium text-charcoal-900">3. Intellectual Property</h2>
          <p>
            All brand design assets, copywriting, second-life packaging schematics, and editorial essays are proprietary creations of Rudrabeej Heritage Crafts.
          </p>
        </section>
      </div>
    </div>
  );
}
