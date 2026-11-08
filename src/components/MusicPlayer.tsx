/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { SongItem } from '../types/wedding';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Upload,
  Music2,
  Activity,
  Sliders,
  CheckCircle,
} from 'lucide-react';

interface MusicPlayerProps {
  songs: SongItem[];
  activeSong: SongItem | null;
  isPlaying: boolean;
  volume: number;
  tempoSpeed: 'slow' | 'normal' | 'fast';
  onPlaySong: (song: SongItem) => void;
  onTogglePlay: () => void;
  onNextSong: () => void;
  onPrevSong: () => void;
  onVolumeChange: (newVol: number) => void;
  onTempoChange: (tempo: 'slow' | 'normal' | 'fast') => void;
  onUploadCustomSong: (song: SongItem) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  songs,
  activeSong,
  isPlaying,
  volume,
  tempoSpeed,
  onPlaySong,
  onTogglePlay,
  onNextSong,
  onPrevSong,
  onVolumeChange,
  onTempoChange,
  onUploadCustomSong,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Hamısı');
  const [lastVolume, setLastVolume] = useState<number>(volume || 0.8);

  const categories = ['Hamısı', 'Rəqs', 'Klassik Toy', 'Yallı'];

  const filteredSongs = songs.filter((s) => {
    if (filterCategory === 'Hamısı') return true;
    return s.category === filterCategory;
  });

  const handleMuteToggle = () => {
    if (volume > 0) {
      setLastVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(lastVolume || 0.8);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const newSong: SongItem = {
      id: Date.now(),
      title: file.name.replace(/\.[^/.]+$/, ''),
      category: 'Klassik Toy',
      bpm: 128,
      rhythm: '6/8',
      leadToneNote: 'A4',
      description: 'İstifadəçinin əlavə etdiyi toy mahnısı',
      isCustomUpload: true,
      fileUrl,
    };

    onUploadCustomSong(newSong);
    onPlaySong(newSong);
  };

  return (
    <div className="w-full bg-slate-900 border border-amber-900/40 rounded-2xl p-4 sm:p-5 text-slate-100 shadow-xl flex flex-col gap-4">
      {/* Header & Now Playing strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-md">
            <Music2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                Musiqi Pleyeri
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400">
                {activeSong ? `${activeSong.rhythm} ritmi` : 'Mahnı seçilməyib'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {activeSong ? activeSong.title : 'Öz mahnınızı yükləyin'}
            </h3>
          </div>
        </div>

        {/* Visualizer bars & Upload button */}
        <div className="flex items-center gap-3">
          {/* Animated EQ Bars */}
          <div className="flex items-end gap-1 h-6 px-2 py-1 bg-slate-950 rounded-lg border border-slate-800">
            {[40, 70, 95, 55, 80, 100, 60, 45, 85].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-amber-400 rounded-full transition-all duration-150"
                style={{
                  height: isPlaying ? `${Math.max(15, (h * (Math.sin(Date.now() / 200 + i) + 1.2)) / 2)}%` : '20%',
                }}
              />
            ))}
          </div>

          {/* File Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            title="Musiqi faylı yüklə (MP3, WAV)"
          >
            <Upload className="w-4 h-4" />
            <span>Mahnı əlavə et (Yüklə)</span>
          </button>
        </div>
      </div>

      {/* Main Playback Controls and Volume */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        {/* Playback Buttons */}
        <div className="flex items-center justify-center md:justify-start gap-3">
          <button
            onClick={onPrevSong}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Əvvəlki mahnı"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={onTogglePlay}
            className="p-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 rounded-full shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? 'Dayandır' : 'Səsləndir'}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>

          <button
            onClick={onNextSong}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Növbəti mahnı"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <span className="text-xs text-slate-400 ml-2 font-mono tabular-nums">
            {activeSong ? `${activeSong.bpm} BPM` : '128 BPM'}
          </span>
        </div>

        {/* Rhythm Speed Selector */}
        <div className="flex items-center justify-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
          <span className="text-[11px] font-medium text-slate-400 px-2 flex items-center gap-1">
            <Activity className="w-3 h-3 text-amber-400" />
            Ritm:
          </span>
          <button
            onClick={() => onTempoChange('slow')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              tempoSpeed === 'slow' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ləng
          </button>
          <button
            onClick={() => onTempoChange('normal')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              tempoSpeed === 'normal' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Orta
          </button>
          <button
            onClick={() => onTempoChange('fast')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              tempoSpeed === 'fast' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cəld
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center justify-center md:justify-end gap-2.5">
          <button
            onClick={handleMuteToggle}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-24 sm:w-28 accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <span className="text-xs font-mono tabular-nums text-slate-400 w-8">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      {/* Songs List or Empty State */}
      {songs.length === 0 ? (
        <div className="p-8 text-center bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Siyahıda hələ mahnı yoxdur</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Öz toy mahnılarınızı (MP3, WAV) əlavə etmək üçün yuxarıdakı "Mahnı əlavə et" düyməsinə klikləyin.
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            İlk mahnını yüklə
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
          {filteredSongs.map((song) => {
            const isSelected = activeSong?.id === song.id;
            return (
              <div
                key={song.id}
                onClick={() => onPlaySong(song)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-xs ${
                  isSelected
                    ? 'bg-amber-950/60 border-amber-500/70 text-amber-200 shadow-md'
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isSelected && isPlaying ? (
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                    ) : (
                      <span>♪</span>
                    )}
                  </div>
                  <div className="truncate">
                    <p className="font-semibold truncate text-white">{song.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{song.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {song.rhythm}
                  </span>
                  {isSelected && <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
