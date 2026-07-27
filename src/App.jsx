import { lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navigation } from './components/navigation/Navigation.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { ProjectsSection } from './components/sections/ProjectsSection.jsx';
import { SkillsSection } from './components/sections/SkillsSection.jsx';
import { AboutSection } from './components/sections/AboutSection.jsx';
import { JourneySection } from './components/sections/JourneySection.jsx';
import { ContactSection } from './components/sections/ContactSection.jsx';
import { CursorTrail } from './components/ui/CursorTrail.jsx';
import { LaunchIntro } from './components/ui/LaunchIntro.jsx';
import { navigationItems } from './data/portfolio.js';

const Experience = lazy(() =>
  import('./experience/Experience.jsx').then((module) => ({ default: module.Experience })),
);

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
      <LaunchIntro />
      <CursorTrail />
      <Navigation items={navigationItems} />
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
