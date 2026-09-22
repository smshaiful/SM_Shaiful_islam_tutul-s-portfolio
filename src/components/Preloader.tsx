import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  brandName: string;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, brandName }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const statusMessages = [
    "INITIALIZING CORE...",
    "CALIBRATING SHADERS...",
    "COMPOSING TYPOGRAPHY...",
    "SYNCHRONIZING INTERFACES...",
    "READY TO EXPLORE",
  ];

  const currentMessageIndex = Math.min(
    Math.floor((progress / 100) * statusMessages.length),
    statusMessages.length - 1
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const jump = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + jump, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 bg-background transition-all duration-700 select-none ${
        isDone ? 'opacity-0 pointer-events-none scale-105 filter blur-sm' : 'opacity-100'
      }`}
    >
      {/* Top Header info */}
      <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-foreground-muted">
        <span>EST. 2024</span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          SYSTEM_LOAD
        </span>
        <span>DHAKA / GLOBAL</span>
      </div>

      {/* Center Branding & Status */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <div className="relative mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-[2px] bg-gradient-to-tr from-primary to-violet-400 shadow-2xl shadow-primary/40 flex items-center justify-center backdrop-blur-md overflow-hidden">
            <img
              src="./tutul.jpg"
              alt={brandName}
              className="w-full h-full object-cover object-top rounded-[14px]"
            />
          </div>
          <div className="absolute -inset-4 bg-primary/25 rounded-full blur-xl -z-10 animate-pulse" />
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl tracking-tight uppercase mb-3">
          {brandName}
        </h1>

        <div className="font-mono text-xs text-foreground-muted uppercase tracking-wider flex items-center gap-2 h-5">
          <span>{statusMessages[currentMessageIndex]}</span>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="w-full max-w-md mx-auto space-y-3 font-mono">
        <div className="flex justify-between items-end text-xs">
          <span className="text-foreground-muted">PORTFOLIO PROTOCOL</span>
          <span className="text-primary font-semibold text-sm tabular-nums">
            {progress}%
          </span>
        </div>

        <div className="w-full h-1 bg-muted rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-primary to-violet-400 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-[10px] text-foreground-muted/70 text-center tracking-widest uppercase">
          CLICK ANYWHERE TO SKIP
        </div>
      </div>
    </div>
  );
};
