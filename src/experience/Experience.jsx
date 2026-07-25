import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import { SceneFallback } from './SceneFallback.jsx';
import { SpaceScene } from './SpaceScene.jsx';
import styles from './Experience.module.css';

function hasWebGL() {
  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    );
  } catch {
    return false;
  }
}

export function Experience() {
  const isMobile = useMediaQuery('(max-width: 760px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [canRenderWebGL] = useState(() => hasWebGL());

  if (!canRenderWebGL || reducedMotion) {
    return <SceneFallback />;
  }

  return (
    <div className={styles.canvasWrap} aria-hidden="true">
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 42 }}
          dpr={[1, isMobile ? 1.25 : 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <SpaceScene isMobile={isMobile} reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
}
