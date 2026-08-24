'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Newest Arrivals', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' },
  ];

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-xs uppercase tracking-widest font-mono text-charcoal-400">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border border-kraft-200 text-charcoal-800 text-xs py-2 pl-3 pr-8 focus:outline-none focus:border-kraft-500 cursor-pointer font-serif"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-500">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
