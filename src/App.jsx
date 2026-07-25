import { lazy, Suspense } from 'react';
import { Navigation } from './components/navigation/Navigation.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { ProjectsSection } from './components/sections/ProjectsSection.jsx';
import { TechnologiesSection } from './components/sections/TechnologiesSection.jsx';
import { AboutSection } from './components/sections/AboutSection.jsx';
import { JourneySection } from './components/sections/JourneySection.jsx';
import { ContactSection } from './components/sections/ContactSection.jsx';
import { CursorTrail } from './components/ui/CursorTrail.jsx';
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
      <CursorTrail />
      <Navigation items={navigationItems} />
      <main>
        <Hero />
        <ProjectsSection />
        <TechnologiesSection />
        <AboutSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
