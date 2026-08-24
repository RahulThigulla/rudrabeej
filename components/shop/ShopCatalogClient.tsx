'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Crown } from 'lucide-react';
import { products as allProducts } from '@/data/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar, FilterState } from '@/components/product/FilterSidebar';
import { SortDropdown } from '@/components/product/SortDropdown';
import { cn } from '@/lib/utils';

interface ShopCatalogClientProps {
  initialCategory?: string;
  initialMukhi?: number | null;
  pageTitle?: string;
  pageSubtitle?: string;
}

export const ShopCatalogClient: React.FC<ShopCatalogClientProps> = ({
  initialCategory = 'all',
  initialMukhi = null,
  pageTitle = 'The Rudraksha Collection (1 to 21 Mukhis)',
  pageSubtitle = 'Explore our collection of naturally distinctive Rudraksha beads (1 to 21 Mukhi varieties), sacred malas, pure copper chains, and second-life keepsake gift sets.'
}) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || initialCategory;
  const mukhiParam = searchParams.get('mukhi') ? parseInt(searchParams.get('mukhi')!) : initialMukhi;

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam,
    mukhi: mukhiParam,
    priceRange: 'all',
    inStockOnly: false,
    sortBy: 'featured',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const allMukhis = Array.from({ length: 21 }, (_, i) => i + 1);

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category filter
        if (filters.category !== 'all' && product.category !== filters.category) {
          return false;
        }

        // Mukhi filter
        if (filters.mukhi !== null && product.mukhi !== filters.mukhi) {
          return false;
        }

        // Price range filter
        if (filters.priceRange === 'under-2000' && product.price >= 2000) {
          return false;
        }
        if (filters.priceRange === '2000-5000' && (product.price < 2000 || product.price > 5000)) {
          return false;
        }
        if (filters.priceRange === '5000-15000' && (product.price < 5000 || product.price > 15000)) {
          return false;
        }
        if (filters.priceRange === 'above-15000' && product.price <= 15000) {
          return false;
        }

        // Stock filter
        if (filters.inStockOnly && product.availability !== 'in-stock') {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0; // featured
      });
  }, [filters]);

  return (
    <div className="bg-ivory-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Banner */}
        <div className="border-b border-kraft-200 pb-8 text-center sm:text-left space-y-2">
          <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
            Natural • 1 to 21 Mukhi Varieties • Reusable Packaging
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            {pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light max-w-2xl leading-relaxed">
            {pageSubtitle}
          </p>
        </div>

        {/* 1 to 21 Mukhi Quick-Filter Strip */}
        <div className="bg-white border border-kraft-200 p-4 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between text-xs font-mono text-charcoal-500">
            <span>Filter by Mukhi (1 – 21):</span>
            {filters.mukhi && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, mukhi: null }))}
                className="text-copper-600 underline text-[11px]"
              >
                Clear filter ({filters.mukhi} Mukhi)
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, mukhi: null }))}
              className={cn(
                'px-3 py-1.5 text-xs font-mono border transition-all shrink-0',
                filters.mukhi === null
                  ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900'
                  : 'bg-ivory-50 text-charcoal-700 border-kraft-300 hover:border-kraft-500'
              )}
            >
              All (1–21)
            </button>
            {allMukhis.map((m) => {
              const isSelected = filters.mukhi === m;
              const isRare = m >= 15;
              return (
                <button
                  key={m}
                  onClick={() => setFilters((prev) => ({ ...prev, mukhi: isSelected ? null : m }))}
                  className={cn(
                    'w-9 h-9 flex items-center justify-center text-xs font-mono border transition-all shrink-0 relative',
                    isSelected
                      ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900 shadow-sm ring-1 ring-copper-500'
                      : isRare
                      ? 'bg-kraft-100 text-charcoal-900 border-kraft-300 hover:border-copper-600'
                      : 'bg-white text-charcoal-700 border-kraft-200 hover:border-kraft-400'
                  )}
                  title={`${m} Mukhi`}
                >
                  <span>{m}M</span>
                  {isRare && !isSelected && (
                    <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-copper-500"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Filter & Sort Bar */}
        <div className="flex lg:hidden items-center justify-between gap-4 p-3 bg-white border border-kraft-200">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-charcoal-800"
          >
            <SlidersHorizontal className="w-4 h-4 text-copper-600" />
            <span>Refine ({filteredProducts.length})</span>
          </button>

          <SortDropdown
            value={filters.sortBy}
            onChange={(val) => setFilters((prev) => ({ ...prev, sortBy: val }))}
          />
        </div>

        {/* Main Content: Sidebar + Product Grid */}
        <div className="flex gap-10 items-start">
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            totalCount={filteredProducts.length}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
          />

          {/* Right Product Grid Area */}
          <div className="flex-1 space-y-6">
            {/* Desktop Sort Row */}
            <div className="hidden lg:flex items-center justify-between pb-4 border-b border-kraft-200/80">
              <span className="text-xs text-charcoal-500 font-mono">
                Showing <strong>{filteredProducts.length}</strong> creations
              </span>

              <SortDropdown
                value={filters.sortBy}
                onChange={(val) => setFilters((prev) => ({ ...prev, sortBy: val }))}
              />
            </div>

            {/* Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>

      </div>
    </div>
  );
};
