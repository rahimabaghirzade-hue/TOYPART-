/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { globalAudioEngine } from '../services/audioEngine';

interface MoneyRainProps {
  isActive: boolean;
  onComplete: () => void;
}

export const MoneyRainAnimation: React.FC<MoneyRainProps> = ({
  isActive,
  onComplete,
}) => {
  const [bills, setBills] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; rotate: number; size: number }>
  >([]);
  const [kids, setKids] = useState<
    Array<{ id: number; name: string; bottom: number; direction: 'left' | 'right'; speed: number }>
  >([]);

  useEffect(() => {
    if (!isActive) {
      setBills([]);
      setKids([]);
      return;
    }

    // Play shabash / coin sound effect
    globalAudioEngine.playShabashSound();
    setTimeout(() => {
      globalAudioEngine.playApplauseSound();
    }, 400);

    // Generate falling 100 manat bills
    const newBills = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96,
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      rotate: (Math.random() - 0.5) * 60,
      size: 40 + Math.random() * 25,
    }));
    setBills(newBills);

    // Generate kids running to grab the money
    const kidNames = ['Nicat', 'Elmir', 'Tural', 'Kənan', 'Anar', 'Orxan', 'Cavid'];
    const newKids = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      name: kidNames[i % kidNames.length],
      bottom: 20 + Math.random() * 50,
      direction: i % 2 === 0 ? ('left' as const) : ('right' as const),
      speed: 3 + Math.random() * 2,
    }));
    setKids(newKids);

    const timer = setTimeout(() => {
      onComplete();
    }, 5500);

    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Falling 100 Manat Banknotes */}
      {bills.map((b) => (
        <div
          key={b.id}
          className="absolute -top-16 bg-emerald-700 border-2 border-amber-400 rounded-md shadow-2xl flex flex-col items-center justify-center text-white font-black font-mono animate-fall"
          style={{
            left: `${b.left}%`,
            width: `${b.size * 1.8}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            transform: `rotate(${b.rotate}deg)`,
          }}
        >
          <div className="flex items-center justify-between w-full px-1 text-[9px] text-amber-300">
            <span>🇦🇿</span>
            <span className="font-bold">AZN</span>
          </div>
          <span className="text-sm font-extrabold text-amber-200">₼100</span>
          <div className="w-full text-center text-[7px] text-slate-200 tracking-tighter">
            YÜZ MANAT
          </div>
        </div>
      ))}

      {/* Kids Running Across to grab/steal money */}
      {kids.map((k) => (
        <div
          key={k.id}
          className="absolute z-50 flex flex-col items-center animate-run"
          style={{
            bottom: `${k.bottom}px`,
            animationDuration: `${k.speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: k.direction === 'left' ? 'normal' : 'reverse',
          }}
        >
          <div className="bg-amber-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded shadow border border-amber-400 whitespace-nowrap mb-1 animate-bounce">
            🏃‍♂️ {k.name}: "Pulu qap!"
          </div>
          <div className="text-3xl filter drop-shadow-md">🧒💨</div>
        </div>
      ))}

      {/* Center Toast Banner */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-emerald-950/90 border-2 border-amber-400 text-amber-200 px-6 py-3 rounded-2xl shadow-2xl text-center pointer-events-auto backdrop-blur-md animate-bounce">
        <h3 className="text-lg font-black tracking-tight">💸 PUL YAĞDIRILDI! 100 MANATLAR TÖKÜLDÜ! 💸</h3>
        <p className="text-xs text-white">Uşaqlar qaçıb pulları yığırlar və oğurlayırlar! 🏃‍♂️💨</p>
      </div>

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0.85;
          }
        }
        @keyframes run {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(110vw);
          }
        }
        .animate-fall {
          animation-name: fall;
        }
        .animate-run {
          animation-name: run;
        }
      `}</style>
    </div>
  );
};
