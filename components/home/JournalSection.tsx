'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export const JournalSection: React.FC = () => {
  const articles = blogPosts.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
              The Rudrabeej Chronicle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal mt-1">
              From Seed to Symbol
            </h2>
            <p className="text-sm text-charcoal-500 font-light mt-1 max-w-md">
              Essays on sacred botany, Indian craftsmanship, mindful living, and sustainable packaging design.
            </p>
          </div>

          <Link
            href="/journal"
            className="text-xs uppercase tracking-widest font-medium text-copper-600 hover:text-copper-800 inline-flex items-center gap-1.5 border-b border-copper-600/40 pb-0.5 transition-colors self-start sm:self-auto"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                {/* Cover Image */}
                <Link
                  href={`/journal/${post.slug}`}
                  className="block aspect-[16/10] bg-ivory-100 overflow-hidden border border-kraft-200"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </Link>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-[11px] font-mono text-charcoal-400">
                  <span className="text-copper-600 uppercase tracking-widest font-medium">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                {/* Title & Excerpt */}
                <Link href={`/journal/${post.slug}`} className="block group-hover:text-copper-700 transition-colors">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-charcoal-900 leading-snug">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-xs text-charcoal-500 font-light leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              {/* Read Link */}
              <div className="pt-2">
                <Link
                  href={`/journal/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-charcoal-800 group-hover:text-copper-600 transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
