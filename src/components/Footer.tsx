import React, { useState, useEffect } from 'react';
import { SocialLink } from '../types/resume';
import { CornerDownRight, ArrowUp, Clock, Globe } from 'lucide-react';

interface FooterProps {
  name: string;
  location: string;
  timezone: string;
  socials: SocialLink[];
  onOpenContact: () => void;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  name,
  location,
  timezone,
  socials,
  onOpenContact,
  onPlayClick,
  onPlayHover,
}) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: timezone || 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTimeString(formatted);
      } catch {
        setTimeString(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const scrollToTop = () => {
    onPlayClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    onPlayClick?.();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative z-10 border-t border-border/60 bg-card/40 backdrop-blur-xl px-6 sm:px-16 pt-24 pb-12 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Massive Typographic Callout */}
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-6">
            STAY IN TOUCH // LET'S TALK
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight leading-[1] max-w-5xl mb-8">
            Let’s build{' '}
            <span className="inline-flex items-baseline italic font-serif font-light text-primary">
              <CornerDownRight className="w-8 h-8 sm:w-14 sm:h-14 inline-block text-primary/80 mr-3 transform translate-y-2 stroke-[1.5]" />
              something
            </span>{' '}
            meaningful.
          </h2>

          <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-foreground-muted max-w-xl mb-10">
            Have an idea, a product, or a vision? I'd love to help you bring it to life with precision and soul.
          </p>

          <button
            onClick={() => {
              onPlayClick?.();
              onOpenContact();
            }}
            onMouseEnter={onPlayHover}
            className="px-8 py-4 rounded-full bg-primary text-white font-sans text-sm font-semibold uppercase tracking-wider shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
          >
            <span>START A PROJECT</span>
            <span className="text-white/80">⟶</span>
          </button>
        </div>

        {/* 4-Column Navigation & Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-t border-border/40 font-mono text-xs">
          {/* Social Links */}
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-wider font-semibold block">
              Social Links
            </span>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={onPlayHover}
                    className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors group"
                  >
                    <span className="text-primary font-bold">[{s.index}]</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {s.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Pages Navigation */}
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-wider font-semibold block">
              Site Navigation
            </span>
            <ul className="space-y-2.5">
              {[
                { name: 'Home', id: 'hero-storytelling', num: '01' },
                { name: 'About & Philosophy', id: 'about', num: '02' },
                { name: 'Featured Projects', id: 'work', num: '03' },
                { name: 'Career Experience', id: 'experience', num: '04' },
                { name: 'Awards & Honours', id: 'awards', num: '05' },
              ].map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => scrollToSection(p.id)}
                    onMouseEnter={onPlayHover}
                    className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors group text-left"
                  >
                    <span className="text-primary font-bold">[{p.num}]</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">
                      {p.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Local Clock */}
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-wider font-semibold block">
              Location & Time
            </span>
            <div className="space-y-3 text-foreground-muted">
              <div className="flex items-center gap-2 text-foreground">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>LOCAL TIME:</span>
                <span className="text-primary font-bold tabular-nums">
                  {timeString || '16:00:00'}
                </span>
              </div>
              <div className="text-[11px] text-foreground-muted/70">
                COORDINATED UNIVERSAL TIME (UTC+6)
              </div>
            </div>
          </div>

          {/* Status & Availability */}
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-wider font-semibold block">
              Status & Openings
            </span>
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-foreground font-semibold uppercase text-[11px]">
                  AVAILABLE FOR HIRE
                </span>
              </div>
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Accepting new client collaborations and ambitious engineering roles.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/40 font-mono text-[11px] text-foreground-muted">
          <div>
            © {new Date().getFullYear()} {name}. INSPIRED BY EMOTION AGENCY. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={onPlayHover}
            className="flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors group"
          >
            <span>BACK TO TOP</span>
            <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
