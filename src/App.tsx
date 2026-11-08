/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Character, SongItem, GiftOption, GiftGreetingRecord, VoiceSettings } from './types/wedding';
import { INITIAL_CHARACTERS, TIKTOK_GIFTS } from './data/initialData';
import { globalAudioEngine } from './services/audioEngine';
import { globalSpeechService } from './services/speechService';

import { VillageSquare } from './components/VillageSquare';
import { MusicPlayer } from './components/MusicPlayer';
import { QuickActionToolbar } from './components/QuickActionToolbar';
import { AdminPanel } from './components/AdminPanel';
import { GiftBannerOverlay } from './components/GiftBannerOverlay';
import { TikTokGiftModal } from './components/TikTokGiftModal';
import { NagaraDrumPad } from './components/NagaraDrumPad';
import { JoinHalayModal } from './components/JoinHalayModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { MoneyRainAnimation } from './components/MoneyRainAnimation';

import {
  Sparkles,
  Music,
  Shield,
  Gift,
  Info,
  BarChart3,
  Banknote,
} from 'lucide-react';

export default function App() {
  // Characters state
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('kend_toyu_characters');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn(e);
      }
    }
    return INITIAL_CHARACTERS;
  });

  // Songs state (user custom songs only as requested)
  const [songs, setSongs] = useState<SongItem[]>(() => {
    const saved = localStorage.getItem('kend_toyu_custom_songs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn(e);
      }
    }
    return [];
  });
  const [activeSong, setActiveSong] = useState<SongItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [tempoSpeed, setTempoSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');

  // Shabash & Analytics History
  const [totalShabash, setTotalShabash] = useState<number>(750);
  const [shabashHistory, setShabashHistory] = useState<Array<{ time: string; amount: number }>>([
    { time: '12:00', amount: 200 },
    { time: '12:30', amount: 450 },
    { time: '13:00', amount: 750 },
  ]);

  // Song play stats for Pie Chart
  const [songPlayStats, setSongPlayStats] = useState<Array<{ name: string; plays: number }>>([
    { name: 'Toy Mahnısı', plays: 5 },
    { name: 'Yallı', plays: 3 },
  ]);

  // TikTok Gift Greeting State
  const [activeGreeting, setActiveGreeting] = useState<GiftGreetingRecord | null>(null);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState<boolean>(false);
  const [isDrumPadOpen, setIsDrumPadOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);
  const [isMoneyRainActive, setIsMoneyRainActive] = useState<boolean>(false);

  // Voice Settings for SpeechSynthesis
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    gender: 'female',
    rate: 0.95,
    pitch: 1.1,
    volume: 1.0,
    lang: 'az-AZ',
  });

  // Recent greetings log
  const [recentGreetings, setRecentGreetings] = useState<GiftGreetingRecord[]>([
    {
      id: 'g-1',
      senderName: 'Aysel',
      giftName: 'Qızılgül',
      giftEmoji: '🌹',
      timestamp: 'Bir az əvvəl',
    },
  ]);

  // Live stream auto simulation mode
  const [isStreamSimulationActive, setIsStreamSimulationActive] = useState<boolean>(false);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'meydan' | 'pleyer' | 'analitika' | 'admin' | 'haqqinda'>('meydan');

  // Save characters & songs to localStorage
  useEffect(() => {
    localStorage.setItem('kend_toyu_characters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem('kend_toyu_custom_songs', JSON.stringify(songs));
  }, [songs]);

  // Play selected song
  const handlePlaySong = (song: SongItem) => {
    setActiveSong(song);
    setIsPlaying(true);

    // Update song play stats for Pie Chart
    setSongPlayStats((prev) => {
      const existing = prev.find((p) => p.name === song.title);
      if (existing) {
        return prev.map((p) => (p.name === song.title ? { ...p, plays: p.plays + 1 } : p));
      }
      return [...prev, { name: song.title, plays: 1 }];
    });

    if (song.fileUrl) {
      globalAudioEngine.playUploadedAudio(song.fileUrl);
    } else {
      globalAudioEngine.playSong(1, song.bpm || 128);
    }
  };

  const handleTogglePlay = () => {
    if (!activeSong) {
      if (songs.length > 0) {
        handlePlaySong(songs[0]);
      } else {
        setIsGiftModalOpen(true);
      }
      return;
    }

    if (isPlaying) {
      globalAudioEngine.pause();
      setIsPlaying(false);
    } else {
      globalAudioEngine.resume();
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s.id === activeSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handlePlaySong(songs[nextIndex]);
  };

  const handlePrevSong = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s.id === activeSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    handlePlaySong(songs[prevIndex]);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    globalAudioEngine.setVolume(newVol);
  };

  const handleTempoChange = (speed: 'slow' | 'normal' | 'fast') => {
    setTempoSpeed(speed);
  };

  const handleUploadCustomSong = (newSong: SongItem) => {
    setSongs((prev) => [newSong, ...prev]);
  };

  // Trigger TikTok Gift Greeting
  const triggerGiftGreeting = (senderName: string, gift: GiftOption) => {
    const record: GiftGreetingRecord = {
      id: `gift-${Date.now()}`,
      senderName,
      giftName: gift.name,
      giftEmoji: gift.emoji,
      timestamp: new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveGreeting(record);
    setRecentGreetings((prev) => [record, ...prev.slice(0, 9)]);

    const newTotal = totalShabash + gift.valuePoints;
    setTotalShabash(newTotal);

    // Record history for Line Chart
    const timeNow = new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' });
    setShabashHistory((prev) => [...prev, { time: timeNow, amount: newTotal }]);

    // Audio effects
    globalAudioEngine.playApplauseSound();
    globalAudioEngine.playShabashSound();

    globalSpeechService.announceGiftGreeting(senderName, voiceSettings);
  };

  // Pul Yağdır Trigger
  const handleTriggerMoneyRain = () => {
    setIsMoneyRainActive(true);
    setTotalShabash((prev) => {
      const updated = prev + 500;
      const timeNow = new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' });
      setShabashHistory((h) => [...h, { time: timeNow, amount: updated }]);
      return updated;
    });
  };

  // Quick Action Buttons Handlers
  const handleJoinHalay = () => {
    setIsJoinModalOpen(true);
  };

  const handleBecomeLead = () => {
    globalAudioEngine.playShabashSound();
    fireConfettiParticles();
  };

  const handleBecomeBride = () => {
    globalAudioEngine.playApplauseSound();
    fireConfettiParticles();
  };

  const handleBecomeGroom = () => {
    globalAudioEngine.playApplauseSound();
    fireConfettiParticles();
  };

  const handleOpenDrumPad = () => {
    setIsDrumPadOpen(true);
  };

  const handleCheerTekiTak = () => {
    setTotalShabash((prev) => {
      const updated = prev + 150;
      const timeNow = new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' });
      setShabashHistory((h) => [...h, { time: timeNow, amount: updated }]);
      return updated;
    });
    globalAudioEngine.playApplauseSound();
    globalAudioEngine.playShabashSound();
    fireConfettiParticles();
  };

  const fireConfettiParticles = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899'],
    });
  };

  const handleCharacterTossMoney = (char: Character) => {
    setTotalShabash((prev) => {
      const updated = prev + 50;
      const timeNow = new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' });
      setShabashHistory((h) => [...h, { time: timeNow, amount: updated }]);
      return updated;
    });
    globalAudioEngine.playShabashSound();
  };

  const handleAddCharacter = (newChar: Character) => {
    setCharacters((prev) => [...prev, newChar]);
    globalAudioEngine.playApplauseSound();
    fireConfettiParticles();
  };

  const handleDeleteCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSetLeadCharacter = (id: string) => {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return { ...c, role: 'halaybasi' };
        }
        if (c.role === 'halaybasi') {
          return { ...c, role: 'istirakci' };
        }
        return c;
      })
    );
    globalAudioEngine.playShabashSound();
  };

  const handleResetCharacters = () => {
    setCharacters(INITIAL_CHARACTERS);
  };

  const handleTestVoice = () => {
    globalSpeechService.announceGiftGreeting('Hörmətli Qonaq', voiceSettings);
  };

  const drummer = characters.find((c) => c.role === 'davulcu');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-amber-900/40 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl">🇦🇿</span>
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 whitespace-nowrap">
              Kənd Toyu — Halay Oyunu
            </span>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button
              onClick={() => setActiveTab('meydan')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'meydan' ? 'text-amber-400 underline underline-offset-4' : ''
              }`}
            >
              Toy Meydanı
            </button>
            <button
              onClick={() => setActiveTab('pleyer')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'pleyer' ? 'text-amber-400 underline underline-offset-4' : ''
              }`}
            >
              Musiqi Pleyeri
            </button>
            <button
              onClick={() => setActiveTab('analitika')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'analitika' ? 'text-amber-400 underline underline-offset-4' : ''
              }`}
            >
              Analitika
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'admin' ? 'text-amber-400 underline underline-offset-4' : ''
              }`}
            >
              Admin Paneli
            </button>
            <button
              onClick={() => setActiveTab('haqqinda')}
              className={`hover:text-amber-300 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'haqqinda' ? 'text-amber-400 underline underline-offset-4' : ''
              }`}
            >
              Toy Adətləri
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsGiftModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg shadow-md transition-all active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-slate-950" />
              <span>Hədiyyə Göndər</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col gap-6">
        {/* Mobile Tab Navigation Bar */}
        <div className="md:hidden flex items-center justify-between p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('meydan')}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
              activeTab === 'meydan' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Meydan
          </button>
          <button
            onClick={() => setActiveTab('pleyer')}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
              activeTab === 'pleyer' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Musiqi
          </button>
          <button
            onClick={() => setActiveTab('analitika')}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
              activeTab === 'analitika' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Analitika
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
              activeTab === 'admin' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
            }`}
          >
            Admin
          </button>
        </div>

        {/* 1. Village Square Section */}
        {activeTab === 'meydan' && (
          <div className="flex flex-col gap-4">
            <VillageSquare
              characters={characters}
              isDancing={isPlaying}
              tempoSpeed={tempoSpeed}
              activeSongTitle={activeSong ? activeSong.title : 'Mahnı seçilməyib'}
              totalShabash={totalShabash}
              onSelectCharacter={(char) => {}}
              onTossMoney={handleCharacterTossMoney}
              onQuickJoin={handleJoinHalay}
            />

            {/* Quick Action Toolbar */}
            <QuickActionToolbar
              onJoinHalay={handleJoinHalay}
              onBecomeLead={handleBecomeLead}
              onBecomeBride={handleBecomeBride}
              onBecomeGroom={handleBecomeGroom}
              onOpenDrumPad={handleOpenDrumPad}
              onCheerTekiTak={handleCheerTekiTak}
              onTriggerConfetti={fireConfettiParticles}
              onOpenGiftModal={() => setIsGiftModalOpen(true)}
              onTriggerMoneyRain={handleTriggerMoneyRain}
            />
          </div>
        )}

        {/* 2. Music Player Section */}
        {activeTab === 'pleyer' && (
          <MusicPlayer
            songs={songs}
            activeSong={activeSong}
            isPlaying={isPlaying}
            volume={volume}
            tempoSpeed={tempoSpeed}
            onPlaySong={handlePlaySong}
            onTogglePlay={handleTogglePlay}
            onNextSong={handleNextSong}
            onPrevSong={handlePrevSong}
            onVolumeChange={handleVolumeChange}
            onTempoChange={handleTempoChange}
            onUploadCustomSong={handleUploadCustomSong}
          />
        )}

        {/* 3. Analytics Dashboard Section */}
        {activeTab === 'analitika' && (
          <AnalyticsDashboard
            shabashHistory={shabashHistory}
            songPlayStats={songPlayStats}
            totalShabash={totalShabash}
          />
        )}

        {/* 4. Admin Panel Section */}
        {activeTab === 'admin' && (
          <AdminPanel
            characters={characters}
            onAddCharacter={handleAddCharacter}
            onDeleteCharacter={handleDeleteCharacter}
            onSetLeadCharacter={handleSetLeadCharacter}
            onResetCharacters={handleResetCharacters}
            voiceSettings={voiceSettings}
            onVoiceSettingsChange={setVoiceSettings}
            onTestVoice={handleTestVoice}
          />
        )}

        {/* 5. Wedding Traditions Guide */}
        {activeTab === 'haqqinda' && (
          <div className="w-full bg-slate-900 border border-amber-900/40 rounded-2xl p-6 text-slate-200 shadow-xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Azərbaycan Kənd Toyu və Yallı Adətləri
                </h3>
                <p className="text-xs text-slate-400">
                  Layihənin milli folklor elementləri və texniki xüsusiyyətləri
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="font-bold text-amber-300 text-sm mb-1.5 flex items-center gap-1.5">
                  <span>🚩</span> Halaybaşı və Qırmızı Dəsmal
                </h4>
                <p>
                  Yallının önündə gedən Halaybaşı sağ əlində qırmızı ipək dəsmalı dalğalandıraraq
                  dəstənin ritmini, dönüşlərini və ayaq döymələrini idarə edir.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="font-bold text-amber-300 text-sm mb-1.5 flex items-center gap-1.5">
                  <span>💸</span> Pul Yağdır Sistemi
                </h4>
                <p>
                  Toyda şabaş yağdırıldıqda göydən 100 manatlıq əskinaslar tökülür, uşaqlar isə qaçıb pulları
                  yığırlar və oğurlayırlar!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <h4 className="font-bold text-amber-300 text-sm mb-1.5 flex items-center gap-1.5">
                  <span>📊</span> Analitika Paneli
                </h4>
                <p>
                  Recharts kitabxanası ilə təchiz olunmuş qrafiklər zaman üzrə toplanan şabaşları və
                  ən çox ifa olunan toy mahnılarını vizuallaşdırır.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('meydan')}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Meydana qayıt
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500">
        <p>Kənd Toyu — Halay Oyunu · Milli Musiqi və Analitika Paneli · Bütün hüquqlar qorunur.</p>
      </footer>

      {/* Screen-center Big Festive Banner Overlay */}
      {activeGreeting && (
        <GiftBannerOverlay
          senderName={activeGreeting.senderName}
          giftName={activeGreeting.giftName}
          giftEmoji={activeGreeting.giftEmoji}
          onClose={() => setActiveGreeting(null)}
        />
      )}

      {/* TikTok Gift Modal */}
      <TikTokGiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        voiceSettings={voiceSettings}
        onVoiceSettingsChange={setVoiceSettings}
        onTriggerGreeting={(name, gift) => {
          setIsGiftModalOpen(false);
          triggerGiftGreeting(name, gift);
        }}
        recentGreetings={recentGreetings}
        isStreamSimulationActive={isStreamSimulationActive}
        onToggleStreamSimulation={() =>
          setIsStreamSimulationActive((prev) => !prev)
        }
      />

      {/* Interactive Nagara Drum Pad Modal */}
      <NagaraDrumPad
        isOpen={isDrumPadOpen}
        onClose={() => setIsDrumPadOpen(false)}
        drummerName={drummer ? drummer.name : 'Səbuhi'}
      />

      {/* Quick Join Halay Modal */}
      <JoinHalayModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={(newChar) => {
          handleAddCharacter(newChar);
        }}
      />

      {/* Money Rain Animation (Pul Yağdır) */}
      <MoneyRainAnimation
        isActive={isMoneyRainActive}
        onComplete={() => setIsMoneyRainActive(false)}
      />
    </div>
  );
}
