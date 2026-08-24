'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, HelpCircle, ArrowRight, Compass } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-kraft-100/50 border-b border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Educational Mukhi Guide Hub */}
          <div className="lg:col-span-6 bg-white border border-kraft-300 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-subtle">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-kraft-100 border border-kraft-300 flex items-center justify-center text-copper-600">
                <BookOpen className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-copper-600 font-medium">
                  Educational Encyclopedia
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                  Understanding Rudraksha: 1 to 14 Mukhi
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                Explore the botanical structure, traditional scriptural associations, mantras, and historical significance behind each natural cleft from Ek Mukhi to Chaturdasha Mukhi.
              </p>
            </div>

            <Link
              href="/guide"
              className="inline-flex items-center gap-2 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-6 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors self-start"
            >
              <span>Explore Complete Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Interactive Discovery Quiz Teaser */}
          <div className="lg:col-span-6 bg-charcoal-900 text-ivory-100 border border-charcoal-800 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-elevated">
            <div className="space-y-4">
              <div className="w-10 h-10 bg-charcoal-800 border border-kraft-700/50 flex items-center justify-center text-kraft-400">
                <HelpCircle className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-kraft-400 font-medium">
                  Shopping Discovery Tool
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-normal">
                  Which Rudraksha is Right for You?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-300 font-light leading-relaxed">
                Take our 4-step mindful discovery questionnaire to find the perfect bead, mala, or copper chain suited to your lifestyle, practice, or gifting occasion.
              </p>
            </div>

            <Link
              href="/guide#quiz"
              className="inline-flex items-center gap-2 bg-kraft-500 hover:bg-kraft-400 text-charcoal-900 px-6 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors self-start"
            >
              <span>Start Discovery Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
