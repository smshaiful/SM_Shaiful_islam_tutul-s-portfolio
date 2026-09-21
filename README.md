# Emotion Agency Clone & Portfolio / Resume Website

A high-performance, award-winning portfolio and resume website faithfully inspired by **[Emotion Agency](https://emotion-agency.com/)** (`Interfaces People Remember`).

Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Three.js / WebGL**, and native **Web Audio API** procedural sound synthesis.

---

## ✨ Features & Architecture

- **Cinematic Storytelling Hero Section**: 5-phase sticky scroll narrative replicating Emotion Agency's signature hero states, high-contrast serif typography with italics, and curved glyphs (`↪`).
- **Interactive 3D Fluid Particle Background**: Real-time WebGL/Three.js fluid particle field and wireframe icosahedron responding to cursor tracking, scroll depth, and theme changes.
- **Central Resume & Portfolio Configuration (`src/data/resumeData.ts`)**: Edit a single file to update your name, bio, capabilities, technical stack, projects, career experience, education, awards, and AI knowledge base.
- **Recruiter AI Assistant ("Portfolio AI")**: Floating morphing gradient orb button opening an interactive chat drawer pre-loaded with recruiter Q&As and direct action triggers.
- **Interactive Sound Synthesizer & Audio Visualizer**: Procedural UI sound effects (click, switch, hover, success) synthesized with native Web Audio API (no heavy audio files, zero network latency).
- **Dark & Light Mode**: Seamless theme switching with exact Emotion Agency design tokens (`#121212`, `#f5efff`, `#9047ff`).
- **Performance Modes**: Toggle between High, Balanced, and Low WebGL particle quality for optimal performance on all devices.
- **Project Showcase & Detail Modal**: Filterable project gallery with scope tags, stack badges, and deep-dive case study modals.
- **Career Timeline & Education**: Dedicated section for work history, key achievements, metrics, and academic foundation.
- **Awards & Accolades**: Metric counters and platform-specific recognitions (Awwwards, CSSDA, Behance, Codrops).
- **Interactive Contact Drawer ("Let's Talk")**: Direct inquiry form, email copy button, phone link, Calendly meeting trigger, and PDF resume download.
- **Responsive Mobile Navigation**: Floating bottom dock pill with burger toggle and full-screen blur sheet menu.
- **Custom Magnetic Cursor**: Fluid trailing magnetic cursor with hover state expansion and blend inversion (desktop).

---

## 🚀 Quick Start

### 1. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📝 How to Add Your Resume Information

All website content is managed in a single, well-documented file:

👉 **[`src/data/resumeData.ts`](./src/data/resumeData.ts)**

### What you can customize:
1. **`personalInfo`**:
   - `name`: Your full name.
   - `title`: Professional headline (e.g., Senior Full-Stack Engineer).
   - `tagline`: Short high-impact statement.
   - `shortBio` & `detailedBio`: Your personal introduction and philosophy.
   - `location` & `timezone`: Your city and timezone (powers the live local clock in the footer).
   - `email` & `phone`: Contact details.
   - `socials`: Your GitHub, LinkedIn, Twitter/X, Behance, etc.

2. **`heroPhases`**:
   - 5 customized storytelling slides for the pinned scroll hero.

3. **`capabilities` & `skills`**:
   - Technical areas, descriptions, and categorized skill lists.

4. **`projects`**:
   - Title, category (`website`, `product`, `ai-ml`), dates, scope, tech stack, screenshots, live demo links, and GitHub links.

5. **`experience` & `education`**:
   - Work history, companies, bullet-point achievements, and degree details.

6. **`awards` & `stats`**:
   - Design awards, hackathon wins, years of experience, and project counts.

7. **`aiQuestions`**:
   - Preset questions and answers for the floating AI recruiter assistant.

---

## 🎨 Color Tokens & Theme System

| Token | Light Mode | Dark Mode | Description |
| :--- | :--- | :--- | :--- |
| `--primary` | `#9047ff` | `#9047ff` | Emotion signature purple accent |
| `--background` | `#f5efff` | `#121212` | Main page backdrop |
| `--foreground` | `#2a1647` | `#ffffff` | Primary text |
| `--card` | `#ffffff` | `#181818` | Card and modal surfaces |
| `--border` | `#e2e4f0` | `#30343f` | Borders and dividers |

---

## 📦 Deployment

You can deploy this project instantly to any static host:
- **Vercel**: Import repository and deploy (`npm run build`, output directory: `dist`)
- **Netlify**: Drag & drop `dist/` or connect GitHub repo
- **GitHub Pages**: Build with `npm run build` and deploy the `dist/` folder
