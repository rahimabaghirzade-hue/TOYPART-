/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Character } from '../types/wedding';

interface CharacterFigureProps {
  character: Character;
  index: number;
  isDancing: boolean;
  tempoSpeed: 'slow' | 'normal' | 'fast';
  onSelectCharacter?: (char: Character) => void;
  onMakeLead?: (char: Character) => void;
  onTossMoney?: (char: Character) => void;
}

export const CharacterFigure: React.FC<CharacterFigureProps> = ({
  character,
  index,
  isDancing,
  tempoSpeed,
  onSelectCharacter,
  onMakeLead,
  onTossMoney,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [shabashList, setShabashList] = useState<Array<{ id: number; text: string; x: number }>>([]);
  const [toastText, setToastText] = useState<string | null>(null);

  const roleLabels: Record<string, { title: string; color: string; icon: string }> = {
    gelin: { title: 'Gəlin', color: 'bg-rose-500 text-white', icon: '👰' },
    bey: { title: 'Bəy', color: 'bg-slate-900 text-amber-200', icon: '🤵' },
    davulcu: { title: 'Davulçu', color: 'bg-amber-600 text-white', icon: '🥁' },
    halaybasi: { title: 'Halaybaşı', color: 'bg-red-600 text-white', icon: '🚩' },
    istirakci: { title: 'Rəqqas', color: 'bg-emerald-700 text-white', icon: '🪗' },
    qonaq: { title: 'Qonaq', color: 'bg-indigo-700 text-white', icon: '👏' },
  };

  const roleInfo = roleLabels[character.role] || roleLabels.istirakci;

  const handleFigureClick = () => {
    // Interactive action when user clicks character
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 900);

    // Floating money / shabaş effect
    const newShabash = {
      id: Date.now() + Math.random(),
      text: '₼ 50 Şabaş!',
      x: (Math.random() - 0.5) * 30,
    };
    setShabashList((prev) => [...prev.slice(-3), newShabash]);
    setTimeout(() => {
      setShabashList((prev) => prev.filter((item) => item.id !== newShabash.id));
    }, 1200);

    // Show temporary joyful toast
    const shouts = [
      'Sağ ol!',
      'Şabaş!',
      'Xoşbəxt olsunlar!',
      'Qayna-qayna!',
      'Can-can!',
      'Halay qopsun!',
    ];
    setToastText(shouts[Math.floor(Math.random() * shouts.length)]);
    setTimeout(() => setToastText(null), 1600);

    if (onTossMoney) {
      onTossMoney(character);
    }
    if (onSelectCharacter) {
      onSelectCharacter(character);
    }
  };

  const animationClass = isDancing
    ? tempoSpeed === 'fast'
      ? 'animate-halay-fast'
      : 'animate-halay'
    : '';

  // Stagger animation timing so the chain sways in a unified, flowing wave
  const animationDelay = `${(index * 0.12) % 0.8}s`;

  return (
    <div
      onClick={handleFigureClick}
      className={`relative flex flex-col items-center cursor-pointer select-none group transition-transform duration-200 hover:scale-105 ${
        character.isHighlighted ? 'scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : ''
      }`}
      style={{
        zIndex: 20 + index,
      }}
    >
      {/* Floating Shabash animations */}
      {shabashList.map((s) => (
        <span
          key={s.id}
          className="absolute -top-12 text-xs font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded shadow pointer-events-none animate-float-shabash whitespace-nowrap z-50 border border-amber-400"
          style={{ transform: `translateX(${s.x}px)` }}
        >
          {s.text}
        </span>
      ))}

      {/* Floating Speech Toast */}
      {toastText && (
        <div className="absolute -top-14 bg-white/95 text-slate-900 text-[11px] font-bold px-2 py-1 rounded-md shadow-lg border border-amber-400 whitespace-nowrap z-50 animate-bounce">
          {toastText}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-amber-400" />
        </div>
      )}

      {/* Name and Role Tag over character head */}
      <div className="flex flex-col items-center mb-1 transition-all duration-200">
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-white border border-amber-500/40 shadow-md">
          <span className="text-[11px]">{roleInfo.icon}</span>
          <span className="text-[11px] font-bold tracking-tight text-amber-200 max-w-[80px] truncate">
            {character.name}
          </span>
        </div>
        <span className="text-[9px] font-medium text-amber-300 drop-shadow-sm -mt-0.5">
          {roleInfo.title}
        </span>
      </div>

      {/* Character Visual Avatar Container */}
      <div
        className={`relative w-20 h-36 flex items-center justify-center transition-all ${animationClass} ${
          isSpinning ? 'rotate-[360deg] transition-transform duration-700 ease-in-out' : ''
        }`}
        style={{ animationDelay }}
      >
        {/* HALAYBAŞI: Waving red silk handkerchief (qırmızı ipək dəsmal) */}
        {character.role === 'halaybasi' && (
          <div className="absolute -top-3 -right-2 z-30 animate-desmal">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path
                d="M4 6 C 14 2, 24 10, 30 5 C 27 16, 29 26, 18 30 C 14 20, 8 16, 4 6 Z"
                fill="#EF4444"
                stroke="#B91C1C"
                strokeWidth="1.2"
              />
              <circle cx="4" cy="6" r="3" fill="#FBBF24" />
              {/* Golden fringes */}
              <path d="M18 30 L22 34 M22 28 L27 32 M26 24 L31 27" stroke="#FDE047" strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {/* BRIDE (GƏLİN): White wedding veil, tiara, red belt */}
        {character.role === 'gelin' && (
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Wedding Tiara / Crown */}
            <div className="w-6 h-3 -mb-1 z-20 flex justify-center items-center">
              <span className="text-sm">👑</span>
            </div>

            {/* Bridal Veil flowing behind */}
            <div className="absolute top-2 w-16 h-28 bg-white/40 rounded-full blur-[0.5px] border border-white/70 -z-10 shadow-sm" />

            {/* Head */}
            <div className="w-8 h-8 rounded-full bg-[#fcd4b8] border border-amber-300 relative z-10 flex items-center justify-center shadow-xs">
              <div className="flex gap-1.5 pt-1">
                <span className="w-1 h-1 bg-amber-900 rounded-full" />
                <span className="w-1 h-1 bg-amber-900 rounded-full" />
              </div>
              {/* Delicate smile */}
              <div className="absolute bottom-1.5 w-2 h-1 border-b border-rose-500 rounded-full" />
            </div>

            {/* Traditional Bridal Gown with Red Waist Ribbon (Qırmızı Kəmər) */}
            <div className="relative w-14 h-20 -mt-1 flex flex-col items-center z-10">
              {/* Gown Bodice */}
              <div className="w-10 h-9 bg-white border border-amber-200 rounded-t-lg flex flex-col items-center pt-1 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              {/* Red Ribbon (Qırmızı Kəmər) */}
              <div className="w-11 h-2 bg-rose-600 rounded-xs shadow-xs z-20 flex justify-center items-center">
                <span className="w-2 h-1 bg-amber-300 rounded-full" />
              </div>
              {/* Flowing Skirt with Gold Embroidery */}
              <div className="w-14 h-11 bg-white border border-amber-200 rounded-b-2xl shadow-md flex items-end justify-center pb-1">
                <div className="w-12 h-1 border-b-2 border-amber-400 border-dashed" />
              </div>

              {/* Graceful Dancing Hands */}
              <div className="absolute top-3 -left-3 w-5 h-2 bg-[#fcd4b8] rounded-full -rotate-45 border border-amber-300/60" />
              <div className="absolute top-3 -right-3 w-5 h-2 bg-[#fcd4b8] rounded-full rotate-45 border border-amber-300/60" />
            </div>

            {/* Shoes */}
            <div className="flex gap-2 -mt-1 z-0">
              <div className="w-3 h-2 bg-rose-700 rounded-full" />
              <div className="w-3 h-2 bg-rose-700 rounded-full" />
            </div>
          </div>
        )}

        {/* GROOM (BƏY): Astrakhan papaq, dark chokha, ceremonial dagger belt */}
        {character.role === 'bey' && (
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Azerbaijani Astrakhan Papaq (Qaragül papağı) */}
            <div className="w-9 h-6 bg-stone-900 rounded-t-xl border-t border-amber-400/50 shadow-md relative z-20 flex items-center justify-center">
              <div className="w-8 h-1 bg-stone-800 rounded-full" />
            </div>

            {/* Head */}
            <div className="w-8 h-8 rounded-full bg-[#f8cca7] border border-amber-700/30 relative z-10 flex flex-col items-center justify-center shadow-xs -mt-1">
              <div className="flex gap-1.5 pt-1">
                <span className="w-1 h-1 bg-amber-950 rounded-full" />
                <span className="w-1 h-1 bg-amber-950 rounded-full" />
              </div>
              {/* Mustache */}
              <div className="w-4 h-1 bg-stone-900 rounded-full mt-1" />
            </div>

            {/* Chokha / Groom Coat */}
            <div className="relative w-12 h-20 -mt-1 flex flex-col items-center z-10">
              <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-t-md relative flex justify-between px-1 pt-2">
                {/* Silver Gazyrs (Patrontaş) on chest */}
                <div className="flex flex-col gap-0.5">
                  <span className="w-2 h-0.5 bg-amber-300" />
                  <span className="w-2 h-0.5 bg-amber-300" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="w-2 h-0.5 bg-amber-300" />
                  <span className="w-2 h-0.5 bg-amber-300" />
                </div>
              </div>

              {/* Silver Belt with Dagger */}
              <div className="w-11 h-2 bg-amber-500 rounded-xs z-20 flex items-center justify-center">
                <span className="w-1.5 h-3 bg-slate-300 border border-slate-600 rounded-xs -mt-1" />
              </div>

              {/* Lower coat */}
              <div className="w-11 h-10 bg-slate-900 border border-slate-700 rounded-b-md shadow-sm" />

              {/* Hands */}
              <div className="absolute top-4 -left-2 w-4 h-2 bg-[#f8cca7] rounded-full -rotate-30" />
              <div className="absolute top-4 -right-2 w-4 h-2 bg-[#f8cca7] rounded-full rotate-30" />
            </div>

            {/* Black Boots */}
            <div className="flex gap-2 -mt-1">
              <div className="w-3 h-3 bg-stone-900 rounded-xs" />
              <div className="w-3 h-3 bg-stone-900 rounded-xs" />
            </div>
          </div>
        )}

        {/* DRUMMER (DAVULÇU / NAĞARAÇI): Traditional vest, holding large Nağara */}
        {character.role === 'davulcu' && (
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Drummer Cap / Papaq */}
            <div className="w-8 h-4 bg-amber-900 rounded-t-lg z-20 border-b border-amber-700" />

            {/* Head */}
            <div className="w-8 h-8 rounded-full bg-[#f6c39a] border border-amber-800/30 relative z-10 flex flex-col items-center justify-center -mt-1">
              <div className="flex gap-1.5 pt-1">
                <span className="w-1 h-1 bg-stone-900 rounded-full" />
                <span className="w-1 h-1 bg-stone-900 rounded-full" />
              </div>
              <div className="w-3 h-1 bg-stone-800 rounded-full mt-1" />
            </div>

            {/* Body & Vest */}
            <div className="relative w-12 h-14 -mt-1 flex flex-col items-center z-10">
              <div className="w-10 h-8 bg-amber-600 border border-amber-800 rounded-t-md shadow-sm" />
              <div className="w-10 h-6 bg-stone-800 rounded-b-md" />

              {/* Large Nağara Drum across waist */}
              <div className="absolute top-4 w-14 h-12 bg-amber-800 rounded-lg border-2 border-amber-500 shadow-lg z-30 flex items-center justify-between px-1.5 animate-drum">
                {/* Drum skin & zig-zag cords */}
                <div className="w-2.5 h-9 bg-amber-100 rounded-full border border-amber-700" />
                <div className="flex flex-col gap-1 opacity-70">
                  <span className="w-6 h-0.5 bg-amber-300 rotate-12" />
                  <span className="w-6 h-0.5 bg-amber-300 -rotate-12" />
                </div>
                <div className="w-2.5 h-9 bg-amber-100 rounded-full border border-amber-700" />
              </div>

              {/* Drum Sticks (Çubuqlar) */}
              <div className="absolute top-2 -left-2 w-7 h-1 bg-amber-200 rotate-45 z-40 border border-amber-900" />
              <div className="absolute top-2 -right-2 w-7 h-1 bg-amber-200 -rotate-45 z-40 border border-amber-900" />
            </div>

            {/* Feet */}
            <div className="flex gap-2 mt-2">
              <div className="w-3 h-2 bg-stone-900 rounded-full" />
              <div className="w-3 h-2 bg-stone-900 rounded-full" />
            </div>
          </div>
        )}

        {/* HALAYBAŞI & PARTICIPANTS (İştirakçılar): Traditional festive attire with hands extended */}
        {(character.role === 'halaybasi' || character.role === 'istirakci' || character.role === 'qonaq') && (
          <div className="relative w-full h-full flex flex-col items-center">
            {/* Headgear */}
            {character.gender === 'female' ? (
              <div className="w-8 h-4 bg-rose-400 rounded-t-full border border-rose-300 z-20 flex justify-center">
                <span className="w-7 h-0.5 bg-amber-300 mt-2 rounded-full" />
              </div>
            ) : (
              <div className="w-8 h-4 bg-stone-800 rounded-t-md border-t border-amber-500/50 z-20" />
            )}

            {/* Head */}
            <div className="w-8 h-8 rounded-full bg-[#f8cca7] border border-amber-800/20 relative z-10 flex flex-col items-center justify-center -mt-1 shadow-xs">
              <div className="flex gap-1.5 pt-1">
                <span className="w-1 h-1 bg-amber-950 rounded-full" />
                <span className="w-1 h-1 bg-amber-950 rounded-full" />
              </div>
              <div className="w-3 h-1 bg-rose-700/60 rounded-full mt-1" />
            </div>

            {/* Body Costume */}
            <div className="relative w-12 h-20 -mt-1 flex flex-col items-center z-10">
              <div
                className="w-10 h-9 rounded-t-md shadow-xs border border-black/10 flex justify-center items-center"
                style={{ backgroundColor: character.costumeColor || '#059669' }}
              >
                <div className="w-2 h-4 bg-white/20 rounded-full" />
              </div>

              {/* Waist Belt */}
              <div className="w-11 h-2 bg-amber-400 rounded-xs shadow-xs z-20" />

              {/* Lower garment (Skirt or Pants) */}
              {character.gender === 'female' ? (
                <div
                  className="w-13 h-11 rounded-b-xl shadow-sm border-t border-amber-300/30"
                  style={{ backgroundColor: character.costumeColor || '#059669' }}
                />
              ) : (
                <div className="w-10 h-10 bg-stone-900 rounded-b-md shadow-sm" />
              )}

              {/* Interlocking Halay Hands (Əl-ələ tutan qollar) */}
              <div className="absolute top-4 -left-4 w-6 h-2 bg-[#f8cca7] rounded-full -rotate-20 border border-amber-700/30 z-0" />
              <div className="absolute top-4 -right-4 w-6 h-2 bg-[#f8cca7] rounded-full rotate-20 border border-amber-700/30 z-0" />
            </div>

            {/* Shoes */}
            <div className="flex gap-2 -mt-1">
              <div className="w-3 h-2 bg-amber-950 rounded-full" />
              <div className="w-3 h-2 bg-amber-950 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Quick hover trigger menu for mobile / desktop */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 mt-1 flex items-center gap-1 bg-black/80 px-2 py-0.5 rounded-md text-[10px] text-white backdrop-blur-xs">
        <span>Toxun: Şabaş ver</span>
      </div>
    </div>
  );
};
