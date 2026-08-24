'use client';

import React, { useState, useRef } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { ProductImage } from '@/types';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeImage = images[selectedIndex] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Large Image Container with Zoom */}
      <div
        className="relative aspect-square w-full bg-ivory-50 border border-kraft-200 overflow-hidden cursor-pointer sm:cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsLightboxOpen(true)}
      >
        <img
          src={activeImage.url}
          alt={activeImage.alt || productName}
          className={cn(
            'w-full h-full object-cover transition-transform duration-200',
            isZoomed ? 'sm:scale-150' : 'scale-100'
          )}
          style={
            isZoomed
              ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                }
              : undefined
          }
        />

        {/* Second-Life Packaging Badge */}
        {activeImage.type === 'second-life' && (
          <div className="absolute top-3 left-3 bg-kraft-800/90 backdrop-blur-sm text-ivory-100 px-2.5 py-1 text-[10px] font-mono tracking-wider flex items-center gap-1.5 shadow-md">
            <Package className="w-3.5 h-3.5 text-copper-400" />
            <span>Second-Life Display View</span>
          </div>
        )}

        {/* Mobile Left / Right Tap Arrows */}
        {images.length > 1 && (
          <div className="sm:hidden absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/90 text-charcoal-900 flex items-center justify-center pointer-events-auto shadow-sm active:scale-90"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-white/90 text-charcoal-900 flex items-center justify-center pointer-events-auto shadow-sm active:scale-90"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mobile Pagination Dot Indicator */}
        <div className="sm:hidden absolute bottom-2.5 inset-x-0 flex justify-center gap-1.5 pointer-events-none">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all',
                selectedIndex === idx ? 'bg-charcoal-900 w-4' : 'bg-charcoal-400/60'
              )}
            />
          ))}
        </div>

        {/* Desktop Lightbox / Zoom hint */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          className="hidden sm:flex absolute bottom-3 right-3 bg-white/90 hover:bg-white text-charcoal-800 p-2 rounded-full border border-kraft-200 shadow-subtle transition-transform hover:scale-105"
          aria-label="Open fullscreen image"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Thumbnails row (Horizontal Touch Slider) */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={cn(
              'relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 border bg-ivory-50 overflow-hidden transition-all duration-200 active:scale-95',
              selectedIndex === idx
                ? 'border-copper-600 ring-1 ring-copper-600'
                : 'border-kraft-200 opacity-60 hover:opacity-100'
            )}
          >
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            {img.type === 'second-life' && (
              <span className="absolute bottom-0 inset-x-0 bg-charcoal-900/80 text-white text-[8px] font-mono text-center py-0.5">
                Reuse
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-ivory-200 hover:text-white p-2.5 rounded-full border border-charcoal-700 bg-charcoal-800 active:scale-90"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 text-ivory-200 hover:text-white p-2.5 rounded-full bg-charcoal-800/80 border border-charcoal-700 active:scale-90"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 text-ivory-200 hover:text-white p-2.5 rounded-full bg-charcoal-800/80 border border-charcoal-700 active:scale-90"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Lightbox Main Image */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center px-4">
            <img
              src={activeImage.url}
              alt={activeImage.alt}
              className="max-w-full max-h-[70vh] object-contain border border-charcoal-800 shadow-2xl"
            />
            <p className="text-xs text-charcoal-400 font-light mt-3 text-center max-w-lg font-serif">
              {activeImage.alt}
            </p>
            <p className="text-[10px] text-charcoal-500 font-mono mt-0.5">
              {selectedIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
