/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Character, SongItem, GiftOption } from '../types/wedding';

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: 'char-1',
    name: 'Murad',
    role: 'halaybasi',
    gender: 'male',
    costumeColor: '#DC2626',
    danceOffset: 0,
  },
  {
    id: 'char-2',
    name: 'Aygün',
    role: 'gelin',
    gender: 'female',
    costumeColor: '#F8FAFC',
    danceOffset: 1,
  },
  {
    id: 'char-3',
    name: 'Elçin',
    role: 'bey',
    gender: 'male',
    costumeColor: '#1E293B',
    danceOffset: 2,
  },
  {
    id: 'char-4',
    name: 'Səbuhi',
    role: 'davulcu',
    gender: 'male',
    costumeColor: '#D97706',
    danceOffset: 3,
  },
  {
    id: 'char-5',
    name: 'Nigar',
    role: 'istirakci',
    gender: 'female',
    costumeColor: '#059669',
    danceOffset: 4,
  },
  {
    id: 'char-6',
    name: 'Tural',
    role: 'istirakci',
    gender: 'male',
    costumeColor: '#2563EB',
    danceOffset: 5,
  },
];

// No preset songs as requested by user ("başqa mahnılar olmasın ancaq mən əlavə edim mahnıları və mahnı çalsın")
export const WEDDING_SONGS: SongItem[] = [];

export const TIKTOK_GIFTS: GiftOption[] = [
  { id: 'rose', name: 'Qızılgül', emoji: '🌹', valuePoints: 10 },
  { id: 'heart', name: 'Ürək', emoji: '❤️', valuePoints: 20 },
  { id: 'tea', name: 'Armudu Çay', emoji: '☕', valuePoints: 50 },
  { id: 'crown', name: 'Tac', emoji: '👑', valuePoints: 100 },
  { id: 'lion', name: 'Aslan', emoji: '🦁', valuePoints: 500 },
  { id: 'fireworks', name: 'Atəşfəşanlıq', emoji: '🎆', valuePoints: 300 },
  { id: 'ring', name: 'Qızıl Üzük', emoji: '💍', valuePoints: 250 },
  { id: 'car', name: 'Toy Karvanı', emoji: '🏎️', valuePoints: 1000 },
];
