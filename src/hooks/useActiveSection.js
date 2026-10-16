import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    let frame;
    const updateActiveSection = () => {
      frame = undefined;
      // Use section starts so long sections remain active throughout their content.
      const activationLine = window.innerHeight * 0.3;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (frame === undefined) {
        frame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const observer = new ResizeObserver(scheduleUpdate);
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [sectionIds]);

  return activeSection;
}
