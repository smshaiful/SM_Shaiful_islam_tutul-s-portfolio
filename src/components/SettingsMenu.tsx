import React from 'react';
import { X, Moon, Sun, Volume2, VolumeX, Cpu } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface SettingsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  performanceMode: 'high' | 'balanced' | 'low';
  onPerformanceChange: (mode: 'high' | 'balanced' | 'low') => void;
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  soundEnabled,
  onToggleSound,
  performanceMode,
  onPerformanceChange,
  onPlayClick,
  onPlayHover,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => {
          onPlayClick?.();
          onClose();
        }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Menu Card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-card border border-border shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <h3 className="font-serif text-xl uppercase tracking-tight">Preferences</h3>
          </div>
          <button
            onClick={() => {
              onPlayClick?.();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-muted text-foreground-muted hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 font-mono text-xs">
          {/* Theme Selector */}
          <div>
            <span className="text-foreground-muted uppercase tracking-wider block mb-3">
              Theme Mode
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onPlayClick?.();
                  onThemeChange('dark');
                }}
                onMouseEnter={onPlayHover}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all ${
                  theme === 'dark'
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-muted/40 text-foreground-muted hover:text-foreground'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>DARK</span>
              </button>

              <button
                onClick={() => {
                  onPlayClick?.();
                  onThemeChange('light');
                }}
                onMouseEnter={onPlayHover}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border transition-all ${
                  theme === 'light'
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border bg-muted/40 text-foreground-muted hover:text-foreground'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>LIGHT</span>
              </button>
            </div>
          </div>

          {/* Sound Toggle */}
          <div>
            <span className="text-foreground-muted uppercase tracking-wider block mb-3">
              Sound Effects
            </span>
            <button
              onClick={() => {
                onToggleSound();
                onPlayClick?.();
              }}
              onMouseEnter={onPlayHover}
              className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                soundEnabled
                  ? 'border-primary bg-primary/10 text-primary font-semibold'
                  : 'border-border bg-muted/40 text-foreground-muted hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-primary" />
                ) : (
                  <VolumeX className="w-4 h-4 opacity-50" />
                )}
                <span>UI SYNTH AUDIO</span>
              </div>
              <span className="text-[10px] uppercase font-bold">
                {soundEnabled ? 'ENABLED' : 'MUTED'}
              </span>
            </button>
          </div>

          {/* Performance Mode */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-foreground-muted uppercase tracking-wider">
                WebGL Quality
              </span>
              <Cpu className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['high', 'balanced', 'low'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    onPlayClick?.();
                    onPerformanceChange(mode);
                  }}
                  onMouseEnter={onPlayHover}
                  className={`p-2.5 rounded-xl border uppercase text-center transition-all text-[11px] ${
                    performanceMode === mode
                      ? 'border-primary bg-primary text-white font-semibold'
                      : 'border-border bg-muted/40 text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border/40 text-center font-mono text-[10px] text-foreground-muted uppercase tracking-widest">
          EMOTION DESIGN ENGINE V2.4
        </div>
      </div>
    </div>
  );
};
