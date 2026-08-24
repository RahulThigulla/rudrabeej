'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Layers, Edit2, Check, X, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStock, setEditStock] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<string>('ACTIVE');
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStartEdit = (prod: any) => {
    setEditingId(prod.id);
    setEditPrice(prod.price);
    setEditStock(prod.stockQuantity || prod.stock || 10);
    setEditStatus(prod.status || 'ACTIVE');
  };

  const handleSaveEdit = async (id: string) => {
    setIsSaving(true);
    setMsg(null);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          price: editPrice,
          stockQuantity: editStock,
          status: editStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, price: editPrice, stockQuantity: editStock, status: editStatus } : p))
        );
        setEditingId(null);
        setMsg('✓ Product updated successfully');
        setTimeout(() => setMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.mukhi && `${p.mukhi} mukhi`.includes(searchQuery.toLowerCase())) ||
      (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kraft-200 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper-600">
            CATALOG & PRICING REGISTRY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium mt-0.5">
            Rudraksha Products Catalog
          </h1>
        </div>

        <button
          onClick={fetchProducts}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-kraft-300 text-xs font-mono text-charcoal-700 hover:text-charcoal-900 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {msg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
          {msg}
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white border border-kraft-300 p-4 sm:p-6 shadow-subtle flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by Mukhi (e.g. 5 Mukhi), Name, or SKU..."
            className="w-full bg-ivory-50 border border-kraft-300 px-3.5 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-kraft-500 font-mono"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-kraft-300 shadow-kraft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-kraft-200 bg-kraft-50/60 text-charcoal-600">
                <th className="py-3.5 px-4">CREATION</th>
                <th className="py-3.5 px-4">MUKHI</th>
                <th className="py-3.5 px-4">PRICE</th>
                <th className="py-3.5 px-4">STOCK</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kraft-200">
              {filtered.map((prod) => {
                const isEditing = editingId === prod.id;
                const stock = prod.stockQuantity !== undefined ? prod.stockQuantity : (prod.stock || 10);

                return (
                  <tr key={prod.id} className="hover:bg-ivory-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-ivory-50 border border-kraft-200 shrink-0 overflow-hidden">
                          <img src={prod.thumbnail} alt={prod.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-serif font-medium text-charcoal-900 text-sm">{prod.name}</p>
                          <p className="text-[10px] text-charcoal-400 font-mono">{prod.sanskritName || prod.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {prod.mukhi ? (
                        <span className="bg-kraft-100 text-charcoal-800 border border-kraft-300 px-2 py-0.5 text-[10px]">
                          {prod.mukhi} Mukhi
                        </span>
                      ) : (
                        <span className="text-charcoal-400">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-medium text-charcoal-900">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-24 bg-ivory-50 border border-kraft-400 px-2 py-1 text-xs"
                        />
                      ) : (
                        formatPrice(prod.price)
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editStock}
                          onChange={(e) => setEditStock(Number(e.target.value))}
                          className="w-20 bg-ivory-50 border border-kraft-400 px-2 py-1 text-xs"
                        />
                      ) : (
                        <span
                          className={`font-semibold ${
                            stock <= 4 ? 'text-red-700 font-bold' : 'text-charcoal-800'
                          }`}
                        >
                          {stock} units {stock <= 4 && '⚠️'}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {isEditing ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="bg-ivory-50 border border-kraft-400 px-2 py-1 text-xs"
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="DRAFT">DRAFT</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] uppercase font-mono ${
                            prod.status === 'ARCHIVED'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {prod.status || 'ACTIVE'}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(prod.id)}
                            disabled={isSaving}
                            className="bg-emerald-800 hover:bg-emerald-700 text-white p-1.5 shadow-xs"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-charcoal-200 hover:bg-charcoal-300 text-charcoal-800 p-1.5"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(prod)}
                          className="inline-flex items-center gap-1 bg-kraft-100 hover:bg-kraft-200 border border-kraft-300 text-charcoal-800 px-2.5 py-1 text-[11px] uppercase transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
