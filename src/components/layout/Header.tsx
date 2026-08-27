import React from 'react';
import { Bell, Search, Camera } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { user, currency, setCurrency, activeTab, setActiveTab, setIsSearchOpen } = useApp();
  const isLight = activeTab === 'home';

  return (
    <header className={`shrink-0 sticky top-0 z-30 transition-colors duration-300 ${isLight ? 'bg-[#f6f7fb]' : 'bg-[#0c0d12]'}`}>

      {/* Top Row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        {/* Logo */}
        <button onClick={() => setActiveTab('home')} className="flex items-center gap-2 press-scale">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e50914] to-[#8b0000] flex items-center justify-center text-base shadow-red-sm select-none shrink-0">
            🐼
          </div>
          <div className="leading-none">
            <div className="flex items-baseline gap-0.5">
              <span className={`text-[15px] font-black tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                China
              </span>
              <span className="text-[15px] font-black tracking-tight bg-gradient-to-r from-[#e50914] to-[#ff6b35] bg-clip-text text-transparent ml-1">
                Drop
              </span>
            </div>
            <p className={`text-[8px] font-bold tracking-[0.2em] uppercase mt-0.5 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
              Rwanda · 🇷🇼
            </p>
          </div>
        </button>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'USD' ? 'RWF' : 'USD')}
            className={`text-[10px] font-black px-2.5 py-1 rounded-xl border transition-colors press-scale ${
              isLight
                ? 'bg-white text-gray-700 border-gray-200'
                : 'bg-white/10 text-gray-200 border-white/10'
            }`}
          >
            {currency === 'USD' ? '🇺🇸 USD' : '🇷🇼 RWF'}
          </button>

          {/* Points Badge */}
          <button
            onClick={() => setActiveTab('rewards')}
            className="flex items-center gap-1 bg-amber-400/15 text-amber-500 border border-amber-400/30 px-2.5 py-1 rounded-xl press-scale"
          >
            <span className="text-sm leading-none">🪙</span>
            <span className="text-[11px] font-black">{user.pointsBalance}</span>
          </button>

          {/* Bell */}
          <button className={`relative p-2 rounded-xl transition-colors press-scale ${
            isLight ? 'bg-white text-gray-500 border border-gray-200' : 'bg-white/8 text-gray-400'
          }`}>
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#e50914] rounded-full" />
          </button>
        </div>
      </div>

      {/* Search Bar — always visible, opens SearchOverlay on tap */}
      <div className="px-4 pb-3 pt-2">
        <button
          onClick={() => setIsSearchOpen(true)}
          className={`w-full flex items-center gap-2.5 rounded-2xl px-3 py-2.5 text-left transition-colors press-scale ${
            isLight
              ? 'bg-white border border-gray-200 shadow-card-light'
              : 'bg-white/6 border border-white/8'
          }`}
        >
          <Search className={`w-4 h-4 shrink-0 ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`flex-1 text-xs font-medium ${isLight ? 'text-gray-400' : 'text-gray-600'}`}>
            Search Amazon, Alibaba, 1688, Taobao…
          </span>
          <Camera className={`w-4 h-4 shrink-0 ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
      </div>
    </header>
  );
};
