/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Character } from '../types/wedding';
import { Users, Sparkles, X, Check } from 'lucide-react';

interface JoinHalayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (newChar: Character) => void;
}

export const JoinHalayModal: React.FC<JoinHalayModalProps> = ({
  isOpen,
  onClose,
  onJoin,
}) => {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [costumeColor, setCostumeColor] = useState('#059669');
  const [errorText, setErrorText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = userName.trim();
    if (!trimmed) {
      setErrorText('Zəhmət olmasa adınızı qeyd edin');
      return;
    }

    const newChar: Character = {
      id: `dancer-${Date.now()}`,
      name: trimmed,
      role: 'istirakci',
      gender,
      costumeColor,
      isCustom: true,
      isHighlighted: true,
    };

    onJoin(newChar);
    onClose();
  };

  const colors = [
    { label: 'Zümrüd', val: '#059669' },
    { label: 'Qırmızı', val: '#DC2626' },
    { label: 'Göy', val: '#2563EB' },
    { label: 'Bənövşə', val: '#9333EA' },
    { label: 'Qızılı', val: '#D97706' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-sm w-full bg-slate-900 border border-amber-500/50 rounded-2xl p-5 text-slate-100 shadow-2xl flex flex-col gap-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Halaya Qatıl</h3>
            <p className="text-xs text-slate-400">Yallı xəttinə öz adınla daxil ol</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Adınız:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (errorText) setErrorText('');
              }}
              placeholder="Adınızı daxil edin"
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none"
              autoFocus
            />
            {errorText && <p className="text-xs text-rose-400 mt-1">{errorText}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Cinsiyyət:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  gender === 'female'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Qadın (Xanım)
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  gender === 'male'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Kişi (Bəy)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Geyim rəngi:
            </label>
            <div className="flex items-center gap-2">
              {colors.map((c) => (
                <button
                  key={c.val}
                  type="button"
                  onClick={() => setCostumeColor(c.val)}
                  className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                    costumeColor === c.val ? 'scale-110 border-white ring-2 ring-emerald-400' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.val }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 active:scale-95 text-slate-950 font-bold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Meydana Daxil Ol</span>
          </button>
        </form>
      </div>
    </div>
  );
};
