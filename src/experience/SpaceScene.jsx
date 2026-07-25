import { Sparkles } from '@react-three/drei';
import { Planet } from './Planet.jsx';
import { StarField } from './StarField.jsx';
import { CameraRig } from './CameraRig.jsx';

export function SpaceScene({ isMobile, reducedMotion }) {
  return (
    <>
      <color attach="background" args={['#020713']} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[-4, 3, 4]} intensity={1.75} color="#d9f4ff" />
      <pointLight position={[2.2, -1.4, 2.4]} intensity={2.2} color="#64d7ff" />
      <pointLight position={[-2.8, 1.1, 2.2]} intensity={0.85} color="#f5c86a" />
      <StarField isMobile={isMobile} />
      {!reducedMotion && (
        <Sparkles
          count={isMobile ? 28 : 58}
          size={isMobile ? 1.5 : 2}
          scale={[5.6, 2.8, 2.6]}
          speed={0.18}
          color="#f5c86a"
          opacity={0.28}
        />
      )}
      <Planet reducedMotion={reducedMotion} isMobile={isMobile} />
      <CameraRig reducedMotion={reducedMotion} />
    </>
  );
}
