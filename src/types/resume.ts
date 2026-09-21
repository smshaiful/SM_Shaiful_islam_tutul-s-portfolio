export interface SocialLink {
  name: string;
  url: string;
  index: string;
  handle: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  detailedBio: string;
  location: string;
  timezone: string;
  email: string;
  phone?: string;
  availability: string;
  resumePdfUrl: string;
  socials: SocialLink[];
}

export interface HeroPhase {
  tag: string;
  title: string;
  italicWord?: string;
  subtitle: string;
  description: string;
}

export interface Capability {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface HardwarePinout {
  pinName: string;
  connectedTo: string;
  function: string;
}

export interface CodeSnippetItem {
  title: string;
  language: string;
  code: string;
}

export interface Project {
  id: string;
  num: string;
  title: string;
  status: 'COMPLETED' | 'IN PROGRESS';
  category: 'hardware' | 'biomedical' | 'simulation' | 'website' | 'product' | 'ai-ml' | string;
  type: string;
  date: string;
  year: string;
  team?: string;
  scope: string[];
  stack: string[];
  description: string;
  realWorldProblem: string;
  features: string[];
  innovation: string;
  novelty: string;
  highlights: string[];
  gallery?: string[];
  hardwareSpecs?: HardwarePinout[];
  codeSnippets?: CodeSnippetItem[];
  reportAbstract?: string;
  liveUrl?: string;
  githubUrl?: string;
  featuredImage: string;
  accentColor: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
  result?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  poweredBy: string;
  date: string;
  code: string;
  imageUrl: string;
  skills: string[];
}

export interface AwardItem {
  platform: string;
  count: number;
  honors: string[];
}

export interface StatItem {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  heroPhases: HeroPhase[];
  capabilities: Capability[];
  skills: Record<string, string[]>;
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certificates?: CertificateItem[];
  awards: AwardItem[];
  stats: StatItem[];
  aiQuestions: FAQItem[];
}
