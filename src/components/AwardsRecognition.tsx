import React from 'react';
import { AwardItem, StatItem } from '../types/resume';
import { Trophy, Award } from 'lucide-react';

interface AwardsRecognitionProps {
  awards: AwardItem[];
  stats: StatItem[];
  onPlayHover?: () => void;
}

export const AwardsRecognition: React.FC<AwardsRecognitionProps> = ({
  awards,
  stats,
  onPlayHover,
}) => {
  const totalHonors = awards.reduce((acc, a) => acc + a.count, 0);

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

      {/* Awards Breakdown Grid (Awwwards, CSSDA, etc.) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {awards.map((item, index) => (
          <div
            key={index}
            onMouseEnter={onPlayHover}
            className="p-8 sm:p-10 rounded-3xl bg-card/50 border border-border/60 hover:border-primary/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
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

            <div className="mt-6 pt-4 text-[10px] font-mono text-foreground-muted/60 uppercase tracking-widest">
              VERIFIED INTERNATIONAL JURY RATING
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
