import React from 'react';

interface CinematicSceneProps {
  id: string;
  sceneNumber?: string;
  sceneTitle?: string;
  className?: string;
  children: React.ReactNode;
}

export const CinematicScene: React.FC<CinematicSceneProps> = ({
  id,
  sceneNumber,
  sceneTitle,
  className = '',
  children,
}) => {
  return (
    <section
      id={id}
      className={`relative transition-opacity duration-500 ease-out ${className}`}
    >
      {/* Chapter header */}
      {(sceneNumber || sceneTitle) && (
        <div className="flex items-center justify-center gap-3 mb-6 select-none pointer-events-none opacity-80" aria-hidden="true">
          <span className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent to-pink-500/50" />
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-mono text-pink-300/80 font-semibold">
            {sceneNumber} {sceneTitle ? `• ${sceneTitle}` : ''}
          </span>
          <span className="h-px w-8 sm:w-16 bg-gradient-to-l from-transparent to-pink-500/50" />
        </div>
      )}

      {children}
    </section>
  );
};
