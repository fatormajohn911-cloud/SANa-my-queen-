import React, { useState, useEffect } from 'react';
import { Heart, Globe2, Clock, Send, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import confetti from 'canvas-confetti';

export const LongDistanceSection: React.FC = () => {
  const [slTime, setSlTime] = useState<string>('');
  const [pkTime, setPkTime] = useState<string>('');
  const [signalsSent, setSignalsSent] = useState<number>(142);
  const [animatingSignal, setAnimatingSignal] = useState<boolean>(false);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      // Sierra Leone is GMT (UTC+0)
      setSlTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Africa/Freetown',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      // Pakistan is PKT (UTC+5)
      setPkTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSendSignal = () => {
    setAnimatingSignal(true);
    setSignalsSent((prev) => prev + 1);
    romanticAudio.playHeartChime();

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#00e676', '#ffffff', '#ff2d75', '#f7d070'],
    });

    setTimeout(() => setAnimatingSignal(false), 2000);
  };

  return (
    <section id="long-distance" className="relative py-24 px-4 z-20 max-w-5xl mx-auto text-center">
      {/* Background celestial glow & stars */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[550px] bg-gradient-to-r from-emerald-600/15 via-pink-600/20 to-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-pink-500/20 text-pink-300 text-xs font-medium tracking-wide mb-3">
          <Globe2 className="w-3.5 h-3.5 text-pink-400" />
          <span>Our Distance, Our Story</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-pink-200 to-amber-200">
          Sierra Leone 🇸🇱 ❤️ 🇵🇰 Pakistan
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-pink-300 mt-2">
          Two countries, thousands of miles, one eternal heartbeat
        </p>
      </div>

      {/* Prominent Emotional Vow requested in Brief 5 */}
      <div className="my-8 p-6 sm:p-8 rounded-3xl glass-panel-gold border border-amber-400/30 max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/10 via-pink-500/15 to-purple-500/10 blur-xl opacity-60 pointer-events-none" />
        <span className="font-script text-3xl sm:text-4xl md:text-5xl text-amber-200 block drop-shadow-[0_0_18px_rgba(247,208,112,0.6)] leading-snug">
          “Miles may separate us, but you will always have a special place in my heart.”
        </span>
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-pink-200/90 font-light">
          <span>A solemn promise from Johnny Abdullah in Sierra Leone to Sana in Pakistan</span>
        </div>
      </div>

      {/* Celestial Animated Trail of Light between the two hubs */}
      <div className="relative p-6 sm:p-10 rounded-3xl glass-panel border border-pink-500/20 shadow-2xl my-8 overflow-hidden">
        {/* Constellation background dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* The Animated Connecting Arc SVG */}
        <div className="relative w-full max-w-2xl mx-auto h-36 sm:h-44 flex items-center justify-center">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 600 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff2d75" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base curved path */}
            <path
              d="M 60 120 Q 300 10 540 120"
              stroke="rgba(244, 114, 182, 0.25)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            {/* Glowing animated light trail */}
            <path
              d="M 60 120 Q 300 10 540 120"
              stroke="url(#arcGradient)"
              strokeWidth="4"
              strokeDasharray="18 12"
              className="animate-light-dash"
              filter="url(#glowEffect)"
            />

            {/* Point 1: Sierra Leone */}
            <g transform="translate(60, 120)">
              <circle r="16" fill="rgba(16, 185, 129, 0.25)" className="animate-ping" />
              <circle r="10" fill="#10b981" />
              <circle r="4" fill="#ffffff" />
            </g>

            {/* Point 2: Pakistan */}
            <g transform="translate(540, 120)">
              <circle r="16" fill="rgba(255, 45, 117, 0.25)" className="animate-ping" />
              <circle r="10" fill="#ff2d75" />
              <circle r="4" fill="#ffffff" />
            </g>

            {/* Center Pulsing Love Beacon */}
            <g transform="translate(300, 65)">
              <circle r="18" fill="rgba(255, 45, 117, 0.3)" />
              <circle r="8" fill="#f7d070" />
            </g>
          </svg>

          {/* Labels for the points */}
          <div className="absolute bottom-1 left-2 sm:left-6 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">🇸🇱</span>
            <span className="text-[11px] font-semibold text-emerald-300 font-mono mt-1">
              Freetown
            </span>
          </div>

          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/70 border border-pink-500/40 text-[11px] text-pink-200">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span className="font-mono tabular-nums">~7,500 km Light Trail</span>
          </div>

          <div className="absolute bottom-1 right-2 sm:right-6 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">🇵🇰</span>
            <span className="text-[11px] font-semibold text-amber-300 font-mono mt-1">
              Pakistan
            </span>
          </div>
        </div>

        {/* Dual Live Clocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-pink-500/15">
          <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 text-left flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                Sierra Leone 🇸🇱
              </span>
              <span className="text-xs text-slate-300 font-light">
                Johnny Abdullah's Local Time (GMT)
              </span>
            </div>
            <div className="font-mono text-sm sm:text-base text-white font-medium bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-500/30">
              {slTime || 'Loading...'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-pink-500/20 text-left flex items-center justify-between">
            <div>
              <span className="text-xs text-pink-400 font-semibold uppercase tracking-wider block">
                Pakistan 🇵🇰
              </span>
              <span className="text-xs text-slate-300 font-light">
                Sana's Local Time (PKT)
              </span>
            </div>
            <div className="font-mono text-sm sm:text-base text-white font-medium bg-pink-950/40 px-3 py-1 rounded-lg border border-pink-500/30">
              {pkTime || 'Loading...'}
            </div>
          </div>
        </div>

        {/* Interactive Signal Action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleSendSignal}
            className={`px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 text-white font-medium text-sm flex items-center gap-2.5 shadow-lg shadow-pink-500/25 active:scale-95 transition-all min-h-[48px] ${
              animatingSignal ? 'scale-105 shadow-[0_0_35px_rgba(255,45,117,0.7)]' : ''
            }`}
          >
            <Send className="w-4 h-4 text-amber-200" />
            <span>Transmit Love Signal Along Light Trail</span>
            <Heart className="w-4 h-4 fill-white text-white animate-heartbeat" />
          </button>

          <span className="text-xs text-pink-300/80 font-mono tabular-nums">
            {signalsSent} signals received in Pakistan ❤️
          </span>
        </div>
      </div>
    </section>
  );
};
