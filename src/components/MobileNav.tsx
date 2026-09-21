import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface MobileNavProps {
  brandName: string;
  theme: Theme;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenContact: () => void;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  brandName,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenContact,
  onPlayClick,
  onPlayHover,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'hero-storytelling', num: '01' },
    { label: 'About & Philosophy', id: 'about', num: '02' },
    { label: 'Featured Work', id: 'work', num: '03' },
    { label: 'Career History', id: 'experience', num: '04' },
    { label: 'Accolades', id: 'awards', num: '05' },
  ];

  const handleNavigate = (id: string) => {
    onPlayClick?.();
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden">
      {/* Floating Bottom Dock Pill */}
      <nav aria-label="Mobile Dock Navigation" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm rounded-full p-2 bg-card/85 backdrop-blur-xl border border-border shadow-2xl flex items-center justify-between">
        {/* Burger Button */}
        <button
          onClick={() => {
            onPlayClick?.();
            setIsOpen(!isOpen);
          }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="p-3 rounded-full hover:bg-muted text-foreground transition-colors flex items-center justify-center"
        >
          {isOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Center Logo */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onPlayClick?.();
          }}
          className="flex items-center gap-2 font-serif text-xs uppercase tracking-wider font-semibold"
        >
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-primary/50 shrink-0 shadow-sm shadow-primary/20">
            <img src="/tutul.jpg" alt={brandName} className="w-full h-full object-cover object-top" />
          </div>
          <span className="truncate max-w-[120px]">{brandName}</span>
        </button>

        {/* Right Action: Let's talk */}
        <button
          onClick={() => {
            onPlayClick?.();
            onOpenContact();
          }}
          className="px-4 py-2 rounded-full bg-primary text-white font-sans text-xs font-medium shadow-md shadow-primary/30 flex items-center gap-1"
        >
          <span>Talk</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Expanded Sheet Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between p-6 pb-28 bg-background/95 backdrop-blur-2xl animate-in fade-in duration-200">
          {/* Top Bar with Close */}
          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <span className="font-mono text-xs text-primary uppercase tracking-widest">
              NAVIGATION MENU
            </span>
            <button
              onClick={() => {
                onPlayClick?.();
                setIsOpen(false);
              }}
              className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="my-auto space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                onMouseEnter={onPlayHover}
                className="w-full flex items-baseline justify-between text-left group"
              >
                <span className="font-serif text-3xl sm:text-4xl uppercase tracking-tight group-hover:text-primary transition-colors">
                  {item.label}
                </span>
                <span className="font-mono text-xs text-foreground-muted group-hover:text-primary">
                  [{item.num}]
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Settings in Mobile Sheet */}
          <div className="pt-6 border-t border-border/50 flex items-center justify-between font-mono text-xs">
            <button
              onClick={() => {
                onToggleTheme();
                onPlayClick?.();
              }}
              className="flex items-center gap-2 p-3 rounded-2xl bg-card border border-border text-foreground"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
              <span className="uppercase">{theme} MODE</span>
            </button>

            <button
              onClick={() => {
                onToggleSound();
                onPlayClick?.();
              }}
              className="flex items-center gap-2 p-3 rounded-2xl bg-card border border-border text-foreground"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4 opacity-50" />}
              <span>{soundEnabled ? 'SOUND ON' : 'MUTED'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
