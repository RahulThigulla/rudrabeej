'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ArrowRight, RotateCcw, Check, Sparkles, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';

interface QuizOption {
  label: string;
  value: string;
  desc?: string;
}

interface QuizQuestion {
  id: 'formType' | 'purpose' | 'focus' | 'budget';
  question: string;
  options: QuizOption[];
}

export const RudrakshaQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{
    formType?: string;
    purpose?: string;
    focus?: string;
    budget?: string;
  }>({});

  const questions: QuizQuestion[] = [
    {
      id: 'formType',
      question: 'What form of Rudraksha are you looking for?',
      options: [
        { label: 'Single Sacred Bead (Pendant / Altar)', value: 'single-bead', desc: 'Worn close to heart or kept in your personal sanctuary.' },
        { label: '108+1 Japa Meditation Mala', value: 'mala', desc: 'Hand-knotted for mantra recitation and daily grounding.' },
        { label: 'Bead Strung in Pure Solid Copper', value: 'copper', desc: 'Traditional conductive capping with hand-linked copper chain.' },
        { label: 'Complete Heritage Gift Box', value: 'gift-box', desc: 'Includes bead, copper dish, consecrated oil, and keepsake case.' }
      ]
    },
    {
      id: 'purpose',
      question: 'Is this creation for yourself or a meaningful gift?',
      options: [
        { label: 'Personal Daily Wear & Practice', value: 'personal', desc: 'To anchor daily stillness, study, or meditation.' },
        { label: 'Auspicious Gift for Loved One / Milestone', value: 'gift', desc: 'Wedding, housewarming, or spiritual blessing.' },
        { label: 'Sacred Altar / Living Space Artifact', value: 'altar', desc: 'Placed in home or office for grounded ambiance.' }
      ]
    },
    {
      id: 'focus',
      question: 'Which traditional quality would you most like to cultivate?',
      options: [
        { label: 'Universal Calm, Grounding & Inner Balance', value: '5-mukhi', desc: 'Panchmukhi — suitable for everyone.' },
        { label: 'Courage, Willpower & Sustained Focus', value: '6-mukhi', desc: 'Shanmukhi — ideal for study, discipline & leadership.' },
        { label: 'Harmonious Relationships & Dual Synthesis', value: '2-mukhi', desc: 'Dwimukhi — balance of heart and mind.' },
        { label: 'Singular Awareness & Deep Meditation', value: '1-mukhi', desc: 'Ek Mukhi — rare crescent for higher contemplation.' }
      ]
    },
    {
      id: 'budget',
      question: 'What is your approximate budget preference?',
      options: [
        { label: 'Under ₹1,500', value: 'budget-1', desc: 'Accessible classical daily beads & cords.' },
        { label: '₹1,500 – ₹3,500', value: 'budget-2', desc: 'Hand-knotted 108 malas & pure copper pendants.' },
        { label: '₹3,500 – ₹10,000+', value: 'budget-3', desc: 'Rare consecrated Mukhis & heirloom gift sets.' },
        { label: 'Open to recommendations', value: 'budget-any', desc: 'Recommendations based on lifestyle suitability.' }
      ]
    }
  ];

  const handleSelectOption = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Show results
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  // Determine tailored recommendations based on answers
  const getRecommendations = (): Product[] => {
    if (answers.formType === 'mala') {
      return products.filter((p) => p.category === 'malas');
    }
    if (answers.formType === 'copper') {
      return products.filter((p) => p.category === 'copper-chains');
    }
    if (answers.formType === 'gift-box' || answers.purpose === 'gift') {
      return products.filter((p) => p.category === 'gift-sets' || p.badges?.includes('BESTSELLER')).slice(0, 2);
    }
    if (answers.focus === '6-mukhi') {
      return products.filter((p) => p.mukhi === 6);
    }
    if (answers.focus === '2-mukhi') {
      return products.filter((p) => p.mukhi === 2);
    }
    if (answers.focus === '1-mukhi') {
      return products.filter((p) => p.mukhi === 1);
    }
    // Default to universal Panchmukhi and bestsellers
    return products.slice(0, 2);
  };

  const recommendations = getRecommendations();

  return (
    <section id="quiz" className="bg-white border border-kraft-300 shadow-kraft p-6 sm:p-10 max-w-4xl mx-auto">
      
      {/* Quiz Header */}
      <div className="text-center space-y-2 pb-6 border-b border-kraft-200">
        <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-mono text-copper-600 font-medium">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Mindful Discovery Tool</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
          Which Rudraksha is Right for You?
        </h3>
        <p className="text-xs text-charcoal-500 font-light max-w-md mx-auto">
          Answer 4 quick questions to receive personalized recommendations based on classical traditions.
        </p>
      </div>

      {currentStep < questions.length ? (
        <div className="py-8 space-y-6">
          {/* Progress indicators */}
          <div className="flex items-center justify-between text-xs text-charcoal-400 font-mono">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-1 rounded-full ${
                    i <= currentStep ? 'bg-copper-600' : 'bg-kraft-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <h4 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-medium">
            {questions[currentStep].question}
          </h4>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {questions[currentStep].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelectOption(questions[currentStep].id, opt.value)}
                className="p-4 text-left border border-kraft-200 hover:border-copper-600 bg-ivory-50/50 hover:bg-kraft-50 transition-all duration-200 flex flex-col justify-between space-y-1 group"
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-sm font-medium text-charcoal-900 group-hover:text-copper-700">
                    {opt.label}
                  </span>
                  <div className="w-4 h-4 rounded-full border border-kraft-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-copper-600">
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-copper-600" />
                  </div>
                </div>
                {opt.desc && (
                  <p className="text-[11px] text-charcoal-500 font-light">
                    {opt.desc}
                  </p>
                )}
              </button>
            ))}
          </div>

          {/* Back button if not first step */}
          {currentStep > 0 && (
            <div className="pt-2">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs text-charcoal-500 hover:text-charcoal-900 font-mono underline"
              >
                ← Back to previous question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="py-8 space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2 bg-kraft-100/60 p-6 border border-kraft-300">
            <div className="w-8 h-8 mx-auto rounded-full bg-copper-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-medium">
              Your Recommended Creations
            </h4>
            <p className="text-xs text-charcoal-600 font-light max-w-md mx-auto">
              Based on your preferences, these authentic offerings align harmoniously with your requirements:
            </p>
          </div>

          {/* Recommended Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {recommendations.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          {/* Quiz Action Row */}
          <div className="pt-4 border-t border-kraft-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleReset}
              className="text-xs text-charcoal-500 hover:text-charcoal-900 font-mono inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Discovery Quiz</span>
            </button>

            <Link
              href="/shop"
              className="bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-6 py-3 text-xs font-medium uppercase tracking-widest transition-colors inline-flex items-center gap-2"
            >
              <span>Explore All Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </section>
  );
};
