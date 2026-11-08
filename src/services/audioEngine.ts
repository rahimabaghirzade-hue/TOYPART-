/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Procedural folk audio engine and synthesizer for Azerbaijani wedding songs

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private duckGain: GainNode | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private currentStep = 0;
  private currentSongId = 1;
  private bpm = 124;
  private volume = 0.8;
  private customAudio: HTMLAudioElement | null = null;
  private onBeatCallback: ((step: number) => void) | null = null;

  // Song melodic data (frequency notes in Hz for folk melodies)
  // Notes: D4=293.66, E4=329.63, F4=349.23, F#4=369.99, G4=392.00, A4=440.00, Bb4=466.16, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46
  private songMelodies: Record<number, { bpm: number; rhythm: '6_8' | '2_4'; notes: number[] }> = {
    // 1. Qaytağı - Fast, virtuoso 6/8
    1: {
      bpm: 140,
      rhythm: '6_8',
      notes: [440, 493.88, 523.25, 587.33, 523.25, 493.88, 440, 587.33, 587.33, 523.25, 493.88, 440, 392, 440, 493.88, 440],
    },
    // 2. Uzundərə - Lyrical, noble bridal melody
    2: {
      bpm: 104,
      rhythm: '6_8',
      notes: [392, 440, 493.88, 523.25, 493.88, 440, 392, 349.23, 392, 440, 493.88, 440, 392, 349.23, 329.63, 349.23],
    },
    // 3. Yallı - Collective foot-stomping yallı
    3: {
      bpm: 118,
      rhythm: '2_4',
      notes: [329.63, 329.63, 349.23, 392, 440, 392, 349.23, 329.63, 293.66, 329.63, 349.23, 329.63, 293.66, 293.66, 329.63, 329.63],
    },
    // 4. Şalaxo - Energetic Caucasus dance
    4: {
      bpm: 136,
      rhythm: '6_8',
      notes: [587.33, 523.25, 493.88, 440, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440, 392, 440, 493.88, 440],
    },
    // 5. Mirzəyi - Traditional classical wedding dance
    5: {
      bpm: 96,
      rhythm: '6_8',
      notes: [440, 440, 493.88, 523.25, 493.88, 440, 392, 440, 392, 349.23, 329.63, 349.23, 392, 440, 392, 349.23],
    },
    // 6. Tərərəm - Joyous village party tune
    6: {
      bpm: 132,
      rhythm: '6_8',
      notes: [523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440, 523.25, 493.88, 440, 392, 440, 493.88, 523.25, 440, 440],
    },
    // 7. Naz eləmə - Playful, melodic
    7: {
      bpm: 120,
      rhythm: '6_8',
      notes: [392, 440, 493.88, 523.25, 587.33, 523.25, 493.88, 440, 493.88, 523.25, 493.88, 440, 392, 349.23, 392, 392],
    },
    // 8. İnnabı - Elegant women's dance
    8: {
      bpm: 110,
      rhythm: '6_8',
      notes: [440, 493.88, 523.25, 493.88, 440, 392, 440, 392, 349.23, 329.63, 349.23, 392, 440, 349.23, 329.63, 329.63],
    },
    // 9. Cəngi - Grand heroic warrior anthem
    9: {
      bpm: 126,
      rhythm: '2_4',
      notes: [293.66, 329.63, 349.23, 392, 440, 440, 392, 440, 523.25, 493.88, 440, 392, 349.23, 329.63, 293.66, 293.66],
    },
    // 10. Aman Tərəkəmə - Dynamic nomadic yallı
    10: {
      bpm: 130,
      rhythm: '6_8',
      notes: [440, 523.25, 587.33, 523.25, 440, 493.88, 523.25, 440, 392, 440, 493.88, 440, 392, 349.23, 440, 440],
    },
    // 11. Uti-uti - Fast rhythmic party bounce
    11: {
      bpm: 142,
      rhythm: '6_8',
      notes: [523.25, 523.25, 587.33, 523.25, 493.88, 440, 493.88, 523.25, 587.33, 523.25, 493.88, 440, 392, 440, 440, 440],
    },
    // 12. Evləri var xana-xana - Famous folk melody
    12: {
      bpm: 115,
      rhythm: '6_8',
      notes: [392, 440, 493.88, 523.25, 493.88, 440, 392, 440, 493.88, 523.25, 587.33, 523.25, 493.88, 440, 392, 392],
    },
    // 13. Qalalı - Baku wedding rhythm
    13: {
      bpm: 128,
      rhythm: '6_8',
      notes: [440, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440, 493.88, 523.25, 440, 392, 440, 440, 440],
    },
    // 14. Gül açdı - Spring blooming wedding celebration
    14: {
      bpm: 122,
      rhythm: '6_8',
      notes: [523.25, 493.88, 440, 392, 440, 493.88, 523.25, 587.33, 523.25, 493.88, 440, 392, 349.23, 392, 440, 440],
    },
    // 15. Toy mahnısı - Grand finale village wedding celebration
    15: {
      bpm: 135,
      rhythm: '6_8',
      notes: [440, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440, 587.33, 523.25, 493.88, 440, 392, 440, 440, 440],
    },
  };

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.duckGain = this.ctx.createGain();
      
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.duckGain.gain.setValueAtTime(1.0, this.ctx.currentTime);

      // Routing: Synth -> DuckGain -> MasterGain -> Destination
      this.duckGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setOnBeatCallback(cb: (step: number) => void) {
    this.onBeatCallback = cb;
  }

  // Play Nağara Bass Strike ("Düm")
  public playDrumDum(volumeMultiplier = 1.0) {
    this.initContext();
    if (!this.ctx || !this.duckGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Punchy downward sweep from 140Hz to 48Hz
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.16);

    gain.gain.setValueAtTime(0.7 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.duckGain);

    osc.start(now);
    osc.stop(now + 0.23);
  }

  // Play Nağara Rim Strike ("Tək")
  public playDrumTek(volumeMultiplier = 1.0) {
    this.initContext();
    if (!this.ctx || !this.duckGain) return;
    const now = this.ctx.currentTime;

    // High pitched transient click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);

    gain.gain.setValueAtTime(0.5 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.duckGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // Double Strike ("Qoşa zərbə")
  public playDoubleStrike() {
    this.playDrumDum(1.1);
    setTimeout(() => {
      this.playDrumTek(0.9);
    }, 90);
  }

  // Traditional Folk Zurna / Tar Synth Note
  private playFolkLeadNote(freq: number, duration: number) {
    if (!this.ctx || !this.duckGain) return;
    const now = this.ctx.currentTime;

    // Oscillator 1: Sawtooth (reed instrument bite)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, now);

    // Oscillator 2: Slightly detuned triangle for body warmth
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.004, now);

    // Filter to give authentic woody/brass resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, now);
    filter.Q.setValueAtTime(3.5, now);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.22, now + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.duckGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.02);
    osc2.stop(now + duration + 0.02);
  }

  // Money / Shabash Clink & Chime Effect
  public playShabashSound() {
    this.initContext();
    if (!this.ctx || !this.duckGain) return;
    const now = this.ctx.currentTime;

    const freqs = [1200, 1600, 2400];
    freqs.forEach((f, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.03);
      gain.gain.setValueAtTime(0.15, now + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.03 + 0.25);

      osc.connect(gain);
      gain.connect(this.duckGain!);
      osc.start(now + i * 0.03);
      osc.stop(now + i * 0.03 + 0.26);
    });
  }

  // Crowd Clap / Applause burst
  public playApplauseSound() {
    this.initContext();
    if (!this.ctx || !this.duckGain) return;

    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        this.playDrumTek(0.4 + Math.random() * 0.3);
      }, i * 40 + Math.random() * 25);
    }
  }

  // Step sequencer step
  private step() {
    if (!this.isPlaying) return;

    const song = this.songMelodies[this.currentSongId] || this.songMelodies[1];
    const notes = song.notes;
    const rhythm = song.rhythm;

    // Drum pattern logic
    if (rhythm === '6_8') {
      // 6/8 folk rhythm: Düm (beat 0), tək (beat 2), düm (beat 3), tək (beat 5)
      const beatInMeasure = this.currentStep % 6;
      if (beatInMeasure === 0) {
        this.playDrumDum(1.0);
      } else if (beatInMeasure === 2 || beatInMeasure === 5) {
        this.playDrumTek(0.8);
      } else if (beatInMeasure === 3) {
        this.playDrumDum(0.7);
      }
    } else {
      // 2/4 yallı rhythm
      const beatInMeasure = this.currentStep % 4;
      if (beatInMeasure === 0) {
        this.playDrumDum(1.0);
      } else if (beatInMeasure === 2) {
        this.playDrumTek(0.85);
      }
    }

    // Lead melodic note
    const noteFreq = notes[this.currentStep % notes.length];
    if (noteFreq) {
      const stepIntervalSeconds = (60 / this.bpm) / 2;
      this.playFolkLeadNote(noteFreq, stepIntervalSeconds * 0.9);
    }

    if (this.onBeatCallback) {
      this.onBeatCallback(this.currentStep);
    }

    this.currentStep = (this.currentStep + 1) % 48;

    // Schedule next tick
    const intervalMs = ((60 / this.bpm) / 2) * 1000;
    this.timerId = window.setTimeout(() => this.step(), intervalMs);
  }

  // Play synthetic folk track
  public playSong(songId: number, customBpm?: number) {
    this.initContext();
    this.stop();

    this.currentSongId = songId;
    const songData = this.songMelodies[songId] || this.songMelodies[1];
    this.bpm = customBpm || songData.bpm;
    this.isPlaying = true;
    this.currentStep = 0;

    this.step();
  }

  // Play uploaded audio track
  public playUploadedAudio(audioUrl: string) {
    this.stop();
    this.initContext();

    if (!this.customAudio) {
      this.customAudio = new Audio();
    }
    this.customAudio.src = audioUrl;
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.customAudio.play().catch(e => console.warn('Custom audio playback notice:', e));
    this.isPlaying = true;

    // Fake rhythmic beat pulsing for character animation sync
    this.timerId = window.setInterval(() => {
      this.currentStep = (this.currentStep + 1) % 48;
      if (this.onBeatCallback) {
        this.onBeatCallback(this.currentStep);
      }
    }, 250);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public resume() {
    if (this.customAudio && this.customAudio.src) {
      this.customAudio.play().catch(e => console.warn(e));
      this.isPlaying = true;
    } else {
      this.isPlaying = true;
      this.step();
    }
  }

  public stop() {
    this.pause();
    this.currentStep = 0;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setTempo(newBpm: number) {
    this.bpm = Math.max(70, Math.min(190, newBpm));
  }

  // Audio Ducking: Smoothly drop background music during speech, then restore
  public duckAudio(durationMs: number = 3000) {
    if (this.duckGain && this.ctx) {
      const now = this.ctx.currentTime;
      // Drop to 20% volume
      this.duckGain.gain.cancelScheduledValues(now);
      this.duckGain.gain.setValueAtTime(this.duckGain.gain.value, now);
      this.duckGain.gain.linearRampToValueAtTime(0.2, now + 0.15);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume * 0.2;
    }
  }

  public restoreAudio() {
    if (this.duckGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.duckGain.gain.cancelScheduledValues(now);
      this.duckGain.gain.setValueAtTime(this.duckGain.gain.value, now);
      this.duckGain.gain.linearRampToValueAtTime(1.0, now + 0.3);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const globalAudioEngine = new AudioEngine();
