'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Shield, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@rudrabeej.com');
  const [password, setPassword] = useState('Admin@123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid administrator credentials');
      }

      if (data.user.role !== 'ADMIN') {
        throw new Error('Access denied. Administrator privileges required.');
      }

      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 text-ivory-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-charcoal-900 border border-charcoal-800 p-8 sm:p-10 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-charcoal-800 border border-charcoal-700 text-copper-400 mb-2">
            <Lock className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h1 className="font-serif text-2xl tracking-widest uppercase text-ivory-100">
            RUDRABEEJ
          </h1>
          <p className="text-xs font-mono tracking-widest text-copper-400 uppercase">
            Sanctum Admin Console
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal-400 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-charcoal-950 border border-charcoal-700 px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-copper-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-charcoal-400 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-charcoal-950 border border-charcoal-700 px-3.5 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-copper-500 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-copper-600 hover:bg-copper-500 text-white py-3 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-subtle disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Enter Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="p-3 bg-charcoal-950/80 border border-charcoal-800 text-[11px] font-mono text-charcoal-400 space-y-1">
          <p className="text-ivory-300 font-semibold">Demo Credentials Prefilled:</p>
          <p>Email: <span className="text-copper-400">admin@rudrabeej.com</span></p>
          <p>Pass: <span className="text-copper-400">Admin@123</span></p>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs font-mono text-charcoal-500 hover:text-ivory-300 transition-colors">
            ← Return to Storefront
          </Link>
        </div>

      </div>
    </div>
  );
}
