import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowLeft, ArrowRight, Share2, Tag, BookOpen } from 'lucide-react';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Article Not Found | RUDRABEEJ' };
  }

  return {
    title: `${post.title} | RUDRABEEJ Chronicle`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <article className="bg-ivory-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation back */}
        <div>
          <Link
            href="/journal"
            className="text-xs uppercase font-mono tracking-widest text-charcoal-500 hover:text-charcoal-900 inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal Chronicle</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono text-charcoal-400">
            <span className="text-copper-600 uppercase tracking-widest font-medium">
              {post.category}
            </span>
            <span>•</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-charcoal-600 font-light leading-relaxed">
            {post.subtitle}
          </p>

          <div className="pt-4 border-t border-kraft-200 flex items-center justify-between text-xs text-charcoal-500 font-mono">
            <span>By <strong>{post.author.name}</strong> ({post.author.role})</span>
          </div>
        </header>

        {/* Cover Image */}
        <div className="aspect-[16/9] bg-charcoal-900 overflow-hidden border border-kraft-300 shadow-elevated">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formatted Content Body */}
        <div className="bg-white border border-kraft-300 p-8 sm:p-12 space-y-6 text-sm sm:text-base text-charcoal-700 font-light leading-relaxed shadow-subtle">
          <div className="prose prose-stone max-w-none space-y-6">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={idx} className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium pt-4">
                    {paragraph.replace('# ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h3 key={idx} className="font-serif text-xl sm:text-2xl text-charcoal-900 font-medium pt-3">
                    {paragraph.replace('## ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('> ')) {
                return (
                  <blockquote key={idx} className="p-4 bg-kraft-100/60 border-l-2 border-copper-500 font-serif italic text-charcoal-800 text-base my-4">
                    {paragraph.replace('> ', '')}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div className="pt-8 border-t border-kraft-200 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-charcoal-400">Filed under:</span>
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs bg-ivory-100 border border-kraft-200 text-charcoal-700 px-3 py-1 font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Reads */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-kraft-200">
            <h3 className="font-serif text-2xl text-charcoal-900 font-normal">
              Further Reflections
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((r) => (
                <Link
                  key={r.id}
                  href={`/journal/${r.slug}`}
                  className="bg-white border border-kraft-200 p-6 block hover:border-kraft-400 transition-colors group"
                >
                  <span className="text-[10px] uppercase font-mono text-copper-600 tracking-wider">
                    {r.category}
                  </span>
                  <h4 className="font-serif text-lg font-medium text-charcoal-900 group-hover:text-copper-700 transition-colors mt-1">
                    {r.title}
                  </h4>
                  <p className="text-xs text-charcoal-500 font-light mt-2 line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
