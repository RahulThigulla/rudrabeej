'use client';

import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface StickyMobileCartCTAProps {
  product: Product;
  quantity: number;
}

export const StickyMobileCartCTA: React.FC<StickyMobileCartCTAProps> = ({ product, quantity }) => {
  const { addItem, setIsCartDrawerOpen } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div 
      className="lg:hidden fixed left-0 right-0 z-30 bg-white/98 backdrop-blur-lg border-t border-kraft-200/90 px-4 py-2.5 shadow-elevated flex items-center justify-between gap-3"
      style={{ bottom: 'calc(3.5rem + max(0.2rem, env(safe-area-inset-bottom, 0px)))' }}
    >
      <div className="min-w-0 flex-1">
        <span className="font-serif font-semibold text-charcoal-900 text-sm sm:text-base block truncate leading-tight">
          {formatPrice(product.price * quantity)}
        </span>
        <span className="text-[10px] text-charcoal-500 font-mono">
          {quantity} {quantity === 1 ? 'bead' : 'beads'} • {product.size}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleAdd}
          className="bg-charcoal-900 active:bg-charcoal-800 text-ivory-50 px-5 py-3 text-xs font-medium uppercase tracking-widest transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-copper-400" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
