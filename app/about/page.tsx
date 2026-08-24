import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Shield, Box, Sparkles, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story & Heritage | RUDRABEEJ',
  description:
    'Discover why Rudrabeej was founded: to bring honest botanical integrity, minimal Indian luxury, and reusable second-life packaging to sacred Rudraksha traditions.',
};

export default function AboutStoryPage() {
  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Header */}
        <div className="text-center space-y-4">
          <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
            Ancient Roots. Modern Form.
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Our Story
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed max-w-2xl mx-auto">
            A quiet rebellion against plastic sacred symbols, synthetic finishes, and mass-market spiritual commercialization.
          </p>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/9] bg-charcoal-900 border border-kraft-300 overflow-hidden shadow-elevated">
          <img
            src="/images/rudraksha/mala-108-1.jpg"
            alt="Artisanal Rudraksha conditioning in warm natural light"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 5 Chapters of Story */}
        <div className="space-y-12 text-sm sm:text-base text-charcoal-700 font-light leading-relaxed">
          
          {/* Chapter 1: The Sacred Name & Origin */}
          <section className="space-y-4 pb-8 border-b border-kraft-200">
            <span className="font-mono text-xs text-copper-600 font-medium uppercase tracking-widest">
              Chapter I • The Sacred Origin
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              How We Got Our Name: The Seed of Rudra
            </h2>
            <div className="p-5 bg-kraft-100/70 border-l-2 border-copper-600 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal-500 block">
                Classical Scriptural Heritage
              </span>
              <p className="font-serif italic text-charcoal-900 text-sm sm:text-base leading-relaxed">
                "Rudraksha is associated with Shiva's tears. Ancient traditions narrate that after thousands of years of profound cosmic meditation for the well-being of all living beings, Lord Shiva opened his eyes. Witnessing the struggles and sorrow of mortal existence, compassionate tears fell from his eyes. Where those sacred drops touched the earth, the very first Rudraksha trees arose."
              </p>
            </div>
            <p>
              From this sacred origin comes our name: <strong>Rudra</strong> (Lord Shiva) and <strong>Beej</strong> (The Seed / Primordial Source of Consciousness) — <strong>RUDRABEEJ</strong>. For over three millennia, this sacred seed (*Elaeocarpus ganitrus*) has served as an anchor of stillness and spiritual grounding.
            </p>
          </section>

          {/* Chapter 2: Why We Started */}
          <section className="space-y-3 pb-8 border-b border-kraft-200">
            <span className="font-mono text-xs text-copper-600 font-medium uppercase tracking-widest">
              Chapter II
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              Why We Started
            </h2>
            <p>
              When we searched the modern marketplace for authentic Rudraksha, we encountered two disappointing extremes: commercial roadside stalls offering dubious plastic-molded seeds, or high-markup spiritual shops drowning in flashy gold foil, synthetic satin ribbons, and exaggerated supernatural claims.
            </p>
            <p>
              We believed a sacred Indian heritage brand should look like modern Indian architecture: minimal, grounded, dignified, authentic, and environmentally responsible.
            </p>
          </section>

          {/* Chapter 3: Our Approach */}
          <section className="space-y-3 pb-8 border-b border-kraft-200">
            <span className="font-mono text-xs text-copper-600 font-medium uppercase tracking-widest">
              Chapter III
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              Our Approach
            </h2>
            <p>
              We do not mass manufacture or alter seeds. We partner directly with family seed harvesters in Uttarakhand, Nepal, and South Indian coastal groves. Every bead is manually cleaned with water and seasoned in pure cold-pressed sesame or almond oil.
            </p>
          </section>

          {/* Chapter 4: Our Packaging Philosophy */}
          <section className="space-y-3 pb-8 border-b border-kraft-200">
            <span className="font-mono text-xs text-copper-600 font-medium uppercase tracking-widest">
              Chapter IV
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              The Second Life of Packaging
            </h2>
            <p>
              Traditional Indian packaging never produced waste. Clay pots, unbleached cloth, and leaves returned directly to the soil. We engineered our rigid unbleached kraft paperboard boxes with origami geometry so that the unboxing is not the end of the package, but the start of its second life as a tabletop altar stand or jewelry case.
            </p>
          </section>

          {/* Chapter 5: Our Promise */}
          <section className="space-y-3">
            <span className="font-mono text-xs text-copper-600 font-medium uppercase tracking-widest">
              Chapter V
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              The Rudrabeej Promise
            </h2>
            <p>
              We promise total honesty. We will never sell artificially carved seeds, we will never make unproven medical claims, and we will always honor the craftspeople and natural ecosystems that make our offerings possible.
            </p>
          </section>

        </div>

        {/* Bottom CTA */}
        <div className="pt-8 border-t border-kraft-200 text-center space-y-4">
          <p className="font-serif text-xl text-charcoal-900">
            "Held by nature. Seasoned by tradition."
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/shop"
              className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-copper-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
