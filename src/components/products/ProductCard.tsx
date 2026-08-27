import React from 'react';
import { Plus, ShieldCheck, Star } from 'lucide-react';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, cartItems, formatMoney, setSelectedProductDetail } = useApp();
  const inCart = cartItems.find(i => i.product.id === product.id);

  return (
    <div
      className="bg-[#13151f] border border-white/6 rounded-2xl overflow-hidden card-hover cursor-pointer"
      onClick={() => setSelectedProductDetail(product)}
    >
      {/* Image */}
      <div className="relative h-32 bg-[#1a1c28] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
          {product.weightKg} kg
        </span>
        {product.verifiedSupplier && (
          <span className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
            <ShieldCheck className="w-2.5 h-2.5" /> Verified
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div>
          <p className="text-xs font-bold text-white truncate">{product.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
            <span className="text-[9px] text-gray-500 font-medium">{product.rating}</span>
            <span className="text-[9px] text-gray-600">· {product.originCity}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-white">{formatMoney(product.priceUSD)}</p>
          <button
            onClick={e => { e.stopPropagation(); addToCart(product); }}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black press-scale ${
              inCart ? 'bg-emerald-500' : 'bg-[#e50914] shadow-red-sm'
            }`}
          >
            {inCart ? inCart.quantity : <Plus className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
