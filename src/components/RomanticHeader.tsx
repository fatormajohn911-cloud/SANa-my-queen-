import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/romanticAudio';

interface RomanticHeaderProps {
  onWishClick: () => void;
}

export const RomanticHeader: React.FC<RomanticHeaderProps> = ({ onWishClick }) => {
  const handleCelebrate = () => {
    romanticAudio.playHeartChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.1 },
      colors: ['#ff2d75', '#f7d070', '#e11d48'],
    });
    onWishClick();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#08040a]/85 border-b border-pink-500/15">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base sm:text-lg font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>FOR MY SANA</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline animate-heartbeat" />
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-pink-200/80">
          <a
            href="#birthday-reveal"
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0"
          >
            Birthday Reveal
          </a>
          <a
            href="#love-letter"
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0"
          >
            Love Letter
          </a>
          <a
            href="#long-distance"
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0"
          >
            7,500 km Love
          </a>
          <a
            href="#memories-gallery"
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0"
          >
            Memories
          </a>
          <a
            href="#final-surprise"
            className="hover:text-pink-300 transition-colors whitespace-nowrap shrink-0"
          >
            Final Surprise
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleCelebrate}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 rounded-full shadow-md shadow-pink-600/30 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-95 min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Send Du'a & Love</span>
          </button>
        </div>
      </div>
    </header>
  );
};
