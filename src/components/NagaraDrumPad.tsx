/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { globalAudioEngine } from '../services/audioEngine';
import { X, Volume2, Sparkles } from 'lucide-react';

interface NagaraDrumPadProps {
  isOpen: boolean;
  onClose: () => void;
  drummerName: string;
}

export const NagaraDrumPad: React.FC<NagaraDrumPadProps> = ({
  isOpen,
  onClose,
  drummerName,
}) => {
  const [activePad, setActivePad] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerPad = (type: 'dum' | 'tek' | 'qosa' | 'roll') => {
    setActivePad(type);
    setTimeout(() => setActivePad(null), 180);

    if (type === 'dum') {
      globalAudioEngine.playDrumDum(1.2);
    } else if (type === 'tek') {
      globalAudioEngine.playDrumTek(1.0);
    } else if (type === 'qosa') {
      globalAudioEngine.playDoubleStrike();
    } else if (type === 'roll') {
      // Rapid drum roll
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          if (i % 2 === 0) globalAudioEngine.playDrumDum(0.8);
          else globalAudioEngine.playDrumTek(0.7);
        }, i * 50);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative max-w-md w-full bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 text-slate-100 shadow-2xl flex flex-col items-center gap-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-3xl mx-auto mb-2 shadow-lg">
            🥁
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Davulçu / Nağaraçı Rejimi
          </h3>
          <p className="text-xs text-amber-300 font-medium">
            Nağaraçı: {drummerName} · Canlı ritm vurun
          </p>
        </div>

        {/* Drum Visual Surface */}
        <div className="relative w-64 h-64 rounded-full bg-gradient-to-b from-amber-700 via-amber-900 to-stone-900 border-8 border-amber-600 shadow-[0_0_35px_rgba(217,119,6,0.6)] flex items-center justify-center p-4">
          {/* Drum Skin Center */}
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-100 via-amber-50 to-amber-200 border-4 border-amber-700/60 shadow-inner flex flex-col items-center justify-center gap-2 p-3 text-slate-900">
            {/* Center Dum button */}
            <button
              onClick={() => triggerPad('dum')}
              className={`w-24 h-24 rounded-full bg-gradient-to-br from-amber-700 to-amber-950 text-white font-extrabold text-sm shadow-xl flex flex-col items-center justify-center transition-transform cursor-pointer border-2 border-amber-400 ${
                activePad === 'dum' ? 'scale-90 brightness-125' : 'hover:scale-105'
              }`}
            >
              <span>DÜM</span>
              <span className="text-[10px] text-amber-300 font-normal">Bas Zərbə</span>
            </button>
          </div>

          {/* Top & Bottom Rim buttons */}
          <button
            onClick={() => triggerPad('tek')}
            className={`absolute top-2 px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer ${
              activePad === 'tek' ? 'ring-4 ring-white' : ''
            }`}
          >
            TƏK (Şapalaq)
          </button>

          <button
            onClick={() => triggerPad('qosa')}
            className={`absolute bottom-2 px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black text-xs shadow-md transition-all cursor-pointer ${
              activePad === 'qosa' ? 'ring-4 ring-white' : ''
            }`}
          >
            QOŞA ZƏRBƏ
          </button>
        </div>

        {/* Quick Drum Roll Button */}
        <div className="w-full flex gap-2">
          <button
            onClick={() => triggerPad('roll')}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Ritmik Tir-tir (Roll)</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          Klaviatura və ya toxunuşla ritmə uyğun bas və şapalaq vurun!
        </p>
      </div>
    </div>
  );
};
