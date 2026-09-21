import React from 'react';
import { HeroPhase } from '../types/resume';
import { ArrowDown, CornerDownRight } from 'lucide-react';

interface StorytellingHeroProps {
  phases: HeroPhase[];
  currentPhase: number;
  onPhaseSelect: (index: number) => void;
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export const StorytellingHero: React.FC<StorytellingHeroProps> = ({
  phases,
  currentPhase,
  onPhaseSelect,
  onPlayHover,
  onPlayClick,
}) => {
  const activePhases = phases.slice(0, 3);
  const safePhaseIndex = Math.min(Math.max(currentPhase, 0), activePhases.length - 1);
  const activePhase = activePhases[safePhaseIndex] || activePhases[0];

  const handlePhaseJump = (idx: number) => {
    onPlayClick?.();
    onPhaseSelect(idx);
    const heroEl = document.getElementById('hero-storytelling');
    if (heroEl) {
      const startY = heroEl.offsetTop;
      const totalScrollable = heroEl.offsetHeight - window.innerHeight;
      const targetY = startY + (idx / (activePhases.length - 1)) * totalScrollable;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const scrollToContent = () => {
    onPlayClick?.();
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero-storytelling" className="relative h-[260vh] w-full">
      {/* Sticky Fullscreen Story Screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 sm:px-16 pt-28 pb-10 select-none">
        {/* Top Status & Category Badge */}
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-primary/10 border border-primary/25 text-primary transition-all duration-500">
              [{activePhase.tag}]
            </span>
            <span className="hidden sm:inline font-mono text-xs text-foreground-muted uppercase tracking-wider transition-all duration-500">
              PHASE 0{safePhaseIndex + 1} // 03
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-foreground-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">LANDING FLUID VISUALIZER</span>
          </div>
        </div>

        {/* Center Main Storytelling Screen: 3 Smooth Overlaid Phases */}
        <div className="relative z-10 w-full max-w-5xl my-auto h-[380px] sm:h-[440px] md:h-[480px]">
          {activePhases.map((phase, idx) => {
            const isCurrent = safePhaseIndex === idx;
            const isPast = idx < safePhaseIndex;

            return (
              <div
                key={idx}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCurrent
                    ? 'opacity-100 translate-y-0 scale-100 blur-0 pointer-events-auto'
                    : isPast
                    ? 'opacity-0 -translate-y-10 scale-[0.98] blur-[4px] pointer-events-none'
                    : 'opacity-0 translate-y-10 scale-[0.98] blur-[4px] pointer-events-none'
                }`}
              >
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] sm:leading-[1] uppercase">
                  {phase.title}{' '}
                  {phase.italicWord && (
                    <span className="inline-flex items-baseline italic font-serif font-light text-primary hover:text-primary-active transition-colors lowercase tracking-normal">
                      <CornerDownRight className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 inline-block text-primary/80 mr-2 sm:mr-3 transform translate-y-2 stroke-[1.5]" />
                      {phase.italicWord}
                    </span>
                  )}{' '}
                  <span className="block mt-2 font-serif uppercase tracking-tight">
                    {phase.subtitle}
                  </span>
                </h1>

                {/* Descriptive Narrative & Action */}
                <div className="mt-8 sm:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <p className="max-w-md font-mono text-xs sm:text-sm uppercase tracking-wide text-foreground-muted leading-relaxed">
                    {phase.description}
                  </p>

                  {idx < 2 ? (
                    <button
                      onClick={() => handlePhaseJump(idx + 1)}
                      onMouseEnter={onPlayHover}
                      className="group flex items-center gap-2 text-xs font-mono tracking-widest text-primary hover:text-foreground transition-colors uppercase self-start md:self-auto"
                    >
                      <span>NEXT PHASE</span>
                      <span className="w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center transition-transform group-hover:translate-x-1">
                        ⟶
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={scrollToContent}
                      onMouseEnter={onPlayHover}
                      className="group flex items-center gap-2 text-xs font-mono tracking-widest text-primary hover:text-foreground transition-colors uppercase self-start md:self-auto"
                    >
                      <span>DISCOVER MY WORK</span>
                      <span className="w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center transition-transform group-hover:translate-y-1">
                        ↓
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: 3 Phase Indicator Pills & Scroll Prompt */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-border/40 pt-4 z-10">
          {/* Exactly 3 Phase Switcher Tabs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {activePhases.map((p, idx) => (
              <button
                key={p.tag}
                onClick={() => handlePhaseJump(idx)}
                onMouseEnter={onPlayHover}
                aria-label={`Jump to phase ${idx + 1}`}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs transition-all duration-300 ${
                  safePhaseIndex === idx
                    ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                    : 'bg-card/50 text-foreground-muted hover:text-foreground hover:bg-card border border-border/50'
                }`}
              >
                <span className="font-semibold">0{idx + 1}</span>
                <span className="hidden md:inline font-sans text-[11px] uppercase tracking-wider">
                  {p.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Scroll Down Action Prompt */}
          <button
            onClick={scrollToContent}
            onMouseEnter={onPlayHover}
            className="flex items-center gap-2 font-mono text-xs text-foreground-muted hover:text-foreground uppercase tracking-widest transition-colors group"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown className="w-3.5 h-3.5 text-primary group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
