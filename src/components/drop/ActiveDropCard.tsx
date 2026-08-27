import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CountdownBlock: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex-1 bg-white rounded-2xl py-2.5 text-center shadow-card-light border border-gray-100">
    <p className="text-xl font-black text-gray-900 font-mono leading-none">{String(value).padStart(2, '0')}</p>
    <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-widest">{label}</p>
  </div>
);

export const ActiveDropCard: React.FC = () => {
  const {
    formatMoney,
    setIsCartOpen,
    setActiveTab,
    products,
    addToCart,
    cartItems,
    cartTotalWeightKg,
    cartEstShippingUSD,
    activeDrop,
    setSelectedProductDetail,
  } = useApp();

  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, mins: 32, secs: 45 });

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(p => {
      if (p.secs > 0) return { ...p, secs: p.secs - 1 };
      if (p.mins > 0) return { ...p, mins: p.mins - 1, secs: 59 };
      if (p.hours > 0) return { ...p, hours: p.hours - 1, mins: 59, secs: 59 };
      if (p.days > 0) return { ...p, days: p.days - 1, hours: 23, mins: 59, secs: 59 };
      return p;
    }), 1000);
    return () => clearInterval(t);
  }, []);

  const popular = products.slice(0, 4);

  const categories = [
    { icon: '🎧', label: 'Electronics' },
    { icon: '👔', label: 'Fashion' },
    { icon: '💄', label: 'Beauty' },
    { icon: '🏠', label: 'Home' },
    { icon: '💼', label: 'Business' },
    { icon: '⋯',  label: 'More' },
  ];

  const leaderboard = [
    { name: 'Jean P.',  kg: 280, rank: 2, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120' },
    { name: 'Uwase A.', kg: 320, rank: 1, avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120' },
    { name: 'Manzi E.', kg: 210, rank: 3, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120' },
  ];

  return (
    <div className="px-3 pb-28 space-y-3 animate-fadeIn">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1c2a] to-[#0e0f1a] min-h-[160px] shadow-card-dark">
        {/* Ship background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800)' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f1a]/90 via-[#0e0f1a]/60 to-transparent" />

        <div className="relative z-10 p-5">
          <p className="text-[11px] font-semibold text-gray-400 mb-1">Don't buy from China alone.</p>
          <h1 className="text-[2rem] font-black text-white leading-[1.1] mb-2">
            DROP <span className="font-script text-[#e50914]">together!</span>
          </h1>
          <p className="text-[11px] text-gray-400 max-w-[55%] leading-relaxed mb-4">
            Combine orders with thousands of Rwandan buyers and unlock factory freight prices.
          </p>
          <button
            onClick={() => alert("1. Browse or paste a 1688 link\n2. Drop weight grows\n3. Everyone pays less!")}
            className="inline-flex items-center gap-2 bg-white text-gray-900 text-xs font-black px-4 py-2 rounded-full shadow-card-light press-scale"
          >
            How It Works
            <span className="w-4 h-4 rounded-full bg-[#e50914] text-white flex items-center justify-center text-[9px]">▶</span>
          </button>
        </div>
      </div>

      {/* ── DROP STATS: Timer + Buyers + Weight ──────────────────── */}
      <div className="bg-white rounded-3xl p-4 shadow-card-light border border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Active Consignment</p>
            <p className="text-sm font-black text-gray-900 mt-0.5">CHINA DROP #001</p>
          </div>
          <span className="text-[9px] font-bold bg-red-50 text-[#e50914] border border-red-200 px-2.5 py-1 rounded-full animate-pulse">
            CLOSING SOON
          </span>
        </div>

        {/* Timer */}
        <div className="flex gap-2">
          <CountdownBlock value={timeLeft.days}  label="Days" />
          <CountdownBlock value={timeLeft.hours} label="Hrs"  />
          <CountdownBlock value={timeLeft.mins}  label="Min"  />
          <CountdownBlock value={timeLeft.secs}  label="Sec"  />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#f6f7fb] rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
            <span className="text-lg">👥</span>
            <div>
              <p className="text-sm font-black text-gray-900">{activeDrop.buyersJoined.toLocaleString()}</p>
              <p className="text-[10px] text-gray-500 font-medium">Buyers Joined</p>
            </div>
          </div>
          <div className="bg-[#f6f7fb] rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
            <span className="text-lg">⚖️</span>
            <div>
              <p className="text-sm font-black text-amber-500">{activeDrop.weightCollectedKg.toLocaleString()} kg</p>
              <p className="text-[10px] text-gray-500 font-medium">Collected</p>
            </div>
          </div>
        </div>

        {/* Shipping Tier Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-gray-700">Unlock Lower Shipping!</p>
            <p className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              $5.00/kg at 5,000 kg
            </p>
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#e50914] via-amber-400 to-emerald-500 transition-all duration-700"
              style={{ width: `${Math.min(100, (activeDrop.weightCollectedKg / 5000) * 100)}%` }}
            />
            {/* Tier markers */}
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/60" />
            <div className="absolute right-0 top-0 h-full w-px bg-white/60" />
          </div>
          <div className="flex justify-between text-[9px] font-bold text-gray-400">
            <span>$8/kg</span>
            <span className="text-amber-500">$6.50/kg at 2,500</span>
            <span className="text-emerald-500">$5/kg at 5,000</span>
          </div>
        </div>

        {/* Join CTA */}
        <button
          onClick={() => setActiveTab('products')}
          className="w-full bg-[#e50914] hover:bg-[#c00711] text-white font-black text-sm py-3.5 rounded-2xl shadow-red press-scale flex items-center justify-center gap-2 transition-colors"
        >
          JOIN THE DROP NOW
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ── ORDER SUMMARY CARD ───────────────────────────────────── */}
      <div
        onClick={() => setIsCartOpen(true)}
        className="bg-[#e50914] rounded-3xl p-4 flex items-center justify-between cursor-pointer press-scale shadow-red relative overflow-hidden"
      >
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl opacity-80 pointer-events-none">📦</div>
        <div className="z-10 space-y-1">
          <p className="text-[10px] font-bold text-red-200 uppercase tracking-widest">Your Order Summary</p>
          <div className="flex items-baseline gap-3">
            <div>
              <p className="text-[10px] text-red-200">{cartItems.length} items</p>
              <p className="text-xl font-black text-white">{cartTotalWeightKg} kg</p>
            </div>
            <div className="w-px h-7 bg-red-300/40" />
            <div>
              <p className="text-[10px] text-red-200">Est. Shipping</p>
              <p className="text-xl font-black text-white">{formatMoney(cartEstShippingUSD)}</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 bg-white text-[#e50914] text-xs font-black px-3 py-1.5 rounded-full mt-1">
            View My Order <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* ── BROWSE CATEGORIES ────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-4 shadow-card-light border border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-gray-900">Browse Categories</p>
          <button onClick={() => setActiveTab('products')} className="text-xs font-bold text-[#e50914]">View all</button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {categories.map(c => (
            <button
              key={c.label}
              onClick={() => setActiveTab('products')}
              className="flex flex-col items-center gap-1 bg-[#f6f7fb] rounded-2xl p-2 hover:bg-gray-100 press-scale transition-colors"
            >
              <span className="text-lg leading-none">{c.icon}</span>
              <span className="text-[9px] font-bold text-gray-600">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── POPULAR PICKS ────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-0.5">
          <p className="text-sm font-black text-gray-900">Popular Picks This Drop</p>
          <button onClick={() => setActiveTab('products')} className="text-xs font-bold text-[#e50914] flex items-center gap-0.5">
            See all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {popular.map(product => {
            const inCart = cartItems.find(i => i.product.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-card-light border border-gray-100 card-hover cursor-pointer"
                onClick={() => setSelectedProductDetail(product)}
              >
                <div className="relative h-28 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {product.weightKg} kg
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-bold text-gray-900 truncate mb-1.5">{product.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-gray-900">{formatMoney(product.priceUSD)}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-red-sm press-scale transition-colors ${
                        inCart ? 'bg-emerald-500' : 'bg-[#e50914]'
                      }`}
                    >
                      {inCart ? inCart.quantity : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── COMMUNITY LEADERBOARD ────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-4 shadow-card-light border border-gray-100 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-gray-900">Community Leaderboard</p>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-lg">
            This Drop ▾
          </span>
        </div>
        <div className="flex items-end justify-center gap-6 py-2">
          {leaderboard.map(l => (
            <div key={l.rank} className={`flex flex-col items-center ${l.rank === 1 ? '-mt-3' : ''}`}>
              {l.rank === 1 && <span className="text-lg mb-1">👑</span>}
              <img
                src={l.avatar}
                alt={l.name}
                className={`rounded-full object-cover border-2 shadow ${
                  l.rank === 1 ? 'w-16 h-16 border-amber-400' :
                  l.rank === 2 ? 'w-13 h-13 border-slate-300' :
                                  'w-13 h-13 border-amber-600/60'
                }`}
                style={l.rank !== 1 ? { width: 52, height: 52 } : {}}
              />
              <span className={`text-[8.5px] font-black w-4 h-4 rounded-full flex items-center justify-center -mt-2 shadow ${
                l.rank === 1 ? 'bg-amber-400 text-amber-900' :
                l.rank === 2 ? 'bg-slate-300 text-slate-800' :
                               'bg-amber-600 text-white'
              }`}>{l.rank}</span>
              <p className="text-xs font-black text-gray-900 mt-2">{l.name}</p>
              <p className={`text-[10px] font-bold ${l.rank === 1 ? 'text-amber-500' : 'text-gray-400'}`}>{l.kg} kg</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY CHINA DROP ───────────────────────────────────────── */}
      <div className="bg-white rounded-3xl p-4 shadow-card-light border border-gray-100 space-y-3">
        <p className="text-sm font-black text-gray-900">Why China Drop?</p>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { icon: '📉', label: 'Lower Prices Together' },
            { icon: '🏭', label: 'Trusted Suppliers' },
            { icon: '🔒', label: 'Safe & Secure' },
            { icon: '🇷🇼', label: 'Delivered to RW' },
          ].map(b => (
            <div key={b.label} className="bg-[#f6f7fb] rounded-2xl p-2.5 flex flex-col items-center gap-1.5">
              <span className="text-xl">{b.icon}</span>
              <p className="text-[9px] font-bold text-gray-600 leading-tight">{b.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── INVITE BANNER ────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#1a1c2a] to-[#12141e] rounded-3xl p-4 flex items-center justify-between shadow-card-dark border border-white/5">
        <div>
          <p className="text-xs font-black text-white mb-0.5">Invite friends, earn more!</p>
          <p className="text-[10px] text-gray-400">You get <span className="text-amber-400 font-bold">200 pts</span> · friend gets <span className="text-emerald-400 font-bold">100 pts</span></p>
        </div>
        <button
          onClick={() => setActiveTab('rewards')}
          className="bg-[#e50914] text-white text-xs font-black px-3.5 py-2 rounded-xl press-scale shadow-red"
        >
          Invite Now
        </button>
      </div>

    </div>
  );
};
