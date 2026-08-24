'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Gift, Check, ArrowRight, Sparkles, Send, ShieldCheck } from 'lucide-react';

export default function BulkOrdersPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '25-50',
    budget: '₹1,000 - ₹2,500 per box',
    eventType: 'Corporate Milestone / Diwali Gifting',
    customizationDetails: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <Building2 className="w-3.5 h-3.5 text-copper-600" />
            <span>Artisanal Gifting Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Thoughtful Gifting at Scale
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            Curate bespoke unbleached kraft hampers featuring authenticated Rudraksha, hand-hammered copper vessels, consecrated oils, and custom debossed corporate monograms.
          </p>
        </div>

        {/* 2-Column: Features on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Gifting Options */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-copper-600 font-medium">
                Tailored Services
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                How We Customize for You
              </h3>
            </div>

            <div className="space-y-6 text-xs text-charcoal-600 font-light">
              <div className="p-5 bg-white border border-kraft-300 space-y-2 shadow-subtle">
                <h4 className="font-serif text-base text-charcoal-900 font-medium">
                  1. Custom Debossed Monograms
                </h4>
                <p>
                  Add your company insignia, family wedding crest, or auspicious Sanskrit verse hot-stamped in antique copper on our rigid kraft boxes.
                </p>
              </div>

              <div className="p-5 bg-white border border-kraft-300 space-y-2 shadow-subtle">
                <h4 className="font-serif text-base text-charcoal-900 font-medium">
                  2. Handcrafted Copper Artifacts
                </h4>
                <p>
                  Pair sacred beads with hand-hammered pure copper katoris (dishes), brass diya lamps, and cold-pressed sandalwood conditioning oils.
                </p>
              </div>

              <div className="p-5 bg-white border border-kraft-300 space-y-2 shadow-subtle">
                <h4 className="font-serif text-base text-charcoal-900 font-medium">
                  3. Sustainable Second-Life Philosophy
                </h4>
                <p>
                  Ensure your corporate or wedding gifts leave zero plastic landfill waste behind — every box becomes an altar keepsake for recipients.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Concierge Help */}
            <div className="p-5 bg-charcoal-900 text-ivory-100 space-y-2">
              <p className="font-serif text-base text-ivory-50">Urgent Gifting Timeline?</p>
              <p className="text-xs text-charcoal-400 font-light">
                Speak directly with our Master Gifting Concierge for accelerated fulfillment.
              </p>
              <a
                href="https://wa.me/919876543210?text=Namaste,%20I%20have%20an%20enquiry%20for%20bulk%20gifting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1 text-xs text-kraft-300 hover:text-white underline font-mono"
              >
                Chat on WhatsApp (+91 98765 43210) →
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quote Request Form */}
          <div className="lg:col-span-7 bg-white border border-kraft-300 p-8 sm:p-10 shadow-kraft">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                  Enquiry Received with Gratitude
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
                  Namaste, {formData.name}. Our gifting curator will review your requirements and share a personalized catalog & proposal within 12 hours.
                </p>
                <div className="pt-4">
                  <Link
                    href="/shop"
                    className="inline-block bg-charcoal-900 text-ivory-50 px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-charcoal-800"
                  >
                    Browse Collections
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                    Request a Bespoke Proposal
                  </h3>
                  <p className="text-xs text-charcoal-500 font-light mt-1">
                    Share your requirements below and receive a detailed quote.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Sundaram"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Vayu Enterprises / Family"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.com"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Estimated Quantity</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-serif"
                    >
                      <option value="10-25">10 – 25 Hampers</option>
                      <option value="25-50">25 – 50 Hampers</option>
                      <option value="50-100">50 – 100 Hampers</option>
                      <option value="100-500">100 – 500 Hampers</option>
                      <option value="500+">500+ Large Scale Scale Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Budget Per Box</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-serif"
                    >
                      <option value="₹800 - ₹1,500">₹800 – ₹1,500</option>
                      <option value="₹1,500 - ₹3,000">₹1,500 – ₹3,000</option>
                      <option value="₹3,000 - ₹6,000">₹3,000 – ₹6,000</option>
                      <option value="₹6,000+">₹6,000+ (Heirloom Consecrated Sets)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-charcoal-700 font-medium mb-1">Occasion / Event Type</label>
                  <input
                    type="text"
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    placeholder="e.g. Wedding Welcome Gifts, Diwali Corporate Milestone, Annual Retreat"
                    className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                  />
                </div>

                <div>
                  <label className="block text-charcoal-700 font-medium mb-1">Special Customization / Delivery Notes</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about required delivery dates, custom greeting cards, or preferred bead varieties..."
                    className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 py-4 text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-elevated"
                  >
                    <Send className="w-4 h-4 text-copper-400" />
                    <span>Request a Bulk Quote</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-charcoal-400 font-light">
                  🔒 We respect your privacy. No spam or commercial marketing lists.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
