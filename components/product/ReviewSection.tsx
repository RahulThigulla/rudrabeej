'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, Check, MessageSquarePlus, X } from 'lucide-react';
import { Product, Review } from '@/types';
import { formatDate } from '@/lib/utils';

interface ReviewSectionProps {
  product: Product;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ product }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newTitle || !newComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: newLocation || 'India',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      title: newTitle,
      comment: newComment,
      verifiedPurchase: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewLocation('');
      setNewTitle('');
      setNewComment('');
    }, 1500);
  };

  return (
    <section className="bg-ivory-50/50 py-16 border-t border-kraft-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Overall Rating Breakdown */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-kraft-200 gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
              Verified Customer Reflections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal mt-1">
              Customer Reviews
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                  />
                ))}
              </div>
              <span className="font-mono text-sm font-medium text-charcoal-900">
                {product.rating.toFixed(1)} out of 5.0
              </span>
              <span className="text-xs text-charcoal-400 font-mono">
                ({reviewsList.length} verified reviews)
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 bg-white hover:bg-kraft-100 border border-kraft-300 text-charcoal-800 px-5 py-2.5 text-xs uppercase tracking-widest font-medium transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4 text-copper-600" />
            <span>Write a Reflection</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="pt-8 divide-y divide-kraft-200/80">
          {reviewsList.length === 0 ? (
            <p className="text-xs text-charcoal-500 py-6">Be the first to share a reflection for this authentic Rudraksha.</p>
          ) : (
            reviewsList.map((rev) => (
              <div key={rev.id} className="py-6 first:pt-0 last:pb-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-600">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-serif text-sm font-medium text-charcoal-900">
                      {rev.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-charcoal-400 font-mono">
                    {formatDate(rev.date)}
                  </span>
                </div>

                <p className="text-xs text-charcoal-600 font-light leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="flex items-center gap-2 text-[11px] text-charcoal-400 font-mono">
                  <span>{rev.author}</span>
                  <span>•</span>
                  <span>{rev.location}</span>
                  {rev.verifiedPurchase && (
                    <>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Custodian</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-ivory-50 border border-kraft-300 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-kraft-200 mb-5">
                <h3 className="font-serif text-lg font-medium text-charcoal-900">
                  Share Your Experience
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-charcoal-400 hover:text-charcoal-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <p className="font-serif text-base text-charcoal-900">Thank you for your reflection.</p>
                  <p className="text-xs text-charcoal-500 font-light">Your review has been verified and added.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-1 text-amber-600 focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${star <= newRating ? 'fill-current' : 'stroke-current'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-charcoal-700 font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="e.g. Anand S."
                        className="w-full bg-white border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                      />
                    </div>
                    <div>
                      <label className="block text-charcoal-700 font-medium mb-1">City / Region</label>
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="e.g. Pune, Maharashtra"
                        className="w-full bg-white border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Review Headline</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Remarkable texture and authentic presentation"
                      className="w-full bg-white border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>

                  <div>
                    <label className="block text-charcoal-700 font-medium mb-1">Your Reflection</label>
                    <textarea
                      rows={4}
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Describe the feel of the bead, unboxing experience, or second-life packaging..."
                      className="w-full bg-white border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-charcoal-900 text-ivory-50 py-3 text-xs uppercase tracking-widest font-medium hover:bg-charcoal-800 transition-colors"
                    >
                      Submit Reflection
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
