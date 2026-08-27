import React from 'react';
import { QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const STEPS = [
  { icon: '🛒', label: 'Order Placed' },
  { icon: '🏭', label: 'Purchased in China' },
  { icon: '📦', label: 'Consolidated' },
  { icon: '✈️', label: 'Air Freight' },
  { icon: '📍', label: 'Ready for Pickup' },
];

export const OrderTracker: React.FC = () => {
  const { orders, formatMoney } = useApp();
  const [showQR, setShowQR] = React.useState(false);

  if (!orders.length) return (
    <div className="pb-28 px-4 pt-12 flex flex-col items-center gap-3 text-center animate-fadeIn">
      <span className="text-5xl">📦</span>
      <p className="text-base font-black text-white">No orders yet</p>
      <p className="text-sm text-gray-500">Your order history will appear here after checkout.</p>
    </div>
  );

  const order = orders[0];

  return (
    <div className="pb-28 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#0c0d12] px-4 pt-4 pb-3">
        <p className="text-base font-black text-white">My Order</p>
      </div>

      {/* Status Tabs */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none">
        {(['Pending', 'Purchased', 'Shipped', 'Delivered'] as const).map((s, i) => (
          <button
            key={s}
            className={`flex-none flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all ${
              s === order.status
                ? 'bg-[#e50914]/15 border-[#e50914]/30'
                : 'bg-white/5 border-white/6'
            }`}
          >
            <span className="text-base">{['🕐','🛍️','✈️','✅'][i]}</span>
            <span className={`text-[9px] font-bold ${s === order.status ? 'text-[#e50914]' : 'text-gray-500'}`}>{s}</span>
          </button>
        ))}
      </div>

      <div className="px-3 space-y-3">
        {/* Order Card */}
        <div className="bg-[#13151f] border border-white/6 rounded-3xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">China Drop #001</p>
              <p className="text-xs font-bold text-gray-300 mt-0.5">Order ID: CD{order.id}</p>
            </div>
            <span className="text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full">
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/4 rounded-xl px-3 py-2">
                <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{item.product.name}</p>
                  <p className="text-[10px] text-gray-500">{item.product.weightKg} kg · ×{item.quantity}</p>
                </div>
                <p className="text-xs font-black text-white shrink-0">{formatMoney(item.product.priceUSD)}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t border-white/6 pt-3 space-y-1.5">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Total Weight</span>
              <span className="font-bold text-gray-200">{order.totalWeightKg} kg</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Est. Shipping</span>
              <span className="font-bold text-gray-200">{formatMoney(order.shippingTotalUSD)}</span>
            </div>
          </div>

          <button className="w-full bg-[#e50914] text-white font-black text-sm py-3 rounded-2xl shadow-red press-scale">
            Track My Order
          </button>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-[#13151f] border border-white/6 rounded-3xl p-4 space-y-3">
          <p className="text-sm font-black text-white">Tracking Timeline</p>
          <div>
            {order.trackingSteps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 ${
                    step.completed ? 'bg-emerald-500 text-white' : 'bg-white/8 border border-white/10'
                  }`}>
                    {step.completed ? '✓' : STEPS[i]?.icon ?? '○'}
                  </div>
                  {i < order.trackingSteps.length - 1 && (
                    <div className={`w-px my-1 ${step.completed ? 'bg-emerald-500/40' : 'bg-white/8'}`} style={{ height: 20 }} />
                  )}
                </div>
                <div className="pb-3 min-w-0">
                  <p className={`text-xs font-bold ${step.completed ? 'text-white' : 'text-gray-500'}`}>{step.step}</p>
                  <p className="text-[10px] text-gray-600">{step.location} · {step.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pickup Pass */}
        <div
          onClick={() => setShowQR(!showQR)}
          className="bg-[#13151f] border border-white/8 rounded-3xl p-4 flex items-center justify-between cursor-pointer press-scale"
        >
          <div>
            <p className="text-xs font-black text-white">Pickup Pass</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{order.deliveryHub}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#e50914]">{showQR ? 'Hide' : 'Show QR'}</span>
            <QrCode className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {showQR && (
          <div className="bg-[#13151f] border border-white/6 rounded-3xl p-6 flex flex-col items-center gap-4 animate-fadeIn">
            {/* Simulated QR grid */}
            <div className="w-36 h-36 bg-white rounded-2xl p-3 flex items-center justify-center">
              <div className="w-full h-full grid grid-cols-7 gap-0.5">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div key={i} className={`rounded-[1px] ${
                    [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48].includes(i) || Math.random() > 0.5
                      ? 'bg-gray-900' : 'bg-white'
                  }`} />
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-white">Ready for Pickup</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Show this QR at {order.deliveryHub}</p>
              <p className="text-xs font-black text-[#e50914] mt-2 tracking-widest">CD{order.id}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
