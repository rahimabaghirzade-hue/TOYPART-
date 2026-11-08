/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CharacterRole = 'gelin' | 'bey' | 'davulcu' | 'halaybasi' | 'istirakci' | 'qonaq';

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  gender: 'female' | 'male';
  costumeColor?: string;
  isCustom?: boolean;
  isHighlighted?: boolean;
  customAvatar?: string;
  danceOffset?: number;
}

export interface SongItem {
  id: number;
  title: string;
  category: 'Yallı' | 'Rəqs' | 'Klassik Toy' | 'Cəngavər';
  bpm: number;
  rhythm: '6/8' | '2/4' | 'Yallı Şən';
  leadToneNote: string;
  description: string;
  isCustomUpload?: boolean;
  fileUrl?: string;
}

export interface GiftOption {
  id: string;
  name: string;
  emoji: string;
  valuePoints: number;
  soundEffect?: string;
}

export interface GiftGreetingRecord {
  id: string;
  senderName: string;
  giftName: string;
  giftEmoji: string;
  timestamp: string;
}

export interface VoiceSettings {
  gender: 'female' | 'male';
  rate: number;
  pitch: number;
  volume: number;
  lang: string;
}
