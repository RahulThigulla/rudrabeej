'use client';

import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-ivory-50 border-b border-kraft-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-10 h-10 mx-auto rounded-full bg-kraft-100 border border-kraft-300 flex items-center justify-center text-copper-600">
          <Mail className="w-5 h-5 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Stay Rooted.
          </h2>
          <p className="text-sm text-charcoal-600 font-light max-w-md mx-auto leading-relaxed">
            Stories, new seasonal harvests, and thoughtful notes from our world of sacred Rudraksha.
          </p>
        </div>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-kraft-300 text-xs font-mono text-charcoal-800 shadow-sm animate-in fade-in duration-200">
            <Check className="w-4 h-4 text-copper-600" />
            <span>Thank you for joining our circle. Namaste.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white border border-kraft-300 px-4 py-3 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-kraft-500 shadow-sm"
            />
            <button
              type="submit"
              className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-8 py-3 text-xs font-medium uppercase tracking-widest transition-colors shrink-0 shadow-sm"
            >
              Join Us
            </button>
          </form>
        )}

        <p className="text-[11px] text-charcoal-400 font-light">
          We send occasional, thoughtful writings. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
