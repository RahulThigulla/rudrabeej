'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, Crown, Grid } from 'lucide-react';
import { mukhiData } from '@/data/mukhi';
import { cn } from '@/lib/utils';

export const MukhiSection: React.FC = () => {
  const [selectedMukhiNumber, setSelectedMukhiNumber] = useState<number>(5);

  // Show 1 to 6 Mukhis explicitly in the primary row
  const primaryMukhis = mukhiData.filter((m) => m.mukhi <= 6);
  const activeMukhi = mukhiData.find((m) => m.mukhi === selectedMukhiNumber) || mukhiData[4];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
            The Geometry of Sacred Mukhis
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Shop by Mukhi
          </h2>
          <p className="text-sm text-charcoal-500 font-light leading-relaxed">
            Select a Mukhi below to explore its traditional lore, or browse our complete collection of all 1 to 21 Mukhi varieties.
          </p>
        </div>

        {/* Horizontal Number Selector: 1 to 6 Mukhis + '+ More (7–21 Mukhis)' Button */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-10">
          {primaryMukhis.map((m) => {
            const isSelected = m.mukhi === selectedMukhiNumber;
            return (
              <button
                key={m.mukhi}
                onClick={() => setSelectedMukhiNumber(m.mukhi)}
                className={cn(
                  'w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center border transition-all duration-300 font-serif text-sm sm:text-base shrink-0',
                  isSelected
                    ? 'bg-charcoal-900 text-ivory-100 border-charcoal-900 shadow-elevated scale-105 ring-1 ring-copper-500'
                    : 'bg-ivory-50 text-charcoal-700 border-kraft-300 hover:border-copper-600 hover:bg-kraft-100'
                )}
                title={`${m.name} (${m.mukhi} Mukhi)`}
              >
                <span className="font-medium text-base sm:text-lg leading-none">{m.mukhi}</span>
                <span className="text-[9px] font-mono uppercase tracking-tighter opacity-70 mt-0.5">
                  Mukhi
                </span>
              </button>
            );
          })}

          {/* + MORE OPTION: Direct Link to Shop all 1-21 Mukhis */}
          <Link
            href="/rudraksha"
            className="h-14 sm:h-16 px-4 sm:px-6 bg-kraft-100 hover:bg-kraft-200 text-charcoal-900 border border-kraft-400 hover:border-charcoal-900 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-sm group"
            title="Browse all 1 to 21 Mukhis in our shop"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-charcoal-900 flex items-center gap-1">
                <span>+ More Mukhis</span>
                <ArrowRight className="w-3.5 h-3.5 text-copper-700 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-[10px] text-charcoal-500 font-light tracking-normal lowercase">
                (7 to 21 Mukhis)
              </span>
            </div>
          </Link>
        </div>

        {/* Dynamic Showcase Card for Selected 1-6 Mukhi */}
        <div className="max-w-4xl mx-auto bg-ivory-50 border border-kraft-300 shadow-kraft p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Image */}
            <div className="md:col-span-5">
              <div className="relative aspect-square bg-white border border-kraft-200 overflow-hidden shadow-subtle">
                <img
                  src={activeMukhi.image}
                  alt={activeMukhi.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-charcoal-900/90 text-ivory-100 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider border border-copper-500/30">
                  {activeMukhi.sanskritTitle}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 px-2 py-0.5 text-[9px] font-mono text-charcoal-800 border border-kraft-200">
                  Facet {activeMukhi.mukhi} of 21
                </div>
              </div>
            </div>

            {/* Right Information */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-copper-600 font-medium">
                  Botanical Variety • {activeMukhi.mukhi} Mukhi
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium mt-0.5">
                  {activeMukhi.name} Rudraksha
                </h3>
                <p className="text-xs text-charcoal-500 font-mono mt-0.5">
                  Deity: <strong>{activeMukhi.rulingDeity}</strong> {activeMukhi.planetaryAssociation && `• Planetary: ${activeMukhi.planetaryAssociation}`}
                </p>
              </div>

              <p className="text-sm text-charcoal-600 font-light leading-relaxed">
                {activeMukhi.description}
              </p>

              <div className="p-3 bg-kraft-100/60 border-l-2 border-copper-500 text-xs text-charcoal-700 italic">
                "{activeMukhi.traditionalAssociation}"
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href={activeMukhi.relatedProductSlug ? `/rudraksha/${activeMukhi.relatedProductSlug}` : `/shop?mukhi=${activeMukhi.mukhi}`}
                  className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Shop {activeMukhi.mukhi} Mukhi Bead</span>
                  <ArrowRight className="w-4 h-4 text-copper-400" />
                </Link>

                <Link
                  href="/rudraksha"
                  className="bg-white hover:bg-kraft-100 border border-kraft-300 text-charcoal-800 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <Grid className="w-3.5 h-3.5 text-copper-600" />
                  <span>See All 1–21 Mukhis</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
