import React, { useState } from 'react';
import { ExperienceItem, EducationItem, CertificateItem } from '../types/resume';
import { Briefcase, GraduationCap, ArrowRight, Award, Maximize2, X, CheckCircle2 } from 'lucide-react';

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates?: CertificateItem[];
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experience,
  education,
  certificates = [],
  onPlayHover,
  onPlayClick,
}) => {
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);

  return (
    <section id="experience" className="relative z-10 px-6 sm:px-16 py-28 max-w-7xl mx-auto">
      {/* Section Tag */}
      <div className="flex items-center gap-3 mb-6 font-mono text-sm sm:text-base uppercase tracking-widest text-primary font-bold">
        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        <span>CAREER TIMELINE // EXPERIENCE, EDUCATION & CERTIFICATIONS</span>
      </div>

      <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight mb-16 leading-tight">
        Experience <span className="italic font-light text-primary">&</span> Education
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        {/* Work Experience (Left 7 columns) */}
        <div className="lg:col-span-7 space-y-12">
          <div className="flex items-center gap-3 pb-4 border-b border-border/50 font-mono text-sm sm:text-base uppercase tracking-wider text-foreground-muted font-bold">
            <Briefcase className="w-5 h-5 text-primary" />
            <span>PROFESSIONAL RESEARCH & HISTORY</span>
          </div>

          <div className="space-y-12">
            {experience.map((item, index) => (
              <div
                key={index}
                onMouseEnter={onPlayHover}
                className="group relative pl-8 border-l-2 border-border/60 hover:border-primary transition-colors"
              >
                {/* Node indicator */}
                <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary group-hover:scale-125 group-hover:bg-primary transition-all duration-300" />

                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight group-hover:text-primary transition-colors">
                    {item.role}
                  </h3>
                  <span className="font-mono text-xs sm:text-sm font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/25">
                    {item.period}
                  </span>
                </div>

                <div className="font-mono text-xs sm:text-sm text-foreground-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="text-foreground font-semibold">{item.company}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>

                <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-sans mb-4">
                  {item.description}
                </p>

                {/* Key Achievements */}
                <ul className="space-y-2.5 mb-5 font-sans text-sm sm:text-base text-foreground/80">
                  {item.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md text-xs sm:text-sm font-mono bg-muted text-foreground/90 font-medium border border-border/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications (Right 5 columns) */}
        <div className="lg:col-span-5 space-y-14">
          
          {/* 1. Academic Foundation */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-border/50 font-mono text-sm sm:text-base uppercase tracking-wider text-foreground-muted font-bold">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span>ACADEMIC FOUNDATION</span>
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  onMouseEnter={onPlayHover}
                  className="p-6 sm:p-8 rounded-3xl bg-card/40 border border-border/60 hover:border-primary/50 backdrop-blur-sm transition-all shadow-lg space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs sm:text-sm text-primary font-bold">
                      {edu.period}
                    </span>
                    {edu.result && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs sm:text-sm font-bold">
                        {edu.result}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl uppercase tracking-tight text-foreground font-bold">
                    {edu.degree}
                  </h4>

                  <p className="font-mono text-xs sm:text-sm text-foreground/80 uppercase font-semibold">
                    {edu.institution}
                  </p>

                  {edu.details && (
                    <p className="font-sans text-sm sm:text-base text-foreground-muted leading-relaxed border-t border-border/30 pt-3">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Professional Certifications */}
          {certificates.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border/50 font-mono text-sm sm:text-base uppercase tracking-wider text-foreground-muted font-bold">
                <Award className="w-5 h-5 text-primary" />
                <span>PROFESSIONAL CERTIFICATIONS</span>
              </div>

              <div className="space-y-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    onMouseEnter={onPlayHover}
                    onClick={() => {
                      onPlayClick?.();
                      setActiveCertificate(cert);
                    }}
                    className="group p-6 sm:p-7 rounded-3xl bg-card/50 border border-border/60 hover:border-primary/60 transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold text-primary">
                          <span className="px-2.5 py-0.5 rounded-full bg-primary/15 border border-primary/30">
                            {cert.poweredBy}
                          </span>
                          <span>•</span>
                          <span className="text-foreground-muted">{cert.issuer}</span>
                        </div>

                        <h4 className="font-serif text-xl sm:text-2xl uppercase tracking-tight group-hover:text-primary transition-colors font-bold">
                          {cert.title}
                        </h4>
                      </div>

                      <div className="p-2 rounded-full bg-muted/60 text-foreground-muted group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Certificate Thumbnail Preview */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/40 border border-border/40 mb-4">
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 text-xs font-mono text-white/90 font-medium">
                        ID: {cert.code}
                      </div>
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs text-foreground-muted border-t border-border/30 pt-3">
                      <span>Issued: {cert.date}</span>
                      <span className="text-primary font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        View Certificate ⟶
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      {activeCertificate && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveCertificate(null)}
        >
          <button
            onClick={() => setActiveCertificate(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-card hover:bg-primary text-foreground hover:text-white transition-all border border-border/50 shadow-2xl"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-card border-2 border-primary/50 p-3 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-2xl max-h-[75vh] flex items-center justify-center bg-black/50">
              <img
                src={activeCertificate.imageUrl}
                alt={activeCertificate.title}
                className="w-full h-full max-h-[72vh] object-contain"
              />
            </div>

            <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-sm border-t border-border/40">
              <div>
                <div className="font-bold text-base text-foreground">{activeCertificate.title}</div>
                <div className="text-foreground-muted text-xs">
                  {activeCertificate.poweredBy} • {activeCertificate.issuer} (Code: {activeCertificate.code})
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Online Declaration</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
