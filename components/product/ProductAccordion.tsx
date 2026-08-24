'use client';

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Sparkles, Droplets, Package, Truck, Info, Scroll } from 'lucide-react';
import { Product } from '@/types';
import { cn } from '@/lib/utils';

interface ProductAccordionProps {
  product: Product;
}

export const ProductAccordion: React.FC<ProductAccordionProps> = ({ product }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    significance: true,
    care: false,
    authenticity: false,
    packaging: false,
    shipping: false
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="divide-y divide-kraft-200 border-y border-kraft-200 text-sm">
      
      {/* 1. Overview & Features */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('overview')}
          className="w-full flex items-center justify-between text-left font-serif text-base text-charcoal-900 focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-copper-600" />
            <span>Overview & Key Characteristics</span>
          </div>
          <ChevronDown
            className={cn('w-4 h-4 text-charcoal-500 transition-transform duration-200', openSections.overview && 'rotate-180')}
          />
        </button>

        {openSections.overview && (
          <div className="mt-3 text-xs text-charcoal-600 space-y-3 font-light leading-relaxed animate-in fade-in duration-200">
            <p>{product.description}</p>
            <ul className="space-y-1.5 pl-4 list-disc marker:text-kraft-500">
              {product.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 2. Traditional Significance (Strictly Cultural Framing) */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('significance')}
          className="w-full flex items-center justify-between text-left font-serif text-base text-charcoal-900 focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <Scroll className="w-4 h-4 text-copper-600" />
            <span>Traditional & Heritage Significance</span>
          </div>
          <ChevronDown
            className={cn('w-4 h-4 text-charcoal-500 transition-transform duration-200', openSections.significance && 'rotate-180')}
          />
        </button>

        {openSections.significance && (
          <div className="mt-3 text-xs text-charcoal-600 space-y-3 font-light leading-relaxed animate-in fade-in duration-200">
            <div className="bg-kraft-100/60 p-3 border-l-2 border-copper-500 text-[11px] text-charcoal-700 italic">
              Note: The associations detailed below are rooted in classical Indian heritage, traditional scriptures, and historical practices. They are presented respectfully as cultural context rather than medical or scientific claims.
            </div>
            <ul className="space-y-2 pl-4 list-disc marker:text-kraft-500">
              {product.traditionalSignificance.map((sig, idx) => (
                <li key={idx}>{sig}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3. How to Wear & Care */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('care')}
          className="w-full flex items-center justify-between text-left font-serif text-base text-charcoal-900 focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <Droplets className="w-4 h-4 text-copper-600" />
            <span>How to Wear & Natural Conditioning</span>
          </div>
          <ChevronDown
            className={cn('w-4 h-4 text-charcoal-500 transition-transform duration-200', openSections.care && 'rotate-180')}
          />
        </button>

        {openSections.care && (
          <div className="mt-3 text-xs text-charcoal-600 space-y-4 font-light leading-relaxed animate-in fade-in duration-200">
            <div>
              <h5 className="font-mono uppercase text-[11px] text-charcoal-800 font-medium mb-1">
                Wearing Guidelines
              </h5>
              <ul className="space-y-1.5 pl-4 list-disc marker:text-kraft-500">
                {product.howToUse.map((use, idx) => (
                  <li key={idx}>{use}</li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-mono uppercase text-[11px] text-charcoal-800 font-medium mb-1">
                Periodic Oiling & Cleaning
              </h5>
              <ul className="space-y-1.5 pl-4 list-disc marker:text-kraft-500">
                {product.careInstructions.map((care, idx) => (
                  <li key={idx}>{care}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 4. Authenticity & Verification */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('authenticity')}
          className="w-full flex items-center justify-between text-left font-serif text-base text-charcoal-900 focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-copper-600" />
            <span>Botanical Authenticity & Sourcing</span>
          </div>
          <ChevronDown
            className={cn('w-4 h-4 text-charcoal-500 transition-transform duration-200', openSections.authenticity && 'rotate-180')}
          />
        </button>

        {openSections.authenticity && (
          <div className="mt-3 text-xs text-charcoal-600 space-y-2 font-light leading-relaxed animate-in fade-in duration-200">
            <ul className="space-y-1.5 pl-4 list-disc marker:text-kraft-500">
              {product.authenticityInformation.map((auth, idx) => (
                <li key={idx}>{auth}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 5. Packaging Second Life Story */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('packaging')}
          className="w-full flex items-center justify-between text-left font-serif text-base text-charcoal-900 focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <Package className="w-4 h-4 text-copper-600" />
            <span>Eco-Jute & Plant Seeds Story</span>
          </div>
          <ChevronDown
            className={cn('w-4 h-4 text-charcoal-500 transition-transform duration-200', openSections.packaging && 'rotate-180')}
          />
        </button>

        {openSections.packaging && (
          <div className="mt-3 text-xs text-charcoal-600 space-y-3 font-light leading-relaxed animate-in fade-in duration-200">
            <p>{product.packagingInformation.description}</p>
            <div className="p-3 bg-kraft-100/70 border border-kraft-300">
              <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal-800 font-medium block mb-1">
                How To Reuse:
              </span>
              <p className="text-charcoal-700">{product.packagingInformation.secondLifeUse}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {product.packagingInformation.materials.map((mat, idx) => (
                <span key={idx} className="bg-white border border-kraft-200 text-charcoal-600 px-2 py-0.5 text-[10px] font-mono">
                  {mat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. Shipping & Delivery */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('shipping')}
          className="w-full flex items-center justify-between text-left font-serif text-base text-charcoal-900 focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-copper-600" />
            <span>Shipping & Fulfillment</span>
          </div>
          <ChevronDown
            className={cn('w-4 h-4 text-charcoal-500 transition-transform duration-200', openSections.shipping && 'rotate-180')}
          />
        </button>

        {openSections.shipping && (
          <div className="mt-3 text-xs text-charcoal-600 space-y-2 font-light leading-relaxed animate-in fade-in duration-200">
            <p><strong>Dispatch:</strong> {product.shippingInformation.dispatchTime}</p>
            <p><strong>Delivery:</strong> {product.shippingInformation.deliveryTime}</p>
            <p><strong>Free Shipping:</strong> On all orders above ₹{product.shippingInformation.freeShippingThreshold}</p>
          </div>
        )}
      </div>

    </div>
  );
};
