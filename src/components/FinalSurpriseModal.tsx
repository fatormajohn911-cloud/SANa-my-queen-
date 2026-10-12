import React, { useState } from 'react';
import { Heart, Sparkles, Gift, CheckCircle2, ShieldCheck, Flower2, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/romanticAudio';

export const FinalSurpriseModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [flowering, setFlowering] = useState<boolean>(false);

  // Lock background scroll when surprise modal is open
  React.useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  const promises = [
    'I promise to love you unconditionally on easy days and twice as fiercely on difficult days.',
    'I promise to mention your name in my sincere du\'as before I even pray for myself.',
    'I promise to protect your gentle heart and never let you question how deeply you are cherished.',
    'I promise to make you laugh and smile whenever the weight of the world feels heavy.',
    'I promise to bridge every single kilometer between Sierra Leone and Pakistan until we are together.',
    'I promise to celebrate you not just on your birthday, but with every breath Allah grants me.',
  ];

  const handleOpenSurprise = () => {
    setIsOpen(true);
    romanticAudio.playCandleBlowChime();

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#ff2d75', '#f7d070', '#e11d48', '#d946ef', '#38bdf8', '#ffffff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#f7d070', '#fb7185', '#ec4899'],
      });
    }, 380);
  };

  const handleAnimateFlowers = () => {
    setFlowering(true);
    romanticAudio.playHeartChime();
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fda4af', '#fb7185', '#e11d48', '#fef08a'],
    });
    setTimeout(() => setFlowering(false), 2000);
  };

  return (
    <section id="final-surprise" className="relative py-24 px-4 z-20 max-w-4xl mx-auto text-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-80 bg-gradient-to-r from-pink-600/20 via-amber-500/15 to-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative p-8 sm:p-12 rounded-3xl glass-panel border border-pink-500/30 shadow-[0_0_50px_rgba(255,45,117,0.25)] flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-xl shadow-pink-500/30 mb-6">
          <div className="w-full h-full rounded-full bg-[#08040a] flex items-center justify-center">
            <Gift className="w-8 h-8 text-amber-300 animate-bounce" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200 mb-3">
          The Final Birthday Surprise
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-pink-300 mb-6">
          One more secret from Johnny Abdullah's heart to yours ❤️
        </p>
        <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8 font-light leading-relaxed">
          Before this day ends, there is one last vow I need to leave engraved upon your heart forever.
        </p>

        {/* Working Interactive Button */}
        <button
          onClick={handleOpenSurprise}
          className="group relative px-8 sm:px-10 py-4.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-semibold text-base sm:text-lg shadow-[0_0_35px_rgba(255,45,117,0.6)] hover:shadow-[0_0_55px_rgba(255,45,117,0.9)] active:scale-95 transition-all duration-300 cursor-pointer min-h-[48px] flex items-center gap-3"
        >
          <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform" />
          <span>Reveal Johnny Abdullah's Final Surprise 💝</span>
          <Heart className="w-5 h-5 fill-white text-white animate-heartbeat" />
        </button>
      </div>

      {/* Final Surprise Reveal Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-final-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl glass-panel border border-pink-500/40 p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              title="Close modal"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Glowing Beating Heart Animation */}
            <div className="flex flex-col items-center text-center my-4">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-600 to-rose-600 flex items-center justify-center shadow-[0_0_50px_rgba(255,45,117,0.9)] animate-heartbeat">
                  <Heart className="w-14 h-14 text-white fill-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-25" />
              </div>

              <span className="font-script text-3xl sm:text-4xl text-amber-200">
                You Are My Forever
              </span>
              <h3 id="modal-final-title" className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                A Sacred Vow To Sana
              </h3>
            </div>

            {/* Final Romantic Message */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-pink-950/40 via-[#180a22]/60 to-purple-950/40 border border-pink-500/30 text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 my-6 shadow-inner">
              <p className="font-editorial text-xl text-amber-200 italic leading-snug">
                “Sana, the universe made only one of you, and my heart knows it has found its true home.”
              </p>
              <p>
                No matter how many seasons change, no matter how many miles lie between our shores, my devotion to you is carved in stone. You are the grace in my prayers, the calm in my storms, and the queen of my destiny.
              </p>
              <p>
                Thank you for being born. Thank you for your warmth, your pure heart, and your gentle soul.
              </p>
            </div>

            {/* Interactive Promises Accordion / List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-amber-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Johnny Abdullah's 6 Unbreakable Promises To Sana</span>
                </h4>
                <button
                  onClick={handleAnimateFlowers}
                  className="px-3 py-1 rounded-full bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Flower2 className={`w-3.5 h-3.5 text-rose-400 ${flowering ? 'animate-spin' : ''}`} />
                  <span>Shower Flowers 🌸</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {promises.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-pink-950/30 border border-pink-500/20 text-xs sm:text-sm text-pink-100 flex items-start gap-3 shadow-sm hover:border-pink-500/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4 border-t border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-script text-2xl text-pink-300">
                Forever & Always, Johnny Abdullah (Abdullah) ❤️
              </span>

              <button
                onClick={() => {
                  romanticAudio.playHeartChime();
                  confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
                  setIsOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs font-semibold shadow-lg shadow-pink-600/30 min-h-[44px]"
              >
                Seal With My Love ❤️
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
