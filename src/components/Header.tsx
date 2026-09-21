import React from 'react';
import { Settings, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  brandName: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenContact: () => void;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  brandName,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenContact,
  onPlayClick,
  onPlayHover,
}) => {
  const scrollTo = (id: string) => {
    onPlayClick?.();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 sm:px-12 py-5 transition-all duration-300 backdrop-blur-md bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onPlayClick?.();
          }}
          onMouseEnter={onPlayHover}
          className="group flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-primary/50 shadow-md shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:border-primary shrink-0 bg-muted/40">
            <img
              src="/tutul.jpg"
              alt={brandName}
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-background" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-wide text-lg font-medium uppercase group-hover:text-primary transition-colors">
              {brandName}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-muted -mt-1">
              Portfolio & Resume
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide">
          <button
            onClick={() => scrollTo('about')}
            onMouseEnter={onPlayHover}
            className="relative py-1 text-foreground/80 hover:text-foreground transition-colors group"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
          <button
            onClick={() => scrollTo('work')}
            onMouseEnter={onPlayHover}
            className="relative py-1 text-foreground/80 hover:text-foreground transition-colors group"
          >
            Work
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
          <button
            onClick={() => scrollTo('experience')}
            onMouseEnter={onPlayHover}
            className="relative py-1 text-foreground/80 hover:text-foreground transition-colors group"
          >
            Experience
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
          <button
            onClick={() => scrollTo('awards')}
            onMouseEnter={onPlayHover}
            className="relative py-1 text-foreground/80 hover:text-foreground transition-colors group"
          >
            Awards
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
          <button
            onClick={onOpenContact}
            onMouseEnter={onPlayHover}
            className="relative py-1 text-foreground/80 hover:text-foreground transition-colors group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
        </nav>

        {/* Actions (Settings, Sound, Let's talk) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Sound Visualizer button */}
          <button
            onClick={() => {
              onToggleSound();
              onPlayClick?.();
            }}
            onMouseEnter={onPlayHover}
            aria-label="Toggle Sound Effects"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/70 hover:border-primary/50 text-foreground-muted hover:text-foreground text-xs font-mono transition-all backdrop-blur-sm"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="hidden sm:inline flex items-center gap-0.5">
                  <span className="w-0.5 h-3 bg-primary animate-[bounce_0.6s_infinite]" />
                  <span className="w-0.5 h-4 bg-primary animate-[bounce_0.8s_infinite]" />
                  <span className="w-0.5 h-2 bg-primary animate-[bounce_0.5s_infinite]" />
                </span>
                <span className="hidden sm:inline text-[10px]">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden sm:inline text-[10px]">MUTED</span>
              </>
            )}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => {
              onOpenSettings();
              onPlayClick?.();
            }}
            onMouseEnter={onPlayHover}
            aria-label="Open Settings"
            className="p-2 rounded-full border border-border/70 hover:border-primary/50 text-foreground-muted hover:text-foreground transition-all backdrop-blur-sm"
          >
            <Settings className="w-4 h-4 transition-transform hover:rotate-90 duration-300" />
          </button>

          {/* Let's talk CTA with sliding text animation */}
          <button
            onClick={() => {
              onOpenContact();
              onPlayClick?.();
            }}
            onMouseEnter={onPlayHover}
            className="relative group overflow-hidden px-5 py-2 rounded-full bg-primary text-white font-sans text-xs sm:text-sm font-medium tracking-wide shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
          >
            <span className="relative z-10 flex items-center gap-1">
              <span>Let's talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-primary-active transition-transform duration-300 ease-out" />
          </button>
        </div>
      </div>
    </header>
  );
};
