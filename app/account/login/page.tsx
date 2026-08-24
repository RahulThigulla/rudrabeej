'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Lock, ArrowRight, Loader2, AlertCircle, Mail, Phone } from 'lucide-react';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister ? { name, email, password, phone } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || 'Authentication failed');
      }

      router.push('/account');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50 py-12 sm:py-20 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-kraft-300 shadow-kraft p-8 sm:p-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-kraft-100 border border-kraft-300 text-charcoal-900 mb-2">
            <User className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h1 className="font-serif text-2xl text-charcoal-900 font-medium">
            {isRegister ? 'Join Sacred Heritage Circle' : 'Welcome Back'}
          </h1>
          <p className="text-xs text-charcoal-500 font-light">
            {isRegister
              ? 'Create your Rudrabeej account to track orders & save sanctum items'
              : 'Sign in to access your sacred acquisitions & saved addresses'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border border-kraft-300 p-1 bg-ivory-50 text-xs font-mono">
          <button
            type="button"
            onClick={() => { setIsRegister(false); setError(null); }}
            className={`py-1.5 transition-colors ${!isRegister ? 'bg-charcoal-900 text-ivory-50 shadow-xs' : 'text-charcoal-600 hover:text-charcoal-900'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(true); setError(null); }}
            className={`py-1.5 transition-colors ${isRegister ? 'bg-charcoal-900 text-ivory-50 shadow-xs' : 'text-charcoal-600 hover:text-charcoal-900'}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {isRegister && (
            <div>
              <label className="block text-charcoal-700 uppercase mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aditya Sharma"
                className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
              />
            </div>
          )}

          <div>
            <label className="block text-charcoal-700 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-sans"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-charcoal-700 uppercase mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
              />
            </div>
          )}

          <div>
            <label className="block text-charcoal-700 uppercase mb-1">Password *</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 py-3 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-copper-400" />
            ) : (
              <>
                <span>{isRegister ? 'Complete Registration' : 'Sign In to Account'}</span>
                <ArrowRight className="w-4 h-4 text-copper-400" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] font-mono text-charcoal-500">
          <Link href="/track-order" className="hover:text-charcoal-900 underline">
            Looking to track an order as a guest? Click here →
          </Link>
        </div>

      </div>
    </div>
  );
}
