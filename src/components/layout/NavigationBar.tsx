import React from 'react';
import { Home, Package, ClipboardList, Gift, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { TabType } from '../../context/AppContext';

export const NavigationBar: React.FC = () => {
  const { activeTab, setActiveTab, cartItems, setIsCartOpen } = useApp();

  type NavItem = { id: TabType | 'cart'; label: string; icon: React.ReactNode };

  const items: NavItem[] = [
    { id: 'home',        label: 'Home',     icon: <Home className="w-[18px] h-[18px]" /> },
    { id: 'products',   label: 'Products', icon: <Package className="w-[18px] h-[18px]" /> },
    { id: 'cart',       label: 'My Order', icon: (
      <div className="relative">
        <ClipboardList className="w-[18px] h-[18px]" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-[#e50914] text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center leading-none">
            {cartItems.length}
          </span>
        )}
      </div>
    )},
    { id: 'chinafriend', label: 'Join Drop', icon: null },
    { id: 'rewards',    label: 'Rewards',  icon: <Gift className="w-[18px] h-[18px]" /> },
    { id: 'profile',    label: 'Profile',  icon: <User className="w-[18px] h-[18px]" /> },
  ];

  return (
    <nav
      className="sticky bottom-0 z-50 px-3 pb-2 pt-1"
      style={{ marginTop: 'auto' }}
    >
      <div className="bg-[#0c0d12]/96 backdrop-blur-2xl border border-white/8 rounded-[28px] px-1 py-2 flex items-center justify-around shadow-[0_-4px_32px_rgba(0,0,0,0.6)]">
        {items.map((item) => {
          const isCenter = item.id === 'chinafriend';

          if (isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab('chinafriend')}
                className="-mt-7 press-scale focus:outline-none flex flex-col items-center gap-1 cursor-pointer"
                type="button"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-red text-2xl leading-none border-4 transition-all duration-200 select-none ${
                  activeTab === 'chinafriend'
                    ? 'bg-[#e50914] border-[#ff2a3d] scale-110'
                    : 'bg-[#e50914] border-[#c00711]'
                }`}>
                  🐼
                </div>
                <span className={`text-[9px] font-extrabold tracking-tight ${
                  activeTab === 'chinafriend' ? 'text-[#e50914]' : 'text-gray-400'
                }`}>
                  Join Drop
                </span>
              </button>
            );
          }

          const handleClick = () => {
            if (item.id === 'cart') {
              setIsCartOpen(true);
            } else {
              setActiveTab(item.id as TabType);
            }
          };

          const tabActive = item.id === 'cart' ? false : activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={handleClick}
              type="button"
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all duration-200 press-scale cursor-pointer select-none ${
                tabActive ? 'text-[#e50914]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.icon}
              <span className={`text-[9px] ${tabActive ? 'font-extrabold' : 'font-bold'}`}>
                {item.label}
              </span>
              {tabActive && (
                <span className="w-1 h-1 rounded-full bg-[#e50914] -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
