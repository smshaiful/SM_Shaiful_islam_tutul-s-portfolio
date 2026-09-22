import React, { useState } from 'react';
import { AwardItem, StatItem } from '../types/resume';
import { Trophy, Award, Maximize2, X, CheckCircle2 } from 'lucide-react';

interface AwardsRecognitionProps {
  awards: AwardItem[];
  stats: StatItem[];
  onPlayHover?: () => void;
  onPlayClick?: () => void;
}

export const AwardsRecognition: React.FC<AwardsRecognitionProps> = ({
  awards,
  stats,
  onPlayHover,
  onPlayClick,
}) => {
  const totalHonors = awards.reduce((acc, a) => acc + a.count, 0);
  const [activeCertificateImage, setActiveCertificateImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  return (
    <section id="awards" className="relative z-10 px-6 sm:px-16 py-28 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border/50 pb-10">
        <div>
          <div className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>ACCOLADES & BENCHMARKS</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl uppercase tracking-tight">
            Awards <span className="italic font-light text-primary">&</span> Recognitions
          </h2>
          <p className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-wider text-foreground-muted max-w-xl">
            My work and digital architecture have been honored by leading international platforms and clients worldwide.
          </p>
        </div>

        {/* Total Pill */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
          <Trophy className="w-4 h-4" />
          <span>TOTAL RECOGNITIONS: {totalHonors}</span>
        </div>
      </div>

      {/* Key Numbers / Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onMouseEnter={onPlayHover}
            className="p-6 sm:p-8 rounded-3xl bg-card/40 border border-border/60 hover:border-primary/50 backdrop-blur-sm transition-all text-center"
          >
            <div className="font-serif text-4xl sm:text-6xl font-light text-primary mb-2">
              {stat.prefix}{stat.value}{stat.suffix}
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Awards Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {awards.map((item, index) => (
          <div
            key={index}
            onMouseEnter={onPlayHover}
            className="p-8 sm:p-10 rounded-3xl bg-card/50 border border-border/60 hover:border-primary/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-2xl uppercase tracking-tight">
                    {item.platform}
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  [{item.count}]
                </span>
              </div>

              {/* Honors List */}
              <ul className="space-y-3 font-mono text-xs text-foreground-muted uppercase">
                {item.honors.map((honor, hIdx) => (
                  <li key={hIdx} className="flex items-center justify-between pb-2 border-b border-border/30">
                    <span>{honor}</span>
                    <span className="text-primary">✦</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificate Preview Card if present */}
            {item.certificateImage && (
              <div
                onClick={() => {
                  onPlayClick?.();
                  setActiveCertificateImage({
                    url: item.certificateImage!,
                    title: item.certificateTitle || item.platform,
                  });
                }}
                className="group/cert cursor-pointer rounded-2xl overflow-hidden border border-border/60 bg-black/40 hover:border-primary/60 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={item.certificateImage}
                    alt={item.certificateTitle || item.platform}
                    className="w-full h-full object-cover group-hover/cert:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-white/90 font-medium">
                      {item.certificateTitle || "Certificate of Participation"}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-primary bg-black/70 px-2.5 py-1 rounded-full border border-primary/30 font-bold">
                      <Maximize2 className="w-3 h-3" />
                      <span>View</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-2 pt-4 text-[10px] font-mono text-foreground-muted/60 uppercase tracking-widest flex items-center justify-between border-t border-border/30">
              <span>VERIFIED COMPETITION CREDENTIAL</span>
              <span className="text-emerald-400 font-bold">ACTIVE</span>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal Lightbox */}
      {activeCertificateImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveCertificateImage(null)}
        >
          <button
            onClick={() => setActiveCertificateImage(null)}
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
                src={activeCertificateImage.url}
                alt={activeCertificateImage.title}
                className="w-full h-full max-h-[72vh] object-contain"
              />
            </div>

            <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-sm border-t border-border/40">
              <div>
                <div className="font-bold text-base text-foreground">{activeCertificateImage.title}</div>
                <div className="text-foreground-muted text-xs">
                  WALTON Presents ROBOFUSION 1.0 • UFTB Robotics Club
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Certificate of Participation</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
