import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sprout, Leaf, ArrowRight, Sun, Heart, CheckCircle2, Package, Droplets } from 'lucide-react';
import { PackagingTransformation } from '@/components/product/PackagingTransformation';

export const metadata: Metadata = {
  title: 'The Seed of Life & Eco-Jute Packaging | RUDRABEEJ',
  description:
    'Every RUDRABEEJ bead arrives in a natural rustic handwoven jute pouch accompanied by sacred plant seeds. Plant the seeds in soil and grow your inner positivity from the roots.',
};

export default function PackagingStoryPage() {
  const growthStages = [
    {
      title: '1. Plant in Sacred Earth',
      desc: 'Fill a small clay pot with fertile soil. Place your companion seeds gently into the earth with a quiet intention for inner peace and growth.',
      icon: <Sprout className="w-5 h-5 text-emerald-700" />,
      image: '/images/packaging/step-1.jpg'
    },
    {
      title: '2. Nurture & Water Daily',
      desc: 'Offer a few drops of water each morning as you put on your Rudraksha. Nurturing the living sprout becomes a daily mindful meditation ritual.',
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      image: '/images/packaging/step-2.jpg'
    },
    {
      title: '3. Blossom with Positivity',
      desc: 'As roots deepen in the soil and fresh green leaves unfurl, witness the tangible change in your own life — grounded calm, focus, and positive energy from the root up.',
      icon: <Sun className="w-5 h-5 text-amber-600" />,
      image: '/images/packaging/step-3.jpg'
    }
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>Living Heritage & Sustainable Packaging</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            A Sacred Seed for Your Soul.<br />A Living Seed for the Earth.
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            At <strong>RUDRABEEJ</strong>, we believe true spirituality honors the earth. Instead of expensive, wasteful boxes, we deliver your sacred beads in an authentic <strong>rustic handwoven jute pouch</strong> with a companion packet of <strong>living plant seeds</strong>.
          </p>
        </div>

        {/* 3 Pillars of RUDRABEEJ Packaging */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 1. Earth-Born Jute */}
          <div className="bg-white border border-kraft-300 p-8 space-y-4 shadow-subtle">
            <div className="w-10 h-10 bg-kraft-100 border border-kraft-300 flex items-center justify-center text-copper-700">
              <Package className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal-900">
              Natural Jute Fiber
            </h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Handwoven from 100% natural golden jute fiber and bound with raw organic cotton thread. Biodegradable, durable, and naturally protective for your beads.
            </p>
            <ul className="text-xs text-charcoal-500 font-mono space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Plastic & Synthetic Glues</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Compostable & Reusable</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pure Rustic Indian Craft</li>
            </ul>
          </div>

          {/* 2. Companion Seeds */}
          <div className="bg-white border border-kraft-300 p-8 space-y-4 shadow-subtle">
            <div className="w-10 h-10 bg-kraft-100 border border-kraft-300 flex items-center justify-center text-emerald-700">
              <Sprout className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal-900">
              The Plant Seed Gift
            </h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Included inside every order is a companion packet of native sacred plant seeds (Tulsi / Medicinal flora). A living expression of the name <em>Rudrabeej — The Seed of Rudra</em>.
            </p>
            <ul className="text-xs text-charcoal-500 font-mono space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Native Sacred Seeds</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Non-Hybrid & Natural</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ready for Home Sowing</li>
            </ul>
          </div>

          {/* 3. The Philosophy of Roots */}
          <div className="bg-white border border-kraft-300 p-8 space-y-4 shadow-subtle">
            <div className="w-10 h-10 bg-kraft-100 border border-kraft-300 flex items-center justify-center text-amber-600">
              <Sun className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-charcoal-900">
              Grow from the Roots
            </h3>
            <p className="text-xs text-charcoal-600 font-light leading-relaxed">
              Just as Shiva's sacred tears touched the earth and rose as trees, wearing your Rudraksha initiates a shift at your very roots. Plant your seeds and watch your positive energy grow alongside them.
            </p>
            <ul className="text-xs text-charcoal-500 font-mono space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Rooted Stillness & Calm</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Daily Mindful Ritual</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Positive Transformation</li>
            </ul>
          </div>

        </div>

        {/* Interactive 3-Step Transformation Component */}
        <PackagingTransformation />

        {/* 3-Stage Living Ritual Guide */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
              The Living Sowing Ritual
            </h2>
            <p className="text-xs text-charcoal-500 font-light">
              How to plant your seeds and begin your journey with RUDRABEEJ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {growthStages.map((stage, idx) => (
              <div key={idx} className="bg-white border border-kraft-300 p-6 space-y-4 shadow-subtle">
                <div className="flex items-center gap-3 border-b border-kraft-200 pb-3">
                  <div className="w-9 h-9 bg-kraft-100 border border-kraft-300 flex items-center justify-center">
                    {stage.icon}
                  </div>
                  <h4 className="font-serif text-base font-medium text-charcoal-900">
                    {stage.title}
                  </h4>
                </div>
                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-8 py-4 text-xs font-medium uppercase tracking-widest transition-colors shadow-elevated"
          >
            <span>Choose Your Sacred Rudraksha</span>
            <ArrowRight className="w-4 h-4 text-copper-400" />
          </Link>
        </div>

      </div>
    </div>
  );
}
