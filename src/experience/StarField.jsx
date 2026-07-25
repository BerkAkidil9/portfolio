import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function StarField({ isMobile, reducedMotion }) {
  const starsRef = useRef();

  useFrame((_, delta) => {
    if (reducedMotion || document.hidden || !starsRef.current) {
      return;
    }

    starsRef.current.rotation.x -= delta * (isMobile ? 0.018 : 0.026);
    starsRef.current.rotation.y -= delta * (isMobile ? 0.026 : 0.038);
    starsRef.current.rotation.z += delta * 0.006;
  });

  return (
    <group ref={starsRef} rotation={[0, 0, Math.PI / 7]}>
      <Stars
        radius={90}
        depth={38}
        count={isMobile ? 1100 : 4600}
        factor={isMobile ? 3 : 4.4}
        saturation={0}
        fade
        speed={isMobile ? 0.18 : 0.28}
      />
    </group>
  );
}
