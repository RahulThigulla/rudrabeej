'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, BookOpen, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const { itemCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Hide bottom nav on checkout to avoid obstructing forms and payments
  if (pathname === '/checkout') {
    return null;
  }

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory-50/98 backdrop-blur-lg border-t border-kraft-200/90 shadow-elevated"
      style={{ paddingBottom: 'max(0.35rem, env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center justify-around h-14 px-2">
        
        {/* Home */}
        <Link
          href="/"
          className={cn(
            'flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] tracking-wider uppercase font-mono transition-all active:scale-90',
            pathname === '/' ? 'text-copper-700 font-semibold' : 'text-charcoal-500 hover:text-charcoal-900'
          )}
        >
          <Home className={cn('w-5 h-5 stroke-[1.75]', pathname === '/' && 'text-copper-700')} />
          <span className="mt-0.5">Home</span>
        </Link>

        {/* Shop (1-21 Mukhis) */}
        <Link
          href="/shop"
          className={cn(
            'flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] tracking-wider uppercase font-mono transition-all active:scale-90',
            pathname.startsWith('/shop') || pathname.startsWith('/rudraksha')
              ? 'text-copper-700 font-semibold'
              : 'text-charcoal-500 hover:text-charcoal-900'
          )}
        >
          <Compass className={cn('w-5 h-5 stroke-[1.75]', (pathname.startsWith('/shop') || pathname.startsWith('/rudraksha')) && 'text-copper-700')} />
          <span className="mt-0.5">Shop</span>
        </Link>

        {/* Guide */}
        <Link
          href="/guide"
          className={cn(
            'flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] tracking-wider uppercase font-mono transition-all active:scale-90',
            pathname === '/guide' ? 'text-copper-700 font-semibold' : 'text-charcoal-500 hover:text-charcoal-900'
          )}
        >
          <BookOpen className={cn('w-5 h-5 stroke-[1.75]', pathname === '/guide' && 'text-copper-700')} />
          <span className="mt-0.5">Guide</span>
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={cn(
            'flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] tracking-wider uppercase font-mono transition-all active:scale-90 relative',
            pathname === '/wishlist' ? 'text-copper-700 font-semibold' : 'text-charcoal-500 hover:text-charcoal-900'
          )}
        >
          <div className="relative">
            <Heart className={cn('w-5 h-5 stroke-[1.75]', pathname === '/wishlist' && 'text-copper-700 fill-copper-100')} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-copper-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono font-medium shadow-xs">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="mt-0.5">Wishlist</span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center justify-center flex-1 h-full py-1 text-[10px] tracking-wider uppercase font-mono text-charcoal-500 hover:text-charcoal-900 transition-all active:scale-90 relative"
          aria-label="View Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-charcoal-900 text-ivory-100 text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono font-medium shadow-xs">
                {itemCount}
              </span>
            )}
          </div>
          <span className="mt-0.5">Cart</span>
        </button>

      </div>
    </nav>
  );
};
