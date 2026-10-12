import React, { useState } from 'react';
import { Heart, Copy, Check, Sparkles, Feather, Flower2, Send, Bookmark, Eye } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import confetti from 'canvas-confetti';

interface LetterData {
  id: string;
  volume: string;
  title: string;
  subtitle: string;
  date: string;
  text: string;
  duas?: string[];
  signature: string;
}

export const LoveLetter: React.FC = () => {
  const [activeLetterId, setActiveLetterId] = useState<string>('letter-1');
  const [copied, setCopied] = useState<boolean>(false);
  const [bloomingFlower, setBloomingFlower] = useState<boolean>(false);
  const [showSecretNote, setShowSecretNote] = useState<boolean>(false);

  const letters: LetterData[] = [
    {
      id: 'letter-1',
      volume: 'Letter I',
      title: 'My Sincere Apology & Humble Heart',
      subtitle: 'To the Queen who deserves every moment celebrated',
      date: 'Special Birthday Dedication',
      text: `My Dearest Sana,

Before anything else, I stand before you with an open, humbled, and vulnerable heart. I am deeply and truly sorry for forgetting your birthday. Knowing that I caused you even a fleeting moment of sadness, or made you feel for a second that you weren't the center of my thoughts, breaks my heart into a thousand pieces.

You deserve to be celebrated not just on this one calendar day, but with every breath, every sunrise, and every heartbeat. My forgetfulness was a foolish failure of my human mind, but my soul has never spent a single second without cherishing you. You are the grace in my prayers, and I will spend every tomorrow making this up to you with loyalty, care, and flowers. Please forgive your Johnny, my queen.`,
      signature: 'Yours always with true remorse & endless love, Johnny ❤️',
    },
    {
      id: 'letter-2',
      volume: 'Letter II',
      title: 'Why You Are My Entire Universe',
      subtitle: 'The light that transformed my days',
      date: 'Written From Freetown',
      text: `My Sweetest Sana,

Do you know what happens to my world when you smile? Every heavy thought disappears. When I look at your photographs—your gentle eyes full of modesty, the shy curve of your lips, the henna painted gracefully on your hands—I thank the Creator for guiding you into my destiny.

You are not just someone I love; you are my peace (Sakina). In a noisy world, your gentle voice is my sanctuary. Your laughter is my melody. Even across thousands of kilometers, your presence is warmer and closer to me than anything around me. No matter what trials come our way, having you in my life makes me the richest man alive.`,
      signature: 'Forever captivated by you, Johnny ❤️',
    },
    {
      id: 'letter-3',
      volume: 'Letter III',
      title: 'Sacred Du\'as For Your New Year',
      subtitle: 'My hands raised in prayer to Allah (SWT) for Sana',
      date: 'Prayers of Barakah & Light',
      text: `My Precious Sana,

Today, my most sacred gift to you is not wrapped in paper, but whispered into the heavens. My hands are raised in sincere prayer to Allah (Subhanahu wa Ta'ala):`,
      duas: [
        'May Allah shower your life with unending happiness and fill every morning with radiant joy.',
        'May Allah grant you vibrant health, physical strength, and complete protection from the evil eye, sadness, and anxiety.',
        'May Allah place deep, unshakable tranquility (Sakina) in your heart that keeps you peaceful through every storm.',
        'May Allah bless your studies, your career, your ambitions, and grant you highest barakah in Dunya and Jannat al-Firdaus in the Akhirah.',
        'May Allah unite our souls with His mercy, bless our union, and keep our love pure and eternal.',
      ],
      signature: 'Praying for you before I pray for myself, Johnny ❤️',
    },
    {
      id: 'letter-4',
      volume: 'Letter IV',
      title: 'Bridging Sierra Leone & Pakistan',
      subtitle: 'The 7,500 kilometer promise of devotion',
      date: 'Our Unbreakable Bond',
      text: `My Beloved Sana,

They say long distance is hard, and yes, missing you aches in my chest every single day. But our love is proof that souls have no borders. Between Freetown, Sierra Leone and Pakistan, there are oceans and time zones, yet there is zero distance between our hearts.

I promise you: every kilometer will be bridged. Every lonely night of waiting will be rewarded when I can finally look into your eyes in person, hand you roses, and remind you face to face that you are my queen. Hold my love close to your heart today. It belongs to nobody else, now and for all eternity.`,
      signature: 'Across continents, forever yours, Johnny ❤️',
    },
  ];

  const currentLetter = letters.find((l) => l.id === activeLetterId) || letters[0];

  const handleCopy = () => {
    const fullContent = `${currentLetter.title}\n\n${currentLetter.text}\n\n${
      currentLetter.duas ? currentLetter.duas.join('\n') + '\n\n' : ''
    }${currentLetter.signature}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    romanticAudio.playHeartChime();
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#f7d070', '#ff2d75'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBloomFlower = () => {
    setBloomingFlower(true);
    romanticAudio.playCandleBlowChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#e11d48', '#f43f5e', '#fda4af', '#f7d070'],
    });
    setTimeout(() => setBloomingFlower(false), 2500);
  };

  const handleReleaseHearts = () => {
    romanticAudio.playHeartChime();
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#ff2d75', '#f43f5e', '#fb7185', '#ffffff'],
    });
  };

  return (
    <section id="love-letter" className="relative py-24 px-4 z-20 max-w-5xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[450px] bg-gradient-to-b from-pink-600/10 via-purple-700/15 to-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-gold border border-amber-400/30 text-amber-300 text-xs font-medium tracking-wide mb-3">
          <Feather className="w-3.5 h-3.5 text-amber-300" />
          <span>The Love Letters of Johnny & Sana</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-rose-300">
          Four Letters For My Queen
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-pink-400 mt-2">
          Every word written with sincere devotion and honest tears ❤️
        </p>
      </div>

      {/* Letter Selector Tabs (Interactive Buttons) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {letters.map((letter) => {
          const isActive = letter.id === activeLetterId;
          return (
            <button
              key={letter.id}
              onClick={() => {
                setActiveLetterId(letter.id);
                romanticAudio.playHeartChime();
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium transition-all min-h-[44px] flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-600/30 scale-105 border border-pink-300/40'
                  : 'bg-black/50 text-slate-300 hover:text-white hover:bg-black/80 border border-pink-500/20'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-pink-400'}`} />
              <span>{letter.volume}: {letter.title.split(' ')[0]} {letter.title.split(' ')[1] || ''}</span>
            </button>
          );
        })}
      </div>

      {/* The Active Letter Presentation */}
      <div className="relative p-6 sm:p-10 md:p-12 rounded-3xl glass-panel border border-pink-500/30 shadow-[0_15px_60px_rgba(255,45,117,0.2)] backdrop-blur-2xl">
        {/* Top gold seal bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-pink-500/20 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/25 border border-amber-200/50 shrink-0">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-semibold block">
                {currentLetter.volume} • {currentLetter.date}
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl text-amber-200 font-semibold tracking-wide">
                {currentLetter.title}
              </h3>
              <p className="text-xs text-pink-300/80 font-light mt-0.5">
                {currentLetter.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-pink-950/40 hover:bg-pink-900/50 border border-pink-500/20 text-pink-200 text-xs transition-colors min-h-[44px] min-w-[44px] justify-center"
              title="Copy current letter"
              aria-label="Copy letter text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Saved to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-pink-300" />
                  <span>Save Letter</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Letter Body */}
        <div className="space-y-6 text-slate-200 text-sm sm:text-base leading-relaxed font-light">
          {currentLetter.text.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? 'font-editorial text-lg sm:text-xl text-amber-100 italic' : ''}>
              {paragraph}
            </p>
          ))}

          {/* Du'as list if present in this letter */}
          {currentLetter.duas && (
            <div className="p-5 sm:p-6 rounded-2xl glass-panel-gold border border-amber-400/30 my-4 shadow-inner">
              <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold mb-3">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="tracking-wide">Johnny's 5 Du'as to Allah (SWT) For Sana</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                {currentLetter.duas.map((dua, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{dua}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Letter Sign-off */}
        <div className="mt-8 pt-6 border-t border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-amber-200">
              {currentLetter.signature}
            </span>
          </div>

          {/* Interactive Love Surprise Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleBloomFlower}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md min-h-[44px] ${
                bloomingFlower
                  ? 'bg-rose-500 text-white scale-110 shadow-rose-500/50'
                  : 'bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 text-rose-200'
              }`}
              title="Bloom a virtual rose for Sana"
            >
              <Flower2 className={`w-3.5 h-3.5 text-rose-400 ${bloomingFlower ? 'animate-spin' : ''}`} />
              <span>{bloomingFlower ? '🌹 Rose Bloomed!' : 'Bloom Rose 🌹'}</span>
            </button>

            <button
              onClick={handleReleaseHearts}
              className="px-4 py-2 rounded-full bg-pink-950/50 hover:bg-pink-900/60 border border-pink-500/30 text-pink-200 text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[44px]"
              title="Release a shower of hearts"
            >
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-pulse" />
              <span>Release Hearts 💕</span>
            </button>

            <button
              onClick={() => setShowSecretNote(!showSecretNote)}
              className="px-4 py-2 rounded-full bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all min-h-[44px]"
              title="Reveal Johnny's secret whisper"
            >
              <Eye className="w-3.5 h-3.5 text-amber-300" />
              <span>Secret Whisper 💌</span>
            </button>
          </div>
        </div>

        {/* Secret Note Card Reveal */}
        {showSecretNote && (
          <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-purple-950/50 to-pink-950/60 border border-amber-400/40 animate-fade-in shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-wider font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Johnny's Secret Whisper Just For Sana</span>
            </div>
            <p className="font-editorial text-lg text-amber-100 italic leading-snug">
              “Sana, even on days when I am quiet, my thoughts are filled with you. You are the only person who holds the keys to my heart, and nothing in this world will ever change that.”
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
