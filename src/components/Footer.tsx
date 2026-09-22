import React, { useState, useEffect } from 'react';
import { SocialLink } from '../types/resume';
import { 
  CornerDownRight, 
  ArrowUp, 
  Clock, 
  Globe, 
  Linkedin, 
  Github, 
  Mail, 
  ArrowUpRight, 
  Copy, 
  Check, 
  FileDown, 
  Send
} from 'lucide-react';

interface FooterProps {
  name: string;
  title?: string;
  email?: string;
  resumePdfUrl?: string;
  location: string;
  timezone: string;
  socials: SocialLink[];
  onOpenContact: () => void;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  name,
  title = "EEE Researcher & Embedded Systems Developer",
  email = "smshaifulislam46@gmail.com",
  resumePdfUrl = "./SM_Shaiful_Islam_Tutul_Resume.pdf",
  location,
  timezone,
  socials,
  onOpenContact,
  onPlayClick,
  onPlayHover,
}) => {
  const [timeString, setTimeString] = useState('');
  const [copied, setCopied] = useState(false);

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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayClick?.();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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

  // Find direct social links
  const linkedinLink = socials.find(s => s.name.toLowerCase().includes('linkedin'))?.url || 
    'https://www.linkedin.com/in/sm-shaiful-islam-tutul-3a6423389/';
  const githubLink = socials.find(s => s.name.toLowerCase().includes('github'))?.url || 
    'https://github.com/smsitutul';

  return (
    <footer id="contact" className="relative z-10 border-t border-border/50 bg-[#0b1320]/80 backdrop-blur-2xl text-foreground select-none overflow-hidden">
      {/* Ambient background glow circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-24 pb-14">
        {/* Top Floating Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest font-semibold backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>OPEN FOR RESEARCH COLLABORATION & PROJECTS</span>
          </div>

          <div className="font-mono text-xs text-foreground-muted/70 tracking-wider">
            STATUS // ACCEPTING 2026 INVITATIONS
          </div>
        </div>

        {/* Hero Call-To-Action (CTA) Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] uppercase">
              Let’s build{' '}
              <span className="inline-flex items-baseline italic font-serif font-light text-primary">
                <CornerDownRight className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block text-primary/80 mr-3 transform translate-y-3 stroke-[1.5]" />
                something
              </span>{' '}
              extraordinary.
            </h2>
            <p className="font-sans text-base sm:text-lg text-foreground-muted max-w-2xl mt-6 leading-relaxed">
              Have an ambitious embedded systems idea, biomedical prototyping challenge, or neuromorphic research concept? Let's connect and engineer it together with precision.
            </p>
          </div>

          {/* Quick Action Button Hub */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <button
              onClick={() => {
                onPlayClick?.();
                onOpenContact();
              }}
              onMouseEnter={onPlayHover}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary via-emerald-400 to-teal-500 text-[#0f1b2d] font-sans font-bold text-sm uppercase tracking-wider shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              <span>START A CONVERSATION</span>
            </button>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={onPlayHover}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-card/60 hover:bg-card border border-border/80 text-foreground font-mono text-xs tracking-wider transition-all duration-200 group hover:border-primary/50"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">EMAIL COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>{email}</span>
                </>
              )}
            </button>

            <a
              href={resumePdfUrl}
              download="SM_Shaiful_Islam_Tutul_Resume.pdf"
              onMouseEnter={onPlayHover}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-card/40 hover:bg-card/70 border border-border/60 text-foreground-muted hover:text-foreground font-mono text-xs tracking-wider transition-all duration-200 group"
            >
              <FileDown className="w-4 h-4 text-primary group-hover:-translate-y-0.5 transition-transform" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>

        {/* 3 Interactive Highlight Cards: LinkedIn, GitHub, Direct Mail */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {/* LinkedIn Card */}
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onPlayHover}
            className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#14233c]/70 to-[#0e1828]/70 border border-[#0a66c2]/30 hover:border-[#0a66c2] shadow-xl hover:shadow-[0_0_30px_-5px_rgba(10,102,194,0.35)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#0a66c2]/20 border border-[#0a66c2]/40 flex items-center justify-center text-[#0a66c2] group-hover:scale-110 group-hover:bg-[#0a66c2] group-hover:text-white transition-all duration-300">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div className="p-2 rounded-full bg-white/5 border border-white/10 text-foreground-muted group-hover:text-white group-hover:border-[#0a66c2]/60 group-hover:bg-[#0a66c2]/20 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0a66c2] block mb-1">
                PROFESSIONAL NETWORK
              </span>
              <h3 className="font-serif text-2xl font-bold text-white group-hover:text-primary transition-colors">
                LinkedIn Profile
              </h3>
              <p className="font-sans text-xs sm:text-sm text-foreground-muted mt-2 leading-relaxed">
                Connect for research collaboration, academic updates, and engineering networking.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#0a66c2] font-semibold">sm-shaiful-islam-tutul</span>
              <span className="text-foreground-muted/60 text-[10px]">CONNECT ↗</span>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onPlayHover}
            className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#16233a]/70 to-[#0e1828]/70 border border-border/80 hover:border-primary shadow-xl hover:shadow-[0_0_30px_-5px_rgba(0,212,160,0.3)] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-[#0f1b2d] transition-all duration-300">
                  <Github className="w-6 h-6" />
                </div>
                <div className="p-2 rounded-full bg-white/5 border border-white/10 text-foreground-muted group-hover:text-white group-hover:border-primary/60 group-hover:bg-primary/20 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">
                OPEN SOURCE & FIRMWARE
              </span>
              <h3 className="font-serif text-2xl font-bold text-white group-hover:text-primary transition-colors">
                GitHub Repositories
              </h3>
              <p className="font-sans text-xs sm:text-sm text-foreground-muted mt-2 leading-relaxed">
                Inspect hardware C++ firmware, Python signal processing suites, and research codebase.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-primary font-semibold">@smsitutul</span>
              <span className="text-foreground-muted/60 text-[10px]">EXPLORE CODE ↗</span>
            </div>
          </a>

          {/* Email / Direct Inquiry Card */}
          <div
            onClick={handleCopyEmail}
            onMouseEnter={onPlayHover}
            className="group relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#182335]/70 to-[#0e1828]/70 border border-teal-500/30 hover:border-teal-400 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(45,212,191,0.3)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-400 group-hover:text-[#0f1b2d] transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="p-2 rounded-full bg-white/5 border border-white/10 text-foreground-muted group-hover:text-white group-hover:border-teal-400/60 group-hover:bg-teal-400/20 transition-all duration-300">
                  <Copy className="w-4 h-4" />
                </div>
              </div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-400 block mb-1">
                DIRECT INBOX
              </span>
              <h3 className="font-serif text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">
                Personal Email
              </h3>
              <p className="font-sans text-xs sm:text-sm text-foreground-muted mt-2 leading-relaxed">
                Click to copy email address directly or click below to launch your default mail client.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <span className="text-teal-400 font-semibold truncate max-w-[200px]">{email}</span>
              <span className="text-foreground-muted/60 text-[10px]">
                {copied ? 'COPIED! ✓' : 'CLICK TO COPY'}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Column Navigation, Location & System Telemetry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-t border-border/40 font-mono text-xs">
          {/* Quick Pages Navigation */}
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-widest font-semibold block text-[11px]">
              SITE DIRECTORY
            </span>
            <ul className="space-y-2.5">
              {[
                { name: 'Introduction', id: 'hero-storytelling', num: '01' },
                { name: 'About & Vision', id: 'about', num: '02' },
                { name: 'Featured Works', id: 'work', num: '03' },
                { name: 'Career Experience', id: 'experience', num: '04' },
                { name: 'Awards & Certificates', id: 'awards', num: '05' },
              ].map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => scrollToSection(p.id)}
                    onMouseEnter={onPlayHover}
                    className="flex items-center gap-2.5 text-foreground-muted hover:text-foreground transition-colors group text-left"
                  >
                    <span className="text-primary/70 font-bold group-hover:text-primary transition-colors">
                      [{p.num}]
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {p.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links List */}
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-widest font-semibold block text-[11px]">
              PRIMARY SOCIALS
            </span>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={onPlayHover}
                    className="flex items-center justify-between text-foreground-muted hover:text-foreground transition-colors group pr-4"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-primary/70 font-bold group-hover:text-primary transition-colors">
                        [{s.index}]
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {s.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-foreground-muted/40 group-hover:text-primary transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Local Clock Widget */}
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-widest font-semibold block text-[11px]">
              LOCATION & LOCAL TIME
            </span>
            <div className="p-4 rounded-2xl bg-card/40 border border-border/60 space-y-3">
              <div className="flex items-center gap-2.5 text-foreground">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <span className="font-sans text-xs font-medium">{location}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <div className="flex items-center gap-2 text-foreground-muted text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>DHAKA TIME:</span>
                </div>
                <span className="text-primary font-bold text-sm tracking-wider tabular-nums font-mono">
                  {timeString || '22:50:00'}
                </span>
              </div>
              <div className="text-[10px] text-foreground-muted/60 tracking-wider">
                TIMEZONE: UTC+6 (BANGLADESH STANDARD TIME)
              </div>
            </div>
          </div>

          {/* Institutional Affiliation & Status */}
          <div className="space-y-4">
            <span className="text-primary uppercase tracking-widest font-semibold block text-[11px]">
              ACADEMIC AFFILIATION
            </span>
            <div className="p-4 rounded-2xl bg-card/40 border border-border/60 space-y-2">
              <div className="font-serif text-sm text-foreground font-bold">
                Jamalpur Science And Technology University
              </div>
              <p className="text-[11px] text-foreground-muted leading-relaxed font-sans">
                Department of Electrical and Electronic Engineering (EEE). Class of 2028.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                  ACTIVELY RESEARCHING
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t border-border/40 font-mono text-[11px] text-foreground-muted">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-foreground font-semibold">{name}</span>
            <span>•</span>
            <span className="text-primary font-medium">{title}</span>
            <span>•</span>
            <span>All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={onPlayHover}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/60 hover:bg-card border border-border/80 text-foreground-muted hover:text-primary transition-all duration-300 group shadow-sm"
          >
            <span className="tracking-wider">BACK TO TOP</span>
            <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-[#0f1b2d] transition-all duration-300">
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
