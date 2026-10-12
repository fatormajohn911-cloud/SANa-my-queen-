import React from 'react';
import { Heart, Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/romanticAudio';

interface HeroGateProps {
  isRevealed: boolean;
  onOpenSurprise: () => void;
}

export const HeroGate: React.FC<HeroGateProps> = ({ isRevealed, onOpenSurprise }) => {
  const handleOpen = () => {
    // Trigger celebration confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff2d75', '#f7d070', '#e11d48', '#d946ef', '#ffffff'],
    });

    // Start romantic music on user gesture
    romanticAudio.play();

    // Trigger reveal callback
    onOpenSurprise();
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-16 z-20 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-xl mx-auto flex flex-col items-center">
        {/* Sweet intro badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-lg shadow-amber-500/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Private Birthday Dedication</span>
          <span className="text-pink-400 font-bold">•</span>
          <span className="text-pink-300">From Johnny Abdullah</span>
        </div>

        {/* Cinematic Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 tracking-tight leading-[1.15] mb-4">
          Sana, I made something special just for you
        </h1>

        {/* Romantic Heart Subtitle in calligraphy script */}
        <p className="font-script text-3xl sm:text-4xl text-pink-400 mb-6 drop-shadow-[0_0_15px_rgba(255,45,117,0.5)]">
          Forever in my heart, my queen ❤️
        </p>

        {/* Narrative Teaser Box */}
        <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-pink-500/20 max-w-md mx-auto mb-8 shadow-2xl relative group">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#08040a] px-3 py-0.5 rounded-full border border-pink-500/30 text-[11px] text-pink-300 tracking-wider uppercase font-semibold">
            Special Delivery
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            No matter the distance across the world, today is the day heaven blessed the earth with your smile. Close your eyes, take a gentle breath, and tap below.
          </p>
        </div>

        {/* Primary Interactive CTA Button */}
        {!isRevealed ? (
          <button
            onClick={handleOpen}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-semibold text-base sm:text-lg shadow-[0_0_30px_rgba(255,45,117,0.5)] hover:shadow-[0_0_50px_rgba(255,45,117,0.8)] active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px]"
          >
            <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Gift className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
            <span className="tracking-wide">Open Your Surprise</span>
            <Heart className="w-5 h-5 text-pink-200 fill-pink-200 animate-heartbeat" />
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Surprise Unlocked — Scroll Down My Love ↓</span>
            </div>
          </div>
        )}

        <div className="mt-8 text-xs text-pink-300/60 flex items-center gap-2">
          <span>Tap to unveil music, cake, memories & Johnny Abdullah's heartfelt love</span>
        </div>
      </div>
    </section>
  );
};
