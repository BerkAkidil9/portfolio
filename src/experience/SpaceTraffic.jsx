import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, CatmullRomCurve3, Color, DoubleSide, Vector3 } from 'three';

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
    float alpha = taper * edge * 0.44 + taper * core * 0.34;

    if (alpha < 0.012) {
      discard;
    }

    vec3 color = mix(uEdgeColor, uCoreColor, core);
    gl_FragColor = vec4(color, alpha);
  }
`;

const desktopStations = [
  { id: 'northwest', position: [-4.05, 1.55, -2.35], scale: 0.38, rotation: 0.28 },
  { id: 'northeast', position: [3.95, 1.25, -2.55], scale: 0.34, rotation: -0.22 },
  { id: 'southwest', position: [-3.55, -1.9, -2.75], scale: 0.32, rotation: -0.38 },
  { id: 'southeast', position: [4.05, -1.65, -2.65], scale: 0.36, rotation: 0.18 },
];

const mobileStations = [
  { id: 'upper', position: [2.25, 0.95, -2.55], scale: 0.3, rotation: -0.22 },
  { id: 'lower', position: [-2.25, -1.75, -2.75], scale: 0.28, rotation: 0.32 },
];

const desktopRoutes = [
  { from: 0, to: 1, bend: [0.2, 2.18, -2.65], speed: 0.026, offset: 0.08, size: 0.86 },
  { from: 1, to: 3, bend: [4.9, -0.25, -2.7], speed: 0.021, offset: 0.42, size: 0.7 },
  { from: 2, to: 0, bend: [-4.9, -0.1, -2.6], speed: 0.024, offset: 0.7, size: 0.62 },
  { from: 2, to: 3, bend: [0.7, -2.42, -2.85], speed: 0.018, offset: 0.27, size: 0.78 },
];

const mobileRoutes = [
  { from: 0, to: 1, bend: [0.2, -0.22, -2.85], speed: 0.02, offset: 0.16, size: 0.64 },
];

const desktopAstronauts = [
  { id: 'eva-northwest', position: [-3.72, 1.33, -2.2], scale: 0.22, phase: 0.2, rotation: -0.36 },
  { id: 'eva-northeast', position: [3.58, 1.5, -2.42], scale: 0.21, phase: 1.9, rotation: 0.42 },
  { id: 'eva-southeast', position: [3.72, -1.28, -2.46], scale: 0.21, phase: 3.3, rotation: -0.18 },
];

const mobileAstronauts = [
  { id: 'eva-mobile', position: [1.88, 1.12, -2.35], scale: 0.17, phase: 0.8, rotation: 0.34 },
];

const desktopAliens = [
  { id: 'alien-northeast', position: [3.25, 1.12, -2.35], scale: 0.24, phase: 0.9, rotation: -0.26 },
  { id: 'alien-southeast', position: [3.46, -1.52, -2.42], scale: 0.23, phase: 2.4, rotation: 0.3 },
  { id: 'alien-southwest', position: [-3.16, -1.72, -2.58], scale: 0.2, phase: 4.1, rotation: -0.12 },
];

const mobileAliens = [
  { id: 'alien-mobile', position: [1.42, 0.9, -2.32], scale: 0.22, phase: 1.1, rotation: -0.2 },
];

function createRoutes(stations, routeConfig) {
  return routeConfig.map((route) => {
    const start = new Vector3(...stations[route.from].position);
    const control = new Vector3(...route.bend);
    const end = new Vector3(...stations[route.to].position);
    const curve = new CatmullRomCurve3([start, control, end], false, 'catmullrom', 0.45);

    return {
      ...route,
      curve,
    };
  });
}

function Station({ station }) {
  return (
    <group position={station.position} rotation={[0.42, 0.15, station.rotation]} scale={station.scale}>
      <mesh>
        <torusGeometry args={[0.38, 0.018, 8, 42]} />
        <meshStandardMaterial color="#64d7ff" emissive="#1b789f" emissiveIntensity={0.75} transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.12, 0.26, 10]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.46} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.34, 0, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.28, 0.035, 0.08]} />
        <meshStandardMaterial color="#f5c86a" emissive="#f5c86a" emissiveIntensity={0.34} transparent opacity={0.62} />
      </mesh>
      <mesh position={[-0.34, 0, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.28, 0.035, 0.08]} />
        <meshStandardMaterial color="#f5c86a" emissive="#f5c86a" emissiveIntensity={0.34} transparent opacity={0.62} />
      </mesh>
    </group>
  );
}

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
      <mesh scale={[0.32, 0.07, 1]}>
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
      <mesh position={[0.02, 0, 0]} scale={[1, 0.72, 0.72]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#f5c86a" transparent opacity={0.6} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Vehicle({ route, vehicleRef }) {
  return (
    <group ref={vehicleRef} scale={route.size}>
      <ThrusterTrail />
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.04, 0.15, 4]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.85} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.07, 0, 0]}>
        <boxGeometry args={[0.1, 0.026, 0.032]} />
        <meshStandardMaterial color="#64d7ff" emissive="#2d9fd0" emissiveIntensity={0.65} transparent opacity={0.72} />
      </mesh>
      <mesh position={[-0.16, 0, 0]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color="#f5c86a" transparent opacity={0.82} />
      </mesh>
    </group>
  );
}

function Astronaut({ astronaut, astronautRef }) {
  return (
    <group ref={astronautRef} position={astronaut.position} rotation={[0.1, -0.22, astronaut.rotation]} scale={astronaut.scale}>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.12, 14, 14]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.16} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.032, 0.11, 0.105]} scale={[1.1, 0.62, 0.2]}>
        <sphereGeometry args={[0.075, 12, 8]} />
        <meshStandardMaterial color="#08121f" emissive="#64d7ff" emissiveIntensity={0.34} transparent opacity={0.86} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <capsuleGeometry args={[0.07, 0.16, 5, 10]} />
        <meshStandardMaterial color="#c7d7e8" emissive="#64d7ff" emissiveIntensity={0.1} transparent opacity={0.84} />
      </mesh>
      <mesh position={[-0.08, -0.05, -0.02]} rotation={[0, 0, 0.56]}>
        <capsuleGeometry args={[0.018, 0.13, 4, 8]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.12} transparent opacity={0.78} />
      </mesh>
      <mesh position={[0.085, -0.045, -0.02]} rotation={[0, 0, -0.46]}>
        <capsuleGeometry args={[0.018, 0.13, 4, 8]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.12} transparent opacity={0.78} />
      </mesh>
      <mesh position={[-0.045, -0.2, -0.01]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.018, 0.14, 4, 8]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.12} transparent opacity={0.78} />
      </mesh>
      <mesh position={[0.045, -0.2, -0.01]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.018, 0.14, 4, 8]} />
        <meshStandardMaterial color="#dff6ff" emissive="#64d7ff" emissiveIntensity={0.12} transparent opacity={0.78} />
      </mesh>
      <mesh position={[0, -0.07, -0.08]}>
        <boxGeometry args={[0.11, 0.14, 0.035]} />
        <meshStandardMaterial color="#64d7ff" emissive="#2d9fd0" emissiveIntensity={0.24} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.13, -0.02, 0]} scale={[1, 0.7, 1]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshBasicMaterial color="#f5c86a" transparent opacity={0.62} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
}

function AlienVisitor({ alien, alienRef }) {
  return (
    <group ref={alienRef} position={alien.position} rotation={[0.04, -0.12, alien.rotation]} scale={alien.scale}>
      <mesh position={[0, 0.08, 0]} scale={[0.92, 1.18, 0.84]}>
        <sphereGeometry args={[0.11, 14, 14]} />
        <meshStandardMaterial color="#8cff64" emissive="#4dff8f" emissiveIntensity={0.42} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.035, 0.1, 0.082]} scale={[0.58, 0.9, 0.24]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#06120a" transparent opacity={0.92} />
      </mesh>
      <mesh position={[0.035, 0.1, 0.082]} scale={[0.58, 0.9, 0.24]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial color="#06120a" transparent opacity={0.92} />
      </mesh>
      <mesh position={[0, -0.075, 0]} scale={[0.82, 1, 0.7]}>
        <capsuleGeometry args={[0.052, 0.12, 5, 10]} />
        <meshStandardMaterial color="#73f05e" emissive="#2ea84c" emissiveIntensity={0.28} transparent opacity={0.74} />
      </mesh>
      <mesh position={[-0.07, -0.05, 0]} rotation={[0, 0, 0.42]}>
        <capsuleGeometry args={[0.014, 0.12, 4, 8]} />
        <meshStandardMaterial color="#8cff64" emissive="#4dff8f" emissiveIntensity={0.22} transparent opacity={0.72} />
      </mesh>
      <mesh position={[0.07, -0.05, 0]} rotation={[0, 0, -0.42]}>
        <capsuleGeometry args={[0.014, 0.12, 4, 8]} />
        <meshStandardMaterial color="#8cff64" emissive="#4dff8f" emissiveIntensity={0.22} transparent opacity={0.72} />
      </mesh>
    </group>
  );
}

function AlienCraft({ craftRef, isMobile }) {
  const scale = isMobile ? 0.62 : 0.82;

  return (
    <group ref={craftRef} scale={scale}>
      <mesh scale={[1, 0.18, 0.46]}>
        <sphereGeometry args={[0.28, 22, 12]} />
        <meshStandardMaterial color="#24352f" emissive="#4dff8f" emissiveIntensity={0.22} transparent opacity={0.84} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.015, 8, 48]} />
        <meshStandardMaterial color="#8cff64" emissive="#4dff8f" emissiveIntensity={0.7} transparent opacity={0.58} />
      </mesh>
      <mesh position={[0.02, 0.07, 0]} scale={[0.72, 0.42, 0.72]}>
        <sphereGeometry args={[0.12, 16, 10]} />
        <meshStandardMaterial color="#b8ffd1" emissive="#4dff8f" emissiveIntensity={0.52} transparent opacity={0.72} />
      </mesh>
      <mesh position={[0, -0.085, 0]} scale={[1.35, 0.42, 1.35]}>
        <sphereGeometry args={[0.085, 16, 8]} />
        <meshBasicMaterial color="#4dff8f" transparent opacity={0.24} blending={AdditiveBlending} />
      </mesh>
      <mesh position={[-0.18, -0.01, 0]} scale={[0.72, 0.52, 0.52]}>
        <sphereGeometry args={[0.035, 10, 8]} />
        <meshBasicMaterial color="#f5c86a" transparent opacity={0.5} blending={AdditiveBlending} />
      </mesh>
      <mesh position={[0.18, -0.01, 0]} scale={[0.72, 0.52, 0.52]}>
        <sphereGeometry args={[0.035, 10, 8]} />
        <meshBasicMaterial color="#64d7ff" transparent opacity={0.42} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
}

export function SpaceTraffic({ isMobile }) {
  const vehicleRefs = useRef([]);
  const astronautRefs = useRef([]);
  const alienRefs = useRef([]);
  const alienCraftRef = useRef();
  const stations = useMemo(() => (isMobile ? mobileStations : desktopStations), [isMobile]);
  const astronauts = useMemo(() => (isMobile ? mobileAstronauts : desktopAstronauts), [isMobile]);
  const aliens = useMemo(() => (isMobile ? mobileAliens : desktopAliens), [isMobile]);
  const routes = useMemo(
    () => createRoutes(stations, isMobile ? mobileRoutes : desktopRoutes),
    [isMobile, stations],
  );

  useFrame(({ clock }) => {
    if (document.hidden) {
      return;
    }

    const elapsed = clock.getElapsedTime();

    routes.forEach((route, index) => {
      const vehicle = vehicleRefs.current[index];

      if (!vehicle) {
        return;
      }

      const progress = (elapsed * route.speed + route.offset) % 1;
      const nextProgress = (progress + 0.01) % 1;
      const current = route.curve.getPointAt(progress);
      const next = route.curve.getPointAt(nextProgress);
      const direction = next.clone().sub(current);

      vehicle.position.copy(current);
      vehicle.position.z += 0.16;
      vehicle.scale.setScalar(route.size * (1 + Math.sin(elapsed * 8 + index) * 0.045));
      vehicle.rotation.set(0.12, -0.08, Math.atan2(direction.y, direction.x));
    });

    astronauts.forEach((astronaut, index) => {
      const astronautGroup = astronautRefs.current[index];

      if (!astronautGroup) {
        return;
      }

      const drift = Math.sin(elapsed * 0.42 + astronaut.phase);
      const counterDrift = Math.cos(elapsed * 0.34 + astronaut.phase);

      astronautGroup.position.set(
        astronaut.position[0] + drift * 0.055,
        astronaut.position[1] + counterDrift * 0.045,
        astronaut.position[2],
      );
      astronautGroup.rotation.z = astronaut.rotation + Math.sin(elapsed * 0.3 + astronaut.phase) * 0.12;
      astronautGroup.rotation.y = -0.22 + Math.cos(elapsed * 0.26 + astronaut.phase) * 0.1;
    });

    aliens.forEach((alien, index) => {
      const alienGroup = alienRefs.current[index];

      if (!alienGroup) {
        return;
      }

      const drift = Math.sin(elapsed * 0.5 + alien.phase);
      const lift = Math.cos(elapsed * 0.38 + alien.phase);

      alienGroup.position.set(
        alien.position[0] + drift * 0.045,
        alien.position[1] + lift * 0.032,
        alien.position[2],
      );
      alienGroup.rotation.z = alien.rotation + Math.sin(elapsed * 0.42 + alien.phase) * 0.1;
      alienGroup.rotation.y = -0.12 + Math.cos(elapsed * 0.36 + alien.phase) * 0.08;
    });

    if (alienCraftRef.current) {
      const patrolX = Math.sin(elapsed * 0.17) * (isMobile ? 1.45 : 3.25) + Math.sin(elapsed * 0.31) * (isMobile ? 0.36 : 0.55);
      const patrolY = Math.cos(elapsed * 0.13 + 1.4) * (isMobile ? 0.58 : 1.08) + Math.sin(elapsed * 0.23) * (isMobile ? 0.22 : 0.32);
      const patrolZ = -2.05 + Math.sin(elapsed * 0.19) * 0.18;

      alienCraftRef.current.position.set(patrolX, patrolY, patrolZ);
      alienCraftRef.current.rotation.set(
        0.16 + Math.sin(elapsed * 0.22) * 0.08,
        -0.2 + Math.cos(elapsed * 0.18) * 0.14,
        Math.sin(elapsed * 0.27) * 0.22,
      );
    }
  });

  return (
    <group>
      {stations.map((station) => (
        <Station key={station.id} station={station} />
      ))}
      {routes.map((route, index) => (
        <Vehicle
          key={`${route.from}-${route.to}-${route.speed}`}
          route={route}
          vehicleRef={(node) => {
            vehicleRefs.current[index] = node;
          }}
        />
      ))}
      {astronauts.map((astronaut, index) => (
        <Astronaut
          key={astronaut.id}
          astronaut={astronaut}
          astronautRef={(node) => {
            astronautRefs.current[index] = node;
          }}
        />
      ))}
      {aliens.map((alien, index) => (
        <AlienVisitor
          key={alien.id}
          alien={alien}
          alienRef={(node) => {
            alienRefs.current[index] = node;
          }}
        />
      ))}
      <AlienCraft craftRef={alienCraftRef} isMobile={isMobile} />
    </group>
  );
}
