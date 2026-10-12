import React from 'react';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/romanticAudio';

interface ReplayControlProps {
  onReplay: () => void;
}

export const ReplayControl: React.FC<ReplayControlProps> = ({ onReplay }) => {
  const handleReplayClick = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.8 },
      colors: ['#ff2d75', '#f7d070', '#e11d48', '#d946ef', '#ffffff'],
    });
    romanticAudio.playHeartChime();
    onReplay();

    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 z-20 border-t border-pink-500/20 bg-gradient-to-t from-black via-[#0c0512] to-transparent text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Glowing Heart Icon */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-600/30 to-purple-600/30 border border-pink-400/40 flex items-center justify-center text-pink-400 mb-4 animate-heartbeat shadow-[0_0_25px_rgba(255,45,117,0.4)]">
          <Heart className="w-7 h-7 fill-pink-500 text-pink-400" />
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl text-amber-200 font-bold mb-2">
          FOR MY SANA ❤️
        </h3>
        <p className="font-script text-2xl sm:text-3xl text-pink-300 mb-6 drop-shadow-[0_0_12px_rgba(255,45,117,0.5)]">
          A Birthday Surprise From Johnny Abdullah
        </p>

        {/* Replay Surprise Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <button
            onClick={handleReplayClick}
            className="group px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-medium text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(255,45,117,0.45)] hover:shadow-[0_0_45px_rgba(255,45,117,0.7)] hover:scale-105 active:scale-95 transition-all min-h-[48px]"
          >
            <RotateCcw className="w-4 h-4 text-amber-200 group-hover:-rotate-90 transition-transform duration-300" />
            <span>Replay Birthday Surprise Again 🔄</span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </button>
        </div>

        {/* Romantic Footer Inscription */}
        <div className="text-xs text-slate-300/80 font-light space-y-1.5 max-w-lg">
          <p>
            Bridging Sierra Leone 🇸🇱 and Pakistan 🇵🇰 with eternal devotion.
          </p>
          <p className="text-[12px] text-pink-300/70 font-editorial italic">
            “In every breath and every tomorrow, my heart belongs only to you.”
          </p>
          <p className="text-[11px] text-amber-200/60 pt-1">
            May Allah bless Sana with endless happiness, radiant health, peace, and success. Ameen.
          </p>
        </div>
      </div>
    </footer>
  );
};
