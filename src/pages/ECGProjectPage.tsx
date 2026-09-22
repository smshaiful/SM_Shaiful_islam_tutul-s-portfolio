import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Github,
  Play,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ExternalLink,
  Maximize2,
  X,
  MessageCircle,
  Users,
} from 'lucide-react';

interface ECGProjectPageProps {
  onBack: () => void;
}

export const ECGProjectPage: React.FC<ECGProjectPageProps> = ({ onBack }) => {
  // Lightbox state for screenshot modal
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  
  // Active step in the System Flow (How it Works)
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // System flow steps - streamlined to main punchy points with enlarged text
  const systemFlowSteps = [
    {
      step: 1,
      icon: '👤',
      title: 'Patient',
      subtitle: 'Skin Contact',
      highlight: '3-Point Electrode Placement',
      desc: 'Skin prep on Right Arm (RA), Left Arm (LA), and Right Leg (RL ground reference) captures microvolt cardiac biopotentials during ventricular contractions.'
    },
    {
      step: 2,
      icon: '🔌',
      title: 'Electrodes',
      subtitle: 'Biopotential Sensing',
      highlight: 'Ag/AgCl Conductive Sensors',
      desc: 'Standard medical Ag/AgCl disposable adhesive patches transfer analog ionic cardiac pulses directly to the shielded front-end cable.'
    },
    {
      step: 3,
      icon: '📡',
      title: 'AD8232',
      subtitle: 'Signal Conditioning',
      highlight: 'Instrumentation Amplifier',
      desc: 'Amplifies weak microvolt signals (Gain ~100) and strips out 50Hz electrical mains hum & muscle noise through active 2-pole filters.'
    },
    {
      step: 4,
      icon: '🔲',
      title: 'Arduino Nano',
      subtitle: 'Dual-Rate Firmware',
      highlight: '250 Hz BPM + 50 Hz ECG',
      desc: 'Digitizes signals with 10-bit ADC, calculates R-peak intervals at 250 Hz, and streams 50 Hz frames over USB at 115,200 baud with zero jitter.'
    },
    {
      step: 5,
      icon: '💻',
      title: 'Python GUI',
      subtitle: 'Live Telemetry',
      highlight: '60 FPS Multi-Threaded Suite',
      desc: 'Decoupled Tkinter & Matplotlib suite graphs real-time scrolling waveforms, tracks rolling BPM, and monitors lead connectivity continuously.'
    },
    {
      step: 6,
      icon: '📄',
      title: 'PDF Report',
      subtitle: 'Clinical Paper',
      highlight: 'Medical 25mm/s Red Grid',
      desc: 'Compiles the full recording session into authentic millimeter-grid PDF sheets with rhythm statistics and 10s diagnostic strips.'
    },
    {
      step: 7,
      icon: '📱',
      title: 'WhatsApp',
      subtitle: 'Instant Delivery',
      highlight: 'Automated Telemedicine',
      desc: 'Background automation dispatches the diagnostic PDF directly to doctor or patient WhatsApp chats with zero manual effort.'
    }
  ];

  // Screenshots data for lightbox (including real team booth photo)
  const screenshots = [
    {
      url: './projects/robofusion-gui.png',
      caption: 'Live ECG Waveform: 50 Hz real-time scrolling trace with color-coded BPM gauge and WhatsApp delivery trigger.',
      tag: 'LIVE TELEMETRY GUI'
    },
    {
      url: './projects/robofusion-circuit.png',
      caption: 'Hardware Circuit Schematics: AD8232 ECG module wired to Arduino Nano (3.3V, GND, A0, D10, D11).',
      tag: 'CIRCUIT SCHEMATICS'
    },
    {
      url: './projects/clever-sapiens-team.jpg',
      caption: 'Team #34 Clever Sapiens at ROBOFUSION 1.0: Live demonstration and presentation booth at JSTU.',
      tag: 'COMPETITION BOOTH'
    },
    {
      url: './projects/robofusion-gui.png',
      caption: 'Recording Session Dashboard: Live countdown timer, lead-off safety monitor, and instant PDF report compiler.',
      tag: 'RECORDING & REPORT'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1b2d] text-[#eaf1fb] font-sans selection:bg-[#00d4a0] selection:text-[#0f1b2d]">
      
      {/* ──────────────────────────────────────────────
          TOP STICKY HEADER & BREADCRUMB NAVIGATION
      ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-[#0f1b2d]/95 backdrop-blur-md border-b border-[#16233a] px-4 sm:px-8 py-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#16233a] hover:bg-[#00d4a0] text-[#eaf1fb] hover:text-[#0f1b2d] border border-[#7d8ba1]/30 transition-all font-mono text-sm sm:text-base font-bold shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>← Back to Portfolio</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-sm sm:text-base font-mono text-[#7d8ba1]">
            <span>/</span>
            <span className="text-[#00d4a0] font-bold">ROBOFUSION 1.0</span>
            <span>/</span>
            <span className="truncate max-w-[280px] md:max-w-none text-[#eaf1fb] font-semibold">Real-Time ECG Monitoring</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/smshaiful/Project-ECG-Machine-Arduino-Nano"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#00d4a0]/15 hover:bg-[#00d4a0] text-[#00d4a0] hover:text-[#0f1b2d] border border-[#00d4a0]/40 transition-all font-mono text-sm sm:text-base font-bold shadow-md shadow-[#00d4a0]/20"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </header>

      {/* ──────────────────────────────────────────────
          SECTION 1 — HERO SECTION
      ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-8 border-b border-[#16233a]">
        {/* Animated ECG Waveform Background Line */}
        <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden flex items-center justify-center">
          <svg className="w-full h-56 sm:h-80 text-[#00d4a0]" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none">
            <path
              d="M0,100 L200,100 L230,100 L240,65 L250,135 L260,100 L280,100 L295,30 L310,180 L325,80 L340,110 L355,100 L450,100 L550,100 L580,100 L590,65 L600,135 L610,100 L630,100 L645,30 L660,180 L675,80 L690,110 L705,100 L800,100 L900,100 L930,100 L940,65 L950,135 L960,100 L980,100 L995,30 L1010,180 L1025,80 L1040,110 L1055,100 L1200,100"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-[#00d4a0]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#16233a] border-2 border-[#00d4a0]/50 text-[#00d4a0] font-mono text-sm sm:text-base font-bold uppercase tracking-widest shadow-xl">
            <Activity className="w-5 h-5 animate-pulse" />
            <span>ROBOFUSION 1.0 — National Robotics Festival</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#eaf1fb] uppercase leading-[1.05]">
            Real-Time <span className="text-[#00d4a0] italic">ECG Monitoring</span> System
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-xl sm:text-3xl text-[#7d8ba1] leading-relaxed font-sans font-normal">
            A portable, affordable cardiac monitor — built for Bangladesh's rural communities.
          </p>

          {/* Quick Hardware & Team Metadata Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-3 font-mono text-sm sm:text-base">
            <span className="px-4 py-2 rounded-full bg-[#16233a] border border-[#7d8ba1]/30">
              Team: <strong className="text-[#eaf1fb]">34. Clever Sapiens</strong>
            </span>
            <span className="px-4 py-2 rounded-full bg-[#16233a] border border-[#7d8ba1]/30">
              Dept: <strong className="text-[#eaf1fb]">EEE, JSTU</strong>
            </span>
            <span className="px-4 py-2 rounded-full bg-[#00d4a0]/20 border border-[#00d4a0]/50 text-[#00d4a0] font-bold">
              Cost: Under BDT 1,200 (~$10 USD)
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#demo"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00d4a0] hover:bg-[#00b588] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-[#00d4a0]/30"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Watch Video Demo & Screenshots</span>
            </a>
            <a
              href="https://github.com/smshaiful/Project-ECG-Machine-Arduino-Nano"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#16233a] hover:bg-[#1f304f] text-[#eaf1fb] font-bold text-base sm:text-lg border-2 border-[#7d8ba1]/30 hover:border-[#00d4a0]/60 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <Github className="w-5 h-5" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-4 h-4 text-[#7d8ba1]" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 flex flex-col items-center gap-2 text-sm sm:text-base font-mono text-[#7d8ba1] animate-bounce">
            <span className="font-semibold uppercase tracking-wider">SCROLL TO EXPLORE ARCHITECTURE</span>
            <span className="text-[#00d4a0] text-xl font-bold">↓</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 2 — PROJECT OVERVIEW (3 Stat Cards)
      ────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">Total Hardware Cost</div>
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#00d4a0] group-hover:scale-105 transition-transform duration-300">
              ৳1,200
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              Under $10 USD • 100% Off-The-Shelf Parts
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">ECG Waveform Sampling</div>
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#eaf1fb] group-hover:text-[#00d4a0] transition-colors duration-300">
              50 Hz
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              20ms Clinical Display • Zero Serial Jitter
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-[#ff5c7c]/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">Session Recording Window</div>
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#ff5c7c] group-hover:scale-105 transition-transform duration-300">
              4 min
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              Continuous Buffer • Automated PDF Report
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 3 — PROBLEM & SOLUTION (Main Points Only)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● CLINICAL & HEALTHCARE CHALLENGES</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Problem <span className="text-[#00d4a0] italic">& Solution</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Comparing conventional healthcare barriers against our low-cost portable telemetry station.
          </p>
        </div>

        <div className="space-y-6">
          {/* Pair 1: High Equipment Cost */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border-2 border-[#16233a] bg-[#16233a]/60 shadow-xl">
            <div className="p-8 bg-[#ff5c7c]/5 border-b md:border-b-0 md:border-r border-[#16233a] space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-5 h-5" />
                  PROBLEM 1: High Equipment Cost
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15 text-[#ff5c7c] font-mono text-xs sm:text-sm font-bold">
                  BDT 50,000–200,000+
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#eaf1fb] font-bold">
                Clinical machines are unaffordable for small clinics and rural families.
              </h3>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Proprietary hospital-grade 12-lead machines are locked behind costly service contracts and imported components.
              </p>
            </div>

            <div className="p-8 bg-[#00d4a0]/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#00d4a0] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5" />
                  OUR SOLUTION
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#00d4a0]/20 text-[#00d4a0] font-mono text-xs sm:text-sm font-bold">
                  Under BDT 1,200 (~$10 USD)
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#00d4a0] font-bold">
                Sub-$10 hardware built entirely with off-the-shelf open components.
              </h3>
              <p className="text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
                Uses Arduino Nano + AD8232 sensor module, slashing cardiac diagnostic hardware costs by over 95%.
              </p>
            </div>
          </div>

          {/* Pair 2: No Access in Rural Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border-2 border-[#16233a] bg-[#16233a]/60 shadow-xl">
            <div className="p-8 bg-[#ff5c7c]/5 border-b md:border-b-0 md:border-r border-[#16233a] space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-5 h-5" />
                  PROBLEM 2: No Rural Access
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15 text-[#ff5c7c] font-mono text-xs sm:text-sm font-bold">
                  &gt;60% Rural Population
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#eaf1fb] font-bold">
                Remote villages lack cardiac monitoring facilities and medical centers.
              </h3>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Patients in remote Upazilas must travel hours to divisional hospitals just for preliminary cardiac scans.
              </p>
            </div>

            <div className="p-8 bg-[#00d4a0]/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#00d4a0] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5" />
                  OUR SOLUTION
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#00d4a0]/20 text-[#00d4a0] font-mono text-xs sm:text-sm font-bold">
                  Portable Laptop Station
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#00d4a0] font-bold">
                Runs on any Windows PC or laptop — no hospital infrastructure required.
              </h3>
              <p className="text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
                USB plug-and-play station easily deployable in field clinics, community centers, and home care visits.
              </p>
            </div>
          </div>

          {/* Pair 3: Delayed Emergency Response */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border-2 border-[#16233a] bg-[#16233a]/60 shadow-xl">
            <div className="p-8 bg-[#ff5c7c]/5 border-b md:border-b-0 md:border-r border-[#16233a] space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-5 h-5" />
                  PROBLEM 3: Delayed Response
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15 text-[#ff5c7c] font-mono text-xs sm:text-sm font-bold">
                  Undetected Arrhythmias
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#eaf1fb] font-bold">
                Transient cardiac events go undetected until clinical emergency strikes.
              </h3>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Without real-time visualization, first responders lack actionable data during acute symptoms.
              </p>
            </div>

            <div className="p-8 bg-[#00d4a0]/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#00d4a0] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5" />
                  OUR SOLUTION
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#00d4a0]/20 text-[#00d4a0] font-mono text-xs sm:text-sm font-bold">
                  Instant Waveform & Alerts
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#00d4a0] font-bold">
                Live 50 Hz streaming waveform with immediate on-screen BPM alerts.
              </h3>
              <p className="text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
                Instant visual color warnings (Teal normal, Coral abnormal) empower non-specialists to recognize cardiac distress.
              </p>
            </div>
          </div>

          {/* Pair 4: Report Delivery Barrier */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border-2 border-[#16233a] bg-[#16233a]/60 shadow-xl">
            <div className="p-8 bg-[#ff5c7c]/5 border-b md:border-b-0 md:border-r border-[#16233a] space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-5 h-5" />
                  PROBLEM 4: Delivery Barrier
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15 text-[#ff5c7c] font-mono text-xs sm:text-sm font-bold">
                  Paper Reports
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#eaf1fb] font-bold">
                Patients must physically transport fragile thermal paper strips to doctors.
              </h3>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Causes dangerous diagnostic delays when cardiologists are located hundreds of miles away in cities.
              </p>
            </div>

            <div className="p-8 bg-[#00d4a0]/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#00d4a0] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5" />
                  OUR SOLUTION
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#00d4a0]/20 text-[#00d4a0] font-mono text-xs sm:text-sm font-bold">
                  Zero Manual Effort
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#00d4a0] font-bold">
                Automated clinical-grade PDF delivery straight to WhatsApp.
              </h3>
              <p className="text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
                System compiles red-grid diagnostic PDF sheets and dispatches them directly to the doctor's phone automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 4 — HOW IT WORKS (System Flow)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● END-TO-END TELEMETRY PIPELINE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            How It <span className="text-[#00d4a0] italic">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            From patient biopotential to automated WhatsApp delivery. Click any stage to inspect the key mechanism.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {systemFlowSteps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 sm:p-5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                activeStep === idx
                  ? 'bg-[#16233a] border-[#00d4a0] shadow-xl shadow-[#00d4a0]/25 scale-102 ring-1 ring-[#00d4a0]'
                  : 'bg-[#16233a]/50 border-[#16233a] hover:border-[#7d8ba1]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl sm:text-4xl">{s.icon}</span>
                <span className={`font-mono text-xs sm:text-sm font-bold px-2 py-0.5 rounded-full ${
                  activeStep === idx ? 'bg-[#00d4a0] text-[#0f1b2d]' : 'bg-[#0f1b2d] text-[#7d8ba1]'
                }`}>
                  0{s.step}
                </span>
              </div>
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#eaf1fb] truncate">{s.title}</h4>
                <p className="font-mono text-xs text-[#7d8ba1] truncate font-medium">{s.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Highlighted Stage Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#16233a] border-2 border-[#00d4a0]/50 shadow-2xl transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#7d8ba1]/20 mb-6">
            <div className="flex items-center gap-5">
              <span className="text-4xl sm:text-5xl p-3.5 rounded-2xl bg-[#0f1b2d] border border-[#16233a]">
                {systemFlowSteps[activeStep].icon}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs sm:text-sm text-[#00d4a0] uppercase tracking-wider font-bold">
                    STAGE 0{systemFlowSteps[activeStep].step} OF 07
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#00d4a0]/20 text-[#00d4a0] font-mono text-xs sm:text-sm font-bold">
                    {systemFlowSteps[activeStep].highlight}
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#eaf1fb] font-bold mt-1">
                  {systemFlowSteps[activeStep].title} — {systemFlowSteps[activeStep].subtitle}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-5 py-2.5 rounded-xl bg-[#0f1b2d] text-sm sm:text-base font-mono font-bold disabled:opacity-30 hover:bg-[#1f304f] border border-[#7d8ba1]/30 transition-colors"
              >
                ← Prev
              </button>
              <button
                disabled={activeStep === systemFlowSteps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(systemFlowSteps.length - 1, prev + 1))}
                className="px-5 py-2.5 rounded-xl bg-[#00d4a0] text-[#0f1b2d] text-sm sm:text-base font-mono font-bold disabled:opacity-30 hover:bg-[#00b588] transition-colors"
              >
                Next Step →
              </button>
            </div>
          </div>

          <p className="text-xl sm:text-2xl text-[#eaf1fb] leading-relaxed font-sans font-normal">
            {systemFlowSteps[activeStep].desc}
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 5 — SOFTWARE FEATURES (Main Points Only)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● REAL-TIME TELEMETRY SUITE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Software <span className="text-[#00d4a0] italic">Features</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Custom Python GUI built with Tkinter, Matplotlib, and PySerial for clinical responsiveness.
          </p>
        </div>

        {/* 8-Card Grid Layout (Eye-catching & Punchy) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/60 transition-all space-y-3 group shadow-xl">
            <div className="text-4xl">📈</div>
            <div className="font-mono text-xs sm:text-sm text-[#00d4a0] font-bold uppercase tracking-wider">50 Hz • 6s Window</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] group-hover:text-[#00d4a0] transition-colors">
              Live ECG Waveform
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] leading-relaxed font-normal">
              Continuous smooth scrolling trace with zero frame-freezing or buffer lag.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/60 transition-all space-y-3 group shadow-xl">
            <div className="text-4xl">❤️</div>
            <div className="font-mono text-xs sm:text-sm text-[#00d4a0] font-bold uppercase tracking-wider">Color-Coded Alert</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] group-hover:text-[#00d4a0] transition-colors">
              Real-Time BPM
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] leading-relaxed font-normal">
              Teal = Normal (60–100 BPM), Coral = Immediate alert for abnormal rhythm.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#ff5c7c]/60 transition-all space-y-3 group shadow-xl">
            <div className="text-4xl">⚠️</div>
            <div className="font-mono text-xs sm:text-sm text-[#ff5c7c] font-bold uppercase tracking-wider">Hardware Safety</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] group-hover:text-[#ff5c7c] transition-colors">
              Lead-Off Alert
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] leading-relaxed font-normal">
              Instant "CHECK ELECTRODE" banner if any sensor disconnects from the patient.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/60 transition-all space-y-3 group shadow-xl">
            <div className="text-4xl">🔌</div>
            <div className="font-mono text-xs sm:text-sm text-[#00d4a0] font-bold uppercase tracking-wider">Plug & Play</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] group-hover:text-[#00d4a0] transition-colors">
              Smart COM Port
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] leading-relaxed font-normal">
              Auto-detects Arduino Nano USB port with one-click refresh and synchronization.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/60 transition-all space-y-3 group shadow-xl">
            <div className="text-4xl">🔴</div>
            <div className="font-mono text-xs sm:text-sm text-[#00d4a0] font-bold uppercase tracking-wider">4-Minute Session</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] group-hover:text-[#00d4a0] transition-colors">
              ECG Recording
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] leading-relaxed font-normal">
              Live countdown timer (MM:SS) buffering raw telemetry for high-precision review.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/60 transition-all space-y-3 group shadow-xl">
            <div className="text-4xl">📄</div>
            <div className="font-mono text-xs sm:text-sm text-[#00d4a0] font-bold uppercase tracking-wider">Clinical Red Grid</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] group-hover:text-[#00d4a0] transition-colors">
              One-Click PDF
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] leading-relaxed font-normal">
              Generates medical 25mm/s paper reports with patient vitals & diagnostic strips.
            </p>
          </div>

          {/* Feature 7 */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/60 transition-all space-y-3 group shadow-xl">
            <div className="text-4xl">📱</div>
            <div className="font-mono text-xs sm:text-sm text-[#00d4a0] font-bold uppercase tracking-wider">Telemedicine</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] group-hover:text-[#00d4a0] transition-colors">
              Auto WhatsApp
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] leading-relaxed font-normal">
              Dispatches diagnostic PDF report directly to doctor or patient smartphone.
            </p>
          </div>

          {/* Feature 8 */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/60 transition-all space-y-3 group shadow-xl">
            <div className="text-4xl">🧵</div>
            <div className="font-mono text-xs sm:text-sm text-[#00d4a0] font-bold uppercase tracking-wider">Decoupled Daemons</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] group-hover:text-[#00d4a0] transition-colors">
              Multi-Threaded
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] leading-relaxed font-normal">
              GUI never freezes during intensive live sampling, PDF export, or file dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 6 — KEY INNOVATIONS (Eye-Catching Novelty Cards)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● ENGINEERING EXCELLENCE & NOVELTY</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Key <span className="text-[#00d4a0] italic">Innovations</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Core algorithmic and architectural breakthroughs separating this system from basic student prototypes.
          </p>
          <div className="flex justify-center items-center gap-8 text-base font-mono pt-3">
            <span className="flex items-center gap-2.5 text-[#00d4a0] font-bold">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#00d4a0] bg-[#00d4a0]/20" /> Hardware Novelties
            </span>
            <span className="flex items-center gap-2.5 text-[#ff5c7c] font-bold">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-[#ff5c7c] bg-[#ff5c7c]/20" /> Software & DSP Novelties
            </span>
          </div>
        </div>

        {/* 6 Novelty Cards (Teal for Hardware, Coral for Software) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {/* Novelty 1: DSP -> Coral */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/50 hover:border-[#ff5c7c] transition-all space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-4xl">🎯</span>
              <span className="font-mono text-xs sm:text-sm text-[#ff5c7c] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15">
                DSP NOVELTY
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
              Adaptive Self-Calibrating Threshold
            </h3>
            <div className="p-3.5 rounded-xl bg-[#0f1b2d] border border-[#ff5c7c]/30 font-mono text-sm text-[#ff5c7c] font-bold">
              ⚡ Dynamically sets threshold to 70% of previous peak
            </div>
            <ul className="space-y-2.5 text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span>Recalibrates on <strong>every single heartbeat</strong> automatically.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span>Adapts to different skin impedances with zero manual tuning.</span>
              </li>
            </ul>
          </div>

          {/* Novelty 2: Hardware/Firmware -> Teal */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#16233a] border-2 border-[#00d4a0]/50 hover:border-[#00d4a0] transition-all space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-4xl">⚡</span>
              <span className="font-mono text-xs sm:text-sm text-[#00d4a0] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#00d4a0]/15">
                FIRMWARE NOVELTY
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
              Dual-Rate Sampling Architecture
            </h3>
            <div className="p-3.5 rounded-xl bg-[#0f1b2d] border border-[#00d4a0]/30 font-mono text-sm text-[#00d4a0] font-bold">
              ⚡ 250 Hz BPM Detection + 50 Hz Live Display
            </div>
            <ul className="space-y-2.5 text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#00d4a0] font-bold">✔</span>
                <span><strong>250 Hz (every 4ms)</strong>: Catches fastest peak intervals accurately.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00d4a0] font-bold">✔</span>
                <span><strong>50 Hz (every 20ms)</strong>: Preserves serial bandwidth with zero jitter.</span>
              </li>
            </ul>
          </div>

          {/* Novelty 3: DSP -> Coral */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/50 hover:border-[#ff5c7c] transition-all space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-4xl">📐</span>
              <span className="font-mono text-xs sm:text-sm text-[#ff5c7c] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15">
                DSP NOVELTY
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
              Hysteresis-Based Falling Edge
            </h3>
            <div className="p-3.5 rounded-xl bg-[#0f1b2d] border border-[#ff5c7c]/30 font-mono text-sm text-[#ff5c7c] font-bold">
              ⚡ 80% Falling Edge Confirmation
            </div>
            <ul className="space-y-2.5 text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span>Heartbeat confirmed only after dropping below 80% threshold.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span><strong>Zero false double-counting</strong> from trailing R-peak noise.</span>
              </li>
            </ul>
          </div>

          {/* Novelty 4: DSP -> Coral */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/50 hover:border-[#ff5c7c] transition-all space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-4xl">🔄</span>
              <span className="font-mono text-xs sm:text-sm text-[#ff5c7c] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15">
                DSP NOVELTY
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
              4-Beat Circular Rolling Average
            </h3>
            <div className="p-3.5 rounded-xl bg-[#0f1b2d] border border-[#ff5c7c]/30 font-mono text-sm text-[#ff5c7c] font-bold">
              ⚡ Noise-Immune Circular Buffer
            </div>
            <ul className="space-y-2.5 text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span>Absorbs sudden motion artifacts & transient spikes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span>Prevents false 20–30 BPM jumps for stable clinical readout.</span>
              </li>
            </ul>
          </div>

          {/* Novelty 5: Telemedicine -> Coral */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/50 hover:border-[#ff5c7c] transition-all space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-4xl">💬</span>
              <span className="font-mono text-xs sm:text-sm text-[#ff5c7c] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15">
                TELEMEDICINE NOVELTY
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
              Automated WhatsApp Report
            </h3>
            <div className="p-3.5 rounded-xl bg-[#0f1b2d] border border-[#ff5c7c]/30 font-mono text-sm text-[#ff5c7c] font-bold">
              ⚡ Hardware + PDF + WhatsApp Pipeline
            </div>
            <ul className="space-y-2.5 text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span>First sub-$10 station combining acquisition + PDF + WhatsApp.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span>Sends completed 4-minute diagnostic file automatically.</span>
              </li>
            </ul>
          </div>

          {/* Novelty 6: Architecture -> Coral */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/50 hover:border-[#ff5c7c] transition-all space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-4xl">⚡</span>
              <span className="font-mono text-xs sm:text-sm text-[#ff5c7c] uppercase font-bold px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15">
                ARCHITECTURE
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
              Non-Blocking Multi-Threading
            </h3>
            <div className="p-3.5 rounded-xl bg-[#0f1b2d] border border-[#ff5c7c]/30 font-mono text-sm text-[#ff5c7c] font-bold">
              ⚡ 3 Independent Daemon Worker Threads
            </div>
            <ul className="space-y-2.5 text-base sm:text-lg text-[#eaf1fb]/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span>Serial reading, PDF generation, & delivery decoupled.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5c7c] font-bold">✔</span>
                <span><strong>GUI never freezes</strong> during recording or file dispatch.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 7 — TECHNICAL SPECIFICATIONS (8 Specs Grid)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● BENCHMARKED SYSTEM PARAMETERS</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Technical <span className="text-[#00d4a0] italic">Specifications</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Calibrated hardware and software metrics verified through physical bench testing.
          </p>
        </div>

        {/* 8-Grid Specs (Enlarged and Eye-Catching) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center space-y-2 shadow-xl">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#00d4a0]">50 Hz</div>
            <div className="font-mono text-base sm:text-lg text-[#eaf1fb] font-bold uppercase">ECG Rate</div>
            <div className="font-mono text-sm text-[#7d8ba1]">Live Waveform Stream</div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center space-y-2 shadow-xl">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#00d4a0]">250 Hz</div>
            <div className="font-mono text-base sm:text-lg text-[#eaf1fb] font-bold uppercase">BPM Rate</div>
            <div className="font-mono text-sm text-[#7d8ba1]">R-Peak Timing Loop</div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center space-y-2 shadow-xl">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#00d4a0]">30–180</div>
            <div className="font-mono text-base sm:text-lg text-[#eaf1fb] font-bold uppercase">BPM Range</div>
            <div className="font-mono text-sm text-[#7d8ba1]">Physiological Vitals</div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center space-y-2 shadow-xl">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#00d4a0]">333–2000</div>
            <div className="font-mono text-base sm:text-lg text-[#eaf1fb] font-bold uppercase">RR Range</div>
            <div className="font-mono text-sm text-[#7d8ba1]">Milliseconds Window</div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#ff5c7c]/50 transition-all text-center space-y-2 shadow-xl">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#ff5c7c]">250–850</div>
            <div className="font-mono text-base sm:text-lg text-[#eaf1fb] font-bold uppercase">Threshold</div>
            <div className="font-mono text-sm text-[#7d8ba1]">Adaptive ADC Range</div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#ff5c7c]/50 transition-all text-center space-y-2 shadow-xl">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#ff5c7c]">115,200</div>
            <div className="font-mono text-base sm:text-lg text-[#eaf1fb] font-bold uppercase">Baud Rate</div>
            <div className="font-mono text-sm text-[#7d8ba1]">Zero-Jitter USB Serial</div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#ff5c7c]/50 transition-all text-center space-y-2 shadow-xl">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#ff5c7c]">4 min</div>
            <div className="font-mono text-base sm:text-lg text-[#eaf1fb] font-bold uppercase">Max Rec.</div>
            <div className="font-mono text-sm text-[#7d8ba1]">Continuous Session</div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#ff5c7c]/50 transition-all text-center space-y-2 shadow-xl">
            <div className="font-serif text-5xl sm:text-6xl font-bold text-[#ff5c7c]">10 s</div>
            <div className="font-mono text-base sm:text-lg text-[#eaf1fb] font-bold uppercase">PDF Strip</div>
            <div className="font-mono text-sm text-[#7d8ba1]">25mm/s Grid Standard</div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 8 — DEMO & REAL EMBEDDED YOUTUBE VIDEO
      ────────────────────────────────────────────── */}
      <section id="demo" className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● VISUAL PROOF & HARDWARE ARTIFACTS</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Live <span className="text-[#00d4a0] italic">Demo & Gallery</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Watch our live project presentation video and inspect hardware circuit schematics, telemetry GUI, and team booth photos.
          </p>
        </div>

        {/* Real Embedded YouTube Video Player */}
        <div className="mb-14 rounded-3xl overflow-hidden border-2 border-[#00d4a0]/40 bg-[#16233a] aspect-video relative shadow-2xl group ring-1 ring-[#00d4a0]/30">
          <iframe
            src="https://www.youtube-nocookie.com/embed/joZa_iyXXQM"
            title="ROBOFUSION 1.0 — Real-Time ECG Monitoring System Project Demo & Presentation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Subtitle & Direct Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-[#16233a] border border-[#16233a] mb-14">
          <div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
              ROBOFUSION 1.0 Live Demo & Presentation Video
            </h4>
            <p className="text-base sm:text-lg text-[#7d8ba1] mt-1">
              Live hardware signal acquisition, lead-off safety recovery, and automated WhatsApp delivery demonstration.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://youtu.be/joZa_iyXXQM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff5c7c] hover:bg-[#ff3b61] text-white font-bold text-sm sm:text-base transition-all shadow-lg"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch on YouTube</span>
            </a>
            <a
              href="https://github.com/smshaiful/Project-ECG-Machine-Arduino-Nano"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#16233a] hover:bg-[#1f304f] text-[#eaf1fb] font-bold text-sm sm:text-base border border-[#7d8ba1]/30 hover:border-[#00d4a0]/50 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* 4 Screenshot & Photo Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {screenshots.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setActiveLightboxImage(s.url)}
              className="group cursor-pointer rounded-3xl overflow-hidden border-2 border-[#16233a] hover:border-[#00d4a0] bg-[#16233a] transition-all duration-300 hover:shadow-2xl hover:shadow-[#00d4a0]/25 flex flex-col"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-black/60">
                <img
                  src={s.url}
                  alt={s.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 font-mono text-xs sm:text-sm px-3 py-1 rounded-full bg-[#0f1b2d]/90 text-[#00d4a0] border border-[#00d4a0]/40 font-bold">
                  {s.tag}
                </div>
                <div className="absolute inset-0 bg-[#0f1b2d]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-sm sm:text-base font-mono text-[#eaf1fb] font-bold">
                  <Maximize2 className="w-5 h-5 text-[#00d4a0]" />
                  <span>Click to Expand</span>
                </div>
              </div>
              <div className="p-5 flex-grow flex items-center">
                <p className="text-base sm:text-lg text-[#7d8ba1] group-hover:text-[#eaf1fb] transition-colors leading-relaxed font-medium">
                  {s.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-10 flex flex-col items-center justify-center animate-in fade-in"
        >
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#16233a] text-white hover:bg-[#00d4a0] hover:text-[#0f1b2d] transition-colors shadow-xl"
          >
            <X className="w-7 h-7" />
          </button>
          <img
            src={activeLightboxImage}
            alt="ECG Diagram Lightbox"
            className="max-h-[88vh] max-w-full rounded-2xl object-contain border-2 border-[#7d8ba1]/30 shadow-2xl"
          />
          <div className="mt-4 font-mono text-base text-[#7d8ba1]">Click anywhere outside or press ESC to close</div>
        </div>
      )}

      {/* ──────────────────────────────────────────────
          SECTION 9 — FUTURE WORK (6 Horizontal Cards)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● RESEARCH ROADMAP</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Future <span className="text-[#00d4a0] italic">Work & Expansion</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Next developmental phases for clinical translation, embedded machine learning, and multi-lead telemetry.
          </p>
        </div>

        {/* 6 Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="text-4xl p-3.5 rounded-2xl bg-[#0f1b2d] border border-[#16233a]">📶</div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-[#eaf1fb] mb-1">Wi-Fi/BLE via ESP32</h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Wireless transmission replacing physical USB tethering for complete patient mobility.
              </p>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="text-4xl p-3.5 rounded-2xl bg-[#0f1b2d] border border-[#16233a]">🤖</div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-[#eaf1fb] mb-1">Arrhythmia ML Model</h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                On-device 1D-CNN or hardware SNN classification of abnormal heartbeats in real time.
              </p>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="text-4xl p-3.5 rounded-2xl bg-[#0f1b2d] border border-[#16233a]">📱</div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-[#eaf1fb] mb-1">Mobile App Companion</h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Native Flutter Android/iOS companion application with Bluetooth live telemetry.
              </p>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="text-4xl p-3.5 rounded-2xl bg-[#0f1b2d] border border-[#16233a]">☁️</div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-[#eaf1fb] mb-1">Cloud Records Archive</h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Secure cloud vault for longitudinal patient cardiac telemetry tracking over months.
              </p>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="text-4xl p-3.5 rounded-2xl bg-[#0f1b2d] border border-[#16233a]">🏥</div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-[#eaf1fb] mb-1">12-Lead ECG System</h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Clinical-grade multi-lead expansion for full hospital ward emergency monitoring.
              </p>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="text-4xl p-3.5 rounded-2xl bg-[#0f1b2d] border border-[#16233a]">🔋</div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-[#eaf1fb] mb-1">Battery Housing</h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Custom 3D-printed enclosure with Li-ion battery and medical lead jacks for field use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 10 — OPEN SOURCE & DOCUMENTATION
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-5xl mx-auto text-center">
        <div className="space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● REPRODUCIBLE OPEN SCIENCE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Open Source & <span className="text-[#00d4a0] italic">Documentation</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1] max-w-2xl mx-auto">
            Full firmware, Python GUI code, circuit wiring diagrams, and bill-of-materials are freely available.
          </p>
        </div>

        {/* 3 Large Link Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="https://github.com/smshaiful/Project-ECG-Machine-Arduino-Nano"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#00d4a0] hover:bg-[#00b588] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all transform hover:-translate-y-1 shadow-2xl shadow-[#00d4a0]/30"
          >
            <Github className="w-5 h-5" />
            <span>Full Documentation on GitHub</span>
          </a>

          <a
            href="https://youtu.be/joZa_iyXXQM"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#ff5c7c] hover:bg-[#ff3b61] text-white font-bold text-base sm:text-lg transition-all transform hover:-translate-y-1 shadow-xl"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Demo Video on YouTube</span>
          </a>

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#16233a] hover:bg-[#1f304f] text-[#eaf1fb] font-bold text-base sm:text-lg border-2 border-[#7d8ba1]/30 hover:border-[#00d4a0]/50 transition-all transform hover:-translate-y-1 shadow-lg"
          >
            <MessageCircle className="w-5 h-5 text-[#00d4a0]" />
            <span>Contact Us on Facebook</span>
          </a>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 11 — TEAM SECTION (With Real Booth Photo)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
            <span>● THE MINDS BEHIND THE PROJECT</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Team <span className="text-[#00d4a0] italic">Clever Sapiens</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Team #34 • Department of Electrical and Electronic Engineering (EEE), Jamalpur Science And Technology University (JSTU).
          </p>
        </div>

        {/* Competition Booth Photo Showcase */}
        <div
          onClick={() => setActiveLightboxImage('./projects/clever-sapiens-team.jpg')}
          className="group relative mb-14 rounded-3xl overflow-hidden border-2 border-[#00d4a0]/40 bg-[#16233a] shadow-2xl cursor-pointer"
        >
          <div className="aspect-[16/9] w-full overflow-hidden">
            <img
              src="./projects/clever-sapiens-team.jpg"
              alt="Clever Sapiens Team #34 at ROBOFUSION 1.0"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full bg-[#00d4a0] text-[#0f1b2d] uppercase">
                  TEAM #34 — ROBOFUSION 1.0
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-white font-bold mt-2">
                  Clever Sapiens Live at the National Robotics Festival Booth
                </h3>
                <p className="text-sm sm:text-base text-[#7d8ba1] mt-1 font-mono">
                  JSTU EEE Department Project Demonstration & Presentation
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#00d4a0] bg-[#0f1b2d]/80 px-4 py-2 rounded-full border border-[#00d4a0]/30 font-bold">
                <Maximize2 className="w-4 h-4" />
                <span>Click to View Full Photo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid (All 4 Members from the Banner) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Member 1: SM Shaiful Islam Tutul (Lead) */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#00d4a0] text-center space-y-4 shadow-xl shadow-[#00d4a0]/15 ring-1 ring-[#00d4a0]/30">
            <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#00d4a0] p-1 shadow-lg shadow-[#00d4a0]/30">
              <img
                src="./tutul.jpg"
                alt="SM Shaiful Islam Tutul"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#00d4a0]/20 text-[#00d4a0] uppercase">
                TEAM LEAD
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] mt-2">
                SM Shaiful Islam Tutul
              </h3>
              <p className="font-mono text-sm text-[#00d4a0] font-semibold mt-1">
                Hardware & Software Lead
              </p>
              <p className="text-xs sm:text-sm text-[#7d8ba1] mt-1">
                Embedded Systems & Telemetry Developer
              </p>
            </div>
          </div>

          {/* Member 2: Dhruba Acharjee */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center space-y-4 shadow-xl">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#0f1b2d] border-2 border-[#7d8ba1]/30 flex items-center justify-center text-3xl text-[#00d4a0]">
              <Users className="w-10 h-10" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0f1b2d] text-[#7d8ba1] uppercase">
                MEMBER
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] mt-2">
                Dhruba Acharjee
              </h3>
              <p className="font-mono text-sm text-[#7d8ba1] font-semibold mt-1">
                Hardware Testing & Assembly
              </p>
              <p className="text-xs sm:text-sm text-[#7d8ba1] mt-1">
                JSTU, Dept. of EEE
              </p>
            </div>
          </div>

          {/* Member 3: Nahiyan Mokarrim Khan */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center space-y-4 shadow-xl">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#0f1b2d] border-2 border-[#7d8ba1]/30 flex items-center justify-center text-3xl text-[#00d4a0]">
              <Users className="w-10 h-10" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0f1b2d] text-[#7d8ba1] uppercase">
                MEMBER
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] mt-2">
                Nahiyan Mokarrim Khan
              </h3>
              <p className="font-mono text-sm text-[#7d8ba1] font-semibold mt-1">
                Bio-Signal Calibration
              </p>
              <p className="text-xs sm:text-sm text-[#7d8ba1] mt-1">
                JSTU, Dept. of EEE
              </p>
            </div>
          </div>

          {/* Member 4: Sanot Kumer Ghosh */}
          <div className="p-7 rounded-3xl bg-[#16233a] border-2 border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center space-y-4 shadow-xl">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#0f1b2d] border-2 border-[#7d8ba1]/30 flex items-center justify-center text-3xl text-[#00d4a0]">
              <Users className="w-10 h-10" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#0f1b2d] text-[#7d8ba1] uppercase">
                MEMBER
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#eaf1fb] mt-2">
                Sanot Kumer Ghosh
              </h3>
              <p className="font-mono text-sm text-[#7d8ba1] font-semibold mt-1">
                Technical Documentation
              </p>
              <p className="text-xs sm:text-sm text-[#7d8ba1] mt-1">
                JSTU, Dept. of EEE
              </p>
            </div>
          </div>
        </div>

        {/* Official Certificate of Participation Showcase */}
        <div className="mt-20 pt-16 border-t border-[#16233a]">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#00d4a0] uppercase tracking-wider font-bold">
              <span>● COMPETITION ACCREDITATION</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#eaf1fb]">
              Certificate of <span className="text-[#00d4a0] italic">Participation</span>
            </h3>
            <p className="text-base sm:text-lg text-[#7d8ba1]">
              Awarded for active and enthusiastic participation in "WALTON Presents ROBOFUSION 1.0", organized by UFTB Robotics Club, University of Frontier Technology, Bangladesh.
            </p>
          </div>

          <div
            onClick={() => setActiveLightboxImage('./projects/robofusion-participation-certificate.png')}
            className="group relative max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-[#00d4a0]/50 bg-[#16233a] shadow-2xl cursor-pointer hover:border-[#00d4a0] transition-all duration-300 hover:shadow-[#00d4a0]/25"
          >
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/40">
              <img
                src="./projects/robofusion-participation-certificate.png"
                alt="ROBOFUSION 1.0 Certificate of Participation - SM Shaiful Islam Tutul"
                className="w-full h-full object-contain p-3 sm:p-6 group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="p-6 sm:p-8 bg-[#16233a] border-t border-[#16233a] flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#00d4a0] uppercase font-bold mb-1">
                  <span>WALTON PRESENTS ROBOFUSION 1.0</span>
                  <span>•</span>
                  <span>NATIONAL ROBOTICS FESTIVAL</span>
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                  Official Certificate of Participation
                </h4>
                <p className="text-xs sm:text-sm text-[#7d8ba1] mt-1 font-mono">
                  Awarded to: SM Shaiful Islam Tutul • Team #34 Clever Sapiens (JSTU)
                </p>
              </div>

              <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[#00d4a0] bg-[#0f1b2d] px-5 py-2.5 rounded-full border border-[#00d4a0]/40 font-bold group-hover:bg-[#00d4a0] group-hover:text-[#0f1b2d] transition-all">
                <Maximize2 className="w-4 h-4" />
                <span>Click to View Full Size</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 12 — FOOTER
      ────────────────────────────────────────────── */}
      <footer className="py-14 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left font-mono text-base text-[#7d8ba1]">
        <div>
          <p className="text-[#eaf1fb] font-bold text-lg">© 2025 Clever Sapiens — Department of EEE, JSTU</p>
          <p className="text-[#7d8ba1] text-sm mt-1">Team #34 • Built for ROBOFUSION 1.0 — National Robotics Festival</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/smshaiful/Project-ECG-Machine-Arduino-Nano"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#eaf1fb] hover:text-[#00d4a0] transition-colors font-bold text-base"
          >
            <Github className="w-5 h-5" />
            <span>GitHub Repository</span>
          </a>
          <button
            onClick={onBack}
            className="text-[#00d4a0] hover:underline font-bold text-base"
          >
            ↑ Back to Top
          </button>
        </div>
      </footer>
    </div>
  );
};
