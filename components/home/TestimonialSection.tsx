'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Beautifully presented and thoughtfully packaged. The unbleached kraft box is now sitting on my study table as an altar display. You can feel the quiet care that went into it.",
      author: "Arjun V.",
      location: "Bengaluru, Karnataka",
      product: "Panchmukhi Rudraksha (5 Mukhi)",
      rating: 5,
    },
    {
      quote: "The hand-knotting on the 108 mala is exceptional. It glides through the fingers during daily japa without catching. So refreshing to find honest Indian craftsmanship.",
      author: "Meera S.",
      location: "Pune, Maharashtra",
      product: "Panchmukhi Rudraksha Mala (108+1)",
      rating: 5,
    },
    {
      quote: "Simple, elegant, and traditional. The copper capping is solid and the bead is 100% natural. The absence of plastic foam and synthetic coatings made the unboxing deeply satisfying.",
      author: "Devendra K.",
      location: "Hyderabad, Telangana",
      product: "Rudraksha with Pure Copper Chain",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory-50/60 border-b border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
          <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
            Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Voices from Our Custodians
          </h2>
          <p className="text-sm text-charcoal-500 font-light">
            Genuine words from those who hold and wear Rudrabeej creations.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-kraft-200/90 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-subtle hover:border-kraft-400 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-600">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-kraft-300 stroke-[1.5]" />
                </div>

                <p className="font-serif text-sm sm:text-base text-charcoal-800 leading-relaxed font-light italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-kraft-200/70 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-semibold text-charcoal-900">
                    {t.author}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-charcoal-400 font-mono">
                  <span>{t.location}</span>
                  <span className="text-[10px] text-charcoal-500 truncate max-w-[140px]">
                    {t.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
