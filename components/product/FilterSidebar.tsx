'use client';

import React, { useState } from 'react';
import { X, RotateCcw, Check, ChevronDown } from 'lucide-react';
import { ProductCategory } from '@/types';
import { cn } from '@/lib/utils';

export interface FilterState {
  category: string;
  mukhi: number | null;
  priceRange: string;
  inStockOnly: boolean;
  sortBy: string;
}

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  totalCount,
  isOpenMobile,
  onCloseMobile
}) => {
  const [showAllMukhis, setShowAllMukhis] = useState(true);

  const categories: { label: string; value: string }[] = [
    { label: 'All Collections', value: 'all' },
    { label: 'Single Beads (1-21 Mukhi)', value: 'single-beads' },
    { label: 'Rare Collector Beads (15-21M)', value: 'rare-collector' },
    { label: 'Meditation Malas', value: 'malas' },
    { label: 'Copper Chains & Cappings', value: 'copper-chains' },
    { label: 'Heritage Gift Sets', value: 'gift-sets' },
  ];

  // All 1 to 21 Mukhis
  const allMukhiNumbers = Array.from({ length: 21 }, (_, i) => i + 1);

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹2,000', value: 'under-2000' },
    { label: '₹2,000 – ₹5,000', value: '2000-5000' },
    { label: '₹5,000 – ₹15,000', value: '5000-15000' },
    { label: 'Above ₹15,000 (Rare Heirlooms)', value: 'above-15000' },
  ];

  const handleReset = () => {
    setFilters({
      category: 'all',
      mukhi: null,
      priceRange: 'all',
      inStockOnly: false,
      sortBy: 'featured',
    });
  };

  const isFiltered =
    filters.category !== 'all' ||
    filters.mukhi !== null ||
    filters.priceRange !== 'all' ||
    filters.inStockOnly;

  const content = (
    <div className="space-y-8">
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-kraft-200">
        <div>
          <h3 className="font-serif text-lg font-medium text-charcoal-900">Refine Collection</h3>
          <p className="text-xs text-charcoal-400 font-mono mt-0.5">
            Showing {totalCount} {totalCount === 1 ? 'item' : 'items'}
          </p>
        </div>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="text-xs text-copper-600 hover:text-copper-800 flex items-center gap-1 font-mono transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-widest font-mono text-charcoal-500 font-medium">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setFilters((prev) => ({ ...prev, category: cat.value }))}
                className={cn(
                  'w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between border',
                  isSelected
                    ? 'bg-kraft-100/80 border-kraft-400 font-medium text-charcoal-900'
                    : 'bg-white border-transparent hover:border-kraft-200 text-charcoal-600'
                )}
              >
                <span>{cat.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-copper-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mukhi Filter (1 to 21 Mukhis) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs uppercase tracking-widest font-mono text-charcoal-500 font-medium">
            By Mukhi (1 – 21 Faces)
          </h4>
          {filters.mukhi && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, mukhi: null }))}
              className="text-[10px] text-copper-600 font-mono underline"
            >
              Clear ({filters.mukhi}M)
            </button>
          )}
        </div>

        {/* 1 to 21 Grid */}
        <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto p-1 border border-kraft-200 bg-white">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, mukhi: null }))}
            className={cn(
              'col-span-5 py-1.5 text-xs font-mono border transition-all text-center mb-1',
              filters.mukhi === null
                ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900 font-medium'
                : 'bg-ivory-50 text-charcoal-700 border-kraft-200 hover:border-kraft-400'
            )}
          >
            All Faces (1–21)
          </button>
          {allMukhiNumbers.map((m) => {
            const isSelected = filters.mukhi === m;
            return (
              <button
                key={m}
                onClick={() => setFilters((prev) => ({ ...prev, mukhi: isSelected ? null : m }))}
                className={cn(
                  'py-1.5 text-xs font-mono border transition-all text-center',
                  isSelected
                    ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900 font-medium shadow-sm'
                    : m >= 15
                    ? 'bg-kraft-100/50 text-charcoal-900 border-kraft-300 hover:border-copper-600'
                    : 'bg-white text-charcoal-700 border-kraft-200 hover:border-kraft-400'
                )}
                title={`${m} Mukhi Rudraksha`}
              >
                {m}M
              </button>
            );
          })}
        </div>
        <span className="text-[10px] text-charcoal-400 font-light block">
          • 15M–21M are rare consecrated heirloom specimens.
        </span>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-widest font-mono text-charcoal-500 font-medium">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {priceRanges.map((range) => {
            const isSelected = filters.priceRange === range.value;
            return (
              <button
                key={range.value}
                onClick={() => setFilters((prev) => ({ ...prev, priceRange: range.value }))}
                className={cn(
                  'w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between border',
                  isSelected
                    ? 'bg-kraft-100/80 border-kraft-400 font-medium text-charcoal-900'
                    : 'bg-white border-transparent hover:border-kraft-200 text-charcoal-600'
                )}
              >
                <span>{range.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-copper-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-2 border-t border-kraft-200">
        <label className="flex items-center justify-between cursor-pointer py-2">
          <span className="text-xs text-charcoal-700 font-medium">In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 text-copper-600 border-kraft-300 rounded focus:ring-copper-500"
          />
        </label>
      </div>

      {/* Packaging reassurance badge */}
      <div className="p-4 bg-kraft-100/50 border border-kraft-200 text-xs space-y-1">
        <p className="font-serif font-medium text-charcoal-900">The Rudrabeej Guarantee</p>
        <p className="text-[11px] text-charcoal-500 font-light leading-relaxed">
          100% natural, laboratory X-ray verified botanical seeds in recyclable, reusable Kraft Second-Life packaging.
        </p>
      </div>
    </div>
  );

  // Mobile Drawer
  if (isOpenMobile) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
        <div
          className="fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
        />
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-sm bg-ivory-50 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-kraft-200 mb-6">
                <span className="font-serif text-lg font-medium text-charcoal-900">Refine (1–21 Mukhis)</span>
                <button onClick={onCloseMobile} className="p-1 text-charcoal-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 border-t border-kraft-200 mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full bg-charcoal-900 text-ivory-50 py-3 text-xs uppercase tracking-widest font-medium"
              >
                Apply Filters ({totalCount} items)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Static Sidebar
  return <aside className="hidden lg:block w-64 shrink-0">{content}</aside>;
};
