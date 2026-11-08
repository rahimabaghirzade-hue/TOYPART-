/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Character } from '../types/wedding';
import { CharacterFigure } from './CharacterFigure';
import { VillageDecorations } from './VillageDecorations';
import { Sparkles, Users, Music } from 'lucide-react';

interface VillageSquareProps {
  characters: Character[];
  isDancing: boolean;
  tempoSpeed: 'slow' | 'normal' | 'fast';
  activeSongTitle: string;
  totalShabash: number;
  onSelectCharacter: (char: Character) => void;
  onTossMoney: (char: Character) => void;
  onQuickJoin: () => void;
}

export const VillageSquare: React.FC<VillageSquareProps> = ({
  characters,
  isDancing,
  tempoSpeed,
  activeSongTitle,
  totalShabash,
  onSelectCharacter,
  onTossMoney,
  onQuickJoin,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sortedCharacters = [...characters].sort((a, b) => {
    const rolePriority: Record<string, number> = {
      halaybasi: 1,
      gelin: 2,
      bey: 3,
      davulcu: 4,
      istirakci: 5,
      qonaq: 6,
    };
    return (rolePriority[a.role] || 99) - (rolePriority[b.role] || 99);
  });

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-amber-900/30 shadow-2xl bg-slate-950 min-h-[480px] flex flex-col justify-between">
      {/* Background Village Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/village_wedding_backdrop_1794155079828.jpg"
          alt="Azərbaycan Kənd Toyu Meydanı"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-black/50" />
      </div>

      {/* Floating Balloons & Virtual Banquet Tables (Plov, Shekerbura, etc.) */}
      <VillageDecorations />

      {/* Top Wedding Festoon Lights & Bunting Flags */}
      <div className="relative z-10 w-full pt-2 px-4 flex flex-col items-center pointer-events-none">
        <div className="w-full flex justify-between gap-1 overflow-hidden opacity-95">
          {Array.from({ length: 16 }).map((_, i) => {
            const flagColors = ['#EF4444', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899'];
            const color = flagColors[i % flagColors.length];
            return (
              <svg
                key={i}
                className="w-7 h-9 shrink-0 drop-shadow-md animate-pulse"
                style={{ animationDuration: `${2 + (i % 3)}s` }}
                viewBox="0 0 24 32"
                fill="none"
              >
                <polygon points="2,0 22,0 12,28" fill={color} />
                <line x1="2" y1="0" x2="22" y2="0" stroke="#FDE68A" strokeWidth="2" />
              </svg>
            );
          })}
        </div>

        <div className="w-full flex justify-around -mt-1 px-3">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="w-3.5 h-3.5 rounded-full bg-amber-200 border border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse-glow"
              style={{ animationDelay: `${(i * 0.2) % 1.5}s` }}
            />
          ))}
        </div>
      </div>

      {/* Top Info Bar inside the Square */}
      <div className="relative z-10 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30 text-white shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Music className="w-4 h-4 text-amber-400" />
          <span className="font-semibold text-amber-200">{activeSongTitle}</span>
          <span className="text-slate-400">·</span>
          <span className="text-emerald-300 font-medium">
            {isDancing ? 'Yallı gedir' : 'Fasilə'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-amber-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40 text-amber-300 shadow-lg font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Toplanan Şabaş:</span>
            <span className="text-white font-mono tabular-nums">₼ {totalShabash}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-slate-200 shadow-lg">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-mono tabular-nums font-semibold">{characters.length}</span>
            <span>nəfər</span>
          </div>
        </div>
      </div>

      {/* Main Halay / Yallı Dance Stage */}
      <div className="relative z-10 w-full mt-auto">
        <div className="relative mx-auto max-w-5xl px-2">
          <div
            className="w-full h-14 rounded-t-3xl border-t-2 border-x-2 border-amber-500/60 shadow-[0_-8px_25px_rgba(0,0,0,0.6)] relative overflow-hidden"
            style={{
              backgroundImage: `url(/src/assets/images/azerbaijani_carpet_pattern_1794155079559.jpg)`,
              backgroundSize: '320px',
              backgroundRepeat: 'repeat-x',
            }}
          >
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />
            <div className="absolute inset-0 bg-red-950/20 backdrop-contrast-125" />
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="relative -mt-28 pb-4 px-4 overflow-x-auto scrollbar-thin flex items-end justify-center min-w-full"
        >
          <div className="inline-flex items-end gap-2 md:gap-4 px-6 min-w-max">
            {sortedCharacters.map((char, index) => (
              <CharacterFigure
                key={char.id}
                character={char}
                index={index}
                isDancing={isDancing}
                tempoSpeed={tempoSpeed}
                onSelectCharacter={onSelectCharacter}
                onTossMoney={onTossMoney}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Join Action */}
      <div className="relative z-10 px-4 py-2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between gap-3 text-xs text-slate-300">
        <span className="hidden sm:inline">
          💡 Rəqqasların üstünə klikləyərək şabaş verə və onları fırlada bilərsiniz.
        </span>
        <button
          onClick={onQuickJoin}
          className="ml-auto px-4 py-1.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <Users className="w-3.5 h-3.5" />
          <span>Halaya qatıl</span>
        </button>
      </div>
    </div>
  );
};
