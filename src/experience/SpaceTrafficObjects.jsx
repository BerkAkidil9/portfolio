import { useMemo } from 'react';
import { AdditiveBlending, Color, DoubleSide } from 'three';

const thrusterVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const thrusterFragmentShader = `
  uniform vec3 uCoreColor;
  uniform vec3 uEdgeColor;
  varying vec2 vUv;

  void main() {
    float distanceFromCenter = abs(vUv.y - 0.5);
    float taper = smoothstep(0.0, 0.72, vUv.x);
    float core = smoothstep(0.2, 0.0, distanceFromCenter);
    float edge = smoothstep(0.5, 0.04, distanceFromCenter);
    float alpha = taper * edge * 0.36 + taper * core * 0.28;

    if (alpha < 0.012) {
      discard;
    }

    vec3 color = mix(uEdgeColor, uCoreColor, core);
    gl_FragColor = vec4(color, alpha);
  }
`;

function ThrusterTrail() {
  const uniforms = useMemo(
    () => ({
      uCoreColor: { value: new Color('#f5c86a') },
      uEdgeColor: { value: new Color('#64d7ff') },
    }),
    [],
  );

  return (
    <group position={[-0.2, 0, 0]}>
      <mesh scale={[0.26, 0.052, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={thrusterVertexShader}
          fragmentShader={thrusterFragmentShader}
          transparent
          depthWrite={false}
          side={DoubleSide}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh position={[0.02, 0, 0]} scale={[1, 0.7, 0.7]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshBasicMaterial color="#f5c86a" transparent opacity={0.46} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
}

export function Station({ station }) {
  return (
    <group position={station.position} rotation={[0.42, 0.15, station.rotation]} scale={station.scale}>
      <mesh>
        <torusGeometry args={[0.38, 0.018, 8, 42]} />
        <meshStandardMaterial color="#64d7ff" emissive="#1b789f" emissiveIntensity={0.52} transparent opacity={0.46} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.12, 0.26, 10]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.34} transparent opacity={0.64} />
      </mesh>
      <mesh position={[0.34, 0, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.28, 0.035, 0.08]} />
        <meshStandardMaterial color="#f5c86a" emissive="#f5c86a" emissiveIntensity={0.22} transparent opacity={0.42} />
      </mesh>
      <mesh position={[-0.34, 0, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.28, 0.035, 0.08]} />
        <meshStandardMaterial color="#f5c86a" emissive="#f5c86a" emissiveIntensity={0.22} transparent opacity={0.42} />
      </mesh>
    </group>
  );
}

export function Vehicle({ route, vehicleRef }) {
  return (
    <group ref={vehicleRef} scale={route.size}>
      <ThrusterTrail />
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.038, 0.14, 4]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.64} transparent opacity={0.74} />
      </mesh>
      <mesh position={[-0.07, 0, 0]}>
        <boxGeometry args={[0.1, 0.024, 0.03]} />
        <meshStandardMaterial color="#64d7ff" emissive="#2d9fd0" emissiveIntensity={0.46} transparent opacity={0.58} />
      </mesh>
      <mesh position={[-0.16, 0, 0]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#f5c86a" transparent opacity={0.58} />
      </mesh>
    </group>
  );
}

export function Astronaut({ astronaut, astronautRef }) {
  return (
    <group ref={astronautRef} position={astronaut.position} rotation={[0.1, -0.22, astronaut.rotation]} scale={astronaut.scale}>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.12} transparent opacity={0.72} />
      </mesh>
      <mesh position={[0.032, 0.11, 0.105]} scale={[1.1, 0.62, 0.2]}>
        <sphereGeometry args={[0.075, 12, 8]} />
        <meshStandardMaterial color="#08121f" emissive="#64d7ff" emissiveIntensity={0.24} transparent opacity={0.74} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <capsuleGeometry args={[0.07, 0.16, 5, 10]} />
        <meshStandardMaterial color="#c7d7e8" emissive="#64d7ff" emissiveIntensity={0.08} transparent opacity={0.66} />
      </mesh>
      <mesh position={[-0.08, -0.05, -0.02]} rotation={[0, 0, 0.56]}>
        <capsuleGeometry args={[0.018, 0.13, 4, 8]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.1} transparent opacity={0.62} />
      </mesh>
      <mesh position={[0.085, -0.045, -0.02]} rotation={[0, 0, -0.46]}>
        <capsuleGeometry args={[0.018, 0.13, 4, 8]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.1} transparent opacity={0.62} />
      </mesh>
      <mesh position={[-0.045, -0.2, -0.01]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.018, 0.14, 4, 8]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.1} transparent opacity={0.62} />
      </mesh>
      <mesh position={[0.045, -0.2, -0.01]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.018, 0.14, 4, 8]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.1} transparent opacity={0.62} />
      </mesh>
      <mesh position={[0, -0.07, -0.08]}>
        <boxGeometry args={[0.11, 0.14, 0.035]} />
        <meshStandardMaterial color="#64d7ff" emissive="#2d9fd0" emissiveIntensity={0.16} transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

export function AlienVisitor({ alien, alienRef }) {
  return (
    <group ref={alienRef} position={alien.position} rotation={[0.04, -0.12, alien.rotation]} scale={alien.scale}>
      <mesh position={[0, 0.08, 0]} scale={[0.92, 1.18, 0.84]}>
        <sphereGeometry args={[0.11, 14, 14]} />
        <meshStandardMaterial color="#8cff64" emissive="#4dff8f" emissiveIntensity={0.26} transparent opacity={0.76} />
      </mesh>
      <mesh position={[-0.035, 0.1, 0.082]} scale={[0.58, 0.9, 0.24]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#06120a" transparent opacity={0.84} />
      </mesh>
      <mesh position={[0.035, 0.1, 0.082]} scale={[0.58, 0.9, 0.24]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#06120a" transparent opacity={0.84} />
      </mesh>
      <mesh position={[0, -0.075, 0]} scale={[0.82, 1, 0.7]}>
        <capsuleGeometry args={[0.052, 0.12, 5, 10]} />
        <meshStandardMaterial color="#73f05e" emissive="#2ea84c" emissiveIntensity={0.18} transparent opacity={0.58} />
      </mesh>
      <mesh position={[-0.07, -0.05, 0]} rotation={[0, 0, 0.42]}>
        <capsuleGeometry args={[0.014, 0.12, 4, 8]} />
        <meshStandardMaterial color="#8cff64" emissive="#4dff8f" emissiveIntensity={0.16} transparent opacity={0.58} />
      </mesh>
      <mesh position={[0.07, -0.05, 0]} rotation={[0, 0, -0.42]}>
        <capsuleGeometry args={[0.014, 0.12, 4, 8]} />
        <meshStandardMaterial color="#8cff64" emissive="#4dff8f" emissiveIntensity={0.16} transparent opacity={0.58} />
      </mesh>
    </group>
  );
}

export function AlienCraft({ craftRef, config }) {
  return (
    <group ref={craftRef} scale={config.scale}>
      <mesh scale={[1, 0.16, 0.42]}>
        <sphereGeometry args={[0.28, 22, 12]} />
        <meshStandardMaterial color="#1d2e29" emissive="#4dff8f" emissiveIntensity={0.16} transparent opacity={0.68} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.012, 8, 48]} />
        <meshStandardMaterial color="#8cff64" emissive="#4dff8f" emissiveIntensity={0.44} transparent opacity={0.42} />
      </mesh>
      <mesh position={[0.02, 0.064, 0]} scale={[0.72, 0.42, 0.72]}>
        <sphereGeometry args={[0.11, 16, 10]} />
        <meshStandardMaterial color="#b8ffd1" emissive="#4dff8f" emissiveIntensity={0.34} transparent opacity={0.56} />
      </mesh>
      <mesh position={[0, -0.082, 0]} scale={[1.2, 0.34, 1.2]}>
        <sphereGeometry args={[0.078, 16, 8]} />
        <meshBasicMaterial color="#4dff8f" transparent opacity={0.16} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
}
