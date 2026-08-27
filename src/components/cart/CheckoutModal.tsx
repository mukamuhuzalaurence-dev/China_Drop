import React, { useState } from 'react';
import { X, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CheckoutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    createOrderFromCart,
    setActiveTab,
    cartGrandTotalUSD,
    cartTotalWeightKg,
    formatMoney,
    user
  } = useApp();

  const [hub, setHub] = useState('Kigali City Tower Station');
  const [phone, setPhone] = useState(user.phone);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const hubs = [
    { name: 'Kigali City Tower Station', sub: 'Downtown Kigali · Fastest' },
    { name: 'Remera Bus Park Hub',        sub: 'Gasabo District' },
    { name: 'Huye Station',               sub: 'Southern Province (+1 day)' },
    { name: 'Rubavu Hub',                 sub: 'Western Province (+1 day)' },
    { name: 'Home/Office Delivery',       sub: 'Kigali metro (+$3.00)' },
  ];

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      createOrderFromCart(hub, 'MTN Mobile Money');
      setTimeout(() => { onClose(); setActiveTab('orders'); }, 2200);
    }, 1800);
  };

  if (success) return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#0f1018] border border-white/8 rounded-3xl p-8 flex flex-col items-center gap-4 text-center max-w-[320px] w-full shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <p className="text-base font-black text-white">Order Confirmed! 🎉</p>
          <p className="text-xs text-gray-400 mt-1">Payment received via MTN MoMo. You'll receive a notification shortly.</p>
        </div>
        <p className="text-xs font-bold text-gray-600">Redirecting to tracking…</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center animate-fadeIn">
      <div className="w-full bg-[#0f1018] rounded-t-3xl border-t border-white/8 max-h-[90vh] overflow-y-auto scrollbar-none">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <p className="text-base font-black text-white">Checkout</p>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/8 text-gray-400 press-scale">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 pb-8 space-y-4">
          {/* Summary */}
          <div className="bg-[#e50914]/10 border border-[#e50914]/20 rounded-2xl px-4 py-3 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-400 font-medium">{cartTotalWeightKg} kg · MTN MoMo</p>
              <p className="text-lg font-black text-white">{formatMoney(cartGrandTotalUSD)}</p>
            </div>
            <span className="text-3xl">📦</span>
          </div>

          {/* Pickup Hub */}
          <div className="space-y-2">
            <p className="text-xs font-black text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#e50914]" /> Select Pickup Hub
            </p>
            <div className="space-y-1.5">
              {hubs.map(h => (
                <button
                  key={h.name}
                  onClick={() => setHub(h.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border text-left transition-all press-scale ${
                    hub === h.name
                      ? 'bg-[#e50914]/10 border-[#e50914]/40 text-white'
                      : 'bg-white/4 border-white/6 text-gray-400'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">{h.name}</p>
                    <p className="text-[10px] text-gray-500">{h.sub}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    hub === h.name ? 'border-[#e50914] bg-[#e50914]' : 'border-gray-600'
                  }`}>
                    {hub === h.name && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* MoMo Number */}
          <div className="space-y-2">
            <p className="text-xs font-black text-white flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-amber-400" /> MTN Mobile Money
            </p>
            <div className="bg-white/6 border border-white/8 rounded-2xl px-4 py-3 flex items-center gap-2">
              <span className="text-base">📱</span>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="flex-1 text-sm font-bold text-white bg-transparent outline-none placeholder:text-gray-600"
                placeholder="+250 7XX XXX XXX"
              />
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-sm text-white shadow-red press-scale transition-all ${
              loading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-[#e50914] hover:bg-[#c00711]'
            }`}
          >
            {loading ? '⏳ Processing Payment…' : `Pay ${formatMoney(cartGrandTotalUSD)} · MoMo`}
          </button>

          <p className="text-center text-[10px] text-gray-600">
            🔒 Secure payment processed via MTN Mobile Money Rwanda
          </p>
        </div>
      </div>
    </div>
  );
};
