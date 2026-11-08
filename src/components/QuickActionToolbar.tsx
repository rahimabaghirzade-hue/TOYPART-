/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Users,
  Crown,
  Sparkles,
  PartyPopper,
  Gift,
  Flame,
  Banknote,
} from 'lucide-react';

interface QuickActionToolbarProps {
  onJoinHalay: () => void;
  onBecomeLead: () => void;
  onBecomeBride: () => void;
  onBecomeGroom: () => void;
  onOpenDrumPad: () => void;
  onCheerTekiTak: () => void;
  onTriggerConfetti: () => void;
  onOpenGiftModal: () => void;
  onTriggerMoneyRain: () => void;
}

export const QuickActionToolbar: React.FC<QuickActionToolbarProps> = ({
  onJoinHalay,
  onBecomeLead,
  onBecomeBride,
  onBecomeGroom,
  onOpenDrumPad,
  onCheerTekiTak,
  onTriggerConfetti,
  onOpenGiftModal,
  onTriggerMoneyRain,
}) => {
  return (
    <div className="w-full bg-slate-900/95 border border-amber-500/30 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-2 mb-2 px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Meydan Hərəkətləri və Əlavə Düymələr:</span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Bütün düymələr aktivdir və toxunuşa reaksiya verir
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
        {/* 1. Halaya qatıl */}
        <button
          onClick={onJoinHalay}
          className="p-2.5 rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <Users className="w-4 h-4 text-emerald-200" />
          <span className="truncate">Halaya qatıl</span>
        </button>

        {/* 2. Halaybaşı */}
        <button
          onClick={onBecomeLead}
          className="p-2.5 rounded-xl bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <Crown className="w-4 h-4 text-amber-300" />
          <span className="truncate">Halaybaşı</span>
        </button>

        {/* 3. Gəlin ol */}
        <button
          onClick={onBecomeBride}
          className="p-2.5 rounded-xl bg-gradient-to-b from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <span className="text-base leading-none">👰</span>
          <span className="truncate">Gəlin ol</span>
        </button>

        {/* 4. Bəy ol */}
        <button
          onClick={onBecomeGroom}
          className="p-2.5 rounded-xl bg-gradient-to-b from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 active:scale-95 text-amber-200 font-bold text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer border border-slate-600"
        >
          <span className="text-base leading-none">🤵</span>
          <span className="truncate">Bəy ol</span>
        </button>

        {/* 5. Davulçu ol */}
        <button
          onClick={onOpenDrumPad}
          className="p-2.5 rounded-xl bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <span className="text-base leading-none">🥁</span>
          <span className="truncate">Davulçu ol</span>
        </button>

        {/* 6. Təki-tak */}
        <button
          onClick={onCheerTekiTak}
          className="p-2.5 rounded-xl bg-gradient-to-b from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 active:scale-95 text-slate-950 font-black text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer animate-pulse"
        >
          <Flame className="w-4 h-4 fill-current" />
          <span className="truncate">Təki-tak!</span>
        </button>

        {/* 7. Pul yağdır (NEW) */}
        <button
          onClick={onTriggerMoneyRain}
          className="p-2.5 rounded-xl bg-gradient-to-b from-emerald-500 to-teal-700 hover:from-emerald-400 hover:to-teal-600 active:scale-95 text-white font-black text-xs shadow-lg transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ring-2 ring-amber-300/60"
        >
          <Banknote className="w-4 h-4 text-amber-300 animate-bounce" />
          <span className="truncate">Pul yağdır 💸</span>
        </button>

        {/* 8. Konfeti */}
        <button
          onClick={onTriggerConfetti}
          className="p-2.5 rounded-xl bg-gradient-to-b from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <PartyPopper className="w-4 h-4 text-yellow-300" />
          <span className="truncate">Konfeti</span>
        </button>

        {/* 9. Hədiyyə göndərəni qarşıla */}
        <button
          onClick={onOpenGiftModal}
          className="p-2.5 rounded-xl bg-gradient-to-b from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <Gift className="w-4 h-4 text-pink-200" />
          <span className="truncate">Hədiyyə qarşıla</span>
        </button>
      </div>
    </div>
  );
};
