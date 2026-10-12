/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FloatingPetalsCanvas } from './components/FloatingPetalsCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { RomanticHeader } from './components/RomanticHeader';
import { HeroGate } from './components/HeroGate';
import { BirthdayReveal } from './components/BirthdayReveal';
import { LoveLetter } from './components/LoveLetter';
import { LongDistanceSection } from './components/LongDistanceSection';
import { MemoriesGallery } from './components/MemoriesGallery';
import { FinalSurpriseModal } from './components/FinalSurpriseModal';
import { ReplayControl } from './components/ReplayControl';
import { CinematicScene } from './components/CinematicScene';
import { getAssetUrl } from './utils/assetUrl';

export default function App() {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [activeScene, setActiveScene] = useState<string>('scene-01');

  // Photos state loaded from localStorage for instant customization
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('sana_birthday_photos');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      'wa-0054': getAssetUrl('images/IMG-20261011-WA0054.jpg'),
      'wa-0050': getAssetUrl('images/IMG-20261011-WA0050.jpg'),
      'wa-0049': getAssetUrl('images/IMG-20261011-WA0049.jpg'),
    };
  });

  // Track active scene based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sceneIds = [
        'scene-01',
        'scene-02',
        'scene-03',
        'scene-04',
        'scene-05',
        'scene-06',
      ];
      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      for (let i = sceneIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sceneIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveScene(sceneIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdatePhoto = (key: string, url: string) => {
    setCustomPhotos((prev) => {
      const updated = { ...prev, [key]: url };
      try {
        localStorage.setItem('sana_birthday_photos', JSON.stringify(updated));
      } catch (err) {
        console.warn('Storage limit reached, retaining in memory', err);
      }
      return updated;
    });
  };

  const handleResetPhotos = () => {
    try {
      localStorage.removeItem('sana_birthday_photos');
    } catch {
      // ignore
    }
    setCustomPhotos({
      'wa-0054': getAssetUrl('images/IMG-20261011-WA0054.jpg'),
      'wa-0050': getAssetUrl('images/IMG-20261011-WA0050.jpg'),
      'wa-0049': getAssetUrl('images/IMG-20261011-WA0049.jpg'),
    });
  };

  const handleOpenSurprise = () => {
    setIsRevealed(true);
    setTimeout(() => {
      const element = document.getElementById('scene-02');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  const handleReplay = () => {
    setIsRevealed(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleWishHeaderClick = () => {
    const element = document.getElementById('scene-02');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToScene = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sceneChapters = [
    { id: 'scene-01', label: '01', title: 'The Prologue' },
    { id: 'scene-02', label: '02', title: 'The Celebration' },
    { id: 'scene-03', label: '03', title: 'Letter & Du\'as' },
    { id: 'scene-04', label: '04', title: '7,500 km Light Trail' },
    { id: 'scene-05', label: '05', title: 'Memories of Sana' },
    { id: 'scene-06', label: '06', title: 'The Sacred Vow' },
  ];

  return (
    <div className="relative min-h-screen bg-[#08040a] text-slate-100 overflow-x-hidden selection:bg-pink-600 selection:text-white">
      {/* Rose Petals & Golden Stardust Particle Engine */}
      <FloatingPetalsCanvas />

      {/* Background Ambient Glow Gradients */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-45"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(255, 45, 117, 0.16) 0%, transparent 60%), radial-gradient(circle at 85% 55%, rgba(147, 51, 234, 0.13) 0%, transparent 50%), radial-gradient(circle at 15% 80%, rgba(247, 208, 112, 0.12) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      {/* Romantic Top Navigation Bar */}
      <RomanticHeader onWishClick={handleWishHeaderClick} />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Movie Scene Navigator (Quiet right rail on desktop) */}
      <nav
        aria-label="Movie Scene Navigator"
        className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3 pointer-events-auto"
      >
        <div className="p-2 rounded-full glass-panel border border-pink-500/20 flex flex-col items-center gap-2.5 shadow-xl">
          {sceneChapters.map((ch) => {
            const isActive = activeScene === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => scrollToScene(ch.id)}
                className={`group relative flex items-center justify-center transition-all ${
                  isActive
                    ? 'w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 text-slate-950 font-bold text-[10px] shadow-lg shadow-pink-500/40'
                    : 'w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-pink-400 hover:scale-150'
                }`}
                title={ch.title}
                aria-label={`Jump to ${ch.title}`}
              >
                {isActive && ch.label}
                {/* Tooltip on hover */}
                <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-black/85 text-[11px] text-pink-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-pink-500/30 font-medium">
                  Scene {ch.label}: {ch.title}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Experience Container */}
      <main className="relative z-20">
        {/* Scene 1: Opening Gate */}
        <CinematicScene
          id="scene-01"
          sceneNumber="ACT I"
          sceneTitle="A SURPRISE FROM JOHNNY ABDULLAH"
        >
          <HeroGate
            isRevealed={isRevealed}
            onOpenSurprise={handleOpenSurprise}
          />
        </CinematicScene>

        {/* Scene 2: Birthday Reveal */}
        <CinematicScene
          id="scene-02"
          sceneNumber="ACT II"
          sceneTitle="THE QUEEN'S CELEBRATION"
        >
          <BirthdayReveal
            portraitSrc={customPhotos['wa-0054'] || getAssetUrl('images/IMG-20261011-WA0054.jpg')}
          />
        </CinematicScene>

        {/* Scene 3: Love Letter */}
        <CinematicScene
          id="scene-03"
          sceneNumber="ACT III"
          sceneTitle="CONFESSION & SACRED DU'AS"
        >
          <LoveLetter />
        </CinematicScene>

        {/* Scene 4: Long-Distance Love */}
        <CinematicScene
          id="scene-04"
          sceneNumber="ACT IV"
          sceneTitle="OCEANS, STARS & 7,500 KM"
        >
          <LongDistanceSection />
        </CinematicScene>

        {/* Scene 5: Memories Gallery */}
        <CinematicScene
          id="scene-05"
          sceneNumber="ACT V"
          sceneTitle="PRESERVED FOR ETERNITY"
        >
          <MemoriesGallery
            customPhotos={customPhotos}
            onUpdatePhoto={handleUpdatePhoto}
          />
        </CinematicScene>

        {/* Scene 6: Final Surprise */}
        <CinematicScene
          id="scene-06"
          sceneNumber="ACT VI"
          sceneTitle="THE SACRED VOW"
        >
          <FinalSurpriseModal />
        </CinematicScene>
      </main>

      {/* Section 7: Replay Surprise Control & Footer */}
      <ReplayControl onReplay={handleReplay} />
    </div>
  );
}
