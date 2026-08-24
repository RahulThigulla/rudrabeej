'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const pathname = usePathname();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent('Namaste, I need help choosing an authentic Rudraksha.');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  const isProductPage = pathname.startsWith('/rudraksha/') && pathname.split('/').length > 2;

  return (
    <aside
      aria-label="Direct WhatsApp Concierge"
      className="fixed right-4 z-40 group flex items-center"
      style={{
        bottom: isProductPage
          ? 'calc(7.2rem + max(0.5rem, env(safe-area-inset-bottom, 0px)))'
          : 'calc(4.2rem + max(0.5rem, env(safe-area-inset-bottom, 0px)))'
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Rudraksha Concierge on WhatsApp"
        className="flex items-center gap-2 bg-charcoal-900/95 backdrop-blur-sm text-ivory-50 hover:bg-charcoal-800 border border-kraft-400/50 p-3 lg:px-4 lg:py-2.5 rounded-full shadow-elevated transition-all duration-300 active:scale-95"
      >
        <div className="w-5 h-5 flex items-center justify-center text-emerald-400">
          <MessageCircle className="w-5 h-5 fill-emerald-400/20" />
        </div>
        <span className="hidden lg:inline-block text-xs tracking-wider uppercase font-medium text-ivory-100 font-mono">
          Concierge
        </span>
      </a>
    </aside>
  );
};
