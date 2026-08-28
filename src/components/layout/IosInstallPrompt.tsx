import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X } from 'lucide-react';

export const IosInstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Detect if device is iOS (iPhone/iPad/iPod)
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    // Check if app is already running in standalone mode (already installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as unknown as { standalone?: boolean }).standalone);
    // Check if user dismissed prompt previously in this session
    const isDismissed = sessionStorage.getItem('ios_install_dismissed') === 'true';

    if (isIos && !isStandalone && !isDismissed) {
      // Delay prompt by 2.5s for seamless intro
      const timer = setTimeout(() => setShowPrompt(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showPrompt) return null;

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('ios_install_dismissed', 'true');
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-bounce-in">
      <div className="bg-[#181a28]/95 backdrop-blur-md border border-red-500/40 text-white rounded-3xl p-4 shadow-2xl shadow-red-950/40 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-full bg-gray-800/50"
          aria-label="Close prompt"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-2xl shrink-0 shadow-md">
            🐼
          </div>

          <div className="flex-1 pr-4">
            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>Install China Drop App</span>
              <span className="text-[10px] bg-red-600/30 text-red-400 px-2 py-0.5 rounded-full font-bold border border-red-500/30">
                iPhone / iPad
              </span>
            </h4>
            <p className="text-[11px] text-gray-300 mt-1 leading-snug">
              Install for instant full-screen app access, notifications, & offline browsing!
            </p>

            <div className="mt-3 bg-[#11131e] rounded-2xl p-2.5 border border-gray-800 text-[11px] space-y-1.5">
              <div className="flex items-center gap-2 text-gray-200 font-semibold">
                <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center text-[10px] font-extrabold shrink-0">1</span>
                <span>Tap Safari Share button <Share className="w-3.5 h-3.5 text-blue-400 inline mx-0.5" /> below</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200 font-semibold">
                <span className="w-5 h-5 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center text-[10px] font-extrabold shrink-0">2</span>
                <span>Select <span className="text-white font-bold inline-flex items-center gap-1 bg-gray-800 px-1.5 py-0.5 rounded border border-gray-700">Add to Home Screen <PlusSquare className="w-3 h-3 text-emerald-400" /></span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
