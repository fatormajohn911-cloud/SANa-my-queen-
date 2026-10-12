import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Maximize2, X, Video, Play, Pause, Volume2, VolumeX, Upload } from 'lucide-react';
import { romanticAudio } from '../utils/romanticAudio';
import confetti from 'canvas-confetti';

export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  tag: string;
  description: string;
  likes: number;
}

interface MemoriesGalleryProps {
  customPhotos: Record<string, string>;
  onUpdatePhoto: (key: string, url: string) => void;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ customPhotos, onUpdatePhoto }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  const [likesMap, setLikesMap] = useState<Record<string, number>>({
    'wa-0054': 142,
    'wa-0050': 256,
    'wa-0049': 189,
    'video-clip': 320,
  });

  const memories: MemoryItem[] = [
    {
      id: 'wa-0054',
      title: "Sana's Radiant Smile",
      subtitle: 'Her Natural Warmth & Light',
      imageSrc: customPhotos['wa-0054'] || './images/IMG-20261011-WA0054.jpg',
      tag: 'Cherished Portrait',
      description:
        'The moment I see your smile, every worry in my world melts away. Your natural beauty, your warmth, and the gentle joy in your eyes are my greatest peace.',
      likes: likesMap['wa-0054'] || 142,
    },
    {
      id: 'wa-0050',
      title: "The Eyes That Hold My World",
      subtitle: 'Pure Modesty & Divine Noor',
      imageSrc: customPhotos['wa-0050'] || './images/IMG-20261011-WA0050.jpg',
      tag: 'Sacred Noor',
      description:
        'Your eyes carry a depth that reaches straight to my soul. In your modesty and grace, you are more magnificent than all the stars in the night sky.',
      likes: likesMap['wa-0050'] || 256,
    },
    {
      id: 'wa-0049',
      title: 'Grace & Mehndi Dreams',
      subtitle: 'Elegance In Every Detail',
      imageSrc: customPhotos['wa-0049'] || './images/IMG-20261011-WA0049.jpg',
      tag: 'Elegance & Faith',
      description:
        'From the henna designs on your delicate hands to the gentle way you carry yourself with poise and sweetness, you are my dream come true.',
      likes: likesMap['wa-0049'] || 189,
    },
  ];

  const handleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    romanticAudio.playHeartChime();

    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.7 },
      colors: ['#ff2d75', '#f7d070', '#e11d48'],
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setShowVideoModal(true);
    }
  };

  return (
    <section id="memories-gallery" className="relative py-24 px-4 z-20 max-w-6xl mx-auto">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-r from-pink-600/10 via-purple-600/15 to-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-pink-500/20 text-pink-300 text-xs font-medium tracking-wide mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Precious Moments of My Queen</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-amber-200">
          Memories Gallery
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-pink-300 mt-2">
          Every photo of you is a treasure preserved in my soul
        </p>
        <p className="text-xs text-slate-400 mt-2 max-w-lg mx-auto font-light">
          Preserving Sana's real face, natural skin tone, and gentle spirit forever. Tap any photo to enlarge or send love.
        </p>
      </div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {memories.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedMemory(item)}
            className="group relative rounded-3xl glass-panel border border-pink-500/20 hover:border-pink-500/50 p-3.5 sm:p-4 shadow-xl hover:shadow-[0_0_35px_rgba(255,45,117,0.3)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Frame */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/60 border border-amber-400/25 mb-4">
              <img
                src={item.imageSrc}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('WA0054')) {
                    target.src = './images/IMG-20261011-WA0054.jpg';
                  }
                }}
              />

              {/* Tag pill */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-pink-500/30 text-[10px] uppercase tracking-wider text-pink-200 font-medium">
                {item.tag}
              </div>

              {/* Expand Hint */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <span className="font-editorial text-lg text-amber-200 font-semibold block">
                  {item.title}
                </span>
                <span className="text-[11px] text-pink-200/80 block mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>

            {/* Bottom Details & Interaction */}
            <div className="px-1 flex items-center justify-between mt-auto pt-2 border-t border-pink-500/10">
              <p className="text-xs text-slate-300 line-clamp-2 pr-2 font-light">
                {item.description}
              </p>

              <button
                onClick={(e) => handleLike(item.id, e)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-950/40 hover:bg-pink-900/50 border border-pink-500/30 text-pink-200 text-xs transition-colors shrink-0 min-h-[44px] min-w-[44px] justify-center"
                title="Send love to Sana"
                aria-label={`Send love for ${item.title}`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono tabular-nums text-[11px]">
                  {likesMap[item.id] || item.likes}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Memory Spotlight Card with Muted Playback Support */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl glass-panel border border-pink-500/30 shadow-2xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-pink-500/30 border border-amber-300/40 group-hover:scale-105 transition-transform">
          <Video className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            Special Clip
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
            A Glimpse of Sana in Her Green Dress
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-light">
            Remembering your mirror selfie in your emerald-green outfit, your henna-painted hands, and the shy radiance that makes Johnny fall in love with you all over again.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 justify-center">
          <button
            onClick={() => setShowVideoModal(true)}
            className="px-5 py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-500/25 active:scale-95 transition-all min-h-[44px]"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Play Clip Showcase</span>
          </button>

          <button
            onClick={(e) => handleLike('video-clip', e)}
            className="px-4 py-3 rounded-full bg-black/40 hover:bg-black/60 border border-pink-500/30 text-pink-200 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors min-h-[44px]"
            title="Love this clip"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span className="font-mono">{likesMap['video-clip'] || 320}</span>
          </button>
        </div>
      </div>

      {/* Video Modal with Optional MP4 Player & Fallback */}
      {showVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-video-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fade-in"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl glass-panel border border-pink-500/40 p-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Video className="w-4 h-4 text-pink-400" />
              <h3 id="modal-video-title" className="font-serif text-lg text-white font-semibold">
                Sana's Emerald Dress Moment
              </h3>
            </div>

            {/* Video container */}
            <div className="relative aspect-[9/16] max-h-[60vh] mx-auto rounded-2xl overflow-hidden bg-black/90 border border-amber-300/30 flex items-center justify-center shadow-2xl">
              {customVideoUrl ? (
                <video
                  ref={videoPlayerRef}
                  src={customVideoUrl}
                  playsInline
                  autoPlay
                  loop
                  muted={isVideoMuted}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="relative w-full h-full rounded-xl overflow-hidden mb-3">
                    <img
                      src={customPhotos['wa-0049'] || './images/IMG-20261011-WA0049.jpg'}
                      alt="Sana Video Poster"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col items-center justify-end p-4">
                      <span className="font-script text-2xl text-amber-200">
                        My Beautiful Queen Sana
                      </span>
                      <p className="text-[11px] text-pink-200 mt-1">
                        In emerald green with mehndi on her hands
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
              <button
                onClick={() => videoInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-pink-950/60 hover:bg-pink-900/60 border border-pink-500/30 text-pink-200 flex items-center gap-1.5 min-h-[36px]"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Original Video File (MP4)</span>
              </button>
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />

              {customVideoUrl && (
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="px-3 py-1.5 rounded-lg bg-black/60 text-pink-200 flex items-center gap-1"
                >
                  {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isVideoMuted ? 'Unmute' : 'Muted'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-memory-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl glass-panel border border-pink-500/40 p-4 sm:p-6 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
              title="Close full-screen view"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black/80 border border-amber-400/30 mb-4 shadow-inner">
              <img
                src={selectedMemory.imageSrc}
                alt={selectedMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 id="modal-memory-title" className="font-editorial text-2xl text-amber-200 font-bold">
                    {selectedMemory.title}
                  </h3>
                  <span className="text-xs text-pink-300 font-light">
                    {selectedMemory.subtitle}
                  </span>
                </div>

                <button
                  onClick={() => handleLike(selectedMemory.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold shadow-lg shadow-pink-600/30 transition-all min-h-[44px]"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span className="font-mono">{likesMap[selectedMemory.id] || selectedMemory.likes} Loves</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light pt-2 border-t border-pink-500/20">
                {selectedMemory.description}
              </p>

              <div className="pt-2 text-[11px] text-pink-300/70 italic text-right">
                Dedicated with love by Johnny ❤️
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
