import React, { useState, useEffect } from 'react';
import { resumeData } from './data/resumeData';
import { Project } from './types/resume';
import { useTheme } from './hooks/useTheme';
import { useSoundEffects } from './hooks/useSoundEffects';
import { useScrollProgress } from './hooks/useScrollProgress';

import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { StorytellingHero } from './components/StorytellingHero';
import { WhatWeDo } from './components/WhatWeDo';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { AwardsRecognition } from './components/AwardsRecognition';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant';
import { ContactDrawer } from './components/ContactDrawer';
import { MobileNav } from './components/MobileNav';
import { CustomCursor } from './components/CustomCursor';
import { ECGProjectPage } from './pages/ECGProjectPage';
import { FireFightingRobotPage } from './pages/FireFightingRobotPage';
import { EVotingProjectPage } from './pages/EVotingProjectPage';
import { GenericProjectPage } from './pages/GenericProjectPage';

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  
  // Dedicated Project Page Routing via URL hash (e.g. #/project/robofusion-ecg)
  const getProjectIdFromHash = (): string | null => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash;
    if (hash.startsWith('#/project/')) {
      return hash.replace('#/project/', '');
    }
    return null;
  };

  const [activeProjectId, setActiveProjectId] = useState<string | null>(getProjectIdFromHash());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [performanceMode] = useState<'high' | 'balanced' | 'low'>('low');

  const { theme } = useTheme();
  const { playClick, playHover, playSuccess } = useSoundEffects();
  const { heroPhase, isHeroVisible, heroCanvasOpacity } = useScrollProgress();

  // Listen to browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const pid = getProjectIdFromHash();
      setActiveProjectId(pid);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToProject = (projectId: string) => {
    window.location.hash = `#/project/${projectId}`;
    setActiveProjectId(projectId);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateBackToPortfolio = () => {
    window.location.hash = '#work';
    setActiveProjectId(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(() => {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // If viewing dedicated project page
  if (activeProjectId) {
    if (activeProjectId === 'robofusion-ecg') {
      return (
        <div className="relative min-h-screen bg-[#0f1b2d] text-[#eaf1fb] font-sans">
          <CustomCursor />
          <ECGProjectPage onBack={navigateBackToPortfolio} />
        </div>
      );
    }

    if (activeProjectId === 'fire-fighting-robot' || activeProjectId === 'fire-robot') {
      return (
        <div className="relative min-h-screen bg-[#0f1b2d] text-[#eaf1fb] font-sans">
          <CustomCursor />
          <FireFightingRobotPage onBack={navigateBackToPortfolio} />
        </div>
      );
    }

    if (activeProjectId === 'esp32-evoting' || activeProjectId === 'smart-evoting' || activeProjectId === 'e-voting') {
      return (
        <div className="relative min-h-screen bg-[#0f1b2d] text-[#eaf1fb] font-sans">
          <CustomCursor />
          <EVotingProjectPage onBack={navigateBackToPortfolio} />
        </div>
      );
    }

    const currentProject = resumeData.projects.find((p) => p.id === activeProjectId);
    if (currentProject) {
      return (
        <div className="relative min-h-screen bg-[#0f1b2d] text-[#eaf1fb] font-sans">
          <CustomCursor />
          <GenericProjectPage project={currentProject} onBack={navigateBackToPortfolio} />
        </div>
      );
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-white transition-colors duration-500 font-sans">
      {/* 1. Custom Magnetic Fluid Cursor (Desktop only) */}
      <CustomCursor />

      {/* 2. Loading Screen */}
      {!loaded && (
        <Preloader
          onComplete={() => setLoaded(true)}
          brandName={resumeData.personalInfo.name}
        />
      )}

      {/* 3. 3D WebGL / Canvas Fluid Particle Background (Landing page only) */}
      <InteractiveCanvas
        theme={theme}
        heroPhase={heroPhase}
        performanceMode={performanceMode}
        isVisible={isHeroVisible}
        opacity={heroCanvasOpacity}
      />

      {/* Background Architectural Grid Lines (Natural background) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-overlay opacity-80" aria-hidden="true" />

      {/* 4. Fixed Top Header */}
      <Header
        brandName={resumeData.personalInfo.name}
        onOpenContact={() => setIsContactOpen(true)}
        onPlayClick={playClick}
        onPlayHover={playHover}
      />

      {/* 5. Main Narrative Flow */}
      <main className="relative z-10">
        {/* Storytelling Hero Section (3 Smooth Pinned Phases) */}
        <StorytellingHero
          phases={resumeData.heroPhases}
          currentPhase={heroPhase}
          onPhaseSelect={() => {}}
          onPlayHover={playHover}
          onPlayClick={playClick}
        />

        {/* Philosophy, Capabilities & Skills Matrix ("What We Do") */}
        <WhatWeDo
          capabilities={resumeData.capabilities}
          skills={resumeData.skills}
          tagline={resumeData.personalInfo.tagline}
          detailedBio={resumeData.personalInfo.detailedBio}
          resumePdfUrl={resumeData.personalInfo.resumePdfUrl}
          onPlayHover={playHover}
          onPlayClick={playClick}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Projects & Work Showcase */}
        <ProjectsShowcase
          projects={resumeData.projects}
          onSelectProject={(p) => navigateToProject(p.id)}
          onPlayHover={playHover}
          onPlayClick={playClick}
        />

        {/* Career Timeline, Academic Foundation & Professional Certifications */}
        <ExperienceTimeline
          experience={resumeData.experience}
          education={resumeData.education}
          certificates={resumeData.certificates}
          onPlayHover={playHover}
          onPlayClick={playClick}
        />

        {/* Awards, Accolades & Performance Metrics */}
        <AwardsRecognition
          awards={resumeData.awards}
          stats={resumeData.stats}
          onPlayHover={playHover}
          onPlayClick={playClick}
        />
      </main>

      {/* 6. Footer & Giant Typographic Callout */}
      <Footer
        name={resumeData.personalInfo.name}
        location={resumeData.personalInfo.location}
        timezone={resumeData.personalInfo.timezone}
        socials={resumeData.personalInfo.socials}
        onOpenContact={() => setIsContactOpen(true)}
        onPlayClick={playClick}
        onPlayHover={playHover}
      />

      {/* 7. Floating Recruiter AI Assistant ("Portfolio AI") */}
      <AIAssistant
        questions={resumeData.aiQuestions}
        email={resumeData.personalInfo.email}
        resumePdfUrl={resumeData.personalInfo.resumePdfUrl}
        onOpenContact={() => setIsContactOpen(true)}
        onPlayClick={playClick}
        onPlayHover={playHover}
      />

      {/* 8. Mobile Navigation & Floating Dock */}
      <MobileNav
        brandName={resumeData.personalInfo.name}
        onOpenContact={() => setIsContactOpen(true)}
        onPlayClick={playClick}
        onPlayHover={playHover}
      />

      {/* 9. Interactive Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPlayClick={playClick}
      />

      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        email={resumeData.personalInfo.email}
        phone={resumeData.personalInfo.phone}
        resumePdfUrl={resumeData.personalInfo.resumePdfUrl}
        onPlayClick={playClick}
        onPlayHover={playHover}
        onPlaySuccess={playSuccess}
      />
    </div>
  );
};

export default App;
