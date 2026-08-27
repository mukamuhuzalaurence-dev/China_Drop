import React from 'react';
import { Crown, Trophy } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Leaderboard: React.FC = () => {
  const { leaderboard } = useApp();

  const topThree = leaderboard.slice(0, 3);
  const runnerUps = leaderboard.slice(3);

  return (
    <div className="bg-[#12141f] border border-gray-800 rounded-3xl p-4 shadow-xl">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-extrabold text-white">Community Leaderboard</h3>
        </div>
        <span className="text-[10px] bg-gray-800 text-gray-300 font-semibold px-2 py-0.5 rounded-full border border-gray-700">
          This Drop #001
        </span>
      </div>

      {/* Podium Display (2nd, 1st, 3rd) matching Mockup Screen 2 */}
      <div className="flex items-end justify-center gap-3 pt-4 pb-2 mb-4 border-b border-gray-800/60">
        {/* 2nd Place: Jean P. */}
        {topThree[1] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-1">
              <img
                src={topThree[1].avatar}
                alt={topThree[1].name}
                className="w-12 h-12 rounded-full border-2 border-slate-300 object-cover shadow-lg"
              />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-slate-300 text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-gray-900">
                2
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-200 mt-1">{topThree[1].name}</p>
            <p className="text-[10px] font-black text-amber-400">{topThree[1].weightKg} kg</p>
          </div>
        )}

        {/* 1st Place: Uwase A. (Center Podium) */}
        {topThree[0] && (
          <div className="flex flex-col items-center -mt-4">
            <Crown className="w-5 h-5 text-amber-400 animate-bounce mb-0.5" />
            <div className="relative mb-1">
              <img
                src={topThree[0].avatar}
                alt={topThree[0].name}
                className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover shadow-xl shadow-amber-500/20 ring-4 ring-amber-400/20"
              />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-gray-900 shadow-md">
                1
              </span>
            </div>
            <p className="text-xs font-black text-white mt-1">{topThree[0].name}</p>
            <p className="text-xs font-black text-amber-400">{topThree[0].weightKg} kg</p>
          </div>
        )}

        {/* 3rd Place: Manzi E. */}
        {topThree[2] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-1">
              <img
                src={topThree[2].avatar}
                alt={topThree[2].name}
                className="w-12 h-12 rounded-full border-2 border-amber-700 object-cover shadow-lg"
              />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-gray-900">
                3
              </span>
            </div>
            <p className="text-[11px] font-bold text-gray-200 mt-1">{topThree[2].name}</p>
            <p className="text-[10px] font-black text-amber-400">{topThree[2].weightKg} kg</p>
          </div>
        )}
      </div>

      {/* Runner Up List */}
      <div className="space-y-2">
        {runnerUps.map((u) => (
          <div key={u.rank} className="flex items-center justify-between bg-[#161824] p-2 rounded-xl border border-gray-800/80">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-gray-500 w-4 text-center">{u.rank}</span>
              <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
              <span className="text-xs font-semibold text-gray-200">{u.name}</span>
            </div>
            <span className="text-xs font-bold text-amber-400">{u.weightKg} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
};
