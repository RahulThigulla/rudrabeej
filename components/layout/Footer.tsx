'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Package, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-charcoal-900 text-ivory-100 pt-16 pb-24 lg:pb-12 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Header & Second-Life Concept Banner */}
        <div className="pb-12 border-b border-charcoal-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl tracking-widest text-ivory-50">RUDRABEEJ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-copper-500"></span>
            </div>
            <p className="text-xs font-serif italic text-kraft-300 tracking-wider">
              The Seed of Rudra.
            </p>
            <p className="text-charcoal-300 text-xs sm:text-sm font-light max-w-md leading-relaxed">
              Rudraksha is born of Shiva’s tears. In timeless stillness, those sacred drops touched the earth, and the sacred trees arose. We preserve and present this divine seed with pure reverence and unbleached second-life packaging.
            </p>
          </div>

          <div className="lg:col-span-7 bg-charcoal-800/60 border border-charcoal-700/80 p-5 sm:p-6 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-kraft-900/60 border border-copper-500/40 flex items-center justify-center text-copper-400 shrink-0 mt-0.5">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-medium tracking-wide text-ivory-100 font-serif">
                  "Don't Throw It Away."
                </h4>
                <p className="text-xs text-charcoal-300 font-light mt-0.5">
                  Our unbleached kraft boxes transform into keepsake altar stands.
                </p>
              </div>
            </div>
            <Link
              href="/packaging"
              className="text-xs text-kraft-300 hover:text-white inline-flex items-center gap-1 uppercase tracking-widest border-b border-kraft-500/50 pb-0.5 transition-colors shrink-0"
            >
              <span>Explore Packaging</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Multi-column Navigation Links */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-10 border-b border-charcoal-800 text-sm">
          
          {/* Shop */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-kraft-400">Shop</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-300 font-light">
              <li><Link href="/shop" className="hover:text-ivory-100 transition-colors">All Products</Link></li>
              <li><Link href="/rudraksha" className="hover:text-ivory-100 transition-colors">Single Beads</Link></li>
              <li><Link href="/shop?category=malas" className="hover:text-ivory-100 transition-colors">Meditation Malas</Link></li>
              <li><Link href="/shop?category=copper-chains" className="hover:text-ivory-100 transition-colors">Copper Chains & Cappings</Link></li>
              <li><Link href="/gifting" className="hover:text-ivory-100 transition-colors">Heritage Gift Sets</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-kraft-400">Learn</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-300 font-light">
              <li><Link href="/guide" className="hover:text-ivory-100 transition-colors">Rudraksha Mukhi Guide</Link></li>
              <li><Link href="/guide#quiz" className="hover:text-ivory-100 transition-colors">Which Bead is Right for You?</Link></li>
              <li><Link href="/authenticity" className="hover:text-ivory-100 transition-colors">Authenticity Promise</Link></li>
              <li><Link href="/journal/how-to-care-for-your-rudraksha" className="hover:text-ivory-100 transition-colors">Care & Cleansing Guide</Link></li>
              <li><Link href="/faq" className="hover:text-ivory-100 transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-kraft-400">About</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-300 font-light">
              <li><Link href="/about" className="hover:text-ivory-100 transition-colors">Our Story & Roots</Link></li>
              <li><Link href="/packaging" className="hover:text-ivory-100 transition-colors">Eco-Jute & Plant Seeds</Link></li>
              <li><Link href="/journal" className="hover:text-ivory-100 transition-colors">The Rudrabeej Journal</Link></li>
              <li><Link href="/bulk-orders" className="hover:text-ivory-100 transition-colors">Corporate & Wedding Gifting</Link></li>
              <li><Link href="/contact" className="hover:text-ivory-100 transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-kraft-400">Help</h4>
            <ul className="space-y-2.5 text-xs text-charcoal-300 font-light">
              <li><Link href="/track-order" className="hover:text-ivory-100 transition-colors">Track Your Order</Link></li>
              <li><Link href="/legal/shipping" className="hover:text-ivory-100 transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/legal/refund" className="hover:text-ivory-100 transition-colors">Returns & Replacements</Link></li>
              <li><Link href="/account" className="hover:text-ivory-100 transition-colors">Account Portal</Link></li>
              <li><Link href="/contact" className="hover:text-ivory-100 transition-colors">Direct WhatsApp Support</Link></li>
            </ul>
          </div>

          {/* Newsletter / Stay Rooted */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-kraft-400">Stay Rooted</h4>
            <p className="text-xs text-charcoal-300 font-light leading-relaxed">
              Stories, new seasonal harvests, and thoughtful notes from our world.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-kraft-300 bg-charcoal-800 p-2.5 border border-kraft-700/50">
                <Check className="w-4 h-4 text-copper-400" />
                <span>You are subscribed. Namaste.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-charcoal-800 border border-charcoal-700 px-3 py-2 text-xs text-ivory-100 placeholder:text-charcoal-400 focus:outline-none focus:border-kraft-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-kraft-500 text-charcoal-900 text-[11px] font-medium tracking-wider uppercase hover:bg-kraft-400 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal, Disclaimer & Socials */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-charcoal-400 font-light">
          <div className="space-y-2 text-center md:text-left">
            <p>© {new Date().getFullYear()} RUDRABEEJ HERITAGE CRAFTS. All rights reserved.</p>
            <p className="text-[11px] text-charcoal-500 max-w-2xl leading-normal">
              Traditional and spiritual associations mentioned on this website are rooted in classical Indian heritage and historical lore. They are not intended as medical, scientific, or healthcare claims.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/legal/privacy" className="hover:text-ivory-100 transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-ivory-100 transition-colors">Terms</Link>
            <Link href="/legal/shipping" className="hover:text-ivory-100 transition-colors">Shipping</Link>
            <Link href="/legal/refund" className="hover:text-ivory-100 transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
