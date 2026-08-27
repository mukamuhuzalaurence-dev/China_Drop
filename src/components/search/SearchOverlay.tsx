import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Clock, TrendingUp, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// ── Multi-platform product database ─────────────────────────────
const PLATFORMS = {
  alibaba:   { name: 'Alibaba',   color: '#FF6A00', bg: '#fff3eb', emoji: '🟠' },
  amazon:    { name: 'Amazon',    color: '#FF9900', bg: '#fff8f0', emoji: '📦' },
  '1688':    { name: '1688',      color: '#E31937', bg: '#fff0f2', emoji: '🔴' },
  taobao:    { name: 'Taobao',    color: '#FF4400', bg: '#fff2ee', emoji: '🛒' },
  aliexpress:{ name: 'AliExpress',color: '#E62E04', bg: '#fff1ee', emoji: '✈️' },
};

type PlatformKey = keyof typeof PLATFORMS;

interface SearchProduct {
  id: string;
  name: string;
  image: string;
  priceUSD: number;
  weightKg: number;
  platform: PlatformKey;
  rating: number;
  reviews: number;
  moq: number;
  url: string;
}

const ALL_PRODUCTS: SearchProduct[] = [
  // Electronics
  { id: 's1', name: 'Bluetooth 5.3 TWS Earbuds ANC', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', priceUSD: 6.80, weightKg: 0.25, platform: 'alibaba', rating: 4.8, reviews: 1240, moq: 50, url: '#' },
  { id: 's2', name: 'Apple AirPods Pro 2nd Gen', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400', priceUSD: 189.00, weightKg: 0.06, platform: 'amazon', rating: 4.9, reviews: 38500, moq: 1, url: '#' },
  { id: 's3', name: 'Smart LED Desk Lamp USB Charging', image: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400', priceUSD: 4.20, weightKg: 0.9, platform: '1688', rating: 4.6, reviews: 872, moq: 20, url: '#' },
  { id: 's4', name: 'Xiaomi Smart Band 8 Fitness Tracker', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400', priceUSD: 22.50, weightKg: 0.05, platform: 'aliexpress', rating: 4.7, reviews: 5600, moq: 1, url: '#' },
  { id: 's5', name: 'Wireless Charging Pad 15W Fast', image: 'https://images.unsplash.com/photo-1609092424074-b5f7b49466dd?w=400', priceUSD: 3.50, weightKg: 0.15, platform: 'taobao', rating: 4.5, reviews: 430, moq: 30, url: '#' },
  { id: 's6', name: '20000mAh Power Bank Dual USB', image: 'https://images.unsplash.com/photo-1609592424074-b5f7b49466dd?w=400', priceUSD: 8.90, weightKg: 0.42, platform: 'alibaba', rating: 4.8, reviews: 2100, moq: 50, url: '#' },
  { id: 's7', name: 'Portable Bluetooth Speaker IPX7', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', priceUSD: 7.50, weightKg: 0.8, platform: '1688', rating: 4.7, reviews: 680, moq: 20, url: '#' },
  { id: 's8', name: 'Samsung Galaxy A55 5G 256GB', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', priceUSD: 320.00, weightKg: 0.21, platform: 'amazon', rating: 4.6, reviews: 12000, moq: 1, url: '#' },
  // Fashion
  { id: 's9', name: 'Women Elegant Floral Maxi Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400', priceUSD: 5.80, weightKg: 0.35, platform: 'taobao', rating: 4.6, reviews: 920, moq: 10, url: '#' },
  { id: 's10', name: 'Men Slim Fit Casual Polo Shirt', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400', priceUSD: 4.20, weightKg: 0.3, platform: '1688', rating: 4.5, reviews: 1500, moq: 20, url: '#' },
  { id: 's11', name: 'Leather Crossbody Shoulder Bag', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400', priceUSD: 6.50, weightKg: 0.55, platform: 'alibaba', rating: 4.8, reviews: 780, moq: 30, url: '#' },
  { id: 's12', name: 'Running Sneakers Lightweight Mesh', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', priceUSD: 9.80, weightKg: 0.9, platform: 'aliexpress', rating: 4.7, reviews: 3400, moq: 1, url: '#' },
  { id: 's13', name: 'Polarized UV400 Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400', priceUSD: 3.20, weightKg: 0.12, platform: 'taobao', rating: 4.4, reviews: 560, moq: 20, url: '#' },
  { id: 's14', name: 'Nike Air Force 1 (Replica Premium)', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400', priceUSD: 14.00, weightKg: 1.1, platform: '1688', rating: 4.3, reviews: 2200, moq: 10, url: '#' },
  // Home
  { id: 's15', name: 'Robot Vacuum Cleaner 2000Pa', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', priceUSD: 45.00, weightKg: 2.8, platform: 'alibaba', rating: 4.6, reviews: 890, moq: 10, url: '#' },
  { id: 's16', name: 'Air Fryer 4.5L Digital Display', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', priceUSD: 22.00, weightKg: 3.5, platform: 'amazon', rating: 4.7, reviews: 22000, moq: 1, url: '#' },
  { id: 's17', name: 'Stainless Steel Kitchen Knife Set', image: 'https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=400', priceUSD: 8.50, weightKg: 1.2, platform: '1688', rating: 4.8, reviews: 1100, moq: 10, url: '#' },
  { id: 's18', name: 'LED Strip Lights 5M RGB Smart', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', priceUSD: 4.80, weightKg: 0.2, platform: 'taobao', rating: 4.5, reviews: 3200, moq: 20, url: '#' },
  // Business
  { id: 's19', name: 'Mechanical Keyboard TKL RGB', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', priceUSD: 18.00, weightKg: 0.85, platform: 'alibaba', rating: 4.7, reviews: 640, moq: 20, url: '#' },
  { id: 's20', name: 'Laptop Stand Adjustable Aluminium', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400', priceUSD: 6.20, weightKg: 0.6, platform: 'aliexpress', rating: 4.6, reviews: 2800, moq: 1, url: '#' },
  { id: 's21', name: 'Webcam 1080p HD USB Plug & Play', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400', priceUSD: 12.50, weightKg: 0.3, platform: '1688', rating: 4.5, reviews: 450, moq: 10, url: '#' },
  // Beauty
  { id: 's22', name: 'Vitamin C Serum 30ml Anti-Aging', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400', priceUSD: 3.80, weightKg: 0.08, platform: 'taobao', rating: 4.7, reviews: 1800, moq: 50, url: '#' },
  { id: 's23', name: 'Electric Face Cleansing Brush', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', priceUSD: 5.50, weightKg: 0.18, platform: 'alibaba', rating: 4.6, reviews: 920, moq: 30, url: '#' },
  { id: 's24', name: 'Hair Straightener Flat Iron Ceramic', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', priceUSD: 7.20, weightKg: 0.4, platform: 'aliexpress', rating: 4.5, reviews: 3100, moq: 1, url: '#' },
];

const RECENT_KEY = 'chinadrop_recent_searches';
const TRENDING = ['iPhone 15 case', 'Solar panel 400W', 'Ankara fabric', 'Electric kettle', 'Baby stroller', 'Gym equipment'];

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setIsCustomSourcingModalOpen } = useApp();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [recents, setRecents] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      try { setRecents(JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')); } catch { setRecents([]); }
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const saveSearch = (q: string) => {
    if (!q.trim()) return;
    const updated = [q, ...recents.filter(r => r !== q)].slice(0, 8);
    setRecents(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const removeRecent = (r: string) => {
    const updated = recents.filter(x => x !== r);
    setRecents(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim().length > 1) saveSearch(q.trim());
  };

  const filters = ['All', 'Alibaba', 'Amazon', '1688', 'Taobao', 'AliExpress'];

  const results = query.trim().length > 0
    ? ALL_PRODUCTS.filter(p => {
        const matchQ = p.name.toLowerCase().includes(query.toLowerCase());
        const matchF = activeFilter === 'All' || PLATFORMS[p.platform].name.toLowerCase() === activeFilter.toLowerCase();
        return matchQ && matchF;
      })
    : [];

  const handleSource = (p: SearchProduct) => {
    saveSearch(p.name);
    setIsSearchOpen(false);
    setIsCustomSourcingModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#0c0d12] animate-fadeIn">

        {/* Search Header */}
        <div className="px-4 pt-4 pb-3 border-b border-white/6 space-y-3 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSearchOpen(false)} className="p-2 rounded-xl bg-white/8 text-gray-400 press-scale shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex-1 flex items-center gap-2.5 bg-white/8 border border-white/10 rounded-2xl px-3 py-2.5">
              <Search className="w-4 h-4 text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => handleSearch(e.target.value)}
                placeholder="Search Amazon, Alibaba, 1688, Taobao…"
                className="flex-1 text-sm text-white bg-transparent outline-none placeholder:text-gray-600"
              />
              {query && (
                <button onClick={() => setQuery('')} className="shrink-0 text-gray-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Platform Filter Chips */}
          {query.trim().length > 0 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-0.5">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`flex-none text-[11px] font-bold px-3 py-1.5 rounded-full press-scale transition-all ${
                    activeFilter === f
                      ? 'bg-[#e50914] text-white'
                      : 'bg-white/8 text-gray-400 border border-white/8'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-4 pb-6">

        {/* Empty state → show recents + trending */}
        {query.trim().length === 0 && (
          <div className="space-y-5 pt-4">
            {/* Recent Searches */}
            {recents.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-500" /> Recent Searches
                  </p>
                  <button onClick={() => { setRecents([]); localStorage.removeItem(RECENT_KEY); }} className="text-[10px] text-[#e50914] font-bold">
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recents.map(r => (
                    <div key={r} className="flex items-center gap-1.5 bg-white/6 border border-white/8 rounded-full pl-3 pr-2 py-1.5 group">
                      <button onClick={() => setQuery(r)} className="text-xs text-gray-300 font-medium">{r}</button>
                      <button onClick={() => removeRecent(r)} className="text-gray-600 hover:text-white press-scale">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div className="space-y-2">
              <p className="text-xs font-black text-white flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#e50914]" /> Trending in Rwanda
              </p>
              <div className="space-y-0 divide-y divide-white/5">
                {TRENDING.map((t, i) => (
                  <button
                    key={t}
                    onClick={() => handleSearch(t)}
                    className="w-full flex items-center gap-3 py-3 text-left hover:bg-white/4 rounded-xl px-1 press-scale"
                  >
                    <span className="text-[10px] font-black text-gray-600 w-4 text-right">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-200">{t}</p>
                    </div>
                    <Search className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Banners */}
            <div className="space-y-2">
              <p className="text-xs font-black text-white">Search Across Platforms</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(PLATFORMS).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => { setActiveFilter(p.name); setQuery(' '); setTimeout(() => inputRef.current?.focus(), 50); }}
                    className="bg-white/5 border border-white/8 rounded-2xl p-3 flex flex-col items-center gap-1.5 press-scale hover:bg-white/8 transition"
                  >
                    <span className="text-xl">{p.emoji}</span>
                    <span className="text-[10px] font-bold text-gray-300">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim().length > 0 && (
          <div className="pt-4 space-y-3">
            {results.length === 0 ? (
              <div className="py-12 flex flex-col items-center gap-3 text-center">
                <span className="text-4xl">🔍</span>
                <p className="text-sm font-bold text-gray-400">No results for "{query}"</p>
                <p className="text-xs text-gray-600">Try a different keyword or</p>
                <button
                  onClick={() => { setIsSearchOpen(false); setIsCustomSourcingModalOpen(true); }}
                  className="bg-[#e50914] text-white text-xs font-black px-4 py-2.5 rounded-xl press-scale shadow-red"
                >
                  Request Custom Sourcing
                </button>
              </div>
            ) : (
              <>
                <p className="text-[10px] text-gray-500 font-bold">{results.length} results for "{query}"</p>
                {results.map(product => {
                  const plat = PLATFORMS[product.platform];
                  return (
                    <div key={product.id} className="bg-[#13151f] border border-white/6 rounded-2xl overflow-hidden flex card-hover">
                      {/* Image */}
                      <div className="w-24 h-24 bg-[#1a1c28] shrink-0 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      {/* Info */}
                      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                        <div>
                          {/* Platform badge */}
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-1"
                            style={{ background: plat.bg, color: plat.color }}>
                            {plat.emoji} {plat.name}
                          </span>
                          <p className="text-xs font-bold text-white leading-snug line-clamp-2">{product.name}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                            <span className="text-[9px] text-gray-500">{product.rating} · {product.reviews.toLocaleString()} reviews</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-sm font-black text-white">${product.priceUSD.toFixed(2)}</p>
                            <p className="text-[9px] text-gray-600">MOQ: {product.moq} · {product.weightKg} kg</p>
                          </div>
                          <button
                            onClick={() => handleSource(product)}
                            className="bg-[#e50914] text-white text-[10px] font-black px-2.5 py-1.5 rounded-xl press-scale shadow-red-sm flex items-center gap-1"
                          >
                            <ShoppingCart className="w-3 h-3" /> Source
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Can't find banner */}
                <div className="bg-white/4 border border-white/6 rounded-2xl p-4 flex items-center justify-between mt-2">
                  <div>
                    <p className="text-xs font-black text-white">Can't find what you need?</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">Paste any product link for custom sourcing</p>
                  </div>
                  <button
                    onClick={() => { setIsSearchOpen(false); setIsCustomSourcingModalOpen(true); }}
                    className="bg-[#e50914] text-white text-[10px] font-black px-3 py-2 rounded-xl press-scale shadow-red-sm shrink-0"
                  >
                    Source It
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
