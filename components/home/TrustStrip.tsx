'use client';

import React from 'react';
import { ShieldCheck, Compass, Sprout, Leaf } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'AUTHENTIC',
      description: 'Carefully sourced & X-Ray tested',
    },
    {
      icon: Compass,
      title: 'TRADITION',
      description: 'Rooted in Vedic Indian heritage',
    },
    {
      icon: Sprout,
      title: 'PLANT SEEDS',
      description: 'Living companion seeds in every order',
    },
    {
      icon: Leaf,
      title: 'MINDFUL',
      description: 'Plastic-free & eco-conscious',
    },
  ];

  return (
    <section className="bg-white border-b border-kraft-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 p-2.5 sm:p-3 bg-ivory-50/60 sm:bg-transparent border border-kraft-200/60 sm:border-transparent group"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-kraft-100/80 border border-kraft-300 flex items-center justify-center text-copper-700 shrink-0 group-hover:border-copper-600 transition-colors">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-charcoal-900 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-charcoal-500 font-light leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
