import React, { useState } from 'react';
import { Project } from '../types/resume';
import { ArrowUpRight, Layers } from 'lucide-react';

interface ProjectsShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  projects,
  onSelectProject,
  onPlayHover,
  onPlayClick,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects (4)' },
    { id: 'hardware', label: 'Hardware & SNN' },
    { id: 'biomedical', label: 'Biomedical & DSP' },
    { id: 'simulation', label: 'Simulations & Quantum' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="relative z-10 px-6 sm:px-16 py-28 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-border/50 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>SELECTED WORK // ARCHIVE</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight">
            Some <span className="italic font-light text-primary">Of my</span>{' '}
            <span className="tracking-tighter">⟶ ⟶</span> projects
          </h2>
          <p className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-wider text-foreground-muted max-w-xl">
            Hardware prototypes, bio-signal telemetry stations, and neuromorphic computational simulations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onPlayClick?.();
                setFilter(cat.id);
              }}
              onMouseEnter={onPlayHover}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${
                filter === cat.id
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'bg-card/60 text-foreground-muted hover:text-foreground border border-border/50 hover:bg-card'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => {
              onPlayClick?.();
              onSelectProject(project);
            }}
            onMouseEnter={onPlayHover}
            className="group cursor-pointer rounded-3xl overflow-hidden border border-border/60 hover:border-primary/50 bg-card/40 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 flex flex-col justify-between"
          >
            {/* Project Media Wrapper */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40">
              <img
                src={project.featuredImage}
                alt={project.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Number, Status and Year Badges on Top */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10">
                    PRJCT {project.num}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
                      project.status === 'COMPLETED'
                        ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/25 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    ● {project.status}
                  </span>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-black/70 text-white/80 backdrop-blur-md border border-white/10">
                  {project.year}
                </span>
              </div>

              {/* Floating Action Button */}
              <div className="absolute bottom-5 right-5 z-10 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>

            {/* Project Details Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="mb-3">
                  <span className="font-mono text-xs sm:text-sm uppercase tracking-wider text-primary font-bold">
                    {project.type}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-foreground/85 leading-relaxed mb-6 line-clamp-2 font-sans">
                  {project.description}
                </p>
              </div>

              {/* Scope & Tech Stack Specs */}
              <div className="space-y-3 pt-4 border-t border-border/40 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-foreground-muted uppercase font-semibold">Scope:</span>
                  <span className="text-foreground font-medium uppercase truncate">
                    {project.scope.join(' • ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-foreground-muted uppercase font-semibold">Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded bg-muted text-foreground font-semibold text-xs sm:text-sm"
                      >
                        {s}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-2 py-1 rounded bg-muted text-foreground-muted text-xs sm:text-sm">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/20 flex items-center justify-between text-sm sm:text-base text-primary font-bold group-hover:text-primary transition-colors">
                  <span className="uppercase tracking-wider">Open Dedicated Project Page</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform text-base sm:text-lg">⟶</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Archive Callout Banner */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/70 bg-card/40 backdrop-blur-sm text-xs font-mono uppercase tracking-wider text-foreground-muted">
          <Layers className="w-4 h-4 text-primary" />
          <span>MORE CASE STUDIES & LIVE REPOSITORIES AVAILABLE UPON REQUEST</span>
        </div>
      </div>
    </section>
  );
};
