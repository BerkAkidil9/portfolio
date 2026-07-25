import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, Color } from 'three';

const starVertexShader = `
  uniform float uSize;

  void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize * (260.0 / -modelViewPosition.z);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const starFragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
    float disc = smoothstep(0.5, 0.18, distanceFromCenter);
    float core = smoothstep(0.18, 0.0, distanceFromCenter);
    float ray = smoothstep(0.5, 0.0, abs(gl_PointCoord.x - 0.5)) * 0.16;
    ray += smoothstep(0.5, 0.0, abs(gl_PointCoord.y - 0.5)) * 0.12;
    float alpha = clamp(disc + core * 0.42 + ray * disc, 0.0, 1.0) * uOpacity;

    if (alpha < 0.02) {
      discard;
    }

    gl_FragColor = vec4(uColor * (0.72 + core * 0.8), alpha);
  }
`;

function createStarPositions(count, radius, depth, seedOffset = 0) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const seed = index + seedOffset;
    const angle = ((seed * 137.508) % 360) * (Math.PI / 180);
    const band = Math.sin(seed * 12.9898) * 0.5 + 0.5;
    const distance = radius * (0.22 + band * 0.78);
    const height = (Math.cos(seed * 78.233) * 0.5 + 0.5) * depth - depth / 2;

    positions[index * 3] = Math.cos(angle) * distance;
    positions[index * 3 + 1] = Math.sin(angle) * distance * 0.58 + height * 0.18;
    positions[index * 3 + 2] = -Math.abs(height) - 1.2;
  }

  return positions;
}

function NearStars({ isMobile }) {
  const nearStarsRef = useRef();
  const largeStars = useMemo(
    () => createStarPositions(isMobile ? 14 : 30, isMobile ? 3.8 : 5.8, isMobile ? 2.6 : 3.8, 410),
    [isMobile],
  );
  const midStars = useMemo(
    () =>
      createStarPositions(isMobile ? 42 : 88, isMobile ? 4.8 : 7.2, isMobile ? 4.2 : 5.4, 940),
    [isMobile],
  );
  const midUniforms = useMemo(
    () => ({
      uColor: { value: new Color('#dff6ff') },
      uOpacity: { value: 0.82 },
      uSize: { value: isMobile ? 0.07 : 0.095 },
    }),
    [isMobile],
  );
  const largeUniforms = useMemo(
    () => ({
      uColor: { value: new Color('#fff1bd') },
      uOpacity: { value: 0.98 },
      uSize: { value: isMobile ? 0.15 : 0.22 },
    }),
    [isMobile],
  );

  useFrame((_, delta) => {
    if (!nearStarsRef.current || document.hidden) {
      return;
    }

    nearStarsRef.current.rotation.z -= delta * 0.012;
    nearStarsRef.current.position.x = Math.sin(performance.now() * 0.00008) * 0.08;
    nearStarsRef.current.position.y = Math.cos(performance.now() * 0.00007) * 0.05;
  });

  return (
    <group ref={nearStarsRef} rotation={[0.04, -0.08, -0.24]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[midStars, 3]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={midUniforms}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[largeStars, 3]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={largeUniforms}
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

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
        count={isMobile ? 1050 : 4300}
        factor={isMobile ? 2.8 : 4.1}
        saturation={0}
        fade
        speed={isMobile ? 0.18 : 0.28}
      />
      {!reducedMotion && <NearStars isMobile={isMobile} />}
    </group>
  );
}
