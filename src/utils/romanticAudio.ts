/**
 * Enhanced Romantic Audio Engine
 * 1. Plays Happy Birthday piano intro first on play.
 * 2. When the intro finishes, waits 1 full minute (60s intermission).
 * 3. Stops any remaining intro audio and starts the real background song uploaded to GitHub.
 * 4. Never plays both songs simultaneously.
 * 5. Plays continuously across all sections without restarting on scroll.
 */

export type AudioPhase = 'idle' | 'intro' | 'intermission' | 'real-song';

export interface AudioState {
  isPlaying: boolean;
  phase: AudioPhase;
  intermissionRemaining: number; // in seconds
  currentTime: number;
  duration: number;
  volume: number;
  trackTitle: string;
}

type AudioStateListener = (state: AudioState) => void;

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private currentPhase: AudioPhase = 'idle';
  private isUserPlaying = false;

  // Intro Web Audio synth state
  private activeOscillators: OscillatorNode[] = [];
  private introTimeout: number | null = null;
  private introDuration = 14; // ~14 seconds for one full Happy Birthday piano intro
  private introStartTime = 0;
  private introProgressTimer: number | null = null;
  private introCurrentTime = 0;

  // Intermission (1 full minute = 60s) state
  private intermissionSeconds = 60;
  private intermissionTimer: number | null = null;

  // Real song (GitHub repository audio / custom file) state
  private realAudioElement: HTMLAudioElement | null = null;
  private realAudioLoaded = false;
  private realAudioUrl: string | null = null;
  private realSongTitle = 'Johnny\'s Song For Sana ❤️';

  private volume = 0.85;
  private listeners: Set<AudioStateListener> = new Set();

  constructor() {
    this.detectRepoAudio();
  }

  // Scan for background songs placed in the GitHub repository
  private detectRepoAudio() {
    const candidatePaths = [
      './audio/song.mp3',
      './audio/romantic-song.mp3',
      './audio/sana-birthday.mp3',
      './audio/background-song.mp3',
      './audio/birthday.mp3',
      './audio/music.mp3',
      './audio/our-song.mp3',
    ];

    for (const path of candidatePaths) {
      const probe = new Audio();
      probe.src = path;
      probe.oncanplay = () => {
        if (!this.realAudioLoaded) {
          this.initRealAudio(path, 'Johnny\'s Song For Sana ❤️ (GitHub Audio)');
        }
      };
      probe.onerror = () => {
        // Will continue fallback search
      };
    }
  }

  private initRealAudio(url: string, title?: string) {
    if (this.realAudioElement) {
      this.realAudioElement.pause();
      this.realAudioElement.src = '';
    }

    this.realAudioElement = new Audio(url);
    this.realAudioElement.loop = true;
    this.realAudioElement.volume = this.volume;
    this.realAudioUrl = url;
    this.realAudioLoaded = true;
    if (title) this.realSongTitle = title;

    this.realAudioElement.ontimeupdate = () => {
      if (this.currentPhase === 'real-song') {
        this.notify();
      }
    };
    this.realAudioElement.onplay = () => this.notify();
    this.realAudioElement.onpause = () => this.notify();
    this.realAudioElement.onended = () => this.notify();
    this.realAudioElement.onerror = () => {
      this.realAudioLoaded = false;
      this.notify();
    };
  }

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
    let title = 'Happy Birthday Piano Intro 🎹';
    let curTime = 0;
    let dur = this.introDuration;

    if (this.currentPhase === 'intermission') {
      title = `Intermission (${this.intermissionSeconds}s)... Johnny's Song Next ⏳`;
      curTime = 60 - this.intermissionSeconds;
      dur = 60;
    } else if (this.currentPhase === 'real-song') {
      title = this.realSongTitle;
      curTime = this.realAudioElement?.currentTime || 0;
      dur = this.realAudioElement?.duration || 210;
    } else if (this.currentPhase === 'intro') {
      curTime = this.introCurrentTime;
      dur = this.introDuration;
    }

    return {
      isPlaying: this.isUserPlaying,
      phase: this.currentPhase,
      intermissionRemaining: this.intermissionSeconds,
      currentTime: curTime,
      duration: dur,
      volume: this.volume,
      trackTitle: title,
    };
  }

  public isPlaying(): boolean {
    return this.isUserPlaying;
  }

  public setCustomAudio(url: string, title = 'Johnny\'s Song For Sana ❤️') {
    this.initRealAudio(url, title);
    // If already in real-song phase, switch and play
    if (this.currentPhase === 'real-song' && this.isUserPlaying) {
      this.realAudioElement?.play().catch(() => {});
    }
    this.notify();
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.realAudioElement) {
      this.realAudioElement.volume = this.volume;
    }
    this.notify();
  }

  public seek(seconds: number) {
    if (this.currentPhase === 'real-song' && this.realAudioElement?.duration) {
      this.realAudioElement.currentTime = Math.max(0, Math.min(this.realAudioElement.duration, seconds));
    } else if (this.currentPhase === 'intro') {
      this.introCurrentTime = Math.max(0, Math.min(this.introDuration, seconds));
    }
    this.notify();
  }

  // --- Piano Intro Synthesizer ---
  private stopIntroAudio() {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.activeOscillators = [];

    if (this.introTimeout !== null) {
      clearTimeout(this.introTimeout);
      this.introTimeout = null;
    }
    if (this.introProgressTimer !== null) {
      clearInterval(this.introProgressTimer);
      this.introProgressTimer = null;
    }
  }

  public playTone(freq: number, startTime: number, duration: number, vol = 0.25) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    const actualVol = vol * this.volume;

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(actualVol, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    gain2.gain.setValueAtTime(0, startTime);
    gain2.gain.linearRampToValueAtTime(actualVol * 0.35, startTime + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(filter);
    gain2.connect(filter);
    filter.connect(this.ctx.destination);

    this.activeOscillators.push(osc, osc2);

    osc.start(startTime);
    osc.stop(startTime + duration);
    osc2.start(startTime);
    osc2.stop(startTime + duration);
  }

  private startHappyBirthdayIntro() {
    this.stopIntroAudio();
    this.initContext();
    if (!this.ctx) return;

    this.currentPhase = 'intro';
    this.introStartTime = Date.now();
    this.introCurrentTime = 0;

    const now = this.ctx.currentTime;
    const tempo = 0.52;

    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0, A4 = 440.0, Bb4 = 466.16;
    const C5 = 523.25;
    const C3 = 130.81, F3 = 174.61, G3 = 196.0, A3 = 220.0;

    const melody = [
      { note: C4, beat: 0, dur: 0.4, bass: F3 },
      { note: C4, beat: 0.6, dur: 0.4 },
      { note: D4, beat: 1.2, dur: 0.8 },
      { note: C4, beat: 2.2, dur: 0.8 },
      { note: F4, beat: 3.2, dur: 0.8, bass: C3 },
      { note: E4, beat: 4.2, dur: 1.4 },

      { note: C4, beat: 6.0, dur: 0.4, bass: G3 },
      { note: C4, beat: 6.6, dur: 0.4 },
      { note: D4, beat: 7.2, dur: 0.8 },
      { note: C4, beat: 8.2, dur: 0.8 },
      { note: G4, beat: 9.2, dur: 0.8, bass: C3 },
      { note: F4, beat: 10.2, dur: 1.4 },

      { note: C4, beat: 12.0, dur: 0.4, bass: F3 },
      { note: C4, beat: 12.6, dur: 0.4 },
      { note: C5, beat: 13.2, dur: 0.9, bass: A3 },
      { note: A4, beat: 14.3, dur: 0.9 },
      { note: F4, beat: 15.4, dur: 0.9, bass: F3 },
      { note: E4, beat: 16.5, dur: 0.9 },
      { note: D4, beat: 17.6, dur: 1.3, bass: Bb4 },

      { note: Bb4, beat: 19.2, dur: 0.4, bass: G3 },
      { note: Bb4, beat: 19.8, dur: 0.4 },
      { note: A4, beat: 20.4, dur: 0.9 },
      { note: F4, beat: 21.5, dur: 0.9, bass: C3 },
      { note: G4, beat: 22.6, dur: 0.9 },
      { note: F4, beat: 23.7, dur: 2.2, bass: F3 },
    ];

    melody.forEach((item) => {
      const time = now + item.beat * tempo;
      this.playTone(item.note, time, item.dur * tempo * 1.5, 0.22);
      if (item.bass) {
        this.playTone(item.bass, time, item.dur * tempo * 2.2, 0.12);
      }
    });

    // Track intro progress timer
    this.introProgressTimer = window.setInterval(() => {
      if (this.currentPhase === 'intro' && this.isUserPlaying) {
        this.introCurrentTime += 1;
        this.notify();
      }
    }, 1000);

    // Exact duration of intro melody is ~14 seconds
    const introTotalMs = 14 * 1000;
    this.introTimeout = window.setTimeout(() => {
      this.onIntroFinished();
    }, introTotalMs);

    this.notify();
  }

  // Called when intro finishes: enter 1 full minute (60s) intermission
  private onIntroFinished() {
    this.stopIntroAudio();
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
        // Start real song after 1 full minute!
        this.startRealBackgroundSong();
      }
    }, 1000);
  }

  // Start the real background song from GitHub repository
  public startRealBackgroundSong() {
    // 1. Stop any remaining intro audio completely (Never play both simultaneously!)
    this.stopIntroAudio();

    if (this.intermissionTimer !== null) {
      clearInterval(this.intermissionTimer);
      this.intermissionTimer = null;
    }

    this.currentPhase = 'real-song';

    // If real audio element exists and is loaded, play it smoothly
    if (this.realAudioElement) {
      this.realAudioElement.volume = this.volume;
      this.realAudioElement.play().catch((err) => {
        console.warn('Real audio element playback started', err);
      });
    }

    this.notify();
  }

  // Main User Play Toggle
  public play() {
    this.isUserPlaying = true;

    if (this.currentPhase === 'idle') {
      // Step 1: Start Happy Birthday piano intro first
      this.startHappyBirthdayIntro();
    } else if (this.currentPhase === 'intro') {
      this.initContext();
      this.startHappyBirthdayIntro();
    } else if (this.currentPhase === 'intermission') {
      // resume counting down intermission
      this.notify();
    } else if (this.currentPhase === 'real-song') {
      if (this.realAudioElement) {
        this.realAudioElement.play().catch(() => {});
      }
      this.notify();
    }
  }

  public pause() {
    this.isUserPlaying = false;

    if (this.currentPhase === 'intro') {
      this.stopIntroAudio();
    } else if (this.currentPhase === 'real-song') {
      if (this.realAudioElement) {
        this.realAudioElement.pause();
      }
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

  // Fast skip option to real song if desired
  public skipToRealSong() {
    this.startRealBackgroundSong();
  }

  // Sound effects
  public playCandleBlowChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
    notes.forEach((freq, idx) => {
      this.playTone(freq, now + idx * 0.08, 0.7, 0.2);
    });
  }

  public playHeartChime() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.playTone(523.25, now, 0.5, 0.18);
    this.playTone(659.25, now + 0.06, 0.6, 0.2);
  }
}

export const romanticAudio = new RomanticAudioEngine();
