import { useRef } from 'react';
import { BackSide } from 'three';
import { useFrame } from '@react-three/fiber';

export function Planet({ reducedMotion, isMobile }) {
  const planetRef = useRef();
  const ringRef = useRef();
  const planetScale = isMobile ? 0.56 : 0.68;
  const planetPosition = isMobile ? [-0.12, -0.08, 0] : [0.22, -0.14, 0];

  useFrame((_, delta) => {
    if (reducedMotion || document.hidden) {
      return;
    }

    planetRef.current.rotation.y += delta * 0.08;
    ringRef.current.rotation.z += delta * 0.015;
  });

  return (
    <group position={planetPosition} rotation={[0.18, -0.35, 0.12]} scale={planetScale}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.22, 48, 48]} />
        <meshStandardMaterial
          color="#173f60"
          roughness={0.72}
          metalness={0.08}
          emissive="#071624"
          emissiveIntensity={0.24}
        />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[1.22, 48, 48]} />
        <meshBasicMaterial color="#64d7ff" transparent opacity={0.09} side={BackSide} />
      </mesh>
      <mesh ref={ringRef} rotation={[1.35, 0.22, -0.18]}>
        <torusGeometry args={[1.54, 0.012, 12, 128]} />
        <meshBasicMaterial color="#9bb7ff" transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[1.38, 0.2, -0.18]}>
        <torusGeometry args={[1.72, 0.006, 10, 128]} />
        <meshBasicMaterial color="#f5c86a" transparent opacity={0.24} />
      </mesh>
    </group>
  );
}
