'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const pathname = usePathname();

  const { itemCount, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Shop All', href: '/shop' },
    { label: 'Rudraksha', href: '/rudraksha' },
    { label: 'Mukhi Guide', href: '/guide' },
    { label: 'Packaging Story', href: '/packaging' },
    { label: 'Our Story', href: '/about' },
    { label: 'Journal', href: '/journal' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300 border-b',
        isScrolled
          ? 'bg-ivory-50/95 backdrop-blur-md border-kraft-200 py-3 shadow-subtle'
          : 'bg-ivory-50/80 backdrop-blur-sm border-kraft-200/60 py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-charcoal-800 hover:text-kraft-600 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-light tracking-widest text-charcoal-900 group-hover:text-kraft-700 transition-colors">
                  RUDRABEEJ
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-copper-500 mb-1"></span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-charcoal-500 font-serif italic uppercase -mt-0.5">
                The Seed of Rudra.
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13px] font-medium tracking-editorial uppercase text-charcoal-700">
            <Link
              href="/shop"
              className={cn(
                'transition-colors hover:text-copper-600 relative py-1',
                pathname === '/shop' ? 'text-copper-600 after:w-full' : 'text-charcoal-700 after:w-0'
              )}
            >
              Shop
            </Link>

            <Link
              href="/rudraksha"
              className={cn(
                'transition-colors hover:text-copper-600 relative py-1',
                pathname.startsWith('/rudraksha') ? 'text-copper-600' : 'text-charcoal-700'
              )}
            >
              Rudraksha
            </Link>

            <Link
              href="/guide"
              className={cn(
                'transition-colors hover:text-copper-600 relative py-1',
                pathname === '/guide' ? 'text-copper-600' : 'text-charcoal-700'
              )}
            >
              Mukhi Guide
            </Link>

            <Link
              href="/packaging"
              className={cn(
                'transition-colors hover:text-copper-600 relative py-1 flex items-center gap-1.5',
                pathname === '/packaging' ? 'text-copper-600' : 'text-charcoal-700'
              )}
            >
              <span>Plant Seeds Story</span>
              <span className="bg-kraft-200 text-charcoal-800 text-[9px] px-1.5 py-0.5 rounded font-mono tracking-normal">
                Story
              </span>
            </Link>

            <Link
              href="/about"
              className={cn(
                'transition-colors hover:text-copper-600 relative py-1',
                pathname === '/about' ? 'text-copper-600' : 'text-charcoal-700'
              )}
            >
              Our Story
            </Link>

            <Link
              href="/journal"
              className={cn(
                'transition-colors hover:text-copper-600 relative py-1',
                pathname.startsWith('/journal') ? 'text-copper-600' : 'text-charcoal-700'
              )}
            >
              Journal
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-charcoal-800">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-charcoal-700 hover:text-kraft-700 transition-colors focus:outline-none"
              aria-label="Search store"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Link (Desktop) */}
            <Link
              href="/account"
              className="hidden sm:block p-2 text-charcoal-700 hover:text-kraft-700 transition-colors"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              className="p-2 text-charcoal-700 hover:text-kraft-700 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-kraft-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-charcoal-800 hover:text-kraft-700 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-charcoal-900 text-ivory-100 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-medium">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] z-50 bg-ivory-50/98 backdrop-blur-lg border-t border-kraft-200 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            <div className="border-b border-kraft-200 pb-4">
              <span className="text-[10px] uppercase tracking-widest text-charcoal-400 font-mono">
                Explore Collections
              </span>
            </div>
            
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-lg font-serif tracking-wide py-1 flex items-center justify-between',
                    pathname === link.href ? 'text-copper-600 font-normal' : 'text-charcoal-800 font-light'
                  )}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-charcoal-400" />
                </Link>
              ))}
              <Link
                href="/gifting"
                className="text-lg font-serif tracking-wide py-1 text-charcoal-800 flex items-center justify-between font-light"
              >
                <span>Gifting & Bulk Orders</span>
                <ArrowRight className="w-4 h-4 text-charcoal-400" />
              </Link>
              <Link
                href="/authenticity"
                className="text-lg font-serif tracking-wide py-1 text-charcoal-800 flex items-center justify-between font-light"
              >
                <span>Authenticity Promise</span>
                <ArrowRight className="w-4 h-4 text-charcoal-400" />
              </Link>
            </nav>
          </div>

          <div className="pt-8 border-t border-kraft-200 space-y-4">
            <Link
              href="/track-order"
              className="text-xs uppercase tracking-widest text-charcoal-600 block hover:text-copper-600"
            >
              Track Your Order
            </Link>
            <div className="text-xs text-charcoal-400">
              Need assistance? WhatsApp us at <span className="text-charcoal-800">+91 98765 43210</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
