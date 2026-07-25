import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color, DoubleSide } from 'three';

const meteorVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const meteorFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uDirection;
  varying vec2 vUv;

  void main() {
    float directionalX = mix(1.0 - vUv.x, vUv.x, step(0.0, uDirection));
    float tail = smoothstep(0.0, 0.9, directionalX);
    float head = smoothstep(0.72, 1.0, directionalX);
    float core = smoothstep(0.5, 0.0, abs(vUv.y - 0.5));
    float feather = smoothstep(0.5, 0.05, abs(vUv.y - 0.5));
    float alpha = (tail * 0.34 + head * 0.9) * core * feather * uOpacity;

    if (alpha < 0.015) {
      discard;
    }

    vec3 warmCore = mix(uColor, vec3(1.0, 0.86, 0.48), head * 0.55);
    gl_FragColor = vec4(warmCore, alpha);
  }
`;

const createMeteorPath = (index, isMobile) => {
  const phaseSeed = index * 1.73 + 0.41;
  const verticalOffset = Math.sin(phaseSeed * 3.1);
  const baseDelay = isMobile ? 5.4 : 2.2;
  const baseInterval = isMobile ? 13.5 : 8.2;
  const reversed = index === (isMobile ? 1 : 2);
  const startX = reversed ? (isMobile ? -3.4 : -4.9) : isMobile ? 3.1 : 4.8;
  const endX = reversed ? (isMobile ? 3.2 : 4.7) : isMobile ? -3.6 : -5.2;
  const direction = reversed ? -1 : 1;

  return {
    delay: baseDelay + index * (isMobile ? 5.8 : 3.9),
    duration: isMobile ? 1.9 + index * 0.12 : 2.25 + index * 0.16,
    interval: baseInterval + index * (isMobile ? 4.6 : 3.15),
    startX,
    endX,
    startY: reversed ? -0.2 + verticalOffset * 0.12 : 1.85 - index * 0.68 + verticalOffset * 0.16,
    drop: reversed ? (isMobile ? -0.86 : -1.04) : isMobile ? 1.38 + index * 0.2 : 1.72 + index * 0.22,
    z: -1.9 - index * 0.18,
    length: reversed
      ? isMobile
        ? 0.98
        : 1.35
      : isMobile
        ? 1.08 + index * 0.22
        : 1.55 + index * 0.28,
    thickness: reversed ? (isMobile ? 0.028 : 0.036) : isMobile ? 0.032 + index * 0.004 : 0.04 + index * 0.006,
    rotation: reversed ? 0.24 : -0.28 - index * 0.04,
    opacity: reversed ? (isMobile ? 0.56 : 0.64) : isMobile ? 0.68 : 0.78,
    direction,
  };
};

function Meteor({ path, materialRef, meshRef }) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color('#dff6ff') },
      uOpacity: { value: 0 },
      uDirection: { value: path.direction },
    }),
    [path.direction],
  );

  return (
    <mesh ref={meshRef} visible={false} rotation={[0, 0, path.rotation]} scale={[path.length, path.thickness, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={meteorVertexShader}
        fragmentShader={meteorFragmentShader}
        transparent
        depthWrite={false}
        side={DoubleSide}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

export function ShootingStars({ isMobile }) {
  const meshRefs = useRef([]);
  const materialRefs = useRef([]);
  const paths = useMemo(
    () => Array.from({ length: isMobile ? 2 : 4 }, (_, index) => createMeteorPath(index, isMobile)),
    [isMobile],
  );

  useFrame(({ clock }) => {
    if (document.hidden) {
      return;
    }

    const elapsed = clock.getElapsedTime();

    paths.forEach((path, index) => {
      const mesh = meshRefs.current[index];
      const material = materialRefs.current[index];

      if (!mesh || !material) {
        return;
      }

      const cycle = (elapsed + path.delay) % path.interval;
      const isActive = cycle < path.duration;
      mesh.visible = isActive;

      if (!isActive) {
        material.uniforms.uOpacity.value = 0;
        return;
      }

      const progress = cycle / path.duration;
      const fadeIn = Math.min(progress / 0.22, 1);
      const fadeOut = Math.min((1 - progress) / 0.42, 1);
      const opacity = Math.sin(progress * Math.PI) * Math.min(fadeIn, fadeOut) * path.opacity;
      const eased = 1 - (1 - progress) ** 2;

      mesh.position.set(
        path.startX + (path.endX - path.startX) * eased,
        path.startY - path.drop * eased,
        path.z,
      );
      mesh.scale.set(path.length * (0.9 + progress * 0.18), path.thickness, 1);
      material.uniforms.uOpacity.value = opacity;
    });
  });

  return (
    <group position={[0, 0.2, 0]}>
      {paths.map((path, index) => (
        <Meteor
          key={`${path.interval}-${path.delay}`}
          path={path}
          meshRef={(node) => {
            meshRefs.current[index] = node;
          }}
          materialRef={(node) => {
            materialRefs.current[index] = node;
          }}
        />
      ))}
    </group>
  );
}
