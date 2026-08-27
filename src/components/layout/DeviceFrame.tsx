import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPhoneFrame, activeTab } = useApp();

  const isLight = activeTab === 'home';
  const screenBg = isLight ? 'bg-[#f6f7fb]' : 'bg-[#0c0d12]';
  const statusBg  = isLight ? 'bg-[#f6f7fb]' : 'bg-[#0c0d12]';
  const statusText = isLight ? 'text-gray-500' : 'text-gray-400';

  // Full-screen mode (no phone frame)
  if (!isPhoneFrame) {
    return (
      <div className={`min-h-screen ${screenBg} selection:bg-red-500 selection:text-white`}>
        <div className={`max-w-md mx-auto min-h-screen flex flex-col shadow-2xl ${screenBg}`}>
          {children}
        </div>
      </div>
    );
  }

  // iPhone frame mode
  return (
    <div className="min-h-screen bg-[#07080c] flex items-start justify-center py-6 px-2 overflow-y-auto">
      {/* iPhone 16 Pro shell */}
      <div
        className="relative w-full max-w-[390px] bg-[#1a1b22] rounded-[52px] p-[14px] flex flex-col overflow-hidden"
        style={{
          height: '860px',
          boxShadow: '0 0 80px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.08)',
          border: '5px solid #2a2c38',
        }}
      >
        {/* Status Bar */}
        <div className={`${statusBg} px-6 pt-3 pb-1.5 flex items-center justify-between rounded-t-[38px] select-none shrink-0 transition-colors duration-300`}>
          <span className={`text-[11px] font-bold ${statusText} tracking-tight`}>9:41</span>
          <div className="w-[88px] h-[22px] bg-black rounded-full flex items-center justify-between px-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
            <div className="w-[7px] h-[7px] rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className={`flex items-center gap-1 ${statusText}`}>
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-[15px] h-[15px] fill-current" />
          </div>
        </div>

        {/* App content — flex column fills remaining space */}
        <div
          className={`relative flex-1 flex flex-col overflow-hidden rounded-b-[38px] transition-colors duration-300 ${screenBg}`}
          style={{ transform: 'translateZ(0)' }}
        >
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-[5px] rounded-full bg-white/20 pointer-events-none" />
      </div>
    </div>
  );
};
