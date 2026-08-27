import React, { useState } from 'react';
import { X, Link, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomSourcingModal: React.FC = () => {
  const {
    isCustomSourcingModalOpen,
    setIsCustomSourcingModalOpen,
    submitSourcingRequest,
    setActiveTab,
    setActiveFriendId
  } = useApp();

  const [urlOrTitle, setUrlOrTitle] = useState('');
  const [quantity, setQuantity] = useState(50);
  const [notes, setNotes] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isCustomSourcingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlOrTitle.trim()) return;

    submitSourcingRequest({
      productUrlOrTitle: urlOrTitle,
      quantity: Number(quantity),
      targetPrice: targetPrice ? Number(targetPrice) : undefined,
      notes
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsCustomSourcingModalOpen(false);
      setUrlOrTitle('');
      setNotes('');
      setActiveFriendId('cf-1');
      setActiveTab('chinafriend');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center animate-fadeIn">
      <div className="bg-[#12141f] border-t border-gray-800 rounded-t-3xl w-full max-h-[90vh] overflow-y-auto p-4 space-y-4 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
              <span>Source Any Product from China</span>
              <span className="text-xs">🇨🇳</span>
            </h3>
            <p className="text-[11px] text-gray-400">
              Paste link or describe what you need to buy in bulk
            </p>
          </div>
          <button
            onClick={() => setIsCustomSourcingModalOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-800 text-gray-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-white">Sourcing Request Sent!</h4>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Your China Friend (Lily) is investigating suppliers in Yiwu & Shenzhen. Check chat for real-time updates!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Input URL or Title */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Product Link or Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Link className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={urlOrTitle}
                  onChange={(e) => setUrlOrTitle(e.target.value)}
                  placeholder="e.g., https://detail.1688.com/offer/... or '100 Power Banks'"
                  className="w-full bg-[#181a26] border border-gray-700/80 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Quantity & Target Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Quantity Needed
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full bg-[#181a26] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  Target Price ($ / unit)
                </label>
                <input
                  type="number"
                  placeholder="Optional ($)"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full bg-[#181a26] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Color / Specs / Branding Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Black color, 20000mAh, EU plug adapter..."
                className="w-full bg-[#181a26] border border-gray-700/80 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition"
              />
            </div>

            {/* Info Callout */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 flex items-start gap-2 text-[11px] text-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Earn <strong>+25 reward points</strong> automatically upon submitting your request!
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm py-3 rounded-xl shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>Send Request to China Friend</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
