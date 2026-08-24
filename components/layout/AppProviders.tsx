'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNavigation } from '@/components/layout/MobileNavigation';
import { SearchModal } from '@/components/layout/SearchModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col justify-between bg-ivory-50 text-charcoal-800 selection:bg-kraft-300 selection:text-charcoal-900">
          <AnnouncementBar />
          <Header onOpenSearch={() => setIsSearchOpen(true)} />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNavigation />
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <CartDrawer />
          <WhatsAppButton />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
};
