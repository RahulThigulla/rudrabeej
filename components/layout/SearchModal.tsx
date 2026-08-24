'use client';

import React, { useState, useEffect, useId, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles, BookOpen, Package } from 'lucide-react';
import { products } from '@/data/products';
import { mukhiData } from '@/data/mukhi';
import { blogPosts } from '@/data/blog';
import { formatPrice } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchInputId = useId();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredProducts = trimmed
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          (p.mukhi && `${p.mukhi}`.includes(trimmed)) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          (p.sanskritName && p.sanskritName.toLowerCase().includes(trimmed))
      )
    : [];

  const filteredMukhis = trimmed
    ? mukhiData.filter(
        (m) =>
          m.name.toLowerCase().includes(trimmed) ||
          `${m.mukhi}`.includes(trimmed) ||
          m.summary.toLowerCase().includes(trimmed) ||
          m.rulingDeity.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredBlogs = trimmed
    ? blogPosts.filter(
        (b) =>
          b.title.toLowerCase().includes(trimmed) ||
          b.tags.some((t) => t.toLowerCase().includes(trimmed))
      )
    : [];

  const popularSearches = [
    'Panchmukhi Rudraksha',
    '108 Bead Mala',
    'Pure Copper Chain',
    'Gauri Shankar',
    'Mukhi Guide',
    'Second Life Packaging',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-ivory-50 border border-kraft-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Search Header Input */}
          <div className="p-4 sm:p-6 border-b border-kraft-200 bg-white flex items-center gap-3">
            <label htmlFor={searchInputId} className="sr-only">Search products, guides, and articles</label>
            <Search className="w-5 h-5 text-kraft-600 shrink-0" aria-hidden="true" />
            <input
              id={searchInputId}
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Mukhi (e.g. 5 Mukhi), mala, copper chain, guide..."
              className="w-full bg-transparent text-charcoal-900 placeholder:text-charcoal-400 text-base sm:text-lg font-light focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-charcoal-400 hover:text-charcoal-800 p-1"
                aria-label="Clear search input"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-charcoal-500 hover:text-charcoal-900 border-l border-kraft-200 pl-3 ml-1"
              aria-label="Close search modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Content */}
          <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
            {!trimmed ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono text-charcoal-400 mb-3">
                    Popular Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-xs bg-kraft-100 hover:bg-kraft-200 text-charcoal-800 px-3 py-1.5 border border-kraft-200 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-kraft-200 pt-5">
                  <h4 className="text-xs uppercase tracking-widest font-mono text-charcoal-400 mb-3">
                    Featured Collection
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.slice(0, 2).map((prod) => (
                      <Link
                        key={prod.id}
                        href={`/rudraksha/${prod.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 bg-white border border-kraft-200/70 hover:border-kraft-400 transition-all group"
                      >
                        <div className="w-12 h-12 bg-kraft-100 shrink-0 overflow-hidden relative">
                          <img
                            src={prod.thumbnail}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-serif font-medium text-charcoal-900 truncate">
                            {prod.name}
                          </p>
                          <p className="text-[11px] text-copper-600 font-mono">
                            {formatPrice(prod.price)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Product Matches */}
                {filteredProducts.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-mono text-charcoal-400 mb-3 flex items-center justify-between">
                      <span>Products ({filteredProducts.length})</span>
                    </h4>
                    <div className="divide-y divide-kraft-200 bg-white border border-kraft-200">
                      {filteredProducts.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/rudraksha/${prod.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 hover:bg-kraft-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-kraft-100 shrink-0 overflow-hidden">
                              <img
                                src={prod.thumbnail}
                                alt={prod.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-serif font-medium text-charcoal-900 group-hover:text-copper-600 transition-colors">
                                {prod.name}
                              </p>
                              <p className="text-xs text-charcoal-500 font-light line-clamp-1">
                                {prod.shortDescription}
                              </p>
                            </div>
                          </div>
                          <div className="text-right pl-3 shrink-0">
                            <p className="text-xs font-mono font-medium text-charcoal-900">
                              {formatPrice(prod.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mukhi Matches */}
                {filteredMukhis.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-mono text-charcoal-400 mb-3">
                      Mukhi Guide References
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredMukhis.map((mukhi) => (
                        <Link
                          key={mukhi.mukhi}
                          href={`/guide#mukhi-${mukhi.mukhi}`}
                          onClick={onClose}
                          className="p-3 bg-white border border-kraft-200 hover:border-kraft-400 transition-all flex items-start gap-3 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-kraft-200 text-charcoal-900 flex items-center justify-center font-serif text-xs shrink-0">
                            {mukhi.mukhi}M
                          </div>
                          <div>
                            <p className="text-xs font-serif font-medium text-charcoal-900 group-hover:text-copper-600">
                              {mukhi.name} ({mukhi.sanskritTitle})
                            </p>
                            <p className="text-[11px] text-charcoal-500 line-clamp-1">
                              {mukhi.summary}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Matches */}
                {filteredBlogs.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-mono text-charcoal-400 mb-3">
                      Journal Articles
                    </h4>
                    <div className="space-y-2">
                      {filteredBlogs.map((b) => (
                        <Link
                          key={b.id}
                          href={`/journal/${b.slug}`}
                          onClick={onClose}
                          className="block p-3 bg-white border border-kraft-200 hover:border-kraft-400 transition-colors"
                        >
                          <p className="text-xs font-serif font-medium text-charcoal-900 hover:text-copper-600">
                            {b.title}
                          </p>
                          <p className="text-[11px] text-charcoal-500 font-light mt-0.5">
                            {b.excerpt}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {filteredProducts.length === 0 &&
                  filteredMukhis.length === 0 &&
                  filteredBlogs.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-charcoal-500 font-light">
                        No results found for &ldquo;{query}&rdquo;.
                      </p>
                      <p className="text-xs text-charcoal-400 mt-1">
                        Try searching for &ldquo;Panchmukhi&rdquo;, &ldquo;Mala&rdquo;, &ldquo;Copper&rdquo; or browse our catalog.
                      </p>
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Footer of modal */}
          <div className="p-4 bg-kraft-100 border-t border-kraft-200 flex items-center justify-between text-xs text-charcoal-600">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-kraft-300 font-mono text-[10px]">ESC</kbd> to close</span>
            <Link
              href="/shop"
              onClick={onClose}
              className="text-copper-600 font-medium hover:underline inline-flex items-center gap-1"
            >
              <span>View full collection</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
