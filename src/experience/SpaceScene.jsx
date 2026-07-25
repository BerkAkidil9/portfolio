import { Sparkles } from '@react-three/drei';
import { StarField } from './StarField.jsx';
import { CameraRig } from './CameraRig.jsx';
import { ShootingStars } from './ShootingStars.jsx';
import { SpaceTraffic } from './SpaceTraffic.jsx';

export function SpaceScene({ isMobile, reducedMotion }) {
  return (
    <>
      <color attach="background" args={['#01040d']} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[-4, 3, 4]} intensity={1.75} color="#d9f4ff" />
      <pointLight position={[2.2, -1.4, 2.4]} intensity={2.2} color="#64d7ff" />
      <pointLight position={[-2.8, 1.1, 2.2]} intensity={0.85} color="#f5c86a" />
      <StarField isMobile={isMobile} reducedMotion={reducedMotion} />
      {!reducedMotion && <SpaceTraffic isMobile={isMobile} />}
      {!reducedMotion && <ShootingStars isMobile={isMobile} />}
      {!reducedMotion && (
        <Sparkles
          count={isMobile ? 20 : 48}
          size={isMobile ? 1.05 : 1.35}
          scale={[6.4, 3.2, 2.8]}
          speed={0.08}
          color="#f5c86a"
          opacity={0.14}
        />
      )}
      <CameraRig reducedMotion={reducedMotion} />
    </>
  );
}
