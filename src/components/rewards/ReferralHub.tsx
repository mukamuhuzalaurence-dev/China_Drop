import React, { useState } from 'react';
import { Copy, Share2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReferralHub: React.FC = () => {
  const { user, addPoints } = useApp();
  const [copied, setCopied] = useState(false);
  const inviteLink = `https://chinadrop.rw/invite/${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'China Drop Rwanda', text: 'Buy from China cheaper together!', url: inviteLink }).catch(() => {});
    } else {
      navigator.clipboard.writeText(inviteLink);
      alert('Invite link copied!');
    }
  };

  const pointsShop = [
    { icon: '📦', label: '$5.00 Shipping Credit', pts: 200, color: 'text-blue-400' },
    { icon: '🔍', label: 'Free Quality Inspection', pts: 350, color: 'text-purple-400' },
    { icon: '🎁', label: 'Mystery Gift Box', pts: 500, color: 'text-amber-400' },
    { icon: '🚀', label: 'Priority Drop Access', pts: 750, color: 'text-emerald-400' },
  ];

  return (
    <div className="pb-28 animate-fadeIn space-y-3 px-3 pt-4">

      {/* Hero Invite Card */}
      <div className="relative bg-gradient-to-br from-[#e50914] to-[#8b0000] rounded-3xl p-5 overflow-hidden shadow-red">
        <div className="absolute top-0 right-0 text-[80px] opacity-15 pointer-events-none">🎁</div>
        <p className="text-[10px] font-bold text-red-200 uppercase tracking-widest mb-1">Invite & Earn Rewards</p>
        <h2 className="text-xl font-black text-white mb-1">Invite friends, earn more!</h2>
        <div className="flex gap-4 mt-2 mb-4">
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center">
            <p className="text-sm font-black text-white">200 pts</p>
            <p className="text-[9px] text-red-200">You get</p>
          </div>
          <div className="bg-white/15 rounded-xl px-3 py-2 text-center">
            <p className="text-sm font-black text-white">100 pts</p>
            <p className="text-[9px] text-red-200">Friend gets</p>
          </div>
        </div>

        {/* Referral Code box */}
        <div className="bg-white rounded-2xl px-4 py-3 flex items-center justify-between mb-3">
          <div>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Your Referral Code</p>
            <p className="text-base font-black text-gray-900 tracking-widest">{user.referralCode}</p>
          </div>
          <button onClick={handleCopy} className="flex items-center gap-1.5 bg-[#e50914] text-white text-xs font-black px-3 py-2 rounded-xl press-scale">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Invite link */}
        <div className="bg-white/15 rounded-xl px-3 py-2 flex items-center justify-between">
          <p className="text-[10px] text-red-100 truncate">{inviteLink}</p>
          <button onClick={handleShare} className="ml-2 shrink-0 p-1.5 bg-white/20 rounded-lg press-scale">
            <Share2 className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-[#13151f] border border-white/6 rounded-3xl p-4 space-y-3">
        <p className="text-sm font-black text-white">How it works</p>
        <div className="flex items-center justify-between gap-2">
          {[
            { icon: '👥', label: 'Invite Friends join' },
            { icon: '🛍️', label: 'They shop' },
            { icon: '🪙', label: 'Earn rewards Unlock benefits' },
          ].map((step, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center text-center gap-1.5">
                <div className="w-10 h-10 rounded-2xl bg-white/8 flex items-center justify-center text-xl">{step.icon}</div>
                <p className="text-[9px] font-bold text-gray-400 leading-tight">{step.label}</p>
              </div>
              {i < 2 && <div className="text-gray-700 font-bold text-sm">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Points Balance */}
      <div className="bg-[#13151f] border border-white/6 rounded-3xl p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Your Points Balance</p>
          <p className="text-2xl font-black text-white">{user.pointsBalance} <span className="text-amber-400">pts</span></p>
        </div>
        <span className="text-4xl">🪙</span>
      </div>

      {/* Points Shop */}
      <div className="bg-[#13151f] border border-white/6 rounded-3xl p-4 space-y-3">
        <p className="text-sm font-black text-white">Redeem Points</p>
        <div className="space-y-2">
          {pointsShop.map(item => (
            <div key={item.label} className="flex items-center justify-between bg-white/5 rounded-2xl px-3 py-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold text-white">{item.label}</p>
                  <p className={`text-[10px] font-black ${item.color}`}>{item.pts} pts</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (user.pointsBalance >= item.pts) {
                    addPoints(-item.pts);
                    alert(`🎉 "${item.label}" redeemed successfully!`);
                  } else {
                    alert(`You need ${item.pts - user.pointsBalance} more points.`);
                  }
                }}
                className={`text-xs font-black px-3 py-1.5 rounded-xl press-scale ${
                  user.pointsBalance >= item.pts
                    ? 'bg-[#e50914] text-white shadow-red-sm'
                    : 'bg-white/8 text-gray-500 border border-white/6'
                }`}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Now CTA */}
      <button
        onClick={handleShare}
        className="w-full bg-[#e50914] text-white font-black text-sm py-3.5 rounded-2xl shadow-red press-scale"
      >
        Invite Now
      </button>
    </div>
  );
};
