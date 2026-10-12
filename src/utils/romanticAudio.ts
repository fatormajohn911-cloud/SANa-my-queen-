/**
 * Romantic Audio Engine for GitHub Uploaded Audio Tracks
 *
 * Track 1: Original Happy Birthday Song (uploaded to public/audio/birthday-song.mp3)
 * Intermission: 1 full minute (60s) pause between songs
 * Track 2: Johnny's Romantic Background Song (uploaded to public/audio/romantic-song.mp3)
 *
 * Features:
 * - Plays Track 1 (Happy Birthday) first
 * - When Track 1 finishes, pauses and waits 1 full minute (60s countdown)
 * - Stops Track 1 completely and starts Track 2 (Romantic Song)
 * - Never plays both songs simultaneously
 * - Plays continuously across all sections without restarting on scroll
 */

import { getAssetUrl } from './assetUrl';

export type AudioPhase = 'idle' | 'track1' | 'intermission' | 'track2';

export interface AudioState {
  isPlaying: boolean;
  phase: AudioPhase;
  intermissionRemaining: number; // in seconds
  currentTime: number;
  duration: number;
  volume: number;
  trackTitle: string;
  track1Loaded: boolean;
  track2Loaded: boolean;
}

type AudioStateListener = (state: AudioState) => void;

class RomanticAudioEngine {
  private currentPhase: AudioPhase = 'idle';
  private isUserPlaying = false;
  private volume = 1.0;

  // Track 1: Original Happy Birthday Song
  private track1Audio: HTMLAudioElement | null = null;
  private track1Loaded = false;
  private track1Title = 'Original Happy Birthday Song 🎂';
  private track1Paths = [
    getAssetUrl('audio/birthday-song.mp3'),
    getAssetUrl('audio/happy-birthday.mp3'),
    getAssetUrl('audio/birthday.mp3'),
    getAssetUrl('audio/track1.mp3'),
    './audio/birthday-song.mp3',
    './audio/happy-birthday.mp3',
  ];

  // Intermission (1 full minute)
  private intermissionSeconds = 60;
  private intermissionTimer: number | null = null;

  // Track 2: Background Romantic Song
  private track2Audio: HTMLAudioElement | null = null;
  private track2Loaded = false;
  private track2Title = 'Johnny Abdullah\'s Song For Sana ❤️';
  private track2Paths = [
    getAssetUrl('audio/romantic-song.mp3'),
    getAssetUrl('audio/song.mp3'),
    getAssetUrl('audio/background-song.mp3'),
    getAssetUrl('audio/sana-birthday.mp3'),
    getAssetUrl('audio/music.mp3'),
    getAssetUrl('audio/track2.mp3'),
    './audio/romantic-song.mp3',
    './audio/song.mp3',
  ];

  private listeners: Set<AudioStateListener> = new Set();
  private ctx: AudioContext | null = null;

  constructor() {
    this.detectTracks();
  }

  private detectTracks() {
    // Detect Track 1 (Original Happy Birthday Song)
    for (const path of this.track1Paths) {
      const probe1 = new Audio();
      probe1.src = path;
      probe1.oncanplay = () => {
        if (!this.track1Loaded) {
          this.setTrack1Source(path, 'Original Happy Birthday Song 🎂');
        }
      };
      probe1.onerror = () => {};
    }

    // Detect Track 2 (Background Romantic Song)
    for (const path of this.track2Paths) {
      const probe2 = new Audio();
      probe2.src = path;
      probe2.oncanplay = () => {
        if (!this.track2Loaded) {
          this.setTrack2Source(path, 'Johnny Abdullah\'s Song For Sana ❤️');
        }
      };
      probe2.onerror = () => {};
    }
  }

  public setTrack1Source(url: string, title = 'Original Happy Birthday Song 🎂') {
    if (this.track1Audio) {
      this.track1Audio.pause();
      this.track1Audio.src = '';
    }

    this.track1Audio = new Audio(url);
    this.track1Audio.volume = this.volume;
    this.track1Title = title;
    this.track1Loaded = true;

    this.track1Audio.ontimeupdate = () => {
      if (this.currentPhase === 'track1') this.notify();
    };
    this.track1Audio.onended = () => {
      // When Track 1 finishes, proceed to 1-minute intermission!
      this.onTrack1Ended();
    };
    this.track1Audio.onplay = () => this.notify();
    this.track1Audio.onpause = () => this.notify();

    this.notify();
  }

  public setTrack2Source(url: string, title = 'Johnny Abdullah\'s Song For Sana ❤️') {
    if (this.track2Audio) {
      this.track2Audio.pause();
      this.track2Audio.src = '';
    }

    this.track2Audio = new Audio(url);
    this.track2Audio.loop = true;
    this.track2Audio.volume = this.volume;
    this.track2Title = title;
    this.track2Loaded = true;

    this.track2Audio.ontimeupdate = () => {
      if (this.currentPhase === 'track2') this.notify();
    };
    this.track2Audio.onplay = () => this.notify();
    this.track2Audio.onpause = () => this.notify();

    this.notify();
  }

  public subscribe(listener: AudioStateListener) {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }

  public getState(): AudioState {
    let title = this.track1Title;
    let curTime = 0;
    let dur = 180;

    if (this.currentPhase === 'track1') {
      title = this.track1Title;
      curTime = this.track1Audio?.currentTime || 0;
      dur = this.track1Audio?.duration || 180;
    } else if (this.currentPhase === 'intermission') {
      title = `Waiting 1 min (${this.intermissionSeconds}s)... Next: ${this.track2Title}`;
      curTime = 60 - this.intermissionSeconds;
      dur = 60;
    } else if (this.currentPhase === 'track2') {
      title = this.track2Title;
      curTime = this.track2Audio?.currentTime || 0;
      dur = this.track2Audio?.duration || 240;
    }

    return {
      isPlaying: this.isUserPlaying,
      phase: this.currentPhase,
      intermissionRemaining: this.intermissionSeconds,
      currentTime: curTime,
      duration: dur,
      volume: this.volume,
      trackTitle: title,
      track1Loaded: this.track1Loaded,
      track2Loaded: this.track2Loaded,
    };
  }

  public isPlaying(): boolean {
    return this.isUserPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.track1Audio) this.track1Audio.volume = this.volume;
    if (this.track2Audio) this.track2Audio.volume = this.volume;
    this.notify();
  }

  public seek(seconds: number) {
    if (this.currentPhase === 'track1' && this.track1Audio && this.track1Audio.duration) {
      this.track1Audio.currentTime = Math.max(0, Math.min(this.track1Audio.duration, seconds));
    } else if (this.currentPhase === 'track2' && this.track2Audio && this.track2Audio.duration) {
      this.track2Audio.currentTime = Math.max(0, Math.min(this.track2Audio.duration, seconds));
    }
    this.notify();
  }

  // Called when Track 1 (Happy Birthday) ends
  private onTrack1Ended() {
    // 1. Stop Track 1 completely
    if (this.track1Audio) {
      this.track1Audio.pause();
    }

    // 2. Start 1-minute intermission
    this.currentPhase = 'intermission';
    this.intermissionSeconds = 60;
    this.notify();

    if (this.intermissionTimer !== null) {
      clearInterval(this.intermissionTimer);
    }

    this.intermissionTimer = window.setInterval(() => {
      if (!this.isUserPlaying) return; // paused

      this.intermissionSeconds -= 1;
      this.notify();

      if (this.intermissionSeconds <= 0) {
        if (this.intermissionTimer !== null) {
          clearInterval(this.intermissionTimer);
          this.intermissionTimer = null;
        }
        // 3. Start Track 2 (Johnny's Romantic Song)!
        this.startTrack2();
      }
    }, 1000);
  }

  // Start Track 2 (Never simultaneous!)
  public startTrack2() {
    // Stop Track 1 completely first
    if (this.track1Audio) {
      this.track1Audio.pause();
    }

    if (this.intermissionTimer !== null) {
      clearInterval(this.intermissionTimer);
      this.intermissionTimer = null;
    }

    this.currentPhase = 'track2';

    if (this.track2Audio) {
      this.track2Audio.volume = this.volume;
      this.track2Audio.play().catch((err) => {
        console.warn('Track 2 play triggered', err);
      });
    }

    this.notify();
  }

  // Start Track 1 (Happy Birthday)
  public startTrack1() {
    // Stop Track 2 completely first
    if (this.track2Audio) {
      this.track2Audio.pause();
    }

    this.currentPhase = 'track1';

    if (this.track1Audio) {
      this.track1Audio.volume = this.volume;
      this.track1Audio.play().catch((err) => {
        console.warn('Track 1 play triggered', err);
      });
    }

    this.notify();
  }

  public play() {
    this.isUserPlaying = true;

    if (this.currentPhase === 'idle' || this.currentPhase === 'track1') {
      this.startTrack1();
    } else if (this.currentPhase === 'intermission') {
      // Resume intermission countdown
      this.notify();
    } else if (this.currentPhase === 'track2') {
      if (this.track2Audio) {
        this.track2Audio.play().catch(() => {});
      }
      this.notify();
    }
  }

  public pause() {
    this.isUserPlaying = false;

    if (this.currentPhase === 'track1' && this.track1Audio) {
      this.track1Audio.pause();
    } else if (this.currentPhase === 'track2' && this.track2Audio) {
      this.track2Audio.pause();
    }

    this.notify();
  }

  public toggle() {
    if (this.isUserPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public skipToTrack2() {
    this.startTrack2();
  }

  // Optional chimes
  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playCandleBlowChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.18 * this.volume, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.6);
    });
  }

  public playHeartChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25].forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.16 * this.volume, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.5);
    });
  }
}

export const romanticAudio = new RomanticAudioEngine();
