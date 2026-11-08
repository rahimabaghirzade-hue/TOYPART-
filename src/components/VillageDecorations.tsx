/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const VillageDecorations: React.FC = () => {
  return (
    <>
      {/* Floating Balloons Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {/* Balloon 1 */}
        <div className="absolute bottom-10 left-10 animate-float-balloon" style={{ animationDuration: '7s' }}>
          <div className="w-8 h-10 bg-rose-500 rounded-full shadow-lg relative flex items-center justify-center">
            <div className="absolute -bottom-1 w-1 h-2 bg-rose-700" />
            <div className="absolute bottom-[-16px] w-0.5 h-4 bg-white/60" />
          </div>
        </div>

        {/* Balloon 2 */}
        <div className="absolute bottom-16 right-16 animate-float-balloon" style={{ animationDuration: '9s', animationDelay: '1s' }}>
          <div className="w-9 h-11 bg-amber-400 rounded-full shadow-lg relative flex items-center justify-center">
            <div className="absolute -bottom-1 w-1 h-2 bg-amber-600" />
            <div className="absolute bottom-[-16px] w-0.5 h-4 bg-white/60" />
          </div>
        </div>

        {/* Balloon 3 */}
        <div className="absolute bottom-8 left-1/3 animate-float-balloon" style={{ animationDuration: '8s', animationDelay: '2s' }}>
          <div className="w-8 h-10 bg-emerald-500 rounded-full shadow-lg relative flex items-center justify-center">
            <div className="absolute -bottom-1 w-1 h-2 bg-emerald-700" />
            <div className="absolute bottom-[-16px] w-0.5 h-4 bg-white/60" />
          </div>
        </div>

        {/* Balloon 4 */}
        <div className="absolute bottom-12 right-1/3 animate-float-balloon" style={{ animationDuration: '10s', animationDelay: '0.5s' }}>
          <div className="w-9 h-11 bg-sky-500 rounded-full shadow-lg relative flex items-center justify-center">
            <div className="absolute -bottom-1 w-1 h-2 bg-sky-700" />
            <div className="absolute bottom-[-16px] w-0.5 h-4 bg-white/60" />
          </div>
        </div>
      </div>

      {/* Traditional Wedding Banquet Tables with Plov, Shekerbura, Paxlava, Tea */}
      <div className="absolute bottom-4 left-6 z-15 flex items-end gap-3 pointer-events-auto">
        {/* Table 1: Şah Plovu və Armudu Çay */}
        <div className="bg-amber-950/85 border border-amber-500/50 rounded-xl p-2.5 shadow-2xl backdrop-blur-md flex flex-col items-center gap-1 group transition-transform hover:scale-105">
          <div className="text-2xl animate-bounce" style={{ animationDuration: '3s' }}>🍲</div>
          <div className="text-[11px] font-bold text-amber-200">Şah Plovu & Çay</div>
          <div className="flex gap-1 text-xs">
            <span>🍚</span>
            <span>☕</span>
          </div>
        </div>

        {/* Table 2: Şəkərbura və Paxlava */}
        <div className="bg-amber-950/85 border border-amber-500/50 rounded-xl p-2.5 shadow-2xl backdrop-blur-md flex flex-col items-center gap-1 group transition-transform hover:scale-105">
          <div className="text-2xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>🥟</div>
          <div className="text-[11px] font-bold text-amber-200">Şəkərbura & Paxlava</div>
          <div className="flex gap-1 text-xs">
            <span>🥮</span>
            <span>🍇</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBalloon {
          0% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-40px) rotate(3deg);
          }
          100% {
            transform: translateY(0px) rotate(-3deg);
          }
        }
        .animate-float-balloon {
          animation-name: floatBalloon;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
};
