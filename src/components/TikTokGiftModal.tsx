/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GiftOption, GiftGreetingRecord, VoiceSettings } from '../types/wedding';
import { TIKTOK_GIFTS } from '../data/initialData';
import {
  Gift,
  Send,
  Volume2,
  Sparkles,
  UserCheck,
  Radio,
  Clock,
  History,
  Check,
} from 'lucide-react';

interface TikTokGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  voiceSettings: VoiceSettings;
  onVoiceSettingsChange: (settings: VoiceSettings) => void;
  onTriggerGreeting: (senderName: string, gift: GiftOption) => void;
  recentGreetings: GiftGreetingRecord[];
  isStreamSimulationActive: boolean;
  onToggleStreamSimulation: () => void;
}

export const TikTokGiftModal: React.FC<TikTokGiftModalProps> = ({
  isOpen,
  onClose,
  voiceSettings,
  onVoiceSettingsChange,
  onTriggerGreeting,
  recentGreetings,
  isStreamSimulationActive,
  onToggleStreamSimulation,
}) => {
  const [senderName, setSenderName] = useState('Aysel');
  const [selectedGift, setSelectedGift] = useState<GiftOption>(TIKTOK_GIFTS[0]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = senderName.trim();
    if (!trimmed) {
      setErrorMsg('Zəhmət olmasa hədiyyə göndərənin adını daxil edin');
      return;
    }
    setErrorMsg('');
    onTriggerGreeting(trimmed, selectedGift);
  };

  const quickNames = ['Aysel', 'Elmir', 'Nərgiz', 'Murad', 'Günel', 'Rauf', 'Ləman'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-lg w-full bg-slate-900 border border-amber-500/50 rounded-2xl p-5 sm:p-6 text-slate-100 shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center text-white shadow-md">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                TikTok Hədiyyə Qarşılama Sistemi
              </h3>
              <p className="text-xs text-slate-400">
                Canlı yayım hədiyyələrini səsli və animasiyalı qarşılayın
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer text-sm font-semibold"
          >
            ✕
          </button>
        </div>

        {/* Form: Name input & Add button */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Hədiyyə göndərənin adı:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={senderName}
                onChange={(e) => {
                  setSenderName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Məsələn: Aysel"
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
                autoFocus
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 active:scale-95 text-slate-950 font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                <span>Əlavə et</span>
              </button>
            </div>
            {errorMsg && <p className="text-xs text-rose-400 mt-1 font-medium">{errorMsg}</p>}

            {/* Quick Name Presets */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-500">Sürətli seç:</span>
              {quickNames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSenderName(name)}
                  className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Gift selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Göndərilən hədiyyə növü:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
              {TIKTOK_GIFTS.map((gift) => {
                const isSelected = selectedGift.id === gift.id;
                return (
                  <button
                    key={gift.id}
                    type="button"
                    onClick={() => setSelectedGift(gift)}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{gift.emoji}</span>
                    <span className="text-[11px] font-semibold truncate w-full text-center">
                      {gift.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Voice Gender Selection (Qadın / Kişi səsi) */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-xs font-semibold text-white block">Səsləndirmə Cinsi:</span>
                <span className="text-[11px] text-slate-400">Azərbaycan / Türk səs mühərriki</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() =>
                  onVoiceSettingsChange({ ...voiceSettings, gender: 'female' })
                }
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  voiceSettings.gender === 'female'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>👩 Qadın səsi</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onVoiceSettingsChange({ ...voiceSettings, gender: 'male' })
                }
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                  voiceSettings.gender === 'male'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>👨 Kişi səsi</span>
              </button>
            </div>
          </div>

          {/* Live stream auto gift simulation toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-2">
              <Radio className={`w-4 h-4 ${isStreamSimulationActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <div>
                <span className="text-xs font-semibold text-white block">
                  Canlı Yayım Hədiyyə Simulyatoru
                </span>
                <span className="text-[11px] text-slate-400">
                  Hər 20 saniyədən bir avtomatik yeni hədiyyə gəlsin
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleStreamSimulation}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                isStreamSimulationActive
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {isStreamSimulationActive ? 'Aktivdir' : 'Başlat'}
            </button>
          </div>
        </form>

        {/* Recent greetings history */}
        {recentGreetings.length > 0 && (
          <div className="border-t border-slate-800 pt-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2">
              <History className="w-3.5 h-3.5" />
              <span>Son Qarşılanan Hədiyyələr:</span>
            </div>
            <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto pr-1">
              {recentGreetings.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-center justify-between text-xs bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{rec.giftEmoji}</span>
                    <span className="font-bold text-amber-200">{rec.senderName}</span>
                    <span className="text-[11px] text-slate-400">· {rec.giftName}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{rec.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
