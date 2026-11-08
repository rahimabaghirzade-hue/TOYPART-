/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { globalAudioEngine } from './audioEngine';
import { VoiceSettings } from '../types/wedding';

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isSpeaking = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.voices.length === 0) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  public findBestVoice(gender: 'female' | 'male'): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (voices.length === 0) return null;

    // 1. Look for Azerbaijani voice (az-AZ, az)
    const azVoice = voices.find(v => v.lang.toLowerCase().startsWith('az'));
    if (azVoice) return azVoice;

    // 2. Look for Turkish voice (tr-TR, tr) which pronounces Azerbaijani words naturally
    const trVoices = voices.filter(v => v.lang.toLowerCase().startsWith('tr'));
    if (trVoices.length > 0) {
      if (gender === 'female') {
        const femaleTr = trVoices.find(v => 
          v.name.toLowerCase().includes('female') || 
          v.name.toLowerCase().includes('kadin') || 
          v.name.toLowerCase().includes('yelda') || 
          v.name.toLowerCase().includes('seda') ||
          v.name.toLowerCase().includes('filiz')
        );
        if (femaleTr) return femaleTr;
      } else {
        const maleTr = trVoices.find(v => 
          v.name.toLowerCase().includes('male') || 
          v.name.toLowerCase().includes('erkek') || 
          v.name.toLowerCase().includes('ahmet') || 
          v.name.toLowerCase().includes('tolga')
        );
        if (maleTr) return maleTr;
      }
      return trVoices[0];
    }

    // 3. Fallback to default or any voice
    return voices.find(v => v.default) || voices[0];
  }

  public announceGiftGreeting(
    senderName: string,
    settings: VoiceSettings,
    onStartCallback?: () => void,
    onEndCallback?: () => void
  ) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported on this device/browser');
      if (onStartCallback) onStartCallback();
      setTimeout(() => {
        if (onEndCallback) onEndCallback();
      }, 3500);
      return;
    }

    // Stop current speech
    this.synth.cancel();

    // Sentence requested by user:
    // "🎉 XOŞ GƏLMİSƏN, [AD]! 👏 HAMI ƏL ÇALSIN!"
    const textToSpeak = `Xoş gəlmisən, ${senderName}! Hamı əl çalsın!`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const voice = this.findBestVoice(settings.gender);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'az-AZ';
    }

    // Pitch & Rate tuning according to gender
    if (settings.gender === 'female') {
      utterance.pitch = Math.max(1.1, settings.pitch);
      utterance.rate = settings.rate || 0.95;
    } else {
      utterance.pitch = Math.min(0.85, settings.pitch);
      utterance.rate = settings.rate || 0.92;
    }

    utterance.volume = settings.volume || 1.0;

    // Safety timeout in case speech engine hangs or never fires onend
    let timeoutId: number | null = null;
    const cleanup = () => {
      this.isSpeaking = false;
      globalAudioEngine.restoreAudio();
      if (timeoutId) clearTimeout(timeoutId);
      if (onEndCallback) onEndCallback();
    };

    utterance.onstart = () => {
      this.isSpeaking = true;
      // Duck music volume temporarily!
      globalAudioEngine.duckAudio();
      if (onStartCallback) onStartCallback();

      // Fallback timer: restore after 5.5s maximum
      timeoutId = window.setTimeout(() => {
        cleanup();
      }, 5500);
    };

    utterance.onend = () => {
      cleanup();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      cleanup();
    };

    this.synth.speak(utterance);
  }

  public cancel() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      globalAudioEngine.restoreAudio();
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const globalSpeechService = new SpeechService();
