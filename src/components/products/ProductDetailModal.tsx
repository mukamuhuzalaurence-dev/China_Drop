import React, { useState } from 'react';
import { X, Weight, ShieldCheck, MapPin, Plus, Minus, ShoppingBag, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductDetail,
    setSelectedProductDetail,
    addToCart,
    formatMoney,
    currentShippingRatePerKg,
    setActiveTab,
    setActiveFriendId
  } = useApp();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const totalWeight = parseFloat((product.weightKg * quantity).toFixed(2));
  const productsSubtotalUSD = parseFloat((product.priceUSD * quantity).toFixed(2));
  const shippingEstUSD = parseFloat((totalWeight * currentShippingRatePerKg).toFixed(2));
  const grandTotalUSD = parseFloat((productsSubtotalUSD + shippingEstUSD).toFixed(2));

  const handleAskChinaFriend = () => {
    setSelectedProductDetail(null);
    setActiveFriendId('cf-1');
    setActiveTab('chinafriend');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center animate-fadeIn">
      <div className="bg-[#12141f] border-t border-gray-800 rounded-t-3xl w-full max-h-[90vh] overflow-y-auto p-4 space-y-4 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductDetail(null)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-800/80 text-gray-300 hover:text-white flex items-center justify-center transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-black/40 border border-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-gray-200 text-xs font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
            <Weight className="w-3.5 h-3.5 text-amber-400" />
            <span>{product.weightKg} kg per unit</span>
          </div>
        </div>

        {/* Product Information */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>{product.originCity}, China</span>
            </div>
          </div>

          <h3 className="text-base font-extrabold text-white mt-1.5 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Supplier Trust Card */}
        <div className="bg-[#181a26] border border-gray-800/80 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-200">{product.supplierName}</p>
              <p className="text-[10px] text-emerald-400 font-semibold">Verified Direct Manufacturer</p>
            </div>
          </div>

          <button
            onClick={handleAskChinaFriend}
            className="text-[11px] font-bold text-red-400 hover:text-red-300 flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Ask Friend
          </button>
        </div>

        {/* Quantity Selector & Cost Breakdown */}
        <div className="bg-[#181a26] border border-gray-800 rounded-2xl p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-300">Quantity</span>
            <div className="flex items-center gap-3 bg-[#12141f] border border-gray-700/80 rounded-xl px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 rounded-lg bg-gray-800 text-gray-300 flex items-center justify-center hover:bg-gray-700"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-black text-white w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 rounded-lg bg-gray-800 text-gray-300 flex items-center justify-center hover:bg-gray-700"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="space-y-1.5 pt-2 border-t border-gray-800 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Item Subtotal ({quantity}x)</span>
              <span className="text-gray-200 font-bold">{formatMoney(productsSubtotalUSD)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Total Weight ({totalWeight} kg @ {formatMoney(currentShippingRatePerKg)}/kg)</span>
              <span className="text-amber-400 font-bold">{formatMoney(shippingEstUSD)}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-white pt-1.5 border-t border-gray-800">
              <span>Estimated Total Cost</span>
              <span className="text-red-400">{formatMoney(grandTotalUSD)}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            addToCart(product, quantity);
            setSelectedProductDetail(null);
          }}
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm py-3 rounded-2xl shadow-lg shadow-red-900/50 flex items-center justify-center gap-2 active:scale-98 transition"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add {quantity} to China Drop Order</span>
        </button>
      </div>
    </div>
  );
};
