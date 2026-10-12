import React, { useState } from 'react';
import { Heart, Sparkles, Flame, RotateCcw, Gift, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/romanticAudio';

interface BirthdayRevealProps {
  portraitSrc: string;
}

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ portraitSrc }) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [hasBlownAll, setHasBlownAll] = useState<boolean>(false);
  const [wishMade, setWishMade] = useState<boolean>(false);
  const [showSurpriseModal, setShowSurpriseModal] = useState<boolean>(false);

  const allOut = candlesLit.every((c) => !c);

  const triggerCelebration = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#ff2d75', '#f7d070', '#e11d48', '#a855f7', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.6 },
        colors: ['#f7d070', '#fb7185', '#ec4899'],
      });
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 60,
        origin: { x: 0.85, y: 0.6 },
        colors: ['#f7d070', '#fb7185', '#a855f7'],
      });
    }, 280);

    romanticAudio.playCandleBlowChime();
    setHasBlownAll(true);
    setWishMade(true);
  };

  const handleBlowCandle = (index: number) => {
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every((c) => !c)) {
      triggerCelebration();
    } else {
      romanticAudio.playHeartChime();
    }
  };

  const handleBlowAll = () => {
    setCandlesLit([false, false, false, false, false]);
    triggerCelebration();
  };

  const handleRelight = () => {
    setCandlesLit([true, true, true, true, true]);
    setHasBlownAll(false);
    romanticAudio.playHeartChime();
  };

  const handleOpenSpecialSurprise = () => {
    setShowSurpriseModal(true);
    romanticAudio.playHeartChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f7d070', '#ff2d75', '#ffffff'],
    });
  };

  return (
    <section id="birthday-reveal" className="relative py-20 px-4 z-20 max-w-5xl mx-auto text-center">
      {/* Background ambient lighting & anamorphic light sweep */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-gradient-to-r from-pink-600/15 via-purple-600/20 to-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Lens flare streak */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent pointer-events-none" />

      {/* Romantic Birthday Heading */}
      <div className="relative mb-12">
        <span className="font-script text-3xl sm:text-5xl text-amber-300 block mb-2 drop-shadow-[0_0_15px_rgba(247,208,112,0.6)]">
          Dearest Queen of My Soul
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-100 to-amber-200 tracking-tight leading-tight animate-glow-shimmer drop-shadow-[0_0_25px_rgba(255,45,117,0.7)]">
          HAPPY BIRTHDAY, MY SANA ❤️
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4 text-xs sm:text-sm text-pink-300/80 tracking-widest uppercase font-medium">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-pink-500" />
          <span>A CELEBRATION CRAFTED WITH ETERNAL LOVE BY JOHNNY</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-pink-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Center: Sana's Portrait in Luxury Animated Frame */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative group p-2.5 sm:p-3.5 rounded-3xl bg-gradient-to-b from-amber-400/35 via-pink-500/25 to-purple-600/35 shadow-[0_0_50px_rgba(255,45,117,0.4)] transition-all duration-500 hover:shadow-[0_0_75px_rgba(255,45,117,0.7)]">
            {/* Animated glowing border ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 via-amber-400 to-purple-600 opacity-60 blur-md group-hover:opacity-95 transition-opacity" />

            <div className="relative overflow-hidden rounded-2xl bg-[#08040a] aspect-[4/5] w-full max-w-[340px] sm:max-w-[380px] border border-amber-400/40">
              <img
                src={portraitSrc}
                alt="Portrait of Sana"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('WA0054')) {
                    target.src = './images/IMG-20261011-WA0054.jpg';
                  }
                }}
              />

              {/* Bottom cinematic gradient scrim */}
              <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center text-center">
                <span className="font-script text-2xl sm:text-3xl text-amber-200">
                  My Beautiful Sana
                </span>
                <p className="text-[12px] text-pink-200/90 font-light tracking-wide mt-0.5">
                  The smile that lights up my whole world
                </p>
              </div>

              {/* Gold frame corner accents */}
              <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-amber-300" />
              <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-amber-300" />
              <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-amber-300" />
              <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-amber-300" />
            </div>
          </div>
        </div>

        {/* Right: Realistic Animated Birthday Cake with Interactive Candles */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-pink-500/30 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Birthday Cake</span>
              </span>
              <span className="text-xs text-pink-300/80">
                {allOut ? '✨ Candles Blown Out!' : '🎂 Tap candles to blow'}
              </span>
            </div>

            {/* The Animated Cake Construction */}
            <div className="relative my-8 flex flex-col items-center">
              {/* Candles Row */}
              <div className="flex items-end justify-center gap-4 sm:gap-6 z-20 mb-[-6px]">
                {candlesLit.map((isLit, idx) => (
                  <button
                    key={idx}
                    onClick={() => isLit && handleBlowCandle(idx)}
                    className="group relative flex flex-col items-center focus:outline-none cursor-pointer min-h-[44px] min-w-[32px] justify-end pb-1"
                    title={isLit ? 'Tap to blow out candle' : 'Candle blown'}
                    aria-label={`Candle ${idx + 1}: ${isLit ? 'Lit, tap to blow' : 'Blown out'}`}
                  >
                    {/* Flame or Smoke */}
                    {isLit ? (
                      <div className="relative mb-1">
                        {/* Glow halo */}
                        <div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-sm animate-pulse" />
                        {/* Flame shape */}
                        <div className="w-3.5 sm:w-4 h-6 sm:h-7 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full animate-flame" />
                        {/* Blue base */}
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mx-auto -mt-1 opacity-70" />
                      </div>
                    ) : (
                      <div className="h-6 sm:h-7 flex flex-col items-center justify-end mb-1">
                        <div className="w-2 h-2 rounded-full bg-slate-300/60 animate-smoke" />
                        <div className="w-0.5 h-2 bg-slate-600 rounded-full" />
                      </div>
                    )}

                    {/* Candle Wax Body */}
                    <div
                      className={`w-3.5 sm:w-4 h-12 rounded-t-sm shadow-md transition-all ${
                        idx % 2 === 0
                          ? 'bg-gradient-to-b from-pink-400 via-rose-300 to-pink-500'
                          : 'bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400'
                      }`}
                    >
                      {/* Wax stripes */}
                      <div className="w-full h-1 bg-white/40 mt-2" />
                      <div className="w-full h-1 bg-white/40 mt-2" />
                      <div className="w-full h-1 bg-white/40 mt-2" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Cake Top Tier */}
              <div className="relative w-48 sm:w-56 h-14 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 rounded-t-2xl border-t border-x border-pink-300/40 shadow-inner flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-3 bg-white/40 rounded-full blur-[1px]" />
                <div className="absolute top-2 flex justify-around w-full px-2" aria-hidden="true">
                  <div className="w-3 h-3 bg-white/30 rounded-full" />
                  <div className="w-4 h-4 bg-white/40 rounded-full -mt-0.5" />
                  <div className="w-3 h-3 bg-white/30 rounded-full" />
                  <div className="w-4 h-4 bg-white/40 rounded-full -mt-0.5" />
                  <div className="w-3 h-3 bg-white/30 rounded-full" />
                </div>
                <span className="font-script text-xl text-white drop-shadow font-semibold">
                  For Sana
                </span>
              </div>

              {/* Cake Middle Tier */}
              <div className="relative w-64 sm:w-72 h-16 bg-gradient-to-r from-pink-700 via-pink-600 to-rose-700 border-x border-pink-400/30 flex items-center justify-center shadow-lg">
                <div className="absolute top-0 inset-x-0 h-2 bg-pink-300/40" />
                <div className="flex gap-3 text-amber-300 text-xs" aria-hidden="true">
                  <span>★</span>
                  <span>♥</span>
                  <span>★</span>
                  <span>♥</span>
                  <span>★</span>
                  <span>♥</span>
                  <span>★</span>
                </div>
              </div>

              {/* Cake Base Tier */}
              <div className="relative w-76 sm:w-84 h-16 bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 rounded-b-xl border border-pink-500/40 flex items-center justify-center shadow-2xl">
                <span className="font-editorial text-sm sm:text-base text-amber-200 tracking-widest uppercase">
                  Happy Birthday My Love
                </span>
              </div>

              {/* Gold Serving Platter */}
              <div className="w-84 sm:w-96 h-4 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 rounded-full shadow-[0_10px_25px_rgba(247,208,112,0.3)] -mt-1 border border-amber-200/50" />
            </div>

            {/* Interactive Cake Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              {!allOut ? (
                <button
                  onClick={handleBlowAll}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 active:scale-95 transition-all min-h-[44px]"
                >
                  <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
                  <span>Blow Out All Candles & Make a Wish</span>
                </button>
              ) : (
                <button
                  onClick={handleRelight}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-pink-200 border border-pink-500/30 font-medium text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all min-h-[44px]"
                >
                  <RotateCcw className="w-4 h-4 text-pink-400" />
                  <span>Relight Candles 🕯️</span>
                </button>
              )}

              {/* Interactive Surprise Button requested in Brief 4 */}
              <button
                onClick={handleOpenSpecialSurprise}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-gradient-to-r from-amber-500/90 to-rose-500/90 hover:from-amber-400 hover:to-rose-400 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all min-h-[44px]"
              >
                <Gift className="w-4 h-4 text-amber-200" />
                <span>Special Surprise Message 💌</span>
              </button>
            </div>

            {/* Birthday Wish Celebration Message */}
            {wishMade && (
              <div className="mt-5 p-4 rounded-xl bg-pink-950/40 border border-pink-400/40 text-center animate-fade-in">
                <div className="flex items-center justify-center gap-1.5 text-amber-300 text-sm font-semibold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Your Birthday Wish Is Sent To Heaven!</span>
                </div>
                <p className="text-xs text-pink-200 leading-relaxed">
                  May Allah answer every prayer in your heart and bless every second of your new year with boundless happiness, health, and peace. Ameen! ❤️
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Special Surprise Message Modal (Dramatic but Tasteful Animation) */}
      {showSurpriseModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-special-wish"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in"
          onClick={() => setShowSurpriseModal(false)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl glass-panel-gold border border-amber-400/40 p-6 sm:p-8 shadow-[0_0_60px_rgba(247,208,112,0.3)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSurpriseModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-lg">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div>
                <span className="font-script text-2xl text-amber-300 block">
                  To My Beloved Queen
                </span>
                <h3 id="modal-special-wish" className="font-serif text-xl text-white font-bold">
                  Johnny's Sacred Birthday Du'a
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-slate-200 text-sm leading-relaxed font-light p-4 rounded-2xl bg-black/40 border border-amber-400/20">
              <p className="font-editorial text-lg text-amber-100 italic">
                "Sana, you are the most precious gift Allah ever blessed this world with."
              </p>
              <p>
                From the day you came into my life, you brought a warmth that no ocean or distance could ever cool down. On your birthday, my soul prays for you: may your eyes always shine with laughter, may your heart know only tranquility, and may Allah grant you everything you dream of.
              </p>
              <p className="text-pink-300 font-medium">
                You are loved beyond words, beyond miles, and beyond time itself.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSurpriseModal(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-semibold shadow-lg min-h-[44px]"
              >
                Cherished Forever ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
