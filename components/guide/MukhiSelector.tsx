'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, Shield, Sun, BookOpen, Crown } from 'lucide-react';
import { mukhiData } from '@/data/mukhi';
import { MukhiInfo } from '@/types';
import { cn } from '@/lib/utils';

export const MukhiSelector: React.FC = () => {
  const [selectedMukhi, setSelectedMukhi] = useState<number>(5);
  const [activeTier, setActiveTier] = useState<'all' | 'foundational' | 'higher' | 'collector'>('all');

  const current = mukhiData.find((m) => m.mukhi === selectedMukhi) || mukhiData[4];

  const filteredMukhis = mukhiData.filter((m) => {
    if (activeTier === 'foundational') return m.mukhi >= 1 && m.mukhi <= 7;
    if (activeTier === 'higher') return m.mukhi >= 8 && m.mukhi <= 14;
    if (activeTier === 'collector') return m.mukhi >= 15 && m.mukhi <= 21;
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-10">
      
      {/* Mukhi Category Tiers */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto px-2">
        <button
          onClick={() => setActiveTier('all')}
          className={cn(
            'px-3 py-1.5 text-[11px] sm:text-xs font-mono border transition-all active:scale-95',
            activeTier === 'all'
              ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
              : 'bg-white text-charcoal-700 border-kraft-300 hover:border-kraft-500'
          )}
        >
          All 1 – 21
        </button>
        <button
          onClick={() => setActiveTier('foundational')}
          className={cn(
            'px-3 py-1.5 text-[11px] sm:text-xs font-mono border transition-all active:scale-95',
            activeTier === 'foundational'
              ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
              : 'bg-white text-charcoal-700 border-kraft-300 hover:border-kraft-500'
          )}
        >
          1–7 Mukhi
        </button>
        <button
          onClick={() => setActiveTier('higher')}
          className={cn(
            'px-3 py-1.5 text-[11px] sm:text-xs font-mono border transition-all active:scale-95',
            activeTier === 'higher'
              ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
              : 'bg-white text-charcoal-700 border-kraft-300 hover:border-kraft-500'
          )}
        >
          8–14 Mukhi
        </button>
        <button
          onClick={() => setActiveTier('collector')}
          className={cn(
            'px-3 py-1.5 text-[11px] sm:text-xs font-mono border transition-all flex items-center gap-1 active:scale-95',
            activeTier === 'collector'
              ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
              : 'bg-white text-charcoal-700 border-kraft-300 hover:border-kraft-500'
          )}
        >
          <Crown className="w-3 h-3 text-copper-600" />
          <span>15–21 (Rare)</span>
        </button>
      </div>

      {/* 1 to 21 Grid Buttons */}
      <div className="space-y-3 px-2">
        <div className="grid grid-cols-7 sm:grid-cols-11 md:grid-cols-21 gap-1.5 sm:gap-2 max-w-6xl mx-auto">
          {filteredMukhis.map((m) => {
            const isSelected = m.mukhi === selectedMukhi;
            const isHeirloom = m.mukhi >= 15;
            return (
              <button
                key={m.mukhi}
                onClick={() => setSelectedMukhi(m.mukhi)}
                className={cn(
                  'py-2 sm:py-3 flex flex-col items-center justify-center border transition-all duration-200 font-serif text-sm sm:text-base relative active:scale-90',
                  isSelected
                    ? 'bg-charcoal-900 text-ivory-100 border-charcoal-900 shadow-md scale-105 z-10 ring-1 ring-copper-500'
                    : isHeirloom
                    ? 'bg-kraft-50 text-charcoal-900 border-kraft-300 hover:border-copper-600'
                    : 'bg-white text-charcoal-700 border-kraft-200 hover:border-kraft-400 hover:bg-kraft-50'
                )}
              >
                <span className="font-medium leading-none">{m.mukhi}</span>
                <span className="text-[8px] font-mono uppercase opacity-70 mt-0.5">
                  M
                </span>
                {isHeirloom && !isSelected && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-copper-500"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Mukhi Feature Card */}
      <div className="max-w-5xl mx-auto bg-white border border-kraft-300 shadow-kraft p-4 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Image with Sanskrit title badge */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square bg-ivory-50 border border-kraft-200 overflow-hidden shadow-subtle max-w-sm mx-auto lg:max-w-none">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-charcoal-900/90 text-ivory-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider border border-copper-500/30">
                {current.sanskritTitle}
              </div>
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-white/90 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-charcoal-800 border border-kraft-200">
                Facet {current.mukhi} of 21
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Scriptural & Traditional Lore */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-copper-600 font-mono text-xs uppercase tracking-widest">
                <span>{current.mukhi >= 15 ? 'Rare Collector Variety' : 'Botanical Variety'}</span>
                <span>•</span>
                <span className="truncate max-w-[200px] sm:max-w-[220px]">Mantra: {current.mantra}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal-900 font-medium">
                {current.name} Rudraksha
              </h3>
              <p className="text-xs text-charcoal-500 font-mono">
                Deity: <strong>{current.rulingDeity}</strong>
                {current.planetaryAssociation && ` • Planetary: ${current.planetaryAssociation}`}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
              {current.description}
            </p>

            {/* Traditional Significance Quote Box */}
            <div className="p-3.5 sm:p-4 bg-kraft-100/60 border-l-2 border-copper-500 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal-500 block">
                Traditional Heritage Attribution
              </span>
              <p className="text-xs text-charcoal-700 italic leading-relaxed">
                "{current.traditionalAssociation}"
              </p>
            </div>

            {/* Who should wear */}
            <div className="space-y-1 pt-1">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-800 font-medium block">
                Traditional Recommendations:
              </span>
              <p className="text-xs text-charcoal-600 font-light">
                {current.whoShouldWear}
              </p>
            </div>

            {/* Action CTA */}
            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link
                href={current.relatedProductSlug ? `/rudraksha/${current.relatedProductSlug}` : `/shop?mukhi=${current.mukhi}`}
                className="inline-flex items-center justify-center gap-2 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-6 py-3 sm:py-3.5 text-xs font-medium uppercase tracking-widest transition-colors shadow-subtle active:scale-95"
              >
                <span>Shop {current.mukhi} Mukhi Bead</span>
                <ArrowRight className="w-4 h-4 text-copper-400" />
              </Link>

              <Link
                href={`/shop?mukhi=${current.mukhi}`}
                className="text-center sm:text-left text-xs text-charcoal-600 hover:text-charcoal-900 border-b border-charcoal-300 pb-0.5 uppercase tracking-wider font-mono py-1"
              >
                View all {current.mukhi} Mukhi creations
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
