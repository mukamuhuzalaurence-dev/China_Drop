import React from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WeightTierProgress: React.FC = () => {
  const { activeDrop, setActiveTab } = useApp();

  const currentKg = activeDrop.weightCollectedKg;

  // Determine current active tier index
  let activeTierIndex = 0;
  if (currentKg >= 2500) activeTierIndex = 1;
  if (currentKg >= 5000) activeTierIndex = 2;

  // SVG Curve dimensions
  const width = 340;
  const height = 90;
  
  // Curve points: Tier 1 ($8/kg) -> Tier 2 ($6.50/kg) -> Tier 3 ($5.00/kg)
  const p0 = { x: 20, y: 70 };
  const p1 = { x: 170, y: 40 };
  const p2 = { x: 320, y: 15 };

  // Current weight marker along SVG path (approximate x mapping)
  const markerX = Math.max(20, Math.min(320, 20 + (currentKg / 5000) * 300));
  // Quadratic bezier interpolation for Y
  const t = (markerX - 20) / 300;
  const markerY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return (
    <div className="bg-[#12141f] border border-gray-800 rounded-3xl p-4 space-y-4 shadow-2xl">
      {/* Title Header matching right mockup */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-white flex items-center gap-1.5">
            <span>Unlock Lower Prices Together!</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </h3>
          <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            You're helping everyone save!
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mt-0.5">The more we collect, the less we pay.</p>
      </div>

      {/* 3 Tier Cards matching Right Mockup */}
      <div className="grid grid-cols-3 gap-2">
        {/* Tier 1 Card */}
        <div className={`p-2.5 rounded-2xl border transition text-center ${
          activeTierIndex === 0 
            ? 'bg-[#181a28] border-red-500 shadow-md ring-1 ring-red-500/40' 
            : 'bg-[#141622] border-gray-800 text-gray-400'
        }`}>
          <span className="text-[9px] font-bold text-gray-400 uppercase block">Current Price</span>
          <p className="text-sm font-black text-white mt-0.5">$8.00<span className="text-[10px] font-medium text-gray-400">/kg</span></p>
          <span className="text-[8.5px] text-gray-400 font-semibold mt-0.5 block">0 - 2,499 kg</span>
        </div>

        {/* Tier 2 Card */}
        <div className={`p-2.5 rounded-2xl border transition text-center ${
          activeTierIndex === 1 
            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md ring-1 ring-amber-500/40' 
            : 'bg-[#141622] border-gray-800 text-gray-400'
        }`}>
          <span className="text-[9px] font-extrabold text-amber-400 uppercase block">Next Target</span>
          <p className="text-sm font-black text-amber-300 mt-0.5">$6.50<span className="text-[10px] font-medium text-amber-400">/kg</span></p>
          <span className="text-[8.5px] text-amber-400 font-bold mt-0.5 block">At 2,500 kg</span>
        </div>

        {/* Tier 3 Card */}
        <div className={`p-2.5 rounded-2xl border transition text-center ${
          activeTierIndex === 2 
            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/40' 
            : 'bg-[#141622] border-gray-800 text-gray-400'
        }`}>
          <span className="text-[9px] font-extrabold text-emerald-400 uppercase block">Best Price</span>
          <p className="text-sm font-black text-emerald-300 mt-0.5">$5.00<span className="text-[10px] font-medium text-emerald-400">/kg</span></p>
          <span className="text-[8.5px] text-emerald-400 font-bold mt-0.5 block">At 5,000 kg+</span>
        </div>
      </div>

      {/* Interactive SVG Curve Graph matching right mockup screen */}
      <div className="bg-[#181a28] border border-gray-800/80 rounded-2xl p-3 relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area under curve */}
          <path
            d={`M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y} L ${p2.x} 80 L ${p0.x} 80 Z`}
            fill="url(#areaGradient)"
          />

          {/* Smooth bezier curve line */}
          <path
            d={`M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Tier Points */}
          <circle cx={p0.x} cy={p0.y} r="4" fill="#ef4444" />
          <circle cx={p1.x} cy={p1.y} r="4" fill="#f59e0b" />
          <circle cx={p2.x} cy={p2.y} r="4" fill="#10b981" />

          {/* Current Marker Dot */}
          <circle cx={markerX} cy={markerY} r="7" fill="#10b981" className="animate-ping opacity-75" />
          <circle cx={markerX} cy={markerY} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        </svg>

        {/* Floating Callout Badge on Graph */}
        <div 
          className="absolute text-[10px] bg-emerald-500 text-white font-extrabold px-2 py-0.5 rounded-full shadow-lg border border-emerald-300 pointer-events-none -translate-x-1/2 -translate-y-6 transition-all duration-300"
          style={{ left: `${(markerX / width) * 100}%`, top: `${(markerY / height) * 100}%` }}
        >
          {currentKg.toLocaleString()} kg collected!
        </div>

        {/* Labels under graph */}
        <div className="flex justify-between text-[9px] text-gray-400 font-bold mt-1 px-1">
          <span>0 kg</span>
          <span>2,500 kg</span>
          <span>5,000 kg+</span>
        </div>
      </div>

      {/* Spread the Word Invite Box matching Right Mockup */}
      <div className="bg-gradient-to-r from-red-950 via-[#181a28] to-gray-900 border border-red-800/60 rounded-2xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center text-lg shrink-0">
            🎁
          </div>
          <div>
            <h5 className="text-xs font-black text-white">Spread the word!</h5>
            <p className="text-[10px] text-gray-400">Invite more friends and help unlock best rates.</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('rewards')}
          className="bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow transition shrink-0"
        >
          Invite Now
        </button>
      </div>
    </div>
  );
};
