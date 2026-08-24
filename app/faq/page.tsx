'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { faqs } from '@/data/faq';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-3': true,
  });

  const categories = [
    { label: 'All Questions', value: 'all' },
    { label: 'Authenticity & Purity', value: 'authenticity' },
    { label: 'Care & Maintenance', value: 'care' },
    { label: 'Packaging & Second Life', value: 'packaging' },
    { label: 'Shipping & Orders', value: 'orders' },
    { label: 'Gifting & Custom', value: 'gifting' },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs =
    activeCategory === 'all'
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-copper-600" />
            <span>Knowledge Base</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed max-w-xl mx-auto">
            Everything you need to know about our botanical sourcing, authentic testing protocols, natural oil care, and second-life packaging.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'px-4 py-2 text-xs font-mono border transition-all duration-200',
                activeCategory === cat.value
                  ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                  : 'bg-white text-charcoal-700 border-kraft-200 hover:border-kraft-400'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="bg-white border border-kraft-300 divide-y divide-kraft-200 shadow-kraft">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div key={faq.id} className="p-6">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between text-left font-serif text-base sm:text-lg text-charcoal-900 focus:outline-none"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-copper-600 shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed animate-in fade-in duration-200">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Concierge Help Box */}
        <div className="bg-charcoal-900 text-ivory-100 p-8 text-center space-y-4 border border-charcoal-800 shadow-elevated">
          <h3 className="font-serif text-2xl text-ivory-50 font-normal">
            Have a Specific Question?
          </h3>
          <p className="text-xs text-charcoal-300 font-light max-w-md mx-auto">
            Our traditional seed experts and packaging designers are available to answer your individual questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="bg-kraft-500 hover:bg-kraft-400 text-charcoal-900 px-6 py-3 text-xs uppercase tracking-widest font-medium transition-colors"
            >
              Send an Inquiry
            </Link>
            <a
              href="https://wa.me/919876543210?text=Namaste,%20I%20have%20a%20question%20about%20Rudraksha"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-charcoal-700 hover:border-kraft-400 text-ivory-200 px-6 py-3 text-xs uppercase tracking-widest font-medium transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
