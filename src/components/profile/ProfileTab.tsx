import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronRight, LogOut } from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const { user, orders, setActiveTab } = useApp();

  const menuItems = [
    { icon: '📦', label: 'My Orders', sub: `${orders.length} orders placed`, action: () => setActiveTab('orders') },
    { icon: '🎁', label: 'Rewards & Points', sub: `${user.pointsBalance} pts available`, action: () => setActiveTab('rewards') },
    { icon: '🌐', label: 'Language & Region', sub: 'English · Rwanda' },
    { icon: '🛡️', label: 'Privacy & Security', sub: 'Account is secure' },
    { icon: '❓', label: 'Help & Support', sub: 'Contact our team' },
  ];

  return (
    <div className="pb-28 animate-fadeIn">
      {/* Profile Hero */}
      <div className="bg-gradient-to-b from-[#0c0d12] to-[#0c0d12] px-4 pt-6 pb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#e50914] shadow-red-sm" />
            <span className="absolute -bottom-0.5 -right-0.5 text-base">🇷🇼</span>
          </div>
          <div>
            <p className="text-base font-black text-white">{user.name}</p>
            <p className="text-xs text-gray-500 font-medium">{user.phone}</p>
            <span className="inline-block mt-1.5 text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
              {user.tier} MEMBER
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          <div className="bg-white/6 rounded-2xl px-2 py-3 text-center border border-white/6">
            <p className="text-base font-black text-white">{user.totalImportedKg}</p>
            <p className="text-[9px] text-gray-500 font-medium mt-0.5">kg Imported</p>
          </div>
          <div className="bg-white/6 rounded-2xl px-2 py-3 text-center border border-white/6">
            <p className="text-base font-black text-amber-400">{user.pointsBalance}</p>
            <p className="text-[9px] text-gray-500 font-medium mt-0.5">Points</p>
          </div>
          <div className="bg-white/6 rounded-2xl px-2 py-3 text-center border border-white/6">
            <p className="text-base font-black text-emerald-400">${user.totalSavedUSD}</p>
            <p className="text-[9px] text-gray-500 font-medium mt-0.5">Saved</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-3 -mt-2 space-y-2">
        <div className="bg-[#13151f] border border-white/6 rounded-3xl overflow-hidden divide-y divide-white/5">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/4 transition-colors press-scale text-left"
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-[10px] text-gray-500">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          ))}
        </div>

        {/* Admin Access */}
        <button
          onClick={() => setActiveTab('admin')}
          className="w-full bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/20 rounded-2xl px-4 py-3.5 flex items-center gap-3 press-scale"
        >
          <span className="text-lg">⚙️</span>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-purple-300">Admin Dashboard</p>
            <p className="text-[10px] text-purple-500">Manage drops & logistics</p>
          </div>
          <ChevronRight className="w-4 h-4 text-purple-600" />
        </button>

        {/* Sign Out */}
        <button className="w-full bg-white/4 border border-white/6 rounded-2xl px-4 py-3.5 flex items-center gap-3 press-scale">
          <LogOut className="w-4 h-4 text-red-500" />
          <span className="text-sm font-bold text-red-400">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
