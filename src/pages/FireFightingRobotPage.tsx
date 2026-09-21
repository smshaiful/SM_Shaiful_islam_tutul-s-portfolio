import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Flame,
  ShieldAlert,
  Cpu,
  RotateCw,
  Droplets,
  CheckCircle2,
  AlertTriangle,
  Github,
  Maximize2,
  X,
  Zap,
  Award
} from 'lucide-react';

interface FireFightingRobotPageProps {
  onBack: () => void;
}

type SimulationState = 'IDLE' | 'LEFT_DETECT' | 'CENTER_DETECT' | 'RIGHT_DETECT' | 'EXTINGUISHING';

export const FireFightingRobotPage: React.FC<FireFightingRobotPageProps> = ({ onBack }) => {
  // Lightbox state for gallery inspection
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Active step in the System Flow (How it Works)
  const [activeStep, setActiveStep] = useState<number>(0);

  // Live Interactive Simulator State
  const [simState, setSimState] = useState<SimulationState>('CENTER_DETECT');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // System flow steps - large, punchy points with high-impact font sizes
  const systemFlowSteps = [
    {
      step: 1,
      icon: '🔥',
      title: '3-Zone IR Array',
      subtitle: 'Phototransistor Sensing',
      highlight: 'Continuous Optical Triangulation',
      desc: 'Three onboard IR flame sensors (Left, Center, Right) continuously scan for radiation in the 760nm–1100nm infrared spectrum emitted by open flames.'
    },
    {
      step: 2,
      icon: '⚡',
      title: 'LM393 Comparators',
      subtitle: 'Signal Conditioning',
      highlight: 'Threshold Classification',
      desc: 'Onboard LM393 voltage comparators convert analog infrared readings into discrete digital low/high signals calibrated by precision trimmer potentiometers.'
    },
    {
      step: 3,
      icon: '🧠',
      title: 'Arduino UNO',
      subtitle: 'Closed-Loop Logic',
      highlight: 'Real-Time Differential Decisions',
      desc: 'The ATmega328P microcontroller computes sensor priorities instantly, deciding whether to steer left, drive forward, pivot right, or trigger suppression.'
    },
    {
      step: 4,
      icon: '🏎️',
      title: 'L298N Motor Driver',
      subtitle: 'Differential Drive',
      highlight: '4x DC Gear Motors Maneuver',
      desc: 'The dual H-bridge module energizes four geared DC drive motors, executing tight pivot turns and forward propulsion toward the heat source.'
    },
    {
      step: 5,
      icon: '🛑',
      title: 'Proximity Lock',
      subtitle: 'Emergency Stand-Off',
      highlight: 'Safe Extinguishing Perimeter',
      desc: 'Once the center sensor indicates optimal spray proximity, all drive motors immediately halt to protect the chassis from extreme thermal exposure.'
    },
    {
      step: 6,
      icon: '💦',
      title: 'Pump & Servo Sweep',
      subtitle: 'Dynamic Extinguishment',
      highlight: '180° Oscillating Water Jet',
      desc: 'An isolated transistor switch fires the high-pressure DC water pump while an MG90S metal gear servo oscillates the nozzle back-and-forth across the flame.'
    }
  ];

  // Gallery items (ONLY the 2 authentic prototype photos provided by user)
  const galleryItems = [
    {
      url: '/projects/fire-fighting-robot-tutul.png',
      caption: 'SM Shaiful Islam Tutul showcasing the assembled Autonomous Fire Fighting Robot prototype in the EEE hardware laboratory at JSTU.',
      tag: 'HARDWARE PROTOTYPE IN LAB'
    },
    {
      url: '/projects/fire-fighting-robot-team.jpg',
      caption: 'Engineering development team showcasing the Autonomous Fire Fighting Robot prototype at Jamalpur Science And Technology University (JSTU).',
      tag: 'PROJECT DEVELOPMENT TEAM'
    }
  ];

  // Hardware pinout specifications
  const hardwareSpecs = [
    { pinName: 'Sensor LEFT (OUT)', connectedTo: 'Arduino UNO Pin A0 / D9', rail: '5V Logic', function: 'Detects infrared radiation on the left perimeter' },
    { pinName: 'Sensor CENTER (OUT)', connectedTo: 'Arduino UNO Pin A1 / D10', rail: '5V Logic', function: 'Detects frontal fire and triggers proximity lock' },
    { pinName: 'Sensor RIGHT (OUT)', connectedTo: 'Arduino UNO Pin A2 / D11', rail: '5V Logic', function: 'Detects infrared radiation on the right perimeter' },
    { pinName: 'L298N IN1, IN2', connectedTo: 'Arduino UNO Pins D2, D3', rail: '5V Logic', function: 'Controls Left motor pair forward/reverse direction' },
    { pinName: 'L298N IN3, IN4', connectedTo: 'Arduino UNO Pins D4, D5', rail: '5V Logic', function: 'Controls Right motor pair forward/reverse direction' },
    { pinName: 'L298N ENA, ENB', connectedTo: 'Arduino UNO Pins D5, D6 (PWM)', rail: '5V PWM', function: 'Speed regulation for differential drive motors' },
    { pinName: 'MG90S Servo (PWM)', connectedTo: 'Arduino UNO Pin D7', rail: '5V Regulated', function: 'Pans water nozzle across 30°–150° sweep angle' },
    { pinName: 'Water Pump Switch', connectedTo: 'Arduino UNO Pin D8 (Transistor Base)', rail: '5V / 12V Rail', function: 'Drives high-current pump motor via flyback diode' },
    { pinName: 'Power Supply', connectedTo: 'Dual 18650 Li-ion Battery Pack (7.4V–12V)', rail: 'High-Current', function: 'Supplies isolated motor rail & 5V Arduino regulator' }
  ];

  // Simulator helper details
  const getSimDetails = () => {
    switch (simState) {
      case 'LEFT_DETECT':
        return {
          title: 'Flame Detected on LEFT Sector',
          action: 'PIVOT LEFT (Differential Steering)',
          sensorStatus: { left: true, center: false, right: false },
          motors: 'Left Wheels: REVERSE / STOP | Right Wheels: FORWARD',
          pump: 'OFF',
          servo: 'Centered at 90°',
          description: 'Left IR sensor triggers LOW threshold. The Arduino UNO commands the L298N motor driver to pivot the robot counter-clockwise toward the fire source.'
        };
      case 'CENTER_DETECT':
        return {
          title: 'Flame Detected in FRONT / CENTER',
          action: 'DRIVE FORWARD (Tracking Target)',
          sensorStatus: { left: false, center: true, right: false },
          motors: 'Left Wheels: FORWARD | Right Wheels: FORWARD',
          pump: 'OFF',
          servo: 'Centered at 90°',
          description: 'Center IR sensor detects intense optical radiation. The robot advances straight ahead, closing the distance to the target flame.'
        };
      case 'RIGHT_DETECT':
        return {
          title: 'Flame Detected on RIGHT Sector',
          action: 'PIVOT RIGHT (Differential Steering)',
          sensorStatus: { left: false, center: false, right: true },
          motors: 'Left Wheels: FORWARD | Right Wheels: REVERSE / STOP',
          pump: 'OFF',
          servo: 'Centered at 90°',
          description: 'Right IR sensor triggers LOW threshold. The Arduino UNO commands the L298N driver to pivot the chassis clockwise toward the fire.'
        };
      case 'EXTINGUISHING':
        return {
          title: 'Target in Proximity — SUPPRESSION ACTIVE!',
          action: 'HALT CHASSIS + ACTIVATE PUMP & SWEEP SERVO',
          sensorStatus: { left: true, center: true, right: true },
          motors: 'All Motors: EMERGENCY STOP (0 RPM)',
          pump: 'ACTIVE (High-Pressure Spray)',
          servo: 'Oscillating Dynamic Sweep (30° ↔ 150°)',
          description: 'Robot arrives within critical extinguishing radius. Drive motors halt instantly, the transistor energizes the DC water pump, and the MG90S servo pans the nozzle side-to-side to blanket the fire.'
        };
      case 'IDLE':
      default:
        return {
          title: 'Perimeter Secure — No Active Flame Detected',
          action: 'IDLE / AMBIENT MONITORING',
          sensorStatus: { left: false, center: false, right: false },
          motors: 'All Motors: STANDBY',
          pump: 'OFF',
          servo: 'Resting at 90°',
          description: 'Sensors report ambient baseline values. The robot remains in high-alert standby mode, waiting for infrared radiation above the safety threshold.'
        };
    }
  };

  const simInfo = getSimDetails();

  return (
    <div className="min-h-screen bg-[#0f1b2d] text-[#eaf1fb] font-sans selection:bg-[#ff5c7c] selection:text-[#0f1b2d]">
      
      {/* ──────────────────────────────────────────────
          TOP STICKY HEADER & BREADCRUMB NAVIGATION
      ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full bg-[#0f1b2d]/95 backdrop-blur-md border-b border-[#16233a] px-4 sm:px-8 py-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#16233a] hover:bg-[#ff5c7c] text-[#eaf1fb] hover:text-[#0f1b2d] border border-[#7d8ba1]/30 transition-all font-mono text-sm sm:text-base font-bold shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span>← Back to Portfolio</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-sm sm:text-base font-mono text-[#7d8ba1]">
            <span>/</span>
            <span className="text-[#ff5c7c] font-bold">PROJECT /02</span>
            <span>/</span>
            <span className="truncate max-w-[280px] md:max-w-none text-[#eaf1fb] font-semibold">Autonomous Fire Fighting Robot</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/smsitutul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#ff5c7c]/15 hover:bg-[#ff5c7c] text-[#ff5c7c] hover:text-[#0f1b2d] border border-[#ff5c7c]/40 transition-all font-mono text-sm sm:text-base font-bold shadow-md shadow-[#ff5c7c]/20"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </div>
      </header>

      {/* ──────────────────────────────────────────────
          SECTION 1 — HERO SECTION (High Impact & Vector Radar)
      ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-8 border-b border-[#16233a]">
        {/* Animated Radar Background Graphic */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden flex items-center justify-center">
          <div className="relative w-[600px] h-[600px] rounded-full border-2 border-[#ff5c7c]/40 flex items-center justify-center animate-pulse">
            <div className="w-[450px] h-[450px] rounded-full border border-[#ff5c7c]/30 flex items-center justify-center">
              <div className="w-[300px] h-[300px] rounded-full border border-[#ff5c7c]/20 flex items-center justify-center">
                <div className="w-[150px] h-[150px] rounded-full border border-[#ff5c7c]/40" />
              </div>
            </div>
            {/* Crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[1px] bg-[#ff5c7c]/30" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-[1px] bg-[#ff5c7c]/30" />
            </div>
          </div>
        </div>

        {/* Ambient Warm Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-[#ff5c7c]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#16233a] border-2 border-[#ff5c7c]/50 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold uppercase tracking-widest shadow-xl">
            <Flame className="w-5 h-5 text-[#ff5c7c] animate-bounce" />
            <span>1ST-YEAR ENGINEERING PROTOTYPE — JSTU EEE</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#eaf1fb] uppercase leading-[1.05]">
            Autonomous <span className="text-[#ff5c7c] italic">Fire Fighting</span> Robot
          </h1>

          {/* Subtitle - Large & Legible */}
          <p className="max-w-3xl mx-auto text-xl sm:text-3xl text-[#7d8ba1] leading-relaxed font-sans font-normal">
            A closed-loop autonomous emergency response mobile robot designed to detect, navigate toward, and extinguish hazardous fire outbreaks without human risk.
          </p>

          {/* Quick Hardware Metadata Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-3 font-mono text-sm sm:text-base">
            <span className="px-4 py-2 rounded-full bg-[#16233a] border border-[#7d8ba1]/30">
              Microcontroller: <strong className="text-[#eaf1fb]">Arduino UNO (16 MHz)</strong>
            </span>
            <span className="px-4 py-2 rounded-full bg-[#16233a] border border-[#7d8ba1]/30">
              Driver: <strong className="text-[#eaf1fb]">L298N Dual H-Bridge</strong>
            </span>
            <span className="px-4 py-2 rounded-full bg-[#16233a] border border-[#7d8ba1]/30">
              Sensors: <strong className="text-[#eaf1fb]">3x IR Flame Array</strong>
            </span>
            <span className="px-4 py-2 rounded-full bg-[#ff5c7c]/20 border border-[#ff5c7c]/50 text-[#ff5c7c] font-bold">
              Control: 100% Closed-Loop Autonomous
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#simulator"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff5c7c] hover:bg-[#e04363] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-[#ff5c7c]/30"
            >
              <RotateCw className="w-5 h-5" />
              <span>Try Live Logic Simulator</span>
            </a>
            <a
              href="#specs"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#16233a] hover:bg-[#1f304f] text-[#eaf1fb] font-bold text-base sm:text-lg border-2 border-[#7d8ba1]/30 hover:border-[#ff5c7c]/60 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <Cpu className="w-5 h-5 text-[#ff5c7c]" />
              <span>Hardware & Pinout Specs</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8 flex flex-col items-center gap-2 text-sm sm:text-base font-mono text-[#7d8ba1] animate-bounce">
            <span className="font-semibold uppercase tracking-wider">SCROLL TO EXPLORE ARCHITECTURE</span>
            <span className="text-[#ff5c7c] text-xl font-bold">↓</span>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 2 — PROJECT OVERVIEW (3 High-Impact Stat Cards)
      ────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-[#ff5c7c]/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">Optical Sensory Triangulation</div>
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#ff5c7c] group-hover:scale-105 transition-transform duration-300">
              3-Zone
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              Left • Center • Right IR Flame Array
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-[#ff8042]/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">Oscillating Water Nozzle</div>
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#ff8042] group-hover:scale-105 transition-transform duration-300">
              180°
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              MG90S Servo Dynamic Suppression Sweep
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#16233a] border border-[#16233a] hover:border-[#00d4a0]/50 transition-all text-center group shadow-xl">
            <div className="font-mono text-base uppercase tracking-widest text-[#7d8ba1] mb-2 font-bold">Decision Autonomy Level</div>
            <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-[#00d4a0] group-hover:scale-105 transition-transform duration-300">
              100%
            </div>
            <div className="mt-3 text-base sm:text-lg text-[#eaf1fb] font-semibold">
              Closed-Loop Control • Zero Human Lag
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 3 — SIGNIFICANCE & REAL-WORLD PROBLEM VS SOLUTION
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#ff5c7c] uppercase tracking-wider font-bold">
            <span>● DISASTER RESPONSE & ROBOTIC SAFETY</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Problem <span className="text-[#ff5c7c] italic">& Solution</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Bridging life-threatening industrial emergency response with affordable, autonomous hardware robotics.
          </p>
        </div>

        {/* 4 Core Pillars of Significance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-[#16233a]/80 border border-[#ff5c7c]/30 space-y-3">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-[#ff5c7c]/15 text-[#ff5c7c]">
                <Cpu className="w-6 h-6" />
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">Proof of Autonomous Control</h3>
            </div>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Demonstrates a robust closed-loop system where real-time sensor inputs immediately dictate motor trajectories and actuator firing without requiring manual radio operator oversight.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-[#16233a]/80 border border-[#00d4a0]/30 space-y-3">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-[#00d4a0]/15 text-[#00d4a0]">
                <Droplets className="w-6 h-6" />
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">Coordinated Actuation Sweep</h3>
            </div>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Seamlessly integrates sensor triggers with mechanical actuators: automatically halting at safe stand-off distance, switching the water pump, and oscillating the servo to blanket flames.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-[#16233a]/80 border border-[#ff8042]/30 space-y-3">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-[#ff8042]/15 text-[#ff8042]">
                <ShieldAlert className="w-6 h-6" />
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">Life-Saving Risk Mitigation</h3>
            </div>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Firefighting is inherently lethal. Deploying autonomous robotics as unmanned first-entry scouts into burning rooms drastically reduces human first-responder casualties.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-8 rounded-3xl bg-[#16233a]/80 border border-[#38bdf8]/30 space-y-3">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-[#38bdf8]/15 text-[#38bdf8]">
                <Zap className="w-6 h-6" />
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">Scalable & Affordable Architecture</h3>
            </div>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Engineered with accessible, low-cost commercial off-the-shelf components, proving that emergency robotics can be scaled economically for workshops, schools, and factories.
            </p>
          </div>
        </div>

        {/* Side-by-Side Problem vs Solution Cards */}
        <div className="space-y-6">
          {/* Pair 1: Extreme Human Peril */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border-2 border-[#16233a] bg-[#16233a]/60 shadow-xl">
            <div className="p-8 bg-[#ff5c7c]/5 border-b md:border-b-0 md:border-r border-[#16233a] space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-5 h-5" />
                  PROBLEM 1: Extreme Human Peril
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15 text-[#ff5c7c] font-mono text-xs sm:text-sm font-bold">
                  HIGH FATALITY
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">
                Toxic Smoke, Flashovers & Structural Collapse
              </h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Firefighters risk severe smoke inhalation, thermal flashovers, and disorientation when entering burning rooms with unknown fire epicenters.
              </p>
            </div>

            <div className="p-8 bg-[#00d4a0]/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#00d4a0] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5" />
                  SOLUTION: Unmanned First Entry
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#00d4a0]/15 text-[#00d4a0] font-mono text-xs sm:text-sm font-bold">
                  ZERO HUMAN RISK
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">
                Autonomous Scouting & Fire Suppression
              </h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                The robotic rover penetrates high-heat zones autonomously, pinpoints the flame source through optical triangulation, and initiates suppression immediately.
              </p>
            </div>
          </div>

          {/* Pair 2: Cost Barrier */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden border-2 border-[#16233a] bg-[#16233a]/60 shadow-xl">
            <div className="p-8 bg-[#ff5c7c]/5 border-b md:border-b-0 md:border-r border-[#16233a] space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-5 h-5" />
                  PROBLEM 2: Prohibitive Commercial Costs
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#ff5c7c]/15 text-[#ff5c7c] font-mono text-xs sm:text-sm font-bold">
                  $5,000 – $25,000+
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">
                Industrial Robotics Beyond Reach
              </h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Heavy industrial firefighting rovers cost tens of thousands of dollars, making deployment impossible for developing regions, small warehouses, and educational labs.
              </p>
            </div>

            <div className="p-8 bg-[#00d4a0]/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#00d4a0] font-mono text-sm sm:text-base font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5" />
                  SOLUTION: Sub-BDT 2,500 Base
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-[#00d4a0]/15 text-[#00d4a0] font-mono text-xs sm:text-sm font-bold">
                  UNDER $25 USD
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#eaf1fb]">
                Off-The-Shelf Scalable Engineering
              </h4>
              <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
                Built upon standard Arduino UNO, L298N drivers, and commercial sensors, delivering an affordable baseline easily assembled and maintained anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 4 — INTERACTIVE CLOSED-LOOP LOGIC SIMULATOR
      ────────────────────────────────────────────── */}
      <section id="simulator" className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#ff5c7c] uppercase tracking-wider font-bold">
            <span>● LIVE INTERACTIVE EMBEDDED LOGIC</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Autonomous <span className="text-[#ff5c7c] italic">Logic Simulator</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Click any fire scenario below to observe how the Arduino microcontroller calculates differential steering and activates the water pump in real time.
          </p>
        </div>

        {/* Interactive Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setSimState('LEFT_DETECT')}
            className={`px-5 py-3 rounded-full font-mono text-sm sm:text-base font-bold transition-all flex items-center gap-2 ${
              simState === 'LEFT_DETECT'
                ? 'bg-[#ff5c7c] text-[#0f1b2d] shadow-lg shadow-[#ff5c7c]/30 scale-105'
                : 'bg-[#16233a] text-[#eaf1fb] hover:bg-[#1f304f] border border-[#7d8ba1]/30'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>1. Fire on LEFT Sector</span>
          </button>

          <button
            onClick={() => setSimState('CENTER_DETECT')}
            className={`px-5 py-3 rounded-full font-mono text-sm sm:text-base font-bold transition-all flex items-center gap-2 ${
              simState === 'CENTER_DETECT'
                ? 'bg-[#ff5c7c] text-[#0f1b2d] shadow-lg shadow-[#ff5c7c]/30 scale-105'
                : 'bg-[#16233a] text-[#eaf1fb] hover:bg-[#1f304f] border border-[#7d8ba1]/30'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>2. Fire in FRONT / CENTER</span>
          </button>

          <button
            onClick={() => setSimState('RIGHT_DETECT')}
            className={`px-5 py-3 rounded-full font-mono text-sm sm:text-base font-bold transition-all flex items-center gap-2 ${
              simState === 'RIGHT_DETECT'
                ? 'bg-[#ff5c7c] text-[#0f1b2d] shadow-lg shadow-[#ff5c7c]/30 scale-105'
                : 'bg-[#16233a] text-[#eaf1fb] hover:bg-[#1f304f] border border-[#7d8ba1]/30'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>3. Fire on RIGHT Sector</span>
          </button>

          <button
            onClick={() => setSimState('EXTINGUISHING')}
            className={`px-5 py-3 rounded-full font-mono text-sm sm:text-base font-bold transition-all flex items-center gap-2 ${
              simState === 'EXTINGUISHING'
                ? 'bg-[#00d4a0] text-[#0f1b2d] shadow-lg shadow-[#00d4a0]/30 scale-105'
                : 'bg-[#16233a] text-[#00d4a0] hover:bg-[#1f304f] border border-[#00d4a0]/40'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>4. In Range: EXTINGUISHING</span>
          </button>

          <button
            onClick={() => setSimState('IDLE')}
            className={`px-5 py-3 rounded-full font-mono text-sm sm:text-base font-bold transition-all flex items-center gap-2 ${
              simState === 'IDLE'
                ? 'bg-[#7d8ba1] text-[#0f1b2d] shadow-lg scale-105'
                : 'bg-[#16233a] text-[#7d8ba1] hover:bg-[#1f304f] border border-[#7d8ba1]/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>5. Fire Out (Standby)</span>
          </button>
        </div>

        {/* Live Simulator Visualizer Dashboard */}
        <div className="rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/40 p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Top Status Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#7d8ba1]/20 pb-6">
            <div>
              <div className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#7d8ba1]">CURRENT ARDUINO CONTROL STATE</div>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#eaf1fb] mt-1">
                {simInfo.title}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff5c7c]/20 border border-[#ff5c7c]/50 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold">
              <span className="w-3 h-3 rounded-full bg-[#ff5c7c] animate-ping" />
              <span>ACTION: {simInfo.action}</span>
            </div>
          </div>

          {/* 3-Zone Sensor Indicator Bar */}
          <div>
            <div className="font-mono text-sm uppercase tracking-wider text-[#7d8ba1] mb-3 font-semibold">
              3-Zone Optical IR Sensor Array Telemetry:
            </div>
            <div className="grid grid-cols-3 gap-4 text-center font-mono">
              <div className={`p-5 rounded-2xl border-2 transition-all ${
                simInfo.sensorStatus.left
                  ? 'bg-[#ff5c7c]/20 border-[#ff5c7c] text-[#ff5c7c] shadow-lg shadow-[#ff5c7c]/20'
                  : 'bg-[#0f1b2d] border-[#7d8ba1]/20 text-[#7d8ba1]'
              }`}>
                <div className="text-xs uppercase">LEFT SENSOR (D9)</div>
                <div className="text-xl sm:text-2xl font-bold mt-1">
                  {simInfo.sensorStatus.left ? '🔥 TRIGGERED' : 'CLEAR'}
                </div>
              </div>

              <div className={`p-5 rounded-2xl border-2 transition-all ${
                simInfo.sensorStatus.center
                  ? 'bg-[#ff5c7c]/20 border-[#ff5c7c] text-[#ff5c7c] shadow-lg shadow-[#ff5c7c]/20'
                  : 'bg-[#0f1b2d] border-[#7d8ba1]/20 text-[#7d8ba1]'
              }`}>
                <div className="text-xs uppercase">CENTER SENSOR (D10)</div>
                <div className="text-xl sm:text-2xl font-bold mt-1">
                  {simInfo.sensorStatus.center ? '🔥 TRIGGERED' : 'CLEAR'}
                </div>
              </div>

              <div className={`p-5 rounded-2xl border-2 transition-all ${
                simInfo.sensorStatus.right
                  ? 'bg-[#ff5c7c]/20 border-[#ff5c7c] text-[#ff5c7c] shadow-lg shadow-[#ff5c7c]/20'
                  : 'bg-[#0f1b2d] border-[#7d8ba1]/20 text-[#7d8ba1]'
              }`}>
                <div className="text-xs uppercase">RIGHT SENSOR (D11)</div>
                <div className="text-xl sm:text-2xl font-bold mt-1">
                  {simInfo.sensorStatus.right ? '🔥 TRIGGERED' : 'CLEAR'}
                </div>
              </div>
            </div>
          </div>

          {/* Actuator State Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
            {/* Motors */}
            <div className="p-6 rounded-2xl bg-[#0f1b2d] border border-[#7d8ba1]/30 space-y-2">
              <span className="text-xs text-[#7d8ba1] uppercase font-bold">L298N Motor Driver</span>
              <div className="text-base sm:text-lg font-bold text-[#eaf1fb]">{simInfo.motors}</div>
            </div>

            {/* Water Pump */}
            <div className="p-6 rounded-2xl bg-[#0f1b2d] border border-[#7d8ba1]/30 space-y-2">
              <span className="text-xs text-[#7d8ba1] uppercase font-bold">Transistor Water Pump</span>
              <div className={`text-base sm:text-lg font-bold ${
                simState === 'EXTINGUISHING' ? 'text-[#00d4a0]' : 'text-[#7d8ba1]'
              }`}>
                {simInfo.pump}
              </div>
            </div>

            {/* Servo */}
            <div className="p-6 rounded-2xl bg-[#0f1b2d] border border-[#7d8ba1]/30 space-y-2">
              <span className="text-xs text-[#7d8ba1] uppercase font-bold">MG90S Nozzle Servo</span>
              <div className={`text-base sm:text-lg font-bold ${
                simState === 'EXTINGUISHING' ? 'text-[#ff8042]' : 'text-[#eaf1fb]'
              }`}>
                {simInfo.servo}
              </div>
            </div>
          </div>

          {/* Logic Explanation Box */}
          <div className="p-6 rounded-2xl bg-[#ff5c7c]/10 border border-[#ff5c7c]/30 text-base sm:text-lg text-[#eaf1fb] leading-relaxed">
            <strong className="text-[#ff5c7c] font-mono uppercase text-sm block mb-1">Closed-Loop Decision Process:</strong>
            {simInfo.description}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 5 — HOW IT WORKS (6-Step Interactive System Flow)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#ff5c7c] uppercase tracking-wider font-bold">
            <span>● AUTONOMOUS REACTION PIPELINE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            How It <span className="text-[#ff5c7c] italic">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            From infrared photon absorption to mechanical water suppression — a deterministic 6-step cycle.
          </p>
        </div>

        {/* Step Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {systemFlowSteps.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl font-mono text-left transition-all border-2 ${
                activeStep === idx
                  ? 'bg-[#ff5c7c] text-[#0f1b2d] border-[#ff5c7c] shadow-lg shadow-[#ff5c7c]/20 scale-105'
                  : 'bg-[#16233a] text-[#7d8ba1] border-[#16233a] hover:border-[#ff5c7c]/40 hover:text-[#eaf1fb]'
              }`}
            >
              <div className="text-2xl mb-1">{step.icon}</div>
              <div className="text-xs uppercase font-bold tracking-wider">STEP 0{step.step}</div>
              <div className={`text-sm sm:text-base font-bold truncate mt-1 ${
                activeStep === idx ? 'text-[#0f1b2d]' : 'text-[#eaf1fb]'
              }`}>
                {step.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Step Feature Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/40 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#7d8ba1]/20 pb-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{systemFlowSteps[activeStep].icon}</span>
              <div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#ff5c7c] uppercase tracking-widest">
                  STAGE 0{systemFlowSteps[activeStep].step} OF 06
                </div>
                <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#eaf1fb] mt-1">
                  {systemFlowSteps[activeStep].title}
                </h3>
              </div>
            </div>
            <span className="px-5 py-2.5 rounded-full bg-[#ff5c7c]/15 text-[#ff5c7c] font-mono text-sm sm:text-base font-bold border border-[#ff5c7c]/40">
              {systemFlowSteps[activeStep].highlight}
            </span>
          </div>

          <p className="text-xl sm:text-2xl text-[#eaf1fb] leading-relaxed font-sans">
            {systemFlowSteps[activeStep].desc}
          </p>

          <div className="flex items-center justify-between pt-4 text-sm font-mono text-[#7d8ba1]">
            <span>Continuous Sampling Loop @ 16 MHz Clock</span>
            <div className="flex items-center gap-2">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-full bg-[#0f1b2d] disabled:opacity-40 hover:bg-[#ff5c7c] hover:text-[#0f1b2d] transition-all font-bold"
              >
                ← Previous
              </button>
              <button
                disabled={activeStep === systemFlowSteps.length - 1}
                onClick={() => setActiveStep((prev) => Math.min(systemFlowSteps.length - 1, prev + 1))}
                className="px-4 py-2 rounded-full bg-[#0f1b2d] disabled:opacity-40 hover:bg-[#ff5c7c] hover:text-[#0f1b2d] transition-all font-bold"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 6 — HARDWARE SPECIFICATIONS & PINOUT TABLE
      ────────────────────────────────────────────── */}
      <section id="specs" className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#ff5c7c] uppercase tracking-wider font-bold">
            <span>● CIRCUIT TOPOLOGY & WIRING SCHEMATICS</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Hardware <span className="text-[#ff5c7c] italic">& Pinout Specs</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Detailed interconnection between the Arduino UNO microcontroller, L298N driver, IR sensors, and actuators.
          </p>
        </div>

        {/* 5 Hardware Component Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-[#ff5c7c]/30 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#ff5c7c] font-bold">CENTRAL PROCESSING UNIT</span>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">Arduino UNO (ATmega328P)</h3>
            <p className="text-base text-[#7d8ba1] leading-relaxed">
              16 MHz clock, 32KB Flash, 14 Digital I/O pins, and 6 Analog inputs executing the real-time closed-loop decision matrix.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-[#ff8042]/30 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#ff8042] font-bold">H-BRIDGE MOTOR DRIVER</span>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">L298N Dual Module</h3>
            <p className="text-base text-[#7d8ba1] leading-relaxed">
              Dual full-bridge driver delivering up to 2A peak current per channel to drive 4 geared DC motors with differential speed and direction.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-[#00d4a0]/30 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#00d4a0] font-bold">OPTICAL SENSOR ARRAY</span>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">3x IR Flame Sensors</h3>
            <p className="text-base text-[#7d8ba1] leading-relaxed">
              Equipped with LM393 comparators and sensitivity trimmers detecting flame wavelengths between 760nm and 1100nm.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-[#38bdf8]/30 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8] font-bold">DYNAMIC NOZZLE ACTUATOR</span>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">TowerPro MG90S Servo</h3>
            <p className="text-base text-[#7d8ba1] leading-relaxed">
              Metal-geared micro servo delivering 2.2 kg-cm torque to oscillate the water nozzle across a wide 180° suppression arc.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-purple-400/30 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-purple-400 font-bold">FIRE SUPPRESSION UNIT</span>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">Mini DC Submersible Pump</h3>
            <p className="text-base text-[#7d8ba1] leading-relaxed">
              5V–12V submersible centrifugal pump driven through a high-current transistor switch circuit with flyback diode protection.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-amber-400/30 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">MOBILITY DRIVE BASE</span>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">4x TT DC Gear Motors</h3>
            <p className="text-base text-[#7d8ba1] leading-relaxed">
              High-torque 1:48 gear ratio drive motors coupled to high-grip rubber wheels enabling agile zero-radius tank turns on flat surfaces.
            </p>
          </div>
        </div>

        {/* Complete Pinout Table */}
        <div className="rounded-3xl bg-[#16233a] border border-[#7d8ba1]/30 overflow-hidden shadow-2xl">
          <div className="p-6 bg-[#0f1b2d] border-b border-[#7d8ba1]/30 flex items-center justify-between">
            <div className="font-mono text-base sm:text-lg font-bold text-[#eaf1fb]">
              ARDUINO UNO ELECTRICAL PINOUT MAPPING TABLE
            </div>
            <span className="font-mono text-xs sm:text-sm text-[#ff5c7c] font-bold">
              9 ACTIVE HARDWARE CHANNELS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm sm:text-base">
              <thead className="bg-[#16233a]/80 text-[#7d8ba1] border-b border-[#7d8ba1]/20">
                <tr>
                  <th className="py-4 px-6 font-bold">PIN NAME</th>
                  <th className="py-4 px-6 font-bold">CONNECTED TO</th>
                  <th className="py-4 px-6 font-bold">VOLTAGE RAIL</th>
                  <th className="py-4 px-6 font-bold">ELECTRICAL FUNCTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#7d8ba1]/15">
                {hardwareSpecs.map((spec, i) => (
                  <tr key={i} className="hover:bg-[#ff5c7c]/5 transition-colors">
                    <td className="py-4 px-6 text-[#ff5c7c] font-bold">{spec.pinName}</td>
                    <td className="py-4 px-6 text-[#eaf1fb] font-semibold">{spec.connectedTo}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-[#0f1b2d] border border-[#7d8ba1]/30 text-xs font-bold text-[#7d8ba1]">
                        {spec.rail}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[#7d8ba1] font-sans text-sm sm:text-base">{spec.function}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 7 — ARDUINO C++ FIRMWARE LOGIC & CODE
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#ff5c7c] uppercase tracking-wider font-bold">
            <span>● EMBEDDED C++ FIRMWARE CODE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Firmware <span className="text-[#ff5c7c] italic">Logic Machine</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Deterministic closed-loop navigation, differential steering, and dynamic nozzle sweep algorithms written in Arduino C++.
          </p>
        </div>

        <div className="rounded-3xl bg-[#0f1b2d] border-2 border-[#16233a] overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-6 bg-[#16233a] border-b border-[#7d8ba1]/20 flex items-center justify-between font-mono text-sm">
            <span className="text-[#ff5c7c] font-bold">Arduino_Fire_Fighting_Robot.ino</span>
            <span className="text-[#7d8ba1]">Embedded C++ • Closed-Loop Control</span>
          </div>

          <pre className="p-6 sm:p-8 overflow-x-auto text-xs sm:text-sm md:text-base font-mono leading-relaxed text-[#eaf1fb]">
{`#include <Servo.h>

// Sensor Pin Definitions
const int SENSOR_LEFT   = 9;
const int SENSOR_CENTER = 10;
const int SENSOR_RIGHT  = 11;

// L298N Motor Driver Pins
const int IN1 = 2, IN2 = 3;  // Left Motors
const int IN3 = 4, IN4 = 5;  // Right Motors

// Actuator Pins
const int PUMP_PIN   = 8;    // Transistor base switch
const int SERVO_PIN  = 7;    // MG90S PWM signal

Servo nozzleServo;

void setup() {
  pinMode(SENSOR_LEFT, INPUT);
  pinMode(SENSOR_CENTER, INPUT);
  pinMode(SENSOR_RIGHT, INPUT);

  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  pinMode(PUMP_PIN, OUTPUT);

  digitalWrite(PUMP_PIN, LOW); // Ensure pump is OFF initially
  nozzleServo.attach(SERVO_PIN);
  nozzleServo.write(90);       // Center nozzle at 90 degrees
}

void loop() {
  int leftVal   = digitalRead(SENSOR_LEFT);
  int centerVal = digitalRead(SENSOR_CENTER);
  int rightVal  = digitalRead(SENSOR_RIGHT);

  // Optical flame sensors read LOW when infrared radiation is detected
  if (centerVal == LOW) {
    // Fire directly in front: Stop rover and commence extinguishing sequence
    haltRover();
    extinguishFire();
  } 
  else if (leftVal == LOW) {
    // Fire on left: Pivot counter-clockwise
    pivotLeft();
  } 
  else if (rightVal == LOW) {
    // Fire on right: Pivot clockwise
    pivotRight();
  } 
  else {
    // No fire detected in perimeter: Standby / Stop
    haltRover();
    digitalWrite(PUMP_PIN, LOW);
  }
}

void extinguishFire() {
  digitalWrite(PUMP_PIN, HIGH); // Turn ON high-pressure water pump
  
  // Oscillate nozzle back-and-forth across 30° to 150°
  for (int angle = 30; angle <= 150; angle += 5) {
    nozzleServo.write(angle);
    delay(25);
  }
  for (int angle = 150; angle >= 30; angle -= 5) {
    nozzleServo.write(angle);
    delay(25);
  }
  
  digitalWrite(PUMP_PIN, LOW);  // Turn OFF pump once extinguished
  nozzleServo.write(90);        // Re-center nozzle
}

void pivotLeft() {
  digitalWrite(IN1, LOW);  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
}

void pivotRight() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);  digitalWrite(IN4, HIGH);
}

void haltRover() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}`}
          </pre>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 8 — MEDIA GALLERY & PROTOTYPE SHOWCASE
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#ff5c7c] uppercase tracking-wider font-bold">
            <span>● HARDWARE PROTOTYPE INSPECTION</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Media <span className="text-[#ff5c7c] italic">Gallery</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            High-resolution visuals of the robotic chassis, circuit wiring, sensory mounts, and water spray mechanics.
          </p>
        </div>

        {/* Gallery Grid - Only 2 Authentic Prototype Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl overflow-hidden bg-[#16233a] border-2 border-[#16233a] hover:border-[#ff5c7c]/60 transition-all duration-300 shadow-2xl cursor-pointer flex flex-col"
              onClick={() => setActiveLightboxImage(item.url)}
            >
              <div className="relative h-96 sm:h-[480px] w-full overflow-hidden bg-[#0f1b2d] flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b2d] via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 rounded-full bg-[#0f1b2d]/90 backdrop-blur-md border border-[#ff5c7c]/50 text-[#ff5c7c] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
                    {item.tag}
                  </span>
                </div>

                {/* Enlarge Hint */}
                <div className="absolute top-4 right-4 p-3 rounded-full bg-[#0f1b2d]/90 backdrop-blur-md text-[#eaf1fb] group-hover:bg-[#ff5c7c] group-hover:text-[#0f1b2d] transition-all shadow-lg">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-[#16233a] border-t border-[#7d8ba1]/15 flex-grow flex flex-col justify-between">
                <p className="text-base sm:text-xl text-[#eaf1fb] font-semibold leading-relaxed">
                  {item.caption}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm sm:text-base font-mono text-[#ff5c7c] font-bold">
                  <span>Click photo to expand full resolution</span>
                  <span>⟶</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 9 — FUTURE SCOPE & UPGRADES (Engineering Vision)
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[#ff5c7c] uppercase tracking-wider font-bold">
            <span>● ENGINEERING ROADMAP & NEXT STEPS</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#eaf1fb]">
            Future Scope <span className="text-[#ff5c7c] italic">& Upgrades</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#7d8ba1]">
            Transforming the 1st-year prototype into an industrial-grade autonomous disaster response system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Upgrade 1: Thermal & UV */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-[#ff5c7c]/40 hover:border-[#ff5c7c] transition-all space-y-4 shadow-xl">
            <span className="text-4xl">🌡️</span>
            <div className="font-mono text-xs uppercase tracking-wider text-[#ff5c7c] font-bold">PILLAR 01: SENSOR ACCURACY</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">Thermal Imaging & UV Flame Detection</h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Replacing standard optical IR sensors with radiometric thermal cameras or UV flame detectors to eradicate false positive triggers caused by ambient sunlight and incandescent illumination.
            </p>
          </div>

          {/* Upgrade 2: AI & Computer Vision */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-[#ff8042]/40 hover:border-[#ff8042] transition-all space-y-4 shadow-xl">
            <span className="text-4xl">👁️</span>
            <div className="font-mono text-xs uppercase tracking-wider text-[#ff8042] font-bold">PILLAR 02: EDGE AI & CV</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">Raspberry Pi / Jetson Nano + YOLO</h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Upgrading processing to an edge computer running OpenCV and YOLO object detection models to visually classify authentic flame geometries, billowing smoke, and human casualties.
            </p>
          </div>

          {/* Upgrade 3: LiDAR & Obstacle Avoidance */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-[#00d4a0]/40 hover:border-[#00d4a0] transition-all space-y-4 shadow-xl">
            <span className="text-4xl">🗺️</span>
            <div className="font-mono text-xs uppercase tracking-wider text-[#00d4a0] font-bold">PILLAR 03: SLAM NAVIGATION</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">LiDAR Mapping & Obstacle Avoidance</h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Integrating 2D LiDAR and ultrasonic arrays to generate real-time spatial point clouds, enabling autonomous path planning around collapsed debris, furniture, and walls.
            </p>
          </div>

          {/* Upgrade 4: IoT & Remote Telemetry */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-[#38bdf8]/40 hover:border-[#38bdf8] transition-all space-y-4 shadow-xl">
            <span className="text-4xl">📡</span>
            <div className="font-mono text-xs uppercase tracking-wider text-[#38bdf8] font-bold">PILLAR 04: CLOUD TELEMETRY</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">ESP32 IoT Dashboard & RC Override</h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Adding Wi-Fi telemetry allowing command center operators to monitor live video feeds, observe environmental heat maps, and instantly switch to low-latency Manual Override.
            </p>
          </div>

          {/* Upgrade 5: Multi-Class Fire Suppression */}
          <div className="p-8 rounded-3xl bg-[#16233a] border border-purple-400/40 hover:border-purple-400 transition-all space-y-4 shadow-xl lg:col-span-2">
            <span className="text-4xl">🧯</span>
            <div className="font-mono text-xs uppercase tracking-wider text-purple-400 font-bold">PILLAR 05: VERSATILE SUPPRESSION</div>
            <h3 className="font-serif text-2xl font-bold text-[#eaf1fb]">Pressurized CO2 & Chemical Foam Dispensers</h3>
            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed">
              Equipping modular suppression payloads with pressurized CO2 canisters and aqueous film-forming foam (AFFF) to safely tackle electrical fires (Class C) and volatile chemical spills (Class B) where water is hazardous.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 10 — CREATOR PROFILE & ACADEMIC LAB
      ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-8 border-b border-[#16233a] max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/40 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#ff5c7c] shrink-0 shadow-xl">
            <img
              src="/tutul.jpg"
              alt="SM Shaiful Islam Tutul"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5c7c]/15 text-[#ff5c7c] font-mono text-xs sm:text-sm font-bold uppercase">
              <Award className="w-4 h-4" />
              <span>Project Architect & Lead Developer</span>
            </div>
            
            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#eaf1fb]">
              SM Shaiful Islam Tutul
            </h3>

            <p className="text-base sm:text-lg text-[#7d8ba1] leading-relaxed max-w-2xl">
              2nd-year Electrical and Electronic Engineering (EEE) student at Jamalpur Science And Technology University (JSTU), passionate about Neuromorphic Computing, Embedded Systems, and Signal Processing.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 font-mono text-sm">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0f1b2d] border border-[#7d8ba1]/30 text-[#eaf1fb]">
                Dept: <strong>EEE, JSTU</strong>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#0f1b2d] border border-[#7d8ba1]/30 text-[#eaf1fb]">
                Milestone: <strong>1st-Year Engineering Prototype</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          SECTION 11 — FOOTER & NAVIGATION
      ────────────────────────────────────────────── */}
      <footer className="py-16 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ff5c7c] hover:bg-[#e04363] text-[#0f1b2d] font-bold text-base sm:text-lg transition-all shadow-xl shadow-[#ff5c7c]/20"
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

      {/* ──────────────────────────────────────────────
          LIGHTBOX MODAL FOR FULL-SCREEN GALLERY VIEW
      ────────────────────────────────────────────── */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-[#0f1b2d]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxImage(null)}
        >
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#16233a] hover:bg-[#ff5c7c] text-[#eaf1fb] hover:text-[#0f1b2d] transition-all border border-[#7d8ba1]/30"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-[#16233a] border-2 border-[#ff5c7c]/50 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxImage}
              alt="High resolution prototype"
              className="w-full h-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
