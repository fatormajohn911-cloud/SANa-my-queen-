import React, { useState } from 'react';
import { getAssetUrl } from '../utils/assetUrl';

export interface CinematicFrameProps {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. 'aspect-[3/4]'
  objectFit?: 'cover' | 'contain';
  panVariant?: 1 | 2 | 3 | 'none';
  glowingBorder?: boolean;
  showFiligree?: boolean;
  showVignette?: boolean;
  showLensSweep?: boolean;
  className?: string;
  imgClassName?: string;
  fallbackSrc?: string;
  isHoverable?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const CinematicFrame: React.FC<CinematicFrameProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-[3/4]',
  objectFit = 'cover',
  panVariant = 1,
  glowingBorder = true,
  showFiligree = true,
  showVignette = true,
  showLensSweep = true,
  className = '',
  imgClassName = '',
  fallbackSrc = getAssetUrl('images/IMG-20261011-WA0054.jpg'),
  isHoverable = true,
  onClick,
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Sync if prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleImageError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  const getKenBurnsClass = () => {
    if (panVariant === 1) return 'animate-kenburns-1';
    if (panVariant === 2) return 'animate-kenburns-2';
    if (panVariant === 3) return 'animate-kenburns-3';
    return '';
  };

  return (
    <div
      onClick={onClick}
      className={`relative ${aspectRatio} w-full rounded-2xl overflow-hidden bg-black/90 ${
        glowingBorder ? 'border border-amber-400/35 animate-frame-glow' : 'border border-amber-400/20'
      } ${className}`}
    >
      {/* Background ambient shimmer while image loads */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-pink-950/40 via-purple-950/30 to-amber-950/40 transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'
        }`}
      />

      {/* Ken Burns Smooth Panning & Zooming Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={currentSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full ${
            objectFit === 'cover' ? 'object-cover object-top' : 'object-contain object-center'
          } ${getKenBurnsClass()} ${
            isHoverable ? 'group-hover:scale-108' : ''
          } transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 filter-none' : 'opacity-0 blur-sm'
          } ${imgClassName}`}
        />
      </div>

      {/* Soft Cinematic Optical Vignette */}
      {showVignette && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(circle at center, transparent 40%, rgba(8,4,10,0.68) 100%)',
          }}
        />
      )}

      {/* Subtle Anamorphic Lens Flare Beam */}
      {showLensSweep && (
        <div className="absolute top-1/2 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-300/40 to-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      )}

      {/* Gold Corner Filigree Accents (Curated Archival Framing) */}
      {showFiligree && (
        <>
          <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-300/85 pointer-events-none z-20 transition-all duration-500 group-hover:border-amber-200" />
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-300/85 pointer-events-none z-20 transition-all duration-500 group-hover:border-amber-200" />
          <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-300/85 pointer-events-none z-20 transition-all duration-500 group-hover:border-amber-200" />
          <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-300/85 pointer-events-none z-20 transition-all duration-500 group-hover:border-amber-200" />
        </>
      )}

      {/* Overlays / Slot content */}
      {children}
    </div>
  );
};
