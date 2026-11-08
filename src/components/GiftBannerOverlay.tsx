/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, X } from 'lucide-react';

interface GiftBannerOverlayProps {
  senderName: string;
  giftName?: string;
  giftEmoji?: string;
  onClose: () => void;
}

export const GiftBannerOverlay: React.FC<GiftBannerOverlayProps> = ({
  senderName,
  giftName,
  giftEmoji,
  onClose,
}) => {
  useEffect(() => {
    // Fire festive fireworks confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.6 },
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#F59E0B', '#EF4444', '#10B981'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#FBBF24', '#EC4899', '#3B82F6'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Auto close after 6 seconds if not closed
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in select-none">
      {/* Background Animated Glow */}
      <div className="absolute w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Main Festive Banner Box */}
      <div className="relative max-w-xl w-full bg-gradient-to-b from-slate-900 via-amber-950/90 to-slate-900 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.5)] text-center flex flex-col items-center gap-4 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gift Icon Badge */}
        {giftEmoji && (
          <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center shadow-lg -mt-12 sm:-mt-14 backdrop-blur-md animate-bounce">
            <span className="text-5xl">{giftEmoji}</span>
          </div>
        )}

        {giftName && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>TikTok Hədiyyəsi: {giftName}</span>
          </div>
        )}

        {/* The Exact Required Sentences in Azerbaijani */}
        <div className="space-y-3 my-2">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 tracking-tight drop-shadow-[0_2px_10px_rgba(245,158,11,0.6)]">
            🎉 XOŞ GƏLMİSƏN, {senderName.toUpperCase()}!
          </h2>

          <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-300 tracking-wide animate-pulse flex items-center justify-center gap-2">
            <span>👏</span>
            <span>HAMI ƏL ÇALSIN!</span>
            <span>👏</span>
          </p>
        </div>

        {/* Village Blessing Tag */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-md">
          Kəndimizin toy məclisinə təşrif buyurduğunuz üçün minnətdarıq! Bərəkətli, nurlu və sevinc dolu olsun!
        </p>

        {/* Clapping visual indicators */}
        <div className="flex items-center justify-center gap-3 text-2xl pt-2">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>👏</span>
          <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>💃</span>
          <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🥁</span>
          <span className="animate-bounce" style={{ animationDelay: '0.45s' }}>🕺</span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>👏</span>
        </div>

        <button
          onClick={onClose}
          className="mt-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
        >
          Məclisə davam et
        </button>
      </div>
    </div>
  );
};
