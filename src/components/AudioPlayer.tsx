import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Upload, ChevronDown, ChevronUp, Sparkles, FastForward } from 'lucide-react';
import { romanticAudio, AudioState } from '../utils/romanticAudio';

export const AudioPlayer: React.FC = () => {
  const [playerState, setPlayerState] = useState<AudioState>({
    isPlaying: false,
    phase: 'idle',
    intermissionRemaining: 60,
    currentTime: 0,
    duration: 14,
    volume: 0.85,
    trackTitle: 'Happy Birthday Piano Intro 🎹',
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setPlayerState(state);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = () => {
    romanticAudio.toggle();
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    romanticAudio.seek(val);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    romanticAudio.setVolume(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const name = file.name.replace(/\.[^/.]+$/, '');
      romanticAudio.setCustomAudio(url, name);
    }
  };

  const handleSkipWait = () => {
    romanticAudio.skipToRealSong();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {/* Floating Speaker / Music Capsule Bar */}
      <div
        className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-full glass-panel border transition-all duration-300 shadow-2xl ${
          playerState.isPlaying
            ? 'border-pink-500/50 shadow-pink-500/20 bg-[#160a1c]/95'
            : 'border-pink-500/20 bg-[#0d0514]/90'
        }`}
      >
        {/* Prominent Speaker & Play/Pause Trigger */}
        <button
          onClick={handleToggle}
          className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white flex items-center justify-center shadow-md active:scale-95 transition-all focus:outline-none min-h-[44px] min-w-[44px]"
          title={playerState.isPlaying ? 'Pause music' : 'Play music'}
          aria-label={playerState.isPlaying ? 'Pause music' : 'Play music'}
        >
          {playerState.isPlaying ? (
            <Volume2 className="w-5 h-5 text-white animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-pink-200" />
          )}
        </button>

        {/* Status Preview with Speaker/Music Icon on larger viewports */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden sm:flex flex-col text-left cursor-pointer px-1.5 min-w-[130px] max-w-[210px]"
        >
          <div className="flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-pink-400 shrink-0" />
            <span className="text-[11px] font-semibold text-pink-200 truncate">
              {playerState.trackTitle}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-pink-300/80 font-mono">
            {playerState.phase === 'intermission' ? (
              <span className="text-amber-300 font-medium">Wait {playerState.intermissionRemaining}s</span>
            ) : (
              <span>
                {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
              </span>
            )}
            <span className="text-pink-400 font-bold">•</span>
            <span className="text-pink-200 capitalize text-[9px]">{playerState.phase}</span>
          </div>
        </div>

        {/* Equalizer animation when actively playing audio */}
        {playerState.isPlaying && playerState.phase !== 'intermission' && (
          <div className="flex items-end gap-0.5 h-3.5 px-1" aria-hidden="true">
            <span className="w-0.5 bg-pink-400 rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-2"></span>
            <span className="w-0.5 bg-rose-400 rounded-full animate-[bounce_1.1s_ease-in-out_infinite_0.2s] h-3.5"></span>
            <span className="w-0.5 bg-amber-300 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.4s] h-2.5"></span>
            <span className="w-0.5 bg-pink-300 rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.1s] h-3"></span>
          </div>
        )}

        {/* Expand / Collapse Drawer Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 text-pink-300/80 hover:text-white rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          title={isExpanded ? 'Collapse controls' : 'Expand music controls'}
          aria-label="Toggle music controls"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Music Player Controls Card */}
      {isExpanded && (
        <div className="mt-2 w-84 p-5 rounded-3xl glass-panel border border-pink-500/35 shadow-2xl backdrop-blur-2xl text-left animate-fade-in">
          {/* Header with Speaker & Music branding */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-pink-500/20">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                Romantic Soundtrack
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-slate-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* Current Music Transition Stage Indicator */}
          <div className="mb-3.5 p-2.5 rounded-xl bg-black/40 border border-pink-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                Music Transition
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-pink-950/60 text-pink-300 border border-pink-500/30">
                {playerState.phase === 'intro'
                  ? 'Step 1: Piano Intro'
                  : playerState.phase === 'intermission'
                  ? 'Step 2: 1-Min Intermission'
                  : playerState.phase === 'real-song'
                  ? 'Step 3: Real Background Song'
                  : 'Ready to Play'}
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
              {playerState.trackTitle}
            </h4>

            {/* Intermission countdown and Skip button */}
            {playerState.phase === 'intermission' && (
              <div className="mt-2 flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[11px] text-amber-200">
                  Waiting 1 min ({playerState.intermissionRemaining}s left)...
                </span>
                <button
                  onClick={handleSkipWait}
                  className="px-2.5 py-1 rounded-md bg-pink-600 hover:bg-pink-500 text-white text-[10px] font-semibold flex items-center gap-1 transition-colors min-h-[30px]"
                >
                  <FastForward className="w-3 h-3" />
                  <span>Start Song Now</span>
                </button>
              </div>
            )}
          </div>

          {/* Progress Bar & Seek */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>{formatTime(playerState.currentTime)}</span>
              <span>{formatTime(playerState.duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={playerState.duration || 180}
              step="0.5"
              value={playerState.currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              aria-label="Seek audio position"
            />
          </div>

          {/* Volume Slider with Speaker Icon */}
          <div className="flex items-center gap-3 mb-4 p-2.5 rounded-xl bg-black/40 border border-white/5">
            <button
              onClick={() => romanticAudio.setVolume(playerState.volume > 0 ? 0 : 0.85)}
              className="text-pink-300 hover:text-white"
              title={playerState.volume === 0 ? 'Unmute' : 'Mute'}
            >
              {playerState.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-pink-300" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={playerState.volume}
              onChange={handleVolume}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              aria-label="Adjust volume"
            />
            <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
              {Math.round(playerState.volume * 100)}%
            </span>
          </div>

          {/* Upload / Replace GitHub Audio Tool */}
          <div className="space-y-2 pt-2 border-t border-pink-500/15">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-3 py-2 rounded-xl bg-pink-950/40 hover:bg-pink-900/50 border border-pink-500/25 text-pink-200 text-xs flex items-center justify-between transition-colors min-h-[40px]"
            >
              <span className="flex items-center gap-2">
                <Upload className="w-3.5 h-3.5 text-pink-400" />
                <span>Upload Real Song From Device (MP3)</span>
              </span>
              <Music className="w-3.5 h-3.5 text-amber-300" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <p className="text-[10px] text-slate-400 leading-relaxed font-light">
              Plays seamlessly across all sections without restarting when you scroll.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
