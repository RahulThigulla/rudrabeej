import React from 'react';
import { Metadata } from 'next';
import { MukhiSelector } from '@/components/guide/MukhiSelector';
import { RudrakshaQuiz } from '@/components/guide/RudrakshaQuiz';
import { BookOpen, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rudraksha Mukhi Guide (1 to 21 Faces) & Discovery Quiz | RUDRABEEJ',
  description:
    'Comprehensive guide to understanding the botanical structure, traditional significance, and mantras of 1 to 21 Mukhi Rudraksha beads. Take our discovery quiz to find the right bead for you.',
};

export default function GuidePage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <BookOpen className="w-3.5 h-3.5 text-copper-600" />
            <span>The Sacred Compendium</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Understanding Rudraksha (1 to 21 Mukhis)
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            From the singular crescent of the Ek Mukhi to the supreme crown jewel of the 21 Mukhi Kuber bead, explore the botanical architecture and traditional heritage behind every sacred face.
          </p>
        </div>

        {/* 1 to 14 Interactive Mukhi Selector */}
        <MukhiSelector />

        {/* Discovery Quiz Section */}
        <div className="pt-8">
          <RudrakshaQuiz />
        </div>

        {/* Classical Heritage Framing Disclaimer Card */}
        <div className="max-w-4xl mx-auto p-6 bg-white border border-kraft-300 text-xs text-charcoal-500 font-light space-y-2">
          <p className="font-serif text-sm font-medium text-charcoal-900">
            A Note on Traditional Literature
          </p>
          <p className="leading-relaxed">
            All scriptural associations, ruling energies, and traditional lore described in this guide are derived from ancient texts including the Shiva Purana, Padma Purana, and Shrimad Devi Bhagavatam. They represent timeless Indian cultural heritage and are not presented as scientific or medical claims.
          </p>
        </div>

      </div>
    </div>
  );
}
