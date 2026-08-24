import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'The Rudrabeej Chronicle | Journal & Essays on Sacred Botany',
  description:
    'Essays and guides on Rudraksha care, five-faced botanical significance, second-life packaging design, and timeless Indian craftsmanship.',
};

export default function JournalPage() {
  const categories = [
    'All Essays',
    'Rudraksha',
    'Packaging',
    'Craftsmanship',
    'Indian Traditions',
  ];

  return (
    <div className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-kraft-300 text-[11px] font-mono tracking-widest text-charcoal-700 uppercase">
            <BookOpen className="w-3.5 h-3.5 text-copper-600" />
            <span>The Rudrabeej Chronicle</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Stories, Botany & Craft
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 font-light leading-relaxed">
            Thoughtful essays exploring the intersection of sacred Indian botany, mindful material design, traditional metallurgy, and contemplative practice.
          </p>
        </div>

        {/* Lead Editorial Article */}
        {blogPosts[0] && (
          <div className="bg-white border border-kraft-300 shadow-kraft overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden">
                <img
                  src={blogPosts[0].coverImage}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-charcoal-400">
                  <span className="text-copper-600 uppercase tracking-widest font-medium">
                    Featured Essay
                  </span>
                  <span>•</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>

                <Link href={`/journal/${blogPosts[0].slug}`} className="block group-hover:text-copper-700 transition-colors">
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal leading-tight">
                    {blogPosts[0].title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
                  {blogPosts[0].subtitle}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/journal/${blogPosts[0].slug}`}
                    className="inline-flex items-center gap-2 bg-charcoal-900 text-ivory-50 px-6 py-3 text-xs font-medium uppercase tracking-widest hover:bg-charcoal-800 transition-colors"
                  >
                    <span>Read Full Essay</span>
                    <ArrowRight className="w-4 h-4 text-copper-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="bg-white border border-kraft-200 p-6 flex flex-col justify-between space-y-5 shadow-subtle hover:border-kraft-400 transition-colors group"
            >
              <div className="space-y-4">
                <Link
                  href={`/journal/${post.slug}`}
                  className="block aspect-[16/10] overflow-hidden bg-ivory-100 border border-kraft-200"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="flex items-center gap-2 text-[11px] font-mono text-charcoal-400">
                  <span className="text-copper-600 uppercase font-medium">{post.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <Link href={`/journal/${post.slug}`} className="block group-hover:text-copper-700 transition-colors">
                  <h3 className="font-serif text-lg font-medium text-charcoal-900 leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs text-charcoal-500 font-light line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-kraft-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-charcoal-400">
                  By {post.author.name}
                </span>
                <Link
                  href={`/journal/${post.slug}`}
                  className="text-xs font-mono uppercase text-charcoal-800 group-hover:text-copper-600 font-medium inline-flex items-center gap-1"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
