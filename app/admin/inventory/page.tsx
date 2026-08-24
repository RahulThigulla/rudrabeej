'use client';

import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, Plus, RefreshCw, Check, X, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [restockModal, setRestockModal] = useState<{ id: string; name: string; currentStock: number } | null>(null);
  const [addQty, setAddQty] = useState<number>(10);
  const [reason, setReason] = useState<string>('Sacred Himalayan Harvest Restock');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/inventory');
      const data = await res.json();
      if (data.success) {
        setInventory(data.inventory || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleRestock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restockModal) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: restockModal.id,
          changeQuantity: addQty,
          reason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setInventory((prev) =>
          prev.map((item) =>
            item.id === restockModal.id ? { ...item, stockQuantity: (item.stockQuantity || 0) + addQty } : item
          )
        );
        setMsg(`✓ Restocked +${addQty} units for ${restockModal.name}`);
        setRestockModal(null);
        setTimeout(() => setMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const lowStockItems = inventory.filter((i) => (i.stockQuantity || 0) <= 4 && (i.stockQuantity || 0) > 0);
  const outOfStockItems = inventory.filter((i) => (i.stockQuantity || 0) === 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-kraft-200 pb-5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-copper-600">
            SANCTUM STOCK REPOSITORY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-medium mt-0.5">
            Inventory & Stock Control
          </h1>
        </div>

        <button
          onClick={fetchInventory}
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

      {/* Stock Health Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-kraft-300 p-4 shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-charcoal-400">Total Tracked Items</p>
            <p className="font-serif text-2xl font-medium text-charcoal-900 mt-1">{inventory.length}</p>
          </div>
          <Package className="w-6 h-6 text-charcoal-400 stroke-[1.5]" />
        </div>

        <div className="bg-amber-50/70 border border-amber-200 p-4 shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-medium">Low Stock Warning (&lt; 5)</p>
            <p className="font-serif text-2xl font-medium text-amber-900 mt-1">{lowStockItems.length} items</p>
          </div>
          <AlertTriangle className="w-6 h-6 text-amber-600 stroke-[1.5]" />
        </div>

        <div className="bg-red-50/70 border border-red-200 p-4 shadow-subtle flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-red-800 font-medium">Out of Stock</p>
            <p className="font-serif text-2xl font-medium text-red-900 mt-1">{outOfStockItems.length} items</p>
          </div>
          <AlertTriangle className="w-6 h-6 text-red-600 stroke-[1.5]" />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-kraft-300 shadow-kraft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="border-b border-kraft-200 bg-kraft-50/60 text-charcoal-600">
                <th className="py-3.5 px-4">PRODUCT</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">MUKHI</th>
                <th className="py-3.5 px-4">CURRENT STOCK</th>
                <th className="py-3.5 px-4">STOCK HEALTH</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kraft-200">
              {inventory.map((item) => {
                const stock = item.stockQuantity !== undefined ? item.stockQuantity : 10;
                let statusBadge = (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[10px] uppercase">
                    IN STOCK
                  </span>
                );

                if (stock === 0) {
                  statusBadge = (
                    <span className="bg-red-100 text-red-900 border border-red-300 px-2 py-0.5 text-[10px] font-bold uppercase">
                      OUT OF STOCK
                    </span>
                  );
                } else if (stock <= 4) {
                  statusBadge = (
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase">
                      LOW STOCK (REORDER)
                    </span>
                  );
                }

                return (
                  <tr key={item.id} className="hover:bg-ivory-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-ivory-50 border border-kraft-200 shrink-0 overflow-hidden">
                          <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-serif font-medium text-charcoal-900 text-sm">{item.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-charcoal-500 font-mono">
                      {item.sku || `RB-${item.id.slice(0, 8)}`}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.mukhi ? `${item.mukhi} Mukhi` : '—'}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-charcoal-900">
                      {stock} units
                    </td>

                    <td className="py-3.5 px-4">
                      {statusBadge}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() =>
                          setRestockModal({
                            id: item.id,
                            name: item.name,
                            currentStock: stock,
                          })
                        }
                        className="inline-flex items-center gap-1 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 px-3 py-1.5 text-[11px] uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Restock</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {restockModal && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-kraft-300 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-kraft-200 pb-3">
              <h3 className="font-serif text-lg font-medium text-charcoal-900">
                Restock Creation
              </h3>
              <button
                onClick={() => setRestockModal(null)}
                className="text-charcoal-400 hover:text-charcoal-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-mono text-charcoal-600">
              Product: <strong>{restockModal.name}</strong><br />
              Current Stock: <strong>{restockModal.currentStock} units</strong>
            </p>

            <form onSubmit={handleRestock} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-charcoal-700 uppercase mb-1">Add Quantity (Units)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={addQty}
                  onChange={(e) => setAddQty(Number(e.target.value))}
                  className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-charcoal-700 uppercase mb-1">Reason / Batch Reference</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-ivory-50 border border-kraft-300 px-3 py-2 text-xs text-charcoal-900 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRestockModal(null)}
                  className="flex-1 py-2.5 bg-kraft-100 text-charcoal-800 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 uppercase flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Confirm Restock'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
