import React, { useState, useEffect } from 'react';
import { Project } from '../types/resume';
import {
  ArrowLeft,
  Github,
  Cpu,
  Layers,
  Sparkles,
  AlertCircle,
  Maximize2,
  X,
} from 'lucide-react';

interface GenericProjectPageProps {
  project: Project;
  onBack: () => void;
}

export const GenericProjectPage: React.FC<GenericProjectPageProps> = ({ project, onBack }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project]);

  const galleryImages = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.featuredImage];

  return (
    <div className="min-h-screen bg-[#0f1b2d] text-[#eaf1fb] font-sans selection:bg-[#00d4a0] selection:text-[#0f1b2d]">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 w-full bg-[#0f1b2d]/95 backdrop-blur-md border-b border-[#16233a] px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#16233a] hover:bg-[#00d4a0] text-[#eaf1fb] hover:text-[#0f1b2d] border border-[#7d8ba1]/30 transition-all font-mono text-sm font-bold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>← Back to Portfolio</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-sm font-mono text-[#7d8ba1]">
            <span>/</span>
            <span className="text-[#00d4a0] font-semibold">PROJECT {project.num}</span>
            <span>/</span>
            <span className="truncate max-w-[240px] md:max-w-none text-[#eaf1fb] font-medium">{project.title}</span>
          </div>
        </div>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00d4a0]/15 hover:bg-[#00d4a0] text-[#00d4a0] hover:text-[#0f1b2d] border border-[#00d4a0]/40 transition-all font-mono text-sm font-bold shadow-md shadow-[#00d4a0]/20"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full bg-[#00d4a0]/15 text-[#00d4a0] border border-[#00d4a0]/30">
              PRJCT {project.num}
            </span>
            <span
              className={`font-mono text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full border ${
                project.status === 'COMPLETED'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}
            >
              ● {project.status}
            </span>
            {project.team && (
              <span className="font-mono text-xs sm:text-sm text-[#7d8ba1] uppercase tracking-wider font-semibold">
                {project.team}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#eaf1fb] leading-tight">
            {project.title}
          </h1>

          <p className="max-w-3xl text-lg sm:text-2xl text-[#7d8ba1] leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-[#7d8ba1] pt-2">
            <span>CATEGORY: <strong className="text-[#eaf1fb]">{project.type}</strong></span>
            <span>•</span>
            <span>YEAR: <strong className="text-[#eaf1fb]">{project.year}</strong></span>
            <span>•</span>
            <span>STATUS: <strong className="text-[#00d4a0] font-bold">{project.date}</strong></span>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-12 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto space-y-6">
        <div
          onClick={() => setLightboxImage(galleryImages[activeImageIndex])}
          className="group relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-[#16233a] bg-black/40 shadow-2xl cursor-pointer flex items-center justify-center"
        >
          <img
            src={galleryImages[activeImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-[#0f1b2d]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-mono text-sm text-white font-bold">
            <Maximize2 className="w-5 h-5 text-[#00d4a0]" />
            <span>Click to Enlarge Full-Screen</span>
          </div>
        </div>

        {galleryImages.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-32 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === idx
                    ? 'border-[#00d4a0] scale-105 shadow-md shadow-[#00d4a0]/30'
                    : 'border-[#16233a] opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Deep-Dive Grid: Problem & Solution, Innovation, Novelty */}
      <section className="py-16 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] space-y-4 shadow-xl">
            <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#ff5c7c] font-bold">
              <AlertCircle className="w-5 h-5 text-[#ff5c7c]" />
              <span>REAL-WORLD PROBLEM SOLVED</span>
            </div>
            <p className="text-base sm:text-xl text-[#eaf1fb] leading-relaxed font-sans">
              {project.realWorldProblem}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] space-y-4 shadow-xl">
            <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#00d4a0] font-bold">
              <Sparkles className="w-5 h-5 text-[#00d4a0]" />
              <span>INNOVATION & ARCHITECTURE</span>
            </div>
            <p className="text-base sm:text-xl text-[#eaf1fb] leading-relaxed font-sans">
              {project.innovation}
            </p>
          </div>
        </div>

        {/* Novelty & Features */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] space-y-4 shadow-xl">
          <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-[#00d4a0] font-bold">
            <Cpu className="w-5 h-5 text-[#00d4a0]" />
            <span>NOVELTY & SCIENTIFIC VALUE</span>
          </div>
          <p className="text-base sm:text-xl text-[#eaf1fb] leading-relaxed font-sans">
            {project.novelty}
          </p>
        </div>

        {/* Features Grid */}
        {project.features && project.features.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-sm sm:text-base uppercase tracking-wider text-[#00d4a0] font-bold">
              <Layers className="w-5 h-5 text-[#00d4a0]" />
              <span>CORE SYSTEM CAPABILITIES</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.features.map((f, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[#16233a]/80 border border-[#16233a] flex items-start gap-4 shadow-md">
                  <span className="font-mono text-sm text-[#00d4a0] font-bold mt-0.5">[{i + 1}]</span>
                  <p className="text-base sm:text-lg text-[#eaf1fb] leading-relaxed font-sans">{f}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scope & Technologies */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-sm">
          <div>
            <span className="text-[#7d8ba1] uppercase block mb-3 font-semibold">Scope of Development:</span>
            <div className="flex flex-wrap gap-2.5">
              {project.scope.map((s) => (
                <span key={s} className="px-3.5 py-1.5 rounded-full bg-[#0f1b2d] border border-[#7d8ba1]/30 text-[#eaf1fb] font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[#7d8ba1] uppercase block mb-3 font-semibold">Technology Stack:</span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((st) => (
                <span key={st} className="px-3.5 py-1.5 rounded-full bg-[#00d4a0]/15 text-[#00d4a0] border border-[#00d4a0]/30 font-bold">
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-mono text-sm text-[#7d8ba1]">
        <div>
          <p className="text-[#eaf1fb] font-bold text-base">SM Shaiful Islam Tutul — EEE, JSTU</p>
          <p className="text-[#7d8ba1] text-xs sm:text-sm mt-1">Hardware SNN • Neuromorphic Computing • Embedded Systems</p>
        </div>

        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-full bg-[#16233a] hover:bg-[#00d4a0] text-[#eaf1fb] hover:text-[#0f1b2d] border border-[#7d8ba1]/30 transition-all font-bold shadow-md"
        >
          ← Back to All Projects
        </button>
      </footer>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-10 flex flex-col items-center justify-center animate-in fade-in"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#16233a] text-white hover:bg-[#00d4a0] hover:text-[#0f1b2d] transition-colors shadow-xl"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt={project.title}
            className="max-h-[88vh] max-w-full rounded-2xl object-contain border border-[#7d8ba1]/30 shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
