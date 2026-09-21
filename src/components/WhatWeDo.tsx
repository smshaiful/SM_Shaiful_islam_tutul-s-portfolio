import React from 'react';
import { Capability } from '../types/resume';
import { CornerDownRight, Download, CheckCircle2, Sparkles, Send, Cpu, MapPin } from 'lucide-react';

interface WhatWeDoProps {
  capabilities: Capability[];
  skills: Record<string, string[]>;
  tagline: string;
  detailedBio: string;
  resumePdfUrl: string;
  onPlayHover?: () => void;
  onPlayClick?: () => void;
  onOpenContact: () => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({
  capabilities,
  skills,
  resumePdfUrl,
  onPlayHover,
  onPlayClick,
  onOpenContact,
}) => {
  return (
    <section id="about" className="relative z-10 px-6 sm:px-16 py-28 max-w-7xl mx-auto scroll-mt-24">
      {/* Top Section Tag */}
      <div className="flex items-center gap-3 mb-10 font-mono text-xs uppercase tracking-widest text-primary">
        <span className="w-2 h-2 rounded-full bg-primary" />
        <span>ABOUT // BIOGRAPHY & RESEARCH INITIATIVE</span>
      </div>

      {/* Main About Editorial Card */}
      <div className="relative mb-24 p-8 sm:p-12 lg:p-14 rounded-3xl bg-card/60 border border-border/80 backdrop-blur-xl shadow-2xl hover:border-primary/50 transition-all duration-500 group">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-primary/20 transition-all" />

        {/* Card Header Status */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              RESEARCHER PROFILE
            </span>
            <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary" />
              JSTU, JAMALPUR, BANGLADESH
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase font-medium">OPEN FOR RESEARCH COLLABORATION</span>
          </div>
        </div>

        {/* Two-Column Layout: Portrait Photo + Editorial Biography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Portrait Photo with Luxury Frame */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden border border-border/80 bg-muted/40 shadow-2xl group/img">
              {/* Image Container with Subtle Zoom on Hover */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src="/tutul.jpg"
                  alt="SM Shaiful Islam Tutul - EEE Student at JSTU"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              </div>

              {/* Floating Top Label */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 font-mono text-[10px]">
                <span className="px-2.5 py-1 rounded-full bg-black/60 text-white/90 backdrop-blur-md border border-white/10 uppercase tracking-wider">
                  JSTU CAMPUS
                </span>
                <span className="px-2.5 py-1 rounded-full bg-primary/30 text-primary backdrop-blur-md border border-primary/40 font-semibold uppercase">
                  2ND YEAR
                </span>
              </div>

              {/* Floating Bottom Identity Card */}
              <div className="absolute bottom-4 left-4 right-4 z-10 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 font-mono text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-white text-base tracking-wide uppercase font-medium">
                    SM Shaiful Islam Tutul
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] text-foreground-muted uppercase tracking-wider">
                  EEE Department • JSTU
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Collaboration Notice */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Big Serif Heading */}
              <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight leading-[1.08] mb-6">
                Exploring{' '}
                <span className="inline-flex items-baseline italic font-serif font-light text-primary">
                  <CornerDownRight className="w-7 h-7 sm:w-10 sm:h-10 inline-block text-primary/80 mr-2 sm:mr-3 transform translate-y-1.5 stroke-[1.5]" />
                  neuromorphic
                </span>{' '}
                silicon, hardware SNN & embedded intelligence.
              </h2>

              {/* User's Exact Provided Bio */}
              <div className="space-y-6 text-foreground/95 font-sans text-base sm:text-xl leading-relaxed">
                <p>
                  I'm <strong className="text-white font-serif tracking-normal text-xl sm:text-2xl font-bold">SM Shaiful Islam Tutul</strong>, a 2nd-year EEE student at{' '}
                  <span className="text-primary font-bold">JSTU, Bangladesh</span>, passionate about{' '}
                  <span className="text-white font-semibold underline decoration-primary/60 underline-offset-4">Neuromorphic Computing</span>,{' '}
                  <span className="text-white font-semibold underline decoration-primary/60 underline-offset-4">Embedded Systems</span>, and{' '}
                  <span className="text-white font-semibold underline decoration-primary/60 underline-offset-4">Signal Processing</span>.
                </p>

                <p>
                  Currently building a <strong className="text-primary font-bold">hardware SNN-based RC Vehicle Controller</strong>. <strong className="text-white font-bold">Python</strong> is my primary tool for simulations and research experiments, and I'm also exploring <strong className="text-white font-bold">Brian2</strong> and <strong className="text-white font-bold">Qiskit</strong>.
                </p>
              </div>

              {/* Academic Collaboration Notice Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary/20 via-purple-950/40 to-transparent border-2 border-primary/50 mt-8 space-y-3 shadow-xl">
                <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider text-primary font-bold">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span>ACADEMIC RESEARCH COLLABORATION</span>
                </div>
                <p className="font-serif text-2xl sm:text-3xl text-white tracking-tight leading-snug font-bold">
                  "I'm actively looking for research collaboration with professors in these fields."
                </p>
                <p className="font-mono text-xs sm:text-sm text-foreground-muted uppercase tracking-wide font-semibold">
                  FOCUS: SNN HARDWARE ARCHITECTURES, NEUROMORPHIC CHIPS, SENSORY ROBOTICS, OR BIOMEDICAL DSP.
                </p>
              </div>
            </div>

            {/* Action Buttons: Collaborate & Download Resume */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  onPlayClick?.();
                  onOpenContact();
                }}
                onMouseEnter={onPlayHover}
                className="px-8 py-4 rounded-full bg-primary text-white font-sans text-sm sm:text-base font-bold tracking-wider uppercase shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
              >
                <Send className="w-5 h-5" />
                <span>PROPOSE RESEARCH COLLABORATION</span>
              </button>

              <a
                href={resumePdfUrl}
                onClick={onPlayClick}
                onMouseEnter={onPlayHover}
                download="SM_Shaiful_Islam_Tutul_CV.pdf"
                className="px-8 py-4 rounded-full border-2 border-border hover:border-primary/60 bg-card/60 backdrop-blur-sm text-foreground font-sans text-sm sm:text-base font-bold tracking-wide hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
              >
                <Download className="w-5 h-5" />
                <span>DOWNLOAD CV / RESUME (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Core Research Capabilities */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <Cpu className="w-7 h-7 text-primary" />
            <h3 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight font-bold">
              Research & Technical Domains
            </h3>
          </div>
          <span className="font-mono text-sm sm:text-base text-primary uppercase tracking-wider font-bold hidden sm:inline">
            CORE FOCUS AREAS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              onMouseEnter={onPlayHover}
              className="group relative p-8 sm:p-12 rounded-3xl bg-card/60 border border-border/70 hover:border-primary/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-sm sm:text-base font-bold text-primary px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30">
                    {cap.num}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-foreground-muted uppercase tracking-widest font-bold">
                    SPECIALIZATION
                  </span>
                </div>

                <h4 className="font-serif text-3xl sm:text-4xl tracking-tight uppercase mb-2.5 group-hover:text-primary transition-colors font-bold">
                  {cap.title}
                </h4>
                <p className="font-mono text-sm sm:text-base uppercase tracking-wider text-primary font-bold mb-5">
                  {cap.subtitle}
                </p>

                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed mb-8 font-sans">
                  {cap.description}
                </p>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2.5 pt-5 border-t border-border/50">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-mono font-medium bg-muted/80 text-foreground/90 border border-border/70 group-hover:border-primary/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Tech Stack Matrix */}
      <div className="p-8 sm:p-12 rounded-3xl bg-card/60 border border-border/70 backdrop-blur-md">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <h3 className="font-serif text-2xl sm:text-4xl uppercase tracking-tight font-bold">
              Simulation, Hardware & Research Toolkit
            </h3>
          </div>
          <span className="font-mono text-sm sm:text-base text-primary uppercase tracking-wider font-bold hidden sm:inline">
            VERIFIED PROFICIENCY
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="space-y-4">
              <h4 className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-primary">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono text-sm sm:text-base text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2.5 font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
