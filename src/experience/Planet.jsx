import { useMemo, useRef } from 'react';
import { BackSide } from 'three';
import { useFrame } from '@react-three/fiber';

const planetPresets = {
  ringed: {
    color: '#294d6a',
    emissive: '#071624',
    atmosphere: '#64d7ff',
    ringPrimary: '#d6edf8',
    ringSecondary: '#f5c86a',
    rotation: [0.22, -0.38, -0.08],
  },
  bare: {
    color: '#5b4537',
    emissive: '#1c1009',
    atmosphere: '#f5c86a',
    rotation: [-0.08, 0.24, 0.1],
  },
};

export function Planet({ isMobile, reducedMotion, variant = 'ringed', position, scale }) {
  const planetRef = useRef();
  const ringRef = useRef();
  const preset = planetPresets[variant];
  const planetScale = scale ?? (isMobile ? 0.22 : 0.52);
  const planetPosition = position ?? (isMobile ? [1.64, 0.42, -2.86] : [3.2, 0.42, -2.9]);
  const surfaceMarks = useMemo(
    () => [
      [-0.42, 0.22, 1.12, 0.16],
      [0.24, -0.16, 1.14, 0.1],
      [0.48, 0.34, 1.08, 0.072],
    ],
    [],
  );

  useFrame((_, delta) => {
    if (reducedMotion || document.hidden) {
      return;
    }

    if (planetRef.current) {
      planetRef.current.rotation.y += delta * (variant === 'ringed' ? 0.042 : 0.026);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.012;
    }
  });

  return (
    <group position={planetPosition} rotation={preset.rotation} scale={planetScale}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.22, 48, 48]} />
        <meshStandardMaterial
          color={preset.color}
          roughness={0.72}
          metalness={0.08}
          emissive={preset.emissive}
          emissiveIntensity={0.22}
        />
        {variant === 'bare' &&
          surfaceMarks.map((mark) => (
            <mesh key={`${mark[0]}-${mark[1]}`} position={[mark[0], mark[1], mark[2]]} scale={[1, 0.58, 0.14]}>
              <sphereGeometry args={[mark[3], 12, 8]} />
              <meshBasicMaterial color="#20140e" transparent opacity={0.34} />
            </mesh>
          ))}
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[1.22, 48, 48]} />
        <meshBasicMaterial color={preset.atmosphere} transparent opacity={variant === 'ringed' ? 0.075 : 0.055} side={BackSide} />
      </mesh>
      {variant === 'ringed' && (
        <group ref={ringRef}>
          <mesh rotation={[1.36, 0.2, -0.18]}>
            <torusGeometry args={[1.58, 0.014, 12, 128]} />
            <meshBasicMaterial color={preset.ringPrimary} transparent opacity={0.46} />
          </mesh>
          <mesh rotation={[1.38, 0.18, -0.18]}>
            <torusGeometry args={[1.82, 0.007, 10, 128]} />
            <meshBasicMaterial color={preset.ringSecondary} transparent opacity={0.24} />
          </mesh>
        </group>
      )}
    </group>
  );
}
