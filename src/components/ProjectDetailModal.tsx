import React, { useEffect, useState } from 'react';
import { Project } from '../types/resume';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, Cpu, Code2, Layers, AlertCircle } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onPlayClick?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onPlayClick,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeCodeSnippet, setActiveCodeSnippet] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      setActiveImageIndex(0);
      setActiveCodeSnippet(0);
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const galleryImages = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.featuredImage];

  const currentDisplayImage = galleryImages[activeImageIndex] || project.featuredImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={() => {
          onPlayClick?.();
          onClose();
        }}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Card / Page */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-card border border-border/80 shadow-2xl p-6 sm:p-10 transition-all animate-in zoom-in-95 duration-200 space-y-10">
        {/* Top Sticky-like Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/50">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              PRJCT {project.num}
            </span>
            <span
              className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border ${
                project.status === 'COMPLETED'
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              }`}
            >
              ● {project.status}
            </span>
            {project.team && (
              <span className="font-mono text-xs text-foreground-muted uppercase tracking-wider">
                {project.team}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              onPlayClick?.();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-muted text-foreground-muted hover:text-foreground transition-colors self-end sm:self-auto"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Project Title & Subtitle */}
        <div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[1.05] mb-4">
            {project.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-foreground-muted uppercase tracking-wider">
            <span>{project.type}</span>
            <span>•</span>
            <span>YEAR: {project.year}</span>
            <span>•</span>
            <span className="text-primary font-medium">{project.date}</span>
          </div>
        </div>

        {/* Media Gallery Section */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border/60 bg-black/40 shadow-xl flex items-center justify-center">
            <img
              src={currentDisplayImage}
              alt={project.title}
              className="w-full h-full object-contain bg-black/60"
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] px-3 py-1 rounded-full bg-black/75 text-white/90 backdrop-blur-md border border-white/10 uppercase">
              IMAGE {activeImageIndex + 1} OF {galleryImages.length}
            </div>
          </div>

          {/* Gallery Thumbnails (if multiple images) */}
          {galleryImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-primary scale-105 shadow-md shadow-primary/30'
                      : 'border-border/50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 font-mono text-[8px] bg-black/80 px-1 text-white rounded">
                    #{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scope & Tech Badges Bar */}
        <div className="p-6 rounded-2xl bg-card/60 border border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-foreground-muted uppercase block text-[11px]">Scope of Work:</span>
            <div className="flex flex-wrap gap-2">
              {project.scope.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-full bg-muted text-foreground/90 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-foreground-muted uppercase block text-[11px]">Technologies:</span>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((st) => (
                <span key={st} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Deep Dive Grid: Problem, Features, Innovation, Novelty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Real-World Problem Solved */}
          <div className="p-6 sm:p-8 rounded-2xl bg-card/40 border border-border/60 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>REAL-WORLD PROBLEM SOLVED</span>
            </div>
            <p className="text-foreground/90 font-sans text-sm sm:text-base leading-relaxed">
              {project.realWorldProblem}
            </p>
          </div>

          {/* Technical Innovation */}
          <div className="p-6 sm:p-8 rounded-2xl bg-card/40 border border-border/60 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-semibold">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>INNOVATION & ARCHITECTURE</span>
            </div>
            <p className="text-foreground/90 font-sans text-sm sm:text-base leading-relaxed">
              {project.innovation}
            </p>
          </div>

          {/* Novelty & Scientific Value */}
          <div className="p-6 sm:p-8 rounded-2xl bg-card/40 border border-border/60 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-violet-400 font-semibold">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>NOVELTY & ACADEMIC VALUE</span>
            </div>
            <p className="text-foreground/90 font-sans text-sm sm:text-base leading-relaxed">
              {project.novelty}
            </p>
          </div>

          {/* Key Deliverables & Benchmarks */}
          <div className="p-6 sm:p-8 rounded-2xl bg-card/40 border border-border/60 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>KEY BENCHMARKS</span>
            </div>
            <ul className="space-y-2 font-mono text-xs text-foreground/80">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features List Section */}
        {project.features && project.features.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/60 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-semibold">
              <Layers className="w-4 h-4 text-primary" />
              <span>SYSTEM CAPABILITIES & IMPLEMENTATION DETAILS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/40">
                  <span className="font-mono text-primary font-bold text-xs mt-0.5">[{idx + 1}]</span>
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                    {feat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hardware Interfacing Specifications (Table) */}
        {project.hardwareSpecs && project.hardwareSpecs.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/60 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                <Cpu className="w-4 h-4 text-primary" />
                <span>HARDWARE PINOUT & INTERFACING DIAGRAM</span>
              </div>
              <span className="font-mono text-[10px] text-foreground-muted uppercase">
                VOLTAGE & PIN CONFIGURATION
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/60 text-primary uppercase tracking-wider">
                    <th className="py-2.5 px-3">Module / Pin</th>
                    <th className="py-2.5 px-3">Microcontroller Pin</th>
                    <th className="py-2.5 px-3">Function / Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {project.hardwareSpecs.map((spec, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-foreground">{spec.pinName}</td>
                      <td className="py-2.5 px-3 text-primary">{spec.connectedTo}</td>
                      <td className="py-2.5 px-3 text-foreground-muted">{spec.function}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Code Snippets & Algorithms Viewer */}
        {project.codeSnippets && project.codeSnippets.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-border/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                <Code2 className="w-4 h-4 text-primary" />
                <span>ALGORITHM & CODE ARCHITECTURE</span>
              </div>

              {/* Code Snippet Tabs */}
              <div className="flex gap-2">
                {project.codeSnippets.map((snippet, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setActiveCodeSnippet(sIdx)}
                    className={`px-3 py-1 rounded-lg font-mono text-[11px] uppercase transition-all ${
                      activeCodeSnippet === sIdx
                        ? 'bg-primary text-white'
                        : 'bg-white/5 text-foreground-muted hover:text-white'
                    }`}
                  >
                    {snippet.language.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-xs text-foreground-muted block mb-2">
                // {project.codeSnippets[activeCodeSnippet]?.title}
              </span>
              <pre className="p-4 rounded-xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{project.codeSnippets[activeCodeSnippet]?.code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Abstract / Documentation Report Box */}
        {project.reportAbstract && (
          <div className="p-6 sm:p-8 rounded-2xl bg-muted/30 border border-border/60 space-y-2 font-mono text-xs">
            <span className="text-primary font-semibold uppercase tracking-wider block">
              OFFICIAL PROJECT ABSTRACT:
            </span>
            <p className="text-foreground-muted leading-relaxed font-sans text-sm">
              "{project.reportAbstract}"
            </p>
          </div>
        )}

        {/* Action Buttons: GitHub & Live links */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/60">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-primary text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>VIEW REPOSITORY & SOURCE CODE</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full border border-border hover:border-primary/60 bg-muted/50 text-foreground font-sans text-xs sm:text-sm font-medium tracking-wide hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-primary" />
              <span>EXPLORE LIVE DEMO / REPORT</span>
            </a>
          )}

          <button
            onClick={() => {
              onPlayClick?.();
              onClose();
            }}
            className="ml-auto font-mono text-xs text-foreground-muted hover:text-foreground uppercase tracking-wider"
          >
            ← BACK TO ALL PROJECTS
          </button>
        </div>
      </div>
    </div>
  );
};
