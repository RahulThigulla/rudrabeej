import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Check, Sparkles, AlertCircle, ArrowRight, Eye, Droplets, Microscope } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authenticity & Botanical Verification | RUDRABEEJ Promise',
  description:
    'Know what you wear. Explore our rigorous non-invasive botanical checks, X-ray seed chamber verification, and ethical Himalayan sourcing standards.',
};

export default function AuthenticityPage() {
  const verificationSteps = [
    {
      step: '01',
      title: 'Botanical Identification',
      desc: 'Verification of authentic Elaeocarpus ganitrus species characteristics, seed wall hardness, and natural surface granular tubercles.'
    },
    {
      step: '02',
      title: 'Continuous Cleft Examination',
      desc: 'High-magnification microscopic inspection to ensure all mukhi lines run uninterrupted from the crown (Brahma spot) to tail (Shiva spot) without artificial carving.'
    },
    {
      step: '03',
      title: 'Digital Radiography (X-Ray)',
      desc: 'Non-invasive radiographic scanning on rare specimens to verify internal cellular seed chambers (compartments) matching the exact count of outer mukhis.'
    },
    {
      step: '04',
      title: 'Natural Conditioning & Tamper Seal',
      desc: 'Conditioned exclusively in cold-pressed natural oils, packed in our recyclable kraft casing, and tamper-sealed with our embossed registry label.'
    }
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-copper-600" />
            <span>Honest Verification</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Know What You Wear.
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            In an unregulated market flooded with carved wooden imitations and glued composite seeds, Rudrabeej stands for absolute botanical transparency and non-invasive scientific verification.
          </p>
        </div>

        {/* Authenticity Promise Card */}
        <div className="max-w-4xl mx-auto bg-charcoal-900 text-ivory-100 p-8 sm:p-12 border border-charcoal-800 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest font-mono text-kraft-400 font-medium">
              The Rudrabeej Botanical Guarantee
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-medium">
              Our Four Commitments to You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-charcoal-800">
            <div className="space-y-1.5">
              <h4 className="font-serif text-base text-kraft-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>100% Genuine Botanical Seeds</span>
              </h4>
              <p className="text-xs text-charcoal-400 font-light leading-relaxed">
                Zero plastic casts, resin imitations, or artificially glued composite segments.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif text-base text-kraft-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero Synthetic Chemical Dyes</span>
              </h4>
              <p className="text-xs text-charcoal-400 font-light leading-relaxed">
                Cleaned purely with soft mountain water and conditioned in natural cold-pressed oils.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif text-base text-kraft-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>X-Ray Chamber Verification</span>
              </h4>
              <p className="text-xs text-charcoal-400 font-light leading-relaxed">
                Internal seed cavity confirmation for rare Mukhi specimens and conjoined twins.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-serif text-base text-kraft-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Tamper-Sealed Batch Registry</span>
              </h4>
              <p className="text-xs text-charcoal-400 font-light leading-relaxed">
                Each parcel is securely sealed in our Varanasi and Haridwar sanctums.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Verification Workflow */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              How We Test & Verify
            </h2>
            <p className="text-xs text-charcoal-500 font-light">
              Non-destructive botanical protocols carried out prior to oil conditioning and packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white border border-kraft-300 p-6 space-y-3 flex flex-col justify-between shadow-subtle"
              >
                <div className="space-y-2">
                  <span className="font-mono text-xs text-copper-600 font-bold tracking-widest">
                    STEP {step.step}
                  </span>
                  <h3 className="font-serif text-base font-medium text-charcoal-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What is Rudraksha Botanical Explainer */}
        <div className="bg-white border border-kraft-300 p-8 sm:p-12 max-w-4xl mx-auto space-y-6">
          <h3 className="font-serif text-2xl text-charcoal-900 font-normal">
            The Botany of Elaeocarpus Ganitrus
          </h3>
          <div className="space-y-4 text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            <p>
              Rudraksha is the inner stone (seed) of the fruit of the *Elaeocarpus ganitrus* tree, an evergreen arbor that thrives primarily in the moist subtropical climates of the Himalayan foothills (India, Nepal, and Southeast Asian islands).
            </p>
            <p>
              When the fruit matures, it turns an intense natural blue, earning the common name "Blueberry beads". The outer pulp is removed gently using pure water baths, revealing the woody endocarp traversed by natural deep ridges known in Sanskrit as <strong>Mukhis</strong> (faces).
            </p>
            <p>
              Each mukhi corresponds directly to an internal seed chamber that originally nurtured a botanical embryo. The genuine presence of these chambers is what distinguishes authentic specimens from carved counterfeits.
            </p>
          </div>

          <div className="pt-4 border-t border-kraft-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/guide"
              className="text-xs font-mono uppercase tracking-widest text-copper-600 hover:text-copper-800 inline-flex items-center gap-1.5"
            >
              <span>Explore 1 to 14 Mukhi Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/shop"
              className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors"
            >
              Browse Authenticated Beads
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
