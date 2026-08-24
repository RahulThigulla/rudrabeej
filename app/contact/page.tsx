'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, MessageCircle, Check, Clock, Sparkles } from 'lucide-react';

import { siteConfig } from '@/data/siteConfig';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Choosing a Rudraksha',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <Mail className="w-3.5 h-3.5 text-copper-600" />
            <span>Concierge Sanctum</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Connect With Rudrabeej
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            Have questions about selecting the right Mukhi, conditioning your beads, or customizing bulk hampers? Our custodians are here to assist you with care and reverence.
          </p>
        </div>

        {/* 2-Column: Details + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-copper-600 font-medium">
                Direct Channels
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                Speak With a Custodian
              </h3>
            </div>

            <div className="space-y-5 text-xs text-charcoal-600 font-light">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappFormatted}?text=Namaste,%20I%20need%20assistance%20with%20an%20order`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-white border border-kraft-300 flex items-center justify-between shadow-subtle hover:border-copper-600 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-charcoal-900 font-medium group-hover:text-copper-700">
                      WhatsApp Concierge
                    </h4>
                    <p className="text-charcoal-500 font-mono text-[11px]">{siteConfig.contact.whatsapp}</p>
                  </div>
                </div>
                <span className="text-xs font-mono uppercase text-copper-600">Chat Now →</span>
              </a>

              <div className="p-5 bg-white border border-kraft-300 space-y-2 shadow-subtle">
                <div className="flex items-center gap-2 text-charcoal-900 font-serif text-sm font-medium">
                  <Mail className="w-4 h-4 text-copper-600" />
                  <span>Email Inquiries</span>
                </div>
                <p className="text-charcoal-700 font-mono text-xs">{siteConfig.contact.supportEmail}</p>
                <p className="text-[11px] text-charcoal-400">{siteConfig.contact.responsePromise}</p>
              </div>

              <div className="p-5 bg-white border border-kraft-300 space-y-2 shadow-subtle">
                <div className="flex items-center gap-2 text-charcoal-900 font-serif text-sm font-medium">
                  <MapPin className="w-4 h-4 text-copper-600" />
                  <span>Fulfillment Sanctum</span>
                </div>
                <p className="text-charcoal-700 leading-relaxed">
                  {siteConfig.contact.address}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white border border-kraft-300 p-8 sm:p-10 shadow-kraft">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                  Message Sent with Reverence
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {formData.name}. A member of our concierge team will respond to {formData.email} promptly.
                </p>
                <div className="pt-4">
                  <Link
                    href="/shop"
                    className="inline-block bg-charcoal-900 text-ivory-50 px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-charcoal-800"
                  >
                    Return to Collection
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal-900 font-medium">
                    Send a Message
                  </h3>
                  <p className="text-xs text-charcoal-500 font-light mt-1">
                    Fill out the details below and we will get back to you swiftly.
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
                      placeholder="e.g. Somesh Gupta"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Inquiry Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-serif"
                    >
                      <option value="Choosing a Rudraksha">Choosing the Right Mukhi</option>
                      <option value="Care & Conditioning">Care, Oiling & Maintenance</option>
                      <option value="Order & Tracking">Order & Delivery Status</option>
                      <option value="Packaging & Reuse">Packaging & Second-Life Query</option>
                      <option value="Other">Other Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-charcoal-700 font-medium mb-1">Your Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How may we assist your journey with sacred Rudraksha?"
                    className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 py-4 text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-elevated"
                  >
                    <Send className="w-4 h-4 text-copper-400" />
                    <span>Send Message to Custodians</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
