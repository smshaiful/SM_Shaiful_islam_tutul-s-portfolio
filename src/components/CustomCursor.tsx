import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop/fine-pointer devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPos({ x: e.clientX, y: e.clientY });

      // Check if target or parent is clickable
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer');
        setIsHovered(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp for trailing ring
    let frameId: number;
    const animateTrail = () => {
      setTrailPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      frameId = requestAnimationFrame(animateTrail);
    };
    frameId = requestAnimationFrame(animateTrail);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [pos.x, pos.y]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
      {/* Outer Magnetic Ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 transition-[width,height,background-color] duration-300 ease-out backdrop-blur-[1px] ${
          isHovered
            ? 'w-14 h-14 bg-primary/20 scale-110'
            : 'w-8 h-8 bg-transparent'
        }`}
        style={{
          left: `${trailPos.x}px`,
          top: `${trailPos.y}px`,
        }}
      />

      {/* Center Core Dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-sm shadow-primary/80"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      />
    </div>
  );
};
