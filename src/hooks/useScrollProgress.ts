import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroRatio, setHeroRatio] = useState(0);
  const [heroPhase, setHeroPhase] = useState(0);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [heroCanvasOpacity, setHeroCanvasOpacity] = useState(1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? Math.min(Math.max(currentY / totalHeight, 0), 1) : 0;

          setScrollY(currentY);
          setScrollProgress(progress);

          // Storytelling hero section calculation:
          const heroContainer = document.getElementById('hero-storytelling');
          if (heroContainer) {
            const rect = heroContainer.getBoundingClientRect();
            const containerTop = -rect.top;
            const containerScrollable = rect.height - window.innerHeight;

            // Ratio within hero container (0.0 to 1.0)
            if (containerTop >= 0 && containerScrollable > 0) {
              const ratio = Math.min(Math.max(containerTop / containerScrollable, 0), 1);
              setHeroRatio(ratio);
              
              // 3 discrete phases with smooth boundaries:
              // Phase 0: 0.0 - 0.38
              // Phase 1: 0.38 - 0.72
              // Phase 2: 0.72 - 1.0
              if (ratio < 0.38) {
                setHeroPhase(0);
              } else if (ratio < 0.72) {
                setHeroPhase(1);
              } else {
                setHeroPhase(2);
              }
            } else if (containerTop < 0) {
              setHeroRatio(0);
              setHeroPhase(0);
            } else {
              setHeroRatio(1);
              setHeroPhase(2);
            }

            // Hero Canvas Visibility:
            // The canvas should only be visible on the landing page (hero).
            // As the user scrolls past the end of the hero container, smoothly fade to 0.
            const fadeThreshold = window.innerHeight * 0.8;
            if (rect.bottom > 0) {
              setIsHeroVisible(true);
              if (rect.bottom < fadeThreshold) {
                // Fade out smoothly as hero bottom exits screen
                const opacity = Math.max(rect.bottom / fadeThreshold, 0);
                setHeroCanvasOpacity(opacity);
              } else {
                setHeroCanvasOpacity(1);
              }
            } else {
              setIsHeroVisible(false);
              setHeroCanvasOpacity(0);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollProgress, heroRatio, heroPhase, isHeroVisible, heroCanvasOpacity };
}
