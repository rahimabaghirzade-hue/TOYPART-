/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Character, CharacterRole, VoiceSettings } from '../types/wedding';
import {
  UserPlus,
  Trash2,
  Crown,
  Users,
  Settings,
  Shield,
  Volume2,
  RefreshCw,
  Check,
} from 'lucide-react';

interface AdminPanelProps {
  characters: Character[];
  onAddCharacter: (character: Character) => void;
  onDeleteCharacter: (id: string) => void;
  onSetLeadCharacter: (id: string) => void;
  onResetCharacters: () => void;
  voiceSettings: VoiceSettings;
  onVoiceSettingsChange: (settings: VoiceSettings) => void;
  onTestVoice: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  characters,
  onAddCharacter,
  onDeleteCharacter,
  onSetLeadCharacter,
  onResetCharacters,
  voiceSettings,
  onVoiceSettingsChange,
  onTestVoice,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<CharacterRole>('istirakci');
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [costumeColor, setCostumeColor] = useState('#059669');
  const [errorText, setErrorText] = useState('');

  const colorOptions = [
    { label: 'Zümrüd', val: '#059669' },
    { label: 'Qırmızı', val: '#DC2626' },
    { label: 'Mavi', val: '#2563EB' },
    { label: 'Bənövşə', val: '#9333EA' },
    { label: 'Kəhrəba', val: '#D97706' },
    { label: 'Qara', val: '#1E293B' },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorText('Zəhmət olmasa personajın adını yazın');
      return;
    }
    setErrorText('');

    const newChar: Character = {
      id: `char-${Date.now()}`,
      name: trimmed,
      role,
      gender,
      costumeColor,
      isCustom: true,
      danceOffset: characters.length,
    };

    onAddCharacter(newChar);
    setName('');
  };

  return (
    <div className="w-full bg-slate-900 border border-amber-900/40 rounded-2xl p-4 sm:p-6 text-slate-100 shadow-xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-slate-950 shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Admin İdarəetmə Paneli
            </h3>
            <p className="text-xs text-slate-400">
              Personajların əlavə olunması, silinməsi və səs tənzimləmələri
            </p>
          </div>
        </div>

        <button
          onClick={onResetCharacters}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          title="İlkin kənd heyətini bərpa et"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
          <span>Kənd heyətini bərpa et</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Add Character Form */}
        <div className="lg:col-span-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <UserPlus className="w-4 h-4" />
            <span>Yeni Personaj Əlavə Et</span>
          </div>

          <form onSubmit={handleAddSubmit} className="flex flex-col gap-3">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Adı:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorText) setErrorText('');
                }}
                placeholder="Məsələn: Günay və ya Vüsal"
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none"
              />
              {errorText && <p className="text-xs text-rose-400 mt-1">{errorText}</p>}
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Toydakı Rolu:
              </label>
              <select
                value={role}
                onChange={(e) => {
                  const newRole = e.target.value as CharacterRole;
                  setRole(newRole);
                  if (newRole === 'gelin') setGender('female');
                  if (newRole === 'bey') setGender('male');
                }}
                className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-lg px-3 py-2 text-sm text-white outline-none cursor-pointer"
              >
                <option value="istirakci">Halay iştirakçısı (Rəqqas)</option>
                <option value="halaybasi">Halaybaşı (Dəsmal yelləyən)</option>
                <option value="gelin">Gəlin (Tüllü və kəmərli)</option>
                <option value="bey">Bəy (Papaqlı və çuxalı)</option>
                <option value="davulcu">Davulçu (Nağara çalan)</option>
                <option value="qonaq">Toy Qonağı (Əl çalan)</option>
              </select>
            </div>

            {/* Gender Toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Cinsi:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    gender === 'female'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Qadın
                </button>
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    gender === 'male'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Kişi
                </button>
              </div>
            </div>

            {/* Costume Color presets */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Milli Geyim Rəngi:
              </label>
              <div className="flex items-center gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c.val}
                    type="button"
                    onClick={() => setCostumeColor(c.val)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                      costumeColor === c.val ? 'scale-115 border-white ring-2 ring-amber-400' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.val }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 active:scale-95 text-slate-950 font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Personajı Meydana Əlavə Et</span>
            </button>
          </form>
        </div>

        {/* Right Column: Characters List & Speech Settings */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Current Characters List */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm font-bold text-white">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Meydandakı Personajlar ({characters.length})</span>
              </div>
              <span className="text-xs text-slate-400">Üstündə adı görünür</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
              {characters.map((char) => {
                const isLead = char.role === 'halaybasi';
                const roleLabels: Record<string, string> = {
                  gelin: 'Gəlin',
                  bey: 'Bəy',
                  davulcu: 'Davulçu',
                  halaybasi: 'Halaybaşı',
                  istirakci: 'İştirakçı',
                  qonaq: 'Qonaq',
                };
                return (
                  <div
                    key={char.id}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: char.costumeColor || '#F59E0B' }}
                      />
                      <div className="truncate">
                        <p className="font-bold text-white truncate">{char.name}</p>
                        <p className="text-[10px] text-amber-300 truncate">
                          {roleLabels[char.role]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {!isLead && (
                        <button
                          onClick={() => onSetLeadCharacter(char.id)}
                          className="p-1 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                          title="Halaybaşı et (Qırmızı dəsmalı ver)"
                        >
                          <Crown className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteCharacter(char.id)}
                        className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                        title="Personajı sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Voice Settings Box */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm font-bold text-white">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Azərbaycan Səs və Nitq Tənzimləmələri</span>
              </div>
              <button
                type="button"
                onClick={onTestVoice}
                className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-semibold rounded-md transition-colors cursor-pointer"
              >
                Səsi sınaqdan keçir
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Danışan Cinsi:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onVoiceSettingsChange({ ...voiceSettings, gender: 'female' })}
                    className={`flex-1 py-1.5 font-semibold rounded-lg border transition-colors cursor-pointer ${
                      voiceSettings.gender === 'female'
                        ? 'bg-rose-500/30 border-rose-500 text-rose-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    Qadın səsi
                  </button>
                  <button
                    type="button"
                    onClick={() => onVoiceSettingsChange({ ...voiceSettings, gender: 'male' })}
                    className={`flex-1 py-1.5 font-semibold rounded-lg border transition-colors cursor-pointer ${
                      voiceSettings.gender === 'male'
                        ? 'bg-blue-500/30 border-blue-500 text-blue-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    Kişi səsi
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Nitq sürəti:</span>
                  <span className="font-mono">{voiceSettings.rate}x</span>
                </div>
                <input
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.05"
                  value={voiceSettings.rate}
                  onChange={(e) =>
                    onVoiceSettingsChange({ ...voiceSettings, rate: parseFloat(e.target.value) })
                  }
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
