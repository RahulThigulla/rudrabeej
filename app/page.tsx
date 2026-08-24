import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustStrip } from '@/components/home/TrustStrip';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { MukhiSection } from '@/components/home/MukhiSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { PackagingTransformation } from '@/components/product/PackagingTransformation';
import { BestSellersSection } from '@/components/home/BestSellersSection';
import { EducationSection } from '@/components/home/EducationSection';
import { GiftingSection } from '@/components/home/GiftingSection';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import { JournalSection } from '@/components/home/JournalSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Strip (Authentic, Tradition, Plant Seeds, Mindful) */}
      <TrustStrip />

      {/* 3. Featured Rudraksha Collection */}
      <FeaturedCollection />

      {/* 4. Shop by Mukhi (Interactive Horizontal Selector) */}
      <MukhiSection />

      {/* 5. Brand Story */}
      <BrandStorySection />

      {/* 6. Packaging & Plant Seeds Ritual */}
      <PackagingTransformation />

      {/* 7. Best Sellers */}
      <BestSellersSection />

      {/* 8. Rudraksha Education & Quiz Teaser */}
      <EducationSection />

      {/* 9. Gifting (Personal, Wedding, Corporate) */}
      <GiftingSection />

      {/* 10. Customer Testimonials */}
      <TestimonialSection />

      {/* 11. Journal / Chronicle */}
      <JournalSection />

      {/* 12. Newsletter ("Stay Rooted") */}
      <NewsletterSection />

      {/* 13. Final CTA ("Carry the tradition forward") */}
      <FinalCTASection />
    </div>
  );
}
