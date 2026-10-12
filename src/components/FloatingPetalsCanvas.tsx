import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

interface GlowingHeart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
}

export const FloatingPetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const petalCount = prefersReducedMotion ? 8 : Math.min(28, Math.floor(width / 40));
    const heartCount = prefersReducedMotion ? 4 : 10;
    const starCount = prefersReducedMotion ? 15 : 45;

    const petalColors = [
      'rgba(255, 45, 117, 0.75)',   // Neon Pink
      'rgba(244, 63, 94, 0.7)',     // Rose Red
      'rgba(225, 29, 72, 0.75)',    // Crimson
      'rgba(251, 113, 133, 0.65)',  // Soft Blush
      'rgba(217, 70, 239, 0.6)',    // Romantic Purple
    ];

    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 1.1 + 0.5,
      speedX: (Math.random() - 0.5) * 0.7,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.4,
      opacity: Math.random() * 0.45 + 0.45,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    const glowingHearts: GlowingHeart[] = Array.from({ length: heartCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height + height,
      size: Math.random() * 8 + 6,
      speedY: -(Math.random() * 0.7 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random(),
      twinkleSpeed: Math.random() * 0.03 + 0.01,
    }));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      // Teardrop petal curve
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 3, 0, p.size);
      ctx.bezierCurveTo(-p.size, p.size / 3, -p.size / 2, -p.size / 2, 0, 0);
      ctx.fill();

      // Subtle gold vein shine
      ctx.strokeStyle = 'rgba(247, 208, 112, 0.3)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.lineTo(0, p.size * 0.75);
      ctx.stroke();

      ctx.restore();
    };

    const drawHeart = (h: GlowingHeart) => {
      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.globalAlpha = h.opacity;
      ctx.fillStyle = 'rgba(255, 45, 117, 0.75)';
      ctx.shadowColor = '#ff2d75';
      ctx.shadowBlur = 10;

      const s = h.size / 10;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-5 * s, -5 * s, -10 * s, 2 * s, 0, 10 * s);
      ctx.bezierCurveTo(10 * s, 2 * s, 5 * s, -5 * s, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      stars.forEach((s) => {
        s.alpha += s.twinkleSpeed;
        const currentAlpha = (Math.sin(s.alpha) + 1) / 2 * 0.8 + 0.1;
        ctx.fillStyle = `rgba(255, 230, 180, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render floating hearts drifting gently up
      glowingHearts.forEach((h) => {
        h.wobble += h.wobbleSpeed;
        h.x += h.speedX + Math.sin(h.wobble) * 0.4;
        h.y += h.speedY;

        if (h.y < -20) {
          h.y = height + 20;
          h.x = Math.random() * width;
        }
        if (h.x > width + 20) h.x = -20;
        if (h.x < -20) h.x = width + 20;

        drawHeart(h);
      });

      // Render petals drifting down
      petals.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.6;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
