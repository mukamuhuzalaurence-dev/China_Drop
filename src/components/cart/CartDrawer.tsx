import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen, setIsCartOpen,
    cartItems, removeFromCart, updateCartQuantity,
    cartTotalWeightKg, cartEstShippingUSD, cartGrandTotalUSD,
    formatMoney, currentShippingRatePerKg
  } = useApp();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-[#0f1018] rounded-t-3xl z-50 flex flex-col max-h-[85vh] border-t border-white/8 shadow-[0_-8px_32px_rgba(0,0,0,0.6)] animate-fadeIn">

        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3">
          <div>
            <p className="text-base font-black text-white">Your Cart</p>
            <p className="text-[10px] text-gray-500">{cartItems.length} items · {cartTotalWeightKg} kg</p>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-xl bg-white/8 text-gray-400 press-scale">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shipping Rate Banner */}
        <div className="mx-4 mb-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-3 py-2.5 flex items-center gap-2">
          <span className="text-base">⚡</span>
          <div>
            <p className="text-xs font-black text-emerald-400">Current rate: ${currentShippingRatePerKg}/kg</p>
            <p className="text-[10px] text-gray-500">More buyers → price drops to $5.00/kg</p>
          </div>
        </div>

        {/* Items */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 py-12">
            <span className="text-4xl">🛒</span>
            <p className="text-sm font-bold text-gray-400">Cart is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 space-y-2.5 pb-3">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white/5 border border-white/6 rounded-2xl p-3 flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{product.name}</p>
                  <p className="text-[10px] text-gray-500">{product.weightKg} kg · {formatMoney(product.priceUSD)}</p>
                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center press-scale">
                      <Minus className="w-3 h-3 text-gray-400" />
                    </button>
                    <span className="text-xs font-black text-white w-4 text-center">{quantity}</span>
                    <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center press-scale">
                      <Plus className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-black text-white">{formatMoney(product.priceUSD * quantity)}</p>
                  <button onClick={() => removeFromCart(product.id)} className="p-1 text-gray-600 hover:text-red-500 press-scale">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary + Checkout */}
        {cartItems.length > 0 && (
          <div className="px-4 pt-3 pb-6 border-t border-white/6 space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Shipping ({cartTotalWeightKg} kg × ${currentShippingRatePerKg})</span>
                <span className="font-bold text-gray-200">{formatMoney(cartEstShippingUSD)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white">
                <span>Grand Total</span>
                <span>{formatMoney(cartGrandTotalUSD)}</span>
              </div>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-[#e50914] text-white font-black py-3.5 rounded-2xl shadow-red press-scale flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {showCheckout && <CheckoutModal onClose={() => { setShowCheckout(false); setIsCartOpen(false); }} />}
    </>
  );
};
