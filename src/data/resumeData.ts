import { PortfolioData } from '../types/resume';

/**
 * =========================================================================
 * RESUME & PORTFOLIO DATA CONFIGURATION
 * =========================================================================
 * SM Shaiful Islam Tutul — EEE Student at JSTU
 * Hardware SNN | Neuromorphic Computing | Embedded Systems | Biomedical Engineering | Python
 */

export const resumeData: PortfolioData = {
  personalInfo: {
    name: "SM SHAIFUL ISLAM TUTUL",
    title: "2nd-Year EEE Student @ JSTU | Neuromorphic Computing & Embedded Systems",
    tagline: "Hardware SNN | Neuromorphic Computing | Embedded Systems | Biomedical Engineering | Python",
    shortBio: "2nd-year EEE student at JSTU, Bangladesh, passionate about Neuromorphic Computing, Embedded Systems, and Signal Processing.",
    detailedBio: "I'm SM Shaiful Islam Tutul, a 2nd-year EEE student at JSTU, Bangladesh, passionate about Neuromorphic Computing, Embedded System and Signal Processing. Currently building a hardware SNN-based RC Vehicle Controller. Python is my primary tool for simulations and research experiments, and I'm also exploring Brian2 and Qiskit. I'm actively looking for research collaboration with professors in these fields.",
    location: "JSTU, Jamalpur, Bangladesh",
    timezone: "Asia/Dhaka",
    email: "smshaifulislam46@gmail.com",
    phone: "01798955785",
    availability: "Actively seeking research collaboration with professors & research labs",
    resumePdfUrl: "./SM_Shaiful_Islam_Tutul_Resume.pdf",
    socials: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/sm-shaiful-islam-tutul-3a6423389/", index: "01", handle: "sm-shaiful-islam-tutul" },
      { name: "GitHub", url: "https://github.com/smshaiful", index: "02", handle: "@smshaiful" },
      { name: "Email", url: "mailto:smshaifulislam46@gmail.com", index: "03", handle: "smshaifulislam46@gmail.com" },
    ],
  },

  heroPhases: [
    {
      tag: "EEE STUDENT // JSTU",
      title: "EEE Student at JSTU ↪",
      italicWord: "Neuromorphic",
      subtitle: "Computing & Hardware SNN",
      description: "2nd-year EEE student at Jamalpur Science And Technology University, exploring brain-inspired computing, spiking neural architectures, and edge hardware efficiency.",
    },
    {
      tag: "EMBEDDED SYSTEMS // HARDWARE",
      title: "Building hardware SNN ↪",
      italicWord: "Vehicle",
      subtitle: "Controllers & Robotics",
      description: "Currently developing a hardware SNN-based RC Vehicle Controller — combining embedded systems, real-time sensor loops, and spiked neural processing.",
    },
    {
      tag: "SIMULATION & COLLABORATION",
      title: "Python, Brian2 ↪ &",
      italicWord: "Biomedical",
      subtitle: "Signal Processing",
      description: "Simulating neural dynamics and quantum systems with Python, Brian2, and Qiskit. Actively looking for research collaboration with professors.",
    },
  ],

  capabilities: [
    {
      id: "neuromorphic",
      num: "01",
      title: "Neuromorphic Computing & SNNs",
      subtitle: "Brain-inspired silicon & spiking neural dynamics",
      description: "Investigating Spiking Neural Networks (SNNs), event-driven computing architectures, STDP learning rules, and energy-efficient bio-inspired computing paradigms.",
      tags: ["Hardware SNN", "Brian2", "Spike Dynamics", "Neuromorphic Architectures", "STDP"],
    },
    {
      id: "embedded",
      num: "02",
      title: "Embedded Systems & Hardware",
      subtitle: "Microcontrollers, robotics & edge implementations",
      description: "Designing embedded circuits, microcontrollers, sensor integration, and motor control systems for autonomous vehicles and physical robotics prototypes.",
      tags: ["Embedded C/C++", "Hardware SNN Controller", "Microcontrollers", "Sensors", "Circuit Design"],
    },
    {
      id: "signal",
      num: "03",
      title: "Signal Processing & Biomedical",
      subtitle: "Bio-signal filtration, spectral analysis & telemetry",
      description: "Analyzing physiological and electrical signals, developing digital filters (FIR/IIR), wavelet transforms, and biomedical telemetry data pipelines.",
      tags: ["Biomedical Engineering", "Digital Signal Processing", "EEG/ECG Analysis", "Filtering", "SciPy"],
    },
    {
      id: "simulation",
      num: "04",
      title: "Python Simulations & Quantum",
      subtitle: "Scientific computing, modeling & exploratory quantum",
      description: "Executing mathematical modeling and scientific simulations with Python, simulating complex neural networks with Brian2, and exploring quantum circuits via Qiskit.",
      tags: ["Python", "NumPy", "Matplotlib", "Brian2", "Qiskit", "Scientific Computing"],
    },
  ],

  skills: {
    "Core Domains": ["Neuromorphic Computing", "Hardware SNN", "Embedded Systems", "Biomedical Engineering", "Signal Processing"],
    "Simulations & AI": ["Brian2", "Python (Scientific Stack)", "NumPy", "SciPy", "Matplotlib", "Qiskit (Quantum)"],
    "Hardware & Tools": ["Microcontrollers", "Embedded C/C++", "Sensors & Actuators", "Circuit Simulation", "Oscilloscopes"],
    "Academic & Research": ["Literature Review", "Research Methodology", "Mathematical Modeling", "Technical Documentation"],
  },

  projects: [
    {
      id: "robofusion-ecg",
      num: "/01",
      title: "ROBOFUSION 1.0: Real-Time ECG Monitoring & Telemedicine System",
      status: "COMPLETED",
      category: "biomedical",
      type: "Biomedical Engineering & Embedded Telemedicine",
      date: "ROBOFUSION 1.0",
      year: "2024",
      team: "Clever Sapiens (JSTU)",
      scope: ["Biomedical DSP", "Embedded Systems", "Python GUI", "Telemedicine"],
      stack: ["Arduino Nano", "AD8232 ECG Module", "Python", "Tkinter", "Matplotlib", "PySerial", "PyAutoGUI"],
      featuredImage: "./projects/robofusion-gui.png",
      gallery: [
        "./projects/robofusion-gui.png",
        "./projects/robofusion-circuit.png",
        "./projects/clever-sapiens-team.jpg",
        "./projects/robofusion-participation-certificate.png",
      ],
      accentColor: "#00d4a0",
      description: "A portable, low-cost Electrocardiogram (ECG) monitoring station designed around the AD8232 sensor and Arduino Nano, paired with a custom dark-mode Python desktop telemetry suite that acquires heart waveforms, detects BPM in real time, generates medical red-grid PDF reports, and automatically dispatches them via WhatsApp.",
      realWorldProblem: "Cardiovascular monitoring is critical for preventive health, yet clinical 12-lead ECG machines cost thousands of dollars, are non-portable, and are inaccessible in rural clinics and home-care settings. Patients experiencing transient cardiac abnormalities cannot obtain rapid, shareable diagnostics without hospital visits. This project creates an affordable, portable sub-$20 diagnostic system that captures analog heart waveforms and instantly shares clinical-grade PDF reports with physicians.",
      features: [
        "High-Speed Serial Streaming: Continuous 20ms analog sampling with zero-jitter frame synchronization at 115200 baud.",
        "Real-Time BPM Peak Detection: Onboard threshold-crossing detection on the R-wave peak (THRESH = 470) constrained to physiological RR windows (333ms–2000ms) to reject false noise.",
        "Automatic Lead-Off Detection: Continuous monitoring of AD8232 LO+ / LO- pins with instant state reset to 'ECG:0,BPM:0' and GUI warning alert whenever an electrode disconnects.",
        "Multi-Threaded Desktop GUI: Python Tkinter interface using dedicated daemon SerialReaderThread and queue buffers, ensuring a smooth 60fps scrolling Matplotlib waveform without UI freezing.",
        "Clinical-Standard Red-Grid PDF Generation: Compiles session recordings into multi-page PDF reports with authentic red millimeter graph paper (#fff0f0, major 1.0s / minor 0.2s grid) and patient vitals header.",
        "Automated WhatsApp Telemedicine Delivery: Automated dispatching pipeline via PowerShell clipboard buffers and PyAutoGUI, sending the PDF directly to patient or doctor WhatsApp chats.",
      ],
      innovation: "Designed an asynchronous dual-layer architecture combining real-time embedded firmware with a decoupled Python monitoring suite. The system replaces expensive proprietary clinical interfaces with open-source computing, generating authentic millimeter-grid PDF diagnostic sheets and dispatching them through consumer mobile messaging without requiring costly cloud infrastructure.",
      novelty: "A self-contained, low-cost biomedical telemetry pipeline that merges hardware R-wave peak timing, automated electrode safety recovery, and zero-touch WhatsApp clinical report delivery developed for the ROBOFUSION 1.0 competition by team Clever Sapiens (JSTU).",
      highlights: [
        "Sub-$20 Total Bill-of-Materials (BOM)",
        "Zero-Phase Hardware Lead-Off Detection & Auto-Recovery",
        "Clinical Millimeter-Grid PDF Generation via Matplotlib",
        "Automated WhatsApp Telemedicine Delivery Pipeline",
      ],
      hardwareSpecs: [
        { pinName: "AD8232 VCC", connectedTo: "Arduino Nano 3.3V", function: "Regulated analog supply rail (3.3V Max)" },
        { pinName: "AD8232 GND", connectedTo: "Arduino Nano GND", function: "Common system ground reference" },
        { pinName: "AD8232 OUTPUT", connectedTo: "Arduino Nano A0", function: "Amplified analog ECG waveform voltage" },
        { pinName: "AD8232 LO+", connectedTo: "Arduino Nano D10", function: "Lead-off positive electrode status detection" },
        { pinName: "AD8232 LO-", connectedTo: "Arduino Nano D11", function: "Lead-off negative electrode status detection" },
        { pinName: "Electrodes (3-Lead)", connectedTo: "RA, LA, RL (Body)", function: "Right Arm (RA), Left Arm (LA), Right Leg (RL Ground Reference)" },
      ],
      codeSnippets: [
        {
          title: "Arduino Firmware (R-Wave Detection & 115200 Baud Stream)",
          language: "cpp",
          code: `const int LO_PLUS = 10, LO_MINUS = 11, THRESH = 470;
const unsigned long MIN_RR = 333, MAX_RR = 2000;
unsigned long lastPeakMs = 0, lastEcgPrintMs = 0, lastBpmSampleMs = 0;
int bpm = 0, ecgVal = 0;
bool leadOff = false, aboveThresh = false;

void detectBPM(int val) {
  if (val > THRESH && !aboveThresh) {
    unsigned long now = millis();
    if (lastPeakMs > 0) {
      unsigned long rr = now - lastPeakMs;
      if (rr >= MIN_RR && rr <= MAX_RR) bpm = (int)(60000UL / rr);
    }
    lastPeakMs = now;
    aboveThresh = true;
  } else if (val <= THRESH) aboveThresh = false;
}`,
        },
        {
          title: "Python GUI (Clinical Red-Grid PDF Generation)",
          language: "python",
          code: `def _style_ecg_strip(ax):
    ax.set_facecolor("#fff0f0")
    ax.set_ylim(0, 1023)
    ax.xaxis.set_minor_locator(MultipleLocator(0.2))
    ax.xaxis.set_major_locator(MultipleLocator(1.0))
    ax.yaxis.set_minor_locator(MultipleLocator(51.15))
    ax.yaxis.set_major_locator(MultipleLocator(204.6))
    ax.grid(which="minor", color="#ffc4c4", linewidth=0.3)
    ax.grid(which="major", color="#ff8080", linewidth=0.6)
    for spine in ax.spines.values():
        spine.set_color("#e08080")`,
        },
      ],
      reportAbstract: "This project documents the design and implementation of a low-cost, real-time Electrocardiogram (ECG) monitoring system built around the AD8232 single-lead ECG sensor module and an Arduino Nano microcontroller. Developed for the ROBOFUSION 1.0 competition under the team name Clever Sapiens (JSTU), it provides live waveform plotting, lead-off detection alerts, session recording, automated PDF report generation, and automated WhatsApp delivery.",
      liveUrl: "https://github.com/smshaiful/Project-ECG-Machine-Arduino-Nano",
      githubUrl: "https://github.com/smshaiful/Project-ECG-Machine-Arduino-Nano",
    },
    {
      id: "fire-fighting-robot",
      num: "/02",
      title: "Autonomous Fire Fighting Robot",
      status: "COMPLETED",
      category: "hardware",
      type: "Autonomous Robotics & Hazard Response",
      date: "1ST-YEAR ENGINEERING PROTOTYPE",
      year: "2024",
      team: "SM Shaiful Islam Tutul (JSTU EEE)",
      scope: ["Autonomous Navigation", "IR Sensor Array", "L298N Motor Driver", "Emergency Suppression"],
      stack: ["Arduino UNO", "L298N Motor Driver", "3x IR Flame Sensors", "MG90S Servo", "Mini DC Water Pump", "Arduino C++"],
      featuredImage: "./projects/fire-fighting-robot-tutul.png",
      gallery: [
        "./projects/fire-fighting-robot-tutul.png",
        "./projects/fire-fighting-robot-team.jpg",
      ],
      accentColor: "#ff5c7c",
      description: "An autonomous mobile robotics prototype developed as a 1st-year engineering proof-of-concept that detects fire outbreaks via optical triangulation, autonomously navigates toward the heat source, and extinguishes flames using an oscillating servo-controlled water pump.",
      realWorldProblem: "Firefighting is inherently lethal. Smoke inhalation, flashovers, and sudden structural collapse endanger human first responders entering hazardous environments with unknown fire epicenters. This prototype acts as an autonomous, unmanned first-entry scout that reaches flames before human exposure, significantly mitigating casualty risks.",
      features: [
        "3-Zone Optical Triangulation: Continuous Left, Center, and Right IR flame sensing in the 760nm–1100nm spectrum.",
        "Closed-Loop Real-Time Steering: Arduino UNO differential drive commands to the L298N module for autonomous tracking.",
        "Proximity Stand-Off Lock: Detects optimal suppression range and halts drive motors immediately to prevent thermal damage.",
        "Dynamic 180° Servo Sweeping Spray: An MG90S servo motor oscillates the water pump nozzle back-and-forth across 30°–150° to blanket the flame.",
        "Isolated Transistor Switching: Safe, flyback-protected DC pump activation isolating motor back-EMF spikes from the Arduino logic.",
      ],
      innovation: "Demonstrates closed-loop autonomous decision-making using accessible commercial components, coordinating optical detection, differential propulsion, and dynamic servo water sweeping in a unified hardware architecture.",
      novelty: "A low-cost, self-contained robotic disaster-response platform developed as a 1st-year engineering prototype proving scalable automation for harsh, high-temperature industrial and home environments.",
      highlights: [
        "Sub-৳2,500 Total Bill-of-Materials (BOM)",
        "3-Zone IR Flame Optical Triangulation Array",
        "180° Dynamic Servo Water Nozzle Suppression Sweep",
        "100% Autonomous Closed-Loop Decision Execution",
      ],
      hardwareSpecs: [
        { pinName: "Sensor LEFT (OUT)", connectedTo: "Arduino UNO Pin A0 / D9", function: "Detects infrared radiation on left perimeter" },
        { pinName: "Sensor CENTER (OUT)", connectedTo: "Arduino UNO Pin A1 / D10", function: "Detects frontal fire & triggers proximity lock" },
        { pinName: "Sensor RIGHT (OUT)", connectedTo: "Arduino UNO Pin A2 / D11", function: "Detects infrared radiation on right perimeter" },
        { pinName: "L298N IN1, IN2", connectedTo: "Arduino UNO Pins D2, D3", function: "Left motor pair forward/reverse control" },
        { pinName: "L298N IN3, IN4", connectedTo: "Arduino UNO Pins D4, D5", function: "Right motor pair forward/reverse control" },
        { pinName: "MG90S Servo (PWM)", connectedTo: "Arduino UNO Pin D7", function: "Water nozzle oscillation (30°–150° sweep)" },
        { pinName: "DC Water Pump", connectedTo: "Arduino UNO Pin D8 (Transistor)", function: "High-pressure water pump activation" },
      ],
      codeSnippets: [
        {
          title: "Arduino C++ (Autonomous Steering & Suppression Loop)",
          language: "cpp",
          code: `void loop() {
  int leftVal = digitalRead(SENSOR_LEFT);
  int centerVal = digitalRead(SENSOR_CENTER);
  int rightVal = digitalRead(SENSOR_RIGHT);

  if (centerVal == LOW) {
    haltRover();
    extinguishFire(); // Sweep servo & fire pump
  } else if (leftVal == LOW) {
    pivotLeft();
  } else if (rightVal == LOW) {
    pivotRight();
  } else {
    haltRover();
  }
}`,
        },
      ],
      reportAbstract: "This project showcases an autonomous fire-fighting robot developed as a 1st-year engineering prototype at JSTU. By leveraging an Arduino UNO, L298N motor driver, 3x IR flame sensors, and an oscillating servo water pump, the robot detects fire sources autonomously, maneuvers towards them, and extinguishes the flames.",
      liveUrl: "https://github.com/smshaiful",
      githubUrl: "https://github.com/smshaiful",
    },
    {
      id: "esp32-evoting",
      num: "/03",
      title: "ESP32-Based Smart E-Voting System",
      status: "COMPLETED",
      category: "hardware",
      type: "Embedded Security & IoT Systems",
      date: "COMPLETED PROTOTYPE",
      year: "2024",
      team: "SM Shaiful Islam Tutul (Sole Developer)",
      scope: ["Embedded Firmware", "Flask Backend", "Applied Cryptography", "R307 Biometrics", "Tamper-Evident Ledger"],
      stack: ["C/C++ (Arduino/ESP32)", "Python (Flask)", "SQLite", "R307 Fingerprint", "2.8\" ILI9341 TFT", "Fernet / SHA-256", "ReportLab"],
      featuredImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      ],
      accentColor: "#38bdf8",
      description: "Fingerprint-verified, touch-screen electronic voting with a tamper-evident hash-chain audit trail and privacy-by-design architecture, built end-to-end on low-cost hardware for institutional elections.",
      realWorldProblem: "Manual paper voting suffers from long queues, slow counting, voter impersonation, duplicate ballots, result tampering, and high infrastructure costs. This standalone ESP32 kiosk operates on a local Wi-Fi LAN with zero cloud dependencies, offering instantaneous tallies, cryptographic ballot verification, and complete voter anonymity.",
      features: [
        "R307 Optical Biometric Verification: On-sensor template matching where templates never leave the sensor and no raw biometric images are stored.",
        "2.8\" ILI9341 Color Touch Ballot: Candidate names and symbols rendered directly using raw RGB565 streams with zero-decode overhead.",
        "Server-Enforced 15-Second Regret Window: Back-end validated post-confirmation cancellation window allowing voters to change their choice.",
        "Privacy-by-Design Decoupled Schema: Voter identity and voter ballot choices are completely separated across tables with zero foreign keys.",
        "Atomic Lock-Free Concurrency: Guaranteed one-vote enforcement using atomic conditional UPDATE operations preventing race conditions.",
        "Tamper-Evident SHA-256 Hash-Chain Ledger: Sequential cryptographic commit chains plus external anchor file exposing any record manipulation.",
        "Field-Level Fernet Encryption with Blind Index: Encrypts PII at rest while preserving duplicate roll searchability.",
      ],
      innovation: "A privacy-by-design decoupled voting architecture where voter identity and ballot choice share no linking foreign key, paired with a server-enforced 15s regret cancellation window, a blockchain-inspired hash ledger, and server-rendered raw RGB565 microcontroller graphics.",
      novelty: "A self-contained, low-cost institutional e-voting station developed end-to-end by sole developer SM Shaiful Islam Tutul, operating completely on local Wi-Fi LAN without cloud dependencies.",
      highlights: [
        "Privacy-First Zero-Link Voter/Vote Architecture",
        "15-Second Server-Enforced Regret Cancellation Window",
        "Cryptographic SHA-256 Hash-Chain Tamper-Evident Ledger",
        "Sub-$30 Total Kiosk Hardware Cost (ESP32 + R307 + TFT)",
      ],
      hardwareSpecs: [
        { pinName: "R307 UART RX/TX", connectedTo: "ESP32 GPIO 16, 17", function: "57600 baud optical fingerprint communication" },
        { pinName: "ILI9341 SPI (MOSI/SCK/CS)", connectedTo: "ESP32 GPIO 23, 18, 5", function: "320x240 color ballot display" },
        { pinName: "XPT2046 Touch SPI", connectedTo: "ESP32 GPIO 19, 21, 2", function: "Resistive touch coordinate sensing" },
        { pinName: "Power Supply", connectedTo: "5V 2A Micro-USB / Li-ion Rail", function: "Powers ESP32, TFT backlight, and optical sensor" },
        { pinName: "Wi-Fi Interface", connectedTo: "Internal 2.4 GHz 802.11 b/g/n", function: "LAN HTTP/REST API with device-token authentication" },
      ],
      codeSnippets: [
        {
          title: "Atomic One-Vote Concurrency Safety (Python Flask / SQLite)",
          language: "python",
          code: `# Atomic conditional UPDATE ensures zero race conditions or double votes
cursor.execute(
    "UPDATE voters SET vote_state='VOTED', voted_at=? WHERE id=? AND vote_state='NOT_VOTED'",
    (now_iso, voter_id)
)
if cursor.rowcount == 0:
    return jsonify({"error": "Voter already cast a ballot or invalid state"}), 409`,
        },
      ],
      reportAbstract: "A complete e-voting prototype for institutional elections. Voters are authenticated by fingerprint at an ESP32 kiosk, cast a symbol-based touch ballot under a server-enforced time policy, and results are computed instantly, published as a controlled PDF, and recorded in a hash-chain ledger. The database never stores a link between a voter and their choice.",
      liveUrl: "https://github.com/smshaiful",
      githubUrl: "https://github.com/smshaiful",
    },
    {
      id: "snn-rc-controller",
      num: "/04",
      title: "Hardware SNN-based RC Vehicle Controller",
      status: "IN PROGRESS",
      category: "hardware",
      type: "Neuromorphic Hardware & Embedded Robotics",
      date: "ACTIVE DEVELOPMENT",
      year: "2025",
      team: "Tutul Lab (JSTU)",
      scope: ["Hardware SNN", "Neuromorphic Computing", "Embedded Systems", "Robotics"],
      stack: ["Hardware SNN", "Embedded C", "Python", "Microcontrollers", "Ultrasonic & IR Sensors"],
      featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
      ],
      accentColor: "#9047ff",
      description: "An autonomous mobile robotics controller governed by a physical hardware Spiking Neural Network (SNN), calculating real-time motor trajectories and obstacle avoidance via event-driven low-power neural spikes.",
      realWorldProblem: "Conventional autonomous vehicles rely on compute-heavy deep learning architectures that require power-hungry GPUs consuming dozens of watts. For miniature edge robots and battery-powered micro-vehicles, this creates thermal throttling and rapid battery drain. Neuromorphic SNN hardware resolves this by executing sparse event-driven spikes only when sensors detect changes.",
      features: [
        "Event-Driven Spike Processing: Silicon-level spike integration that consumes power only during sensory events.",
        "Sub-5ms Reaction Latency: Reflexive motor commands generated directly from sensor threshold crossings.",
        "Autonomous Obstacle Avoidance: Integrated multi-sensor feedback loop driving dynamic differential steering.",
        "Telemetry Logging Bridge: Real-time spike train and trajectory telemetry streaming to Python for analysis.",
      ],
      innovation: "Direct implementation of spiking neuron models onto physical microcontroller and hardware circuits, executing edge inference without remote cloud connectivity or heavy GPUs.",
      novelty: "Deploying a biological spike-timing motor control loop on a physical RC vehicle prototype to demonstrate neuromorphic energy conservation on mobile robotics.",
      highlights: [
        "Under Active Prototype Assembly & Firmware Testing",
        "Sub-5ms Event-Driven Reflex Latency",
        "Over 80% Projected Energy Reduction vs Traditional CNNs",
      ],
      liveUrl: "https://github.com/smshaiful",
      githubUrl: "https://github.com/smshaiful",
    },
  ],

  experience: [
    {
      period: "2024 — PRESENT",
      role: "Undergraduate Researcher & Project Lead",
      company: "JSTU EEE Department Lab",
      location: "Jamalpur, Bangladesh",
      description: "Leading hands-on development on neuromorphic hardware, embedded systems prototyping, and computational bio-signal processing research.",
      achievements: [
        "Engineered the ROBOFUSION 1.0 real-time ECG telemetry station and automated WhatsApp dispatching pipeline.",
        "Conceptualized and actively building the hardware SNN-based RC Vehicle Controller.",
        "Developed the ESP32-Based Smart E-Voting System with privacy-by-design cryptography and biometric verification.",
      ],
      tech: ["Hardware SNN", "Python", "Embedded C", "ESP32", "AD8232", "Signal Processing"],
    },
    {
      period: "2023 — PRESENT",
      role: "EEE Student Researcher",
      company: "Jamalpur Science And Technology University (JSTU)",
      location: "Jamalpur, Bangladesh",
      description: "Dedicated to academic excellence in Electrical and Electronic Engineering while pursuing specialized research in Neuromorphic Computing.",
      achievements: [
        "Maintaining strong academic coursework across Circuit Theory, Electronics, Signals & Systems.",
        "Independently investigating emerging literature in neuromorphic engineering and quantum computing.",
        "Actively preparing proposals for undergraduate research grants and professor mentorship.",
      ],
      tech: ["Circuit Analysis", "MATLAB", "Python", "Qiskit", "Biomedical Systems"],
    },
  ],

  education: [
    {
      degree: "Bachelor of Science in Electrical and Electronic Engineering (EEE)",
      institution: "Jamalpur Science And Technology University (JSTU)",
      period: "2nd Year (2023 — 2027 expected)",
      location: "Jamalpur, Bangladesh",
      details: "Specializing in Neuromorphic Computing, Embedded Systems, Signal Processing, and Biomedical Engineering.",
      result: "Currently Enrolled (2nd Year)",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Guthia Ideal College",
      period: "Completed",
      location: "Bangladesh",
      result: "GPA 4.50 / 5.00",
      details: "Science division with advanced coursework in Physics, Chemistry, and Higher Mathematics.",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "Narayanpur Palli Union Institution",
      period: "Completed",
      location: "Bangladesh",
      result: "GPA 5.00 / 5.00",
      details: "Science division with perfect GPA 5.00 academic benchmark.",
    },
  ],

  certificates: [
    {
      id: "gp-personal-branding-ai",
      title: "Personal Branding in AI Era",
      issuer: "Grameenphone Ltd.",
      poweredBy: "Grameenphone Academy",
      date: "15th September 2026",
      code: "GPA-AI-2026",
      imageUrl: "./certificates/grameenphone-personal-branding-ai.png",
      skills: ["Personal Branding", "Artificial Intelligence", "AI Era Strategy", "Professional Identity", "Leadership"],
    },
    {
      id: "google-image-captioning",
      title: "Create Image Captioning Models",
      issuer: "Simplilearn SkillUP",
      poweredBy: "Google Cloud",
      date: "20th September 2026",
      code: "10758835",
      imageUrl: "./certificates/google-cloud-image-captioning.png",
      skills: ["Computer Vision", "Deep Learning", "Image Captioning", "AI Modeling", "Google Cloud"],
    },
    {
      id: "google-genai-studio",
      title: "Introduction to Generative AI Studio",
      issuer: "Simplilearn SkillUP",
      poweredBy: "Google Cloud",
      date: "29th August 2026",
      code: "10664073",
      imageUrl: "./certificates/google-cloud-genai-studio.png",
      skills: ["Generative AI", "Google Cloud GenAI Studio", "Prompt Engineering", "Foundation Models", "LLMs"],
    },
  ],

  awards: [
    {
      platform: "ROBOFUSION 1.0 — National Robotics Festival",
      count: 1,
      certificateImage: "./certificates/robofusion-participation-certificate.png",
      certificateTitle: "Certificate of Participation — ROBOFUSION 1.0",
      honors: [
        "Certificate of Participation — Active & Enthusiastic Participation (UFTB Robotics Club)",
        "Real-Time ECG Monitoring System Demonstration (Team #34 Clever Sapiens, JSTU)",
        "Excellence in Biomedical Embedded Systems Prototyping",
      ],
    },
  ],

  stats: [
    { label: "Completed Projects", value: "3", suffix: " Done" },
    { label: "In Active Development", value: "1", suffix: " SNN" },
    { label: "Core Domains", value: "4", suffix: "+" },
    { label: "Collaboration", value: "OPEN", suffix: "" },
  ],

  aiQuestions: [
    {
      category: "ROBOFUSION 1.0 ECG",
      question: "What is the ROBOFUSION 1.0 ECG project?",
      answer: "ROBOFUSION 1.0 is a real-time ECG monitoring and telemedicine station developed by team Clever Sapiens at Jamalpur Science And Technology University using an AD8232 sensor and Arduino Nano. It streams heart waveforms at 115200 baud to a custom Python desktop GUI, detects BPM, generates medical-standard red-grid PDF reports, and automatically dispatches them via WhatsApp.",
    },
    {
      category: "ESP32 E-Voting System",
      question: "What is the ESP32-Based Smart E-Voting System?",
      answer: "A fingerprint-verified, touch-screen electronic voting kiosk built on ESP32 with an R307 sensor and ILI9341 TFT. It features a privacy-by-design database schema where voter identity and ballot choice have no linking foreign key, a server-enforced 15-second regret window, and a SHA-256 hash-chain audit trail.",
    },
    {
      category: "Hardware SNN Controller",
      question: "What project are you currently building?",
      answer: "I am currently building a hardware SNN-based RC Vehicle Controller. It uses physical Spiking Neural Networks implemented on edge hardware to achieve energy-efficient, sub-5ms low-latency obstacle avoidance and motor control.",
    },
    {
      category: "Research Collaboration",
      question: "Are you open to research collaboration with professors?",
      answer: "Yes, absolutely! I am actively seeking research collaboration with professors and researchers in Neuromorphic Computing, SNN hardware, Embedded Systems, and Signal Processing. You can email me directly at smshaifulislam46@gmail.com or call 01798955785.",
    },
    {
      category: "Tools & Skills",
      question: "What programming languages and simulation tools do you use?",
      answer: "Python is my primary tool for simulations, mathematical modeling, and research experiments. In addition, I use Brian2 for spiking neural network simulations, Qiskit for quantum circuits, and Embedded C/C++ for hardware control.",
    },
  ],
};
