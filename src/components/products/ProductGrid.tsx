import React, { useState } from 'react';
import { Search, Link2, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { CategoryType } from '../../types';
import { ProductCard } from './ProductCard';

const CATEGORIES: CategoryType[] = ['All', 'Electronics', 'Fashion', 'Beauty', 'Home', 'Business', 'Accessories'];

export const ProductGrid: React.FC = () => {
  const { products, setIsCustomSourcingModalOpen } = useApp();
  const [filter, setFilter] = useState<CategoryType>('All');
  const [query, setQuery] = useState('');

  const filtered = products.filter(p => {
    const matchCat = filter === 'All' || p.category === filter;
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="pb-28 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#0c0d12] px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-base font-black text-white">All Products</p>
          <span className="text-[10px] font-bold text-gray-400 bg-white/8 px-2 py-1 rounded-lg">
            {filtered.length} items
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-2xl px-3 py-2.5">
          <Search className="w-4 h-4 text-gray-500 shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products…"
            className="flex-1 text-xs text-white bg-transparent outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex-none text-[11px] font-bold px-3.5 py-1.5 rounded-full transition-all press-scale ${
                filter === cat
                  ? 'bg-[#e50914] text-white shadow-red-sm'
                  : 'bg-white/8 text-gray-400 hover:bg-white/12 border border-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Sourcing Banner */}
      <div
        onClick={() => setIsCustomSourcingModalOpen(true)}
        className="mx-3 mt-3 bg-gradient-to-r from-[#e50914] to-[#c00711] rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer press-scale shadow-red"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
            <Link2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-white">Source Any Product</p>
            <p className="text-[10px] text-red-200">Paste a 1688 or Taobao link</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-white/60" />
      </div>

      {/* Product Grid */}
      <div className="px-3 mt-3 grid grid-cols-2 gap-2.5">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        {filtered.length === 0 && (
          <div className="col-span-2 py-12 flex flex-col items-center gap-2 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-sm font-bold text-gray-500">No products found</p>
            <p className="text-xs text-gray-600">Try a different filter or paste a product link above</p>
          </div>
        )}
      </div>
    </div>
  );
};
