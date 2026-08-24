'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sprout, Leaf, ArrowRight, Sun, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PackagingTransformation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'RECEIVE',
      subtitle: 'Rustic Handwoven Jute Pouch',
      description: 'Your sacred Rudraksha arrives in a rustic, 100% biodegradable handwoven natural jute pouch tied with raw cotton cord. Simple, sustainable, and purely natural.',
      image: '/images/packaging/step-1.jpg',
      badge: '100% Natural Jute'
    },
    {
      number: '02',
      title: 'UNBOX',
      subtitle: 'Sacred Living Plant Seeds',
      description: 'Inside, alongside your authenticated Rudraksha, you discover a companion packet of sacred native plant seeds — a living token from the Himalayas to your home.',
      image: '/images/packaging/step-2.jpg',
      badge: 'Plant Seeds of Life'
    },
    {
      number: '03',
      title: 'GROW',
      subtitle: 'Rooted Inner Positivity',
      description: 'Sow the seeds in fertile soil and water them. As the green sprouts take root in the earth and flourish, feel your own inner peace and positive energy taking deep root from within.',
      image: '/images/packaging/step-3.jpg',
      badge: 'Grow from Roots to Blossom'
    }
  ];

  return (
    <section className="bg-kraft-100/60 border-y border-kraft-200 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>The Seed of Life Ritual</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-charcoal-900 font-normal">
            "Grow Your Positivity from the Roots."
          </h2>
          <p className="text-sm text-charcoal-600 font-light leading-relaxed">
            Every Rudraksha arrives in a rustic natural jute pouch with companion plant seeds. Sow them in the soil, wear your sacred bead, and see your positive transformation take root and flourish just like a growing plant.
          </p>
        </div>

        {/* 3-Step Grid / Interactive Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className={cn(
                'bg-white border p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer relative shadow-subtle',
                activeStep === idx
                  ? 'border-copper-600 shadow-elevated ring-1 ring-copper-600/30'
                  : 'border-kraft-200 hover:border-kraft-400 opacity-95'
              )}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-copper-600 font-medium tracking-widest">
                  STEP {step.number}
                </span>
                <span className="text-[10px] font-mono uppercase bg-kraft-100 text-charcoal-700 px-2 py-0.5 border border-kraft-200">
                  {step.badge}
                </span>
              </div>

              {/* Image Preview */}
              <div className="aspect-[4/3] w-full bg-ivory-50 mb-5 overflow-hidden border border-kraft-200">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    // Fallback to beautiful botanical placeholders if custom photo is being uploaded
                    const fallback = idx === 0 
                      ? 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
                      : idx === 1
                      ? 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
                      : 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80';
                    (e.target as HTMLImageElement).src = fallback;
                  }}
                />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-medium text-charcoal-900">
                  {step.title} — <span className="font-light text-charcoal-600 text-base">{step.subtitle}</span>
                </h3>
                <p className="text-xs text-charcoal-500 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/packaging"
            className="inline-flex items-center gap-2 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-8 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors shadow-subtle"
          >
            <span>Explore The Seed of Life Story</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
