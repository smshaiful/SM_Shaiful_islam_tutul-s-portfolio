import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Fingerprint,
  ShieldCheck,
  Cpu,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Github,
  Award,
  Check,
  Terminal,
  Play
} from 'lucide-react';

interface EVotingProjectPageProps {
  onBack: () => void;
}

type KioskSimState = 'STANDBY' | 'FINGERPRINT_VERIFIED' | 'BALLOT_TOUCHED' | 'REGRET_COUNTDOWN' | 'VOTE_COMMITTED';

export const EVotingProjectPage: React.FC<EVotingProjectPageProps> = ({ onBack }) => {
  // Live Interactive Kiosk Simulator State
  const [kioskState, setKioskState] = useState<KioskSimState>('STANDBY');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(15);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Regret timer countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (kioskState === 'REGRET_COUNTDOWN' && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (kioskState === 'REGRET_COUNTDOWN' && countdown === 0) {
      setKioskState('VOTE_COMMITTED');
    }
    return () => clearTimeout(timer);
  }, [kioskState, countdown]);

  const handleStartVoting = () => {
    setKioskState('FINGERPRINT_VERIFIED');
    setSelectedCandidate(null);
    setCountdown(15);
  };

  const handleSelectCandidate = (candidate: string) => {
    setSelectedCandidate(candidate);
    setKioskState('BALLOT_TOUCHED');
  };

  const handleConfirmVote = () => {
    setCountdown(15);
    setKioskState('REGRET_COUNTDOWN');
  };

  const handleCancelVote = () => {
    setKioskState('FINGERPRINT_VERIFIED');
    setSelectedCandidate(null);
    setCountdown(15);
  };

  const handleResetKiosk = () => {
    setKioskState('STANDBY');
    setSelectedCandidate(null);
    setCountdown(15);
  };

  // Hardware components
  const hardwareComponents = [
    {
      name: 'ESP32 (WROOM-32 / 2432S028R)',
      role: 'Kiosk Controller & State Machine',
      interface: 'Wi-Fi 802.11 b/g/n + Hardware Timers',
      desc: 'Orchestrates the touch UI, communicates with R307 over hardware UART at 57600 baud, and dispatches JSON payloads with SHA-256 device tokens to the LAN server.'
    },
    {
      name: 'R307 Optical Fingerprint Sensor',
      role: 'Biometric Verification & Enrollment',
      interface: 'Hardware UART (GPIO 16 / 17)',
      desc: 'Executes 1:N on-sensor template matching. Biometric feature templates remain isolated strictly inside the sensor; zero biometric raw images are ever transferred or stored.'
    },
    {
      name: '2.8" ILI9341 TFT Display (320×240)',
      role: 'Ballot Display Interface',
      interface: 'High-Speed SPI Bus',
      desc: 'Renders candidate names and symbols using raw RGB565 streams with zero-decode overhead, eliminating image decoder library memory bloat.'
    },
    {
      name: 'XPT2046 Resistive Touch Panel',
      role: 'Ballot Touch Input Sensor',
      interface: 'Shared SPI Bus with Interrupts',
      desc: 'Detects finger coordinates on the touch ballot with instant debouncing and visual confirmation feedback.'
    },
    {
      name: 'Ubuntu PC / Laptop (LAN Server)',
      role: 'Flask + SQLite Security Backend',
      interface: 'REST / JSON over Wi-Fi LAN',
      desc: 'Enforces session timers, atomic one-vote database locks, Fernet field encryption, SHA-256 hash chains, and ReportLab PDF compilation.'
    }
  ];

  // Pinout Table
  const pinouts = [
    { pin: 'ESP32 GPIO 16 (RX2)', component: 'R307 TX', type: 'UART 57600 baud', desc: 'Receives fingerprint match verification codes' },
    { pin: 'ESP32 GPIO 17 (TX2)', component: 'R307 RX', type: 'UART 57600 baud', desc: 'Sends search/enrollment packet commands' },
    { pin: 'ESP32 GPIO 23 (MOSI)', component: 'ILI9341 / XPT2046 MOSI', type: 'Hardware SPI', desc: 'High-speed master data out for RGB565 graphics' },
    { pin: 'ESP32 GPIO 18 (SCK)', component: 'ILI9341 / XPT2046 SCK', type: 'Hardware SPI', desc: 'Clock line for display and touch controller' },
    { pin: 'ESP32 GPIO 5 (CS_TFT)', component: 'ILI9341 CS', type: 'Active LOW Chip Select', desc: 'Enables TFT display communication' },
    { pin: 'ESP32 GPIO 2 (CS_TOUCH)', component: 'XPT2046 CS', type: 'Active LOW Chip Select', desc: 'Enables resistive touch coordinate sampling' },
    { pin: 'ESP32 GPIO 19 (MISO)', component: 'XPT2046 DOUT', type: 'Hardware SPI', desc: 'Reads digitized touch X/Y coordinate frames' },
    { pin: 'ESP32 GPIO 21 (T_IRQ)', component: 'XPT2046 PENIRQ', type: 'Active LOW Interrupt', desc: 'Hardware interrupt fired on touch contact' },
    { pin: '5V / GND Rails', component: 'System Power Distribution', type: 'Regulated 5V 2A Rail', desc: 'Isolates TFT backlight surge and optical sensor power' }
  ];

  // 7 Innovations
  const innovations = [
    {
      num: '01',
      title: 'Privacy-by-Design Decoupled Schema',
      desc: 'Voter identity (voters.vote_state) and voter choice (votes) live in completely decoupled tables with no linking foreign key. Even in the event of an adversarial database dump, ballot secrecy remains mathematically inviolable.'
    },
    {
      num: '02',
      title: 'Server-Enforced 15s Regret Window',
      desc: 'Voters can cancel or alter their cast ballot within a 15-second grace period. The backend strictly validates the timestamp offset against server clocks, preventing any compromised kiosk firmware from manipulating the window.'
    },
    {
      num: '03',
      title: 'Lock-Free Concurrency Safety',
      desc: 'One-vote enforcement uses an atomic conditional SQLite UPDATE: `UPDATE voters SET vote_state=\'VOTED\' WHERE id=? AND vote_state=\'NOT_VOTED\'`. Parallel or duplicate requests fail instantly without deadlock-prone database locks.'
    },
    {
      num: '04',
      title: 'Tamper-Evident Hash-Chain Ledger',
      desc: 'Every event commits cryptographically to the SHA-256 hash of the preceding record (blockchain-inspired), reinforced by an external anchor file. Any modification, deletion, or back-dating by administrators is immediately exposed.'
    },
    {
      num: '05',
      title: 'Fernet Encryption with Blind Indexing',
      desc: 'Personal Identifiable Information (name, student roll) is encrypted at rest using AES-128 Fernet. A deterministic SHA-256 blind index allows instant duplicate-roll detection without ever exposing plaintext records.'
    },
    {
      num: '06',
      title: 'Zero-Decode Microcontroller Image Pipeline',
      desc: 'Candidate symbol PNGs uploaded by admins are converted server-side into raw 40×40 RGB565 streams via Pillow. The ESP32 pushes pixels directly with `pushImage()`, bypassing JPEG/PNG decoder libraries to conserve RAM.'
    },
    {
      num: '07',
      title: 'Stateless Kiosk Fingerprint Enrollment',
      desc: 'Fingerprint enrollment runs securely at the terminal using one-time cryptographically signed tokens (10-minute expiry via itsdangerous), eliminating the hazard of hardcoding static API secrets in client firmware.'
    }
  ];

  // Real-world problems table
  const problemComparison = [
    { problem: 'Long queues & slow manual counting', response: 'Self-service ESP32 kiosk with instant automated tally and real-time leaderboard' },
    { problem: 'Impersonation & proxy voting', response: 'Mandatory R307 optical fingerprint verification directly at the terminal' },
    { problem: 'Duplicate voting & multiple ballots', response: 'Atomic one-vote state machine strictly validated and locked backend-side' },
    { problem: 'Result delay, disputes & recount wars', response: 'Instant tabulation, auditable ReportLab PDF report, and controlled publishing' },
    { problem: 'Vote secrecy & coercion vulnerability', response: 'Decoupled schema with zero voter↔vote linkage and hidden results until certified' },
    { problem: 'Record tampering & insider admin abuse', response: 'SHA-256 hash-chain ledger + at-rest Fernet encryption + tamper verification script' },
    { problem: 'Low-literacy and non-English voters', response: 'High-contrast 2.8" touch ballot displaying candidates with visual symbol images' },
    { problem: 'Prohibitive commercial DRE costs', response: 'Sub-$30 kiosk running on standard LAN Wi-Fi with zero expensive cloud subscriptions' }
  ];

  return (
    <div className="min-h-screen bg-[#0f1b2d] text-[#eaf1fb] font-sans selection:bg-[#38bdf8] selection:text-[#0f1b2d]">
      
      {/* ──────────────────────────────────────────────
          TOP STICKY HEADER & BREADCRUMB NAVIGATION
      ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-[#0f1b2d]/95 backdrop-blur-md border-b border-[#16233a] px-4 sm:px-8 py-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#16233a] hover:bg-[#38bdf8] text-[#eaf1fb] hover:text-[#0f1b2d] border border-[#7d8ba1]/30 transition-all font-mono text-sm sm:text-base font-bold shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>← Back to Portfolio</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-sm sm:text-base font-mono text-[#7d8ba1]">
            <span>/</span>
            <span className="text-[#38bdf8] font-bold">PROJECT /03</span>
            <span>/</span>
            <span className="truncate max-w-[280px] md:max-w-none text-[#eaf1fb] font-semibold">ESP32 Smart E-Voting System</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/smshaiful"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#38bdf8]/15 hover:bg-[#38bdf8] text-[#38bdf8] hover:text-[#0f1b2d] border border-[#38bdf8]/40 transition-all font-mono text-sm sm:text-base font-bold shadow-md shadow-[#38bdf8]/20"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </header>

      {/* ──────────────────────────────────────────────
          SECTION 1 — HERO SECTION (High Impact & Cryptographic Graphics)
      ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-8 border-b border-[#16233a]">
        {/* Subtle Hash Chain Graphic Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden flex items-center justify-center font-mono text-xs text-[#38bdf8] select-none">
          <div className="grid grid-cols-4 gap-8 opacity-40">
            <div>SHA256: 8f4a...e12d ⟶</div>
            <div>BLOCK: #1042 [COMMITTED]</div>
            <div>FERNET: gAAAAAB... ⟶</div>
            <div>VOTER: [ANONYMOUS]</div>
          </div>
        </div>

        {/* Ambient Cyan Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#16233a] border-2 border-[#38bdf8]/50 text-[#38bdf8] font-mono text-sm sm:text-base font-bold uppercase tracking-widest shadow-xl">
            <Fingerprint className="w-5 h-5 text-[#38bdf8] animate-pulse" />
            <span>EMBEDDED SECURITY & TAMPER-EVIDENT IOT ARCHITECTURE</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#eaf1fb] uppercase leading-[1.05]">
            ESP32-Based <span className="text-[#38bdf8] italic">Smart E-Voting</span> System
          </h1>

          {/* Subtitle - Large & Legible */}
          <p className="max-w-3xl mx-auto text-xl sm:text-3xl text-[#7d8ba1] leading-relaxed font-sans font-normal">
            Fingerprint-verified, touch-screen electronic voting with a tamper-evident audit trail — built end-to-end on low-cost hardware.
          </p>

          {/* Role & Stack Metadata Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-3 font-mono text-sm sm:text-base">
            <span className="px-4 py-2 rounded-full bg-[#16233a] border border-[#7d8ba1]/30">
              Role: <strong className="text-[#eaf1fb]">Sole Developer (Hardware + Backend + Security)</strong>
            </span>
            <span className="px-4 py-2 rounded-full bg-[#16233a] border border-[#7d8ba1]/30">
              Firmware: <strong className="text-[#eaf1fb]">C/C++ (ESP32)</strong>
            </span>
            <span className="px-4 py-2 rounded-full bg-[#16233a] border border-[#7d8ba1]/30">
              Backend: <strong className="text-[#eaf1fb]">Python Flask + SQLite</strong>
            </span>
            <span className="px-4 py-2 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/50 text-[#38bdf8] font-bold">
              Privacy: Zero Voter-Choice Linkage
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#simulator"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-[#38bdf8]/30"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Try Live Kiosk Simulator</span>
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#16233a] hover:bg-[#1f304f] text-[#eaf1fb] font-bold text-base sm:text-lg border-2 border-[#7d8ba1]/30 hover:border-[#38bdf8]/60 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <ShieldCheck className="w-5 h-5 text-[#38bdf8]" />
              <span>Security & Cryptography Model</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 flex flex-col items-center gap-2 text-sm sm:text-base font-mono text-[#7d8ba1] animate-bounce">
            <span className="font-semibold uppercase tracking-wider">SCROLL TO EXPLORE ARCHITECTURE</span>
            <span className="text-[#38bdf8] text-xl font-bold">↓</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 2 — 3 HIGH-IMPACT STAT CARDS
      ────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-[#38bdf8]/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">Ballot Secrecy Guarantee</div>
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#38bdf8] group-hover:scale-105 transition-transform duration-300">
              100%
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              Zero Foreign-Key Linkage Between Voter & Vote
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">Server-Enforced Cancellation</div>
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#00d4a0] group-hover:scale-105 transition-transform duration-300">
              15s
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              Post-Confirmation Regret & Vote-Revision Window
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-purple-400/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">Audit Ledger Integrity</div>
            <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-purple-400 group-hover:scale-105 transition-transform duration-300">
              SHA-256
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              Blockchain-Inspired Hash Chain + External Anchor
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 3 — REAL-WORLD PROBLEMS ADDRESSED
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#38bdf8] uppercase tracking-wider font-bold">
            <span>● INSTITUTIONAL DEMOCRACY & SECURITY CHALLENGES</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Real-World <span className="text-[#38bdf8] italic">Problems Addressed</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Comparing manual paper ballot vulnerabilities against our decentralized ESP32 hardware architecture.
          </p>
        </div>

        <div className="rounded-3xl bg-[#16233a] border border-[#7d8ba1]/30 overflow-hidden shadow-2xl">
          <div className="p-6 bg-[#0f1b2d] border-b border-[#7d8ba1]/30 flex items-center justify-between">
            <span className="font-mono text-base sm:text-lg font-bold text-[#eaf1fb]">
              VULNERABILITY ASSESSMENT & PROTOCOL MITIGATION
            </span>
            <span className="font-mono text-xs sm:text-sm text-[#38bdf8] font-bold">
              8 CORE PILLARS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-base">
              <thead className="bg-[#16233a]/80 text-[#7d8ba1] border-b border-[#7d8ba1]/20 font-mono text-sm sm:text-base">
                <tr>
                  <th className="py-5 px-6 font-bold w-1/2">VULNERABILITY IN MANUAL VOTING</th>
                  <th className="py-5 px-6 font-bold w-1/2 text-[#38bdf8]">HOW THIS SYSTEM RESPONDS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7d8ba1]/15">
                {problemComparison.map((row, i) => (
                  <tr key={i} className="hover:bg-[#38bdf8]/5 transition-colors">
                    <td className="py-5 px-6 font-medium text-[#eaf1fb] flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{row.problem}</span>
                    </td>
                    <td className="py-5 px-6 text-[#7d8ba1]">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-[#00d4a0] shrink-0 mt-0.5" />
                        <span className="text-[#eaf1fb] font-semibold">{row.response}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 4 — INTERACTIVE KIOSK VOTING SIMULATOR
      ────────────────────────────────────────────── */}
      <section id="simulator" className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#38bdf8] uppercase tracking-wider font-bold">
            <span>● LIVE TERMINAL INTERFACE SIMULATION</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Interactive <span className="text-[#38bdf8] italic">Kiosk Simulator</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Experience the complete voter flow: Biometric scan ⟶ 2.8" Touch Ballot ⟶ 15-Second Regret Timer ⟶ Cryptographic Hash Ledger Commit!
          </p>
        </div>

        {/* Kiosk Display Shell */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#16233a] border-4 border-[#38bdf8]/40 p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Kiosk Top Bar */}
          <div className="flex items-center justify-between border-b border-[#7d8ba1]/25 pb-4 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00d4a0] animate-pulse" />
              <span className="font-bold text-[#eaf1fb]">ESP32 KIOSK #01 // ONLINE</span>
            </div>
            <div className="text-[#7d8ba1] text-xs sm:text-sm">
              LAN IP: 192.168.4.1 • R307 SENSOR: READY
            </div>
          </div>

          {/* SCREEN STATE 1: STANDBY */}
          {kioskState === 'STANDBY' && (
            <div className="py-12 text-center space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#38bdf8]/15 border-2 border-[#38bdf8] flex items-center justify-center text-[#38bdf8] animate-pulse">
                <Fingerprint className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#eaf1fb]">
                  Please Place Finger on Sensor
                </h3>
                <p className="text-base sm:text-lg text-[#7d8ba1] max-w-md mx-auto">
                  Touch the R307 optical biometric sensor to authenticate your voter identity.
                </p>
              </div>
              <button
                onClick={handleStartVoting}
                className="px-8 py-4 rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all shadow-xl shadow-[#38bdf8]/30"
              >
                Touch Fingerprint (Simulate Scan)
              </button>
            </div>
          )}

          {/* SCREEN STATE 2: FINGERPRINT VERIFIED / TOUCH BALLOT */}
          {kioskState === 'FINGERPRINT_VERIFIED' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-sm font-mono text-emerald-400">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>VOTER AUTHENTICATED: #ID-042 [ELIGIBLE]</span>
                </span>
                <span>SESSION TIMEOUT: 90s</span>
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
                  Select Your Preferred Candidate
                </h3>
                <p className="text-sm sm:text-base text-[#7d8ba1]">
                  Touch candidate name or symbol to mark your ballot.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Engr. A. Rahman', symbol: '📘', symbolTitle: 'Book', party: 'Independent Alliance' },
                  { name: 'Dr. Fatima Noor', symbol: '💡', symbolTitle: 'Light Bulb', party: 'Innovation Forum' },
                  { name: 'Prof. K. Hasan', symbol: '🖋️', symbolTitle: 'Pen', party: 'Research Front' },
                ].map((c) => (
                  <div
                    key={c.name}
                    onClick={() => handleSelectCandidate(c.name)}
                    className="p-6 rounded-2xl bg-[#0f1b2d] border-2 border-[#7d8ba1]/30 hover:border-[#38bdf8] hover:bg-[#38bdf8]/10 transition-all cursor-pointer text-center space-y-3 group"
                  >
                    <div className="text-5xl group-hover:scale-110 transition-transform">{c.symbol}</div>
                    <div className="font-serif text-xl font-bold text-[#eaf1fb]">{c.name}</div>
                    <div className="font-mono text-xs text-[#38bdf8] font-semibold">{c.symbolTitle} ({c.party})</div>
                    <div className="pt-2 text-xs font-mono text-foreground-muted">Touch to Select ⟶</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN STATE 3: BALLOT TOUCHED (CONFIRMATION PROMPT) */}
          {kioskState === 'BALLOT_TOUCHED' && (
            <div className="py-8 text-center space-y-6">
              <div className="p-6 rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/40 max-w-md mx-auto space-y-2">
                <div className="text-xs font-mono text-[#38bdf8] uppercase font-bold">SELECTED CHOICE</div>
                <div className="font-serif text-3xl font-bold text-[#eaf1fb]">{selectedCandidate}</div>
              </div>

              <p className="text-base sm:text-lg text-[#7d8ba1]">
                Do you want to confirm and cast this ballot into the cryptographic ledger?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmVote}
                  className="px-8 py-4 rounded-full bg-[#00d4a0] hover:bg-[#00b588] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all shadow-xl shadow-[#00d4a0]/20"
                >
                  Confirm & Submit Ballot
                </button>
                <button
                  onClick={handleCancelVote}
                  className="px-6 py-4 rounded-full bg-[#16233a] hover:bg-[#1f304f] text-[#eaf1fb] font-mono text-base font-bold border border-[#7d8ba1]/30 transition-all"
                >
                  Change Choice
                </button>
              </div>
            </div>
          )}

          {/* SCREEN STATE 4: 15-SECOND REGRET / CANCELLATION WINDOW */}
          {kioskState === 'REGRET_COUNTDOWN' && (
            <div className="py-8 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono text-sm font-bold">
                <Clock className="w-4 h-4 animate-spin" />
                <span>SERVER-ENFORCED REGRET WINDOW</span>
              </div>

              <div className="font-serif text-7xl sm:text-8xl font-bold text-[#38bdf8] animate-pulse">
                {countdown}s
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
                  Ballot Staged for Permanent Ledger Commit
                </h3>
                <p className="text-base text-[#7d8ba1] max-w-md mx-auto">
                  You have <strong className="text-white">{countdown} seconds</strong> to cancel or alter your vote before it is permanently sealed into the hash-chain.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-2">
                <button
                  onClick={handleCancelVote}
                  className="px-8 py-4 rounded-full bg-[#ff5c7c] hover:bg-[#e04363] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all shadow-xl shadow-[#ff5c7c]/20"
                >
                  Regret & Cancel Vote!
                </button>
                <button
                  onClick={() => setKioskState('VOTE_COMMITTED')}
                  className="px-6 py-4 rounded-full bg-[#00d4a0] hover:bg-[#00b588] text-[#0f1b2d] font-bold text-base font-mono transition-all"
                >
                  Seal Immediately ⟶
                </button>
              </div>
            </div>
          )}

          {/* SCREEN STATE 5: VOTE COMMITTED & HASH CHAIN SEALED */}
          {kioskState === 'VOTE_COMMITTED' && (
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#eaf1fb]">
                  Ballot Cast Successfully!
                </h3>
                <p className="text-base sm:text-lg text-[#7d8ba1] max-w-md mx-auto">
                  Your vote has been committed into the anonymous ledger. Voter status updated to <strong className="text-emerald-400 font-mono">VOTED</strong>.
                </p>
              </div>

              {/* Cryptographic Receipt Box */}
              <div className="p-5 rounded-2xl bg-[#0f1b2d] border border-[#38bdf8]/40 font-mono text-xs sm:text-sm text-left max-w-lg mx-auto space-y-1 text-[#7d8ba1]">
                <div className="text-[#38bdf8] font-bold pb-1 border-b border-[#7d8ba1]/20">
                  CRYPTOGRAPHIC LEDGER COMMIT RECEIPT:
                </div>
                <div>BLOCK INDEX : #1043</div>
                <div className="truncate">PREV HASH   : a7f89b43d2c1e8...</div>
                <div className="truncate text-emerald-400">BLOCK HASH  : 9e32f05a81bc74d89a2b...</div>
                <div>VOTER STATE : LOCKED (One-Vote Atomicity Enforced)</div>
                <div>LINKAGE     : 100% ANONYMOUS (Zero FK)</div>
              </div>

              <button
                onClick={handleResetKiosk}
                className="px-8 py-3 rounded-full bg-[#16233a] hover:bg-[#1f304f] text-[#eaf1fb] font-mono text-sm sm:text-base font-bold border border-[#7d8ba1]/30 transition-all"
              >
                Reset Kiosk for Next Voter ↻
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 5 — 7 ARCHITECTURAL INNOVATIONS
      ────────────────────────────────────────────── */}
      <section id="innovations" className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#38bdf8] uppercase tracking-wider font-bold">
            <span>● TECHNICAL NOVELTY & SYSTEM DESIGN</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            7 Key <span className="text-[#38bdf8] italic">Innovations</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Engineering breakthroughs that make institutional electronic voting secure, verifiable, and private.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {innovations.map((item) => (
            <div
              key={item.num}
              className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#38bdf8]/30 hover:border-[#38bdf8] transition-all space-y-4 shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#38bdf8] group-hover:scale-110 transition-transform">
                  /{item.num}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] font-mono text-xs font-bold uppercase">
                  PATENTED ARCHITECTURE
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#eaf1fb]">
                {item.title}
              </h3>

              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 6 — HARDWARE & SCHEMATICS
      ────────────────────────────────────────────── */}
      <section id="architecture" className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#38bdf8] uppercase tracking-wider font-bold">
            <span>● CIRCUIT SCHEMATICS & PERIPHERAL TOPOLOGY</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Hardware <span className="text-[#38bdf8] italic">& Wiring Specs</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Component interconnection between the ESP32 microcontroller, R307 optical fingerprint sensor, ILI9341 display, and XPT2046 touch panel.
          </p>
        </div>

        {/* Hardware Component Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {hardwareComponents.map((comp, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#16233a] border border-[#7d8ba1]/30 hover:border-[#38bdf8] transition-all space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#38bdf8] uppercase font-bold tracking-wider">
                  {comp.interface}
                </span>
                <Cpu className="w-5 h-5 text-[#38bdf8]" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">
                {comp.name}
              </h3>
              <div className="font-mono text-sm text-[#00d4a0] font-semibold">
                {comp.role}
              </div>
              <p className="text-base text-[#7d8ba1] leading-relaxed font-sans">
                {comp.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ASCII Architecture Block */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-[#0f1b2d] border-2 border-[#16233a] overflow-x-auto shadow-2xl">
          <div className="font-mono text-xs uppercase text-[#38bdf8] font-bold mb-4">SYSTEM TOPOLOGY BUS DIAGRAM:</div>
          <pre className="font-mono text-xs sm:text-sm text-[#eaf1fb] leading-relaxed">
{`+-------------------+        UART (57600)      +------------------+
|  R307 Fingerprint | <----------------------> |                  |
|  (on-sensor       |                          |      ESP32       |
|   templates)      |                          |  (WROOM-32 /     |
+-------------------+                          |  2432S028R)      |
+-------------------+        SPI               |                  |
| 2.8" ILI9341 TFT  | <----------------------> |  Wi-Fi HTTP      |
| 320x240 + XPT2046 |                          |  client + UI     |
| resistive touch   |                          |  state machine   |
+-------------------+                          +--------+---------+
                                                        |
                                           HTTP/JSON + device token
                                                        |
                                               +--------v---------+
                                               | Ubuntu PC/Laptop |
                                               | Flask + SQLite   |
                                               | Admin Portal     |
                                               | PDF + Ledger     |
                                               +------------------+`}
          </pre>
        </div>

        {/* Pinout Table */}
        <div className="rounded-3xl bg-[#16233a] border border-[#7d8ba1]/30 overflow-hidden shadow-2xl">
          <div className="p-6 bg-[#0f1b2d] border-b border-[#7d8ba1]/30 flex items-center justify-between">
            <span className="font-mono text-base sm:text-lg font-bold text-[#eaf1fb]">
              ESP32 GPIO HARDWARE PINOUT MAPPING TABLE
            </span>
            <span className="font-mono text-xs sm:text-sm text-[#38bdf8] font-bold">
              SPI & UART BUSES
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm sm:text-base">
              <thead className="bg-[#16233a]/80 text-[#7d8ba1] border-b border-[#7d8ba1]/20">
                <tr>
                  <th className="py-4 px-6 font-bold">ESP32 GPIO PIN</th>
                  <th className="py-4 px-6 font-bold">CONNECTED COMPONENT</th>
                  <th className="py-4 px-6 font-bold">BUS PROTOCOL</th>
                  <th className="py-4 px-6 font-bold">FUNCTIONAL DESCRIPTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7d8ba1]/15">
                {pinouts.map((p, i) => (
                  <tr key={i} className="hover:bg-[#38bdf8]/5 transition-colors">
                    <td className="py-4 px-6 text-[#38bdf8] font-bold">{p.pin}</td>
                    <td className="py-4 px-6 text-[#eaf1fb] font-semibold">{p.component}</td>
                    <td className="py-4 px-6 text-xs text-[#7d8ba1]">{p.type}</td>
                    <td className="py-4 px-6 text-sm sm:text-base text-[#7d8ba1] font-sans">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 7 — SECURITY MODEL & HONEST LIMITATIONS
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#38bdf8] uppercase tracking-wider font-bold">
            <span>● RIGOROUS THREAT MODEL & ETHICAL TRANSPARENCY</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Security Model <span className="text-[#38bdf8] italic">& Honest Limits</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            This is an academic prototype, and its boundary limits are documented transparently rather than overclaiming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-emerald-500/40 space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold uppercase">
              <ShieldCheck className="w-5 h-5" />
              <span>ACTIVE SECURITY CONTROLS</span>
            </div>
            <ul className="space-y-3 font-sans text-base sm:text-lg text-[#eaf1fb]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <span><strong>No Biometric Storage:</strong> R307 sensor holds only local mathematical templates, zero biometric photos transmitted.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Anonymous Ballots:</strong> Completely separate tables for voter state and cast votes, surviving database leaks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <span><strong>At-Rest Fernet Encryption:</strong> Voter PII encrypted; SHA-256 blind index handles uniqueness lookups.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <span><strong>Tamper-Evident Ledger:</strong> SHA-256 hash chains plus external anchor file immediately detect insider tampering.</span>
              </li>
            </ul>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-amber-500/40 space-y-4 shadow-xl">
            <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-sm font-bold uppercase">
              <AlertTriangle className="w-5 h-5" />
              <span>HONEST LIMITATIONS (ACADEMIC PROTOTYPE)</span>
            </div>
            <ul className="space-y-3 font-sans text-base sm:text-lg text-[#7d8ba1]">
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Trusted LAN HTTP:</strong> Prototype operates over local Wi-Fi without TLS/mTLS; production requires certificate pinning.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Tamper-Evident vs Tamper-Proof:</strong> An adversary with full machine control could rewrite history, but external anchors expose it.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Optical Sensor False Accepts:</strong> Biometrics serve as a practical institutional control, not absolute cryptographic identity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>No Paper VVPAT:</strong> Receipts are currently cryptographic digital commits rather than physical paper prints.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 8 — TESTING & INTEGRITY TOOLING
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#38bdf8] uppercase tracking-wider font-bold">
            <span>● 30+ TEST CASES & AUTOMATED AUDIT SCRIPTS</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Validation <span className="text-[#38bdf8] italic">& Integrity Tooling</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Automated verification utilities ensuring database consistency, zero race conditions, and tamper detection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#0f1b2d] border-2 border-[#16233a] space-y-4 shadow-xl font-mono">
            <div className="flex items-center gap-2 text-[#38bdf8] text-base font-bold">
              <Terminal className="w-5 h-5" />
              <span>python check_consistency.py</span>
            </div>
            <p className="text-sm text-[#7d8ba1] font-sans leading-relaxed">
              Cross-validates voter count against cast ballot totals, verifies state locks, detects orphaned rows, and audits the total tally before PDF publication.
            </p>
            <div className="p-4 rounded-xl bg-[#16233a] text-xs text-emerald-400 font-mono">
              ✓ 30+ Automated unit and integration tests passed<br />
              ✓ Zero race condition double-votes detected<br />
              ✓ Database consistency 100% verified
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0f1b2d] border-2 border-[#16233a] space-y-4 shadow-xl font-mono">
            <div className="flex items-center gap-2 text-purple-400 text-base font-bold">
              <Terminal className="w-5 h-5" />
              <span>python verify_ledger.py</span>
            </div>
            <p className="text-sm text-[#7d8ba1] font-sans leading-relaxed">
              Iterates through every row in the hash-chain ledger, re-computes SHA-256 block commitments, and matches the root against the independent anchor file.
            </p>
            <div className="p-4 rounded-xl bg-[#16233a] text-xs text-purple-300 font-mono">
              ✓ Hash-chain continuity: 100% intact<br />
              ✓ Root anchor checksum matches external record<br />
              ✓ Zero uncommitted edits or back-dated rows
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 9 — CREATOR PROFILE & SOLE DEVELOPER
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#16233a] border-2 border-[#38bdf8]/40 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#38bdf8] shrink-0 shadow-xl">
            <img
              src="./tutul.jpg"
              alt="SM Shaiful Islam Tutul"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38bdf8]/15 text-[#38bdf8] font-mono text-xs sm:text-sm font-bold uppercase">
              <Award className="w-4 h-4" />
              <span>Sole End-to-End System Architect</span>
            </div>
            
            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#eaf1fb]">
              SM Shaiful Islam Tutul
            </h3>

            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed max-w-2xl">
              2nd-year Electrical and Electronic Engineering (EEE) student at Jamalpur Science And Technology University (JSTU). Sole developer responsible for embedded C++ firmware, Python Flask backend, cryptographic protocols, and ReportLab PDF reporting.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 font-mono text-sm">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0f1b2d] border border-[#7d8ba1]/30 text-[#eaf1fb]">
                Dept: <strong>EEE, JSTU</strong>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#0f1b2d] border border-[#7d8ba1]/30 text-[#eaf1fb]">
                Role: <strong>Sole Firmware, Backend & Security Developer</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 10 — FOOTER & NAVIGATION
      ────────────────────────────────────────────── */}
      <footer className="py-16 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#38bdf8] hover:bg-[#0284c7] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all shadow-xl shadow-[#38bdf8]/20"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>← Back to All Projects</span>
        </button>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#16233a] hover:bg-[#1f304f] text-[#eaf1fb] font-mono text-sm sm:text-base font-bold border border-[#7d8ba1]/30 transition-all"
        >
          <span>Scroll to Top ↑</span>
        </button>
      </footer>

    </div>
  );
};
