import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-ivory-50 min-h-[75vh] flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md bg-white border border-kraft-300 p-10 shadow-kraft">
        <div className="w-16 h-16 mx-auto rounded-full bg-kraft-100 flex items-center justify-center text-copper-600">
          <Compass className="w-8 h-8 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper-600">
            Error 404 • Path Unfound
          </span>
          <h1 className="font-serif text-3xl text-charcoal-900 font-normal">
            A Stillness in the Journey
          </h1>
          <p className="text-xs text-charcoal-500 font-light leading-relaxed">
            The page you seek has moved or does not exist in our digital sanctum. Let us guide you back to our sacred collections.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto bg-charcoal-900 text-ivory-50 px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto border border-kraft-300 text-charcoal-800 px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-kraft-100 transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
